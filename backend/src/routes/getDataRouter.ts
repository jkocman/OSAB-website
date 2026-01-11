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

    const beatmaps = JSON.parse(data);
    const userId = req.query.userId;

    if (userId) {

      const filtered = beatmaps.filter((b: any) => b.creatorId === userId);
      return res.json(filtered);
    }

    res.json(beatmaps);
  });
});

router.get("/beatmaps/:id/image", getBeatmapImage);

export default router;