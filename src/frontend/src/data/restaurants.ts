export type Cuisine =
  | "Biryani"
  | "Andhra"
  | "South Indian"
  | "Hyderabadi"
  | "Chai & Snacks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  area: string;
  rating: number;
  deliveryTime: string;
  cuisine: Cuisine;
  image: string;
  menu: MenuItem[];
  minOrder: number;
  deliveryFee: number;
}

export const HYDERABAD_AREAS = [
  "Banjara Hills",
  "Jubilee Hills",
  "Madhapur",
  "Gachibowli",
  "Hitech City",
  "Kondapur",
  "Kukatpally",
  "Ameerpet",
  "Begumpet",
  "Secunderabad",
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: "paradise",
    name: "Paradise Biryani",
    area: "Secunderabad",
    rating: 4.8,
    deliveryTime: "30-40 min",
    cuisine: "Biryani",
    image: "/assets/generated/restaurant-paradise.dim_400x250.jpg",
    minOrder: 200,
    deliveryFee: 30,
    menu: [
      {
        id: "p1",
        name: "Chicken Dum Biryani",
        description: "Slow-cooked with whole spices in a sealed handi",
        price: 280,
        category: "Biryani",
        isVeg: false,
        image: "/assets/generated/dish-biryani.dim_400x300.jpg",
      },
      {
        id: "p2",
        name: "Mutton Biryani",
        description: "Tender mutton pieces with aged basmati rice",
        price: 360,
        category: "Biryani",
        isVeg: false,
        image: "/assets/generated/dish-biryani.dim_400x300.jpg",
      },
      {
        id: "p3",
        name: "Veg Dum Biryani",
        description: "Mixed vegetables with aromatic spices and saffron",
        price: 220,
        category: "Biryani",
        isVeg: true,
        image: "/assets/generated/dish-biryani.dim_400x300.jpg",
      },
      {
        id: "p4",
        name: "Chicken Haleem",
        description: "Slow-cooked wheat and mutton stew – Hyderabad's pride",
        price: 180,
        category: "Specials",
        isVeg: false,
        image: "/assets/generated/dish-haleem.dim_400x300.jpg",
      },
      {
        id: "p5",
        name: "Double Ka Meetha",
        description: "Bread pudding with rabri and dry fruits",
        price: 120,
        category: "Desserts",
        isVeg: true,
        image: "/assets/generated/dish-andhra-thali.dim_400x300.jpg",
      },
    ],
  },
  {
    id: "kritunga",
    name: "Kritunga Restaurant",
    area: "Banjara Hills",
    rating: 4.5,
    deliveryTime: "25-35 min",
    cuisine: "Andhra",
    image: "/assets/generated/restaurant-kritunga.dim_400x250.jpg",
    minOrder: 150,
    deliveryFee: 25,
    menu: [
      {
        id: "k1",
        name: "Andhra Meals",
        description:
          "Full thali with rice, sambar, rasam, 3 curries and payasam",
        price: 220,
        category: "Meals",
        isVeg: true,
        image: "/assets/generated/dish-andhra-thali.dim_400x300.jpg",
      },
      {
        id: "k2",
        name: "Ragi Sangati",
        description: "Finger millet balls with spicy curry – village-style",
        price: 160,
        category: "Meals",
        isVeg: true,
        image: "/assets/generated/dish-andhra-thali.dim_400x300.jpg",
      },
      {
        id: "k3",
        name: "Gongura Mutton",
        description: "Tender mutton cooked in tangy sorrel leaves",
        price: 320,
        category: "Curries",
        isVeg: false,
        image: "/assets/generated/dish-haleem.dim_400x300.jpg",
      },
      {
        id: "k4",
        name: "Pesarattu",
        description: "Green moong dosa with upma – Telugu breakfast classic",
        price: 100,
        category: "Breakfast",
        isVeg: true,
        image: "/assets/generated/dish-pesarattu.dim_400x300.jpg",
      },
      {
        id: "k5",
        name: "Avakaya Chicken",
        description: "Spicy mango pickle chicken curry",
        price: 290,
        category: "Curries",
        isVeg: false,
        image: "/assets/generated/dish-haleem.dim_400x300.jpg",
      },
    ],
  },
  {
    id: "chutneys",
    name: "Chutneys",
    area: "Jubilee Hills",
    rating: 4.6,
    deliveryTime: "20-30 min",
    cuisine: "South Indian",
    image: "/assets/generated/restaurant-chutneys.dim_400x250.jpg",
    minOrder: 120,
    deliveryFee: 20,
    menu: [
      {
        id: "c1",
        name: "Masala Dosa",
        description:
          "Crispy dosa with spiced potato filling, chutneys & sambar",
        price: 130,
        category: "Dosas",
        isVeg: true,
        image: "/assets/generated/dish-dosa.dim_400x300.jpg",
      },
      {
        id: "c2",
        name: "Idli Vada Combo",
        description: "2 soft idlis + 1 crispy vada with coconut chutney",
        price: 110,
        category: "Tiffins",
        isVeg: true,
        image: "/assets/generated/dish-dosa.dim_400x300.jpg",
      },
      {
        id: "c3",
        name: "Set Dosa",
        description: "3 small soft dosas with onion chutney and sambar",
        price: 120,
        category: "Dosas",
        isVeg: true,
        image: "/assets/generated/dish-dosa.dim_400x300.jpg",
      },
      {
        id: "c4",
        name: "Filter Coffee",
        description: "Traditional South Indian decoction coffee with milk",
        price: 60,
        category: "Beverages",
        isVeg: true,
        image: "/assets/generated/dish-pesarattu.dim_400x300.jpg",
      },
      {
        id: "c5",
        name: "Rava Upma",
        description:
          "Semolina cooked with mustard seeds, curry leaves and veggies",
        price: 90,
        category: "Tiffins",
        isVeg: true,
        image: "/assets/generated/dish-pesarattu.dim_400x300.jpg",
      },
    ],
  },
  {
    id: "shadab",
    name: "Hotel Shadab",
    area: "Gachibowli",
    rating: 4.7,
    deliveryTime: "35-45 min",
    cuisine: "Hyderabadi",
    image: "/assets/generated/restaurant-paradise.dim_400x250.jpg",
    minOrder: 250,
    deliveryFee: 35,
    menu: [
      {
        id: "s1",
        name: "Paya Soup",
        description: "Slow-cooked trotters soup with aromatic spices",
        price: 160,
        category: "Soups",
        isVeg: false,
        image: "/assets/generated/dish-haleem.dim_400x300.jpg",
      },
      {
        id: "s2",
        name: "Shahi Haleem",
        description: "Award-winning Hyderabadi haleem with ghee tarka",
        price: 200,
        category: "Specials",
        isVeg: false,
        image: "/assets/generated/dish-haleem.dim_400x300.jpg",
      },
      {
        id: "s3",
        name: "Chicken Majestic",
        description: "Dry-fried chicken with green chillies and curry leaves",
        price: 320,
        category: "Starters",
        isVeg: false,
        image: "/assets/generated/dish-haleem.dim_400x300.jpg",
      },
      {
        id: "s4",
        name: "Lukhmi",
        description: "Crispy Hyderabadi minced meat pastry – local pride",
        price: 80,
        category: "Starters",
        isVeg: false,
        image: "/assets/generated/dish-biryani.dim_400x300.jpg",
      },
      {
        id: "s5",
        name: "Qubani ka Meetha",
        description: "Hyderabadi apricot dessert with cream",
        price: 130,
        category: "Desserts",
        isVeg: true,
        image: "/assets/generated/dish-andhra-thali.dim_400x300.jpg",
      },
    ],
  },
  {
    id: "nimrah",
    name: "Nimrah Cafe",
    area: "Hitech City",
    rating: 4.4,
    deliveryTime: "15-25 min",
    cuisine: "Chai & Snacks",
    image: "/assets/generated/restaurant-nimrah.dim_400x250.jpg",
    minOrder: 80,
    deliveryFee: 15,
    menu: [
      {
        id: "n1",
        name: "Irani Chai",
        description: "Thick creamy Hyderabadi Irani tea with milk",
        price: 40,
        category: "Chai",
        isVeg: true,
        image: "/assets/generated/dish-pesarattu.dim_400x300.jpg",
      },
      {
        id: "n2",
        name: "Osmania Biscuits",
        description: "Hyderabad's iconic butter biscuits, best with chai",
        price: 50,
        category: "Snacks",
        isVeg: true,
        image: "/assets/generated/dish-pesarattu.dim_400x300.jpg",
      },
      {
        id: "n3",
        name: "Samosa Plate",
        description: "2 crispy samosas with mint chutney and tamarind sauce",
        price: 60,
        category: "Snacks",
        isVeg: true,
        image: "/assets/generated/dish-dosa.dim_400x300.jpg",
      },
      {
        id: "n4",
        name: "Kheema Pav",
        description: "Spicy minced meat with buttered pav bread",
        price: 120,
        category: "Snacks",
        isVeg: false,
        image: "/assets/generated/dish-haleem.dim_400x300.jpg",
      },
      {
        id: "n5",
        name: "Cold Coffee",
        description: "Blended cold coffee with ice cream – refreshing!",
        price: 80,
        category: "Beverages",
        isVeg: true,
        image: "/assets/generated/dish-pesarattu.dim_400x300.jpg",
      },
    ],
  },
];

export const TRENDING_DISHES = [
  {
    name: "Hyderabadi Dum Biryani",
    image: "/assets/generated/dish-biryani.dim_400x300.jpg",
    tag: "Non-Veg",
  },
  {
    name: "Andhra Thali",
    image: "/assets/generated/dish-andhra-thali.dim_400x300.jpg",
    tag: "Veg",
  },
  {
    name: "Masala Dosa",
    image: "/assets/generated/dish-dosa.dim_400x300.jpg",
    tag: "Veg",
  },
  {
    name: "Shahi Haleem",
    image: "/assets/generated/dish-haleem.dim_400x300.jpg",
    tag: "Non-Veg",
  },
  {
    name: "Pesarattu",
    image: "/assets/generated/dish-pesarattu.dim_400x300.jpg",
    tag: "Veg",
  },
  {
    name: "Gongura Mutton",
    image: "/assets/generated/dish-haleem.dim_400x300.jpg",
    tag: "Non-Veg",
  },
];
