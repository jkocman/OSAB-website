import express from "express";
import uploadRoutes from "./routes/uploadRouter";
import getDataRouter from "./routes/getDataRouter";
import authRoutes from "./routes/authRouter";
import editBeatmapRouter from "./routes/editBeatmapsRouter";
import downloadRouter from "./routes/downloadRouter";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoutes);
app.use("/", getDataRouter);
app.use("/", authRoutes);
app.use("/", editBeatmapRouter);
app.use("/download", downloadRouter);

app.listen(3000, () => {
  console.log("running on port 3000");
});