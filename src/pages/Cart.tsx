import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { removeFromCart, clearCart } from "../store/cartSlice";

function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "8px 0",
              }}
            >
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>{item.price * item.quantity} ₺</span>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => dispatch(clearCart())}
            style={{ marginTop: "10px" }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
