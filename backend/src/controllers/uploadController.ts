import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "Soubor nebyl nahrán" });
  }

  res.json({
    message: "Soubor úspěšně nahrán!",
    file: req.file,
  });
};

export const processOsab = async (req: Request, res: Response) => {
  try {
    const osab = (req as any).osab;

    if (!osab || !osab.meta) {
      return res.status(400).json({
        error: "Soubor .osab neobsahuje meta data."
      });
    }

    const meta = osab.meta;

    const result = {
      id: meta.id,
      name: meta.name,
      description: meta.description,
      length: meta.lenght, // opraveno podle tvé struktury
      diff: meta.diff
    };

    // Cesta k JSON souboru
    const filePath = path.join(process.cwd(), "data", "levels.json");

    // Načti existující data
    let jsonData: any[] = [];

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      jsonData = JSON.parse(raw);
    }

    // Přidej nová meta data
    jsonData.push(result);

    // Ulož zpět
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    res.json({
      message: "Meta data byla uložena do JSON souboru.",
      saved: result
    });
  } catch (err) {
    console.error("Chyba při ukládání:", err);
    res.status(500).json({ error: "Chyba při zpracování meta dat." });
  }
};