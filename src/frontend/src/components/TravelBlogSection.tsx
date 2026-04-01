import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";

interface Article {
  title: string;
  tag: string;
  tagColor: string;
  gradient: string;
  emoji: string;
  readTime: string;
  excerpt: string;
  fullContent: string[];
}

const articles: Article[] = [
  {
    title: "Best Time to Visit Andaman & Nicobar Islands",
    tag: "Andaman",
    tagColor: "bg-teal-100 text-teal-700",
    gradient: "from-teal-400 to-cyan-500",
    emoji: "🏝️",
    readTime: "4 min read",
    excerpt:
      "Planning your Andaman trip at the right time can make all the difference. Discover when the seas are calmest and the weather most inviting.",
    fullContent: [
      "The Andaman & Nicobar Islands are a year-round destination, but the best time to visit is between October and May. During these months, the weather is dry, seas are calm, and visibility underwater is excellent — perfect for snorkeling and scuba diving.",
      "October to December marks the early peak season. The monsoon has just retreated, beaches are freshly washed, and tourist footfall is still moderate. Water clarity is superb during November and December, making it ideal for snorkeling around Havelock (Swaraj Dweep) and Neil Island (Shaheed Dweep).",
      "January to March is the prime season. Temperatures hover around 23–30°C, skies are clear, and all ferry services and water sports are fully operational. This is the best window for Ross Island, Radhanagar Beach, and the famous Cellular Jail light show.",
      "April and May see rising temperatures (up to 35°C) but are still manageable. Fewer tourists mean better hotel deals. Avoid June to September — the South-West monsoon brings heavy rain, rough seas, and most boat and water sport activities are suspended. It is also the nesting season for sea turtles at Wandoor and Diglipur.",
    ],
  },
  {
    title: "Complete Lakshadweep Travel Guide 2025",
    tag: "Lakshadweep",
    tagColor: "bg-blue-100 text-blue-700",
    gradient: "from-blue-500 to-indigo-600",
    emoji: "🐠",
    readTime: "6 min read",
    excerpt:
      "Lakshadweep is India's best-kept secret — pristine lagoons, untouched coral reefs, and no crowds. Here's everything you need to know before you go.",
    fullContent: [
      "Lakshadweep requires an entry permit for all visitors, which is issued by the Lakshadweep Administration. Indian tourists need a permit that can be arranged through registered tour operators like Holiday Pulse — we handle all paperwork so you don't have to worry. Foreign nationals require additional clearances, so plan at least 4–6 weeks ahead.",
      "The most accessible islands are Agatti (the only one with an airport), Bangaram (a private resort island with no local population), and Kadmat (excellent for water sports). Minicoy Island in the south is the most culturally distinct, with Maldivian influences, a historic lighthouse, and a unique dialect.",
      "Top water sports include scuba diving, snorkeling, kayaking, glass-bottom boat rides, and deep-sea fishing. Bangaram's coral walls and Kadmat's house reef are considered among India's finest dive sites. Night snorkeling trips are offered on some packages — bioluminescent plankton makes this an otherworldly experience.",
      "Accommodation is limited by design — the government restricts development to preserve the ecosystem. Pack light cotton clothing, reef-safe sunscreen, and a good underwater camera. The best time to visit is November to April. Avoid the monsoon season (June–September) when the sea becomes rough and most resorts close.",
    ],
  },
  {
    title: "Top 10 Things to Do in North-East India",
    tag: "North-East",
    tagColor: "bg-green-100 text-green-700",
    gradient: "from-green-400 to-emerald-600",
    emoji: "🏔️",
    readTime: "5 min read",
    excerpt:
      "From living root bridges to tea gardens and river dolphins — North-East India is a treasure trove for explorers. Don't miss these must-dos.",
    fullContent: [
      "1. Kaziranga National Park (Assam) — Home to two-thirds of the world's one-horned rhinoceroses. Jeep and elephant safaris operate from November to April. 2. Majuli Island (Assam) — The world's largest river island on the Brahmaputra, famous for Vaishnavite monasteries called Satras and mask-making traditions.",
      "3. Cherrapunji & Mawsynram (Meghalaya) — Two of the wettest places on Earth. Visit the incredible double-decker living root bridges of Nongriat village — a 3,000-step trek worth every step. 4. Ziro Festival (Arunachal Pradesh) — A world-music festival set in a UNESCO tentative heritage site, held each September in a beautiful valley.",
      "5. Tawang Monastery (Arunachal Pradesh) — The largest monastery in India and second-largest in the world, perched at 10,000 ft with breathtaking views. 6. Dawki River (Meghalaya) — The crystal-clear Umngot River is so transparent that boats appear to float in mid-air. Best visited in winter when water is clearest.",
      "7. Shillong (Meghalaya) — The 'Scotland of the East' with colonial charm, waterfalls, and a thriving music scene. 8. Dzukou Valley (Nagaland/Manipur) — A stunning high-altitude valley carpeted in wildflowers during summer. 9. Loktak Lake (Manipur) — India's largest freshwater lake with floating islands called phumdis. 10. Kamakhya Temple (Assam) — One of the most powerful Shakti peethas, with mesmerizing Ambubachi Mela in June.",
    ],
  },
  {
    title: "Andaman Cruise: What to Expect On Board",
    tag: "Andaman Cruise",
    tagColor: "bg-orange-100 text-orange-700",
    gradient: "from-orange-400 to-amber-500",
    emoji: "🚢",
    readTime: "3 min read",
    excerpt:
      "First time on an Andaman cruise? We break down what every night on the water looks like — from cabin life to shore excursions and sunset dinners.",
    fullContent: [
      "Andaman cruises are available in 3, 5, and 7-night itineraries. Cabin types range from Standard Interior (value option, no window) to Deluxe Ocean View (picture-window sea views) and Premium Balcony (private outdoor space). For first-timers, an ocean-view cabin is recommended — waking up to the Andaman Sea is transformative.",
      "Onboard dining typically includes a main restaurant with buffet breakfast and à la carte dinner, a casual deck café for lunch, and specialty themed nights (seafood, Indian cuisine, continental). Most cruise packages include all meals. Evening entertainment features live music, cultural performances, Bollywood nights, and star-gazing on the upper deck.",
      "Shore excursions are the highlight — each port day includes guided trips to beaches, snorkeling spots, and historical sites. Typical stops include Port Blair (Cellular Jail, Corbyn's Cove), Havelock Island (Radhanagar Beach), Neil Island (Natural Bridge), and Baratang (limestone caves, mangrove creeks).",
      "For seasickness: choose a cabin on lower, central decks where motion is least felt. Pack motion sickness tablets (Avomine works well) and take them the night before boarding. The Andaman Sea between November and March is generally calm with gentle swells. Keep the horizon in sight on the deck if you feel queasy — fresh sea air helps immediately.",
    ],
  },
  {
    title: "Andaman on a Budget: Smart Travel Tips",
    tag: "Andaman",
    tagColor: "bg-teal-100 text-teal-700",
    gradient: "from-teal-500 to-green-500",
    emoji: "💰",
    readTime: "5 min read",
    excerpt:
      "Think Andaman is only for luxury travellers? Think again. Here are our top money-saving hacks to experience the islands without breaking the bank.",
    fullContent: [
      "Andaman can be done beautifully on a budget of ₹20,000–₹30,000 per person for 5 nights (excluding flights). The key is choosing government-run guesthouses at Havelock and Neil Islands — they're clean, well-located, and significantly cheaper than private resorts. Book at least 3 months ahead as these fill up fast.",
      "For inter-island travel, take the government ferry service instead of private speedboats. The MV Makruzz and Nautika speedboats charge ₹1,200–₹1,600 per segment; the government ferry costs ₹300–₹500 and takes 2–3x longer but offers a genuine island experience. On Port Blair days, use shared autos (₹10–30 per trip) instead of hired taxis.",
      "Free and low-cost attractions include Radhanagar Beach (consistently voted Asia's best beach — free entry), Cellular Jail museum (₹30 entry), and the evening sound-and-light show at the Jail (₹100). Snorkeling gear can be rented at Elephant Beach for ₹200 instead of paying ₹1,500+ for guided trips.",
      "For food, eat at local dhabas near Aberdeen Bazaar in Port Blair for ₹80–150 per meal instead of hotel restaurants. Buy fresh seafood at the Phoenix Bay fish market and ask your guesthouse to cook it — this cuts the cost of a fresh-catch dinner by 60%. Book during shoulder season (October or April) for 20–30% lower hotel rates and fewer crowds.",
    ],
  },
  {
    title: "Hidden Gems of Lakshadweep You Must Explore",
    tag: "Lakshadweep",
    tagColor: "bg-purple-100 text-purple-700",
    gradient: "from-purple-500 to-violet-600",
    emoji: "🤿",
    readTime: "4 min read",
    excerpt:
      "Beyond Agatti and Bangaram lie lesser-known islands teeming with marine life. Explore the hidden side of Lakshadweep with our insider guide.",
    fullContent: [
      "Minicoy Island (Maliku) is 200 km south of the main island group and feels like a different country — a Maldivian culture, a different dialect (Mahl), and a stunning lighthouse built by the British in 1885. The lagoon here is larger and calmer than Agatti's, with excellent snorkeling just off the beach. Only a handful of packages include Minicoy, so ask specifically for it.",
      "Andretti Island (near Kavaratti) is a tiny uninhabited island ringed with pristine coral. Day-trip boats visit for snorkeling and picnics. The house reef here is one of the least-visited in Lakshadweep, meaning you'll often share the water with just sea turtles, reef sharks, and parrotfish. Kalpeni Lagoon is another must — an enclosed lagoon formed by a chain of small islets, perfect for calm-water kayaking.",
      "Night snorkeling is available on select packages at Kadmat and Agatti — the bioluminescent plankton that lights up the water when disturbed is among the most magical natural phenomena in India. Book this explicitly when enquiring; not all operators offer it.",
      "For food, don't leave without trying traditional Lakshadweep cuisine: tuna curry (mas curry) with rice, coconut-based fish preparations, and fresh toddy coconut. Local homestays on Kavaratti offer the most authentic experience — families serve home-cooked meals and can arrange private lagoon tours by canoe. These are not advertised widely; Holiday Pulse can connect you directly with trusted host families.",
    ],
  },
];

