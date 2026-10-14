import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Inicio from "./pages/inicio/Inicio";
import Catalogo from "./pages/catalogo/catalogo";
import ProductoDetalle from "./pages/producto-detalle/productoDetalle";
import Carrito from "./pages/carrito/carrito";
import Login from "./pages/login/login";
import Registro from "./pages/registro/registro";
import Perfil from "./pages/perfil/perfil";

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
        element: <Carrito />,
        },
        {
        path: "login",
        element: <Login />,
        },
        {
        path: "registro",
        element: <Registro />,
        },
        {
        path: "perfil",
        element: <Perfil />,
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
        path: "producto/:codigo",
        element: <ProductoDetalle />,
        },
        {
        path: "*",
        element: <PaginaTemporal titulo="Página no encontrada" />,
        },
    ],
  },
]);