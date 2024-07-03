import { z } from "zod";

const signInValidationSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).email(),
    password: z.string({ required_error: 'Password is required!' }).min(6),
});

const passwordChangeValidationSchema = z.object({
    oldPassword: z.string({ required_error: 'Old password is required!' })
        .min(6, { message: "Old password must be at least 6 characters long" }),
    newPassword: z.string({ required_error: 'New password is required!' })
        .min(6, { message: "New password must be at least 6 characters long" }),
    confirmPassword: z.string({ required_error: 'Confirm new password is required!' })
        .min(6, { message: "Confirm password must be at least 6 characters long" })
});


export const validateAuth = {
    signInValidationSchema,
    passwordChangeValidationSchema,
}