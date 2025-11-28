"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Product, ProductFormData } from "@/types/product.type";
import slugify from "slugify";
import { productAPI } from "@/services/api";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDialog({ open, onOpenChange }: ProductDialogProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [portrait, setPortrait] = useState<File | null>(null);
  const [collection, setCollection] = useState<string>("");

  const handleCloseDialog = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setImages([]);
    setPortrait(null);
    setCollection("");
    onOpenChange(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const images = e.target.files;

    setImages([...images]);
    if (!portrait && images.length > 0) setPortrait(images[0]);
  };

  const handleSetPortrait = (e: React.MouseEvent, img: File) => {
    e.preventDefault();
    setPortrait(img);
  };

  const handleRemoveImage = (img: File) => {
    setImages(images.filter((i) => i !== img));
    if (portrait === img) setPortrait(images[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSlug(slugify(title, { lower: true }));
    if (portrait === null) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("collection", collection);
    formData.append("featured", "false");

    formData.append("portrait", portrait);

    images.forEach((file) => formData.append("images", file));

    try {
      const response = await productAPI.createProduct(formData);
      const product = response;

      console.log(product);
      handleCloseDialog();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nuevo Producto</DialogTitle>
          <DialogDescription>
            Añade un nuevo producto a tu catálogo
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Nombre del Producto</Label>
            <Input
              id="title"
              placeholder="Ej: Flores Frescas"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe tu producto..."
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="price">Precio</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <Label>Imágenes</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              required
              onChange={handleImageUpload}
            />
            <div className="flex gap-2 flex-wrap mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className={`w-20 h-20 object-cover border ${
                      img === portrait ? "border-blue-500" : "border-gray-300"
                    }`}
                  />
                  <div className="flex justify-between mt-1">
                    <Button
                      size="sm"
                      variant={img === portrait ? "default" : "outline"}
                      onClick={(e) => handleSetPortrait(e, img)}
                    >
                      Portada
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveImage(img)}
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="collection">ID de la Colección</Label>
            <Input
              id="collection"
              placeholder="Escribe el ID de la colección"
              value={collection}
              required
              onChange={(e) => setCollection(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button type="submit">Crear Producto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
