export interface DayItem {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface PackageData {
  id: number;
  name: string;
  tagline: string;
  category: string;
  duration: string;
  days: number;
  nights: number;
  price: number;
  priceLabel: string;
  image: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: DayItem[];
  isActive: boolean;
}

export const staticPackages: PackageData[] = [
  {
    id: 1,
    name: "Andaman Escape",
    tagline: "A short budget-friendly tropical getaway",
    category: "Budget",
    duration: "3D / 4N",
    days: 3,
    nights: 4,
    price: 12999,
    priceLabel: "starting from",
    image: "/assets/generated/andaman-budget.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "Cellular Jail L&S Show",
      "Ross Island",
      "North Bay Beach",
      "Radhanagar Beach",
      "Glass-Bottom Boat",
      "Island Hopping",
    ],
    inclusions: [
      "3 nights hotel accommodation (on twin/double sharing)",
      "All transfers by road & ferry",
      "Welcome drink on arrival",
      "Sightseeing as per itinerary",
      "Daily breakfast",
      "Arrival & departure assistance",
    ],
    exclusions: [
      "Airfare (to/from Port Blair)",
      "Personal expenses & tips",
      "Entry fees not mentioned",
      "Camera charges at monuments",
      "Adventure activities unless specified",
      "GST & other applicable taxes",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Port Blair + Cellular Jail",
        description:
          "Arrive at Port Blair (VTZ/BBI Airport). Transfer to hotel, freshen up and check-in. In the evening, visit the iconic Cellular Jail and witness the mesmerizing Light & Sound Show that narrates the valour of freedom fighters.",
        activities: [
          "Airport Pickup",
          "Hotel Check-in",
          "Cellular Jail Visit",
          "Light & Sound Show",
        ],
      },
      {
        day: 2,
        title: "Ross Island + North Bay + Corbyn's Cove",
        description:
          "Morning speedboat ride to Ross Island (former British HQ with ruins and deer). Then proceed to North Bay for water sports — glass-bottom boat, snorkeling. Evening leisure at scenic Corbyn's Cove Beach.",
        activities: [
          "Ross Island Tour",
          "North Bay Water Sports",
          "Glass-Bottom Boat",
          "Corbyn's Cove Beach",
        ],
      },
      {
        day: 3,
        title: "Havelock — Radhanagar Beach (Asia's Finest)",
        description:
          "Morning ferry to Havelock Island (Swaraj Dweep). Enjoy the world-famous Radhanagar Beach (Beach No. 7) — rated among Asia's top beaches. Sunset views are spectacular. Return to Port Blair.",
        activities: [
          "Ferry to Havelock",
          "Radhanagar Beach",
          "Beach Walk",
          "Sunset Views",
        ],
      },
      {
        day: 4,
        title: "Departure — Sweet Memories!",
        description:
          "Morning free for shopping at Aberdeen Bazaar. Transfer to Port Blair Airport for onward journey. Carry home souvenirs and island memories.",
        activities: ["Local Shopping", "Airport Drop", "Departure"],
      },
    ],
  },
  {
    id: 2,
    name: "Andaman Explorer",
    tagline: "Mid-range island hopping adventure",
    category: "Explorer",
    duration: "4D / 5N",
    days: 4,
    nights: 5,
    price: 18999,
    priceLabel: "starting from",
    image: "/assets/generated/andaman-explorer.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "Cellular Jail L&S Show",
      "Elephant Beach Snorkeling",
      "Neil Island",
      "Radhanagar Beach",
      "Sea Walk",
      "Ferry Cruise",
    ],
    inclusions: [
      "4 nights hotel accommodation (on twin/double sharing)",
      "All transfers by road & ferry (AC)",
      "Welcome drink on arrival",
      "Sightseeing as per itinerary",
      "Daily breakfast + 2 dinners",
      "Arrival & departure assistance",
    ],
    exclusions: [
      "Airfare (to/from Port Blair)",
      "Personal expenses & tips",
      "Entry fees not mentioned",
      "Camera charges at monuments",
      "Adventure activities unless specified",
      "GST & other applicable taxes",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Port Blair + Cellular Jail",
        description:
          "Arrive at Port Blair. Hotel check-in and freshen up. Evening visit to the historic Cellular Jail followed by the Light & Sound Show. Night stay in Port Blair.",
        activities: [
          "Airport Pickup",
          "Hotel Check-in",
          "Cellular Jail",
          "L&S Show",
        ],
      },
      {
        day: 2,
        title: "Ross Island + North Bay Water Sports",
        description:
          "Speedboat excursion to Ross Island — explore the colonial ruins amid peacocks and deer. Continue to North Bay for thrilling water sports including snorkeling, glass-bottom boat, and sea walking.",
        activities: [
          "Ross Island",
          "North Bay",
          "Snorkeling",
          "Glass-Bottom Boat",
          "Sea Walk",
        ],
      },
      {
        day: 3,
        title: "Havelock — Radhanagar & Elephant Beach",
        description:
          "Morning ferry to Havelock Island (Swaraj Dweep). Visit Radhanagar Beach for a morning swim, then proceed to Elephant Beach for coral snorkeling and water sports. Overnight in Havelock.",
        activities: [
          "Ferry to Havelock",
          "Radhanagar Beach",
          "Elephant Beach",
          "Coral Snorkeling",
        ],
      },
      {
        day: 4,
        title: "Neil Island — Laxmanpur & Bharatpur",
        description:
          "Ferry to Neil Island (Shaheed Dweep). Visit the natural coral bridge at Laxmanpur Beach and the calm Bharatpur Beach ideal for swimming. Return to Port Blair.",
        activities: [
          "Ferry to Neil Island",
          "Laxmanpur Beach",
          "Natural Bridge",
          "Bharatpur Beach",
        ],
      },
      {
        day: 5,
        title: "Departure — Carry the Tropics Home!",
        description:
          "Morning free for souvenir shopping at Aberdeen Bazaar or local markets. Hotel checkout and transfer to Airport for departure.",
        activities: ["Local Shopping", "Hotel Checkout", "Airport Drop"],
      },
    ],
  },
  {
    id: 3,
    name: "Andaman Premium",
    tagline: "Luxury extended island discovery",
    category: "Premium",
    duration: "5D / 6N",
    days: 5,
    nights: 6,
    price: 26999,
    priceLabel: "starting from",
    image: "/assets/generated/andaman-premium.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "Baratang Limestone Caves",
      "Mangrove Creek Safari",
      "Scuba Diving",
      "Sea Walk",
      "Cellular Jail L&S",
      "Havelock + Neil Islands",
    ],
    inclusions: [
      "5 nights premium hotel accommodation (on twin/double sharing)",
      "All transfers by road, AC vehicle & private ferry",
      "Welcome drink & fruit basket on arrival",
      "Sightseeing & activities as per itinerary",
      "Daily breakfast + daily dinner",
      "1 complimentary scuba dive or sea walk",
      "Arrival & departure assistance",
    ],
    exclusions: [
      "Airfare (to/from Port Blair)",
      "Personal expenses & tips",
      "Entry fees not mentioned",
      "Camera charges at monuments",
      "Additional adventure activities",
      "GST & other applicable taxes",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival + Cellular Jail L&S Show",
        description:
          "Arrive at Port Blair Airport. Our representative greets you with a welcome sign. Comfortable hotel check-in. Evening guided tour of Cellular Jail and the iconic Light & Sound Show.",
        activities: [
          "VIP Airport Pickup",
          "Premium Hotel Check-in",
          "Cellular Jail Tour",
          "L&S Show",
        ],
      },
      {
        day: 2,
        title: "Baratang — Limestone Caves & Mangrove Creek",
        description:
          "Full-day excursion to Baratang Island. Cruise through dense mangrove creeks by motorboat. Trek to the spectacular limestone caves with natural stalactites and stalagmites. A true wilderness adventure.",
        activities: [
          "Mangrove Creek Boat Safari",
          "Limestone Caves Trek",
          "Baratang Village",
          "Mud Volcano",
        ],
      },
      {
        day: 3,
        title: "Port Blair — Ross Island & Corbyn's Cove",
        description:
          "Leisurely morning. Explore Ross Island in depth — the former British administrative HQ, now a nature reserve. Afternoon at Corbyn's Cove Beach. Visit the Samudrika Naval Museum.",
        activities: [
          "Ross Island",
          "Samudrika Museum",
          "Corbyn's Cove Beach",
          "North Bay Snorkeling",
        ],
      },
      {
        day: 4,
        title: "Havelock — Radhanagar + Elephant Beach",
        description:
          "Morning ferry to Havelock Island. Full-day beach experience — morning dip at Radhanagar Beach (Asia's No. 7 Best Beach), then Elephant Beach for coral snorkeling and kayaking. Overnight in Havelock.",
        activities: [
          "Ferry to Havelock",
          "Radhanagar Beach",
          "Elephant Beach",
          "Snorkeling",
          "Kayaking",
        ],
      },
      {
        day: 5,
        title: "Neil Island — Scuba Diving & Sea Walk",
        description:
          "Ferry to Neil Island. Explore the stunning natural coral bridge at Laxmanpur Beach. Enjoy a thrilling scuba diving session or sea walk (complimentary for this package). Visit Bharatpur and Sitapur beaches.",
        activities: [
          "Neil Island Ferry",
          "Scuba Diving / Sea Walk",
          "Laxmanpur Beach",
          "Natural Bridge",
          "Bharatpur Beach",
        ],
      },
      {
        day: 6,
        title: "Departure — Until We Meet Again!",
        description:
          "Morning at leisure. Check out from hotel. Transfer to Port Blair Airport for your onward journey. Depart with unforgettable island memories.",
        activities: [
          "Leisure Morning",
          "Hotel Checkout",
          "Souvenir Shopping",
          "Airport Drop",
        ],
      },
    ],
  },
];

