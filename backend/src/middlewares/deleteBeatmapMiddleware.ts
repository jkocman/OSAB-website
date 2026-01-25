import { Response } from "express";
import fs from "fs";
import path from "path";
import { AuthRequest } from "./authMiddleware";
import { ListObjectsV2Command, DeleteObjectsCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "../app"

export const deleteMap = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const mapId = Number(req.params.id);
    const prefix = `beatmaps/${mapId}/`;

    const dataPath = path.join(process.cwd(), "data", "levels.json");
    const levels = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const index = levels.findIndex((l: any) => l.id === mapId);

    if (index === -1) return res.status(404).json({ error: "Map not found" });
    const map = levels[index];

    if (map.creatorId !== userId) return res.status(403).json({ error: "Forbidden" });

    const listCmd = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET!,
      Prefix: prefix
    });
    const listed = await r2.send(listCmd);

    if (listed.Contents && listed.Contents.length > 0) {
      const objectsToDelete = listed.Contents.map(obj => ({ Key: obj.Key }));

      await r2.send(new DeleteObjectsCommand({
        Bucket: process.env.R2_BUCKET!,
        Delete: { Objects: objectsToDelete }
      }));
      
      console.log(`Deleted ${objectsToDelete.length} objects from R2 for map ${mapId}`);
    }

    levels.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify(levels, null, 2));

    const oldUploadDir = path.join(process.cwd(), "uploads", `${map.name}-${map.id}`);
    if (fs.existsSync(oldUploadDir)) {
      fs.rmSync(oldUploadDir, { recursive: true, force: true });
    }

    res.json({ success: true, deleted: mapId });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
