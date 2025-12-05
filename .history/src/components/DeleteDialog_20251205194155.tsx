import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { productAPI } from "@/services/api";
import { Products } from "@/types/product.type";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  setProducts: React.Dispatch<React.SetStateAction<Products>>;
}

export const DeleteDialog = ({
  open,
  onOpenChange,
  id,
  setProducts,
}: DeleteDialogProps) => {
  const [isDeletingProduct, setIsDeletingProduct] = useState<boolean>(false);

  const handleDeleteProduct = async () => {
    setIsDeletingProduct(true);
    try {
      await productAPI.deleteProduct(id);
      setProducts((p) => p.filter((p) => p.id !== id));
      setIsDeletingProduct(false);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error al eliminar el producto:", error.message);
      setIsDeletingProduct(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDeleteProduct}>
      <form>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              ¿Estás seguro de que quieres eliminar este producto?
            </DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isDeletingProduct}
                onClick={handleDeleteProduct}
              >
                {isDeletingProduct ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full"></span>
                    Eliminando...
                  </div>
                ) : (
                  "Eliminar"
                )}
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DeleteDialog;
