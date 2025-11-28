import { getClientEnvs } from "@/config/client-envs";
import { ProductFormData, Products } from "@/types/product.type";
import axios from "axios";

const { apiUrl } = getClientEnvs();

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Product API
export const productAPI = {
  getProducts: () => api.get<Products>("/products"),
  getProduct: (id: number) => api.get(`/products/${id}`),
  createProduct: (data: ProductFormData) => api.post("/products", data),
};
