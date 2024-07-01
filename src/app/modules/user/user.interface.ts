import { userRoles } from "./user.constant";

export type TUserName = {
    firstName: string;
    lastName: string;
}

export type TUser = {
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    email: string;
    password: string;  // Assumed to be hashed
    phone: string;
    role: 'admin' | 'user';
    address: string;
    isDeleted: boolean;
}

export type TUserRoles = typeof userRoles[keyof typeof userRoles]