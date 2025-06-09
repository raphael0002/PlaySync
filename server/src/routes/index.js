import { Router } from "express";
import authRoutes from "./auth.routes.js";

const routes = Router();

routes.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        status: "OK"
    });
});

routes.use("/api/v1/auth",authRoutes);

export default routes;