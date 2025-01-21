import { useState } from "react";
import { Mail, Lock, User, Music } from "lucide-react";
import { showToast } from "../../utils/toast";
import { fetch } from "../../services/fetch";

const Register = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(name, email, password);
  };

  const handleRegister = async (name, email, password) => {
    try {
      const response = await fetch({
        url: "/api/auth/register",
        body: { name, email, password },
      });
      if (response.status === "success") {
        onSwitchToLogin();
        showToast("success", "Registration successful");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Music size={40} className="text-purple-600" />
        </div>
        <h2 className="text-3xl font-extrabold mb-4 text-center text-purple-700">
          Join the Music World!
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Create an account and let the music inspire you.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <div className="flex items-center">
                <User size={18} className="mr-2 text-purple-600" />
                Name
              </div>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-purple-600" />
                Email
              </div>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <div className="flex items-center">
                <Lock size={18} className="mr-2 text-purple-600" />
                Password
              </div>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Create a password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-purple-600 font-semibold hover:text-purple-700"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
