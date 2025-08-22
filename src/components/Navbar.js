import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null); // "client", "admin" ou null

  // Récupération du rôle depuis localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role"); 
    if (storedRole) setUserRole(storedRole);
  }, []);

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("role");
    setUserRole(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          <span>BijouShop</span>
        </Link>

        <ul className="nav-links">
          {/* Toujours Accueil */}
          <li>
            <Link to="/">Accueil</Link>
          </li>

          {/* Non connecté */}
          {!userRole && (
            <>
              <li>
                <Link to="/login">Connexion</Link>
              </li>
              <li>
                <Link to="/register">Inscription</Link>
              </li>
            </>
          )}

          {/* Client connecté */}
          {userRole === "client" && (
            <>
              
              <li>
                <button className="btn-nav" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            </>
          )}

          {/* Admin connecté */}
          {userRole === "admin" && (
            <>
              <li>
                <Link to="/admin/products">Produits</Link>
              </li>
              <li>
                <Link to="/admin/orders">Orders</Link>
              </li>
              <li>
                <button className="btn-nav" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;