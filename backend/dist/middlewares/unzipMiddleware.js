"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unzipAndParseOsab = void 0;
const unzipper_1 = __importDefault(require("unzipper"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const levelIdMiddleware_1 = require("./levelIdMiddleware");
const unzipAndParseOsab = async (req, res, next) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: "No file uploaded" });
        if (!req.file.originalname.endsWith(".zip")) {
            return res.status(400).json({ error: "Not a zip file" });
        }
        const zipPath = req.file.path;
        const directory = await unzipper_1.default.Open.file(zipPath);
        let osabContent = null;
        for (const file of directory.files) {
            if (file.path.endsWith(".osab")) {
                const buffer = await file.buffer();
                try {
                    osabContent = JSON.parse(buffer.toString("utf-8"));
                }
                catch {
                    return res.status(400).json({ error: "Invalid .osab JSON" });
                }
                break;
            }
        }
        if (!osabContent || !osabContent.meta) {
            return res.status(400).json({ error: ".osab file with no meta found." });
        }
        const levelId = (0, levelIdMiddleware_1.nextNumber)();
        const safeName = osabContent.meta.name.replace(/[^a-z0-9-_]/gi, "_");
        const targetDir = path_1.default.join(process.cwd(), "uploads", `${safeName}-${levelId}`);
        fs_1.default.mkdirSync(targetDir, { recursive: true });
        for (const file of directory.files) {
            const outputPath = path_1.default.join(targetDir, file.path);
            if (file.type === "Directory") {
                fs_1.default.mkdirSync(outputPath, { recursive: true });
                continue;
            }
            fs_1.default.mkdirSync(path_1.default.dirname(outputPath), { recursive: true });
            await new Promise((resolve, reject) => {
                file.stream()
                    .pipe(fs_1.default.createWriteStream(outputPath))
                    .on("finish", () => resolve())
                    .on("error", (err) => reject(err));
            });
        }
        if (fs_1.default.existsSync(zipPath))
            fs_1.default.unlinkSync(zipPath);
        req.osab = osabContent;
        req.levelDir = targetDir;
        req.assignedId = levelId;
        next();
    }
    catch (err) {
        console.error("Unzip error:", err);
        return res.status(500).json({ error: "Internal unzip error" });
    }
};
exports.unzipAndParseOsab = unzipAndParseOsab;
//# sourceMappingURL=unzipMiddleware.js.map