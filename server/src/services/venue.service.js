import prisma from "../config/db.js";

const createVenue = async (venueData) => {
    try {
        const existingVenue = await prisma.venue.findFirst({
            where: {
                name: venueData.name,
            },
        });

        if (existingVenue) {
            throw new Error('A venue with this name  already exists');
        }

        const venue = await prisma.venue.create({
            data: { ...venueData },
        });
        return venue;
    } catch (error) {
        throw error;
    }
};

const getAllVenues = async () => {
    try {
        const venues = await prisma.venue.findMany();
        return venues;
    } catch (error) {
        throw error;
    }
}

const getVenueById = async (id) => {
    try {
        const venue = await prisma.venue.findUnique({
            where: {
                venue_id: id,
            },
        });
        return venue;
    } catch (error) {
        throw error;
    }
};

const updateVenueById = async (id, venueData) => {
    try {
        const existingVenue = await prisma.venue.findUnique({
            where: {
                venue_id: id,
            },
        });

        if (!existingVenue) {
            throw new Error('Venue not found');
        }

        const updatedVenue = await prisma.venue.update({
            where: {
                venue_id: id,
            },
            data: { ...venueData },
        });
        return updatedVenue;
    } catch (error) {
        throw error;
    }
}

const deleteVenueById = async (id) => {
    try {
        const venue = await prisma.venue.delete({
            where: {
                venue_id: id,
            },
        });
        return venue;
    } catch (error) {
        throw error;
    }
};

export { createVenue, getAllVenues, getVenueById, deleteVenueById, updateVenueById };