import { z } from 'zod';
import { user_gender, user_role } from './user.constant';

// Zod schema for TUserName
const UserNameValidationSchema = z.object({
    firstName: z.string(
        { required_error: 'First name must be provided' }
    ),
    lastName: z.string(
        { required_error: 'First name must be provided' }
    )
});
const AddressValidationSchema = z.object({
    street: z.string({ required_error: 'Street is required' }),
    city: z.string({ required_error: 'City is required' }),
    zipCode: z.string({ required_error: 'Zip code is required' }),
    state: z.string({ required_error: 'State is required' }),
    country: z.string({ required_error: 'Country is required' }),
});
// Zod schema for TUser
const createUserValidationSchema = z.object({
    name: UserNameValidationSchema,
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
    address: AddressValidationSchema
});

// ----------------- Update user info ------------------- //
const updateUserNameValidationSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});
const updateAddressValidationSchema = z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
});

const updateUserValidationSchema = z.object({
    name: updateUserNameValidationSchema.optional(),
    gender: z.enum(
        [...user_gender] as [string, ...string[]],
        { message: 'Gender must be one of: male, female, other' }
    ).optional(),
    address: updateAddressValidationSchema.optional(),
})

export const validateUser = {
    createUserValidationSchema,
    updateUserValidationSchema
}
