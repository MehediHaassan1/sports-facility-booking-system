import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service"


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
    const result = await UserServices.getSingleUserFromDB(email)

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User retrieved successfully",
        data: result,
    });
})

const updateUserData = catchAsync(async (req, res) => {
    const jwtData = req.user;
    const result = await UserServices.updateUserDataIntoDB(jwtData, req.body);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User updated successfully",
        data: result,
    });
})

const deleteUser = catchAsync(async (req, res) => {
    const email = req.params.email;
    const result = await UserServices.deleteUserFromDB(email);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User deleted successfully",
        data: result,
    });
})

const blockUser = catchAsync(async (req, res) => {
    const email = req.params.email;
    const result = await UserServices.blockUserFromDB(email);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User blocked successfully",
        data: result,
    });
})

export const UserControllers = {
    getAllUsers,
    getSingleUser,
    updateUserData,
    deleteUser,
    blockUser,
}