import React from "react";

interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  unitsInStock: number;
  categoryId: number;
}

interface Category {
  categoryId: number;
  categoryName: string;
}

interface ProductListProps {
  products: Product[];
  categories: Category[];
}

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
          className="flex justify-between p-4 border rounded bg-white"
        >
          <div>
            <p className="font-semibold">{p.productName}</p>
            <p>Price: {p.unitPrice} | Stock: {p.unitsInStock}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
