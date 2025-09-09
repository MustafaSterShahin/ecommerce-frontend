import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- added
import defaultimage from "../assets/images/Default.png";

interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  unitsInStock: number;
  categoryId: number;
  imageUrl: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string; // ✅ role added
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<"products" | "users">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate(); // <-- added

  const token = localStorage.getItem("token");

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://localhost:5031/api/products");
      const data = await res.json();

      if (data.$values) setProducts(data.$values);
      else if (Array.isArray(data)) setProducts(data);
      else setProducts([]);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://localhost:5031/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.$values) setUsers(data.$values);
      else if (Array.isArray(data)) setUsers(data);
      else setUsers([]);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "products") fetchProducts();
    if (activeTab === "users") fetchUsers();
  }, [activeTab]);

  // Delete Product
  const handleDeleteProduct = async (id: number) => {
    try {
      const res = await fetch(`https://localhost:5031/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Delete User
  const handleDeleteUser = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`https://localhost:5031/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "products" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              Products
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "users" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              Users
            </button>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Products</h2>
              <button
                onClick={() => navigate("/add-product")} // <-- navigate added
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add New Product
              </button>
            </div>

            {/* Product List */}
            <ul className="space-y-2">
              {products.map((p) => (
                <li
                  key={p.productId}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.imageUrl || defaultimage}
                      alt={p.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{p.productName}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(p.productId)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <ul className="space-y-2">
              {users.map((u) => (
                <li
                  key={u.id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <div>
                    <p className="font-medium">{u.username}</p>
                    <p className="text-sm text-gray-600">{u.email}</p>
                    <p className="text-sm text-blue-600">Role: {u.role}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
