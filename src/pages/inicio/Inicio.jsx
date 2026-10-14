
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Inicio() {
  const { usuario } = useAuth();

  return (
    <section className="container py-5">
      <div className="row align-items-center min-vh-75">
        <div className="col-12 col-lg-7">
          <h1 className="display-3 fw-bold mb-4">
            Level-Up{" "}
            <span className="text-levelup-green">
              Gamer
            </span>
          </h1>

          <h2 className="h4 text-levelup-blue mb-4">
            ¡Desafía tus límites!
          </h2>

          <p className="lead text-secondary">
            Explora productos para gamers, mejora tu experiencia
            de juego y forma parte de nuestra comunidad.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link
              to="/catalogo"
              className="btn btn-levelup btn-lg"
            >
              Ver productos
            </Link>

            {!usuario && (
              <Link
                to="/registro"
                className="btn btn-outline-light btn-lg"
              >
                Crear cuenta
              </Link>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-5 text-center mt-5 mt-lg-0">
          <div className="hero-image-container">
            <img
              src="/assets/img/logo/logo-level-up.png"
              className="img-fluid hero-logo"
              alt="Logo Level-Up Gamer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Inicio;
