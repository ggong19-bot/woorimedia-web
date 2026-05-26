export const metadata = {
  title: "이용약관 — 우리미디어",
  description: "우리미디어 서비스 이용약관",
};

const EFFECTIVE_DATE = "2026-05-26";

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
          <p className="mt-3 text-sm text-white/70">시행일: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-text-muted leading-relaxed">
          본 약관은 우리미디어 주식회사(이하 &ldquo;회사&rdquo;)가 제공하는 USB
          기반 한정판 무손실 음원·영상 미디어 서비스 및 디지털 음원·영상 단품
          판매·스트리밍 서비스와 그 부속 응용 프로그램(이하 &ldquo;서비스&rdquo;)의
          이용에 관한 회사와 이용자의 권리·의무 및 책임사항을 규정합니다.
        </p>

        <Chapter title="제1장 총칙" />

        <Section title="제1조 (목적)">
          <p>
            본 약관은 회사가 제공하는 서비스의 이용 조건, 회사와 이용자의 권리·
            의무 및 책임사항을 정함을 목적으로 합니다.
          </p>
        </Section>

        <Section title="제2조 (정의)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>서비스</strong>: 회사가 제공하는 우리미디어 웹·모바일·TV·
              데스크톱 플레이어 및 관련 모든 콘텐츠, 결제 시스템, 라이브러리
              동기화 시스템 등 일체
            </li>
            <li>
              <strong>이용자</strong>: 본 약관에 따라 서비스를 이용하는 회원 및
              비회원
            </li>
            <li>
              <strong>회원</strong>: 본 약관에 동의하고 회사가 정한 절차에 따라
              가입하여 서비스를 이용하는 자
            </li>
            <li>
              <strong>USB 한정판</strong>: 회사가 음반사·기획사 등 발주자의
              의뢰를 받아 제작·발행하는 한정판 미디어 USB로, 고유 시리얼 번호를
              통해 콘텐츠에 접근 가능한 키 역할을 수행하는 물리 매체
            </li>
            <li>
              <strong>디지털 음원 상품</strong>: USB 없이 회사가 클라우드를 통해
              단품 또는 묶음(앨범) 단위로 판매하는 음원·영상 디지털 콘텐츠
            </li>
            <li>
              <strong>활성화</strong>: USB 또는 디지털 음원 상품의 구매를 통해
              해당 콘텐츠를 이용자 계정에 영구 등록하는 행위
            </li>
            <li>
              <strong>빌려쓰기 모드</strong>: 본인 활성화 외 다른 사용자의 USB를
              일시 연결하여 콘텐츠를 재생하는 모드(USB 분리 시 라이브러리에서
              자동 제거되는 일시 이용 형태)
            </li>
            <li>
              <strong>권리자</strong>: 콘텐츠에 대한 저작권, 저작인접권, 실연권
              등 일체의 권리를 보유한 자
            </li>
          </ul>
        </Section>

        <Section title="제3조 (약관의 게시 및 변경)">
          <ul className="list-disc pl-6 space-y-1">
            <li>회사는 본 약관을 서비스 초기 화면 및 회원가입 화면에 게시합니다.</li>
            <li>
              회사는 「약관의 규제에 관한 법률」, 「전자상거래 등에서의 소비자보호에
              관한 법률」, 「콘텐츠산업 진흥법」 등 관련 법령에 위배되지 않는
              범위에서 본 약관을 변경할 수 있습니다.
            </li>
            <li>
              약관을 변경할 경우 적용일자 및 변경 사유를 명시하여 최소 7일
              전(이용자에게 불리한 변경의 경우 30일 전)에 공지합니다. 적용일자
              이후에도 서비스를 계속 이용할 경우 변경된 약관에 동의한 것으로
              간주합니다.
            </li>
          </ul>
        </Section>

        <Section title="제4조 (약관의 해석)">
          <p>
            본 약관에 명시되지 아니한 사항은 「전자상거래 등에서의 소비자보호에
            관한 법률」, 「약관의 규제에 관한 법률」, 「콘텐츠산업 진흥법」,
            「저작권법」, 기타 관련 법령 및 상관례에 따릅니다.
          </p>
        </Section>

        <Chapter title="제2장 회원 및 계정" />

        <Section title="제5조 (회원 가입)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              만 14세 이상이며 본 약관에 동의한 자는 카카오·네이버·구글·Apple 등
              소셜 로그인 또는 이메일 인증을 통해 회원으로 가입할 수 있습니다. 만
              14세 미만 아동은 법정대리인의 동의를 받아 가입할 수 있습니다.
            </li>
            <li>
              회사는 다음의 경우 가입을 거절하거나 사후에 회원 자격을 상실시킬 수
              있습니다.
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>타인의 명의·정보를 도용한 경우</li>
                <li>가입 신청 시 허위 정보를 기재한 경우</li>
                <li>사회의 안녕질서·미풍양속을 저해할 목적으로 신청한 경우</li>
                <li>그 밖에 회사가 정한 가입 요건을 충족하지 못한 경우</li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="제6조 (계정 관리)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              회원은 자신의 계정 정보(이메일, 비밀번호, 소셜 토큰 등)를 직접
              관리할 책임이 있으며, 계정 정보의 유출·도용으로 발생한 손해에 대해
              회사는 고의 또는 중과실이 없는 한 책임을 지지 않습니다.
            </li>
            <li>
              회원은 계정의 무단 사용을 인지한 즉시 회사에 통지하여야 하며, 회사는
              통지를 받은 즉시 필요한 조치를 취합니다.
            </li>
          </ul>
        </Section>

        <Section title="제7조 (회원 탈퇴 및 자격 상실)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              회원은 언제든지 서비스 내 설정 화면 또는 제29조의 연락처를 통해
              탈퇴를 요청할 수 있습니다.
            </li>
            <li>
              탈퇴 시 회사는 「개인정보 보호법」 및 회사의 개인정보 처리방침에 따라
              회원 정보를 파기합니다.
            </li>
            <li>
              탈퇴 후에도 구매 내역·결제 기록은 전자상거래법에 따라 5년간
              보관되며, 활성화된 USB 시리얼 자체의 상태는 유지됩니다(동일 USB
              재활성화 시 새 계정으로 등록).
            </li>
            <li>
              회원이 본 약관 또는 법령을 중대하게 위반하거나, 콘텐츠 무단
              복제·배포·DRM 우회를 시도하거나, 결제 수단을 부정 사용한 경우 회사는
              사전 통지 후 회원 자격을 상실시킬 수 있습니다.
            </li>
          </ul>
        </Section>

        <Chapter title="제3장 서비스의 제공" />

        <Section title="제8조 (서비스의 제공 및 변경)">
          <ul className="list-disc pl-6 space-y-1">
            <li>USB 한정판 미디어의 제작·유통·라이센스 검증</li>
            <li>디지털 음원·영상의 단품 또는 묶음 단위 판매(스트리밍·다운로드)</li>
            <li>멀티 플랫폼 플레이어 제공(웹·iOS·Android·macOS·Windows·TV)</li>
            <li>회원 라이브러리 동기화 및 디바이스 간 이어 듣기</li>
            <li>그 밖에 회사가 추가로 개발하거나 제휴를 통해 제공하는 일체의 서비스</li>
          </ul>
          <p className="mt-3">
            회사는 운영상·기술상 필요에 따라 서비스 내용을 변경할 수 있으며, 이
            경우 변경 내용과 적용일자를 명시하여 사전에 공지합니다.
          </p>
        </Section>

        <Section title="제9조 (서비스 제공 시간 및 중단)">
          <ul className="list-disc pl-6 space-y-1">
            <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
            <li>
              시스템 점검·교체·증설, 정전·통신장애·천재지변 등 불가항력, 그 밖의
              합리적 사유가 있는 경우 회사는 서비스의 전부 또는 일부를 일시
              중단할 수 있으며 사전 또는 사후에 공지합니다.
            </li>
          </ul>
        </Section>

        <Section title="제10조 (정보 제공 및 광고)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              회사는 운영에 필요한 정보(공지, 업데이트 안내 등)를 이메일, 앱 푸시,
              서비스 내 공지 등으로 제공할 수 있습니다.
            </li>
            <li>
              회사는 회원의 동의를 받은 경우 마케팅 목적의 광고성 정보를 제공할 수
              있으며, 회원은 언제든지 수신을 거부할 수 있습니다.
            </li>
          </ul>
        </Section>

        <Chapter title="제4장 USB 한정판 라이센스" />

        <Section title="제11조 (USB 한정판의 거래)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              USB 한정판은 회사가 발주자의 의뢰를 받아 제작·유통하는 물리
              매체로서, USB 자체의 소유권은 구매자에게 이전됩니다.
            </li>
            <li>
              USB에 수록된 콘텐츠의 사용 권리는 제18조에 따라 부여되며, 이는
              콘텐츠 자체의 소유권 이전을 의미하지 않습니다.
            </li>
          </ul>
        </Section>

        <Section title="제12조 (USB 활성화)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              USB는 시리얼당 1회 활성화가 원칙이며, 활성화 이후 콘텐츠는 활성화한
              회원의 계정에 영구 귀속됩니다.
            </li>
            <li>
              활성화 후 회원은 자신의 계정으로 로그인한 모든 디바이스(웹·iOS·
              Android·macOS·Windows·TV)에서 콘텐츠를 이용할 수 있습니다.
            </li>
            <li>
              활성화 이후에도 USB는 물리 매체로서 회원의 소유로 남으며, 인터넷
              연결이 불가한 환경에서의 재생, 빌려쓰기 모드(제13조)를 통한 일시
              이용에 사용할 수 있습니다.
            </li>
          </ul>
        </Section>

        <Section title="제13조 (빌려쓰기 모드)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              본인이 활성화하지 않은 USB를 자신의 디바이스에 연결한 경우, 회사는
              해당 USB가 연결돼 있는 동안에 한하여 콘텐츠 재생을 허용합니다.
            </li>
            <li>
              USB를 분리하거나 인식이 끊긴 경우 해당 콘텐츠는 라이브러리에서 자동
              제거됩니다.
            </li>
            <li>
              빌려쓰기 모드는 콘텐츠의 영구 권리 부여가 아니며, 활성화와는 별개의
              일시적 이용 형태입니다.
            </li>
          </ul>
        </Section>

        <Section title="제14조 (USB의 분실·훼손)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              USB의 분실·도난·훼손에 대해서는 회사가 책임을 지지 않습니다. 다만
              USB 시리얼이 회원 계정에 활성화되어 있는 경우 콘텐츠 자체는
              클라우드를 통해 계속 이용할 수 있습니다.
            </li>
            <li>USB의 재발급은 발주자별 정책에 따르며, 회사가 일괄 보증하지 않습니다.</li>
          </ul>
        </Section>

        <Chapter title="제5장 디지털 음원 상품의 판매" />

        <Section title="제15조 (디지털 음원 상품의 판매)">
          <ul className="list-disc pl-6 space-y-1">
            <li>곡 단품 — 개별 트랙 단위 판매</li>
            <li>앨범 단품 — 묶음 단위 판매</li>
            <li>스트리밍 이용권 — 일정 기간 무제한 재생(정기 결제 도입 시)</li>
            <li>다운로드 이용권 — 회원 디바이스에 영구 저장 가능한 형태</li>
          </ul>
          <p className="mt-3">
            디지털 음원 상품의 가격, 음질(비트레이트·샘플레이트), 권리자, 제공
            형식 등은 상품 상세 페이지에 명시합니다.
          </p>
        </Section>

        <Section title="제16조 (구매 계약의 성립)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              회원은 상품 선택 및 결제 정보 입력 → 결제 수단 선택 → 본 약관 및
              청약 철회 제한(제20조) 동의 → 결제 완료 및 콘텐츠 권리 부여의
              절차로 디지털 음원 상품을 구매합니다.
            </li>
            <li>
              회원이 만 19세 미만인 경우 결제 시 법정대리인의 동의가 필요할 수
              있으며, 동의 없이 이루어진 결제는 법정대리인의 청구에 의해 취소될 수
              있습니다.
            </li>
            <li>
              구매 정보에 허위·기재누락·오기가 있거나, 미성년자가 법정대리인 동의
              없이 고가의 상품을 구매하려는 경우 등 회사는 구매 신청을 거부할 수
              있습니다.
            </li>
          </ul>
        </Section>

        <Section title="제17조 (결제)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              회사는 신용·체크카드, 휴대폰 결제, 무통장 입금·가상계좌, 간편결제
              (카카오페이·네이버페이·토스페이먼츠 등) 등의 결제 수단을 제공할 수
              있으며, 구체적인 수단은 결제 페이지에 표시됩니다.
            </li>
            <li>
              결제는 결제대행사(PG)를 통해 이루어지며, 회사는 회원의 카드·계좌
              정보 등 민감한 결제 정보를 직접 보관하지 않습니다.
            </li>
            <li>
              결제 완료 시 회사는 결제 영수증 또는 거래 명세를 이메일 또는
              마이페이지를 통해 제공합니다.
            </li>
          </ul>
        </Section>

        <Section title="제18조 (디지털 콘텐츠 사용 권리)">
          <p>
            회원이 디지털 음원 상품을 구매한 경우 다음의 권리를 얻습니다.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>개인적·비상업적 사용(회원 본인 및 동거 가족의 사적 감상)</li>
            <li>회원 본인 계정으로 로그인한 다중 디바이스에서의 재생</li>
            <li>다운로드형 상품의 경우 디바이스에 저장하여 오프라인 재생</li>
          </ul>
          <p className="mt-3">
            회원에게 부여되는 권리는 콘텐츠 자체의 저작권·저작인접권·실연권을
            포함하지 않으며, 무단 복제·배포·전송·재가공·판매, 공중 송신, 다른
            매체로의 변환 후 재배포, DRM·암호화·워터마크의 제거·우회, 영리 목적
            사용은 엄격히 금지됩니다. 위반 시 회사는 「저작권법」 등에 따라
            민·형사상 책임을 추궁하고 계정을 정지·해지할 수 있습니다.
          </p>
        </Section>

        <Section title="제19조 (가격 및 변경)">
          <ul className="list-disc pl-6 space-y-1">
            <li>디지털 음원 상품의 가격은 상품 상세 페이지에 표시된 가격이 우선합니다.</li>
            <li>
              회사는 권리자 협의·시장 상황·프로모션 등에 따라 가격을 변경할 수
              있으며, 이미 구매한 상품에는 변경된 가격이 소급 적용되지 않습니다.
            </li>
            <li>
              회사는 한정 기간 할인, 무료 체험, 묶음 할인 등 프로모션을 진행할 수
              있으며, 조건은 별도로 공지합니다.
            </li>
          </ul>
        </Section>

        <Section title="제20조 (청약 철회의 제한)">
          <p>
            「전자상거래 등에서의 소비자보호에 관한 법률」 제17조 제2항 제5호에
            따라 다음의 경우 청약 철회권이 제한됩니다.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              디지털 음원 상품을 다운로드한 경우 — 다운로드와 동시에 권리가
              부여되고 복제가 완료되므로 다운로드 즉시 청약 철회권이 소멸됩니다.
            </li>
            <li>
              스트리밍 이용권을 사용하기 시작한 경우 — 첫 재생 시점부터 청약
              철회권이 소멸됩니다.
            </li>
            <li>
              디지털 콘텐츠의 일부라도 사용한 경우 — 사용된 부분 및 그와 가분성이
              없는 부분에 대해 청약 철회권이 소멸됩니다.
            </li>
          </ul>
          <p className="mt-3">
            회사는 청약 철회권 제한 사실을 상품 상세 페이지, 결제 직전 동의 화면,
            본 약관에 명시·고지합니다. 다운로드 또는 사용 이전의 결제 건에 한하여
            회원은 결제일로부터 7일 이내에 청약 철회를 요청할 수 있습니다.
          </p>
        </Section>

        <Section title="제21조 (환불 정책)">
          <p>
            회사의 시스템 장애로 다운로드·스트리밍이 지속적으로 불가능한 경우,
            콘텐츠 파일이 손상되었거나 표시 음질과 현저히 다른 경우, 결제가 중복
            처리된 경우, 회사의 귀책으로 콘텐츠가 서비스에서 제거된 경우, 회사는
            환불 또는 동등한 다른 상품으로 교환합니다.
          </p>
          <p className="mt-3">
            환불 신청은 제29조의 연락처 또는 마이페이지의 고객 문의를 통해 가능하며,
            회사는 신청을 받은 날로부터 영업일 기준 3일 이내에 처리합니다. 환불은
            결제한 수단과 동일한 수단으로 진행함을 원칙으로 합니다.
          </p>
        </Section>

        <Chapter title="제6장 저작권 및 콘텐츠 보호" />

        <Section title="제22조 (저작권의 귀속)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              서비스에 게재된 모든 콘텐츠(음원·영상·이미지·텍스트 등)의 저작권 및
              기타 일체의 권리는 회사 또는 각 권리자에게 있습니다.
            </li>
            <li>
              회원이 USB 한정판 또는 디지털 음원 상품을 구매한 경우, 제18조에서
              정한 범위 내의 사용 권리만 부여받으며 콘텐츠 자체의 저작권은 회원에게
              이전되지 않습니다.
            </li>
          </ul>
        </Section>

        <Section title="제23조 (콘텐츠 보호 기술)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              USB 한정판: AES-256-CTR 암호화. USB 시리얼이 AES 키 시드 역할을
              하며 각 USB마다 다른 키로 암호화됩니다.
            </li>
            <li>
              디지털 음원 상품: 회사가 선택한 DRM 또는 사용자별 워터마킹(구현
              방식은 상품·플랫폼별로 다를 수 있음).
            </li>
          </ul>
          <p className="mt-3">
            회원은 위 기술적 조치를 우회·해제·삭제하려는 일체의 행위를 할 수
            없으며, 위반 시 「저작권법」 제104조의2 등 관련 법령에 따라 처벌받을 수
            있습니다.
          </p>
        </Section>

        <Section title="제24조 (권리자 사용료의 정산)">
          <p>
            회사는 「저작권법」 및 관련 법령에 따라 콘텐츠 판매·이용으로 발생한
            매출에서 한국음악저작권협회(KOMCA), 한국음반산업협회(RIAK),
            한국음악실연자연합회(KMRMC) 등 신탁관리단체 및 권리자에게 사용료를
            정산합니다. 정산 비율 및 방식은 신탁관리단체와의 라이센스 계약 및
            권리자와의 개별 계약에 따릅니다.
          </p>
        </Section>

        <Chapter title="제7장 책임 및 면책" />

        <Section title="제25조 (회사의 의무)">
          <ul className="list-disc pl-6 space-y-1">
            <li>회사는 안정적인 서비스 제공을 위해 최선을 다합니다.</li>
            <li>
              회사는 「개인정보 보호법」 및 회사의 개인정보 처리방침에 따라 필요한
              보안 조치를 취합니다.
            </li>
            <li>
              회사는 회원의 정당한 의견·불만을 신속하게 처리하며, 즉시 처리가
              곤란한 경우 그 사유와 처리 일정을 통보합니다.
            </li>
          </ul>
        </Section>

        <Section title="제26조 (회원의 의무)">
          <p>회원은 다음 각 호의 행위를 하여서는 아니 됩니다.</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>가입·변경 시 허위 내용의 등록</li>
            <li>타인의 정보·계정·결제 수단 도용</li>
            <li>콘텐츠의 무단 복제·배포·재가공·판매</li>
            <li>DRM·암호화의 우회 또는 해제 시도</li>
            <li>회사 또는 제3자의 명예 손상·업무 방해</li>
            <li>외설·폭력적이거나 공서양속에 반하는 정보의 공개·게시</li>
            <li>그 밖에 관련 법령에 위반되거나 본 약관에서 금지하는 행위</li>
          </ul>
        </Section>

        <Section title="제27조 (회사의 면책)">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              천재지변, 전쟁, 전기통신 서비스 중단, 정전, 자연재해 등 합리적인
              통제 범위 밖의 사유로 서비스를 제공하지 못한 경우 책임이 면제됩니다.
            </li>
            <li>회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.</li>
            <li>
              회사는 회원이 서비스를 통해 기대한 수익을 얻지 못한 것, 회원이 게재한
              자료에 관한 손해, 회원 간 또는 회원과 제3자 간 분쟁에 대해 책임을
              지지 않습니다.
            </li>
          </ul>
        </Section>

        <Chapter title="제8장 분쟁 해결" />

        <Section title="제28조 (분쟁 해결 및 관할)">
          <ul className="list-disc pl-6 space-y-1">
            <li>본 약관 및 서비스 이용에 관한 분쟁은 대한민국 법을 적용합니다.</li>
            <li>
              분쟁이 발생한 경우 우선 협의를 통해 해결하도록 노력하며, 협의가
              이루어지지 않을 경우 「소비자기본법」에 따라 한국소비자원의 분쟁조정
              절차를 이용할 수 있습니다.
            </li>
            <li>본 약관에 의한 분쟁의 제1심 관할 법원은 서울중앙지방법원으로 합니다.</li>
          </ul>
        </Section>

        <Section title="제29조 (회사 정보 및 연락처)">
          <ul className="list-disc pl-6 space-y-1">
            <li>회사명: 우리미디어 주식회사</li>
            <li>대표자: 박봉훈</li>
            <li>사업자 등록번호: 538-88-00390</li>
            <li>통신판매업 신고번호: 2016-경기파주-1070</li>
            <li>사업장 주소: 경기도 파주시 조리읍 명봉산로79번길 67, 나동</li>
            <li>
              고객 지원:{" "}
              <a
                href="mailto:support@woori-media.com"
                className="text-gold-deep underline"
              >
                support@woori-media.com
              </a>
            </li>
            <li>개인정보 보호책임자: 박봉훈 (privacy@woori-media.com)</li>
            <li>
              개인정보 처리방침:{" "}
              <a href="/privacy" className="text-gold-deep underline">
                개인정보 처리방침
              </a>
            </li>
          </ul>
        </Section>

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-text-muted">
          <p>본 약관은 {EFFECTIVE_DATE}부터 시행합니다.</p>
          <p className="mt-2">
            기존 약관은 본 약관의 시행과 동시에 대체되며, 기존 USB 한정판 구매
            회원의 권리는 본 약관에 따라 그대로 유지됩니다.
          </p>
        </div>
      </article>
    </main>
  );
}

function Chapter({ title }: { title: string }) {
  return (
    <h2 className="mt-14 mb-2 border-b-2 border-gold-light pb-2 text-lg font-extrabold tracking-tight text-navy-deep">
      {title}
    </h2>
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
    <section className="mt-8">
      <h3 className="text-base font-extrabold text-navy-deep">{title}</h3>
      <div className="mt-2 text-text-muted leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}
