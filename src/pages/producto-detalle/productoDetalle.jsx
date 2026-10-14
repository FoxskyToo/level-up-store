
import { Link, useParams } from "react-router-dom";
import { buscarProductoPorCodigo } from "../../services/productosService";
import { useCarrito } from "../../context/carritoContext";

function ProductoDetalle() {
    const { agregarProducto } = useCarrito();
  const { codigo } = useParams();

  const producto = buscarProductoPorCodigo(codigo);

  if (!producto) {
    return (
      <section className="container py-5 text-center">
        <h1>Producto no encontrado</h1>

        <p className="text-secondary">
          El producto solicitado no existe o no está disponible.
        </p>

        <Link to="/catalogo" className="btn btn-levelup">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <Link
        to="/catalogo"
        className="btn btn-outline-light mb-4"
      >
        ← Volver al catálogo
      </Link>

      <div className="row align-items-center g-5">
        <div className="col-12 col-md-6 text-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid"
            style={{
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <p className="text-levelup-blue mb-2">
            {producto.categoria}
          </p>

          <h1 className="mb-3">{producto.nombre}</h1>

          <p className="text-secondary">
            Código: {producto.codigo}
          </p>

          <p className="lead">{producto.descripcion}</p>

          <h2 className="text-levelup-green my-4">
            ${Number(producto.precio).toLocaleString("es-CL")}
          </h2>

            <button
            type="button"
            className="btn btn-levelup btn-lg"
            onClick={() => agregarProducto(producto)}
            >
            Agregar al carrito
            </button>
        </div>
      </div>
    </section>
  );
}

export default ProductoDetalle;
