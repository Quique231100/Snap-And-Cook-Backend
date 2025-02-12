import { Router } from "express";

import { getMeals } from "../controllers/platillos.controllers.js";

const router = Router();

//Obtener todos los platillos
router.get("/platillos", getMeals);

export default router;
//Se harán cambios en la forma de la normalizacion de los datos para que se pueda acceder mejor a los pltilllos favoritos de los usuarios
