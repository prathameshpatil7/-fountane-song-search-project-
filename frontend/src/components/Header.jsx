import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header({ currentUser, handleLogout }) {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Music App
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {currentUser.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <LogOut size={18} className="mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
