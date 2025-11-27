export function formDataToObject(formData: FormData) {
  const obj: any = {};

  for (const [key, value] of formData.entries()) {
    if (!value) continue;

    let parsed: any = value;

    if (value instanceof File) {
      if (!value.name) continue; // ignorar archivos vacíos
      parsed = value;
    } else if (value === "true" || value === "false") {
      parsed = value === "true";
    } else if (!isNaN(Number(value))) {
      parsed = Number(value);
    } else {
      parsed = value;
    }

    // Si la clave ya existe, convertir en array (si no lo es ya)
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(parsed);
    } else {
      obj[key] = parsed;
    }
  }

  return obj;
}
