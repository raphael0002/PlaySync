import ApiResponse from "../utils/api-response.js";
import * as  StatusCodes from '../utils/status-code.js';
import * as venueService from '../services/venue.service.js';

const createVenue = async (req, res, next) => {
  try {

    const venue = await venueService.createVenue(req.body);

    ApiResponse.send(res, {
      code: StatusCodes.OK,
      message: 'Venue created successfully',
      data: { venue },
    })
  } catch (error) {
    next(error);
  }
}

const getAllVenues = async (req, res, next) => {
  try {
    const venues = await venueService.getAllVenues();

    ApiResponse.send(res, {
      code: StatusCodes.OK,
      message: 'Venues retrieved successfully',
      data: { venues },
    });
  } catch (error) {
    next(error);
  }
}

const getVenueById = async (req, res, next) => {
  try {

    const venue = await venueService.getVenueById(req.params.id);

    ApiResponse.send(res, {
      code: StatusCodes.OK,
      message: 'Venue retrieved successfully',
      data: { venue },
    });
  } catch (error) {
    next(error);
  }
}

const updateVenue = async (req, res, next) => {
  try {
    const venue = await venueService.updateVenueById(req.params.id, req.body);

    ApiResponse.send(res, {
      code: StatusCodes.OK,
      message: 'Venue updated successfully',
      data: { venue },
    });
  } catch (error) {
    next(error);
  }
}

const deleteVenue = async (req, res, next) => {
  try {
    const venue = await venueService.deleteVenueById(req.params.id);

    ApiResponse.send(res, {
      code: StatusCodes.OK,
      message: 'Venue deleted successfully',
      data: { venue },
    });
  } catch (error) {
    next(error);
  }
}

export { createVenue, getAllVenues, getVenueById, updateVenue, deleteVenue };
