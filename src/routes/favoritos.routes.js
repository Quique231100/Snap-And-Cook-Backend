import { Router } from "express";
import { getFavMeals } from "../controllers/favoritos.controllers.js";

const router = Router();

router.get("/favoritos/:id", getFavMeals);

export default router;
