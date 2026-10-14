
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CarritoContext = createContext(null);

const STORAGE_KEY = "carritoLevelUp";

function leerCarrito() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY);
    const carrito = datos ? JSON.parse(datos) : [];

    return Array.isArray(carrito) ? carrito : [];
  } catch (error) {
    console.error("Error al recuperar el carrito:", error);
    return [];
  }
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarrito);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(carrito)
    );
  }, [carrito]);

  function agregarProducto(producto) {
    setCarrito((anterior) => {
      const existente = anterior.find(
        (item) => item.codigo === producto.codigo
      );

      if (existente) {
        return anterior.map((item) =>
          item.codigo === producto.codigo
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...anterior,
        {
          ...producto,
          cantidad: 1,
        },
      ];
    });
  }

  function eliminarProducto(codigo) {
    setCarrito((anterior) =>
      anterior.filter((item) => item.codigo !== codigo)
    );
  }

  function actualizarCantidad(codigo, cantidad) {
    const nuevaCantidad = Number(cantidad);

    if (!Number.isInteger(nuevaCantidad) || nuevaCantidad < 1) {
      return;
    }

    setCarrito((anterior) =>
      anterior.map((item) =>
        item.codigo === codigo
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const subtotal = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        actualizarCantidad,
        vaciarCarrito,
        cantidadTotal,
        subtotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error(
      "useCarrito debe utilizarse dentro de CarritoProvider"
    );
  }

  return contexto;
}
