import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Inicio from "./pages/inicio/Inicio";
import Catalogo from "./pages/catalogo/catalogo";

const PaginaTemporal = ({ titulo }) => (
  <section className="py-5 text-center">
    <h1>{titulo}</h1>
    <p>Esta sección se implementará próximamente.</p>
  </section>
);

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      {
        path: "catalogo",
        element: <Catalogo />,
      },
      {
        path: "carrito",
        element: <PaginaTemporal titulo="Carrito" />,
      },
      {
        path: "login",
        element: <PaginaTemporal titulo="Iniciar sesión" />,
      },
      {
        path: "registro",
        element: <PaginaTemporal titulo="Registro" />,
      },
      {
        path: "perfil",
        element: <PaginaTemporal titulo="Mi perfil" />,
      },
      {
        path: "producto/:codigo",
        element: <PaginaTemporal titulo="Detalle del producto" />,
      },
      {
        path: "comunidad",
        element: <PaginaTemporal titulo="Comunidad" />,
      },
      {
        path: "eventos",
        element: <PaginaTemporal titulo="Eventos" />,
      },
      {
        path: "soporte",
        element: <PaginaTemporal titulo="Soporte" />,
      },
      {
        path: "*",
        element: <PaginaTemporal titulo="Página no encontrada" />,
      },
    ],
  },
]);