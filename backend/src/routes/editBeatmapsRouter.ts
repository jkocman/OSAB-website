import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { deleteMap } from "../middlewares/deleteBeatmapMiddleware";

const router = Router();

router.delete("/maps/:id", authMiddleware, deleteMap);

export default router;