import { Router } from "express";
import multer from "multer";

import { unzipAndParseOsab } from "../middlewares/unzipMiddleware";
import { processOsab } from "../controllers/uploadController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", authMiddleware, upload.single("file"), unzipAndParseOsab, processOsab);

export default router;
