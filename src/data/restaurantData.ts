export interface MenuItem {
  id: string;
  name: string;
  frenchName?: string;
  category: 'starters' | 'mains' | 'chef-specialties' | 'desserts' | 'wines';
  description: string;
  price: number;
  image: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isChefChoice?: boolean;
  isGlutenFree?: boolean;
  winePairing?: string;
  allergens?: string[];
  calories?: number;
  origin?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  icon: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ambience' | 'culinary' | 'wine' | 'kitchen';
  image: string;
  aspect: 'tall' | 'wide' | 'square';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  source: string;
  content: string;
  rating: number;
  avatar: string;
  date: string;
}

export const RESTAURANT_INFO = {
  name: "RestaurantX",
  tagline: "Haute Cuisine & Sensory Gastronomy",
  foundingYear: 2014,
  chefName: "Chef Antoine Laurent",
  michelinStars: 3,
  address: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033, India",
  city: "Jubilee Hills, Hyderabad",
  phone: "+91 40 6900 1200",
  whatsappNumber: "+919820018290",
  email: "reservations@restaurantx-hyderabad.com",
  hours: {
    lunch: "Wed - Sun: 12:30 PM – 3:30 PM",
    dinner: "Mon - Sun: 7:00 PM – 11:45 PM",
    bar: "Mon - Sun: 5:00 PM – 1:30 AM",
  },
  socials: {
    instagram: "https://instagram.com/restaurantx_hyderabad",
    facebook: "https://facebook.com/restaurantxhyderabad",
    tripadvisor: "https://tripadvisor.in",
  },
  googleMapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
};

export const FEATURED_DISHES: MenuItem[] = [
  {
    id: "dish-1",
    name: "A5 Miyazaki Wagyu Rossini",
    frenchName: "Filet de Bœuf Rossini aux Truffes",
    category: "chef-specialties",
    description: "Pan-seared A5 Miyazaki Wagyu ribeye topped with Rougié Foie Gras, shaved Black Winter Périgord truffles, and a 48-hour bone marrow jus reduction.",
    price: 14500,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    isChefChoice: true,
    isGlutenFree: true,
    winePairing: "Château Margaux Premier Grand Cru Classé 2015",
    allergens: ["Dairy"],
    calories: 780,
    origin: "Miyazaki Prefecture, Japan"
  },
  {
    id: "dish-2",
    name: "Wild Atlantic Bluefin Tuna Tartare",
    frenchName: "Tartare de Thon Rouge Suprême",
    category: "starters",
    description: "Hand-cut Bluefin tuna belly infused with Oscietra caviar, compressed yuzu pearls, smoked sesame oil, and crispy lotus root crisp.",
    price: 5800,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85",
    isChefChoice: true,
    isGlutenFree: false,
    winePairing: "Domaine Leflaive Puligny-Montrachet 2020",
    allergens: ["Fish", "Sesame", "Soy"],
    calories: 420,
    origin: "Brittany Coast, France"
  },
  {
    id: "dish-3",
    name: "Brittany Blue Lobster Bisque",
    frenchName: "Velouté d'Homard Bleu",
    category: "starters",
    description: "Butter-poached Brittany lobster tail encased in a saffron-infused crustacean reduction with micro tarragon and caviar quenelle.",
    price: 6500,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=85",
    isChefChoice: false,
    isGlutenFree: true,
    winePairing: "Meursault Premier Cru Les Perrières 2019",
    allergens: ["Shellfish", "Dairy"],
    calories: 510,
    origin: "Saint-Malo, Brittany, France"
  },
  {
    id: "dish-4",
    name: "Golden Sphere Valrhona Soufflé",
    frenchName: "Soufflé au Chocolat Guanaja 70%",
    category: "desserts",
    description: "Warm 70% Dark Guanaja chocolate soufflé wrapped in 24k edible gold leaf, paired with Madagascar Bourbon vanilla bean gelato.",
    price: 3200,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85",
    isVegetarian: true,
    isChefChoice: true,
    winePairing: "Château d'Yquem Premier Cru Supérieur Sauternes 2014",
    allergens: ["Dairy", "Eggs", "Gluten"],
    calories: 620,
    origin: "Tain-l'Hermitage, France"
  }
];

