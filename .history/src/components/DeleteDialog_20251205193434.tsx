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
  const [deletingProduct, setDeletingProduct] = useState<boolean>(false);

  const handleDeleteProduct = async () => {
    setDeletingProduct(true);
    try {
      const deletedProduct = await productAPI.deleteProduct(id);
      setProducts((p) => p.filter((p) => p.id !== id));
      setDeletingProduct(false);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error al eliminar el producto:", error.message);
      setDeletingProduct(false);
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
              <Button type="submit" disabled={deletingProduct}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DeleteDialog;
