export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 199,
    image: "assets/images/mouse.jpg",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 499,
    image: "assets/images/keyboard.jpg",
  },
  {
    id: 3,
    name: "Gaming Headset",
    price: 299,
    image: "assets/images/headset.jpg",
  },
];
