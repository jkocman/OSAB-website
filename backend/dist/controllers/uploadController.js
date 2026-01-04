"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOsab = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const levelIdMiddleware_1 = require("../middlewares/levelIdMiddleware");
const mm = __importStar(require("music-metadata"));
const processOsab = async (req, res) => {
    try {
        const userId = req.user.id;
        const osab = req.osab;
        const levelDir = req.levelDir;
        const dateUploaded = new Date().toISOString();
        if (!osab || !osab.meta) {
            return res.status(400).json({
                error: "no metadata in osab file",
            });
        }
        const meta = osab.meta;
        const files = fs_1.default.readdirSync(levelDir);
        const audioFile = files.find(file => file.toLowerCase().endsWith(".ogg") ||
            file.toLowerCase().endsWith(".mp3"));
        const normalizeArtist = (artist) => {
            if (!artist)
                return null;
            if (Array.isArray(artist))
                return artist.join(", ");
            return artist;
        };
        let musicAuthor = null;
        if (audioFile) {
            const audioPath = path_1.default.join(levelDir, audioFile);
            try {
                const metadata = await mm.parseFile(audioPath);
                musicAuthor =
                    normalizeArtist(metadata.common.artist) ||
                        normalizeArtist(metadata.common.albumartist) ||
                        normalizeArtist(metadata.common.composer) ||
                        null;
            }
            catch (err) {
                console.warn(err);
            }
        }
        const dataDir = path_1.default.join(process.cwd(), "data");
        const filePath = path_1.default.join(dataDir, "levels.json");
        const id = (0, levelIdMiddleware_1.nextNumber)();
        const result = {
            id,
            idGame: meta.id,
            name: meta.name,
            description: meta.description,
            length: meta.length,
            diff: meta.diff,
            imageUrl: `/beatmaps/${id}/image`,
            dateUploaded,
            musicAuthor,
            creatorId: userId
        };
        if (!fs_1.default.existsSync(dataDir)) {
            fs_1.default.mkdirSync(dataDir, { recursive: true });
        }
        let jsonData = [];
        if (fs_1.default.existsSync(filePath)) {
            const raw = fs_1.default.readFileSync(filePath, "utf-8");
            if (raw.trim()) {
                jsonData = JSON.parse(raw);
            }
        }
        jsonData.push(result);
        fs_1.default.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
        res.json({ saved: result });
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
exports.processOsab = processOsab;
//# sourceMappingURL=uploadController.js.map