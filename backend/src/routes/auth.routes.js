import {Router} from "express";
import * as Auth from "../controllers/auth.controller.js";


const router = Router();

router.get("/signup",Auth.register);
router.get("/login",Auth.login);
router.get("/logout",Auth.logout);

export default router;