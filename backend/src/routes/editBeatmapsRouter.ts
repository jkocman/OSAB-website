import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { deleteMap } from "../middlewares/deleteBeatmapMiddleware";
import fs from "fs";
import path from "path";

const router = Router();

router.patch("/beatmaps/:id", (req, res) => {
  try {
    const mapId = Number(req.params.id);

    if (isNaN(mapId)) {
      return res.status(400).json({ error: "Invalid map id" });
    }

    const dataPath = path.join(process.cwd(), "data", "levels.json");

    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({ error: "Levels file not found" });
    }
    const levels = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    const index = levels.findIndex((l: any) => l.id === mapId);

    if (index === -1) {
      return res.status(404).json({ error: "Map not found" });
    }

    if (typeof levels[index].downloads !== "number") {
      levels[index].downloads = 0;
    }
    levels[index].downloads += 1;

    fs.writeFileSync(dataPath, JSON.stringify(levels, null, 2), "utf-8");

    res.json({ success: true, downloads: levels[index].downloads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/beatmaps/:id", authMiddleware, deleteMap);

export default router;
