import { Request, Response } from "express";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "../app";

export const getBeatmapImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const prefix = `beatmaps/${id}/`;

  try {
    const listCmd = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET!,
      Prefix: prefix
    });
    
    const listed = await r2.send(listCmd);

    const imageFile = listed.Contents?.find(f => 
      f.Key && /\.(png|jpg|jpeg|webp)$/i.test(f.Key)
    );

    if (!imageFile) {
      const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: 'default-data/devushka-neko-sakura-veer.jpg',
      })
      const newImageUrl = await getSignedUrl(r2, command, {expiresIn: 3600});
      console.log("Fallback image URL:", newImageUrl);
      return res.redirect(newImageUrl);
    }

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: imageFile.Key,
    });

    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });
    return res.redirect(signedUrl);

  } catch (err) {
    console.error(err);
    return res.status(500).send("R2 Error");
  }
};