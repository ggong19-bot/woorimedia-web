import type { MetadataRoute } from "next";

// robots.txt — 마케팅 사이트 전 페이지 크롤 허용, 플레이어/페어링은 차단.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/play/", "/pair/"],
      },
    ],
    sitemap: "https://woori-media.com/sitemap.xml",
  };
}
