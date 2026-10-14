import { Container, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <BootstrapNavbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/">
          LEVEL-UP GAMER
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="navbar-levelup" />

        <BootstrapNavbar.Collapse id="navbar-levelup">
          <Nav className="ms-auto">
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

            <Nav.Link as={NavLink} to="/login">
              Iniciar sesión
            </Nav.Link>

            <Nav.Link as={NavLink} to="/carrito">
              Carrito
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;