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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    portrait: "",
  });

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        title: initialProduct.title,
        description: initialProduct.description,
        price: initialProduct.price.toString(),
        portrait: initialProduct.portrait || "",
      });
    } else {
      setFormData({ title: "", description: "", price: "", portrait: "" });
    }
  }, [initialProduct, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    onSave({
      title: formData.title,
      slug:
        initialProduct?.slug ??
        formData.title.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      price: Number.parseFloat(formData.price),
      portrait: formData.portrait,
      images: initialProduct?.images ?? [], // si quieres editar imágenes, añade inputs luego
      collection: initialProduct?.collection ?? null!, // ajusta según tu lógica real
      featured: initialProduct?.featured ?? false,
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
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Ej: Vela Aromática Rosa"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe tu producto..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="portrait">Imagen Principal (portrait)</Label>
            <Input
              id="portrait"
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formData.portrait}
              onChange={(e) =>
                setFormData({ ...formData, portrait: e.target.value })
              }
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
