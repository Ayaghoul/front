import React from "react";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>

      <p className="price">{product.price} €</p>
      <button>Ajouter au panier</button>
    </div>
  );
};

export default ProductCard;