export const FULL_MENU: MenuItem[] = [
  ...FEATURED_DISHES,
  {
    id: "dish-5",
    name: "Perigord Truffle Agnolotti",
    frenchName: "Agnolotti aux Truffes Noires",
    category: "mains",
    description: "Handmade silk pasta filled with aged Parmigiano Reggiano Vacche Rosse mousse, black truffle emulsion, and hazelnut butter foam.",
    price: 7200,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85",
    isVegetarian: true,
    isChefChoice: true,
    winePairing: "Barolo Monfortino Riserva Giacomo Conterno 2013",
    allergens: ["Dairy", "Gluten", "Tree Nuts"],
    calories: 590,
    origin: "Piedmont, Italy"
  },
  {
    id: "dish-6",
    name: "Chilean Sea Bass Glacier 51",
    frenchName: "Loup de Mer Rôti aux Agrumes",
    category: "mains",
    description: "Pan-roasted Patagonian toothfish with sea asparagus, charred kaffir lime emulsion, and golden trout caviar pearls.",
    price: 9500,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85",
    isGlutenFree: true,
    winePairing: "Kistler Vineyards Les Noisetiers Chardonnay 2021",
    allergens: ["Fish"],
    calories: 640,
    origin: "Heard Island, Sub-Antarctica"
  },
  {
    id: "dish-7",
    name: "Wild Mushroom & Morel Tartlet",
    frenchName: "Tartelette aux Morilles et Girolles",
    category: "starters",
    description: "Crisp buckwheat galette filled with sautéed Himalayan morels, black garlic purée, and toasted pine nut emulsion.",
    price: 4200,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    isVegetarian: true,
    isGlutenFree: false,
    winePairing: "Domaine Dujac Clos de la Roche Grand Cru 2018",
    allergens: ["Gluten", "Tree Nuts"],
    calories: 380,
    origin: "Kashmir Valley & Black Forest"
  },
  {
    id: "dish-8",
    name: "Smoked Duck Breast & Foie Gras",
    frenchName: "Magret de Canard Fumé",
    category: "mains",
    description: "Chalans duck breast slow-roasted over applewood, served with heirloom beet root textures and sour cherry jus.",
    price: 8400,
    image: "https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=1200&q=85",
    isGlutenFree: true,
    winePairing: "Domaine de la Romanée-Conti Échezeaux 2016",
    allergens: ["Soy"],
    calories: 720,
    origin: "Vendée, France"
  },
  {
    id: "dish-9",
    name: "Deconstructed Mille-Feuille Vanilla",
    frenchName: "Mille-Feuille Caramel Fleur de Sel",
    category: "desserts",
    description: "Caramelized inverted puff pastry leaves, Tahitian vanilla bean bavaroise, and salted butter caramel drizzle.",
    price: 2800,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=85",
    isVegetarian: true,
    winePairing: "Domaine Huet Vouvray Moelleux Le Haut-Lieu 2018",
    allergens: ["Gluten", "Dairy", "Eggs"],
    calories: 490,
    origin: "Tahiti & Brittany"
  },
  {
    id: "dish-10",
    name: "Dom Pérignon Vintage Champagne 2013",
    frenchName: "Dom Pérignon Brut Millésimé",
    category: "wines",
    description: "Complex and vibrant with notes of white flowers, stone fruits, toasted almond, and silky mineral finish.",
    price: 38000,
    image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=1200&q=85",
    allergens: ["Sulfites"],
    origin: "Épernay, Champagne, France"
  },
  {
    id: "dish-11",
    name: "Opus One Napa Valley Red Blend 2018",
    frenchName: "Opus One Cabernet Sauvignon",
    category: "wines",
    description: "A harmonious blend of Cabernet Sauvignon, Cabernet Franc, Petit Verdot, and Merlot with dark berry & cassis notes.",
    price: 55000,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
    allergens: ["Sulfites"],
    origin: "Oakville, Napa Valley, USA"
  }
];

