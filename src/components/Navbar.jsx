
import {
  Container,
  Nav,
  Navbar as BootstrapNavbar,
} from "react-bootstrap";

import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";
import { useCarrito } from "../context/carritoContext";

function Navbar() {
  const { usuario, logout } = useAuth();
  const { cantidadTotal } = useCarrito();

  const navigate = useNavigate();

  function manejarCerrarSesion() {
    logout();
    navigate("/");
  }

  return (
    <BootstrapNavbar
      expand="lg"
      variant="dark"
      bg="black"
      className="border-bottom border-secondary"
    >
      <Container>
        <BootstrapNavbar.Brand
          as={NavLink}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            src="/assets/img/logo/logo-level-up.png"
            alt="Level-Up Gamer"
            className="navbar-logo"
          />

          <span className="fw-bold">
            LEVEL-UP GAMER
          </span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="navbarLevelUp"
        />

        <BootstrapNavbar.Collapse id="navbarLevelUp">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/catalogo">
              Productos
            </Nav.Link>

            <Nav.Link as={NavLink} to="/comunidad">
              Comunidad
            </Nav.Link>

            <Nav.Link as={NavLink} to="/eventos">
              Eventos
            </Nav.Link>

            <Nav.Link as={NavLink} to="/soporte">
              Soporte
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {usuario ? (
              <>
                <NavLink
                  to="/perfil"
                  className="text-levelup-green fw-bold text-decoration-none"
                >
                  {usuario.nombre}
                </NavLink>

                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={manejarCerrarSesion}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="btn btn-outline-light"
              >
                Iniciar sesión
              </NavLink>
            )}

            <NavLink
              to="/carrito"
              className="btn btn-levelup"
            >
              Carrito

              <span className="badge text-bg-dark ms-2">
                {cantidadTotal}
              </span>
            </NavLink>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;

