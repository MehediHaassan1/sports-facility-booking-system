import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TFacility } from "./facility.interface";
import Facility from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await Facility.create(payload);
    return result;
}


const updateFacilityIntoDB = async (id: string, payload: Partial<TFacility>) => {
    //? check the facility exists or not...
    const facility = await Facility.findById(id);
    if (!facility) {
        throw new AppError(httpStatus.NOT_FOUND, 'Facility not found')
    }

    const result = await Facility.findByIdAndUpdate(
        id,
        payload,
        { new: true }
    )
    return result;
}

const deleteFacilityIntoDB = async (id: string) => {
    //? check the facility exists or not...
    const facility = await Facility.findById(id);
    if (!facility) {
        throw new AppError(httpStatus.NOT_FOUND, 'Facility not found')
    }
    const result = await Facility.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    )
    return result;
}

const getAllFacilitiesFromDB = async () => {
    const result = await Facility.find();
    return result;
}

const getSingleFacilityFromDB = async (id: string) => {
    //? check the facility exists or not...
    const facility = await Facility.findById(id);
    if (!facility) {
        throw new AppError(httpStatus.NOT_FOUND, 'Facility not found')
    }
    return facility;
}

export const FacilityServices = {
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityIntoDB,
    getAllFacilitiesFromDB,
    getSingleFacilityFromDB,
}