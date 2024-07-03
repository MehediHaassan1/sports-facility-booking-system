import httpStatus from "http-status";
import AppError from "../../error/AppError";
import User from "./user.model"

const getAllUsersFromDB = async () => {
    const users = await User.find();
    return users;
}

const getSingleUserFromDB = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }
    return user;
}

export const UserServices = {
    getAllUsersFromDB,
    getSingleUserFromDB
}