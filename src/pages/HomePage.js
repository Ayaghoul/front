import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import api from "../services/api";
import "../styles//HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>⏳ Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div className="home">
      <h1>Bienvenue sur 💎 BijouShop</h1>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
