/*import React, { useEffect, useState } from "react";
import API from "../services/api"; // instance axios
import "../styles/AdminProductsPage.css";


const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    countInStock: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  // Charger tous les produits depuis le backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/products");
      // Vérifie que res.data est bien un tableau
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erreur fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Gestion des inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  // Ajouter un produit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.countInStock) {
      return alert("Remplir tous les champs");
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("countInStock", form.countInStock);
      if (form.image) formData.append("image", form.image);

      await API.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ name: "", price: "", countInStock: "", image: null });
      fetchProducts();
    } catch (err) {
      console.error("Erreur ajout produit:", err);
    }
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Erreur suppression produit:", err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin - Gestion des produits</h1>

    
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="countInStock"
          placeholder="Stock"
          value={form.countInStock}
          onChange={handleChange}
        />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">Ajouter Produit</button>
      </form>

     
      <h2>Produits existants</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <ul className="product-list">
          {products.map((p) => (
            <li key={p._id} className="product-item">
              <strong>{p.name}</strong> - {p.price} TND - Stock:{" "}
              {p.countInStock}
              {p.image && <img src={p.image} alt={p.name} width="80" />}
              <div>
               
                <button onClick={() => handleUpdate(p._id)}>Modifier</button> 
                <button onClick={() => handleDelete(p._id)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProductsPage;*/

import React, { useEffect, useState } from "react";
import API from "../services/api"; // instance axios
import "../styles/AdminProductsPage.css";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    countInStock: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erreur fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.countInStock) {
      return alert("Remplir tous les champs");
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("countInStock", form.countInStock);
      if (form.image) formData.append("image", form.image);

      if (editingId) {
        await API.put(`/products/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        await API.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ name: "", price: "", countInStock: "", image: null });
      fetchProducts();
    } catch (err) {
      console.error("Erreur ajout/modification produit:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Erreur suppression produit:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      countInStock: product.countInStock,
      image: null,
    });
  };

  return (
    <div className="admin-container">
      <h1>Admin - Gestion des produits</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="countInStock"
          placeholder="Stock"
          value={form.countInStock}
          onChange={handleChange}
        />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">
          {editingId ? "Mettre à jour" : "Ajouter Produit"}
        </button>
      </form>

      <h2>Produits existants</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <ul className="product-list">
          {products.map((p) => (
            <li key={p._id} className="product-item">
              <strong>{p.name}</strong> - {p.price} TND - Stock:{" "}
              {p.countInStock}
              {p.image && <img src={p.image} alt={p.name} width="80" />}
              <div>
                <button onClick={() => handleEdit(p)}>Modifier</button>
                <button onClick={() => handleDelete(p._id)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProductsPage;
