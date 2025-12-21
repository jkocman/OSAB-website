"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unzipAndParseOsab = void 0;
const unzipper_1 = __importDefault(require("unzipper"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const levelIdMiddleware_1 = require("../middlewares/levelIdMiddleware");
const unzipAndParseOsab = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400);
        }
        if (!req.file.originalname.endsWith(".zip")) {
            return res.status(400);
        }
        const zipPath = req.file.path;
        const directory = await unzipper_1.default.Open.file(zipPath);
        let osabContent = null;
        for (const file of directory.files) {
            if (file.path.endsWith(".osab")) {
                const buffer = await file.buffer();
                const text = buffer.toString("utf-8");
                try {
                    osabContent = JSON.parse(text);
                }
                catch {
                    return res
                        .status(400)
                        .json({ error: "not a json file" });
                }
                break;
            }
        }
        if (!osabContent || !osabContent.meta) {
            return res.status(400).json({
                error: ".osab file with no meta found."
            });
        }
        const levelName = osabContent.meta.name;
        const levelId = (0, levelIdMiddleware_1.nextNumber)();
        if (!levelName || !levelId) {
            return res.status(400).json({
                error: "invalid .osab meta data"
            });
        }
        const safeName = levelName.replace(/[^a-z0-9-_]/gi, "_");
        const targetDir = path_1.default.join(process.cwd(), "uploads", `${safeName}-${levelId}`);
        fs_1.default.mkdirSync(targetDir, { recursive: true });
        for (const file of directory.files) {
            const outputPath = path_1.default.join(targetDir, file.path);
            if (file.type === "Directory") {
                fs_1.default.mkdirSync(outputPath, { recursive: true });
                continue;
            }
            fs_1.default.mkdirSync(path_1.default.dirname(outputPath), { recursive: true });
            const readStream = file.stream();
            const writeStream = fs_1.default.createWriteStream(outputPath);
            await new Promise((resolve, reject) => {
                readStream
                    .pipe(writeStream)
                    .on("finish", resolve)
                    .on("error", reject);
            });
        }
        fs_1.default.unlinkSync(zipPath);
        req.osab = osabContent;
        req.levelDir = targetDir;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(500);
    }
};
exports.unzipAndParseOsab = unzipAndParseOsab;
//# sourceMappingURL=unzipMiddleware.js.map