export const andamanCruisePackages: PackageData[] = [
  {
    id: 30,
    name: "Andaman Cruise Escape",
    tagline: "Sail the islands on a budget-friendly cruise",
    category: "Budget",
    duration: "3N Cruise",
    days: 3,
    nights: 3,
    price: 15999,
    priceLabel: "starting from",
    image: "/assets/generated/andaman-cruise-budget.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "Cruise Ship Stay",
      "Port Blair Embarkation",
      "Havelock Island Stop",
      "Onboard Dining & Entertainment",
      "Cellular Jail Visit",
      "Glass-Bottom Boat",
    ],
    inclusions: [
      "3 nights onboard cruise accommodation (twin/double cabin)",
      "All onboard meals (breakfast, lunch & dinner)",
      "Welcome cocktail & evening snacks",
      "Onboard entertainment — live music, dance, cultural shows",
      "Island stops: Port Blair, Havelock",
      "Guided shore excursion at each port",
      "Life jackets & safety orientation",
      "Port Blair arrival & departure assistance",
    ],
    exclusions: [
      "Airfare to/from Port Blair",
      "Personal drinks & laundry",
      "Water sports activities (optional add-on)",
      "Spa & casino (if applicable)",
      "Entry fees at monuments",
      "GST & port taxes",
    ],
    itinerary: [
      {
        day: 1,
        title: "Embarkation at Port Blair",
        description:
          "Report to Port Blair Harbour by 12:00 noon. Complete check-in and cabin allocation. Safety drill followed by sail-away welcome party on deck. Enjoy the panoramic views of the Andaman Sea as the ship sets sail. Evening dinner onboard.",
        activities: [
          "Port Blair Harbour Check-in",
          "Cabin Allocation",
          "Safety Drill",
          "Sail-Away Party",
          "Onboard Welcome Dinner",
        ],
      },
      {
        day: 2,
        title: "Havelock Island (Swaraj Dweep) Port Stop",
        description:
          "Cruise anchors at Havelock Island. Guests are ferried ashore for a guided excursion. Visit the iconic Radhanagar Beach (Asia's Best Beach), take a glass-bottom boat ride to view coral reefs, and enjoy the crystal-clear waters. Return to ship by 5:00 PM. Cultural evening onboard.",
        activities: [
          "Ferry to Shore",
          "Radhanagar Beach",
          "Glass-Bottom Boat",
          "Coral Reef Viewing",
          "Return to Ship",
          "Cultural Show Onboard",
        ],
      },
      {
        day: 3,
        title: "Neil Island Stop + Return to Port Blair",
        description:
          "Morning stop at Neil Island (Shaheed Dweep). Explore the natural coral bridge at Laxmanpur Beach, enjoy swimming at Bharatpur Beach. Lunch onboard as the ship returns to Port Blair. Disembarkation by 5:00 PM.",
        activities: [
          "Neil Island Shore Visit",
          "Laxmanpur Natural Bridge",
          "Bharatpur Beach Swimming",
          "Farewell Lunch Onboard",
          "Port Blair Disembarkation",
        ],
      },
    ],
  },
  {
    id: 31,
    name: "Andaman Cruise Explorer",
    tagline: "Island-hopping cruise with adventure & culture",
    category: "Explorer",
    duration: "5N Cruise",
    days: 5,
    nights: 5,
    price: 28999,
    priceLabel: "starting from",
    image: "/assets/generated/andaman-cruise-explorer.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "5 Islands in 5 Nights",
      "Snorkeling & Sea Walk",
      "Baratang Mangrove Safari",
      "Ross Island Ruins",
      "Onboard Pool & Spa",
      "Live DJ Night",
    ],
    inclusions: [
      "5 nights onboard cruise accommodation (AC cabin, twin sharing)",
      "All meals onboard (buffet-style)",
      "Guided shore excursions at each island",
      "1 complimentary snorkeling session",
      "1 sea walk (shallow-water walk)",
      "Onboard pool, gym & spa access",
      "Live entertainment nightly",
      "Port Blair embarkation & disembarkation assistance",
    ],
    exclusions: [
      "Airfare to/from Port Blair",
      "Personal expenses & tips",
      "Premium spa treatments",
      "Alcoholic beverages",
      "Scuba diving (optional add-on @ ₹2,500)",
      "GST & port taxes",
    ],
    itinerary: [
      {
        day: 1,
        title: "Embarkation — Port Blair",
        description:
          "Arrive Port Blair. Board cruise ship at 11:00 AM. Cabin allocation, safety briefing. Afternoon visit to Cellular Jail (shore excursion). Evening sail-away dinner with live music.",
        activities: [
          "Boarding & Cabin Check-in",
          "Cellular Jail Shore Visit",
          "Sail-Away Dinner",
          "Live Band Performance",
        ],
      },
      {
        day: 2,
        title: "Ross Island + North Bay",
        description:
          "Morning shore excursion to Ross Island — explore colonial ruins, peacock sanctuary and deer park. Afternoon at North Bay Island for water sports: snorkeling, sea walk, glass-bottom boat. Return to ship for BBQ night.",
        activities: [
          "Ross Island Guided Tour",
          "North Bay Water Sports",
          "Snorkeling",
          "Sea Walk",
          "BBQ Night Onboard",
        ],
      },
      {
        day: 3,
        title: "Havelock — Radhanagar & Elephant Beach",
        description:
          "Full day at Havelock Island. Morning at Radhanagar Beach (Asia's finest). Afternoon trek to Elephant Beach for coral snorkeling. Sunset cocktails on deck. Movie night onboard.",
        activities: [
          "Radhanagar Beach",
          "Elephant Beach Snorkeling",
          "Coral Exploration",
          "Sunset Deck Cocktails",
          "Movie Night",
        ],
      },
      {
        day: 4,
        title: "Baratang — Mangrove Safari & Limestone Caves",
        description:
          "Rare excursion to Baratang Island. Motorboat ride through stunning mangrove creeks. Trek to breathtaking limestone caves with stalactites and stalagmites. Mud volcano visit. DJ night onboard.",
        activities: [
          "Mangrove Creek Safari",
          "Limestone Caves Trek",
          "Mud Volcano",
          "Jungle Walk",
          "DJ Night Onboard",
        ],
      },
      {
        day: 5,
        title: "Neil Island + Farewell & Disembarkation",
        description:
          "Morning stop at Neil Island. Natural coral bridge at Laxmanpur, relaxing swim at Bharatpur. Farewell gala lunch onboard. Ship returns to Port Blair. Disembarkation by 6:00 PM.",
        activities: [
          "Neil Island Shore Visit",
          "Natural Coral Bridge",
          "Bharatpur Beach",
          "Farewell Gala Lunch",
          "Port Blair Disembarkation",
        ],
      },
    ],
  },
  {
    id: 32,
    name: "Andaman Cruise Premium",
    tagline: "Luxury cruise through paradise islands",
    category: "Premium",
    duration: "7N Cruise",
    days: 7,
    nights: 7,
    price: 54999,
    priceLabel: "starting from",
    image: "/assets/generated/andaman-cruise-premium.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "7 Islands in 7 Nights",
      "Luxury Suite Cabin",
      "Scuba Diving Certified",
      "Private Sunset Cruise",
      "Gala Dinner & Dance",
      "Full-Day Little Andaman",
    ],
    inclusions: [
      "7 nights luxury suite cabin (sea-facing, twin occupancy)",
      "All gourmet meals (à la carte + buffet) onboard",
      "Premium shore excursions at 7 islands",
      "1 certified scuba diving session (PADI certified instructor)",
      "Private sunset boat cruise at Havelock",
      "Unlimited use of pool, spa & gym",
      "Gala captain's dinner on night 4",
      "Complimentary fruit basket & in-cabin minibar",
      "Priority embarkation & disembarkation",
      "Dedicated concierge service",
    ],
    exclusions: [
      "Airfare to/from Port Blair",
      "Personal shopping & souvenirs",
      "Extra scuba dives beyond the complimentary session",
      "Premium alcohol & champagne",
      "GST & port taxes",
    ],
    itinerary: [
      {
        day: 1,
        title: "VIP Embarkation — Port Blair",
        description:
          "Exclusive priority boarding at Port Blair Harbour. Suite check-in with welcome champagne. Afternoon guided tour of Cellular Jail (private guide). Sail-away from Port Blair with gourmet dinner and live orchestra.",
        activities: [
          "Priority VIP Boarding",
          "Suite Check-in & Champagne",
          "Cellular Jail Private Tour",
          "Gourmet Sail-Away Dinner",
          "Live Orchestra",
        ],
      },
      {
        day: 2,
        title: "Ross & Viper Islands — Colonial History",
        description:
          "Shore excursion to Ross Island (British ruins) and Viper Island (notorious Andaman prison). Private history guide. Afternoon back onboard — poolside lunch and spa session.",
        activities: [
          "Ross Island Private Tour",
          "Viper Island Prison Visit",
          "History Guide",
          "Poolside Lunch",
          "Spa Session",
        ],
      },
      {
        day: 3,
        title: "Havelock — Private Beach & Scuba Diving",
        description:
          "Full day at Havelock Island. Private beach setup at Radhanagar. PADI-certified scuba diving in the Andaman's richest coral zone. Private sunset cruise at dusk. Cocktail night onboard.",
        activities: [
          "Private Beach Setup",
          "Radhanagar Beach",
          "Scuba Diving (PADI)",
          "Private Sunset Cruise",
          "Cocktail Night",
        ],
      },
      {
        day: 4,
        title: "Neil Island + Captain's Gala Dinner",
        description:
          "Morning at Neil Island — natural coral bridge, beach picnic. Afternoon return to ship. Preparation for the legendary Captain's Gala Dinner — formal dress, 5-course meal, live jazz band.",
        activities: [
          "Neil Island Excursion",
          "Natural Coral Bridge",
          "Beach Picnic",
          "Captain's Gala Dinner",
          "Live Jazz Band",
        ],
      },
      {
        day: 5,
        title: "Baratang — Mangroves, Caves & Mud Volcanoes",
        description:
          "Private motorboat through Baratang mangrove creeks. Exclusive limestone cave trek. Mud volcano. Jungle photowalk with naturalist guide. Evening bonfire on ship deck.",
        activities: [
          "Private Mangrove Safari",
          "Limestone Caves",
          "Mud Volcano",
          "Naturalist Guide Walk",
          "Deck Bonfire",
        ],
      },
      {
        day: 6,
        title: "Little Andaman — Untouched Wilderness",
        description:
          "Rare cruise stop at Little Andaman (South Andaman). White sand Butler Bay Beach. Waterfalls, surfing point, coconut plantations. Indigenous tribal reserve (viewpoint only). Gourmet beachside dinner.",
        activities: [
          "Butler Bay Beach",
          "Whisper Wave Waterfall",
          "Surfing Point",
          "Coconut Plantation Tour",
          "Beachside Gourmet Dinner",
        ],
      },
      {
        day: 7,
        title: "Farewell — Port Blair Disembarkation",
        description:
          "Final morning at sea with champagne breakfast on deck. Complimentary souvenir from Holiday Pulse. Disembark at Port Blair by 12:00 PM with transfer to airport.",
        activities: [
          "Champagne Breakfast on Deck",
          "Farewell Ceremony",
          "Holiday Pulse Souvenir",
          "Port Blair Disembarkation",
          "Airport Transfer",
        ],
      },
    ],
  },
];

