import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service"

const getUserOwnData = catchAsync(async (req, res) => {
    const result = await UserServices.getUserOwnDataFromDB(req.user.email);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User's data fetched successfully",
        data: result,
    });
})

export const UserControllers = {
    getUserOwnData
}