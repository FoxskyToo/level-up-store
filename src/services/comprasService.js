
const STORAGE_KEY = "comprasLevelUp";

export function obtenerCompras() {
  try {
    const datos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

export function guardarCompra(compra) {
  const compras = obtenerCompras();

  compras.push(compra);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(compras)
  );

  return compra;
}

export function obtenerComprasPorUsuario(correo) {
  if (!correo) return [];

  return obtenerCompras()
    .filter(
      (compra) =>
        String(compra.usuarioEmail).toLowerCase() ===
        String(correo).toLowerCase()
    )
    .sort(
      (a, b) =>
        new Date(b.fecha) - new Date(a.fecha)
    );
}
