export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
import mouseImg from '../assets/images/mouse.jpg';
import keyboardImg from '../assets/images/keyboard.jpg';
import headsetImg from '../assets/images/headset.jpg';

export const products: Product[] = [
  { id: 1, name: "Wireless Mouse", price: 199, image: mouseImg },
  { id: 2, name: "Wireless Mouse", price: 199, image: mouseImg },
  { id: 3, name: "Wireless Mouse", price: 199, image: mouseImg },
  { id: 4, name: "Wireless Mouse", price: 199, image: mouseImg },
  { id: 5, name: "Wireless Mouse", price: 199, image: mouseImg },

  { id: 6, name: "Mechanical Keyboard", price: 499, image: keyboardImg },
  { id: 7, name: "Mechanical Keyboard", price: 499, image: keyboardImg },
  { id: 8, name: "Mechanical Keyboard", price: 499, image: keyboardImg },
  { id: 9, name: "Mechanical Keyboard", price: 499, image: keyboardImg },
  { id: 10, name: "Mechanical Keyboard", price: 499, image: keyboardImg },

  { id: 11, name: "Gaming Headset", price: 299, image: headsetImg },
  { id: 12, name: "Gaming Headset", price: 299, image: headsetImg },
  { id: 13, name: "Gaming Headset", price: 299, image: headsetImg },
  { id: 14, name: "Gaming Headset", price: 299, image: headsetImg },
  { id: 15, name: "Gaming Headset", price: 299, image: headsetImg },
];
