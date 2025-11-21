import { Request, Response, NextFunction } from "express";
import unzipper from "unzipper";
import fs from "fs";

export const unzipAndParseOsab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Soubor nebyl nahrán." });
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
        } catch (err) {
          return res.status(400).json({ error: "Soubor .osab není validní JSON." });
        }
      }
    }

    fs.unlink(zipPath, () => {});

    if (!osabContent) {
      return res.status(400).json({ error: "ZIP neobsahuje .osab soubor." });
    }

    (req as any).osab = osabContent;

    next();
  } catch (error) {
    console.error("Chyba při rozbalování:", error);
    return res.status(500).json({ error: "Chyba při rozbalování ZIP." });
  }
};