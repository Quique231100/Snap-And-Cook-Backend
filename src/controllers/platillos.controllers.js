import { pool } from "../db.js";

export const getMeals = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM platillos");
  res.json(rows);
};