function ArticleDialog({ article }: { article: Article }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-teal-300 text-teal-700 hover:bg-teal-50 hover:border-teal-500 rounded-full transition-colors"
          data-ocid="travel_blog.button"
        >
          Read Guide →
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${article.tagColor}`}
            >
              {article.tag}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800 leading-snug">
            {article.emoji} {article.title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-2">
          <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
            {article.fullContent.map((para) => (
              <p key={para.slice(0, 20)}>{para}</p>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function TravelBlogSection() {
  return (
    <section id="travel-blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest text-teal-600 uppercase mb-3">
            Travel Guides
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Travel Guides &amp; Insider Tips
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Plan the perfect trip with expert guides written from real on-ground
            experience — from the best travel windows to hidden local gems.
          </p>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <div
              key={article.title}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
              data-ocid={`travel_blog.item.${i + 1}`}
            >
              {/* Gradient banner */}
              <div
                className={`bg-gradient-to-br ${article.gradient} flex items-center justify-center h-32 relative`}
              >
                <span className="text-5xl drop-shadow-sm select-none">
                  {article.emoji}
                </span>
                <span
                  className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full ${article.tagColor} shadow-sm`}
                >
                  {article.tag}
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gray-100 text-gray-500 font-normal flex items-center gap-1"
                  >
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </Badge>
                </div>
                <h3 className="font-bold text-slate-800 text-base leading-snug mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>
                <ArticleDialog article={article} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
