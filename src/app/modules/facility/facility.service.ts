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
    const facility = Facility.findById(id);
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

export const FacilityServices = {
    createFacilityIntoDB,
    updateFacilityIntoDB,
}