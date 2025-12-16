import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { nextNumber } from "../middlewares/levelIdMiddleware";

export const processOsab = async (req: Request, res: Response) => {
  try {
    const osab = (req as any).osab;
    const levelDir = (req as any).levelDir;

    if (!osab || !osab.meta) {
      return res.status(400).json({
        error: "Soubor .osab neobsahuje meta data."
      });
    }

    const meta = osab.meta;
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "levels.json");

    const result = {
      id: nextNumber(),
      idGame: meta.id,
      name: meta.name,
      description: meta.description,
      length: meta.length,
      diff: meta.diff,
      assetsPath: levelDir
    };

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let jsonData: any[] = [];

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      if (raw.trim().length > 0) {
        jsonData = JSON.parse(raw);
      }
    }

    jsonData.push(result);

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    res.json({
      message: "Level byl úspěšně uložen.",
      saved: result
    });
  } catch (err) {
    console.error("Chyba při ukládání:", err);
    res.status(500).json({ error: "Chyba při zpracování meta dat." });
  }
};