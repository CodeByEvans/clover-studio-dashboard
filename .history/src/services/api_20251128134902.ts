import { clientEnvs } from "@/config/envs";
import { ProductFormData } from "@/types/product.type";
import axios from "axios";

const api = axios.create({
  baseURL: clientEnvs.supabaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Product API
export const productAPI = {
  getProducts: () => api.get("/products"),
  getProduct: (id: number) => api.get(`/products/${id}`),
  createProduct: (data: ProductFormData) => api.post("/products", data),
};
