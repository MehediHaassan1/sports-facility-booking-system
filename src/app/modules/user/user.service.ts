import httpStatus from "http-status";
import AppError from "../../error/AppError";
import User from "./user.model"
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "./user.interface";
import { object } from "zod";

const getAllUsersFromDB = async () => {
    const users = await User.find();
    return users;
}

const getSingleUserFromDB = async (email: string) => {
    //? check the user is exists or not
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    //? check the user is active or blocked!
    if (user.status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!')
    }

    return user;
}


const updateUserDataIntoDB = async (jwtData: JwtPayload, payload: Partial<TUser>) => {
    const { name, address, ...rest } = payload;
    const modifiedData: Record<string, unknown> = { ...rest };

    //? check the user is exists or not?
    const user = await User.findOne({ email: jwtData.email })
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    //? check the user is active or blocked!
    if (user.status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!')
    }

    //* Add modified data and update
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedData[`name.${key}`] = value
        }
    }

    if (address && Object.keys(address).length) {
        for (const [key, value] of Object.entries(address)) {
            modifiedData[`address.${key}`] = value
        }
    }

    const result = await User.findByIdAndUpdate(
        user?._id,
        modifiedData,
        {
            new: true,
            runValidators: true,
        }
    )

    return result;
}

export const UserServices = {
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserDataIntoDB,
}