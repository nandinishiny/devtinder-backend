import { deleteUserController, getUsersController, registerController,updateEmailController,updateUserController } from "../controllers/user.controllers.js";
import { Router } from "express";
const router = Router();
router.post('/register',registerController);
router.get('/get-users',getUsersController);
router.put('/update-user',updateUserController);
router.delete('/delete-user',deleteUserController);
router.patch('/patch-user',updateEmailController);



export default router;