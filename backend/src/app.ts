import express from "express";
import uploadRoutes from "./routes/uploadRouter";
import getDataRouter from "./routes/getDataRouter";
import authRoutes from "./routes/authRouter";
import editBeatmapRouter from "./routes/editBeatmapsRouter";
import downloadRouter from "./routes/downloadRouter";
import dotenv from "dotenv";
import cors from "cors";
import { S3Client } from "@aws-sdk/client-s3";

dotenv.config();

export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

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