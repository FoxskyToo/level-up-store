import { Routes, Route } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Inicio from './pages/inicio/Inicio'
import Nosotros from './pages/nosotros/Nosotros'

function App() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="md">
        <Container>
          <Navbar.Brand>Mi App</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Routes>
    </>
  );
}

export default App;
