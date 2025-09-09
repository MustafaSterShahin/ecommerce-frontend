import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState<{ categoryId: number; categoryName: string }[]>([]);
  const [product, setProduct] = useState({
    ProductName: "",
    UnitPrice: "",
    UnitsInStock: "",
    CategoryId: "",
    Details: ""
  });
  const [file, setFile] = useState<File | null>(null);

  // Kategorileri çek
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://localhost:5031/api/products/categories");
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.ProductName || !product.UnitPrice || !product.UnitsInStock || !product.CategoryId || !product.Details) {
      alert("Please fill all fields!");
      return;
    }

    try {
      // FormData ile gönder
      const formData = new FormData();
      formData.append("ProductName", product.ProductName);
      formData.append("UnitPrice", product.UnitPrice.toString());
      formData.append("UnitsInStock", product.UnitsInStock.toString());
      formData.append("CategoryId", product.CategoryId.toString());
      formData.append("Details", product.Details);
      if (file) formData.append("ImageFile", file);

      const res = await fetch("https://localhost:5031/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}` // Content-Type yok, FormData otomatik ayarlanır
        },
        body: formData
      });

      if (res.ok) {
        alert("Product added successfully!");
        navigate("/admin");
      } else {
        const error = await res.json();
        console.error("Error adding product:", error);
        alert(error.title || "Failed to add product");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Error adding product");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Product Name" value={product.ProductName}
          onChange={(e) => setProduct({ ...product, ProductName: e.target.value })}
          className="w-full border p-2 rounded" required />

        <input type="number" placeholder="Price" value={product.UnitPrice}
          onChange={(e) => setProduct({ ...product, UnitPrice: e.target.value })}
          className="w-full border p-2 rounded" required />

        <input type="number" placeholder="Stock" value={product.UnitsInStock}
          onChange={(e) => setProduct({ ...product, UnitsInStock: e.target.value })}
          className="w-full border p-2 rounded" required />

        <select value={product.CategoryId}
          onChange={(e) => setProduct({ ...product, CategoryId: e.target.value })}
          className="w-full border p-2 rounded" required >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
          ))}
        </select>

        <input type="file" accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="w-full border p-2 rounded" />

        <textarea placeholder="Product Details" value={product.Details}
          onChange={(e) => setProduct({ ...product, Details: e.target.value })}
          className="w-full border p-2 rounded" required />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
