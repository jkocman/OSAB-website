import { Request, Response, NextFunction } from "express";
import unzipper from "unzipper";
import fs from "fs";
import path from "path";
import { nextNumber } from "../middlewares/levelIdMiddleware";

export const unzipAndParseOsab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400);
    }

    if (!req.file.originalname.endsWith(".zip")) {
      return res.status(400);
    }

    const zipPath = req.file.path;
    const directory = await unzipper.Open.file(zipPath);

    let osabContent: any = null;

    for (const file of directory.files) {
      if (file.path.endsWith(".osab")) {
        const buffer = await file.buffer();
        const text = buffer.toString("utf-8");

        try {
          osabContent = JSON.parse(text);
        } catch {
          return res
            .status(400)
            .json({ error: "not a json file" });
        }
        break;
      }
    }

    if (!osabContent || !osabContent.meta) {
      return res.status(400).json({
        error: ".osab file with no meta found."
      });
    }

    const levelName = osabContent.meta.name;
    const levelId = nextNumber();

    if (!levelName || !levelId) {
      return res.status(400).json({
        error: "invalid .osab meta data"
      });
    }

    const safeName = levelName.replace(/[^a-z0-9-_]/gi, "_");
    const targetDir = path.join(process.cwd(), "uploads", `${safeName}-${levelId}`);

    fs.mkdirSync(targetDir, { recursive: true });

    for (const file of directory.files) {
      const outputPath = path.join(targetDir, file.path);

      if (file.type === "Directory") {
        fs.mkdirSync(outputPath, { recursive: true });
        continue;
      }

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      const readStream = file.stream();
      const writeStream = fs.createWriteStream(outputPath);

      await new Promise<void>((resolve, reject) => {
        readStream
          .pipe(writeStream)
          .on("finish", resolve)
          .on("error", reject);
      });
    }

    fs.unlinkSync(zipPath);

    (req as any).osab = osabContent;
    (req as any).levelDir = targetDir;

    next();
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
};
