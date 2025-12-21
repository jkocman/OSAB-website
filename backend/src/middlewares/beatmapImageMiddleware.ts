import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const getBeatmapImage = (req: Request, res: Response) => {
  const beatmapId = req.params.id; 

  const uploadsDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadsDir)) {
    return res.status(404).send("uploads directory not found");
  }

  const folders = fs.readdirSync(uploadsDir)
    .filter(dir => dir.split("-").pop() === beatmapId)
    .map(dir => ({
      name: dir,
      time: fs.statSync(path.join(uploadsDir, dir)).mtime.getTime()
    }));

  if (folders.length === 0) {
    return res.status(404).send("assets folder not found");
  }

  folders.sort((a, b) => b.time - a.time);
  const latestFolder = folders[0]?.name;
  if (!latestFolder) return res.status(404).send("Folder error");

  const assetsDir = path.join(uploadsDir, latestFolder);
  
  try {
    const files = fs.readdirSync(assetsDir);
    
    const imageFile = files.find((f) => {
      const ext = f.toLowerCase();
      return ext.endsWith(".png") || ext.endsWith(".jpg") || ext.endsWith(".jpeg");
    });

    if (!imageFile) {
      return res.status(404).send("image not found");
    }

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendFile(path.join(assetsDir, imageFile));
  } catch (err) {
    return res.status(500).send("Error reading assets directory");
  }
};
