import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Intercepteur pour ajouter automatiquement le token si présent
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Produits
export const fetchProducts = () => API.get("/products");
export const addProduct = (newProduct) => API.post("/products", newProduct);
export const updateProduct = (id, updatedProduct) =>
  API.put(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Auth
export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);

export default API;