export const lakshadweepPackages: PackageData[] = [
  {
    id: 10,
    name: "Lakshadweep Getaway",
    tagline: "Crystal lagoons & coral paradise",
    category: "Budget",
    duration: "3D / 4N",
    days: 3,
    nights: 4,
    price: 24999,
    priceLabel: "starting from",
    image: "/assets/generated/lakshadweep-budget.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "Agatti Island Lagoon",
      "Snorkeling",
      "Glass-Bottom Boat",
      "Beach Walk",
      "Sunset Cruise",
      "Coral Reef Viewing",
    ],
    inclusions: [
      "3 nights accommodation (twin sharing)",
      "All transfers by boat & road",
      "Daily breakfast + dinner",
      "Snorkeling equipment",
      "Entry permits",
      "Arrival assistance",
    ],
    exclusions: [
      "Airfare to Agatti",
      "Personal expenses",
      "Scuba diving (optional add-on)",
      "GST",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Agatti + Lagoon Welcome",
        description:
          "Fly into Agatti Island airport. Greeted by turquoise lagoons unlike anything you've seen. Check-in to beach resort. Evening lagoon walk and welcome dinner.",
        activities: [
          "Airport pickup",
          "Resort check-in",
          "Lagoon walk",
          "Welcome dinner",
        ],
      },
      {
        day: 2,
        title: "Bangaram Island Day Trip",
        description:
          "Speedboat to uninhabited Bangaram Island — pristine beaches, coral gardens, crystal water. Snorkeling session over the reef. Glass-bottom boat ride to view marine life.",
        activities: [
          "Bangaram Island boat",
          "Snorkeling",
          "Glass-bottom boat",
          "Beach picnic",
        ],
      },
      {
        day: 3,
        title: "Water Sports & Local Village",
        description:
          "Morning water sports — kayaking, paddleboarding. Visit a local Lakshadweep village and learn about island culture. Shopping for local crafts.",
        activities: [
          "Kayaking",
          "Paddleboarding",
          "Village visit",
          "Craft shopping",
        ],
      },
      {
        day: 4,
        title: "Departure",
        description:
          "Morning at leisure. Checkout and transfer to Agatti airport for departure.",
        activities: ["Morning leisure", "Hotel checkout", "Airport drop"],
      },
    ],
  },
  {
    id: 11,
    name: "Lakshadweep Explorer",
    tagline: "Multi-island coral adventure",
    category: "Explorer",
    duration: "5D / 6N",
    days: 5,
    nights: 6,
    price: 39999,
    priceLabel: "starting from",
    image: "/assets/generated/lakshadweep-explorer.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "Kavaratti Island",
      "Minicoy Island",
      "Scuba Diving",
      "Dolphin Spotting",
      "Traditional Laccadive Dance",
      "Lighthouse Visit",
    ],
    inclusions: [
      "5 nights accommodation (twin sharing)",
      "Inter-island boat transfers",
      "All meals (breakfast + lunch + dinner)",
      "1 scuba dive session",
      "Entry permits for all islands",
      "Guided tours",
    ],
    exclusions: [
      "Airfare to Agatti",
      "Personal expenses",
      "Additional water sports",
      "GST",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival + Agatti Island",
        description: "Fly into Agatti. Transfer to resort. Evening beach walk.",
        activities: ["Arrival", "Resort check-in", "Beach walk"],
      },
      {
        day: 2,
        title: "Kavaratti Island — Capital of Lakshadweep",
        description:
          "Boat to Kavaratti. Visit the Ujra Mosque, Marine Aquarium. Snorkeling in Kavaratti lagoon.",
        activities: [
          "Kavaratti boat",
          "Mosque visit",
          "Marine Aquarium",
          "Lagoon snorkeling",
        ],
      },
      {
        day: 3,
        title: "Scuba Diving & Coral Reefs",
        description:
          "Certified scuba diving session over pristine coral reefs. Afternoon dolphin spotting cruise.",
        activities: [
          "Scuba diving",
          "Coral reef exploration",
          "Dolphin cruise",
        ],
      },
      {
        day: 4,
        title: "Minicoy Island — Southernmost Atoll",
        description:
          "Full day at Minicoy. Visit the 100-year-old lighthouse. Witness traditional Lava dance performance. Tuna fishing village tour.",
        activities: [
          "Minicoy boat",
          "Lighthouse visit",
          "Lava dance",
          "Fishing village",
        ],
      },
      {
        day: 5,
        title: "Leisure + Water Sports",
        description:
          "Morning water sports — jet ski, parasailing. Afternoon souvenir shopping.",
        activities: ["Jet skiing", "Parasailing", "Shopping"],
      },
      {
        day: 6,
        title: "Departure",
        description: "Checkout and transfer to airport.",
        activities: ["Checkout", "Airport drop"],
      },
    ],
  },
  {
    id: 12,
    name: "Lakshadweep Premium",
    tagline: "Luxury private island odyssey",
    category: "Premium",
    duration: "7D / 8N",
    days: 7,
    nights: 8,
    price: 58999,
    priceLabel: "starting from",
    image: "/assets/generated/lakshadweep-premium.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "Private Boat Charter",
      "All 5 Major Islands",
      "Sunset Dinner Cruise",
      "Night Snorkeling",
      "Kayaking",
      "Luxury Resort Stay",
    ],
    inclusions: [
      "7 nights luxury accommodation",
      "Private boat charter for island hopping",
      "All meals + evening snacks",
      "All water sports unlimited",
      "Night snorkeling gear",
      "Sunset dinner cruise",
      "Entry permits",
    ],
    exclusions: ["Airfare", "Personal expenses", "GST"],
    itinerary: [
      {
        day: 1,
        title: "Arrival — VIP Welcome",
        description:
          "Fly into Agatti. Private transfer. Luxury resort check-in with welcome drink.",
        activities: [
          "VIP airport pickup",
          "Luxury resort check-in",
          "Welcome cocktail",
        ],
      },
      {
        day: 2,
        title: "Agatti — Lagoon Safari",
        description:
          "Private lagoon safari by glass-bottom boat. Exclusive snorkeling over untouched coral.",
        activities: ["Lagoon safari", "Private snorkeling", "Beach dining"],
      },
      {
        day: 3,
        title: "Bangaram — Private Island Day",
        description:
          "Private day on Bangaram Island. Exclusive beach, water sports unlimited.",
        activities: [
          "Private boat to Bangaram",
          "Unlimited water sports",
          "Beach BBQ",
        ],
      },
      {
        day: 4,
        title: "Kavaratti — Culture & Dive",
        description:
          "Kavaratti Island guided tour. Scuba diving with expert instructor.",
        activities: ["Kavaratti tour", "Scuba diving", "Cultural show"],
      },
      {
        day: 5,
        title: "Minicoy — Lighthouse & Dance",
        description:
          "Minicoy Island with lighthouse and traditional performances.",
        activities: ["Lighthouse visit", "Lava dance", "Seafood dinner"],
      },
      {
        day: 6,
        title: "Night Snorkeling + Sunset Cruise",
        description:
          "Guided night snorkeling over bioluminescent waters. Sunset dinner cruise.",
        activities: ["Night snorkeling", "Sunset dinner cruise"],
      },
      {
        day: 7,
        title: "Leisure + Spa",
        description: "Morning spa treatment. Afternoon leisure on beach.",
        activities: ["Spa session", "Beach relaxation", "Shopping"],
      },
      {
        day: 8,
        title: "Departure",
        description: "Late checkout. Transfer to airport.",
        activities: ["Late checkout", "Airport drop"],
      },
    ],
  },
];

