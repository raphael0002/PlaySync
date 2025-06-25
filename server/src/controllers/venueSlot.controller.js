import ApiResponse from "../utils/api-response.js";
import * as  StatusCodes from '../utils/status-code.js';
import * as venueSlotService from '../services/venueSlot.service.js';

const createVenueSlot = async (req, res, next) => {
    try {
        const slot = await venueSlotService.createVenueSlot(req.body);

        ApiResponse.send(res, {
            code: StatusCodes.OK,
            message: 'Venue slot created successfully',
            data: { slot },
        });
    } catch (error) {
        next(error);
    }
}

const getAllVenueSlots = async (req, res, next) => {
    try {
        const slots = await venueSlotService.getAllVenueSlots();

        ApiResponse.send(res, {
            code: StatusCodes.OK,
            message: 'Venue slots retrieved successfully',
            data: { slots },
        });
    } catch (error) {
        next(error);
    }
}

const getVenueSlotById = async (req, res, next) => {
    try {

        if (!req.params.id) {
            throw new Error('Slot ID is required');
        }

        const slot = await venueSlotService.getVenueSlotById(req.params.id);

        ApiResponse.send(res, {
            code: StatusCodes.OK,
            message: 'Venue slot retrieved successfully',
            data: { slot },
        });
    } catch (error) {
        next(error);
    }
}

const deleteVenueSlot = async (req, res, next) => {
    try {

        if (!req.params.id) {
            throw new Error('Venue ID is required');
        }

        const deletedVenue = await venueSlotService.deleteVenueSlotById(req.params.id);

        ApiResponse.send(res, {
            code: StatusCodes.OK,
            message: 'Venue deleted successfully',
            data: { deletedVenue },
        });
    } catch (error) {
        next(error);
    }
}

export { createVenueSlot, getAllVenueSlots, getVenueSlotById, deleteVenueSlot }