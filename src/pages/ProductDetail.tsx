import { useParams } from "react-router-dom";
import { products, type Product } from "../data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import type { AppDispatch } from "../store/store";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product: Product | undefined = products.find(p => p.id === Number(id));
  const dispatch = useDispatch<AppDispatch>();

  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-64 h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-gray-700 mt-2">{product.price} ₺</p>
      <p className="text-gray-600 mt-4">{product.description}</p>

      
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
