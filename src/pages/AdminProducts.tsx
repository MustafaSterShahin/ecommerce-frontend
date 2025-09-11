import { useEffect, useState } from "react";
import type { ProductDto } from "../types";

const AdminProducts = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<ProductDto, "productId">>({
    productName: "Test",
    unitPrice: 100,
    unitsInStock: 10,
    categoryId: 1,
    imageUrl: "url",
    details: "Test product", 
    supplierID: 1
  });
  const [file, setFile] = useState<File | null>(null);

  const token = localStorage.getItem("token");
  const backendUrl = "https://localhost:5031";

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Upload image and return imageUrl
  const handleFileUpload = async (): Promise<string | null> => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("imageFile", file);

    const res = await fetch(`${backendUrl}/api/products`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    return data.imageUrl;
  };

  // Add new product
  const handleAdd = async () => {
    try {
      let imageUrl = "";

      if (file) {
        imageUrl = await handleFileUpload() || "";
      }

      const res = await fetch(`${backendUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newProduct,
          imageUrl,
        }),
      });

      if (res.ok) {
        setNewProduct({
          productName: "Test",
          unitPrice: 100,
          unitsInStock: 10,
          categoryId: 1,
          imageUrl: "url",
          details: "Test product",
          supplierID: 1
        });
        setFile(null);
        fetchProducts();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  // Delete product
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`${backendUrl}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchProducts();
    else alert("Failed to delete product");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

      {/* Add Product Form */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.productName}
          onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
          className="border p-2 mr-2 mb-2"
        />
        <input
          type="number"
          placeholder="Unit Price"
          value={newProduct.unitPrice}
          onChange={(e) => setNewProduct({ ...newProduct, unitPrice: parseFloat(e.target.value) })}
          className="border p-2 mr-2 mb-2"
        />
        <input
          type="number"
          placeholder="Units In Stock"
          value={newProduct.unitsInStock}
          onChange={(e) => setNewProduct({ ...newProduct, unitsInStock: parseInt(e.target.value) })}
          className="border p-2 mr-2 mb-2"
        />
        <input
          type="number"
          placeholder="Category ID"
          value={newProduct.categoryId}
          onChange={(e) => setNewProduct({ ...newProduct, categoryId: parseInt(e.target.value) })}
          className="border p-2 mr-2 mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="border p-2 mr-2 mb-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.productId}>
              <td className="border p-2">{p.productId}</td>
              <td className="border p-2">{p.productName}</td>
              <td className="border p-2">{p.unitPrice}</td>
              <td className="border p-2">{p.unitsInStock}</td>
              <td className="border p-2">{p.categoryId}</td>
              <td className="border p-2">
                {p.imageUrl ? (
                  <img
                    src={`${backendUrl}${p.imageUrl}`}
                    alt={p.productName}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(p.productId)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
