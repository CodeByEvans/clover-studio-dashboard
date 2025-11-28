import { getClientEnvs } from "@/config/client-envs";
import { LoginForm, RegisterForm } from "@/types/auth.type";
import { Product, ProductFormData, Products } from "@/types/product.type";
import axios from "axios";

const { apiUrl } = getClientEnvs();

const api = axios.create({
  baseURL: apiUrl,
});

// Product API
export const productAPI = {
  getProducts: async () => {
    try {
      const response = await api.get<Products>("/products");
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  getProduct: (id: string) => api.get(`/products/${id}`),
  createProduct: async (product: FormData) => {
    try {
      const response = await api.post<Product>("/products", product);
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
};

// Collection API
export const collectionAPI = {
  getCollections: async () => {
    try {
      const response = await api.get("/collections");
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
};

// Auth API
export const authAPI = {
  login: async (loginForm: LoginForm) => {
    try {
      const response = await api.post("/auth/login", loginForm);
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
};
