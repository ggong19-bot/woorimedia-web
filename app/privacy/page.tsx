export const metadata = {
  title: "개인정보 처리방침 — 우리미디어",
  description: "우리미디어 서비스의 개인정보 수집·이용·보관·파기에 관한 방침",
};

const EFFECTIVE_DATE = "2026-05-26";

// ── Supabase region ───────────────────────────────────────────────────
// 2026-05-26 대시보드 확인: 프로젝트 woorimedia-prod = ap-northeast-2 (서울, 국내).
// 국내 저장이므로 §7 국외이전에서 Supabase 제외(OVERSEAS=false). §6 위탁엔 국내로 표기.
const SUPABASE_OVERSEAS = false;
const SUPABASE_REGION = SUPABASE_OVERSEAS
  ? "싱가포르 (ap-southeast-1)"
  : "대한민국 (서울, ap-northeast-2)";

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
          <p className="mt-3 text-sm text-white/70">시행일: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-text-muted leading-relaxed">
          우리미디어 주식회사(이하 &ldquo;회사&rdquo;)는 「개인정보 보호법」,
          「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을
          준수하며, 이용자의 개인정보를 보호하기 위해 본 개인정보 처리방침(이하
          &ldquo;본 방침&rdquo;)을 수립·공개합니다. 본 방침은 회사가 제공하는
          모바일·데스크톱·TV 애플리케이션 및 웹사이트(이하 통칭
          &ldquo;서비스&rdquo;)를 이용하는 모든 이용자에게 적용됩니다.
        </p>

        <Section title="제1조 (수집하는 개인정보의 항목 및 수집 방법)">
          <p className="font-semibold text-navy-deep">1. 수집 항목</p>
          <Table
            head={["구분", "수집 항목"]}
            rows={[
              [
                "회원가입·로그인 (필수)",
                "이메일 주소, 닉네임(표시 이름), 외부 인증 제공자 식별자(uid), 인증 제공자명(카카오·네이버·구글·Apple·이메일)",
              ],
              ["이메일 회원가입 시 추가", "비밀번호(단방향 해시로 저장)"],
              [
                "USB 활성화 시",
                "USB 하드웨어 시리얼 번호, 활성화 일시, 디바이스 식별자(OS·앱 버전·기기 식별값)",
              ],
              [
                "서비스 이용 중 자동 생성·수집",
                "라이브러리 정보(활성화한 앨범 목록), 접속 IP, 접속 일시, 서비스 이용 기록(재생 이력 등), 오류 로그",
              ],
              ["고객 문의 시", "문의 내용, 회신 이메일"],
            ]}
          />
          <p className="mt-4">
            회사는 다음 정보는 <strong>수집하지 않습니다</strong>: 주민등록번호,
            위치정보, 연락처 목록, 사진·카메라·마이크, 광고 식별자(IDFA/AAID — 광고
            미사용).
          </p>
          <p className="mt-4 font-semibold text-navy-deep">2. 수집 방법</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>이용자가 회원가입 화면에서 직접 입력</li>
            <li>
              외부 인증(OAuth) 시 제공자(카카오·네이버·구글·Apple)로부터 이용자
              동의에 따라 자동 전달
            </li>
            <li>USB 활성화 시 연결한 USB로부터 시리얼 번호 자동 인식</li>
            <li>서비스 이용 과정에서 디바이스·접속 정보 자동 수집</li>
          </ul>
        </Section>

        <Section title="제2조 (개인정보의 수집·이용 목적)">
          <p>회사는 수집한 개인정보를 다음 목적에 한하여 처리합니다.</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>
              <strong>회원 식별 및 본인 확인</strong> — 가입자 식별, 부정·중복
              가입 방지
            </li>
            <li>
              <strong>서비스 제공</strong> — 콘텐츠 스트리밍·다운로드 제공,
              라이브러리 관리, 정품 USB 인증, 오프라인 재생 지원
            </li>
            <li>
              <strong>결제 및 정산 관련 협력</strong> — 외부 판매처와의 구매 검증
              연계(해당 시)
            </li>
            <li>
              <strong>고객 응대</strong> — 문의·민원 처리, 분쟁 해결, 공지 전달
            </li>
            <li>
              <strong>서비스 운영·개선</strong> — 오류 진단, 보안 위협 탐지, 품질
              개선(개인 식별 정보를 제거한 통계 형태)
            </li>
            <li>
              <strong>법령 의무 이행</strong> — 법령상 보존·신고 의무 이행
            </li>
          </ul>
          <p className="mt-3">
            회사는 위 목적 외의 용도로 개인정보를 이용하지 않으며, 목적이
            변경되는 경우 사전에 이용자의 동의를 구합니다.
          </p>
        </Section>

        <Section title="제3조 (개인정보의 보유 및 이용 기간)">
          <p>
            이용자가 회원 탈퇴를 요청하거나 수집·이용 목적이 달성된 경우, 회사는
            해당 개인정보를 지체 없이 파기합니다. 다만 관련 법령에 따라 다음
            기간 동안 보존합니다.
          </p>
          <Table
            head={["보존 항목", "근거 법령", "보존 기간"]}
            rows={[
              ["계약·청약철회 등에 관한 기록", "전자상거래법", "5년"],
              ["대금결제·재화 공급에 관한 기록", "전자상거래법", "5년"],
              ["소비자 불만·분쟁처리 기록", "전자상거래법", "3년"],
              ["표시·광고에 관한 기록", "전자상거래법", "6개월"],
              ["부정 이용 기록(접속 IP 등)", "통신비밀보호법·내부 정책", "1년"],
            ]}
          />
          <p className="mt-4 font-semibold text-navy-deep">
            USB 활성화 기록의 특수성
          </p>
          <p className="mt-2">
            회원 탈퇴 시 이메일 등 개인 식별 정보는 즉시 파기합니다. 다만
            이용자가 구매한 한정판 USB의 &ldquo;평생 재생&rdquo; 권리를 보장하기
            위해, USB 시리얼은 개인을 식별할 수 없는 익명 식별자 형태로 분리
            보관되어 영구 보존될 수 있으며, 이를 통해 동일 USB의 재활성화가
            가능합니다.
          </p>
          <p className="mt-4 font-semibold text-navy-deep">파기 방법</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>전자적 파일: 복구할 수 없는 방법으로 영구 삭제</li>
            <li>종이 문서: 분쇄 또는 소각(해당 시)</li>
          </ul>
        </Section>

        <Section title="제4조 (개인정보의 제3자 제공)">
          <p>
            회사는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.
            다만 다음의 경우는 예외로 합니다.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>이용자가 사전에 별도 동의한 경우</li>
            <li>법령에 특별한 규정이 있거나 법령상 의무 준수를 위해 필요한 경우</li>
            <li>수사기관이 법령에 정해진 절차에 따라 요구하는 경우</li>
          </ul>
        </Section>

        <Section title="제5조 (개인정보 처리의 위탁)">
          <p>
            회사는 서비스 제공 및 운영을 위해 다음과 같이 개인정보 처리 업무를
            위탁하고 있습니다.
          </p>
          <Table
            head={["수탁자", "위탁 업무", "데이터 위치"]}
            rows={[
              [
                "Vercel Inc.",
                "백엔드 애플리케이션 호스팅",
                "대한민국(icn1) · 일부 글로벌 CDN",
              ],
              [
                "Supabase Inc.",
                "데이터베이스(Postgres) 및 콘텐츠 저장소",
                SUPABASE_REGION,
              ],
              ["Kakao Corp.", "소셜 로그인(OAuth) 인증", "대한민국"],
              ["NAVER Corp.", "소셜 로그인(OAuth) 인증", "대한민국"],
              ["Google LLC", "소셜 로그인(OAuth) 인증", "미국"],
              ["Apple Inc.", "소셜 로그인(OAuth) 인증", "미국"],
            ]}
          />
          <p className="mt-4">
            회사는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무
            목적 외 처리 금지, 기술적·관리적 보호조치, 재위탁 제한, 위탁 종료 시
            반환·파기 등을 명시하고 수탁자가 이를 준수하도록 감독합니다.
          </p>
        </Section>

        <Section title="제6조 (개인정보의 국외 이전)">
          <p>회사는 다음과 같이 일부 개인정보를 국외에서 처리합니다.</p>
          <Table
            head={["이전받는 자", "국가", "이전 항목", "이용·보유 기간"]}
            rows={[
              [
                "Google LLC",
                "미국",
                "이메일, 이름, OAuth uid",
                "회원 자격 유지 기간",
              ],
              [
                "Apple Inc.",
                "미국",
                "이메일, OAuth uid",
                "회원 자격 유지 기간",
              ],
              ...(SUPABASE_OVERSEAS
                ? [
                    [
                      "Supabase Inc.",
                      SUPABASE_REGION,
                      "서비스 이용에 따른 데이터",
                      "본 방침 제3조 보유 기간",
                    ],
                  ]
                : []),
            ]}
          />
          <p className="mt-4">
            이전은 이용자가 해당 로그인 방식을 선택하거나 서비스를 이용하는
            시점에 HTTPS로 암호화되어 이루어집니다. 이용자는 국외 이전에
            동의하지 않을 권리가 있으며, 동의하지 않을 경우 해당 외부 인증 방식
            또는 일부 서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </Section>

        <Section title="제7조 (정보주체의 권리·의무 및 행사 방법)">
          <p>이용자는 회사에 대해 다음 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구(법령 보존 의무가 없는 정보)</li>
            <li>처리정지 요구(회원 탈퇴 절차)</li>
            <li>동의 철회(마케팅 수신 동의 등, 해당 시)</li>
          </ul>
          <p className="mt-3">
            권리는 앱 내 <strong>[설정 → 계정 → 개인정보 관리]</strong> 메뉴를
            통하거나, 본 방침 제10조의 개인정보 보호책임자에게 서면·전자우편·전화로
            요청하여 행사할 수 있습니다. 회사는 요청을 받은 즉시 처리하며,
            정정·삭제 요구의 경우 결과를 지체 없이 통지합니다.
          </p>
          <p className="mt-3">
            회사는 원칙적으로 <strong>만 14세 미만 아동</strong>의 회원가입을
            받지 않으며, 법정대리인의 동의 없이 수집된 사실이 확인되는 경우 지체
            없이 파기합니다.
          </p>
        </Section>

        <Section title="제8조 (개인정보의 안전성 확보조치)">
          <p className="font-semibold text-navy-deep">관리적 조치</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>개인정보 접근권한을 최소 인원으로 제한</li>
            <li>임직원 대상 정기 개인정보 보호 교육</li>
            <li>내부 관리계획 수립·시행</li>
          </ul>
          <p className="mt-4 font-semibold text-navy-deep">기술적 조치</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>모든 네트워크 통신은 HTTPS/TLS 1.2 이상으로 암호화</li>
            <li>비밀번호는 단방향 해시 알고리즘으로 저장</li>
            <li>인증 토큰(JWT)은 디바이스 보안 저장소에 저장</li>
            <li>콘텐츠 파일은 AES-256-CTR 방식으로 암호화하여 저장·전송</li>
            <li>데이터베이스 접근은 인증·인가 제어 및 접근 기록 유지</li>
            <li>침입 차단·탐지 시스템 운영</li>
          </ul>
          <p className="mt-4 font-semibold text-navy-deep">물리적 조치</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              보안 인증을 받은 클라우드 사업자(Vercel·Supabase)의 데이터센터를
              통한 처리
            </li>
          </ul>
        </Section>

        <Section title="제9조 (자동 수집 장치의 설치·운영 및 거부)">
          <p className="font-semibold text-navy-deep">
            모바일·데스크톱·TV 애플리케이션
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>인증 토큰(JWT) — 로그인 상태 유지용, 디바이스 보안 저장소에 저장</li>
            <li>USB 시리얼 번호 캐시 — 라이브러리 표시용, 디바이스 로컬에만 저장</li>
            <li>앱 사용 로그 — 오류 진단·개선 목적의 익명 통계(개인 식별 정보 미포함)</li>
          </ul>
          <p className="mt-4 font-semibold text-navy-deep">웹사이트</p>
          <p className="mt-2">
            웹사이트는 광고·추적 목적의 쿠키를 사용하지 않습니다. 로그인 세션 등
            서비스 이용에 필요한 정보는 이용자 브라우저의 로컬 저장소(localStorage)
            에 저장되며, 제3자 추적·광고 식별자는 사용하지 않습니다.
          </p>
          <p className="mt-4 font-semibold text-navy-deep">거부 방법</p>
          <p className="mt-2">
            이용자는 디바이스 설정에서 앱 데이터를 삭제하거나 앱을 제거하여, 또는
            브라우저에서 로컬 저장소를 삭제하여 자동 수집을 거부할 수 있습니다.
            단, 거부 시 일부 서비스 이용이 제한될 수 있습니다.
          </p>
        </Section>

        <Section title="제10조 (개인정보 보호책임자)">
          <p>
            회사는 이용자의 개인정보를 보호하고 관련 불만을 처리하기 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>개인정보 보호책임자: 박봉훈</li>
            <li>
              이메일:{" "}
              <a
                href="mailto:privacy@woori-media.com"
                className="text-gold-deep underline"
              >
                privacy@woori-media.com
              </a>
            </li>
            <li>전화: 031-942-4127</li>
          </ul>
        </Section>

        <Section title="제11조 (권익침해 구제방법)">
          <p>
            개인정보 침해에 대한 신고·상담이 필요한 경우 아래 기관에 문의할 수
            있습니다.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>개인정보분쟁조정위원회 — 1833-6972 (privacy.go.kr)</li>
            <li>개인정보침해신고센터(KISA) — 118 (privacy.kisa.or.kr)</li>
            <li>대검찰청 사이버수사과 — 1301 (spo.go.kr)</li>
            <li>경찰청 사이버수사국 — 182 (cyberbureau.police.go.kr)</li>
          </ul>
        </Section>

        <Section title="제12조 (개인정보 처리방침의 변경)">
          <p>
            본 방침은 법령·정책 또는 서비스 변경에 따라 내용의 추가·삭제·수정이
            있을 수 있으며, 변경 시 시행 7일 전에 앱 내 공지 및 회사 웹사이트를
            통해 고지합니다. 다만 이용자 권리의 중대한 변경이 있는 경우에는 30일
            전에 고지하고, 필요한 경우 이용자의 재동의를 받을 수 있습니다.
          </p>
        </Section>

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-text-muted">
          <p>본 방침은 {EFFECTIVE_DATE}부터 시행합니다.</p>
          <p className="mt-3">우리미디어 주식회사</p>
          <p>대표자: 박봉훈 · 사업자등록번호: 538-88-00390</p>
          <p>통신판매업 신고번호: 2016-경기파주-1070</p>
          <p>주소: 경기도 파주시 조리읍 명봉산로79번길 67, 나동</p>
        </div>
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

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-slate-300 text-left text-navy-deep">
            {head.map((h) => (
              <th key={h} className="py-2 pr-4 font-semibold align-top">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-200 align-top">
              {row.map((cell, j) => (
                <td key={j} className="py-2 pr-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
