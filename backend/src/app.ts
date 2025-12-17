import express from "express";
import uploadRoutes from "./routes/uploadRoutes";
import getDataRouter from "./routes/getDataRouter";
import cors from "cors";


const app = express();

app.use(cors());

app.use("/upload", uploadRoutes);
app.use("/", getDataRouter);

app.listen(3000, () => {
  console.log("Server běží na portu 3000");
});