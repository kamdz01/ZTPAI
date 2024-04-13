import logo from './logo.svg';
import './App.css';

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

function App() {
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
                <Route path="/main" element={<Panel />} />
                <Route path="/panel" element={<Panel />} />
              </Routes>
          }
        />
      </Routes>
    </Router>

  );
}

export default App;
