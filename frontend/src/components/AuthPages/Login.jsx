import { useState } from "react";
import { Mail, Lock, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetch } from "../../services/fetch";
import { showToast } from "../../utils/toast";
import backgroundImage from "../../assets/images/background.jpg";

const Login = ({ onSetCurrentUser, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch({
        url: "/api/auth/login",
        body: { email, password },
      });
      if (!response.token) {
        throw new Error(response.message);
      }
      sessionStorage.setItem("user", JSON.stringify(response.user));
      sessionStorage.setItem("token", response.token);
      const user = response.user;
      onSetCurrentUser(user);
      navigate("/");
      showToast("success", "Login successful");
    } catch (error) {
      console.log(error);
      showToast("error", error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Music size={40} className="text-purple-600" />
        </div>
        <h2 className="text-3xl font-extrabold mb-4 text-center text-purple-700">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Let the music bring you joy. Log in to continue!
        </p>
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Don{"'"}t have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-purple-600 font-semibold hover:text-purple-700"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
