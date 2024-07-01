import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const createUser = catchAsync(async (req, res) => {
    const result = await AuthServices.createUserIntoDB(req.body)

    sendResponse(res, {
        status: 200,
        success: true,
        message: 'User is created successfully',
        data: result,
    });
})

export const AuthControllers = {
    createUser
}