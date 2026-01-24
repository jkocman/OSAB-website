import osab from '../assets/img/osab.jpeg'
import { getAllBeatmaps, getUserBeatmaps, getBeatmapImage } from './api'

export async function loadBeatmaps() {
  const serverData = await getAllBeatmaps();

  const beatmaps = await Promise.all(
    serverData.map(async (item: any) => {
      let img;

      try {
        img = await getBeatmapImage(item.id);
      } catch {
        img = osab;
      }

      const dynamicTags = [];
      const length = item.length || 0;

      if (length < 50) {
        dynamicTags.push('Short');
      } else if (length >= 50 && length < 120) {
        dynamicTags.push('Normal');
      } else if( length >= 120 && length < 180) {
        dynamicTags.push('Long');
      } else{
        dynamicTags.push('Marathon');
      }

      if (item.downloads > 250) {
        dynamicTags.push('Popular Only');
      }

      return {
        ...item,
        img,
        tags: dynamicTags
      };
    })
  );

  return beatmaps;
}

export async function loadUserBeatmaps(userId: number) {
  const serverData = await getUserBeatmaps(userId);

  const beatmaps = await Promise.all(
    serverData.map(async (item: any) => {
      let img;

      try {
        img = await getBeatmapImage(item.id);
      } catch {
        img = osab;
      }

      return {
        ...item,
        img,
      };
    })
  );

  return beatmaps;
}