import httpStatus from "http-status"
import AppError from "../error/AppError"
import catchAsync from "../utils/catchAsync"
import { TUserRoles } from "../modules/user/user.interface"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import User from "../modules/user/user.model";

const authHandler = (...userRole: TUserRoles[]) => {
    return catchAsync(async (req, res, next) => {
        const authorization = req.headers.authorization
        const token = authorization?.split(' ')[1]

        //? check the access token is missing or not
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Authentication failed!')
        }

        //! verify the jwt
        const decoded = jwt.verify(token, config.access_token_secret as string) as JwtPayload;

        const { email, role } = decoded;

        //? check the user exists or not
        const isUserExists = await User.findOne({ email, role });
        if (!isUserExists) {
            throw new AppError(httpStatus.FORBIDDEN, 'Forbidden Access!')
        }

        //? check the user is user or admin
        if (userRole && !userRole.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route!')
        }

        req.user = decoded;
        next();
    })
}

export default authHandler