import fs from "fs";
import path from "path";

export function nextNumber() {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "levels.json");
  let currentId = 0;

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    if (raw.trim().length > 0) {
      const data = JSON.parse(raw);
      currentId = data.reduce((max: number, item: any) => {
        return item.id > max ? item.id : max;
      }, 0);
    }
  }

  return currentId + 1;
}
