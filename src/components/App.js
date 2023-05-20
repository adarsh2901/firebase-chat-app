import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";

import Chats from "./Chats";
import Login from "./Login";

/**
 * The main component of the application.
 * It sets up the routing and provides authentication context.
 */
function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Route for the "/chats" path */}
            <Route path="/chats" element={<Chats />} />

            {/* Route for the root path */}
            <Route path="/" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
