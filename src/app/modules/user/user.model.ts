import { Schema, model } from 'mongoose';
import { TUser, TUserName } from './user.interface';
import { user_gender, user_role } from './user.constant';

// Define the Mongoose schema for UserName
const UserNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    }
});

// Define the Mongoose schema for User
const UserSchema = new Schema<TUser>({
    name: {
        type: UserNameSchema,
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: user_gender,
            message: 'Gender must be one of: male, female, other'
        },
        required: [true, 'Gender is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        minlength: [10, 'Phone number must be at least 10 characters long'],
        maxlength: [15, 'Phone number cannot exceed 15 characters']
    },
    role: {
        type: String,
        enum: {
            values: user_role,
            message: 'Role must be either admin or user'
        },
        required: [true, 'Role is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        minlength: [5, 'Address must be at least 5 characters long']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Create the Mongoose model
const User = model<TUser>('User', UserSchema);

export default User;
