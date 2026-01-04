import express from "express";
import uploadRoutes from "./routes/uploadRoutes";
import getDataRouter from "./routes/getDataRouter";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoutes);
app.use("/", getDataRouter);
app.use("/", authRoutes);


app.listen(3000, () => {
  console.log("running on port 3000");
});