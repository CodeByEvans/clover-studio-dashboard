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

    // Siempre tratamos todos los campos como arrays
    if (!obj[key]) {
      obj[key] = [parsed]; // primera aparición → array con 1 ítem
    } else {
      obj[key].push(parsed); // siguientes → push
    }
  }

  return obj;
}
