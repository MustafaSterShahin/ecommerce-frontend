import { useEffect, useState } from "react";

interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  unitsInStock: number;
  categoryId: number;
  imageUrl: string;
  details: string;
}


const MyProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const supplierId: string = payload["SupplierID"];
    fetch(`https://localhost:5031/api/products/supplier/${supplierId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ürünler alınamadı:", err);
        setLoading(false);
      });
  } catch (err) {
    console.error("Token çözümlenemedi:", err);
    setLoading(false);
  }
}, []);


  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.productId} className="p-4 border rounded shadow">
              <h2 className="font-semibold">{product.productName}</h2>
              <p>Price: {product.unitPrice} ₺</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProducts;
