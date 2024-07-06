import httpStatus from "http-status";
import AppError from "../../error/AppError";
import User from "../user/user.model";
import { TBooking } from "./booking.interface";
import Facility from "../facility/facility.model";
import Booking from "./booking.model";
import { calculateTotalCost, isEndTimeBigger } from "./booking.utils";

const createBookingIntoDB = async (email: string, payload: Partial<TBooking>) => {
    //? check the user exists or not...
    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    payload.user = user._id;

    //?check the facility is exists or not...
    const isFacilityExists = await Facility.findById(payload.facility);
    if (!isFacilityExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Facility not found')
    }

    //? check endTime is bigger or not
    const startTime = payload.startTime as string;
    const endTime = payload.endTime as string;

    const endTimeStats = isEndTimeBigger(startTime, endTime)
    if (!endTimeStats) {
        throw new AppError(httpStatus.BAD_REQUEST, 'End time should be bigger than start time')
    }


    const totalCost = calculateTotalCost(startTime, endTime, isFacilityExists.pricePerHour)
    payload.payableAmount = totalCost;

    const result = await Booking.create(payload);
    return result;
}

const getAllBookingsFromDB = async () => {
    const result = await Booking.find();
    return result;
}

const getUserSpecificBookingsFromDB = async (email: string) => {
    //? check the user exists or not...
    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    //* retrieve users all booking by id...
    const result = await Booking.find({ user: user._id });
    return result;
}

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserSpecificBookingsFromDB,
}