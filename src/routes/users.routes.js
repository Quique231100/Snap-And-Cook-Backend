import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.controllers.js";

const router = Router();

//Ruta para obtener todos los usuarios activos
router.get("/users", getUsers);

//Ruta para obtener a un usuario por su id
router.get("/users/:id", getUserById);

//Ruta para agregar a un usuario
router.post("/users", addUser);

//Eliminación completa de datos (de momento se comentó)
// router.delete("/users/:id", async (req, res) => {
//   const { id } = req.params;
//   const { rows } = await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);

//   if (rows.length === 0) {
//     return res.status(404).json({ message: "Usuario no encontrado" });
//   }

//   res.json(rows);
// });

//Eliminicación lógica de datos, cambiando el status del usuario a 0
router.patch("/users/:id/delete", deleteUser);

//Modificación de usuarios
router.put("/users/:id", updateUser);

export default router;
