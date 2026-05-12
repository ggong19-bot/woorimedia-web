export const metadata = {
  title: "개인정보 처리방침 — 우리미디어",
  description: "우리미디어 서비스의 개인정보 수집·이용·보관·파기에 관한 방침",
};

const LAST_UPDATED = "2026-05-08";

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <section className="bg-navy-gradient">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-extrabold tracking-[0.3em] text-gold-light">
            PRIVACY POLICY
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            개인정보 처리방침
          </h1>
          <p className="mt-3 text-sm text-white/70">
            최종 업데이트: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16 prose prose-slate">
        <p className="text-text-muted leading-relaxed">
          우리미디어(이하 &ldquo;회사&rdquo;)는 개인정보보호법 등 관련 법령을 준수하여
          이용자의 개인정보를 보호하고, 안전하게 처리하기 위해 다음과 같은
          처리방침을 두고 있습니다.
        </p>

        <Section title="1. 수집하는 개인정보 항목">
          <p>회사는 서비스 제공을 위해 다음 항목을 수집합니다.</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>
              <strong>회원 가입 시</strong>: 이메일 주소, 닉네임(또는 이름),
              프로필 이미지(소셜 로그인 제공자가 제공한 경우)
            </li>
            <li>
              <strong>소셜 로그인 연동 시</strong>: 카카오·네이버·구글·Apple 등
              인증 제공자의 고유 식별자(provider_uid), 표시명, 이메일
            </li>
            <li>
              <strong>서비스 이용 시</strong>: 등록된 USB 시리얼 번호,
              디바이스 식별자, 앱 버전, 플랫폼 정보, 접속 일시
            </li>
            <li>
              <strong>결제 시(향후)</strong>: 결제 대행사가 제공하는 거래 번호
              및 결제 결과(카드 번호 등 금융 정보는 회사가 직접 보관하지
              않습니다)
            </li>
          </ul>
        </Section>

        <Section title="2. 개인정보 수집 및 이용 목적">
          <ul className="list-disc pl-6 space-y-1">
            <li>회원 인증 및 라이브러리 동기화</li>
            <li>USB 시리얼 기반 콘텐츠 활성화 및 라이선스 검증</li>
            <li>서비스 운영·유지·개선 및 고객 지원</li>
            <li>법령상 의무 이행 및 분쟁 대응</li>
            <li>
              마케팅 정보 제공(별도 동의 시에만, 본 약관 동의와 무관)
            </li>
          </ul>
        </Section>

        <Section title="3. 개인정보 보유 및 이용 기간">
          <p>
            회사는 법령에서 정한 기간 또는 이용자가 동의한 기간 동안
            개인정보를 보유합니다.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>회원 정보: 회원 탈퇴 시까지(탈퇴 후 즉시 파기)</li>
            <li>
              결제 및 거래 기록: 전자상거래법에 따라 5년(향후 결제 도입 시
              적용)
            </li>
            <li>로그인 기록 및 접속 로그: 통신비밀보호법에 따라 3개월</li>
          </ul>
        </Section>

        <Section title="4. 개인정보의 제3자 제공">
          <p>
            회사는 이용자의 개인정보를 외부에 제공하지 않습니다. 다만 다음의
            경우에는 예외로 합니다.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>이용자가 사전에 명시적으로 동의한 경우</li>
            <li>
              법령에 의해 요구되거나, 수사 목적으로 법령에 정해진 절차와
              방법에 따라 수사기관이 요구한 경우
            </li>
          </ul>
        </Section>

        <Section title="5. 개인정보 처리의 위탁">
          <p>회사는 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>
              <strong>Supabase, Inc.</strong> — 데이터베이스 및 파일 스토리지
              호스팅 (미국)
            </li>
            <li>
              <strong>Vercel, Inc.</strong> — 웹 서비스 및 API 호스팅 (미국)
            </li>
            <li>
              <strong>Kakao Corp. / NAVER Corp. / Google LLC / Apple Inc.</strong>
              {" "}— 소셜 로그인 인증 (각 제공자 정책 적용)
            </li>
          </ul>
        </Section>

        <Section title="6. 이용자의 권리">
          <p>
            이용자는 언제든지 다음의 권리를 행사할 수 있습니다. 행사 방법은
            본 방침 §10 연락처를 참고하세요.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>개인정보 열람·정정·삭제 요구</li>
            <li>개인정보 처리 정지 요구</li>
            <li>처리되는 개인정보의 사본 전송 요구(데이터 이동권)</li>
            <li>동의 철회 및 회원 탈퇴</li>
          </ul>
        </Section>

        <Section title="7. 개인정보의 파기 절차 및 방법">
          <p>
            보유 기간 경과 또는 처리 목적 달성 등 개인정보가 불필요하게 되었을
            때 지체 없이 파기합니다.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>전자적 파일: 복구 불가능한 방법으로 영구 삭제</li>
            <li>출력물: 분쇄 또는 소각</li>
          </ul>
        </Section>

        <Section title="8. 안전성 확보 조치">
          <ul className="list-disc pl-6 space-y-1">
            <li>전송 구간 암호화(HTTPS/TLS)</li>
            <li>비밀번호 및 인증 토큰의 해시 저장</li>
            <li>USB 콘텐츠는 USB 시리얼 기반 AES-256으로 암호화하여 저장</li>
            <li>접근 권한 최소화 및 정기 점검</li>
          </ul>
        </Section>

        <Section title="9. 만 14세 미만 이용자에 대한 사항">
          <p>
            회사는 만 14세 미만 아동의 회원 가입을 받지 않습니다. 만 14세 미만
            아동의 개인정보가 확인되는 경우 즉시 파기합니다.
          </p>
        </Section>

        <Section title="10. 개인정보 보호책임자 및 문의처">
          <ul className="list-disc pl-6 space-y-1">
            <li>개인정보 보호책임자: 박숭규</li>
            <li>
              이메일:{" "}
              <a
                href="mailto:privacy@woori-media.com"
                className="text-gold-deep underline"
              >
                privacy@woori-media.com
              </a>
            </li>
            <li>
              개인정보 분쟁 조정 기관: 개인정보분쟁조정위원회 (1833-6972,{" "}
              <a
                href="https://www.kopico.go.kr"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gold-deep underline"
              >
                kopico.go.kr
              </a>
              )
            </li>
          </ul>
        </Section>

        <Section title="11. 변경 통지">
          <p>
            본 처리방침은 법령·정책 또는 보안 기술의 변경에 따라 내용의 추가·
            삭제 및 수정이 있을 수 있으며, 변경 시 최소 7일 전 공지합니다.
            중요한 변경의 경우 30일 전 통지합니다.
          </p>
        </Section>
      </article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-extrabold text-navy-deep">{title}</h2>
      <div className="mt-3 text-text-muted leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}
