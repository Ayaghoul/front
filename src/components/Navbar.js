import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Exemple : récupérer info admin depuis localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
     
        <Link to="/" className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          <span>BijouShop</span>
        </Link>

        
        <ul className="nav-links">
          <li>
            <Link to="/">Accueil</Link>
          </li>
         
          {!isAdmin && (
            <li>
              <Link to="/admin/products">Produits</Link>
            </li>
          )}

          <li>
            <Link to="/login">Connexion</Link>
          </li>
          <li>
            <Link to="/register" className="btn-register">
              Inscription
            </Link>
          </li>
        </ul>

       
        <div className="cart">
          <Link to="/cart">🛒</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


