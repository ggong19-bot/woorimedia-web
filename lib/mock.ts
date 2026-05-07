// lib/mock.ts — 데모 라이브러리 데이터
export type Track = {
  id: string;
  trackNumber: number;
  title: string;
  artist: string;
  durationSeconds: number;
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  edition?: string;
  editionNumber?: number;
  editionTotal?: number;
  audioFormat: string; // FLAC
  bitDepth: number;
  sampleRateHz: number;
  channels: number;
  tracks: Track[];
};

export const DEMO_ALBUM: Album = {
  id: "demo-1",
  title: "Woori Media Demo",
  artist: "Various Artists",
  releaseDate: "2026-04-30",
  edition: "Demo Edition",
  editionNumber: 1,
  editionTotal: 100,
  audioFormat: "WAV",
  bitDepth: 16,
  sampleRateHz: 44100,
  channels: 2,
  tracks: [
    { id: "0001", trackNumber: 1, title: "Best Mistake (feat. Big Sean)", artist: "Ariana Grande", durationSeconds: 233 },
    { id: "0002", trackNumber: 2, title: "Girlfriend", artist: "Avril Lavigne", durationSeconds: 215 },
    { id: "0003", trackNumber: 3, title: "Stuck with U", artist: "Ariana Grande, Justin Bieber", durationSeconds: 228 },
    { id: "0004", trackNumber: 4, title: "Sugar", artist: "Maroon 5", durationSeconds: 235 },
    { id: "0005", trackNumber: 5, title: "TRAINWRECK", artist: "Anne-Marie", durationSeconds: 192 },
    { id: "0006", trackNumber: 6, title: "Telephone (feat. Beyoncé)", artist: "Lady Gaga", durationSeconds: 245 },
    { id: "0007", trackNumber: 7, title: "come out and play", artist: "Billie Eilish", durationSeconds: 211 },
    { id: "0008", trackNumber: 8, title: "paper", artist: "Kenzie", durationSeconds: 195 },
  ],
};

export const ALBUMS: Album[] = [DEMO_ALBUM];

export function findAlbum(id: string): Album | undefined {
  return ALBUMS.find((a) => a.id === id);
}
