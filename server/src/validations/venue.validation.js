import { z } from 'zod';

const venueSchema = z.object({
    name: z
        .string({
            required_error: "Venue name is required",
            invalid_type_error: "Venue name must be a string",
        })
        .min(1, "Venue name cannot be empty"),
    location: z
        .string({
            required_error: "Location is required",
            invalid_type_error: "Location must be a string",
        })
        .min(1, "Location cannot be empty"),
    sport_type: z
        .string({
            required_error: "Sport type is required",
            invalid_type_error: "Sport type must be a string",
        })
        .min(1, "Sport type cannot be empty"),
    description: z
        .string()
        .optional(),
    price_per_slot: z
        .number({
            required_error: "Price per slot is required",
            invalid_type_error: "Price per slot must be a number",
        })
        .positive("Price must be positive"),
    amenities: z
        .array(z.string()),
    images: z
        .array(z.string().url("Image must be a valid URL")).nonempty("At least one image is required"),
    status: z
        .enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]).optional(),
    partner_id: z
        .string({
            required_error: "Partner ID is required",
            invalid_type_error: "Partner ID must be a string",
        }).uuid("Partner ID must be a valid UUID")
})

const venueUpdateSchema = z.object({
    name: z
        .string({
            invalid_type_error: "Venue name must be a string",
        })
        .min(1, "Venue name cannot be empty")
        .optional(),

    location: z
        .string({
            invalid_type_error: "Location must be a string",
        })
        .min(1, "Location cannot be empty")
        .optional(),

    sport_type: z
        .string({
            invalid_type_error: "Sport type must be a string",
        })
        .min(1, "Sport type cannot be empty")
        .optional(),

    description: z
        .string()
        .optional(),

    price_per_slot: z
        .number({
            invalid_type_error: "Price per slot must be a number",
        })
        .positive("Price must be positive")
        .optional(),

    amenities: z
        .array(z.string())
        .optional(),

    images: z
        .array(z.string().url("Image must be a valid URL"))
        .optional(),

    status: z
        .enum(["ACTIVE", "INACTIVE", "MAINTENANCE"])
        .optional(),

    partner_id: z
        .string({
            invalid_type_error: "Partner ID must be a string",
        })
        .uuid("Partner ID must be a valid UUID")
        .optional(),
});

export { venueSchema, venueUpdateSchema };
