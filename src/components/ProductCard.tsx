import type { Product } from "../data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import type { AppDispatch } from "../store/store";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-60 hover:scale-105 transition-transform">
      <img
        src={product.image}
        alt={product.name}
        className="w-48 h-48 object-cover rounded-lg"
      />
      <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.price} ₺</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
