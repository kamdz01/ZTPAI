import logo from './logo.svg';
import './App.css';
import { useAuth } from "./auth/AuthContext.tsx";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import Panel from "./pages/panel.tsx";
import Admin from "./pages/admin.tsx";

function App() {
  const { isAuthenticated } = useAuth();
  const { isAdmin } = useAuth();

  return (
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 

        <Route
          path="/*"
          element={
              <Routes>
                <Route path="/" element={<Navigate to="/main" />} />
                <Route path="/main" element={isAuthenticated() ? <Panel /> : <Navigate to="/login" />} />
                <Route path="/panel" element={isAuthenticated() ? <Panel /> : <Navigate to="/login" />} />
                <Route path="/admin" element={isAuthenticated() && isAdmin() ? <Admin /> : <Navigate to="/login" />} />
              </Routes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
