import { z } from 'zod';

const bookingValidationSchema = z.object({
    date: z.string({ required_error: "Date is required" }),
    startTime: z.string({ required_error: "Start time is required" }),
    endTime: z.string({ required_error: "End time is required" }),
    facility: z.string({ required_error: 'Facility is required' }),
});

export const validateBooking = {
    bookingValidationSchema
}
