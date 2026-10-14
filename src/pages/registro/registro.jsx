
import { useState } from "react";
import { Link } from "react-router-dom";
import { registrarUsuario } from "../../services/usuariosService";

const formularioInicial = {
  nombre: "",
  apellido: "",
  correo: "",
  fechaNacimiento: "",
  gamertag: "",
  password: "",
  confirmarPassword: "",
  codigoReferido: "",
  aceptaTerminos: false,
};

function Registro() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  function manejarCambio(evento) {
    const { name, value, type, checked } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function manejarSubmit(evento) {
    evento.preventDefault();
    setError("");
    setExito("");

    if (formulario.password !== formulario.confirmarPassword) {
      setError("Las contraseñas ingresadas no coinciden.");
      return;
    }

    if (!formulario.aceptaTerminos) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const usuario = registrarUsuario(formulario);

      setExito(
        usuario.descuentoDuoc === 20
          ? "Cuenta creada correctamente. Tu correo Duoc tiene asociado un 20% de descuento."
          : "Cuenta creada correctamente."
      );

      setFormulario(formularioInicial);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <section className="page-hero py-5">
        <div className="container py-3">
          <h1 className="display-5 fw-bold page-hero-title">
            Crear cuenta
          </h1>

          <p className="lead text-secondary mb-0">
            Únete a la comunidad Level-Up Gamer y comienza a
            disfrutar de tus beneficios.
          </p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <section className="levelup-panel p-4 p-md-5">
              <div className="mb-4">
                <h2 className="section-title mb-3">
                  Registro de usuario
                </h2>

                <p className="text-secondary">
                  Debes ser mayor de 18 años para registrarte.
                </p>
              </div>

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

              <form onSubmit={manejarSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>

                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      className="form-control"
                      value={formulario.nombre}
                      onChange={manejarCambio}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="apellido" className="form-label">
                      Apellido
                    </label>

                    <input
                      id="apellido"
                      name="apellido"
                      type="text"
                      className="form-control"
                      value={formulario.apellido}
                      onChange={manejarCambio}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="correoRegistro" className="form-label">
                      Correo electrónico
                    </label>

                    <input
                      id="correoRegistro"
                      name="correo"
                      type="email"
                      className="form-control"
                      placeholder="usuario@correo.cl"
                      value={formulario.correo}
                      onChange={manejarCambio}
                      required
                    />

                    <div className="form-text text-secondary">
                      Si utilizas un correo Duoc podrás acceder al
                      beneficio indicado para usuarios Duoc.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="fechaNacimiento"
                      className="form-label"
                    >
                      Fecha de nacimiento
                    </label>

                    <input
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      type="date"
                      className="form-control"
                      value={formulario.fechaNacimiento}
                      onChange={manejarCambio}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="gamertag" className="form-label">
                      Gamer tag
                    </label>

                    <input
                      id="gamertag"
                      name="gamertag"
                      type="text"
                      className="form-control"
                      placeholder="Ej: PlayerOne"
                      value={formulario.gamertag}
                      onChange={manejarCambio}
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="passwordRegistro"
                      className="form-label"
                    >
                      Contraseña
                    </label>

                    <input
                      id="passwordRegistro"
                      name="password"
                      type="password"
                      className="form-control"
                      value={formulario.password}
                      onChange={manejarCambio}
                      minLength={8}
                      autoComplete="new-password"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="confirmarPassword"
                      className="form-label"
                    >
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

                  <div className="col-12">
                    <label
                      htmlFor="codigoReferido"
                      className="form-label"
                    >
                      Código de referido
                    </label>

                    <input
                      id="codigoReferido"
                      name="codigoReferido"
                      type="text"
                      className="form-control"
                      placeholder="Opcional"
                      value={formulario.codigoReferido}
                      onChange={manejarCambio}
                    />

                    <div className="form-text text-secondary">
                      Ingresa un código de referido si otro usuario
                      te invitó.
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        id="aceptaTerminos"
                        name="aceptaTerminos"
                        type="checkbox"
                        className="form-check-input"
                        checked={formulario.aceptaTerminos}
                        onChange={manejarCambio}
                        required
                      />

                      <label
                        htmlFor="aceptaTerminos"
                        className="form-check-label"
                      >
                        Acepto los términos y condiciones.
                      </label>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-levelup btn-lg"
                      >
                        Crear cuenta
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <hr className="border-secondary my-4" />

              <p className="text-center text-secondary mb-0">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="text-levelup-blue text-decoration-none"
                >
                  Inicia sesión
                </Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registro;
