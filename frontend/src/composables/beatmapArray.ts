import osab from '../assets/img/osab.jpeg'
import { getData, getBeatmapImage } from './api'

// for now static, later it will be from loging in.
const STATIC_BEATMAP = {
  creator: 'Krooby',
  downloads: 0,
}

export async function loadBeatmaps() {
  const serverData = await getData();

  const beatmaps = await Promise.all(
    serverData.map(async (item: any) => {
      let img;

      try {
        console.log("Načítám obrázek pro ID:", item.id);
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
        ...STATIC_BEATMAP,
        ...item,
        img,
        tags: dynamicTags
      };
    })
  );

  return beatmaps;
}