import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      // ⚡ user contient isAdmin
      const user = data.user;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", user.isAdmin ? "admin" : "client");

      alert(`✅ Bienvenue ${user.name} !`);
      navigate(user.isAdmin ? "/admin" : "/account");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Email ou mot de passe invalide");
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
