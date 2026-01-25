import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "../app";
import fs from "fs";
import path from "path";

const DB_FILES = ["levels.json", "users.json"];
const DATA_DIR = path.join(process.cwd(), "data");

export const saveDbToR2 = async () => {
  for (const fileName of DB_FILES) {
    const filePath = path.join(DATA_DIR, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath);
        
        await r2.send(new PutObjectCommand({
          Bucket: process.env.R2_BUCKET!,
          Key: `db-backup/${fileName}`,
          Body: content,
          ContentType: "application/json",
        }));
      } catch (err) {
        console.log(err)
      }
    }
  }
};

export const loadDbFromR2 = async () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  for (const fileName of DB_FILES) {
    const filePath = path.join(dataDir, fileName);
    try {
      const data = await r2.send(new GetObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: `db-backup/${fileName}`,
      }));

      const stream = data.Body as any;
      const chunks: any[] = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      const content = Buffer.concat(chunks);
      if (content.length > 0) {
        fs.writeFileSync(filePath, content);
      }
    } catch (err: any) {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]");
      }
    }
  }
};