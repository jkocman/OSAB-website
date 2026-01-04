import { Response } from "express";
import fs from "fs";
import path from "path";
import { nextNumber } from "../middlewares/levelIdMiddleware";
import * as mm from "music-metadata";
import { AuthRequest } from "../middlewares/authMiddleware";

export const processOsab = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const osab = (req as any).osab;
    const levelDir: string = (req as any).levelDir;
    const dateUploaded = new Date().toISOString();

    if (!osab || !osab.meta) {
      return res.status(400).json({
        error: "no metadata in osab file",
      });
    }

    const meta = osab.meta;
    const files = fs.readdirSync(levelDir);

    const audioFile = files.find(
      file =>
        file.toLowerCase().endsWith(".ogg") ||
        file.toLowerCase().endsWith(".mp3")
    );

    const normalizeArtist = (
      artist?: string | string[] | null
    ): string | null => {
      if (!artist) return null;
      if (Array.isArray(artist)) return artist.join(", ");
      return artist;
    };

    let musicAuthor: string | null = null;

    if (audioFile) {
      const audioPath = path.join(levelDir, audioFile);
      try {
        const metadata = await mm.parseFile(audioPath);
        musicAuthor =
          normalizeArtist(metadata.common.artist) ||
          normalizeArtist(metadata.common.albumartist) ||
          normalizeArtist(metadata.common.composer) ||
          null;
      } catch (err) {
        console.warn(err);
      }
    }

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "levels.json");
    const id = nextNumber();

    const result = {
      id,
      idGame: meta.id,
      name: meta.name,
      description: meta.description,
      length: meta.length,
      diff: meta.diff,
      imageUrl: `/beatmaps/${id}/image`,
      dateUploaded,
      musicAuthor,
      creatorId: userId
    };

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let jsonData: any[] = [];

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      if (raw.trim()) {
        jsonData = JSON.parse(raw);
      }
    }

    jsonData.push(result);

    fs.writeFileSync(
      filePath,
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );

    res.json({ saved: result });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
