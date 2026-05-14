"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { AlbumDetail as Album, Track } from "./types";
import { api } from "./api";

export type RepeatMode = "off" | "all" | "one";

type PlayerState = {
  album: Album | null;
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  currentTime: number; // seconds
  duration: number; // seconds
  isLoading: boolean; // signed URL fetch + buffer 중
  error: string | null;
  fullOpen: boolean; // 전체 화면 플레이어 표시 여부
};

type PlayerContextValue = PlayerState & {
  setQueue: (album: Album, startIndex: number) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  stop: () => void;
  current: () => Track | null;
  seek: (timeSeconds: number) => void;
  jumpTo: (index: number) => void;
  openFull: () => void;
  closeFull: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [s, setS] = useState<PlayerState>({
    album: null,
    queue: [],
    currentIndex: -1,
    isPlaying: false,
    shuffle: false,
    repeat: "off",
    currentTime: 0,
    duration: 0,
    isLoading: false,
    error: null,
    fullOpen: false,
  });

  // repeat 모드를 ended 핸들러 안에서 stale 안 되게 ref로
  const stateRef = useRef(s);
  useEffect(() => {
    stateRef.current = s;
  }, [s]);

  // ── 1) Audio element 생명주기 ──────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const a = new Audio();
    a.preload = "auto";
    audioRef.current = a;

    const onTime = () => setS((p) => ({ ...p, currentTime: a.currentTime }));
    const onMeta = () =>
      setS((p) => ({ ...p, duration: isFinite(a.duration) ? a.duration : 0 }));
    const onPlay = () => setS((p) => ({ ...p, isPlaying: true }));
    const onPause = () => setS((p) => ({ ...p, isPlaying: false }));
    const onWaiting = () => setS((p) => ({ ...p, isLoading: true }));
    const onCanPlay = () => setS((p) => ({ ...p, isLoading: false }));
    const onError = () =>
      setS((p) => ({
        ...p,
        error: "오디오 디코딩 실패",
        isLoading: false,
      }));
    const onEnded = () => handleEnded();

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("waiting", onWaiting);
    a.addEventListener("canplay", onCanPlay);
    a.addEventListener("error", onError);
    a.addEventListener("ended", onEnded);

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("waiting", onWaiting);
      a.removeEventListener("canplay", onCanPlay);
      a.removeEventListener("error", onError);
      a.removeEventListener("ended", onEnded);
      a.pause();
      a.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 2) 트랙 변경 시 signed URL fetch & 재생 ─────────────
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (!s.album || s.currentIndex < 0) return;
    const track = s.queue[s.currentIndex];
    if (!track) return;

    let cancelled = false;
    setS((p) => ({
      ...p,
      isLoading: true,
      error: null,
      currentTime: 0,
      duration: 0,
    }));

    // 우선 stream-decrypt proxy 시도 (보안 모델: .wm 만 storage 에 보관).
    // 실패 시 옛 audioUrl 로 fallback (평문 wav 있는 데모1 같은 경우).
    const albumId = s.album.id;
    const tryStream = async () => {
      try {
        return await api.streamUrl(albumId, track.id);
      } catch {
        return await api.audioUrl(albumId, track.id);
      }
    };

    tryStream()
      .then((res) => {
        if (cancelled) return;
        a.src = res.url;
        a.load();
        return a.play();
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const msg =
          e instanceof Error
            ? e.message.includes("NOT_ACTIVATED")
              ? "이 앨범에 대한 등록 기록이 없습니다."
              : e.message.includes("AUDIO_NOT_FOUND")
                ? "음원 파일이 아직 업로드되지 않았습니다."
                : e.message
            : "재생 실패";
        setS((p) => ({ ...p, isLoading: false, error: msg }));
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.album?.id, s.currentIndex]);

  // ── 3) 액션 ────────────────────────────────────────────
  function setQueue(album: Album, startIndex: number) {
    setS((p) => ({
      ...p,
      album,
      queue: album.tracks,
      currentIndex: Math.max(
        0,
        Math.min(startIndex, album.tracks.length - 1),
      ),
    }));
  }

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (stateRef.current.queue.length === 0) return;
    if (a.paused) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }

  function handleEnded() {
    const cur = stateRef.current;
    const a = audioRef.current;
    if (!a) return;
    if (cur.repeat === "one") {
      a.currentTime = 0;
      a.play().catch(() => {});
      return;
    }
    advance(1);
  }

  function advance(delta: 1 | -1) {
    setS((p) => {
      if (p.queue.length === 0) return p;
      let ni = p.currentIndex + delta;
      if (delta === 1 && ni >= p.queue.length) {
        if (p.shuffle) ni = Math.floor(Math.random() * p.queue.length);
        else if (p.repeat === "all") ni = 0;
        else return { ...p, isPlaying: false };
      }
      if (delta === -1 && ni < 0) {
        if (p.repeat === "all") ni = p.queue.length - 1;
        else return p;
      }
      return { ...p, currentIndex: ni };
    });
  }

  function next() {
    if (stateRef.current.shuffle) {
      const len = stateRef.current.queue.length;
      if (len > 1) {
        setS((p) => ({
          ...p,
          currentIndex: Math.floor(Math.random() * p.queue.length),
        }));
        return;
      }
    }
    advance(1);
  }

  function prev() {
    const a = audioRef.current;
    if (a && a.currentTime > 5) {
      a.currentTime = 0;
      return;
    }
    advance(-1);
  }

  function toggleShuffle() {
    setS((p) => ({ ...p, shuffle: !p.shuffle }));
  }

  function cycleRepeat() {
    setS((p) => {
      const order: RepeatMode[] = ["off", "all", "one"];
      const i = order.indexOf(p.repeat);
      return { ...p, repeat: order[(i + 1) % order.length] };
    });
  }

  function stop() {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.src = "";
    }
    setS({
      album: null,
      queue: [],
      currentIndex: -1,
      isPlaying: false,
      shuffle: false,
      repeat: "off",
      currentTime: 0,
      duration: 0,
      isLoading: false,
      error: null,
      fullOpen: false,
    });
  }

  function current(): Track | null {
    if (s.currentIndex < 0 || s.currentIndex >= s.queue.length) return null;
    return s.queue[s.currentIndex];
  }

  function seek(timeSeconds: number) {
    const a = audioRef.current;
    if (a && isFinite(timeSeconds)) {
      a.currentTime = Math.max(0, Math.min(timeSeconds, a.duration || 0));
    }
  }

  // 큐의 특정 인덱스로 직접 점프 (UP NEXT 목록에서 곡 클릭).
  function jumpTo(index: number) {
    setS((p) => {
      if (index < 0 || index >= p.queue.length || index === p.currentIndex) {
        return p;
      }
      return { ...p, currentIndex: index };
    });
  }

  function openFull() {
    setS((p) => ({ ...p, fullOpen: true }));
  }

  function closeFull() {
    setS((p) => ({ ...p, fullOpen: false }));
  }

  return (
    <PlayerContext.Provider
      value={{
        ...s,
        setQueue,
        togglePlay,
        next,
        prev,
        toggleShuffle,
        cycleRepeat,
        stop,
        current,
        seek,
        jumpTo,
        openFull,
        closeFull,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}

export function fmt(sec: number) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
