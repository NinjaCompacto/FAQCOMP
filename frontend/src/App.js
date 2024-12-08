// src/App.js
// essa pagina exibe a pagina principal do site.
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Perguntas from "./pages/Perguntas";
import Categorias from "./pages/Categorias";
import ProtectedRoute from "./Components/ProtectedRoute";
import EsqueciSenha from "./pages/EsqueciSenha";
import RedefinirSenha from "./pages/RedefinirSenha";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Página Inicial */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/adm/perguntas"
            element={
              <ProtectedRoute>
                {" "}
                <Perguntas />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/adm/categorias"
            element={
              <ProtectedRoute>
                {" "}
                <Categorias />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/esqueci-minha-senha" element={<EsqueciSenha />} />
          <Route path="/reset-password/:token" element={<RedefinirSenha />} />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
