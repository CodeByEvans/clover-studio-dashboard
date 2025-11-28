"use client";

import { useEffect, useState } from "react";
import { Users, Package, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "./user-profile";
import { ProductsSection } from "./productsSection";
import { Products } from "@/types/product.type";
import { collectionAPI } from "@/services/api";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [products, setProducts] = useState<Products>([]);
  const [collections, setCollections] = useState([]);

  const activeProducts = products.filter((p) => p.active);

  const latestProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 3);

  useEffect(() => {
    const fetchCollections = async () => {
      const collections = await collectionAPI.getCollections();
      setCollections(collections);
    };

    fetchCollections();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header with user profile */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Panel de Control
          </h1>
          <p className="text-muted-foreground mt-2">
            Bienvenido a Clover Studio
          </p>
        </div>
        <UserProfile />
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Productos */}
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Productos
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <span className="text-2xl font-bold">{products.length}</span>
            <span className="text-xs text-muted-foreground">
              Productos en el sistema
            </span>
          </CardContent>
        </Card>

        {/* Activos */}
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <span className="text-2xl font-bold">{activeProducts.length}</span>
            <span className="text-xs text-muted-foreground">
              Productos activos
            </span>
          </CardContent>
        </Card>

        {/* Últimas actualizaciones */}
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Últimas actualizaciones
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {latestProducts.length === 0 ? (
              <span className="text-xs text-muted-foreground">
                No hay actualizaciones
              </span>
            ) : (
              latestProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col text-xs text-muted-foreground"
                >
                  <span className="font-medium text-foreground">
                    {product.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(product.updated_at).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Products section */}
      <div>
        <ProductsSection
          products={products}
          setProducts={setProducts}
          collections={collections}
        />
      </div>
    </div>
  );
}
