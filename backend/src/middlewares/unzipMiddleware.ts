import { Request, Response, NextFunction } from "express";
import unzipper from "unzipper";
import fs from "fs";
import path from "path";
import { nextNumber } from "./levelIdMiddleware";

export const unzipAndParseOsab = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const zipPath = req.file.path;

    const MAX_SIZE_BYTES = 20 * 1024 * 1024;
    if (req.file.size > MAX_SIZE_BYTES) {
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      return res.status(413).json({ error: "ZIP file is too large (max 20MB)" });
    }

    if (!req.file.originalname.endsWith(".zip")) {
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      return res.status(400).json({ error: "Not a zip file" });
    }

    const directory = await unzipper.Open.file(zipPath);

    const uncompressedSize = directory.files.reduce((acc, file) => acc + file.uncompressedSize, 0);
    if (uncompressedSize > MAX_SIZE_BYTES) {
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      return res.status(413).json({ error: "Extracted content exceeds 20MB limit" });
    }

    const allFiles = directory.files.filter(f => 
      f.type === "File" && 
      !f.path.split('/').some(part => part.startsWith('.') || part === "__MACOSX")
    );

    const osabFiles = allFiles.filter(f => f.path.toLowerCase().endsWith(".osab"));
    const audioFiles = allFiles.filter(f => /\.(mp3|ogg)$/i.test(f.path));
    const imageFiles = allFiles.filter(f => /\.(png|jpg|jpeg)$/i.test(f.path));

    if (osabFiles.length !== 1) {
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      return res.status(400).json({ error: "ZIP must contain exactly one .osab file." });
    }

    if (audioFiles.length > 1 || imageFiles.length > 1) {
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      return res.status(400).json({ error: "ZIP contains too many audio or image files (max 1 of each)." });
    }

    const validCount = osabFiles.length + audioFiles.length + imageFiles.length;
    if (allFiles.length !== validCount) {
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      return res.status(400).json({ error: "ZIP contains forbidden file types or extra files." });
    }

    const osabFile = osabFiles[0];
    let buffer: any = "";
    if(osabFile){
      buffer = await osabFile.buffer();
    }
    let osabContent: any = null;
    try {
      osabContent = JSON.parse(buffer.toString("utf-8"));
    } catch {
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      return res.status(400).json({ error: "Invalid .osab JSON" });
    }

    if (!osabContent || !osabContent.meta) {
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      return res.status(400).json({ error: ".osab file with no meta found." });
    }

    const levelId = nextNumber();
    const safeName = (osabContent.meta.name || "unnamed").replace(/[^a-z0-9-_]/gi, "_");
    const targetDir = path.join(process.cwd(), "uploads", `${safeName}-${levelId}`);

    fs.mkdirSync(targetDir, { recursive: true });

    const filesToExtract = [...osabFiles, ...audioFiles, ...imageFiles];

    for (const file of filesToExtract) {
      const outputPath = path.join(targetDir, path.basename(file.path));
      
      await new Promise<void>((resolve, reject) => {
        file.stream()
          .pipe(fs.createWriteStream(outputPath))
          .on("finish", () => resolve())
          .on("error", (err) => reject(err));
      });
    }

    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

    (req as any).osab = osabContent;
    (req as any).levelDir = targetDir;
    (req as any).assignedId = levelId;

    next();
  } catch (err) {
    console.error("Unzip error:", err);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    return res.status(500).json({ error: "Internal unzip error" });
  }
};