
import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  obtenerSesion,
  iniciarSesion,
  cerrarSesion,
} from "../services/usuariosService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(obtenerSesion);

  function login(correo, password) {
    const sesion = iniciarSesion(correo, password);
    setUsuario(sesion);
    return sesion;
  }

  function logout() {
    cerrarSesion();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider"
    );
  }

  return contexto;
}
