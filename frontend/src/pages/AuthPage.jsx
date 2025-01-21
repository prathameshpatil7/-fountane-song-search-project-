import { useState } from "react";
import Register from "../components/AuthPages/Register";
import Login from "../components/AuthPages/Login";

const AuthPage = ({ onSetCurrentUser }) => {
  const [showRegister, setShowRegister] = useState(false);

  return showRegister ? (
    <Register onSwitchToLogin={() => setShowRegister(false)} />
  ) : (
    <Login
      onSetCurrentUser={onSetCurrentUser}
      onSwitchToRegister={() => setShowRegister(true)}
    />
  );
};

export default AuthPage;
