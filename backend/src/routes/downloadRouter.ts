import { Router } from "express";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "../app";

const router = Router();

router.get("/game/:variant", async (req, res) => {
  const { variant } = req.params;

  if (!["osab_experimental", "osab_stable"].includes(variant)) {
    return res.status(400);
  }

  const fileKey = `game/${variant}.zip`;

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: fileKey,
    });

    const downloadUrl = await getSignedUrl(r2, command, { expiresIn: 60 });

    res.json({ url: downloadUrl });
  } catch (err) {
    console.error("R2 download error:", err);
    res.status(404);
  }
});

router.get("/beatmap/:id", async (req, res) => {
  const { id } = req.params;
  const prefix = `beatmaps/${id}/`;

  try {
    const listCmd = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET,
      Prefix: prefix,
    });
    const listed = await r2.send(listCmd);

    const zipFile = listed.Contents?.find((f) => f.Key?.endsWith(".zip"));

    if (!zipFile || !zipFile.Key) {
      return res.status(404);
    }

    const downloadCmd = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: zipFile.Key,
    });

    const url = await getSignedUrl(r2, downloadCmd, { expiresIn: 900 });
    res.redirect(url);
  } catch (err) {
    res.status(500);
  }
});

export default router;
