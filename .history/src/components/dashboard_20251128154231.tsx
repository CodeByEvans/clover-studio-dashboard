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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Productos
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              Productos en el sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProducts.length}</div>
            <p className="text-xs text-muted-foreground">Productos activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Últimas actualizaciones
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <ul className="text-xs space-y-1">
              {latestProducts.map((product) => (
                <li key={product.id} className="text-xs text-muted-foreground">
                  {product.title}
                  <br />
                  {new Date(product.updated_at).toLocaleString()}
                </li>
              ))}
            </ul>
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
