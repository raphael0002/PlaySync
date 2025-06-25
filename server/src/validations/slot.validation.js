import { z } from 'zod';

export const slotCreateSchema = z.object({
    venue_id: z.string().uuid("Invalid venue ID"),
    start_time: z.string().datetime("Invalid start time"),
    end_time: z.string().datetime("Invalid end time"),
    date: z.string().datetime("Invalid date"),
    status: z.enum(["AVAILABLE", "BOOKED", "CANCELLED"]),
    price: z.number().positive("Price must be positive"),
})
    .refine(
        (data) => {
            const start = new Date(data.start_time);
            const end = new Date(data.end_time);
            return start < end;
        },
        {
            message: "Start time must be before end time",
            path: ["start_time"],
        }
    )
    .refine(
        (data) => {
            const date = new Date(data.date);
            return date >= new Date();
        },
        {
            message: "Date must be today or in the future",
            path: ["date"],
        }
    );

//update shema so that "patch" can update individual fields separately
export const slotUpdateSchema = z.object({
    venue_id: z.string().uuid("Invalid venue ID").optional(),
    start_time: z.string().datetime("Invalid start time").optional(),
    end_time: z.string().datetime("Invalid end time").optional(),
    date: z.string().datetime("Invalid date").optional(),
    status: z.enum(["AVAILABLE", "BOOKED", "CANCELLED"]).optional(),
    price: z.number().positive("Price must be positive").optional(),
}).refine(
    (data) => {
        if (data.start_time && data.end_time) {
            return new Date(data.start_time) < new Date(data.end_time);
        }
        return true; // skip validation if one is missing
    },
    {
        message: "Start time must be before end time",
        path: ["start_time"],
    }
).refine(
    (data) => {
        const date = new Date(data.date);
        return date >= new Date();
    },
    {
        message: "Date must be today or in the future",
        path: ["date"],
    }

);

