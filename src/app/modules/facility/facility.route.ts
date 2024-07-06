import { Router } from "express";
import authHandler from "../../middlewares/authHandler";
import { userRoles } from "../user/user.constant";
import { FacilityControllers } from "./facility.controller";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { validateFacility } from "./facility.validation";

const router = Router();

router.post(
    '/',
    authHandler(userRoles.ADMIN),
    validateRequestHandler(validateFacility.createFacilityValidationSchema),
    FacilityControllers.createFacility
)

router.patch(
    '/:id',
    authHandler(userRoles.ADMIN),
    validateRequestHandler(validateFacility.updateFacilityValidationSchema),
    FacilityControllers.updateFacility
)

router.delete(
    '/:id',
    authHandler(userRoles.ADMIN),
    FacilityControllers.deleteFacility
)

router.get(
    '/',
    FacilityControllers.getAllFacilities
)

router.get(
    '/:id',
    FacilityControllers.getSingleFacility
)

export const FacilityRoutes = router;