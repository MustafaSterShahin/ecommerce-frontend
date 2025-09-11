import React from "react";
import { Link } from "react-router-dom";
import type { ProductListProps } from "../types";

const ProductList: React.FC<ProductListProps> = ({ products, categories }) => {
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.categoryId === categoryId);
    return category?.categoryName ?? "No Name";
  };

  return (
    <ul className="space-y-2">
      {products.map((p) => (
        <li
          key={p.productId}
          className="flex justify-between items-center p-4 border rounded bg-white"
        >
          <div>
            <Link
              to={`/products/${p.productId}`}
              className="font-semibold text-blue-600 hover:underline"
            >
              {p.productName}
            </Link>
            <p>
              Price: {p.unitPrice} ₺ | Stock: {p.unitsInStock} | Category:{" "}
              {getCategoryName(p.categoryId)}
            </p>
          </div>
          {p.imageUrl && (
            <img
              src={p.imageUrl}
              alt={p.productName}
              className="w-16 h-16 object-cover rounded"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
