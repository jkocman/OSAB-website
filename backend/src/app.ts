import express from "express";
import uploadRoutes from "./routes/uploadRouter";
import getDataRouter from "./routes/getDataRouter";
import authRoutes from "./routes/authRouter";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use(express.json());

app.use("/upload", uploadRoutes);
app.use("/", getDataRouter);
app.use("/", authRoutes);


app.listen(3000, () => {
  console.log("running on port 3000");
});