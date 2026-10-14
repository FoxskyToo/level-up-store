

import { Link } from "react-router-dom";
import { useCarrito } from "../../context/carritoContext";

function Carrito() {
  const {
    carrito,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito,
    subtotal,
  } = useCarrito();

  const formatearPrecio = (precio) =>
    `$${Number(precio).toLocaleString("es-CL")}`;

  return (
    <section className="container py-5">
      <h1 className="mb-4">Carrito de compras</h1>

      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <h2 className="h4">Tu carrito está vacío</h2>

          <p className="text-secondary">
            Explora nuestros productos y encuentra algo que te guste.
          </p>

          <Link to="/catalogo" className="btn btn-levelup mt-3">
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            {carrito.map((producto) => (
              <div
                key={producto.codigo}
                className="card bg-dark text-light border-secondary mb-3"
              >
                <div className="card-body">
                  <div className="row align-items-center g-3">
                    <div className="col-4 col-md-2 text-center">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid"
                        style={{
                          maxHeight: "100px",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div className="col-8 col-md-4">
                      <Link
                        to={`/producto/${encodeURIComponent(producto.codigo)}`}
                        className="text-light text-decoration-none"
                      >
                        <h2 className="h6 mb-2">
                          {producto.nombre}
                        </h2>
                      </Link>

                      <p className="text-secondary small mb-0">
                        {producto.codigo}
                      </p>

                      <p className="text-levelup-green mb-0">
                        {formatearPrecio(producto.precio)}
                      </p>
                    </div>

                    <div className="col-6 col-md-3">
                      <label
                        htmlFor={`cantidad-${producto.codigo}`}
                        className="form-label"
                      >
                        Cantidad
                      </label>

                      <input
                        id={`cantidad-${producto.codigo}`}
                        type="number"
                        min="1"
                        step="1"
                        className="form-control"
                        value={producto.cantidad}
                        onChange={(e) =>
                          actualizarCantidad(
                            producto.codigo,
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="col-6 col-md-3 text-end">
                      <p className="fw-bold mb-2">
                        {formatearPrecio(
                          producto.precio * producto.cantidad
                        )}
                      </p>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          eliminarProducto(producto.codigo)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-outline-danger mt-2"
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card bg-dark text-light border-secondary">
              <div className="card-body">
                <h2 className="h4 mb-4">
                  Resumen de compra
                </h2>

                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <strong>{formatearPrecio(subtotal)}</strong>
                </div>

                <hr className="border-secondary" />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total</span>
                  <strong className="text-levelup-green">
                    {formatearPrecio(subtotal)}
                  </strong>
                </div>

                <button
                  type="button"
                  className="btn btn-levelup w-100"
                  disabled
                  title="Implementaremos el proceso de compra próximamente"
                >
                  Finalizar compra
                </button>

                <Link
                  to="/catalogo"
                  className="btn btn-outline-light w-100 mt-3"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Carrito;
