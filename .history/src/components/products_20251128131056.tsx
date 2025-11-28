"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductDialog } from "./product-dialog";
import {
  ProductFormData,
  type Product,
  type Products,
} from "@/types/product.type";

export function Products() {
  const [products, setProducts] = useState<Products>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (product: ProductFormData) => {
    if (editingProduct) {
      const updated = {
        ...editingProduct,
        ...product,
        updated_at: new Date().toISOString(),
      };
      setEditingProduct(null);
    } else {
      const newProduct: ProductFormData = {
        ...product,
      };
      setProducts([...products]);
    }

    setDialogOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Productos</h2>
          <p className="text-muted-foreground mt-1">
            Gestiona tus productos del catálogo
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setDialogOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </Button>
      </div>

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleAddProduct}
        initialProduct={editingProduct || undefined}
      />

      {products.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Sin productos
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Comienza a añadir productos a tu catálogo
            </p>
            <Button
              onClick={() => {
                setEditingProduct(null);
                setDialogOpen(true);
              }}
              variant="outline"
            >
              Crear primer producto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              {product.portrait && (
                <div className="w-full h-40 bg-muted overflow-hidden rounded-t-lg">
                  <img
                    src={product.portrait || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <CardHeader className="flex-1">
                <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-primary">
                  €{product.price.toFixed(2)}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
