import fs from "fs";
import path from "path";

export const getFolderSize = (dir: string): number => {
  let total = 0;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    console.log("checking size...");

    if (stats.isDirectory()) {
      total += getFolderSize(fullPath);
    } else {
      total += stats.size;
    }
  }

  return total;
};
