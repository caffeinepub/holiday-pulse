import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type DayItem = {
    day : Nat;
    title : Text;
    description : Text;
    activities : [Text];
  };

  public type Package = {
    id : Nat;
    name : Text;
    tagline : Text;
    duration : Text;
    days : Nat;
    nights : Nat;
    category : Text;
    price : Nat;
    priceLabel : Text;
    itinerary : [DayItem];
    inclusions : [Text];
    exclusions : [Text];
    highlights : [Text];
    isActive : Bool;
    order : Nat;
  };

  public type Enquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    packageId : Nat;
    packageName : Text;
    message : Text;
    timestamp : Int;
  };

  public type ChatLead = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    destination : Text;
    groupSize : Text;
    travelTimeframe : Text;
    experienceType : Text;
    additionalNotes : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  module Category {
    public func compare(category1 : Text, category2 : Text) : Order.Order {
      Text.compare(category1, category2);
    };
  };

  module PackageEnum {
    public type Category = Text;

    type Id = Nat;
    type Season = Text;
    type PriceRange = Nat;
    type Duration = ?Nat;
    type Location = Text;

    func categoryToText(category : Category) : Text {
      category;
    };

    public func compareByCategory(p1 : Package, p2 : Package) : Order.Order {
      Text.compare(p1.category, p2.category);
    };

    public func getPriceTag(price : Nat) : Text {
      let priceThresholds = [("Budget", 14999), ("Midrange", 24999), ("Premium", 34999)];
      let filteredPrice = priceThresholds.filter(func(tuple) { price <= tuple.1 });
      switch (filteredPrice.size()) {
        case (0) { "Luxury" };
        case (_) { filteredPrice.get(0).0 };
      };
    };

    public func isMultiCategory(p : Package, categories : [Text]) : Bool {
      categories.any(func(category) { p.category == category });
    };
  };

  module Package {
    public func compareByOrder(p1 : Package, p2 : Package) : Order.Order {
      Nat.compare(p1.order, p2.order);
    };

    public func compareByPrice(p1 : Package, p2 : Package) : Order.Order {
      Nat.compare(p1.price, p2.price);
    };

    public func compareByName(p1 : Package, p2 : Package) : Order.Order {
      Text.compare(p1.name, p2.name);
    };

    public func compareByNights(p1 : Package, p2 : Package) : Order.Order {
      Nat.compare(p1.nights, p2.nights);
    };

    public func compareByTagline(p1 : Package, p2 : Package) : Order.Order {
      Text.compare(p1.tagline, p2.tagline);
    };

    public func compareByDays(p1 : Package, p2 : Package) : Order.Order {
      Nat.compare(p1.days, p2.days);
    };

    public func compareByDuration(p1 : Package, p2 : Package) : Order.Order {
      Text.compare(p1.duration, p2.duration);
    };

    public func compareByPriceLabel(p1 : Package, p2 : Package) : Order.Order {
      Text.compare(p1.priceLabel, p2.priceLabel);
    };

    public func compareByCategory(p1 : Package, p2 : Package) : Order.Order {
      Text.compare(p1.category, p2.category);
    };
  };

  module Enquiry {
    public func compare(enquiry1 : Enquiry, enquiry2 : Enquiry) : Order.Order {
      Nat.compare(enquiry1.id, enquiry2.id);
    };
  };

  // State
  let packages = Map.empty<Nat, Package>();
  let activePackages = Map.empty<Nat, Package>();
  let enquiries = Map.empty<Nat, Enquiry>();
  let chatLeads = Map.empty<Nat, ChatLead>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let pendingEnquiries = List.empty<Enquiry>();
  let processedEnquiries = List.empty<Enquiry>();

  let packageIdCounter = List.empty<(Nat, Nat)>();
  let enquiryIdCounter = List.empty<(Nat, Nat)>();
  let chatLeadIdCounter = List.empty<(Nat, Nat)>();

  // Access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Packages
  func getNextPackageId() : Nat {
    let id = packageIdCounter.size();
    packageIdCounter.add((id, id + 1));
    id;
  };

  func getNextEnquiryId() : Nat {
    let id = enquiryIdCounter.size();
    enquiryIdCounter.add((id, id + 1));
    id;
  };

  func getNextChatLeadId() : Nat {
    let id = chatLeadIdCounter.size();
    chatLeadIdCounter.add((id, id + 1));
    id;
  };

  public shared ({ caller }) func createPackage(pkg : Package) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create packages");
    };
    let id = getNextPackageId();
    let newPackage : Package = {
      pkg with
      id;
      order = id;
    };
    packages.add(id, newPackage);
    if (newPackage.isActive) {
      updateActivePackages(newPackage);
    };
    id;
  };

  public shared ({ caller }) func updatePackage(id : Nat, pkg : Package) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update packages");
    };
    switch (packages.get(id)) {
      case (null) { Runtime.trap("Package not found with id " # id.toText()) };
      case (?existingPackage) {
        let updatedPackage : Package = {
          pkg with
          id;
        };
        packages.add(id, updatedPackage);
        if (updatedPackage.isActive) {
          updateActivePackages(updatedPackage);
        } else {
          activePackages.remove(id);
        };
      };
    };
  };

  public shared ({ caller }) func deletePackage(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete packages");
    };
    packages.remove(id);
    activePackages.remove(id);
  };

  public shared ({ caller }) func togglePackageActiveStatus(id : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle package status");
    };
    switch (packages.get(id)) {
      case (null) { Runtime.trap("Package not found. id: " # id.toText()) };
      case (?pkg) {
        let updatedPackage : Package = {
          pkg with
          isActive = not pkg.isActive;
        };
        packages.add(id, updatedPackage);
        if (updatedPackage.isActive) {
          updateActivePackages(updatedPackage);
        } else {
          activePackages.remove(id);
        };
        updatedPackage.isActive;
      };
    };
  };

  public shared ({ caller }) func reorderPackages(order : [Nat]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder packages");
    };
    for (pkgId in order.values()) {
      switch (packages.get(pkgId)) {
        case (null) { Runtime.trap("Package not found when reordering. id: " # pkgId.toText()) };
        case (?pkg) {
          let updatedPackage : Package = {
            pkg with
            order = pkgId;
          };
          packages.add(pkgId, updatedPackage);
          if (updatedPackage.isActive) {
            updateActivePackages(updatedPackage);
          };
        };
      };
    };
  };

  // Enquiries
  public shared ({ caller }) func submitEnquiry(enquiry : Enquiry) : async Nat {
    let id = getNextEnquiryId();
    let newEnquiry : Enquiry = {
      enquiry with
      id;
      timestamp = Time.now();
    };
    enquiries.add(id, newEnquiry);
    pendingEnquiries.add(newEnquiry);
    id;
  };

  // Chat Leads
  public shared ({ caller }) func submitChatLead(lead : ChatLead) : async Nat {
    let id = getNextChatLeadId();
    let newLead : ChatLead = {
      lead with
      id;
      timestamp = Time.now();
    };
    chatLeads.add(id, newLead);
    id;
  };

  public shared query ({ caller }) func getAllChatLeads() : async [ChatLead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view chat leads");
    };
    chatLeads.values().toArray();
  };

  public query ({ caller }) func getAllActivePackages() : async [Package] {
    activePackages.values().toArray();
  };

  public query ({ caller }) func getPackageById(id : Nat) : async Package {
    switch (packages.get(id)) {
      case (null) { Runtime.trap("Package not found: id: " # id.toText()) };
      case (?pkg) { pkg };
    };
  };

  // Helper function to update active packages map
  func updateActivePackages(pkg : Package) {
    if (pkg.isActive) {
      activePackages.add(pkg.id, pkg);
    } else {
      activePackages.remove(pkg.id);
    };
  };

  public shared query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all enquiries");
    };
    let sortedEnquiries = enquiries.values().toArray().sort();
    sortedEnquiries;
  };

  // Seed packages
  do {
    let defaultDayItems = List.empty<DayItem>();
    for (d in Nat.range(1, 6)) {
      let defaultDayItem : DayItem = {
        day = d;
        title = "Default Title";
        description = "";
        activities = [];
      };
      defaultDayItems.add(defaultDayItem);
    };

    func getFirstDefaultDayItem(dayNumber : Nat) : DayItem {
      defaultDayItems.toArray().filter(func(day) { day.day == dayNumber })[0];
    };

    let andamanEscapePackage : Package = {
      id = getNextPackageId();
      name = "Andaman Escape";
      tagline = "3 Days/4 Nights Budget Package";
      duration = "3 Days 4 Nights";
      days = 3;
      nights = 4;
      category = "budget";
      price = 12999;
      priceLabel = "Budget";
      itinerary = [getFirstDefaultDayItem(1)];
      inclusions = [
        "Accommodation",
        "Breakfast",
        "Airport Transfers",
        "Sightseeing",
      ];
      exclusions = ["Airfare", "Lunch", "Personal Expenses"];
      highlights = [
        "Port Blair City Tour",
        "Ross Island Excursion",
        "Havelock Island with Radhanagar Beach",
        "Cellular Jail Light & Sound Show",
      ];
      isActive = true;
      order = 0;
    };

    let andamanExplorerPackage : Package = {
      id = getNextPackageId();
      name = "Andaman Explorer";
      tagline = "4 Days/5 Nights Mid-Range Package";
      duration = "4 Days 5 Nights";
      days = 4;
      nights = 5;
      category = "midrange";
      price = 18999;
      priceLabel = "Midrange";
      itinerary = [getFirstDefaultDayItem(2)];
      inclusions = [
        "Accommodation",
        "Breakfast & Dinner",
        "Airport Transfers",
        "Sightseeing",
        "Snorkeling",
        "Glass-Bottom Boat Ride",
      ];
      exclusions = ["Airfare", "Lunch", "Personal Expenses", "Water Sports"];
      highlights = [
        "Port Blair City Tour",
        "Ross Island Excursion",
        "Havelock Island with Radhanagar Beach",
        "Neil Island Beach Tour - Laxmanpur & Bharatpur Beach",
        "Snorkeling & Glass-Bottom Boat Ride",
      ];
      isActive = true;
      order = 1;
    };

    let andamanPremiumPackage : Package = {
      id = getNextPackageId();
      name = "Andaman Premium";
      tagline = "5 Days/6 Nights Premium Package";
      duration = "5 Days 6 Nights";
      days = 5;
      nights = 6;
      category = "premium";
      price = 26999;
      priceLabel = "Premium";
      itinerary = [getFirstDefaultDayItem(3)];
      inclusions = [
        "Luxury Accommodation",
        "All Meals",
        "Airport Transfers",
        "Sightseeing",
        "Scuba Diving",
        "Sea Walking",
        "Transfers to Elephant Beach",
      ];
      exclusions = ["Airfare", "Personal Expenses", "Alcohol"];
      highlights = [
        "Port Blair City Tour",
        "Baratang Island Tour (Limestone Caves, Mangrove Creek)",
        "Ross Island Excursion",
        "Havelock Island with Radhanagar Beach",
        "Neil Island Beach Tour",
        "Scuba Diving & Sea Walk Experiences",
      ];
      isActive = true;
      order = 2;
    };

    packages.add(andamanEscapePackage.id, andamanEscapePackage);
    packages.add(andamanExplorerPackage.id, andamanExplorerPackage);
    packages.add(andamanPremiumPackage.id, andamanPremiumPackage);

    // Add active packages initially
    updateActivePackages(andamanEscapePackage);
    updateActivePackages(andamanExplorerPackage);
    updateActivePackages(andamanPremiumPackage);
  };
};
