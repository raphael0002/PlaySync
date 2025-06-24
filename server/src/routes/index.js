import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import venueRoutes from "./venue.routes.js";

const routes = Router();

routes.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        status: "OK",
        endpoints: {
            auth: "/api/v1/auth",
            users: "/api/v1/users",
        }
    });
});

routes.use("/api/v1/auth",authRoutes);
routes.use("/api/v1/users",userRoutes);
routes.use("/api/v1/venues",venueRoutes);

export default routes;