import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h4>Contactez-nous</h4>
        <p>Email: contact@bijoushop.com</p>
        <p>Téléphone: +216 73 345 678</p>
        <p>Adresse: Rue de l'Artisanat, Tunis, Tunisie</p>
      </div>
      <div className="footer-bottom">
        <p>© 2025 BijouShop. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;