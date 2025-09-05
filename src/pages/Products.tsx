import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import api from "../api";

interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  unitsInStock: number;
  categoryId: number;
  supplier?: string; // Supplier bilgisi
}

interface Category {
  categoryId: number;
  categoryName: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      const data = Array.isArray(res.data.$values) ? res.data.$values : res.data;
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      const data = Array.isArray(res.data.$values) ? res.data.$values : res.data;
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((p) => {
    const byCategory = selectedCategory ? p.categoryId === selectedCategory : true;
    const byPrice =
      (minPrice === "" || p.unitPrice >= minPrice) &&
      (maxPrice === "" || p.unitPrice <= maxPrice);
    const bySearch = p.productName.toLowerCase().includes(search.toLowerCase());
    return byCategory && byPrice && bySearch;
  });

  const buttonClass = (active: boolean) =>
    active
      ? "text-white bg-blue-600 px-2 py-1 rounded"
      : "text-blue-600 hover:underline";

  return (
    <div className="min-h-screen flex bg-gray-50 p-4 md:p-6">
      {/* Sidebar / Filter */}
      <aside
        className={`w-64 bg-white p-4 rounded-xl shadow-md mr-6 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static top-0 left-0 h-full z-50`}
      >
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h3 className="font-bold text-lg">Filters</h3>
          <button onClick={() => setSidebarOpen(false)} className="text-red-500 font-bold">
            ✕
          </button>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Search</h4>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Category</h4>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
                className={buttonClass(selectedCategory === null)}
              >
                All
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.categoryId}>
                <button
                  onClick={() => setSelectedCategory(c.categoryId)}
                  className={buttonClass(selectedCategory === c.categoryId)}
                >
                  {c.categoryName}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Price Range</h4>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-2xl font-bold">All Products</h2>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white bg-blue-600 px-3 py-1 rounded"
          >
            Filters
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4 hidden md:block">All Products</h2>

        <ProductList
          products={filteredProducts}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default Products;
