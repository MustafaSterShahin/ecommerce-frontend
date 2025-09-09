import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import AdminPanel from "./pages/AdminPanel"; 
import AddProduct from "./pages/AddProduct"; // <-- added import

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Dashboard - only accessible by Admin role */}
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["Admin"]}>
                  <AdminPanel /> 
                </PrivateRoute>
              }
            />

            {/* Add Product Page - only accessible by Admin role */}
            <Route
              path="/add-product"
              element={
                <PrivateRoute roles={["Admin"]}>
                  <AddProduct /> 
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
