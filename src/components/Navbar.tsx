import { Link } from "react-router-dom";
import cartIcon from "../assets/icons/cart.svg"; // isteğe bağlı ikon

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="font-bold text-2xl">My Shop</div>
      <div className="space-x-6 flex-1 text-center">
        <Link to="/" className="hover:text-gray-200 font-medium">Home</Link>
        <Link to="/products" className="hover:text-gray-200 font-medium">Products</Link>
        <Link to="/cart" className="hover:text-gray-200 font-medium">Cart</Link>
      </div>
      <div>
        <Link to="/cart">
          <img src={cartIcon} alt="Cart" className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
