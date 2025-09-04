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
    image: "https://via.placeholder.com/200x200?text=Mouse",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 499,
    image: "https://via.placeholder.com/200x200?text=Keyboard",
  },
  {
    id: 3,
    name: "Gaming Headset",
    price: 299,
    image: "https://via.placeholder.com/200x200?text=Headset",
  },
];
