
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { obtenerComprasPorUsuario } from "../../services/comprasService";

function Perfil() {
    const { usuario } = useAuth();
    const correoUsuario = usuario?.correo ?? usuario?.email;

    const compras = obtenerComprasPorUsuario(correoUsuario);

    const formatoPrecio = (precio) =>
    `$${Number(precio).toLocaleString("es-CL")}`;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="container py-5">
      <h1 className="mb-4">Mi perfil</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card bg-dark text-light border-secondary">
            <div className="card-body p-4">
              <h2 className="h4 text-levelup-green mb-4">
                Información personal
              </h2>

              <div className="mb-3">
                <label className="text-secondary d-block">
                  Nombre
                </label>

                <strong>{usuario.nombre}</strong>
              </div>

              <div className="mb-3">
                <label className="text-secondary d-block">
                  Correo electrónico
                </label>

                <strong>{usuario.correo}</strong>
              </div>

              <div>
                <label className="text-secondary d-block">
                  Puntos acumulados
                </label>

                <strong className="text-levelup-green">
                  {usuario.puntos ?? 0}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card bg-dark text-light border-secondary">
            <div className="card-body p-4">
              <h2 className="h5 mb-3">
                Mi cuenta
              </h2>

              <p className="text-secondary">
                Consulta tus productos favoritos y
                continúa explorando nuestra tienda.
              </p>

              <Link
                to="/catalogo"
                className="btn btn-levelup w-100"
              >
                Explorar productos
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-dark text-light border-secondary mt-4">
        <div className="card-body p-4">
          <h2 className="h4 mb-3">
            Historial de compras
          </h2>


        {compras.length === 0 ? (
        <p className="text-secondary mb-0">
            Todavía no has realizado compras.
        </p>
        ) : (
        <div className="table-responsive">
            <table className="table align-middle">
            <thead>
                <tr>
                <th>Compra</th>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Descuento</th>
                <th>Total</th>
                </tr>
            </thead>

            <tbody>
                {compras.map((compra) => (
                <tr key={compra.id}>
                    <td>#{compra.id}</td>

                    <td>
                    {new Date(compra.fecha).toLocaleString("es-CL")}
                    </td>

                    <td>
                    {compra.productos.reduce(
                        (cantidad, producto) =>
                        cantidad + producto.cantidad,
                        0
                    )}
                    </td>

                    <td>
                    {formatoPrecio(compra.descuento)}
                    </td>

                    <td className="text-levelup-green fw-bold">
                    {formatoPrecio(compra.total)}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}

        </div>
      </div>
    </section>
  );
}

export default Perfil;
