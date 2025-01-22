import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import SongDetailsPage from "./pages/SongDetailsPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check for the user in sessionStorage and update the state
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.clear();
  };

  if (isCheckingAuth) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <HomePage currentUser={currentUser} handleLogout={handleLogout} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/song/:id"
          element={
            currentUser ? (
              <SongDetailsPage
                onSetCurrentUser={setCurrentUser}
                currentUser={currentUser}
                handleLogout={handleLogout}
              />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/auth"
          element={<AuthPage onSetCurrentUser={setCurrentUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
