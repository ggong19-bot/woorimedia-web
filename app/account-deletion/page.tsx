export const metadata = {
  title: "계정 삭제 — 우리미디어",
  description:
    "우리미디어 계정 및 관련 데이터 삭제 방법과 삭제·보관되는 데이터 안내",
};

const EFFECTIVE_DATE = "2026-05-26";

export default function AccountDeletionPage() {
  return (
    <main className="bg-white">
      <section className="bg-navy-gradient">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-extrabold tracking-[0.3em] text-gold-light">
            ACCOUNT DELETION
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            계정 및 데이터 삭제
          </h1>
          <p className="mt-3 text-sm text-white/70">시행일: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-text-muted leading-relaxed">
          <strong>우리미디어</strong> 앱(제공자: 우리미디어 주식회사, Woori Media
          Co., Ltd.)을 이용하는 회원은 언제든지 본인의 계정과 관련 데이터를 삭제할
          수 있습니다. 회사는 아래 두 가지 삭제 경로를 제공하며, 두 경로 모두 앱
          내 계정 삭제 기능과 동일한 결과(계정·데이터의 영구 삭제)를 보장합니다.
        </p>

        <Section title="1. 계정 삭제 방법">
          <p className="font-semibold text-navy-deep">
            방법 A — 앱에서 즉시 삭제 (권장)
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              우리미디어 앱 실행 → <strong>마이페이지</strong> 이동
            </li>
            <li>
              <strong>[계정 삭제]</strong> 선택 → 확인 시 즉시 삭제 처리(별도 대기
              없음)
            </li>
            <li>iOS · Android · macOS · Windows 모든 앱에서 동일하게 지원</li>
          </ul>
          <p className="mt-4 font-semibold text-navy-deep">
            방법 B — 이메일로 요청
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              가입에 사용한 이메일 주소를 적어{" "}
              <a
                href="mailto:privacy@woori-media.com"
                className="text-gold-deep underline"
              >
                privacy@woori-media.com
              </a>{" "}
              (또는{" "}
              <a
                href="mailto:support@woori-media.com"
                className="text-gold-deep underline"
              >
                support@woori-media.com
              </a>
              )로 &ldquo;계정 삭제 요청&rdquo; 메일을 보내주십시오.
            </li>
            <li>
              본인 확인 후 <strong>영업일 기준 7일 이내</strong> 삭제 처리하고
              완료 사실을 회신합니다.
            </li>
          </ul>
        </Section>

        <Section title="2. 삭제되는 데이터">
          <p>계정 삭제 시 다음 정보는 복구할 수 없는 방법으로 영구 삭제됩니다.</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>
              <strong>계정 정보</strong> — 이메일 주소, 표시 이름(닉네임), 사용자
              식별자(uid), 인증 제공자명, 비밀번호 해시
            </li>
            <li>
              <strong>라이브러리·이용 기록</strong> — 활성화한 앨범 목록, 재생
              이력, 디바이스 식별자
            </li>
            <li>
              <strong>고객 문의 내역</strong>
            </li>
          </ul>
        </Section>

        <Section title="3. 법령에 따라 일정 기간 보관 후 파기되는 데이터">
          <p>
            관련 법령상 보존 의무가 있는 아래 정보는 계정 삭제 후에도 명시된 기간
            동안 개인을 식별할 수 없도록 분리 보관되며, 기간이 지나면 파기됩니다.
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
          <p className="mt-4">
            법령상 보존 의무가 없는 정보는 위 절차에 따라 지체 없이 삭제됩니다.
          </p>
        </Section>

        <Section title="4. USB 활성화 기록의 특수성">
          <p>
            이용자가 구매한 한정판 USB의{" "}
            <strong>&ldquo;평생 재생&rdquo;</strong> 권리를 보장하기 위해, USB
            하드웨어 시리얼 번호는 개인을 식별할 수 없는 익명 식별자 형태로 분리
            보관되어 영구 보존될 수 있습니다. 이 식별자는 이메일·이름 등
            개인정보와 연결되지 않으며, 동일 USB의 재활성화에만 사용됩니다.
          </p>
        </Section>

        <Section title="5. 문의">
          <p>
            계정 삭제 또는 개인정보 처리에 관한 문의는 아래로 연락해 주십시오.
            자세한 내용은{" "}
            <a href="/privacy" className="text-gold-deep underline">
              개인정보 처리방침
            </a>
            을 참고하시기 바랍니다.
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

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-text-muted">
          <p>본 안내는 {EFFECTIVE_DATE}부터 시행합니다.</p>
          <p className="mt-3">우리미디어 주식회사 (Woori Media Co., Ltd.)</p>
          <p>대표자: 박봉훈 · 사업자등록번호: 538-88-00390</p>
          <p>주소: 경기도 파주시 탄현면 헤이리로133번길 19-74</p>
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
