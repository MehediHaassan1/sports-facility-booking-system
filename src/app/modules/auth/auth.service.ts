import AppError from "../../error/AppError";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";
import httpStatus from 'http-status';
import { TPasswordChange, TSignIn } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../config";

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

const signInUserIntoDB = async (payload: TSignIn) => {
    //? check the user is exists in the DB or not
    const user = await User.findOne({ email: payload.email })
    if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User with this email not exists!')
    }

    //? check the user is active or blocked!
    if (user.status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!')
    }

    //? check the password is matched or not
    const isPasswordMatch = await bcrypt.compare(payload.password, user.password)
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.FORBIDDEN, 'Wrong password!')
    }

    //! create token payload
    const jwtPayload = {
        email: user?.email as string,
        role: user?.role as string,
    }

    const accessToken = jwt.sign(
        jwtPayload,
        config.access_token_secret as string,
        { expiresIn: config.access_token_expires_in as string }
    );

    return { user, accessToken }
}

const getUserOwnDataFromDB = async (payload: string) => {
    //? check if the user exists in the database or not
    const user = await User.findOne({ email: payload });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    //? check the user is active or blocked!
    if (user.status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!')
    }

    return user;
}


const changeUserPasswordIntoDB = async (email: string, payload: TPasswordChange) => {
    const { oldPassword, newPassword, confirmPassword } = payload;

    //? check if the user exists in the database or not
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    //? check the user is active or blocked!
    if (user.status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!')
    }

    //? check the old password is correct or not
    const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.FORBIDDEN, 'Old password is incorrect!')
    }

    //? check the new password and confirm password is same
    if (newPassword !== confirmPassword) {
        throw new AppError(httpStatus.FORBIDDEN, 'New password and confirm password are not same!')
    }

    //* hash the confirm password and store it in the db
    const newHashedConfirmPassword = await bcrypt.hash(confirmPassword, Number(config.bcrypt_salt_round))

    await User.findOneAndUpdate(
        { email },
        { password: newHashedConfirmPassword }
    )


    return user;
}

export const AuthServices = {
    createUserIntoDB,
    signInUserIntoDB,
    getUserOwnDataFromDB,
    changeUserPasswordIntoDB,
}