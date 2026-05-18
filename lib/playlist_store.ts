// 웹 플레이리스트 — localStorage 영속화 + (선택) 백엔드 sync.
// 디자인 미러링: Flutter `playlist_store.dart` 와 동일 모델/동작.
// 단일 사용자 디바이스 가정 (계정별 동기화는 백엔드 엔드포인트로 별도 처리).

export type PlaylistEntry = {
  /** 출처 앨범 id (RegisteredAlbum.id) */
  albumId: string;
  /** 해당 앨범 매니페스트의 track id */
  trackId: string;
  /** UI 표시용 스냅샷 (앨범 사라져도 표시 가능) */
  titleSnapshot: string;
  artistSnapshot: string;
  durationSecondsSnapshot: number;
};

export type Playlist = {
  id: string;
  name: string;
  entries: PlaylistEntry[];
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

const STORAGE_KEY = "wm.playlists.v1";

function genId(): string {
  return `pl_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

function load(): Playlist[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr as Playlist[];
  } catch {
    return [];
  }
}

function persist(list: Playlist[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // quota 초과 시 무시 — 출시 후 메트릭 보고 정책 결정
  }
}

type Listener = (list: Playlist[]) => void;

class PlaylistStoreImpl {
  private _list: Playlist[] = [];
  private _listeners = new Set<Listener>();
  private _loaded = false;

  /** 첫 호출 시 localStorage 에서 로드. SSR 안전. */
  ensureLoaded() {
    if (this._loaded) return;
    this._list = load();
    this._loaded = true;
  }

  list(): Playlist[] {
    this.ensureLoaded();
    return this._list;
  }

  findById(id: string): Playlist | null {
    this.ensureLoaded();
    return this._list.find((p) => p.id === id) ?? null;
  }

  subscribe(fn: Listener): () => void {
    this.ensureLoaded();
    this._listeners.add(fn);
    fn(this._list);
    return () => {
      this._listeners.delete(fn);
    };
  }

  private _emit() {
    persist(this._list);
    for (const fn of this._listeners) fn(this._list);
  }

  create(name: string): Playlist {
    this.ensureLoaded();
    const now = new Date().toISOString();
    const p: Playlist = {
      id: genId(),
      name: name.trim() || "새 플레이리스트",
      entries: [],
      createdAt: now,
      updatedAt: now,
    };
    this._list = [p, ...this._list];
    this._emit();
    return p;
  }

  rename(id: string, name: string) {
    this.ensureLoaded();
    const now = new Date().toISOString();
    this._list = this._list.map((p) =>
      p.id === id ? { ...p, name: name.trim() || p.name, updatedAt: now } : p,
    );
    this._emit();
  }

  remove(id: string) {
    this.ensureLoaded();
    this._list = this._list.filter((p) => p.id !== id);
    this._emit();
  }

  /** entries 끝에 추가. 이미 존재하는 (albumId,trackId) 는 중복 추가 허용 (사용자 선택). */
  addEntry(playlistId: string, entry: PlaylistEntry) {
    this.ensureLoaded();
    const now = new Date().toISOString();
    this._list = this._list.map((p) =>
      p.id === playlistId
        ? { ...p, entries: [...p.entries, entry], updatedAt: now }
        : p,
    );
    this._emit();
  }

  removeEntry(playlistId: string, index: number) {
    this.ensureLoaded();
    const now = new Date().toISOString();
    this._list = this._list.map((p) => {
      if (p.id !== playlistId) return p;
      if (index < 0 || index >= p.entries.length) return p;
      const entries = p.entries.slice();
      entries.splice(index, 1);
      return { ...p, entries, updatedAt: now };
    });
    this._emit();
  }

  /** drag reorder — position 변경. */
  reorder(playlistId: string, fromIndex: number, toIndex: number) {
    this.ensureLoaded();
    const now = new Date().toISOString();
    this._list = this._list.map((p) => {
      if (p.id !== playlistId) return p;
      const entries = p.entries.slice();
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= entries.length ||
        toIndex >= entries.length
      )
        return p;
      const [moved] = entries.splice(fromIndex, 1);
      entries.splice(toIndex, 0, moved);
      return { ...p, entries, updatedAt: now };
    });
    this._emit();
  }
}

export const PlaylistStore = new PlaylistStoreImpl();
