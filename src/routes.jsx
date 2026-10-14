import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Inicio from "./pages/inicio/Inicio";
import Catalogo from "./pages/catalogo/catalogo";
import ProductoDetalle from "./pages/producto-detalle/productoDetalle";
import Carrito from "./pages/carrito/carrito";
import Login from "./pages/login/login";
import Registro from "./pages/registro/registro";
import Perfil from "./pages/perfil/perfil";
import Comunidad from "./pages/comunidad/comunidad";

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
        element: <Comunidad />,
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

/*Inicio: http://localhost:5173/



Catálogo: http://localhost:5173/catalogo



Carrito: http://localhost:5173/carrito



Login: http://localhost:5173/login



Registro: http://localhost:5173/registro



Perfil: http://localhost:5173/perfil



Comunidad: http://localhost:5173/comunidad*/