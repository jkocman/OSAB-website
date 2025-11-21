"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const app = (0, express_1.default)();
app.use("/upload", uploadRoutes_1.default);
app.listen(3000, () => {
    console.log("Server běží na portu 3000");
});
//# sourceMappingURL=app.js.map