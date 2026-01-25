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
const mm = __importStar(require("music-metadata"));
const archiver_1 = __importDefault(require("archiver"));
const lib_storage_1 = require("@aws-sdk/lib-storage");
const client_s3_1 = require("@aws-sdk/client-s3");
const stream_1 = require("stream");
const app_1 = require("../app");
const processOsab = async (req, res) => {
    const levelDir = req.levelDir;
    const id = req.assignedId;
    try {
        const userId = req.user.id;
        const username = req.user.username;
        const osab = req.osab;
        const meta = osab.meta;
        const dateUploaded = new Date().toISOString();
        const files = fs_1.default.readdirSync(levelDir);
        const audioFile = files.find((f) => /\.(ogg|mp3)$/i.test(f));
        let musicAuthor = null;
        if (audioFile) {
            const metadata = await mm.parseFile(path_1.default.join(levelDir, audioFile));
            musicAuthor =
                metadata.common.artist || metadata.common.albumartist || null;
        }
        const imageFile = files.find((f) => /\.(png|jpg|jpeg)$/i.test(f));
        if (imageFile) {
            await app_1.r2.send(new client_s3_1.PutObjectCommand({
                Bucket: process.env.R2_BUCKET,
                Key: `beatmaps/${id}/cover.png`,
                Body: fs_1.default.readFileSync(path_1.default.join(levelDir, imageFile)),
                ContentType: "image/png",
            }));
        }
        const passThrough = new stream_1.PassThrough();
        const archive = (0, archiver_1.default)("zip", { zlib: { level: 9 } });
        archive.pipe(passThrough);
        archive.directory(levelDir, false);
        archive.finalize();
        const upload = new lib_storage_1.Upload({
            client: app_1.r2,
            params: {
                Bucket: process.env.R2_BUCKET,
                Key: `beatmaps/${id}/${id}.zip`,
                Body: passThrough,
                ContentType: "application/zip",
            },
        });
        await upload.done();
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
            creatorId: userId,
            creatorName: username,
            downloads: 0,
        };
        const filePath = path_1.default.join(process.cwd(), "data", "levels.json");
        let jsonData = [];
        if (fs_1.default.existsSync(filePath)) {
            jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8") || "[]");
        }
        jsonData.push(result);
        fs_1.default.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        fs_1.default.rmSync(levelDir, { recursive: true, force: true });
        res.json({ saved: result });
    }
    catch (err) {
        console.error("R2 Upload Error:", err);
        if (fs_1.default.existsSync(levelDir))
            fs_1.default.rmSync(levelDir, { recursive: true, force: true });
        res.status(500).json({ error: "Internal server error during upload" });
    }
};
exports.processOsab = processOsab;
//# sourceMappingURL=uploadController.js.map