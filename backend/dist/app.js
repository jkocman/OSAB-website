"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.r2 = void 0;
const express_1 = __importDefault(require("express"));
const uploadRouter_1 = __importDefault(require("./routes/uploadRouter"));
const getDataRouter_1 = __importDefault(require("./routes/getDataRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const editBeatmapsRouter_1 = __importDefault(require("./routes/editBeatmapsRouter"));
const downloadRouter_1 = __importDefault(require("./routes/downloadRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const client_s3_1 = require("@aws-sdk/client-s3");
dotenv_1.default.config();
exports.r2 = new client_s3_1.S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/upload", uploadRouter_1.default);
app.use("/", getDataRouter_1.default);
app.use("/", authRouter_1.default);
app.use("/", editBeatmapsRouter_1.default);
app.use("/download", downloadRouter_1.default);
app.listen(3000, () => {
    console.log("running on port 3000");
});
//# sourceMappingURL=app.js.map