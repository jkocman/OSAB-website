import osab from '../assets/img/osab.jpeg'
import { getData } from './api'

const STATIC_BEATMAP = {
  img: osab,
  artist: 'Krooby',
  creator: 'Krooby',
  downloads: 0,
  dateOfUpload: new Date("2023-01-01"),
  tags: ['popular-only', 'long']
}


export async function loadBeatmaps() {
  const serverData = await getData()

  return serverData.map((item: any) => ({
    ...STATIC_BEATMAP,
    ...item,
  }))
}
