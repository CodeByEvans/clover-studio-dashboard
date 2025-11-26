import { ZodError } from "zod";

function formatZodErrors(error: ZodError) {
  const translated: Record<string, string> = {};

  error.issues.forEach((err) => {
    const field = err.path[0] as string;

    switch (field) {
      case "title":
        translated[field] = "El título es obligatorio";
        break;
      case "description":
        translated[field] = "La descripción es obligatoria";
        break;
      case "images":
        translated[field] = "Se requiere al menos una imagen";
        break;
      case "portrait":
        translated[field] = "Se requiere una imagen de portada";
        break;
      case "price":
        translated[field] = "El precio debe ser un número válido";
        break;
      case "collection":
        translated[field] = "La colección es obligatoria";
        break;
      case "featured":
        translated[field] = "El campo destacado debe ser verdadero o falso";
        break;
      default:
        translated[field] = err.message; // fallback
    }
  });

  return translated;
}
