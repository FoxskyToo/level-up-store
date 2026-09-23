import { createBrowserRouter } from "react-router-dom";
import Carrito from "./pages/carrito/carrito";
import Catalogo from "./pages/catalogo/catalogo";

export const routes = createBrowserRouter(
    [
        {
            path:'/',
            element:<Carrito/>
        },
        {
            path:'nosotros/:paraIdAuto',
            element:<Catalogo/>
        }
    ]
);