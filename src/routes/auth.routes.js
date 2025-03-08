import { Router } from "express";
import { userAuth } from "../middleware/auth.middleware.js";
import { registerController } from "../controllers/auth/register.controller.js";
import { loginController } from "../controllers/auth/login.controller.js";
import {updateUserController} from "../controllers/auth/upateUser.controller.js";
import {deleteUserController} from "../controllers/auth/deleteUser.controller.js";
import {updateEmailController} from "../controllers/auth/updateEmail.controller.js";
import {getProfileController} from "../controllers/users/getUserProfile.controller.js";
import { logoutUser } from "../controllers/auth/logout.controller.js";
import { editProfile } from "../controllers/auth/editProfile.controller.js";
import { adminUserFeedController } from "../controllers/users/adminuUserfeed.controller.js";
import { userFeedController } from "../controllers/users/userfeed.controller.js";
const authRouter = Router();
authRouter.post('/signup',registerController);
authRouter.get('/admin/user-feed',adminUserFeedController);
authRouter.put('/update-profile',userAuth,updateUserController);
authRouter.delete('/delete-user',userAuth,deleteUserController);
authRouter.patch('/profile/edit',userAuth,editProfile);
authRouter.post('/login',loginController);
authRouter.get('/profile',userAuth,getProfileController);
authRouter.get('/logout',userAuth,logoutUser);
authRouter.get('/feed',userAuth,userFeedController);



export default authRouter;