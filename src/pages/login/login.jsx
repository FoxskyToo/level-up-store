
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function manejarSubmit(evento) {
    evento.preventDefault();
    setError("");

    try {
      login(correo, password);
      navigate("/perfil");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-5">
          <h1 className="text-center mb-4">
            Iniciar sesión
          </h1>

          <form
            onSubmit={manejarSubmit}
            className="card bg-dark text-light border-secondary p-4"
          >
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo electrónico
              </label>

              <input
                id="correo"
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-levelup w-100"
            >
              Iniciar sesión
            </button>

            <p className="text-center mt-4 mb-0">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="text-levelup-green">
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
