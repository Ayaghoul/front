import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import api from "../services/api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await api.get("/products");
        // Assure-toi que data est un tableau
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    };
    loadProducts();
  }, []);

  // Fonction simple pour tester l'ajout au panier
  const addToCart = (product) => {
    alert(`${product.name} ajouté au panier !`);
  };

  return (
    <div>
      <h2>Tous nos produits</h2>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default ProductsPage;