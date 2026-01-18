import { Response } from "express";
import fs from "fs";
import path from "path";
import { AuthRequest } from "../middlewares/authMiddleware";

export const deleteMap = (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
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

    const map = levels[index];

    // 🔒 pouze autor
    if (map.creatorId !== userId) {
      return res.status(403).json({
        error: "You are not allowed to delete this map"
      });
    }

    // 🗑️ smazání složky z uploads
    if (map.levelDir && fs.existsSync(map.levelDir)) {
      fs.rmSync(map.levelDir, {
        recursive: true,
        force: true
      });
    }
    
    levels.splice(index, 1);

    fs.writeFileSync(
      dataPath,
      JSON.stringify(levels, null, 2),
      "utf-8"
    );

    res.json({ success: true, deleted: mapId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};