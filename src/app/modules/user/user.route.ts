import { Router } from "express";
import { UserControllers } from "./user.controller";
import authHandler from "../../middlewares/authHandler";
import { userRoles, user_role } from "./user.constant";

const router = Router();

router.get(
    '/my-data',
    authHandler(userRoles.ADMIN, userRoles.USER),
    UserControllers.getUserOwnData,
)


export const UserRoutes = router;