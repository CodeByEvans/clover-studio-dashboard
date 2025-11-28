import { getClientEnvs } from "@/config/client-envs";
import { ProductFormData, Products } from "@/types/product.type";
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
    } catch (error) {
      throw error;
    }
  },
  getProduct: (id: string) => api.get(`/products/${id}`),
  createProduct: async (product: FormData) => {
    try {
      const response = await api.post("/products", product);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
