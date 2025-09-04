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
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        width: "200px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h3>{product.name}</h3>
      <p>{product.price} ₺</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        style={{
          background: "#333",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
