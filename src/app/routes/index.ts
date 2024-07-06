import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { FacilityRoutes } from "../modules/facility/facility.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = Router();

router.use('/auth', AuthRoutes);

router.use('/users', UserRoutes);

router.use('/facility', FacilityRoutes);

router.use('/bookings', BookingRoutes);


export default router;