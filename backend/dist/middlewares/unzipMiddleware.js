"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unzipAndParseOsab = void 0;
const unzipper_1 = __importDefault(require("unzipper"));
const unzipAndParseOsab = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Soubor nebyl nahrán." });
        }
        if (!req.file.originalname.endsWith(".zip")) {
            return res.status(400).json({ error: "Soubor musí být .zip" });
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
                catch (err) {
                    return res.status(400).json({ error: "Soubor .osab není validní JSON." });
                }
                break;
            }
        }
        if (!osabContent) {
            return res.status(400).json({ error: "ZIP neobsahuje .osab soubor." });
        }
        req.osab = osabContent;
        next();
    }
    catch (error) {
        console.error("Chyba při rozbalování:", error);
        return res.status(500).json({ error: "Chyba při rozbalování ZIP." });
    }
};
exports.unzipAndParseOsab = unzipAndParseOsab;
//# sourceMappingURL=unzipMiddleware.js.map