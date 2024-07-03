import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
    const result = await FacilityServices.createFacilityIntoDB(req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: 'Facility added successfully',
        data: result,
    })
})

const updateFacility = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await FacilityServices.updateFacilityIntoDB(id,req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: 'Facility updated successfully',
        data: result,
    })
})


export const FacilityControllers = {
    createFacility,
    updateFacility,
}