import { Router } from "express";
import { validateUser } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { validateAuth } from "./auth.validation";
import authHandler from "../../middlewares/authHandler";
import { userRoles } from "../user/user.constant";

const router = Router();


router.post(
    '/signup',
    validateRequestHandler(validateUser.createUserValidationSchema),
    AuthControllers.createUser,
)

router.post(
    '/signin',
    validateRequestHandler(validateAuth.signInValidationSchema),
    AuthControllers.SignInUser,
)

router.get(
    '/my-data',
    authHandler(userRoles.ADMIN, userRoles.USER),
    AuthControllers.getUserOwnData,
)


router.post(
    '/change-password',
    authHandler(userRoles.ADMIN, userRoles.USER),
    validateRequestHandler(validateAuth.passwordChangeValidationSchema),
    AuthControllers.changeUserPassword,
)

export const AuthRoutes = router;