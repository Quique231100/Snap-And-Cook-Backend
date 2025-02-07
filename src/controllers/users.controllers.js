import { pool } from "../db.js";

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

export const addUser = async (req, res) => {
  try {
    //Esta primera parte se comentó momentaneamente para que se usase como objeto en un futuro
    // const {
    //   nombre,
    //   apellidos,
    //   correo,
    //   contrasena,
    //   sexo,
    //   edad,
    //   estatura,
    //   peso,
    //   enfermedades,
    //   alergias,
    // } = req.body;

    // if (
    //   !nombre ||
    //   !apellidos ||
    //   !correo ||
    //   !contrasena ||
    //   !sexo ||
    //   !edad ||
    //   !estatura ||
    //   !peso ||
    //   !enfermedades ||
    //   !alergias
    // ) {
    //   return res.status(400).json({ error: "Faltan campos obligatorios" });
    // }

    const data = req.body; //Inserción de los datos
    const { rows } = await pool.query(
      "INSERT INTO usuarios (status, nombre, apellidos, correo, contrasena, sexo, edad, estatura, peso, enfermedades, alergias) VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
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
      ]
    );
    console.log(rows);
    res.status(201).json({ message: "Usuarios agregado correctamente" });
  } catch (e) {
    console.log(e);
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email ya está en uso" });
    }
    return res.status(500).json({ message: "Error en el servidor" });
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
