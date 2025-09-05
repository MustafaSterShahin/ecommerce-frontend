import React, { useState } from "react";
import api from "../api";

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [message, setMessage] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/products", {
        productName: name,
        unitPrice: price,
        unitsInStock: stock,
      });
      setMessage("Product added successfully!");
      setName("");
      setPrice(0);
      setStock(0);
    } catch (err) {
      setMessage("Error adding product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleAdd} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
