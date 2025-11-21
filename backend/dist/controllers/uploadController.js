"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOsab = exports.uploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Soubor nebyl nahrán" });
    }
    res.json({
        message: "Soubor úspěšně nahrán!",
        file: req.file,
    });
};
exports.uploadFile = uploadFile;
const processOsab = async (req, res) => {
    try {
        const osab = req.osab;
        if (!osab || !osab.meta) {
            return res.status(400).json({
                error: "Soubor .osab neobsahuje meta data."
            });
        }
        const meta = osab.meta;
        const result = {
            id: meta.id,
            name: meta.name,
            description: meta.description,
            length: meta.lenght, // opraveno podle tvé struktury
            diff: meta.diff
        };
        // Cesta k JSON souboru
        const filePath = path_1.default.join(process.cwd(), "data", "levels.json");
        // Načti existující data
        let jsonData = [];
        if (fs_1.default.existsSync(filePath)) {
            const raw = fs_1.default.readFileSync(filePath, "utf-8");
            jsonData = JSON.parse(raw);
        }
        // Přidej nová meta data
        jsonData.push(result);
        // Ulož zpět
        fs_1.default.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        res.json({
            message: "Meta data byla uložena do JSON souboru.",
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