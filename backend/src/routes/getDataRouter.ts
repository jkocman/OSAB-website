import { Router } from "express";
import path from "path";
import fs from "fs";
import { getBeatmapImage } from "../middlewares/beatmapImageMiddleware";

const router = Router();
const filePath = path.join(process.cwd(), "data", "levels.json");

router.get("/beatmaps/", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json(JSON.parse(data));
  });
});

router.get("/beatmaps/:id/image", getBeatmapImage);

export default router;