import React from "react";
import HeroSlider from "../components/HeroSlider";
import { products } from "../data/products";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6">
      <HeroSlider />

      <section className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform flex flex-col items-center"
            >
              <Link to={`/products/${product.id}`} className="flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-48 h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                <p className="text-gray-600 mt-1 font-medium">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
