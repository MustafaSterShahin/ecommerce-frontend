export interface Product {
  id: number;
  name: string;
  category: string;
  supplier: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Chai",
    category: "Beverages",
    supplier: "Exotic Liquids",
    price: 18,
    stock: 39,
    image: "https://dummyjson.com/image/400x400/007bff/fff&text=Chai",
    description: "A spicy Indian tea blend that offers a rich aroma and taste."
  },
  {
    id: 2,
    name: "Chang",
    category: "Beverages",
    supplier: "Exotic Liquids",
    price: 19,
    stock: 17,
    image: "https://dummyjson.com/image/400x400/28a745/fff&text=Chang",
    description: "A refreshing Chinese beer with a crisp flavor."
  },
  {
    id: 3,
    name: "Aniseed Syrup",
    category: "Condiments",
    supplier: "Exotic Liquids",
    price: 10,
    stock: 13,
    image: "https://dummyjson.com/image/400x400/ffc107/000&text=Aniseed+Syrup",
    description: "A sweet syrup with a strong aniseed flavor, perfect for desserts."
  },
  {
    id: 4,
    name: "Chef Anton's Cajun Seasoning",
    category: "Condiments",
    supplier: "New Orleans Cajun Delights",
    price: 22,
    stock: 53,
    image: "https://dummyjson.com/image/400x400/dc3545/fff&text=Cajun+Seasoning",
    description: "A bold Cajun spice mix that brings the taste of Louisiana to your meals."
  },
  {
    id: 5,
    name: "Grandma's Boysenberry Spread",
    category: "Condiments",
    supplier: "Grandma Kelly's Homestead",
    price: 25,
    stock: 120,
    image: "https://dummyjson.com/image/400x400/6f42c1/fff&text=Boysenberry+Spread",
    description: "A delicious berry spread, perfect for breakfast and pastries."
  }
];
