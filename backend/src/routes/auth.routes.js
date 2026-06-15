import {Router} from "express";
import * as Auth from "../controllers/auth.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";


const router = Router();

router.post("/signup",Auth.register);
router.post("/login",Auth.login);

// Protected Routes
router.get("/logout",checkAuth,Auth.logout);
router.put("/update-profile",checkAuth,upload.single("image"),Auth.updateProfile);

export default router;