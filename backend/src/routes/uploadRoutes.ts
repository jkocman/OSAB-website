import { Router } from "express";
import multer from "multer";

import { unzipAndParseOsab } from "../middlewares/unzipMiddleware";
import { processOsab } from "../controllers/uploadController";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), unzipAndParseOsab, processOsab);

export default router;
