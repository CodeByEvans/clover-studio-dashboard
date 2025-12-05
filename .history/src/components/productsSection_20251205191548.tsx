"use client";

import { useEffect, useState } from "react";
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
import { type Products } from "@/types/product.type";
import { productAPI } from "@/services/api";
import { Collections } from "@/types/collection.type";

interface ProductsSectionProps {
  products: Products;
  collections: Collections;
  setProducts: React.Dispatch<React.SetStateAction<Products>>;
}

export function ProductsSection({
  products,
  collections,
  setProducts,
}: ProductsSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await productAPI.getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    setDeletingProduct(true);
    try {
      const deletedProduct = await productAPI.deleteProduct(id);
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      setDeletingProduct(false);
    } catch (error: any) {
      console.error("Error al eliminar el producto:", error.message);
      setDeletingProduct(false);
    }
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
        setProducts={setProducts}
        collections={collections}
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
                  <Button>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
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
