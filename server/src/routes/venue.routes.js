import { Router } from "express";
import { createVenue, deleteVenue, getAllVenues, getVenueById, updateVenue } from "../controllers/venue.controller.js";
import { venueSchema, venueUpdateSchema } from "../validations/venue.validation.js";
import isAuthenticated from "../middlewares/authenticate.middleware.js";
import validate from "../validations/validate.js";

const venueRoutes = Router();

venueRoutes.post("/", isAuthenticated, validate(venueSchema), createVenue);
venueRoutes.get("/", getAllVenues);
venueRoutes.get("/:id", getVenueById);
venueRoutes.patch("/:id", validate(venueUpdateSchema), updateVenue);
venueRoutes.delete("/:id", deleteVenue);

export default venueRoutes;