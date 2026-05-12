export const metadata = {
  title: "이용약관 — 우리미디어",
  description: "우리미디어 서비스 이용약관",
};

const LAST_UPDATED = "2026-05-08";

export default function TermsPage() {
  return (
    <main className="bg-white">
      <section className="bg-navy-gradient">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-extrabold tracking-[0.3em] text-gold-light">
            TERMS OF SERVICE
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            이용약관
          </h1>
          <p className="mt-3 text-sm text-white/70">
            최종 업데이트: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-text-muted leading-relaxed">
          본 약관은 우리미디어(이하 &ldquo;회사&rdquo;)가 제공하는 USB 기반 한정판
          무손실 음원·영상 미디어 서비스 및 부속 앱(이하 &ldquo;서비스&rdquo;)의 이용에
          관한 조건을 규정합니다.
        </p>

        <Section title="제1조 (목적)">
          <p>
            본 약관은 회사가 제공하는 서비스의 이용 조건, 회사와 이용자의 권리·
            의무 및 책임사항을 정합니다.
          </p>
        </Section>

        <Section title="제2조 (정의)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>서비스</strong>: 회사가 제공하는 우리미디어 웹·모바일·
              TV·데스크톱 플레이어 및 관련 모든 콘텐츠
            </li>
            <li>
              <strong>이용자</strong>: 본 약관에 따라 서비스를 이용하는 회원
              또는 비회원
            </li>
            <li>
              <strong>USB</strong>: 회사가 발행한 한정판 미디어 USB로,
              고유 시리얼 번호를 통해 콘텐츠에 접근 가능한 키 역할을 수행함
            </li>
            <li>
              <strong>활성화</strong>: USB를 이용자 계정에 영구 등록하는 행위
            </li>
            <li>
              <strong>빌려쓰기 모드</strong>: 본인 활성화 외 다른 사용자의 USB를
              연결해 일시적으로 콘텐츠를 재생하는 모드
            </li>
          </ul>
        </Section>

        <Section title="제3조 (약관의 게시 및 변경)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              회사는 본 약관을 서비스 초기화면 및 회원가입 화면에 게시합니다.
            </li>
            <li>
              회사가 약관을 변경할 경우 적용일자 및 변경 사유를 명시하여 최소
              7일 전(이용자에게 불리한 변경의 경우 30일 전) 공지합니다.
            </li>
            <li>
              이용자는 변경된 약관에 동의하지 않을 권리가 있으며, 거부 시 회원
              탈퇴를 통해 서비스 이용을 종료할 수 있습니다.
            </li>
          </ul>
        </Section>

        <Section title="제4조 (서비스의 제공)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              회사는 USB 기반 한정판 미디어 콘텐츠와 이를 재생할 수 있는 멀티
              플랫폼 플레이어(웹·iOS·Android·macOS·Windows·TV)를 제공합니다.
            </li>
            <li>
              서비스의 일부 기능(라이브러리 동기화, 라이선스 검증, 결제 등)은
              회원 가입 및 로그인이 필요합니다.
            </li>
            <li>
              회사는 시스템 점검, 장애, 천재지변 등 부득이한 사유로 서비스
              제공을 일시 중단할 수 있으며, 이 경우 사전 또는 사후 공지합니다.
            </li>
          </ul>
        </Section>

        <Section title="제5조 (회원 가입 및 계정 관리)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              만 14세 이상이며 본 약관에 동의한 자는 카카오·네이버·구글·Apple
              등 소셜 로그인 또는 이메일을 통해 회원으로 가입할 수 있습니다.
            </li>
            <li>
              회원은 자신의 계정 정보를 직접 관리할 책임이 있으며, 계정 정보의
              유출·도용으로 발생한 손해에 대해 회사는 고의 또는 중과실이 없는
              한 책임을 지지 않습니다.
            </li>
            <li>
              회사는 회원이 다음 사유에 해당할 경우 가입을 거절하거나 계정을
              제한할 수 있습니다.
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>타인의 정보를 도용한 경우</li>
                <li>법령 또는 본 약관을 위반한 경우</li>
                <li>서비스의 정상 운영을 방해한 경우</li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="제6조 (USB 라이선스)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              회사가 발행한 USB는 USB 시리얼당 1회 활성화가 원칙이며,
              활성화 이후 해당 콘텐츠는 활성화 계정에 영구 귀속됩니다.
            </li>
            <li>
              빌려쓰기 모드는 본인 활성화 외 다른 사용자의 USB가 물리적으로
              연결돼 있는 동안에만 콘텐츠 재생을 허용합니다. USB를 분리하면
              해당 콘텐츠는 라이브러리에서 자동 제거됩니다.
            </li>
            <li>
              USB의 분실·도난·훼손에 대해서는 회사가 책임을 지지 않으며,
              재발급은 별도의 정책에 따릅니다.
            </li>
          </ul>
        </Section>

        <Section title="제7조 (저작권 및 콘텐츠 이용)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              서비스에 게재된 모든 콘텐츠(음원·영상·이미지·텍스트 등)의 저작권은
              회사 또는 각 권리자에게 있으며, 이용자는 개인적·비상업적 용도로만
              이용할 수 있습니다.
            </li>
            <li>
              이용자는 콘텐츠를 무단 복제, 배포, 전송, 재가공, 판매할 수 없으며,
              위반 시 관련 법령에 따라 민·형사상 책임을 부담합니다.
            </li>
            <li>
              회사는 콘텐츠 보호를 위해 AES-256 등 암호화 기술을 적용하며,
              이를 우회·해제하려는 행위는 엄격히 금지됩니다.
            </li>
          </ul>
        </Section>

        <Section title="제8조 (결제 및 환불)">
          <p>
            결제 기능은 추후 도입 시 별도의 약관 또는 본 약관의 부속 조항을
            통해 공지합니다.
          </p>
        </Section>

        <Section title="제9조 (회원 탈퇴 및 자격 상실)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              회원은 언제든지 서비스 내 설정 화면 또는 본 약관 §12 연락처를 통해
              탈퇴를 요청할 수 있습니다. 탈퇴 시 회사는 즉시 회원 정보를
              파기합니다.
            </li>
            <li>
              단, 회원 탈퇴 후에도 USB 시리얼 자체는 활성화 상태로 남아있을 수
              있으며, 동일 USB를 다시 활성화하려면 새 계정으로 등록해야 합니다.
            </li>
          </ul>
        </Section>

        <Section title="제10조 (서비스의 중단 및 면책)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              회사는 사업적 판단에 따라 서비스의 전부 또는 일부를 중단할 수
              있으며, 이 경우 최소 30일 전 회원에게 통지합니다.
            </li>
            <li>
              회사는 천재지변, 전쟁, 정전, 통신망 장애 등 회사의 합리적 통제 범위
              밖의 사유로 인한 손해에 대해 책임을 지지 않습니다.
            </li>
          </ul>
        </Section>

        <Section title="제11조 (분쟁 해결 및 관할)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              본 약관 및 서비스 이용에 관한 분쟁은 대한민국 법을 적용하며,
              서울중앙지방법원을 제1심 관할 법원으로 합니다.
            </li>
            <li>
              회사와 회원은 분쟁이 발생한 경우 우선적으로 협의를 통해 해결하도록
              노력하며, 협의가 이루어지지 않을 경우 소송으로 진행할 수 있습니다.
            </li>
          </ul>
        </Section>

        <Section title="제12조 (회사 정보 및 연락처)">
          <ul className="list-disc pl-6 space-y-1">
            <li>회사명: 우리미디어</li>
            <li>
              이메일:{" "}
              <a
                href="mailto:support@woori-media.com"
                className="text-gold-deep underline"
              >
                support@woori-media.com
              </a>
            </li>
            <li>
              개인정보 관련:{" "}
              <a
                href="/privacy"
                className="text-gold-deep underline"
              >
                개인정보 처리방침
              </a>
            </li>
          </ul>
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
