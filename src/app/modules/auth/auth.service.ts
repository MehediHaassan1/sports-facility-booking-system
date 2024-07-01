import AppError from "../../error/AppError";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";
import httpStatus from 'http-status';

const createUserIntoDB = async (payload: TUser) => {
    //? check the user is exists or not
    const isUserExists = await User.findOne({ email: payload.email })
    if (isUserExists) {
        throw new AppError(httpStatus.CONFLICT, 'User is already exists!')
    }

    //? check the phone number is used or not!
    const isPhoneNumberUsed = await User.findOne({ phone: payload.phone })
    if (isPhoneNumberUsed) {
        throw new AppError(httpStatus.CONFLICT, 'Phone number is already used!')
    }

    //* create new user into db
    const result = await User.create(payload)
    return result;
}


export const AuthServices = {
    createUserIntoDB
}