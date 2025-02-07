import express from "express";
import morgan from "morgan";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.listen(PORT);
app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);
console.log("Server corriendo en el puerto", PORT);
