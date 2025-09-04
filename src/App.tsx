import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function App() {
  return (
    <div>
      <nav style={{ padding: "10px", background: "#333", color: "white" }}>
        <Link to="/" style={{ marginRight: "10px", color: "white" }}>Home</Link>
        <Link to="/products" style={{ marginRight: "10px", color: "white" }}>Products</Link>
        <Link to="/cart" style={{ color: "white" }}>Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
