"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const getDataRouter_1 = __importDefault(require("./routes/getDataRouter"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/upload", uploadRoutes_1.default);
app.use("/", getDataRouter_1.default);
app.use("/", authRoutes_1.default);
app.listen(3000, () => {
    console.log("running on port 3000");
});
//# sourceMappingURL=app.js.map