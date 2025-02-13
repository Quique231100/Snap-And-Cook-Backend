import { pool } from "../db.js";

export const getMealsCard = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM platillos");
  res.json(rows);
};

export const getMealsWindow = async (req, res) => {
  const { rows } = await pool.query(
    "SELECT platillos.nombre AS nombre_platillo, ARRAY_AGG(ingredientes.nombre) AS ingredientes, platillos.instrucciones AS instrucciones_platillo, platillos.imagen AS imagen_platillo FROM platillo_ingredientes JOIN platillos ON platillo_ingredientes.platillo_id = platillos.id JOIN ingredientes ON platillo_ingredientes.ingrediente_id = ingredientes.id GROUP BY platillos.nombre, platillos.imagen, platillos.instrucciones;"
  );

  res.json(rows);
};
