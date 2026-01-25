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
        const zipPath = req.file.path;
        const MAX_SIZE_BYTES = 20 * 1024 * 1024;
        if (req.file.size > MAX_SIZE_BYTES) {
            if (fs_1.default.existsSync(zipPath))
                fs_1.default.unlinkSync(zipPath);
            return res.status(413).json({ error: "ZIP file is too large (max 20MB)" });
        }
        if (!req.file.originalname.endsWith(".zip")) {
            if (fs_1.default.existsSync(zipPath))
                fs_1.default.unlinkSync(zipPath);
            return res.status(400).json({ error: "Not a zip file" });
        }
        const directory = await unzipper_1.default.Open.file(zipPath);
        const uncompressedSize = directory.files.reduce((acc, file) => acc + file.uncompressedSize, 0);
        if (uncompressedSize > MAX_SIZE_BYTES) {
            if (fs_1.default.existsSync(zipPath))
                fs_1.default.unlinkSync(zipPath);
            return res.status(413).json({ error: "Extracted content exceeds 20MB limit" });
        }
        const allFiles = directory.files.filter(f => f.type === "File" &&
            !f.path.split('/').some(part => part.startsWith('.') || part === "__MACOSX"));
        const osabFiles = allFiles.filter(f => f.path.toLowerCase().endsWith(".osab"));
        const audioFiles = allFiles.filter(f => /\.(mp3|ogg)$/i.test(f.path));
        const imageFiles = allFiles.filter(f => /\.(png|jpg|jpeg)$/i.test(f.path));
        if (osabFiles.length !== 1) {
            if (fs_1.default.existsSync(zipPath))
                fs_1.default.unlinkSync(zipPath);
            return res.status(400).json({ error: "ZIP must contain exactly one .osab file." });
        }
        if (audioFiles.length > 1 || imageFiles.length > 1) {
            if (fs_1.default.existsSync(zipPath))
                fs_1.default.unlinkSync(zipPath);
            return res.status(400).json({ error: "ZIP contains too many audio or image files (max 1 of each)." });
        }
        const validCount = osabFiles.length + audioFiles.length + imageFiles.length;
        if (allFiles.length !== validCount) {
            if (fs_1.default.existsSync(zipPath))
                fs_1.default.unlinkSync(zipPath);
            return res.status(400).json({ error: "ZIP contains forbidden file types or extra files." });
        }
        const osabFile = osabFiles[0];
        let buffer = "";
        if (osabFile) {
            buffer = await osabFile.buffer();
        }
        let osabContent = null;
        try {
            osabContent = JSON.parse(buffer.toString("utf-8"));
        }
        catch {
            if (fs_1.default.existsSync(zipPath))
                fs_1.default.unlinkSync(zipPath);
            return res.status(400).json({ error: "Invalid .osab JSON" });
        }
        if (!osabContent || !osabContent.meta) {
            if (fs_1.default.existsSync(zipPath))
                fs_1.default.unlinkSync(zipPath);
            return res.status(400).json({ error: ".osab file with no meta found." });
        }
        const levelId = (0, levelIdMiddleware_1.nextNumber)();
        const safeName = (osabContent.meta.name || "unnamed").replace(/[^a-z0-9-_]/gi, "_");
        const targetDir = path_1.default.join(process.cwd(), "uploads", `${safeName}-${levelId}`);
        fs_1.default.mkdirSync(targetDir, { recursive: true });
        const filesToExtract = [...osabFiles, ...audioFiles, ...imageFiles];
        for (const file of filesToExtract) {
            const outputPath = path_1.default.join(targetDir, path_1.default.basename(file.path));
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
        if (req.file && fs_1.default.existsSync(req.file.path))
            fs_1.default.unlinkSync(req.file.path);
        return res.status(500).json({ error: "Internal unzip error" });
    }
};
exports.unzipAndParseOsab = unzipAndParseOsab;
//# sourceMappingURL=unzipMiddleware.js.map