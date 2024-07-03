import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const createUser = catchAsync(async (req, res) => {
    const result = await AuthServices.createUserIntoDB(req.body)

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'User is created successfully',
        data: result,
    });
})


const SignInUser = catchAsync(async (req, res) => {
    const result = await AuthServices.signInUserIntoDB(req.body);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: result
    })
})


const getUserOwnData = catchAsync(async (req, res) => {
    const result = await AuthServices.getUserOwnDataFromDB(req.user.email);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User's data retrieved successfully",
        data: result,
    });
})


const changeUserPassword = catchAsync(async (req, res) => {
    console.log(req.user.email);
    console.log(req.body);
    const result = await AuthServices.changeUserPasswordIntoDB(req.user.email, req.body)

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Password changed successfully",
        data: result,
    });
})

export const AuthControllers = {
    createUser,
    SignInUser,
    getUserOwnData,
    changeUserPassword,
}