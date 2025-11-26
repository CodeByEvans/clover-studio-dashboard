import { Collection } from "./collection.type";

export type Products = Product[];

export type Product = {
  id: number;
  title: string;
  slug: string;
  description: string;
  images: string[];
  portrait: string;
  price: number;
  collection: Collection;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductFormData = Omit<Product, "images"> & {
  images: File[];
};
