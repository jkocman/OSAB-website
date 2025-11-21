import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadController";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), uploadFile);

export default router;