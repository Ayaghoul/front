import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import api from "../services/api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    // Charger le panier depuis localStorage si existant
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    };
    loadProducts();
  }, []);

  // Fonction ajout au panier
  const addToCart = (product) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      alert("Veuillez vous connecter pour ajouter au panier");
      return;
    }

    const exist = cart.find((item) => item._id === product._id);
    let newCart;
    if (exist) {
      newCart = cart.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, qty: 1 }];
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
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
