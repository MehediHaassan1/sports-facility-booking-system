import { Router } from "express";
import { UserControllers } from "./user.controller";
import authHandler from "../../middlewares/authHandler";
import { userRoles, user_role } from "./user.constant";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { validateUser } from "./user.validation";

const router = Router();

router.get(
    '/',
    authHandler(userRoles.ADMIN),
    UserControllers.getAllUsers
)


router.get(
    '/:email',
    authHandler(userRoles.ADMIN),
    UserControllers.getSingleUser
)

router.patch(
    '/update-user-data',
    authHandler(userRoles.ADMIN, userRoles.USER),
    validateRequestHandler(validateUser.updateUserValidationSchema),
    UserControllers.updateUserData
)



export const UserRoutes = router;