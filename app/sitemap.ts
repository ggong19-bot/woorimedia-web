import type { MetadataRoute } from "next";

// 정적 사이트맵 — 마케팅 페이지만 노출. play.woori-media.com (플레이어) 는
// 별도 호스트 + 인증 필수라 검색 노출 대상 아님.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://woori-media.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/product`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/company`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
