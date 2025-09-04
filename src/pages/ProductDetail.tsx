import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

interface Props {
  limit?: number;
}

const ProductList: React.FC<Props> = ({ limit }) => {
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {displayedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
