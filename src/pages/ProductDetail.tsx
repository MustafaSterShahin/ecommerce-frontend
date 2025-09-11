import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api";
import type { ProductDto } from "../types";
import { AuthContext } from "../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role, token } = useContext(AuthContext);
  const [product, setProduct] = useState<ProductDto | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/products/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id, token]);

  const handleDelete = async () => {
    if (!product || !token) return;
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await api.delete(`/products/${product.productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.status || res.status !== 200) throw new Error("Delete failed");
      alert("Product deleted!");
      navigate("/supplier-panel");
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded">
      {product.imageUrl && <img src={product.imageUrl} alt={product.productName} className="w-full h-64 object-cover mb-4 rounded" />}
      <h2 className="text-2xl font-bold">{product.productName}</h2>
      <p className="mt-2">Price: {product.unitPrice} ₺</p>
      <p>Stock: {product.unitsInStock}</p>
      <p className="mt-2">{product.details}</p>

      {role === "Supplier" && (
        <div className="mt-4 flex gap-2">
          <button onClick={() => navigate(`/edit-product/${product.productId}`)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
          <button onClick={handleDelete} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
