import ProductList from "../components/ProductList";
import PromoSlider from "../components/PromoSlider";
import { products } from "../data/products"; // <-- Bunu ekle

const Products: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 p-6">
      {/* Sidebar / Filter */}
      <aside className="w-64 bg-white p-4 rounded-xl shadow-md mr-6 hidden md:block">
        <h3 className="font-bold text-lg mb-4">Filters</h3>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Category</h4>
          <ul className="space-y-1">
            <li><button className="text-blue-600 hover:underline">Mouse</button></li>
            <li><button className="text-blue-600 hover:underline">Keyboard</button></li>
            <li><button className="text-blue-600 hover:underline">Headset</button></li>
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Price</h4>
          <ul className="space-y-1">
            <li><button className="text-blue-600 hover:underline">Under $200</button></li>
            <li><button className="text-blue-600 hover:underline">$200 - $400</button></li>
            <li><button className="text-blue-600 hover:underline">Above $400</button></li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        <PromoSlider />

        <h2 className="text-2xl font-bold mb-4">All Products</h2>

        {/* Burada products props olarak gönderiliyor */}
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Products;
