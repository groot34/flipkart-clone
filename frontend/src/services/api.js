import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productAPI = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get(`/products?search=${query}`),
};

export const categoryAPI = {
  getAll: () => api.get("/categories"),
};

export const cartAPI = {
  getCart: (userId = 1) => api.get(`/cart/${userId}`),
  addItem: (data) => api.post("/cart", data),
  updateItem: (id, quantity) => api.put(`/cart/${id}`, { quantity }),
  removeItem: (id) => api.delete(`/cart/${id}`),
};

export const orderAPI = {
  create: (data) => api.post("/orders", data),
  getById: (id) => api.get(`/orders/${id}`),
  getByUser: (userId = 1) => api.get(`/orders/user/${userId}`),
};

export default api;
