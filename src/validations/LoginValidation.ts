// authUtils.ts

export const validateCredentials = (
  username: string,
  password: string
): string | null => {
  if (!username.trim()) {
    return "El nombre de usuario no puede estar vacío.";
  }
  if (/\s/.test(username)) {
    return "El nombre de usuario no puede contener espacios en blanco.";
  }
  if (!password.trim()) {
    return "La contraseña no puede estar vacía.";
  }
  if (!/\d/.test(password)) {
    return "La contraseña debe contener al menos un número.";
  }
  return null; // Si no hay errores de validación, devuelve null
};
