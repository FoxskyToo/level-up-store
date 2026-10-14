
import { useMemo, useState } from "react";

import ProductCard from "../../components/ProductCard";

import {
  inicializarProductos,
  filtrarProductos,
} from "../../services/productosService";

function Catalogo() {
  const [productos] = useState(() => inicializarProductos());

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");

  const categorias = useMemo(() => {
    return [...new Set(productos.map((p) => p.categoria))];
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    return filtrarProductos(productos, busqueda, categoria);
  }, [productos, busqueda, categoria]);

  return (
    <section className="container py-5">
      <h1 className="mb-3">Catálogo de productos</h1>

      <p className="text-secondary mb-4">
        Explora nuestros productos gamer.
      </p>

      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o código..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>

            {categorias.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-secondary">
        Productos encontrados: {productosFiltrados.length}
      </p>

      <div className="row g-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div
              className="col-12 col-sm-6 col-lg-4"
              key={producto.codigo}
            >
              <ProductCard producto={producto} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-secondary">
              No se encontraron productos.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Catalogo;
