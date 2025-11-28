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
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductFormData = {
  title: string;
  slug: string;
  description: string;
  images: File[];
  portrait: File | null;
  price: string;
  collection: string;
  featured: boolean;
};
