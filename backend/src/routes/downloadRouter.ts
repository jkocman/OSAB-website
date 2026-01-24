import { Router } from "express";
import path from "path";
import archiver from "archiver";
import fs from "fs";

const router = Router();

router.get("/game/:variant", (req, res) => {
  const { variant } = req.params;

  if (!["osab_experimental", "osab_stable"].includes(variant)) {
    return res.status(400).json({ error: "Neplatná verze hry" });
  }

  const fileName = `${variant}.zip`;

  const filePath = path.join(process.cwd(), "files", fileName);

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error(err);
      res.status(404).json({ error: "Soubor nenalezen" });
    }
  });
});

router.get("/beatmap/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const uploadsDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadsDir)) {
      return res.status(404).json({ error: "Složka uploads neexistuje" });
    }

    const items = fs.readdirSync(uploadsDir);
    const targetFolder = items.find(item => {
      const itemPath = path.join(uploadsDir, item);
      return fs.lstatSync(itemPath).isDirectory() && item.endsWith(`-${id}`);
    });

    if (!targetFolder) {
      console.log(`Složka pro ID ${id} nebyla v ${uploadsDir} nalezena.`);
      return res.status(404).json({ error: "Složka s beatmapou nenalezena" });
    }

    const fullPath = path.join(uploadsDir, targetFolder);

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${targetFolder}.zip"`);

    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => {
      console.error("Archiver error:", err);
      if (!res.headersSent) {
        res.status(500).send({ error: "Chyba při komprimaci" });
      }
    });

    archive.pipe(res);
    archive.directory(fullPath, false);
    
    await archive.finalize();

  } catch (error) {
    console.error("Server error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Interní chyba serveru" });
    }
  }
});

export default router;
