import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../store/cartSlice";

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {items.map(item => (
          <div key={item.id} className="flex items-center bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow">
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 object-cover rounded-lg mr-6"
            />

            {/* Product Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600 mt-1">{item.price} ₺</p>

              {/* Quantity Controls */}
              <div className="flex items-center mt-3 space-x-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Clear Button */}
      <div className="mt-8 flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <span className="text-xl font-bold">Total: {total} ₺</span>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
