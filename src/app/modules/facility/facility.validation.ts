import { z } from 'zod';

const createFacilityValidationSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" })
        .min(30, { message: "Description must be at least 30 characters long" })
        .max(200, { message: "Description cannot exceed 200 characters" }),
    pricePerHour: z.number({ required_error: "Price per hour is required" })
        .min(0, { message: "Price per hour cannot be negative" }),
    location: z.string({ required_error: "Location is required" }),
    isDeleted: z.boolean().default(false),
});


const updateFacilityValidationSchema = z.object({
    name: z.string().optional(),
    description: z.string()
        .min(30, { message: "Description must be at least 30 characters long" })
        .max(200, { message: "Description cannot exceed 200 characters" })
        .optional(),
    pricePerHour: z.number()
        .min(0, { message: "Price per hour cannot be negative" })
        .optional(),
    location: z.string().optional(),
});




export const validateFacility = {
    createFacilityValidationSchema,
    updateFacilityValidationSchema
}