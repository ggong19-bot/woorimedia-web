// 헤어라인 브랜드 마크 — 100×100 viewBox, currentColor 로 색 제어.
// 크기는 부모의 .mark 컨테이너 CSS 가 결정 (site.css 참조).
export default function Mark({ className }: { className?: string }) {
  return (
    <span className={className ? `mark ${className}` : "mark"} aria-hidden>
      <svg viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.6" />
        <polyline
          points="28,34 38,68 50,48 62,68 72,34"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
      </svg>
    </span>
  );
}
