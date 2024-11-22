// src/App.js
// essa pagina exibe a pagina principal do site.
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Perguntas from "./pages/Perguntas";
import Categorias from "./pages/Categorias";
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/adm/perguntas" element={<ProtectedRoute> <Perguntas/> </ProtectedRoute>} />
          <Route path="/adm/categorias" element={<ProtectedRoute> <Categorias/> </ProtectedRoute>} />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