export const STORY_TIMELINE = [
  {
    year: "2014",
    title: "The Vision",
    description: "Chef Antoine Laurent establishes RestaurantX in Jubilee Hills, Hyderabad, creating a sanctuary of haute cuisine."
  },
  {
    year: "2017",
    title: "First Michelin Honor",
    description: "Recognized internationally for obsessive organic sourcing and pioneering culinary technique."
  },
  {
    year: "2020",
    title: "Three Star Distinction",
    description: "Awarded 3 Michelin Stars, joining an elite global tier of world-class dining destinations."
  },
  {
    year: "2024",
    title: "Asia's 50 Best Top 5",
    description: "Ranked among Asia's Top 5 Luxury Dining Experiences and named Sustainable Restaurant of the Year."
  }
];

export const AWARDS: Award[] = [
  {
    id: "award-1",
    title: "3 Michelin Stars",
    organization: "The Michelin Guide",
    year: "2020 – 2025",
    icon: "Award",
    description: "Highest tier of global culinary excellence maintained for 5 consecutive years."
  },
  {
    id: "award-2",
    title: "#4 Asia's Best Restaurant",
    organization: "World's 50 Best",
    year: "2024",
    icon: "Globe",
    description: "Voted by over 1,000 international critics, master chefs, and connoisseurs."
  },
  {
    id: "award-3",
    title: "19.5 / 20 Gault & Millau",
    organization: "Gault & Millau Guide",
    year: "2025",
    icon: "Star",
    description: "Highest honors for sensory innovation and vintage wine pairing curation."
  },
  {
    id: "award-4",
    title: "Grand Award of Excellence",
    organization: "Wine Spectator",
    year: "2024",
    icon: "Wine",
    description: "Recognizing our 3,200-bottle subterranean vault featuring rare vintage labels."
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "The Grand Dining Room",
    category: "ambience",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    aspect: "wide"
  },
  {
    id: "g2",
    title: "A5 Miyazaki Wagyu Plating",
    category: "culinary",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    aspect: "square"
  },
  {
    id: "g3",
    title: "Sommelier Vault Cellar",
    category: "wine",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
    aspect: "tall"
  },
  {
    id: "g4",
    title: "Master Chef Plating Artistry",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85",
    aspect: "wide"
  },
  {
    id: "g5",
    title: "Private VIP Pavilion",
    category: "ambience",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85",
    aspect: "tall"
  },
  {
    id: "g6",
    title: "Golden Soufflé Creation",
    category: "culinary",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85",
    aspect: "square"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Michelin Guide Inspector",
    role: "Chief Dining Critic",
    source: "Michelin Guide 2025",
    content: "Chef Antoine Laurent reaches unprecedented heights of gastronomic alchemy. Each plate is a symphony of flavor contrast, technical perfection, and theatrical presentation.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=85",
    date: "January 2025"
  },
  {
    id: "t2",
    author: "Karan GVK",
    role: "Private Collector & Connoisseur",
    source: "Verified Dining Guest",
    content: "The A5 Wagyu Rossini paired with the 2015 Château Margaux was singlehandedly the finest culinary experience of my lifetime. The atmosphere in Jubilee Hills is extraordinary.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=85",
    date: "December 2024"
  },
  {
    id: "t3",
    author: "Shruti Reddy",
    role: "Food & Wine Magazine",
    source: "Editorial Review",
    content: "From the custom gold-infused soundscape to the precise vintage wine pairings, RestaurantX sets the benchmark for luxury dining in Hyderabad.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=85",
    date: "February 2025"
  }
];
