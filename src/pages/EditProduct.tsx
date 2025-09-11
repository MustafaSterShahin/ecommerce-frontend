import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import type { ProductDto, Category } from "../types";
import { AuthContext } from "../context/AuthContext";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [product, setProduct] = useState<ProductDto | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [formState, setFormState] = useState({
    productName: "",
    unitPrice: 0,
    unitsInStock: 0,
    categoryId: 0,
    details: "",
  });

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/products/categories");
        const data = Array.isArray(res.data.$values) ? res.data.$values : res.data;
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProduct = async () => {
      if (!id) return;
      try {
        const res = await api.get(`/products/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const p = res.data;
        setProduct(p);
        setFormState({
          productName: p.productName,
          unitPrice: p.unitPrice,
          unitsInStock: p.unitsInStock,
          categoryId: p.categoryId,
          details: p.details,
        });
        setCoverPreview(p.imageUrl || null);
        const images = Array.isArray(p.imageUrls)
          ? p.imageUrls
          : Array.isArray(p.imageUrls?.$values)
            ? p.imageUrls.$values
            : [];
        setExistingImages(images);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === "coverImage" && e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      setCoverImageFile(file);
      setCoverPreview(URL.createObjectURL(file));
    } else if (e.target.name === "productImages" && e.target instanceof HTMLInputElement && e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...files]);
      setNewPreviewUrls(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    } else {
      setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    const url = existingImages[index];
    setExistingImages(prev => prev.filter((_, i) => i !== index));
    setRemovedImages(prev => [...prev, url]);
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !token) return;

    try {
      const formData = new FormData();
      formData.append("productName", formState.productName);
      formData.append("unitPrice", formState.unitPrice.toString());
      formData.append("unitsInStock", formState.unitsInStock.toString());
      formData.append("categoryId", formState.categoryId.toString());
      formData.append("details", formState.details);
      if (coverImageFile) formData.append("coverImage", coverImageFile);
      existingImages.forEach(url => formData.append("imageUrls", url));
      removedImages.forEach(url => formData.append("removedImages", url));
      newImages.forEach(file => formData.append("newImages", file));
      await api.put(`/products/${product.productId}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6 text-red-500">Product not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md flex flex-col gap-4">
        <div>
          <label className="font-semibold">Product Name</label>
          <input type="text" name="productName" value={formState.productName} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="font-semibold">Price</label>
          <input type="number" name="unitPrice" value={formState.unitPrice} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="font-semibold">Stock</label>
          <input type="number" name="unitsInStock" value={formState.unitsInStock} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="font-semibold">Category</label>
          <select name="categoryId" value={formState.categoryId} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
          </select>
        </div>
        <div>
          <label className="font-semibold">Details</label>
          <textarea name="details" value={formState.details} onChange={handleChange} className="w-full border p-2 rounded" rows={4} required />
        </div>
        <div>
          <label className="font-semibold">Cover Image</label>
          <input type="file" name="coverImage" accept="image/*" onChange={handleChange} />
          {coverPreview && <img src={coverPreview} alt="Cover Preview" className="w-24 h-24 mt-2 rounded object-cover" />}
        </div>
        <div>
          <label className="font-semibold">Product Images</label>
          <input type="file" name="productImages" accept="image/*" multiple onChange={handleChange} />
          <div className="flex flex-wrap gap-2 mt-2">
            {existingImages.map((url, i) => (
              <div key={url} className="relative">
                <img src={url} alt="Existing" className="w-24 h-24 object-cover rounded" />
                <button type="button" onClick={() => handleRemoveExistingImage(i)} className="absolute top-1 right-1 bg-red-600 text-white px-1 rounded hover:bg-red-700">X</button>
              </div>
            ))}
            {newPreviewUrls.map((url, i) => (
              <div key={url} className="relative">
                <img src={url} alt="New" className="w-24 h-24 object-cover rounded" />
                <button type="button" onClick={() => handleRemoveNewImage(i)} className="absolute top-1 right-1 bg-red-600 text-white px-1 rounded hover:bg-red-700">X</button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
