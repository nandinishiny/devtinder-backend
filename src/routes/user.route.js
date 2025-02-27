import { registerController } from "../controllers/user.controllers.js";
import { Router } from "express";
const router = Router();
router.post('/register',registerController);
router.get('/trial');



export default router;