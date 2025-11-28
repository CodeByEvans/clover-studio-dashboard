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
import { Product } from "@/types/product.type";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: Omit<Product, "id" | "created_at" | "updated_at">) => void;
  initialProduct?: Product;
}

export function ProductDialog({
  open,
  onOpenChange,
  onSave,
  initialProduct,
}: ProductDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [portrait, setPortrait] = useState("");
  const [collection, setCollection] = useState<number | string>("");

  useEffect(() => {
    if (initialProduct) {
      setTitle(initialProduct.title);
      setDescription(initialProduct.description);
      setPrice(initialProduct.price.toString());
      setImages(initialProduct.images || []);
      setPortrait(initialProduct.portrait);
      setCollection(initialProduct.collection.id);
    } else {
      setTitle("");
      setDescription("");
      setPrice("");
      setImages([]);
      setPortrait("");
      setCollection("");
    }
  }, [initialProduct, open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileArray = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...fileArray]);
    if (!portrait && fileArray.length > 0) setPortrait(fileArray[0]);
  };

  const handleSetPortrait = (e: React.MouseEvent, img: string) => {
    e.preventDefault();
    setPortrait(img);
  };

  const handleRemoveImage = (img: string) => {
    setImages(images.filter((i) => i !== img));
    if (portrait === img) setPortrait(images[0] || "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      alert("Por favor completa los campos obligatorios");
      return;
    }
    onSave({
      title,
      description,
      price: Number.parseFloat(price),
      images,
      portrait,
      collection: { id: collection } as any, // por ahora solo el id como string
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      featured: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialProduct ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
          <DialogDescription>
            {initialProduct
              ? "Actualiza los detalles del producto"
              : "Añade un nuevo producto a tu catálogo"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Nombre del Producto *</Label>
            <Input
              id="title"
              placeholder="Ej: Flores Frescas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe tu producto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="price">Precio *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
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
              onChange={handleImageUpload}
            />
            <div className="flex gap-2 flex-wrap mt-2">
              {images.map((img) => (
                <div key={img} className="relative">
                  <img
                    src={img}
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
              onChange={(e) => setCollection(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {initialProduct ? "Actualizar" : "Crear"} Producto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
