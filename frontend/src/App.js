// src/App.js
// essa pagina exibe a pagina principal do site.
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Perguntas from "./pages/Perguntas";
import Categorias from "./pages/Categorias";
import ProtectedRoute from "./Components/ProtectedRoute";
import CriarPergunta from "./pages/CriarPergunta";
import EditarPergunta from "./pages/EditarPergunta";
import Home from "./pages/Home";
import PerguntaCompleta from "./pages/PerguntaCompleta";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Página Inicial */}
          <Route path="/login" element={<Login />} />
          <Route path="/pergunta/:id" element={<PerguntaCompleta />} />
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
          <Route
            path="/adm/criar-pergunta"
            element={
              <ProtectedRoute>
                {" "}
                <CriarPergunta />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/adm/perguntas/editar/:id"
            element={
              <ProtectedRoute>
                {" "}
                <EditarPergunta/>{" "}
              </ProtectedRoute>
            }
          />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
