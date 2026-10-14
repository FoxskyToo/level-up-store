
import { Link } from "react-router-dom";
import { useCarrito } from "../context/carritoContext";

function ProductCard({ producto }) {
  const { agregarProducto } = useCarrito();

  const precioFormateado = Number(
    producto.precio
  ).toLocaleString("es-CL");

  return (
    <article className="product-card h-100 overflow-hidden d-flex flex-column">
      {/* IMAGEN */}
      <div className="product-image">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
          />
        ) : (
          <span className="text-secondary">
            Sin imagen
          </span>
        )}
      </div>

      {/* INFORMACIÓN */}
      <div className="p-3 d-flex flex-column flex-grow-1">
        <span className="badge product-category mb-2 align-self-start">
          {producto.categoria}
        </span>

        <h3 className="h5 mt-2">
          {producto.nombre}
        </h3>

        <p className="small text-secondary">
          Código: {producto.codigo}
        </p>

        <p className="small text-secondary">
          {producto.descripcion || "Sin descripción."}
        </p>

        {/* PRECIO Y ACCIONES */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-auto pt-3">
          <span className="product-price">
            ${precioFormateado}
          </span>

          <div className="d-flex flex-wrap gap-2">
            <Link
              to={`/producto/${encodeURIComponent(producto.codigo)}`}
              className="btn btn-sm btn-outline-light"
            >
              Ver detalle
            </Link>

            <button
              type="button"
              className="btn btn-sm btn-levelup-blue"
              onClick={() => agregarProducto(producto)}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
