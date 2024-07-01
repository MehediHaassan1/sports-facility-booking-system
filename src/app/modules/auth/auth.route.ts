import { Router } from "express";
import { validateUser } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import validateRequestHandler from "../../middlewares/validateRequestHandler";

const router = Router();


router.post(
    '/signup',
    validateRequestHandler(validateUser.createUserValidationSchema),
    AuthControllers.createUser
)

export const AuthRoutes = router;