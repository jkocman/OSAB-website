import { Router } from "express";
import multer from "multer";

import { unzipAndParseOsab } from "../middlewares/unzipMiddleware";
import { processOsab } from "../controllers/uploadController";

const router = Router();
const upload = multer({ dest: "uploads/" });

// POST /upload
// 1) nahraje ZIP
// 2) rozbalí a načte .osab
// 3) uloží metadata
router.post("/", upload.single("file"), unzipAndParseOsab, processOsab);

export default router;
