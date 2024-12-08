import React from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import { BiLogOut } from "react-icons/bi";
import "./NavbarAdm.css";

const NavbarAdm = () => {
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove o token de autenticação
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className="navbar">
      {/* MUDAR O NAVIGATE PARA HOME */}
      <h2 onClick={() => navigate("/adm/perguntas")}>FAQIcomp</h2>
      <div className="navbar-buttons">
        <div className="per-button">
          {/* Botão de perguntas */}
          <button onClick={() => navigate("/adm/perguntas")}>Perguntas</button>
        </div>

        <div className="cat-button">
          {/* Botão de categorias */}
          <button onClick={() => navigate("/adm/categorias")}>
            Categorias
          </button>
        </div>
      </div>
      {/* Botão de logout */}
      <BiLogOut className="logout-icon" onClick={handleLogout}></BiLogOut>
    </div>
  );
};

export default NavbarAdm;
