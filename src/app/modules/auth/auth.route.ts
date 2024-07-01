import { Router } from "express";
import { validateUser } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { validateAuth } from "./auth.validation";

const router = Router();


router.post(
    '/signup',
    validateRequestHandler(validateUser.createUserValidationSchema),
    AuthControllers.createUser
)

router.post(
    '/signin',
    validateRequestHandler(validateAuth.signInValidationSchema),
    AuthControllers.SignInUser
)

export const AuthRoutes = router;