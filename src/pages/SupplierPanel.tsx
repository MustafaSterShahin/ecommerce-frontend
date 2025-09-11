import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import type { ProductDto } from "../types";

const SupplierPanel = () => {
  const { isLoggedIn, role, token } = useContext(AuthContext);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && role === "Supplier" && token) {
      fetch("https://localhost:5031/api/products/mine", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.ok ? res.json() : Promise.reject("Failed"))
        .then(data => setProducts(data.$values || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn, role, token]);

  const handleDelete = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`https://localhost:5031/api/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403) {
        alert("You can only delete your own products.");
        return;
      }

      if (!res.ok) throw new Error("Delete failed");

      setProducts(products.filter(p => p.productId !== productId));
      alert("Product deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Error deleting product.");
    }
  };

  if (!isLoggedIn || role !== "Supplier") {
    return <div className="p-6 text-red-500">Only suppliers can access this page.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supplier Panel</h1>
      <div className="mb-6">
        <Link
          to="/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      {loading ? <p>Loading...</p> : products.length === 0 ? (
        <p>You haven't added any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.productId} className="border rounded p-4 shadow-md">
              {product.imageUrl && <img src={product.imageUrl} alt={product.productName} className="w-full h-40 object-cover mb-2 rounded" />}
              <h3 className="font-bold">{product.productName}</h3>
              <p>Price: {product.unitPrice} ₺ | Stock: {product.unitsInStock}</p>
              <p className="text-sm text-gray-600">{product.details}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => navigate(`/edit-product/${product.productId}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.productId)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierPanel;
