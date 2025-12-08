import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const processOsab = async (req: Request, res: Response) => {
  try {
    const osab = (req as any).osab;

    if (!osab || !osab.meta) {
      return res.status(400).json({ error: "Soubor .osab neobsahuje meta data." });
    }

    const meta = osab.meta;
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "levels.json");

    const result = {
      id: nextNumber(filePath),
      idGame: meta.id,
      name: meta.name,
      description: meta.description,
      length: meta.lenght,
      diff: meta.diff
    };

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
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
      message: "Meta data byla uložena do JSON souboru.",
      saved: result
    });
  } catch (err) {
    console.error("Chyba při ukládání:", err);
    res.status(500).json({ error: "Chyba při zpracování meta dat." });
  }
};

function nextNumber(filePath: string){

  let currentId = 0;

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    if (raw.trim().length > 0) {
      const data = JSON.parse(raw);
      currentId = data.reduce((max: number, item: any) => {
        return item.id > max ? item.id : max;
      }, 0);
    }
  }

  return currentId + 1;
}
