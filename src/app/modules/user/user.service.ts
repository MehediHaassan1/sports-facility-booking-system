import httpStatus from "http-status";
import AppError from "../../error/AppError";
import User from "./user.model"

const getUserOwnDataFromDB = async (payload: string) => {
    //? check if the user exists in the database or not
    const user = await User.findOne({ email: payload });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    return user;
}

export const UserServices = { getUserOwnDataFromDB }