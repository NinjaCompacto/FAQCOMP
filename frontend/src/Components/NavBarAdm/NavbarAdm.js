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
      <h2>FAQIcomp</h2>
      <div className="navbar-buttons">
        {/* Botões de navegação */}
        <button onClick={() => navigate("/adm/perguntas")}>Perguntas</button>
        <button onClick={() => navigate("/adm/categorias")}>Categorias</button>
        {/* Botão de logout */}
      </div>

      <BiLogOut className="logout-icon" onClick={handleLogout}></BiLogOut>
    </div>
  );
};

export default NavbarAdm;
