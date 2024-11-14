// src/App.js
// essa pagina exibe a pagina principal do site.
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<ProtectedRoute> <Menu /> </ProtectedRoute>} />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
