import ProductCard from "../components/ProductCard";
import { products } from "../data/Products";

function Products() {
  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
