import { Router } from "express";

import { CreateUser, LoginUser } from "../controllers/authController";

const router = Router();

router.post("/register", CreateUser);
router.post("/login", LoginUser);

export default router;
