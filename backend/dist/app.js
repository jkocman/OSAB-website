"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadRouter_1 = __importDefault(require("./routes/uploadRouter"));
const getDataRouter_1 = __importDefault(require("./routes/getDataRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use(express_1.default.json());
app.use("/upload", uploadRouter_1.default);
app.use("/", getDataRouter_1.default);
app.use("/", authRouter_1.default);
app.listen(3000, () => {
    console.log("running on port 3000");
});
//# sourceMappingURL=app.js.map