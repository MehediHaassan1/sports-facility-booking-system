import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service"

const getUserOwnData = catchAsync(async (req, res) => {
    const result = await UserServices.getUserOwnDataFromDB(req.user.email);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User's data retrieved successfully",
        data: result,
    });
})

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUsersFromDB();

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "All Users retrieved successfully",
        data: result,
    });
})

const getSingleUser = catchAsync(async (req, res) => {
    const email = req.params.email;
    console.log(email);
    const result = await UserServices.getSingleUserFromDB(email)
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User retrieved successfully",
        data: result,
    });
})

export const UserControllers = {
    getUserOwnData,
    getAllUsers,
    getSingleUser
}