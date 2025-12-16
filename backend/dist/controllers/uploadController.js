"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOsab = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const levelIdMiddleware_1 = require("../middlewares/levelIdMiddleware");
const processOsab = async (req, res) => {
    try {
        const osab = req.osab;
        const levelDir = req.levelDir;
        if (!osab || !osab.meta) {
            return res.status(400).json({
                error: "Soubor .osab neobsahuje meta data."
            });
        }
        const meta = osab.meta;
        const dataDir = path_1.default.join(process.cwd(), "data");
        const filePath = path_1.default.join(dataDir, "levels.json");
        const result = {
            id: (0, levelIdMiddleware_1.nextNumber)(),
            idGame: meta.id,
            name: meta.name,
            description: meta.description,
            length: meta.length,
            diff: meta.diff,
            assetsPath: levelDir
        };
        if (!fs_1.default.existsSync(dataDir)) {
            fs_1.default.mkdirSync(dataDir, { recursive: true });
        }
        let jsonData = [];
        if (fs_1.default.existsSync(filePath)) {
            const raw = fs_1.default.readFileSync(filePath, "utf-8");
            if (raw.trim().length > 0) {
                jsonData = JSON.parse(raw);
            }
        }
        jsonData.push(result);
        fs_1.default.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
        res.json({
            message: "Level byl úspěšně uložen.",
            saved: result
        });
    }
    catch (err) {
        console.error("Chyba při ukládání:", err);
        res.status(500).json({ error: "Chyba při zpracování meta dat." });
    }
};
exports.processOsab = processOsab;
//# sourceMappingURL=uploadController.js.map