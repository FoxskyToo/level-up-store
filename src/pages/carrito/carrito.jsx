
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/carritoContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { guardarCompra } from "../../services/comprasService";

function Carrito() {
  const {
    carrito,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito,
    cantidadTotal,
    subtotal,
  } = useCarrito();

    const { usuario } = useAuth();
    const navigate = useNavigate();

    const correoUsuario = usuario?.correo ?? usuario?.email;

    const tieneDescuentoDuoc =
    Number(usuario?.descuentoDuoc) === 20;

    const descuento = tieneDescuentoDuoc
    ? Math.round(subtotal * 0.2)
    : 0;

    const total = subtotal - descuento;

  const formatoPrecio = (precio) =>
    Number(precio).toLocaleString("es-CL");

  function aumentarCantidad(producto) {
    actualizarCantidad(
      producto.codigo,
      producto.cantidad + 1
    );
  }

  function disminuirCantidad(producto) {
    if (producto.cantidad > 1) {
      actualizarCantidad(
        producto.codigo,
        producto.cantidad - 1
      );
    } else {
      confirmarEliminar(producto);
    }
  }

  function confirmarEliminar(producto) {
    const confirmar = window.confirm(
      "¿Deseas eliminar este producto del carrito?"
    );

    if (confirmar) {
      eliminarProducto(producto.codigo);
    }
  }

  function confirmarVaciar() {
    if (carrito.length === 0) return;

    const confirmar = window.confirm(
      "¿Deseas vaciar completamente el carrito?"
    );

    if (confirmar) {
      vaciarCarrito();
    }
  }

function finalizarCompra() {
  if (carrito.length === 0) {
    window.alert("Tu carrito está vacío.");
    return;
  }

  if (!usuario) {
    const irLogin = window.confirm(
      "Debes iniciar sesión para finalizar la compra. ¿Deseas ir al inicio de sesión?"
    );

    if (irLogin) {
      navigate("/login");
    }

    return;
  }

  if (!correoUsuario) {
    window.alert(
      "No fue posible identificar el correo del usuario."
    );
    return;
  }

  const compra = {
    id: Date.now(),
    usuarioEmail: correoUsuario,
    fecha: new Date().toISOString(),
    productos: carrito.map((producto) => ({
      codigo: producto.codigo,
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: Number(producto.precio),
      cantidad: producto.cantidad,
    })),
    subtotal,
    descuento,
    total,
  };

  try {
    guardarCompra(compra);
    vaciarCarrito();

    window.alert("Compra realizada correctamente.");
    navigate("/perfil");
  } catch (error) {
    console.error("Error al registrar la compra:", error);
    window.alert(
      "No fue posible registrar la compra. Inténtalo nuevamente."
    );
  }
}

  return (
    <>
      {/* HERO */}
      <section className="page-hero py-5">
        <div className="container py-3">
          <h1 className="display-5 fw-bold page-hero-title">
            Carrito de Compras
          </h1>

          <p className="lead text-secondary mb-0">
            Revisa tus productos, modifica cantidades
            y confirma el total de tu compra.
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <div className="container py-5">
        <div className="row g-4">
          {/* PRODUCTOS */}
          <div className="col-lg-8">
            <section className="levelup-panel p-4">
              <div className="mb-4">
                <h2 className="h4 mb-1">
                  Productos seleccionados
                </h2>

                <p className="text-secondary mb-0">
                  Puedes modificar la cantidad o
                  eliminar productos.
                </p>
              </div>

              {carrito.length === 0 ? (
                <div className="text-center py-5">
                  <h3 className="h5 mb-3">
                    Tu carrito está vacío
                  </h3>

                  <p className="text-secondary mb-4">
                    Agrega productos desde nuestro
                    catálogo para comenzar tu compra.
                  </p>

                  <Link
                    to="/catalogo"
                    className="btn btn-levelup"
                  >
                    Ir al catálogo
                  </Link>
                </div>
              ) : (
                carrito.map((producto) => (
                  <div
                    key={producto.codigo}
                    className="row align-items-center py-4 border-bottom border-secondary"
                  >
                    {/* IMAGEN */}
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div className="product-image carrito-product-image">
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
                    </div>

                    {/* INFORMACIÓN */}
                    <div className="col-md-4">
                      <span className="badge product-category mb-2">
                        {producto.categoria}
                      </span>

                      <h3 className="h6 mb-2">
                        {producto.nombre}
                      </h3>

                      <p className="text-secondary small mb-0">
                        Código: {producto.codigo}
                      </p>
                    </div>

                    {/* CANTIDAD */}
                    <div className="col-md-3 mt-3 mt-md-0">
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-light btn-sm"
                          onClick={() =>
                            disminuirCantidad(producto)
                          }
                        >
                          −
                        </button>

                        <span className="px-2 fw-bold">
                          {producto.cantidad}
                        </span>

                        <button
                          type="button"
                          className="btn btn-levelup-blue btn-sm"
                          onClick={() =>
                            aumentarCantidad(producto)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* SUBTOTAL Y ELIMINAR */}
                    <div className="col-md-2 text-md-end mt-3 mt-md-0">
                      <p className="product-price mb-2">
                        ${formatoPrecio(
                          producto.precio * producto.cantidad
                        )}
                      </p>

                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          confirmarEliminar(producto)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>

          {/* RESUMEN */}
          <div className="col-lg-4">
            <section className="levelup-panel p-4">
              <h2 className="h4 mb-4">
                Resumen de compra
              </h2>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">
                  Productos
                </span>

                <span>{cantidadTotal}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">
                  Subtotal
                </span>

                <span>${formatoPrecio(subtotal)}</span>
              </div>

                {descuento > 0 && (
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-secondary">
                    Descuento Duoc
                    </span>

                    <span className="text-levelup-green">
                    -${formatoPrecio(descuento)}
                    </span>
                </div>
                )}

              <hr className="border-secondary" />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <strong>Total</strong>

                <strong className="product-price fs-4">
                  ${formatoPrecio(total)}
                </strong>
              </div>

              <div className="d-grid gap-2">
                <button
                type="button"
                className="btn btn-levelup"
                onClick={finalizarCompra}
                >
                Finalizar compra
                </button>

                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={confirmarVaciar}
                  disabled={carrito.length === 0}
                >
                  Vaciar carrito
                </button>

                <Link
                  to="/catalogo"
                  className="btn btn-levelup-blue"
                >
                  Seguir comprando
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carrito;
