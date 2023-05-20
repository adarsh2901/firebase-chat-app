import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

// Create a new context for authentication
const AuthContext = React.createContext();

// Custom hook to access the authentication context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Effect hook to handle authentication state changes
  useEffect(() => {
    // Listen for authentication state changes using onAuthStateChanged
    auth.onAuthStateChanged((user) => {
      // Update the user state with the authenticated user
      setUser(user);
      // Set loading to false since authentication is completed
      setLoading(false);
      // Redirect to the chats page if the user is authenticated, otherwise go to the login page
      if (user) navigate("/chats");
      else navigate("/");
    });
  }, [user, navigate]);

  // Create a value object containing the user
  const value = { user };

  return (
    // Provide the value object to the AuthContext.Provider
    <AuthContext.Provider value={value}>
      {/* Render children only when loading is false */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
