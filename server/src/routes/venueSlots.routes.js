import { Router } from "express";
import isAuthenticated from "../middlewares/authenticate.middleware.js";
import validate from "../validations/validate.js";
import { slotCreateSchema } from "../validations/slot.validation.js";
import { createVenueSlot, deleteVenueSlot, getAllVenueSlots, getVenueSlotById } from "../controllers/venueSlot.controller.js";

const venueSlotsRoutes = Router();

venueSlotsRoutes.post("/", isAuthenticated, validate(slotCreateSchema), createVenueSlot);
venueSlotsRoutes.get("/", getAllVenueSlots);
venueSlotsRoutes.get("/:id", getVenueSlotById);
venueSlotsRoutes.get("/:id", getVenueSlotById);
venueSlotsRoutes.patch("/:id", validate(), updateVenue);
venueSlotsRoutes.delete("/:id", deleteVenueSlot);

export default venueSlotsRoutes;