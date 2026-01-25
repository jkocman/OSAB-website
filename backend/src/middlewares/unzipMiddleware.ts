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

    if (!req.file.originalname.endsWith(".zip")) {
      return res.status(400).json({ error: "Not a zip file" });
    }

    const zipPath = req.file.path;
    const directory = await unzipper.Open.file(zipPath);

    let osabContent: any = null;

    for (const file of directory.files) {
      if (file.path.endsWith(".osab")) {
        const buffer = await file.buffer();
        try {
          osabContent = JSON.parse(buffer.toString("utf-8"));
        } catch {
          return res.status(400).json({ error: "Invalid .osab JSON" });
        }
        break;
      }
    }

    if (!osabContent || !osabContent.meta) {
      return res.status(400).json({ error: ".osab file with no meta found." });
    }

    const levelId = nextNumber();
    const safeName = osabContent.meta.name.replace(/[^a-z0-9-_]/gi, "_");
    const targetDir = path.join(
      process.cwd(),
      "uploads",
      `${safeName}-${levelId}`,
    );

    fs.mkdirSync(targetDir, { recursive: true });

    for (const file of directory.files) {
      const outputPath = path.join(targetDir, file.path);
      if (file.type === "Directory") {
        fs.mkdirSync(outputPath, { recursive: true });
        continue;
      }
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      await new Promise<void>((resolve, reject) => {
        file
          .stream()
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
    return res.status(500).json({ error: "Internal unzip error" });
  }
};
