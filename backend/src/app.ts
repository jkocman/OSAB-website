import express from "express";
import uploadRoutes from "./routes/uploadRoutes";

const app = express();

app.use("/upload", uploadRoutes);

app.listen(3000, () => {
  console.log("Server běží na portu 3000");
});