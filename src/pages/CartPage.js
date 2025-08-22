/*import React, { useEffect, useState } from "react";
import "../styles/CartPage.css";
import API from "../services/api";

const CartPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer le token depuis localStorage pour l'authentification
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement du panier");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p>⏳ Chargement du panier...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (orders.length === 0)
    return <p>Votre panier est vide pour l’instant.</p>;

  return (
    <div className="cart-page">
      <h2>Mon Panier</h2>
      {orders.map((order) => (
        <div key={order._id} className="cart-order">
          {order.orderItems.map((item) => (
            <div key={item.product} className="cart-item">
              <img src={item.image} alt={item.name} width={100} />
              <div>
                <h4>{item.name}</h4>
                <p>Quantité: {item.qty}</p>
                <p>Prix: {item.price} TND</p>
              </div>
            </div>
          ))}
          <p>
            <strong>Total: {order.totalPrice} TND</strong>
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CartPage;

import React, { useEffect, useState } from "react";
import "../styles/CartPage.css";
import API from "../services/api";

const CartPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement du panier");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p>⏳ Chargement du panier...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (orders.length === 0) return <p>Votre panier est vide pour l’instant.</p>;

  return (
    <div className="cart-page">
      <h2>Mon Panier</h2>
      {orders.map((order) => (
        <div key={order._id} className="cart-order">
          {order.orderItems.map((item) => (
            <div key={item.product} className="cart-item">
              <img src={item.image} alt={item.name} width={100} />
              <div>
                <h4>{item.name}</h4>
                <p>Quantité: {item.qty}</p>
                <p>Prix: {item.price} TND</p>
              </div>
            </div>
          ))}
          <p>
            <p>Total Items: {order.orderItems.reduce((sum, item) => sum + item.qty, 0)}</p>
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CartPage;*/