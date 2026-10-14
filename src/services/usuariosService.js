
const USUARIOS_KEY = "usuariosLevelUp";
const SESION_KEY = "usuarioSesionLevelUp";

const PUNTOS_POR_REFERIDO = 500;

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

function normalizarCorreo(correo) {
  return String(correo || "").trim().toLowerCase();
}

function obtenerCorreoUsuario(usuario) {
  return normalizarCorreo(usuario.correo ?? usuario.email);
}

function calcularEdad(fechaNacimiento) {
  const partes = fechaNacimiento.split("-").map(Number);

  if (partes.length !== 3 || partes.some((n) => !Number.isInteger(n))) {
    return -1;
  }

  const [anio, mes, dia] = partes;
  const nacimiento = new Date(anio, mes - 1, dia);
  const hoy = new Date();

  if (
    nacimiento.getFullYear() !== anio ||
    nacimiento.getMonth() !== mes - 1 ||
    nacimiento.getDate() !== dia ||
    nacimiento > hoy
  ) {
    return -1;
  }

  let edad = hoy.getFullYear() - anio;

  if (
    hoy.getMonth() + 1 < mes ||
    (hoy.getMonth() + 1 === mes && hoy.getDate() < dia)
  ) {
    edad--;
  }

  return edad;
}

function esCorreoDuoc(correo) {
  return normalizarCorreo(correo).endsWith("@duocuc.cl");
}

function generarCodigoReferido(gamertag, correo, usuarios) {
  const base = (gamertag || correo.split("@")[0])
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "") || "GAMER";

  let codigo;

  do {
    const numero = Math.floor(1000 + Math.random() * 9000);
    codigo = `${base}${numero}`;
  } while (
    usuarios.some(
      (usuario) =>
        usuario.codigoReferidoPersonal?.toUpperCase() === codigo
    )
  );

  return codigo;
}

export function registrarUsuario(datos) {
  const usuarios = obtenerUsuarios();

  const nombre = String(datos.nombre || "").trim();
  const apellido = String(datos.apellido || "").trim();
  const correo = normalizarCorreo(datos.correo ?? datos.email);
  const gamertag = String(datos.gamertag || "").trim();
  const fechaNacimiento = String(datos.fechaNacimiento || "");
  const password = String(datos.password || "");
  const codigoReferido = String(datos.codigoReferido || "")
    .trim()
    .toUpperCase();

  if (!nombre || !apellido || !correo || !fechaNacimiento || !password) {
    throw new Error("Completa todos los campos obligatorios.");
  }

  if (calcularEdad(fechaNacimiento) < 18) {
    throw new Error("Debes ser mayor de 18 años para registrarte.");
  }

  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  }

  if (
    usuarios.some(
      (usuario) => obtenerCorreoUsuario(usuario) === correo
    )
  ) {
    throw new Error(
      "Ya existe un usuario registrado con ese correo electrónico."
    );
  }

  let usuarioReferente = null;

  if (codigoReferido) {
    usuarioReferente = usuarios.find(
      (usuario) =>
        usuario.codigoReferidoPersonal?.toUpperCase() ===
        codigoReferido
    );

    if (!usuarioReferente) {
      throw new Error(
        "El código de referido ingresado no es válido."
      );
    }
  }

  const nuevoUsuario = {
    id: crypto.randomUUID(),
    nombre,
    apellido,
    correo,
    fechaNacimiento,
    gamertag,
    password,
    codigoReferido,
    codigoReferidoPersonal: generarCodigoReferido(
      gamertag,
      correo,
      usuarios
    ),
    categoriaFavorita: "",
    puntos: 0,
    descuentoDuoc: esCorreoDuoc(correo) ? 20 : 0,
    fechaRegistro: new Date().toISOString(),
  };

  if (usuarioReferente) {
    usuarioReferente.puntos =
      Number(usuarioReferente.puntos || 0) +
      PUNTOS_POR_REFERIDO;
  }

  usuarios.push(nuevoUsuario);

  localStorage.setItem(
    USUARIOS_KEY,
    JSON.stringify(usuarios)
  );

  return nuevoUsuario;
}

export function iniciarSesion(correo, password) {
  const usuarios = obtenerUsuarios();
  const correoNormalizado = normalizarCorreo(correo);

  const usuario = usuarios.find(
    (item) =>
      obtenerCorreoUsuario(item) === correoNormalizado &&
      item.password === password
  );

  if (!usuario) {
    throw new Error("Correo o contraseña incorrectos.");
  }

  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    apellido: usuario.apellido || "",
    correo: obtenerCorreoUsuario(usuario),
    gamertag: usuario.gamertag || "",
    categoriaFavorita: usuario.categoriaFavorita || "",
    codigoReferidoPersonal:
      usuario.codigoReferidoPersonal || "",
    puntos: Number(usuario.puntos || 0),
    descuentoDuoc: Number(usuario.descuentoDuoc || 0),
  };

  localStorage.setItem(
    SESION_KEY,
    JSON.stringify(sesion)
  );

  return sesion;
}

export function cerrarSesion() {
  localStorage.removeItem(SESION_KEY);
}
