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
