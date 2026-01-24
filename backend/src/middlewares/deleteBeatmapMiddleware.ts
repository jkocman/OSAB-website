import { Response } from "express";
import fs from "fs";
import path from "path";
import { AuthRequest } from "./authMiddleware";

export const deleteMap = (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const mapId = Number(req.params.id);

    if (isNaN(mapId)) {
      return res.status(400).json({ error: "Invalid map id" });
    }

    const dataPath = path.join(process.cwd(), "data", "levels.json");
    const levels = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const index = levels.findIndex((l: any) => l.id === mapId);

    if (index === -1) {
      return res.status(404).json({ error: "Map not found" });
    }

    const map = levels[index];

    if (map.creatorId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const uploadDir = path.join(process.cwd(), "uploads", `${map.name}-${map.id}`);

    if (fs.existsSync(uploadDir)) {
      fs.rmSync(uploadDir, { recursive: true, force: true });
      console.log(`Deleted folder: ${uploadDir}`);
    }

    levels.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify(levels, null, 2));

    res.json({ success: true, deleted: mapId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
