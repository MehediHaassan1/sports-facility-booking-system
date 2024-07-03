import httpStatus from "http-status";
import AppError from "../../error/AppError";
import User from "./user.model"

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

export const UserServices = {
    getAllUsersFromDB,
    getSingleUserFromDB
}