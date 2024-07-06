import { Router } from "express";
import authHandler from "../../middlewares/authHandler";
import { userRoles } from "../user/user.constant";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { validateBooking } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = Router();

router.post(
    '/',
    authHandler(userRoles.USER),
    validateRequestHandler(validateBooking.bookingValidationSchema),
    BookingControllers.createBooking,
)

router.get(
    '/',
    authHandler(userRoles.ADMIN),
    BookingControllers.getAllBookings
)

router.get(
    '/user',
    authHandler(userRoles.USER),
    BookingControllers.getUserSpecificBookings
)

router.delete(
    '/:id',
    authHandler(userRoles.USER),
    BookingControllers.cancelBooking
)


export const BookingRoutes = router;