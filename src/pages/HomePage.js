/*import React, { useEffect, useState } from "react";
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
  // Fonction simple pour tester l'ajout au panier
  const addToCart = (product) => {
    alert(`${product.name} ajouté au panier !`);
  };
  return (
    <div className="home">
      <h1>Bienvenue sur 💎 BijouShop</h1>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default HomePage;*/
import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import API from "../services/api";
import "../styles/HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Ajouter au panier
  const addToCart = async (product) => {
    if (!token) {
      alert("Veuillez vous connecter pour ajouter au panier");
      return;
    }

    try {
      const orderData = {
        orderItems: [
          {
            product: product._id,
            name: product.name,
            qty: 1,
            price: product.price,
            image: product.image,
          },
        ],
        shippingAddress: {
          address: "Non défini",
          city: "Non défini",
          postalCode: "0000",
          country: "Non défini",
        },
        paymentMethod: "Non défini",
        itemsPrice: product.price,
        shippingPrice: 0,
        totalPrice: product.price,
      };

      await API.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`${product.name} ajouté au panier !`);
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      alert("Impossible d'ajouter au panier");
    }
  };

  if (loading) return <p>⏳ Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div className="home">
      <h1>Bienvenue sur 💎 BijouShop</h1>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default HomePage;
