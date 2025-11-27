export function formDataToObject(formData: FormData) {
  const obj: any = {};
  for (const [key, value] of formData.entries()) {
    if (!value) continue; // ignoramos campos vacíos
    if (value instanceof File) {
      if (value.name) obj[key] = value; // solo archivos reales
    } else if (value === "true" || value === "false") {
      obj[key] = value === "true";
    } else if (!isNaN(Number(value))) {
      obj[key] = Number(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
