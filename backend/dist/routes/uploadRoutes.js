"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const unzipMiddleware_1 = require("../middlewares/unzipMiddleware");
const uploadController_1 = require("../controllers/uploadController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
// POST /upload
// 1) nahraje ZIP
// 2) rozbalí a načte .osab
// 3) uloží metadata
router.post("/", upload.single("file"), unzipMiddleware_1.unzipAndParseOsab, uploadController_1.processOsab);
exports.default = router;
//# sourceMappingURL=uploadRoutes.js.map