import { Request, Response } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "../app";

export const getBeatmapImage = async (req: Request, res: Response) => {
  const { id } = req.params; 

  try {
    const fileKey = `beatmaps/${id}/cover.png`;

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: fileKey,
    });

    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });

    res.setHeader("Cache-Control", "public, max-age=3600");

    return res.redirect(signedUrl);

  } catch (err) {
    console.error(err);
    return res.status(404).send("Image not found on R2");
  }
};
