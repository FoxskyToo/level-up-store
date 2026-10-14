import { Link } from "react-router-dom";

function Inicio() {
  return (
    <section className="text-center py-5">
      <h1 className="fw-bold">
        Bienvenido a Level-Up Gamer
      </h1>

      <p className="lead mt-3">
        Tu tienda de productos gamer, tecnología y accesorios.
      </p>

      <Link to="/catalogo" className="btn btn-primary mt-3">
        Ver productos
      </Link>
    </section>
  );
}

export default Inicio;