import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  signIn,
  updateUser,
} from "../controllers/users.controllers.js";

const router = Router();

//Ruta para obtener todos los usuarios activos
router.get("/users", getUsers);

//Ruta para obtener a un usuario por su id
router.get("/users/:id", getUserById);

//Ruta para iniciar sesion
router.post("/users/sign-in", signIn);

//Ruta para agregar a un usuario
router.post("/users", addUser);

//Eliminicación lógica de datos, cambiando el status del usuario a 0
router.patch("/users/:id/delete", deleteUser);

//Modificación de usuarios
router.put("/users/:id", updateUser);

export default router;
