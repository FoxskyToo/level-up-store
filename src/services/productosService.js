
import { productosIniciales } from "../data/productosIniciales";

const STORAGE_KEY = "productosLevelUp";
const INIT_KEY = "productosInicialesLevelUpV1";

export function obtenerProductos() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY);
    const productos = datos ? JSON.parse(datos) : [];

    return Array.isArray(productos) ? productos : [];
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

export function guardarProductos(productos) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(productos)
  );
}

export function inicializarProductos() {
  const productosGuardados = obtenerProductos();

  // Corregir variantes conocidas de descripciones dañadas.
  let descripcionesCorregidas = false;

  productosGuardados.forEach((producto) => {
    const inicial = productosIniciales.find(
      (item) =>
        item.codigo.toLowerCase() ===
        producto.codigo.toLowerCase()
    );

    if (!inicial) return;

    const descripcion = inicial.descripcion;

    const variantesDanadas = [
      descripcion.replace(/[^\x00-\x7F]/g, "?"),
      descripcion.replace(/[^\x00-\x7F]/g, "\uFFFD"),
      new TextDecoder("windows-1252").decode(
        new TextEncoder().encode(descripcion)
      )
    ];

    if (
      producto.descripcion !== descripcion &&
      variantesDanadas.includes(producto.descripcion)
    ) {
      producto.descripcion = descripcion;
      descripcionesCorregidas = true;
    }
  });

  // Si ya se inicializó, no agregar productos eliminados.
  if (localStorage.getItem(INIT_KEY)) {
    if (descripcionesCorregidas) {
      guardarProductos(productosGuardados);
    }

    return productosGuardados;
  }

  const codigosExistentes = new Set(
    productosGuardados.map(
      (producto) => producto.codigo.toLowerCase()
    )
  );

  const productosNuevos = productosIniciales.filter(
    (producto) =>
      !codigosExistentes.has(
        producto.codigo.toLowerCase()
      )
  );

  const productosActualizados = [
    ...productosGuardados,
    ...productosNuevos
  ];

  guardarProductos(productosActualizados);
  localStorage.setItem(INIT_KEY, "true");

  return productosActualizados;
}

export function buscarProductoPorCodigo(codigo) {
  return obtenerProductos().find(
    (producto) => producto.codigo === codigo
  );
}

export function filtrarProductos(productos, busqueda, categoria) {
  const texto = busqueda.trim().toLowerCase();

  return productos.filter((producto) => {
    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(texto) ||
      producto.codigo.toLowerCase().includes(texto);

    const coincideCategoria =
      categoria === "" ||
      producto.categoria === categoria;

    return coincideBusqueda && coincideCategoria;
  });
}
