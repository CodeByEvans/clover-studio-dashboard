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

export const DeleteDialog = ({ id }: { id: string }) => {
  return (
    <Dialog>
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
              <Button type="submit">Eliminar</Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DeleteDialog;
