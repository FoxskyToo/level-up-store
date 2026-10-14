
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../../services/usuariosService";

function Registro() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmarPassword: "",
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function manejarSubmit(evento) {
    evento.preventDefault();

    setError("");
    setExito("");

    const nombre = formulario.nombre.trim();
    const correo = formulario.correo.trim();

    if (!nombre || !correo || !formulario.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (formulario.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (formulario.password !== formulario.confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      registrarUsuario({
        nombre,
        correo,
        password: formulario.password,
      });

      setExito("Cuenta creada correctamente.");

      setFormulario({
        nombre: "",
        correo: "",
        password: "",
        confirmarPassword: "",
      });

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="text-center mb-4">
            Crear cuenta
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

            {exito && (
              <div className="alert alert-success" role="status">
                {exito}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre completo
              </label>

              <input
                id="nombre"
                name="nombre"
                type="text"
                className="form-control"
                value={formulario.nombre}
                onChange={manejarCambio}
                autoComplete="name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="correoRegistro" className="form-label">
                Correo electrónico
              </label>

              <input
                id="correoRegistro"
                name="correo"
                type="email"
                className="form-control"
                value={formulario.correo}
                onChange={manejarCambio}
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="passwordRegistro" className="form-label">
                Contraseña
              </label>

              <input
                id="passwordRegistro"
                name="password"
                type="password"
                className="form-control"
                value={formulario.password}
                onChange={manejarCambio}
                autoComplete="new-password"
                minLength={8}
                required
              />

              <small className="text-secondary">
                Debe contener al menos 8 caracteres.
              </small>
            </div>

            <div className="mb-4">
              <label htmlFor="confirmarPassword" className="form-label">
                Confirmar contraseña
              </label>

              <input
                id="confirmarPassword"
                name="confirmarPassword"
                type="password"
                className="form-control"
                value={formulario.confirmarPassword}
                onChange={manejarCambio}
                autoComplete="new-password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-levelup w-100"
            >
              Crear cuenta
            </button>

            <p className="text-center mt-4 mb-0">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-levelup-green"
              >
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Registro;
