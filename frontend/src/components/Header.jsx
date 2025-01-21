import { LogOut } from "lucide-react";

function Header({ currentUser, handleLogout }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Music App</h1>
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
