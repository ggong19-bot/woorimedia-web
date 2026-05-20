// lib/types.ts — 백엔드 응답 형식과 일치하는 타입
// (POST /v1/auth/oauth, GET /v1/me/library, GET /v1/albums/:id 응답)

export type AudioSpec = {
  format: string; // 'WAV' | 'FLAC' | 'MP3' ...
  bitDepth: number;
  sampleRateHz: number;
  channels: number;
};

export type Edition = {
  label: string | null;
  number: number;
  total: number;
};

export type Track = {
  id: string;
  trackNumber: number;
  title: string;
  artist: string;
  durationSeconds: number;
  hasLyrics?: boolean;
  lyricsUrl?: string | null; // 공개 버킷 가사 텍스트 URL (has_lyrics 시)
  // 플레이리스트(크로스앨범 큐) 에서 트랙이 어느 앨범 출신인지. 단일 앨범 재생 시 undefined.
  // 재생 효과가 이 값 우선, 없으면 s.album?.id 로 fallback.
  sourceAlbumId?: string;
};

export type LibraryAlbum = {
  id: string;
  title: string;
  artist: string;
  releaseDate?: string | null;
  edition: Edition;
  audioSpec: AudioSpec;
  videoResolution?: string | null;
  trackCount: number;
  coverUrl?: string | null; // 공개 버킷 커버 URL (없으면 클라이언트가 마크 fallback)
  activatedAt?: string;
};

export type AlbumDetail = LibraryAlbum & {
  tracks: Track[];
};

export type WmUser = {
  uid: string;
  email: string;
  displayName: string;
  provider: string;
  initial: string;
};

export type AuthResponse = {
  user: {
    uid: string;
    email: string;
    displayName: string;
    provider: string;
  };
  tokens: {
    accessToken: string;
    expiresIn: number;
  };
};

export type ActivateResponse = {
  activation: { id: string; activatedAt: string };
  album: AlbumDetail | null;
};

export type DecryptionKeyResponse = {
  key: string;
  keyExpiresAt: string;
  albumId: string;
};
