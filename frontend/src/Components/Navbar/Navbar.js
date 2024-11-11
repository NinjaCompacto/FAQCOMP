import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>FAQIcomp</h2>
      <div className="search-box">
        <input type="text" placeholder="Pesquise aqui." />
        <BiSearchAlt2></BiSearchAlt2>
      </div>
    </div>
  );
};

export default Navbar;
