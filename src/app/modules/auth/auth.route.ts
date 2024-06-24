import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { validateUser } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";

const router = Router();


router.post(
    '/signup',
    validateRequest(validateUser.createUserValidationSchema),
    AuthControllers.createUser
)

export const AuthRoutes = router;