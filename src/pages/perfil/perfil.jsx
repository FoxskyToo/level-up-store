
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Perfil() {
  const { usuario } = useAuth();

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

          <p className="text-secondary mb-0">
            Aquí aparecerán tus compras cuando
            implementemos el proceso de pago.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Perfil;
