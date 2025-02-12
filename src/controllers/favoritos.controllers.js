import { pool } from "../db.js";

export const getFavMeals = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT nombre, instrucciones, imagen 
       FROM favoritos 
       JOIN platillos ON platillo_id = id 
       WHERE usuario_id = $1`,
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Platillo no encontrado" });
  }

  res.json(rows[0]);
};
