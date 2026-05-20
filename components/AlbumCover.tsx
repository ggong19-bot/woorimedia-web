"use client";

import { useState } from "react";

// 앨범 커버 — coverUrl 이 있고 로드 성공하면 이미지, 없거나 404 면 브랜드 마크 placeholder.
// 커버는 공개 버킷(album-art) 컨벤션 URL 이라 항상 값이 오지만 파일이 없으면 404 → fallback.
export default function AlbumCover({
  coverUrl,
  alt,
  className,
  rounded = false,
  markSize = 96,
}: {
  coverUrl?: string | null;
  alt?: string;
  className?: string;
  rounded?: boolean;
  markSize?: number;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = coverUrl && !failed;

  return (
    <div
      className={className}
      style={{
        aspectRatio: "1 / 1",
        background: showImg
          ? "var(--woori-ink)"
          : "linear-gradient(150deg, #2a2a2a, #0a0a0a)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: rounded ? 8 : 0,
      }}
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coverUrl}
          alt={alt || "album cover"}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          width={markSize}
          height={markSize}
          fill="none"
          stroke="var(--woori-paper)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.85 }}
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M9 8 L11 16 L13 11 L15 16 L17 8" />
        </svg>
      )}
    </div>
  );
}
