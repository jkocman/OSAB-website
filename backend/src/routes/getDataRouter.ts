import { Router } from "express";
import path from "path";
import fs from "fs";

const router = Router();
const filePath = path.join(process.cwd(), "data", "levels.json");

router.get("/", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Nelze načíst levels.json" });
    }

    res.json(JSON.parse(data));
  });
});

export default router;