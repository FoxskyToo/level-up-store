
import { useMemo, useState } from "react";

import ProductCard from "../../components/ProductCard";

import {
  inicializarProductos,
  filtrarProductos,
} from "../../services/productosService";

const categoriasOriginales = [
  "Juegos de Mesa",
  "Accesorios",
  "Consolas",
  "Computadores Gamers",
  "Sillas Gamers",
  "Mouse",
  "Mousepad",
  "Poleras Personalizadas",
  "Polerones Gamers Personalizados",
  "Servicio Técnico",
];

function Catalogo() {
  const [productos] = useState(() => inicializarProductos());

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");

  const categorias = useMemo(() => {
    const categoriasDisponibles = productos.map(
      (producto) => producto.categoria
    );

    return [
      ...new Set([
        ...categoriasOriginales,
        ...categoriasDisponibles,
      ]),
    ];
  }, [productos]);

const productosFiltrados = useMemo(() => {
  return filtrarProductos(
    productos,
    busqueda,
    categoria
  );
}, [productos, busqueda, categoria]);


  return (
    <>
      {/* HERO */}
      <section className="page-hero py-5">
        <div className="container py-3">
          <h1 className="display-5 fw-bold page-hero-title">
            Catálogo Gamer
          </h1>

          <p className="lead text-secondary mb-0">
            Explora nuestros productos y encuentra todo
            lo que necesitas para llevar tu experiencia
            gamer al siguiente nivel.
          </p>
        </div>
      </section>

      {/* CATÁLOGO */}
      <div className="container py-5">
        {/* FILTROS */}
        <section className="levelup-panel p-4 mb-5">
            <form
                onSubmit={(evento) => evento.preventDefault()}
                className="row g-3 align-items-end"
            >
            <div className="col-md-5">
              <label
                htmlFor="buscar"
                className="form-label"
              >
                Buscar producto
              </label>

              <input
                type="text"
                id="buscar"
                className="form-control"
                placeholder="Ej: mouse gamer, consola..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label
                htmlFor="categoria"
                className="form-label"
              >
                Categoría
              </label>

              <select
                id="categoria"
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">
                  Todas las categorías
                </option>

                {categorias.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <button
                type="submit"
                className="btn btn-levelup-blue w-100"
              >
                Aplicar filtros
              </button>
            </div>
          </form>
        </section>

        {/* PRODUCTOS */}
        <section>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h2 className="mb-1">
                Productos
              </h2>

              <p className="text-secondary mb-0">
                Productos disponibles en Level-Up Gamer.
              </p>
            </div>

            <span className="badge bg-primary p-2">
              {productosFiltrados.length}{" "}
              {productosFiltrados.length === 1
                ? "producto"
                : "productos"}
            </span>
          </div>

          <div className="row g-4">
            {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                <div
                    className="col-sm-6 col-lg-4 col-xl-3"
                    key={producto.codigo}
                >
                    <ProductCard producto={producto} />
                </div>
                ))
            ) : (
              <div className="col-12">
                <div className="levelup-panel p-5 text-center">
                  <h3 className="h5 mb-3">
                    No encontramos productos
                  </h3>

                  <p className="text-secondary mb-0">
                    Prueba cambiando el texto de búsqueda
                    o seleccionando otra categoría.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Catalogo;