export const northeastPackages: PackageData[] = [
  {
    id: 20,
    name: "NE Sampler",
    tagline: "Meghalaya mists & Assam tea trails",
    category: "Budget",
    duration: "4D / 5N",
    days: 4,
    nights: 5,
    price: 19999,
    priceLabel: "starting from",
    image: "/assets/generated/northeast-budget.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "Living Root Bridges",
      "Cherrapunji Waterfalls",
      "Shillong Peak",
      "Kaziranga Day Trip",
      "Tea Garden Visit",
      "Don Bosco Museum",
    ],
    inclusions: [
      "4 nights accommodation (twin sharing)",
      "All road transfers",
      "Daily breakfast",
      "Sightseeing as per itinerary",
      "Arrival assistance",
    ],
    exclusions: [
      "Airfare to Guwahati",
      "Lunch & dinner",
      "Entry fees",
      "Personal expenses",
      "GST",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Guwahati + Shillong",
        description:
          "Fly into Guwahati. Drive to Shillong (3 hrs, Scotland of the East). Visit Don Bosco Museum. Check-in.",
        activities: [
          "Guwahati pickup",
          "Drive to Shillong",
          "Don Bosco Museum",
          "Hotel check-in",
        ],
      },
      {
        day: 2,
        title: "Cherrapunji — Waterfalls & Caves",
        description:
          "Day trip to Cherrapunji (one of wettest places on Earth). Visit Nohkalikai Falls, Mawsmai Cave, Seven Sisters Falls viewpoint.",
        activities: [
          "Nohkalikai Falls",
          "Mawsmai Cave",
          "Seven Sisters viewpoint",
          "Local lunch",
        ],
      },
      {
        day: 3,
        title: "Living Root Bridges Trek",
        description:
          "Trek to the famous Double Decker Living Root Bridge at Nongriat village. Natural wonder created by Khasi tribe over centuries.",
        activities: [
          "Nongriat trek",
          "Double Decker Root Bridge",
          "Swimming pool visit",
          "Village walk",
        ],
      },
      {
        day: 4,
        title: "Kaziranga Day Trip",
        description:
          "Drive to Kaziranga National Park. Elephant safari at dawn to spot one-horned rhinoceros. Assam tea garden visit.",
        activities: [
          "Elephant safari",
          "Rhino spotting",
          "Tea garden visit",
          "Tea tasting",
        ],
      },
      {
        day: 5,
        title: "Departure from Guwahati",
        description: "Drive back to Guwahati Airport for departure.",
        activities: ["Drive to Guwahati", "Airport drop", "Departure"],
      },
    ],
  },
  {
    id: 21,
    name: "NE Odyssey",
    tagline: "Meghalaya peaks & Sikkim monasteries",
    category: "Explorer",
    duration: "6D / 7N",
    days: 6,
    nights: 7,
    price: 32999,
    priceLabel: "starting from",
    image: "/assets/generated/northeast-explorer.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "Tsomgo Lake",
      "Rumtek Monastery",
      "Gangtok Cable Car",
      "Living Root Bridges",
      "Dawki River",
      "Yumthang Valley",
    ],
    inclusions: [
      "6 nights accommodation (twin sharing)",
      "All transfers by AC vehicle",
      "Daily breakfast + dinner",
      "Sightseeing & entry fees",
      "Permits",
    ],
    exclusions: ["Airfare", "Lunch", "Personal expenses", "GST"],
    itinerary: [
      {
        day: 1,
        title: "Arrival Bagdogra + Gangtok",
        description:
          "Fly to Bagdogra. Drive to Gangtok, capital of Sikkim. Evening MG Road walk.",
        activities: ["Bagdogra pickup", "Drive to Gangtok", "MG Road walk"],
      },
      {
        day: 2,
        title: "Tsomgo Lake + Baba Mandir",
        description:
          "Tsomgo (Changu) Lake at 12,400 ft altitude. Sacred Baba Mandir at Nathu La border. Yak rides.",
        activities: [
          "Tsomgo Lake",
          "Baba Mandir",
          "Yak ride",
          "Nathu La border view",
        ],
      },
      {
        day: 3,
        title: "Rumtek Monastery + Gangtok Local",
        description:
          "Rumtek Monastery — one of largest Tibetan Buddhist monasteries outside Tibet. Namgyal Institute, Flower Exhibition Centre, cable car.",
        activities: [
          "Rumtek Monastery",
          "Cable car ride",
          "Enchey Monastery",
          "Do-Drul Stupa",
        ],
      },
      {
        day: 4,
        title: "Drive to Shillong",
        description:
          "Drive from Gangtok to Shillong via Guwahati. Overnight in Shillong.",
        activities: ["Scenic drive", "Tea break", "Shillong check-in"],
      },
      {
        day: 5,
        title: "Dawki + Living Root Bridges",
        description:
          "Boat ride on crystal-clear Dawki (Umngot) River on India-Bangladesh border. Trek to Living Root Bridge.",
        activities: ["Dawki river boat", "Border view", "Root bridge trek"],
      },
      {
        day: 6,
        title: "Mawlynnong + Mawsmai Cave",
        description:
          "Visit Mawlynnong — Asia's cleanest village. Mawsmai Cave. Return to Guwahati.",
        activities: ["Mawlynnong village", "Mawsmai Cave", "Drive to Guwahati"],
      },
      {
        day: 7,
        title: "Departure",
        description: "Airport drop and departure.",
        activities: ["Airport drop", "Departure"],
      },
    ],
  },
  {
    id: 22,
    name: "NE Grand Tour",
    tagline: "Ultimate 4-state North-East expedition",
    category: "Premium",
    duration: "9D / 10N",
    days: 9,
    nights: 10,
    price: 52999,
    priceLabel: "starting from",
    image: "/assets/generated/northeast-premium.dim_800x500.jpg",
    isActive: true,
    highlights: [
      "Tawang Monastery",
      "Kaziranga Safari",
      "Yumthang Valley",
      "Ziro Valley",
      "Majuli Island",
      "Arunachal Tribal Culture",
    ],
    inclusions: [
      "9 nights premium accommodation",
      "All transfers (AC + tempo traveller)",
      "All meals",
      "All sightseeing & permits",
      "Kaziranga jeep safari",
      "Expert local guide",
    ],
    exclusions: ["Airfare", "Personal expenses", "GST"],
    itinerary: [
      {
        day: 1,
        title: "Arrival Guwahati + Kaziranga",
        description: "Arrive Guwahati. Drive to Kaziranga. Evening briefing.",
        activities: ["Guwahati arrival", "Drive to Kaziranga"],
      },
      {
        day: 2,
        title: "Kaziranga — Jeep & Elephant Safari",
        description:
          "Dawn jeep safari in Central Range. Elephant safari at sunrise. One-horned rhino, wild elephants, tigers.",
        activities: ["Jeep safari", "Elephant safari", "Rhino spotting"],
      },
      {
        day: 3,
        title: "Majuli Island — World's Largest River Island",
        description:
          "Drive to Jorhat. Boat to Majuli. Explore Vaishnavite satras (monasteries).",
        activities: ["Boat to Majuli", "Satra visit", "Tribal mask making"],
      },
      {
        day: 4,
        title: "Arrive Itanagar (Arunachal Pradesh)",
        description:
          "Drive to Itanagar. Visit Ita Fort, Namdapha National Park entry point.",
        activities: ["Ita Fort", "Tribal museum", "Arunachal check-in"],
      },
      {
        day: 5,
        title: "Ziro Valley — UNESCO Heritage",
        description:
          "Ziro Valley — UNESCO World Heritage tentative site. Apatani tribal villages.",
        activities: ["Ziro valley", "Apatani village", "Tribal culture"],
      },
      {
        day: 6,
        title: "Tawang — Monks & Mountains",
        description:
          "Long scenic drive to Tawang via Sela Pass (13,700 ft). Sela Lake, Paradise Lake.",
        activities: ["Sela Pass", "Sela Lake", "Nuranang Falls"],
      },
      {
        day: 7,
        title: "Tawang Monastery",
        description:
          "Tawang Monastery — 17th century, one of world's largest Buddhist monasteries. War Memorial.",
        activities: ["Tawang Monastery", "War Memorial", "Local market"],
      },
      {
        day: 8,
        title: "Drive to Gangtok (Sikkim)",
        description: "Long drive to Gangtok via Guwahati. Overnight Gangtok.",
        activities: ["Scenic mountain drive", "Gangtok check-in"],
      },
      {
        day: 9,
        title: "Yumthang Valley — Valley of Flowers",
        description:
          "Yumthang Valley at 11,800 ft — called Valley of Flowers. Rhododendrons, hot springs.",
        activities: [
          "Yumthang Valley",
          "Zero Point",
          "Hot springs",
          "Rhododendron garden",
        ],
      },
      {
        day: 10,
        title: "Departure",
        description: "Drive to Bagdogra/Guwahati airport. Departure.",
        activities: ["Airport transfer", "Departure"],
      },
    ],
  },
];
