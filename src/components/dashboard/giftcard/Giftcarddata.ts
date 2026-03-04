// ─────────────────────────────────────────────────────────────────────────────
// Gift Card — shared types & static data
// ─────────────────────────────────────────────────────────────────────────────

export type GiftCard = {
  id: string;
  name: string;
  logo: string; // path — replace with actual assets
  bgColor: string; // tailwind bg class for fallback
};

export type GiftCardDenomination = {
  value: number; // in USD
  ngnPrice: number; // in NGN
};

export const RATE_PER_USDT = 1450;

export const GIFT_CARDS: GiftCard[] = [
  {
    id: "itunes",
    name: "iTunes",
    logo: "/images/giftcards/itunes.png",
    bgColor: "bg-slate-100",
  },
  {
    id: "sephora",
    name: "Sephora",
    logo: "/images/giftcards/sephora.png",
    bgColor: "bg-slate-800",
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "/images/giftcards/amazons.png",
    bgColor: "bg-yellow-400",
  },
  {
    id: "netflix",
    name: "Netflix",
    logo: "/images/giftcards/netflix.png",
    bgColor: "bg-red-700",
  },
  {
    id: "razer",
    name: "Razer Gold",
    logo: "/images/giftcards/razer.png",
    bgColor: "bg-yellow-500",
  },
  {
    id: "asos",
    name: "ASOS",
    logo: "/images/giftcards/asos.png",
    bgColor: "bg-slate-900",
  },
  {
    id: "ebay",
    name: "eBay",
    logo: "/images/giftcards/ebay.png",
    bgColor: "bg-white",
  },
  {
    id: "spotify",
    name: "Spotify",
    logo: "/images/giftcards/spotify.png",
    bgColor: "bg-green-500",
  },
  {
    id: "flowers",
    name: "1800Flowers",
    logo: "/images/giftcards/flowers.png",
    bgColor: "bg-purple-100",
  },
  {
    id: "playstation",
    name: "PlayStation",
    logo: "/images/giftcards/playstation.png",
    bgColor: "bg-blue-900",
  },
  {
    id: "applebees",
    name: "Applebees",
    logo: "/images/giftcards/applebees.png",
    bgColor: "bg-red-600",
  },
  {
    id: "safeway",
    name: "Safeway",
    logo: "/images/giftcards/safeway.png",
    bgColor: "bg-red-500",
  },
  {
    id: "ardene",
    name: "Ardene",
    logo: "/images/giftcards/ardene.png",
    bgColor: "bg-pink-100",
  },
  {
    id: "riverisland",
    name: "River Island",
    logo: "/images/giftcards/rivers.png",
    bgColor: "bg-slate-800",
  },
  {
    id: "argos",
    name: "Argos",
    logo: "/images/giftcards/argos.png",
    bgColor: "bg-red-500",
  },
  {
    id: "redlobster",
    name: "Red Lobster",
    logo: "/images/giftcards/lobstar.png",
    bgColor: "bg-slate-900",
  },
  {
    id: "primark",
    name: "Primark",
    logo: "/images/giftcards/primak.png",
    bgColor: "bg-teal-500",
  },
  {
    id: "burgerking",
    name: "Burger King",
    logo: "/images/giftcards/burger.png",
    bgColor: "bg-orange-500",
  },
  {
    id: "raffles",
    name: "Raffles",
    logo: "/images/giftcards/raffles.png",
    bgColor: "bg-slate-100",
  },
  {
    id: "pizzahut",
    name: "Pizza Hut",
    logo: "/images/giftcards/pizza.png",
    bgColor: "bg-red-700",
  },
  {
    id: "buffalowings",
    name: "Buffalo Wild Wings",
    logo: "/images/giftcards/wild.png",
    bgColor: "bg-orange-400",
  },
  {
    id: "nordstrom",
    name: "Nordstrom",
    logo: "/images/giftcards/nordstorm.png",
    bgColor: "bg-slate-700",
  },
  {
    id: "americaneagle",
    name: "American Eagle",
    logo: "/images/giftcards/eagle.png",
    bgColor: "bg-slate-800",
  },
  {
    id: "noon",
    name: "Noon",
    logo: "/images/giftcards/noon.png",
    bgColor: "bg-yellow-300",
  },
  {
    id: "asda",
    name: "ASDA",
    logo: "/images/giftcards/asda.png",
    bgColor: "bg-green-600",
  },
  {
    id: "nike",
    name: "Nike",
    logo: "/images/giftcards/nike.png",
    bgColor: "bg-white",
  },
  {
    id: "athleta",
    name: "Athleta",
    logo: "/images/giftcards/athleta.png",
    bgColor: "bg-purple-300",
  },
  {
    id: "newlook",
    name: "New Look",
    logo: "/images/giftcards/look.png",
    bgColor: "bg-slate-100",
  },
];

export const DENOMINATIONS: GiftCardDenomination[] = [
  { value: 10, ngnPrice: 14500 },
  { value: 20, ngnPrice: 29000 },
  { value: 30, ngnPrice: 43500 },
  { value: 50, ngnPrice: 72500 },
  { value: 100, ngnPrice: 145000 },
];
