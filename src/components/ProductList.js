import React from "react";

const ProductList = ({ products, addToCart }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <p>Aucun produit trouvé.</p>;
  }

  return (
    <div className="product-list">
      {products.map((p) => (
        <div key={p._id} className="product-item">
          {p.image && <img src={p.image} alt={p.name} width={150} />}
          <h3>{p.name}</h3>
          <p>Prix: {p.price} TND</p>
          <p>Stock: {p.countInStock || 0}</p>

          {/* Bouton Ajouter au panier */}
          {addToCart && (
            <button onClick={() => addToCart(p)}>Ajouter au panier</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;