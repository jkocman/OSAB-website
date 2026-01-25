import { Response } from "express";
import fs from "fs";
import path from "path";
import * as mm from "music-metadata";
import archiver from "archiver";
import { Upload } from "@aws-sdk/lib-storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { PassThrough } from "stream";
import { r2 } from "../app";
import { AuthRequest } from "../middlewares/authMiddleware";

export const processOsab = async (req: AuthRequest, res: Response) => {
  const levelDir: string = (req as any).levelDir;
  const id = (req as any).assignedId;

  try {
    const userId = req.user!.id;
    const username = req.user!.username;
    const osab = (req as any).osab;
    const meta = osab.meta;
    const dateUploaded = new Date().toISOString();

    const files = fs.readdirSync(levelDir);

    const audioFile = files.find((f) => /\.(ogg|mp3)$/i.test(f));
    let musicAuthor: string | null = null;
    if (audioFile) {
      const metadata = await mm.parseFile(path.join(levelDir, audioFile));
      musicAuthor =
        metadata.common.artist || metadata.common.albumartist || null;
    }

    const imageFile = files.find((f) => /\.(png|jpg|jpeg)$/i.test(f));
    if (imageFile) {
      await r2.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET!,
          Key: `beatmaps/${id}/cover.png`,
          Body: fs.readFileSync(path.join(levelDir, imageFile)),
          ContentType: "image/png",
        }),
      );
    }

    const passThrough = new PassThrough();
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(passThrough);
    archive.directory(levelDir, false);
    archive.finalize();

    const upload = new Upload({
      client: r2,
      params: {
        Bucket: process.env.R2_BUCKET!,
        Key: `beatmaps/${id}/${id}.zip`,
        Body: passThrough,
        ContentType: "application/zip",
      },
    });
    await upload.done();

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
      creatorId: userId,
      creatorName: username,
      downloads: 0,
    };

    const filePath = path.join(process.cwd(), "data", "levels.json");
    let jsonData = [];
    if (fs.existsSync(filePath)) {
      jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
    }
    jsonData.push(result);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    fs.rmSync(levelDir, { recursive: true, force: true });

    res.json({ saved: result });
  } catch (err) {
    console.error("R2 Upload Error:", err);
    if (fs.existsSync(levelDir))
      fs.rmSync(levelDir, { recursive: true, force: true });
    res.status(500).json({ error: "Internal server error during upload" });
  }
};
