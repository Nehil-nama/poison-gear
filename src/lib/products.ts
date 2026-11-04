import heroImg from "@/assets/hero.jpg";
import mouseViper from "@/assets/products/mouse-viper.jpg";
import keyboardVenom from "@/assets/products/keyboard-venom.jpg";
import mousepadAbyss from "@/assets/products/mousepad-abyss.jpg";
import chairThrone from "@/assets/products/chair-throne.jpg";
import controllerHex from "@/assets/products/controller-hex.jpg";
import toxicMouse from "@/assets/products/toxic-mouse.jpg";
import toxicKeyboard from "@/assets/products/toxic-keyboard.jpg";
import toxicController from "@/assets/products/toxic-controller.jpg";

export type Category = "mouse" | "keyboard" | "mousepad" | "chair" | "controller";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  price: number;
  image: string;
  rating: number;
  badge?: string;
  toxic?: boolean;
  unitsLeft?: number;
  favourite?: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  mouse: "Mice",
  keyboard: "Keyboards",
  mousepad: "Mousepads",
  chair: "Chairs",
  controller: "Controllers",
};

export const PRODUCTS: Product[] = [
  {
    id: "viper-v2-pro",
    name: "Viper V2 Pro Wireless",
    tagline: "58g flagship wireless mouse, 30K optical sensor",
    category: "mouse",
    price: 129,
    image: mouseViper,
    rating: 4.9,
    badge: "Best Seller",
    favourite: true,
  },
  {
    id: "viper-v2-lite",
    name: "Viper V2 Lite",
    tagline: "Featherweight wired precision, 49g",
    category: "mouse",
    price: 89,
    image: mouseViper,
    rating: 4.7,
  },
  {
    id: "venom-tkl",
    name: "Venom TKL",
    tagline: "Aluminum TKL board, hot-swap green switches",
    category: "keyboard",
    price: 149,
    image: keyboardVenom,
    rating: 4.8,
    badge: "Best Seller",
    favourite: true,
  },
  {
    id: "venom-elite",
    name: "Venom Elite RGB",
    tagline: "Full-size, per-key RGB, magnetic switches",
    category: "keyboard",
    price: 189,
    image: keyboardVenom,
    rating: 4.6,
  },
  {
    id: "abyss-xl",
    name: "Abyss XL",
    tagline: "Control surface, 900×400mm stitched edges",
    category: "mousepad",
    price: 39,
    image: mousepadAbyss,
    rating: 4.8,
    favourite: true,
  },
  {
    id: "abyss-xxl",
    name: "Abyss XXL",
    tagline: "Desk-covering speed glass hybrid, 1200×600mm",
    category: "mousepad",
    price: 49,
    image: mousepadAbyss,
    rating: 4.5,
  },
  {
    id: "throne-x",
    name: "Throne X",
    tagline: "Cold-cure foam racing chair, 4D armrests",
    category: "chair",
    price: 349,
    image: chairThrone,
    rating: 4.7,
    badge: "Best Seller",
    favourite: true,
  },
  {
    id: "hex-pro",
    name: "Hex Pro Wireless",
    tagline: "Hall-effect sticks, 1000Hz wireless polling",
    category: "controller",
    price: 99,
    image: controllerHex,
    rating: 4.8,
    favourite: true,
  },
  {
    id: "hex-lite",
    name: "Hex Lite Wired",
    tagline: "Zero-latency wired pad, anti-drift sticks",
    category: "controller",
    price: 59,
    image: controllerHex,
    rating: 4.4,
  },
  {
    id: "toxic-viper-plague",
    name: 'Toxic Viper "Plague"',
    tagline: "Transparent shell, acid-green internals. 100 units.",
    category: "mouse",
    price: 199,
    image: toxicMouse,
    rating: 5.0,
    badge: "Limited · 100",
    toxic: true,
    unitsLeft: 37,
    favourite: true,
  },
  {
    id: "toxic-venom-biohazard",
    name: 'Toxic Venom "Biohazard"',
    tagline: "Smoked keycaps, radioactive backlight. 200 units.",
    category: "keyboard",
    price: 249,
    image: toxicKeyboard,
    rating: 5.0,
    badge: "Limited · 200",
    toxic: true,
    unitsLeft: 61,
  },
  {
    id: "toxic-hex-reactor",
    name: 'Toxic Hex "Reactor"',
    tagline: "Translucent shell, glowing stick rings. 150 units.",
    category: "controller",
    price: 159,
    image: toxicController,
    rating: 5.0,
    badge: "Limited · 150",
    toxic: true,
    unitsLeft: 24,
  },
];

export const TOXIC_PRODUCTS = PRODUCTS.filter((p) => p.toxic);

export const FAVOURITES = PRODUCTS.filter((p) => p.favourite);

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export interface SquadBundle {
  id: string;
  name: string;
  blurb: string;
  items: string[];
  price: number;
  worth: number;
}

export const SQUAD_BUNDLES: SquadBundle[] = [
  {
    id: "duo-ambush",
    name: "Duo Ambush",
    blurb: "The pair most duo-queue players run.",
    items: ["Viper V2 Pro Wireless", "Abyss XL"],
    price: 159,
    worth: 168,
  },
  {
    id: "stack-starter",
    name: "5-Stack Starter",
    blurb: "One kit that arms the whole squad.",
    items: ["Venom TKL", "Viper V2 Lite", "Abyss XXL"],
    price: 249,
    worth: 287,
  },
  {
    id: "esports-loadout",
    name: "Esports Loadout",
    blurb: "The full solo-queue to LAN setup.",
    items: ["Throne X", "Viper V2 Pro Wireless", "Venom Elite RGB"],
    price: 599,
    worth: 667,
  },
  {
    id: "couch-squad",
    name: "Couch Squad",
    blurb: "Split-screen nights, done right.",
    items: ["2× Hex Pro Wireless", "Abyss XL"],
    price: 219,
    worth: 237,
  },
  {
    id: "stream-team",
    name: "Stream Team",
    blurb: "For the crew that plays and broadcasts.",
    items: ["Venom Elite RGB", "Hex Pro Wireless", "Throne X"],
    price: 689,
    worth: 727,
  },
];

export const heroImage = heroImg;
