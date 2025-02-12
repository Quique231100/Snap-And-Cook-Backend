import express from "express";
import morgan from "morgan";
import { PORT } from "./config.js";
import mealsRoutes from "./routes/platillos.routes.js";
import userRoutes from "./routes/users.routes.js";
import favMealsRoutes from "./routes/favoritos.routes.js";

const app = express();

app.listen(PORT);
app.use(morgan("dev"));
app.use(express.json());
app.use(favMealsRoutes);
app.use(mealsRoutes);
app.use(userRoutes);
console.log("Server corriendo en el puerto ", PORT);
