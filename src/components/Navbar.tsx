import { Link, useNavigate } from "react-router-dom";
import cartIcon from "../assets/icons/cart.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useContext(AuthContext);
  const [role, setRole] = useState("");

  // JWT'den rolü almak için
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userRole = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setRole(userRole);
      } catch (err) {
        console.error("Token decode edilemedi:", err);
      }
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="font-bold text-2xl">My Shop</div>

      <div className="space-x-6 flex-1 flex justify-center">
        <Link to="/" className="hover:text-gray-200 font-medium">Home</Link>
        <Link to="/products" className="hover:text-gray-200 font-medium">Products</Link>
        {isLoggedIn && role === "Admin" && (
          <Link to="/admin" className="hover:text-gray-200 font-medium">Admin Panel</Link>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <span>Hello, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
              Login
            </Link>
            <Link to="/register" className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">
              Register
            </Link>
          </>
        )}
        <Link to="/cart">
          <img src={cartIcon} alt="Cart" className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
