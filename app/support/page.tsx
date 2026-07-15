"use client";

import { useState } from "react";

const faqs = [
  {
    q: "USB를 분실하면 어떻게 되나요?",
    a: "활성화된 USB는 계정에 영구 귀속됩니다. 분실하시더라도 같은 계정으로 로그인하면 등록된 라이브러리에 계속 접근하실 수 있어요. (단, USB 자체는 한정판 콜렉터블이라 재발급은 불가)",
  },
  {
    q: "인터넷 연결 없이도 재생이 되나요?",
    a: "네. USB만 꽂혀 있으면 인터넷·계정 없이도 재생됩니다. 활성화된 후 다운로드한 콘텐츠는 USB 없이도 재생되지만, 이 경우엔 로그인 상태 확인이 필요합니다.",
  },
  {
    q: "어떤 음질로 제공되나요?",
    a: "기본 WAV 무손실 24-bit (원본 마스터 그대로) + 4K 이상 고화질 영상. 한정판은 24-bit/96kHz 이상 또는 DSD 포맷도 제공. 정확한 사양은 박스 인증서를 확인해주세요.",
  },
  {
    q: "어떤 디바이스에서 사용 가능한가요?",
    a: "현재 Android · macOS, 곧 Windows · 웹 · TV OS(Tizen, WebOS) 순으로 지원 예정입니다. 한 번 활성화하면 모든 지원 디바이스에서 동일한 라이브러리에 접근하실 수 있어요.",
  },
  {
    q: "USB 미디어는 어디서 사나요?",
    a: "USB 미디어는 각 제작사·기획사가 발행하고 판매합니다. 우리미디어는 발주 받은 USB의 제조·암호화·앱 운영을 담당합니다. 구매 가능한 라인업은 곧 안내 예정입니다.",
  },
  {
    q: "제작사인데 우리미디어와 USB 미디어를 만들고 싶어요.",
    a: "환영합니다. 발주 안내는 [파트너 페이지]에서 확인하시거나, support@woori-media.com 으로 직접 연락주세요. 30분 미팅으로 시작해서 평균 8주 안에 출시 가능합니다.",
  },
];

export default function SupportPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="bg-white">
      <section className="bg-navy-gradient">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="text-xs font-extrabold tracking-[0.3em] text-gold-light">
            SUPPORT
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            자주 묻는 질문
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <ul className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={i}
                className="rounded-xl border border-divider bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-bg-soft"
                >
                  <span className="text-base font-extrabold text-navy-deep">
                    Q. {f.q}
                  </span>
                  <span
                    className={`shrink-0 text-gold-deep transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-divider px-5 py-4 text-sm leading-relaxed text-text-muted">
                    {f.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div id="terms" className="mt-16 border-t border-divider pt-12">
          <h2 className="text-2xl font-extrabold text-navy-deep">이용약관</h2>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            한정판 콘텐츠 사용 약관 · 사용자 권리·의무 · 분쟁 해결 등 상세
            약관 페이지가 준비 중입니다. 출시 직전 공개됩니다.
          </p>
        </div>

        <div id="privacy" className="mt-16 border-t border-divider pt-12">
          <h2 className="text-2xl font-extrabold text-navy-deep">
            개인정보처리방침
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            수집하는 개인정보 항목 · 이용 목적 · 보관 기간 · 제3자 제공 ·
            사용자 권리 등을 정리한 방침이 준비 중입니다.
          </p>
        </div>
      </section>
    </main>
  );
}
