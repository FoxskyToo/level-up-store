
const USUARIOS_KEY = "usuariosLevelUp";
const SESION_KEY = "usuarioSesionLevelUp";

export function obtenerUsuarios() {
  try {
    const datos = localStorage.getItem(USUARIOS_KEY);
    const usuarios = datos ? JSON.parse(datos) : [];

    return Array.isArray(usuarios) ? usuarios : [];
  } catch (error) {
    console.error("Error al recuperar usuarios:", error);
    return [];
  }
}

export function obtenerSesion() {
  try {
    const datos = localStorage.getItem(SESION_KEY);
    return datos ? JSON.parse(datos) : null;
  } catch (error) {
    console.error("Error al recuperar la sesión:", error);
    return null;
  }
}

export function registrarUsuario(datos) {
  const usuarios = obtenerUsuarios();

  const correo = datos.correo.trim().toLowerCase();

  if (usuarios.some((usuario) => usuario.correo === correo)) {
    throw new Error("El correo electrónico ya está registrado.");
  }

  const nuevoUsuario = {
    id: crypto.randomUUID(),
    nombre: datos.nombre.trim(),
    correo,
    password: datos.password,
    puntos: 0,
    fechaRegistro: new Date().toISOString(),
  };

  localStorage.setItem(
    USUARIOS_KEY,
    JSON.stringify([...usuarios, nuevoUsuario])
  );

  return {
    id: nuevoUsuario.id,
    nombre: nuevoUsuario.nombre,
    correo: nuevoUsuario.correo,
    puntos: nuevoUsuario.puntos,
  };
}

export function iniciarSesion(correo, password) {
  const usuarios = obtenerUsuarios();

  const usuario = usuarios.find(
    (item) =>
      item.correo === correo.trim().toLowerCase() &&
      item.password === password
  );

  if (!usuario) {
    throw new Error("Correo o contraseña incorrectos.");
  }

  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    puntos: usuario.puntos ?? 0,
  };

  localStorage.setItem(SESION_KEY, JSON.stringify(sesion));

  return sesion;
}

export function cerrarSesion() {
  localStorage.removeItem(SESION_KEY);
}
