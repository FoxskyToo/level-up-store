import { Link } from "react-router-dom";
import { useCarrito } from "../context/carritoContext";

function ProductCard({ producto }) {
  const { agregarProducto } = useCarrito();
  return (
    <div className="card product-card h-100">
      <div className="product-image">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid"
          />
        ) : (
          <span className="text-secondary">
            Sin imagen
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <span className="product-category mb-2">
          {producto.categoria}
        </span>

        <h3 className="h6">
          {producto.nombre}
        </h3>

        <p className="product-price mt-auto">
          ${Number(producto.precio).toLocaleString("es-CL")}
        </p>

        <Link
          to={`/producto/${encodeURIComponent(producto.codigo)}`}
          className="btn btn-outline-light"
        >
          Ver detalle
        </Link>

        <button
          type="button"
          className="btn btn-levelup mt-2"
          onClick={() => agregarProducto(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;