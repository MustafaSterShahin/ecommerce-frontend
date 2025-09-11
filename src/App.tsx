import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import AdminPanel from "./pages/AdminPanel"; 
import SupplierPanel from "./pages/SupplierPanel";
import AddProduct from "./pages/AddProduct"; 
import Unauthorized from "./pages/Unauthorized"; 

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Supplier Dashboard */}
            <Route
              path="/supplier"
              element={
                <PrivateRoute roles={["Supplier"]}>
                  <SupplierPanel />
                </PrivateRoute>
              }
            />
            <Route
              path="/supplier/add-product"
              element={
                <PrivateRoute roles={["Supplier", "Admin"]}>
                  <AddProduct />
                </PrivateRoute>
              }
            />

            {/* Edit Product */}
            <Route
              path="/edit-product/:id"
              element={
                <PrivateRoute roles={["Supplier", "Admin"]}>
                  <EditProduct />
                </PrivateRoute>
              }
            />

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["Admin"]}>
                  <AdminPanel /> 
                </PrivateRoute>
              }
            />

            {/* Add Product - Shared */}
            <Route
              path="/add-product"
              element={
                <PrivateRoute roles={["Admin", "Supplier"]}>
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
