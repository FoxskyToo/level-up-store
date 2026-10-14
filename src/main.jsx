
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import "./assets/css/variable.css";
import "./assets/css/main.css";
import { AuthProvider } from "./context/authContext";

import { routes } from "./routes.jsx";
import { CarritoProvider } from "./context/carritoContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <RouterProvider router={routes} />
      </CarritoProvider>
    </AuthProvider>
  </StrictMode>
);
