
import { useMemo, useState } from "react";
import { publicaciones } from "../../data/publicaciones";

function Comunidad() {
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState("");
  const [publicacionSeleccionada, setPublicacionSeleccionada] =
    useState(null);

  const publicacionesFiltradas = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    return publicaciones.filter((publicacion) => {
      const coincideTexto =
        publicacion.titulo.toLowerCase().includes(texto) ||
        publicacion.resumen.toLowerCase().includes(texto);

      const coincideTipo =
        !tipo || publicacion.tipo === tipo;

      return coincideTexto && coincideTipo;
    });
  }, [busqueda, tipo]);

  return (
    <>
      {/* HERO */}
      <section className="page-hero py-5">
        <div className="container py-3">
          <h1 className="display-5 fw-bold page-hero-title">
            Comunidad Level-Up
          </h1>

          <p className="lead text-secondary mb-0">
            Descubre noticias, guías y consejos para mejorar
            tu experiencia gamer.
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <div className="container py-5">
        {/* FILTROS */}
        <section className="levelup-panel p-4 mb-5">
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label
                htmlFor="buscarPublicacion"
                className="form-label"
              >
                Buscar contenido
              </label>

              <input
                type="text"
                id="buscarPublicacion"
                className="form-control"
                placeholder="Ej: mouse, consolas, rendimiento..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label
                htmlFor="tipoPublicacion"
                className="form-label"
              >
                Tipo de contenido
              </label>

              <select
                id="tipoPublicacion"
                className="form-select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Noticia">Noticias</option>
                <option value="Guía">Guías</option>
                <option value="Consejo">Consejos</option>
              </select>
            </div>

            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-levelup-blue w-100"
              >
                Filtrar
              </button>
            </div>
          </div>
        </section>

        {/* PUBLICACIONES */}
        <section>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h2 className="section-title mb-2">
                Últimas publicaciones
              </h2>

              <p className="text-secondary mb-0">
                Mantente al día con nuestra comunidad gamer.
              </p>
            </div>

            <span className="badge bg-primary p-2">
              {publicacionesFiltradas.length}{" "}
              {publicacionesFiltradas.length === 1
                ? "publicación"
                : "publicaciones"}
            </span>
          </div>

          <div className="row g-4">
            {publicacionesFiltradas.length === 0 ? (
              <div className="col-12">
                <div className="levelup-panel p-5 text-center">
                  <h3 className="h5 mb-3">
                    No encontramos publicaciones
                  </h3>

                  <p className="text-secondary mb-0">
                    Prueba cambiando el texto de búsqueda
                    o el tipo de contenido.
                  </p>
                </div>
              </div>
            ) : (
              publicacionesFiltradas.map((publicacion) => (
                <div
                  className="col-md-6 col-lg-4"
                  key={publicacion.id}
                >
                  <article className="community-card h-100 p-4 d-flex flex-column">
                    <span className="badge community-badge mb-3 align-self-start">
                      {publicacion.tipo}
                    </span>

                    <h3 className="h5 mb-3">
                      {publicacion.titulo}
                    </h3>

                    <p className="text-secondary mb-4">
                      {publicacion.resumen}
                    </p>

                    <button
                      type="button"
                      className="btn btn-levelup-blue btn-sm align-self-start mt-auto"
                      onClick={() =>
                        setPublicacionSeleccionada(publicacion)
                      }
                    >
                      Leer más
                    </button>
                  </article>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* DETALLE DE PUBLICACIÓN */}
      {publicacionSeleccionada && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tituloPublicacion"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light border-secondary">
              <div className="modal-header border-secondary">
                <h2
                  id="tituloPublicacion"
                  className="modal-title h5"
                >
                  {publicacionSeleccionada.titulo}
                </h2>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Cerrar"
                  onClick={() =>
                    setPublicacionSeleccionada(null)
                  }
                />
              </div>

              <div className="modal-body">
                <span className="badge community-badge mb-3">
                  {publicacionSeleccionada.tipo}
                </span>

                <p>{publicacionSeleccionada.resumen}</p>
              </div>

              <div className="modal-footer border-secondary">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={() =>
                    setPublicacionSeleccionada(null)
                  }
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Comunidad;
