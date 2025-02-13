import { Router } from "express";

import {
  getMealsCard,
  getMealsWindow,
} from "../controllers/platillos.controllers.js";

const router = Router();

//Obtener todos los platillos
router.get("/platillos/card", getMealsCard);
router.get("/platillos/window", getMealsWindow);

export default router;
//Se harán cambios en la forma de la normalizacion de los datos para que se pueda acceder mejor a los pltilllos favoritos de los usuarios
