import { z } from "zod";

const signInValidationSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).email(),
    password: z.string({ required_error: 'Password is required!' }).min(6),
});


export const validateAuth = { signInValidationSchema }