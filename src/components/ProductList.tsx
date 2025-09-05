import type { Product } from "../data/products";
import { Link } from "react-router-dom";

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <Link
          to={`/products/${product.id}`}
          key={product.id}
          className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-48 h-48 object-cover rounded-lg mb-2"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.price} ₺</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
