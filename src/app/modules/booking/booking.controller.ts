import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
    const email = req.user.email;
    const result = await BookingServices.createBookingIntoDB(email, req.body);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Booking created successfully",
        data: result,
    })
})


const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB();
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Bookings retrieved successfully",
        data: result,
    })
})

const getUserSpecificBookings = catchAsync(async (req, res) => {
    const email = req.user.email;
    const result = await BookingServices.getUserSpecificBookingsFromDB(email);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Bookings retrieved successfully",
        data: result,
    })
})

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getUserSpecificBookings,
}