import { pool } from "../db.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM usuarios WHERE status = 1");
  res.json(rows);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM usuarios WHERE id = $1 AND status = 1",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(rows[0]);
};

//Función para iniciar sesión
export const signIn = async (req, res) => {
  const data = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1 AND contrasena = $2 AND status = 1", //Sentencia SQL
      [data.correo, data.contrasena]
    );

    if (rows.length === 0) {
      //Compara si lo que mandó el usuario es igual a lo que regresa la base de datos
      return res
        .status(401)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    return res.json(rows[0]); // Si encuentra usuario, lo devuelve
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//Cambiar nombre de función a signUp
export const signUp = async (req, res) => {
  try {
    const data = req.body;

    // Validación básica (puedes usar una librería como Joi para hacerlo más robusto)
    if (!data.nombre || !data.apellidos || !data.correo || !data.contrasena) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.contrasena, 10);

    // Inserción de los datos en la base de datos
    const { rows } = await pool.query(
      "INSERT INTO usuarios (status, nombre, apellidos, correo, contrasena, sexo, edad, estatura, peso, enfermedades, alergias) VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        data.nombre,
        data.apellidos,
        data.correo,
        hashedPassword, // Guarda la contraseña hasheada
        data.sexo,
        data.edad,
        data.estatura,
        data.peso,
        data.enfermedades,
        data.alergias,
      ]
    );

    console.log(rows);
    res
      .status(201)
      .json({ message: "Usuario registrado correctamente", user: rows[0] });
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está en uso" });
    }

    res.status(500).json({
      message: "Error en el servidor",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
      "UPDATE usuarios SET status = 0 WHERE id = $1",
      [id]
    );
    res.json(rows[0]);
    res.send("actualizando usuario " + id);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
      "UPDATE usuarios SET nombre = $1, apellidos = $2, correo = $3, contrasena = $4, sexo = $5, edad = $6, estatura = $7, peso = $8, enfermedades = $9, alergias = $10 WHERE id = $11 RETURNING *",
      [
        data.nombre,
        data.apellidos,
        data.correo,
        data.contrasena,
        data.sexo,
        data.edad,
        data.estatura,
        data.peso,
        data.enfermedades,
        data.alergias,
        id,
      ]
    );
    return res.json(rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
