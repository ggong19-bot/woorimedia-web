"use client";

import type { CSSProperties, ReactNode } from "react";

const PLAYER_URL = "https://play.woori-media.com/play";

// 마케팅 페이지(서버 컴포넌트)의 "웹 플레이어" 진입점.
// 클릭 시 폰 비율(9:16, 450×820) 팝업으로 — 데스크톱에서 폰처럼. href 는 폴백.
export default function WebPlayerLink({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <a
      href={PLAYER_URL}
      onClick={(e) => {
        e.preventDefault();
        window.open(
          PLAYER_URL,
          "woori_player",
          "width=450,height=820,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes",
        );
      }}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
