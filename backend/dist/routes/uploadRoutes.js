"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const unzipMiddleware_1 = require("../middlewares/unzipMiddleware");
const uploadController_1 = require("../controllers/uploadController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/", authMiddleware_1.authMiddleware, upload.single("file"), unzipMiddleware_1.unzipAndParseOsab, uploadController_1.processOsab);
exports.default = router;
//# sourceMappingURL=uploadRoutes.js.map