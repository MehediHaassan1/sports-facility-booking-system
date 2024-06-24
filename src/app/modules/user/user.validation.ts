import { z } from 'zod';
import { user_gender, user_role } from './user.constant';

// Zod schema for TUserName
const UserNameSchema = z.object({
    firstName: z.string(
        { required_error: 'First name must be provided' }
    ),
    lastName: z.string(
        { required_error: 'First name must be provided' }
    )
});

// Zod schema for TUser
const createUserValidationSchema = z.object({
    name: UserNameSchema,
    gender: z.enum(
        [...user_gender] as [string, ...string[]],
        { message: 'Gender must be one of: male, female, other' }
    ),
    email: z.string({ required_error: 'Email is required' })
        .email('Invalid email format'),
    password: z.string({ required_error: 'Email is required' })
        .min(6, 'Password must be at least 6 characters long'),
    phone: z.string({ required_error: 'Phone is required' })
        .min(10, 'Phone number must be at least 10 characters long')
        .max(15, 'Phone number cannot exceed 15 characters'),
    role: z.enum(
        [...user_role] as [string, ...string[]],
        { message: 'Role must be either admin or user' }
    ),
    address: z.string({ required_error: 'Address is required' })
        .min(5, 'Address must be at least 5 characters long'),
});

export const validateUser = {
    createUserValidationSchema
}
