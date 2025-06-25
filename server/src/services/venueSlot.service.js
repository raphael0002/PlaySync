import prisma from "../config/db.js";

const createVenueSlot = async (slotData) => {
    try {

        const existingSlot = await prisma.slot.findFirst({
            where: {
                venue_id: slotData.venue_id,
                start_time: slotData.start_time,
                end_time: slotData.end_time,
                date: slotData.date,
            },
        });

        if (existingSlot) {
            throw new Error("A slot already exists with this time range for this venue and date.");
        }

        const slot = await prisma.slot.create({
            data: { ...slotData },
        });
        return slot;
    } catch (error) {
        throw error;
    }
};

const getAllVenueSlots = async () => {
    try {
        const slots = await prisma.slot.findMany();
        return slots;
    } catch (error) {
        throw error;
    }
};

const getVenueSlotById = async (id) => {
    try {

        if (!id) {
            throw new Error('Slot ID is required');
        }

        const slot = await prisma.slot.findUnique({
            where: { slot_id: id },
        });

        if (!slot) {
            throw new Error('Slot not found');
        }
        return slot;
    }
    catch (error) {
        throw error;
    }
}

const deleteVenueSlotById = async (id) => {
    try {
        if (!id) {
            throw new Error('Slot ID is required');
        }

        const deletedSlot = await prisma.slot.delete({
            where: { slot_id: id },
        });

        return deletedSlot;
    } catch (error) {
        throw error;
    }
}

export { createVenueSlot, getAllVenueSlots, getVenueSlotById, deleteVenueSlotById };