export default function RestrictionsPage() {
  return (
    <main className="min-h-screen py-5 md:py-20 px-4 md:px-8 lg:px-40">
      <div className="max-w-4xl mx-auto mt-15">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex justify-center">제3자 제공현황 및 위탁현황</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">

          {/* 제3자 제공현황 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제3자 제공현황</h2>
            <p className="mb-6">(개인정보의 제3자 제공) ㈜GME대부 회사는 원칙적으로 고객의 개인정보를 개인정보 처리방침 제1조에서 명시한 목적 범위 내에서 처리하며, 고객의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 단, 관련법령에 따라 신용평가 및 개인정보 관리, 대출심사, 신용정보집중관리와 상거래 계약 등을 위하여 아래와 같이 귀하의 개인정보를 제공하고 있습니다.</p>

            {/* 1. 공공기관에 대한 제공 */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">1. 공공기관에 대한 제공</h3>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">가. 제공받는 자와 제공목적</h4>
                <ul className="list-decimal pl-6 space-y-1 text-sm">
                  <li>금융감독원 (감독업무)</li>
                  <li>지방자치단체 (정책 자료 활용)</li>
                  <li>대부금융협회 (법령상 의무 이행)</li>
                  <li>법원 (개인회생 및 파산의 지원 및 관리)</li>
                  <li>신용회복위원회, 국민행복기금 (신용회복 지원)</li>
                  <li>경찰서 등 수사기관 (금융사고 조사, 분쟁해결, 범죄의 고소 및 고발)</li>
                  <li>기타 신용정보법 및 다른 법률에 의해 제출을 요구하는 공공기관 등</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">나. 제공항목</h4>
                <ul className="list-decimal pl-6 space-y-1 text-sm">
                  <li>개인식별정보(성명, 성별, 주민등록번호, 주소, 전화번호, 직업 등)</li>
                  <li>개인대출현황(본 계약 이전 및 이후의 당사 및 기타 제3자로부터 받은 모든 대출 포함)</li>
                  <li>채무보증현황(본 보증 이전 및 이후에 제공된 모든 보증 포함)</li>
                  <li>신용능력정보(개인의 재산, 부채, 소득의 총액, 납세 실적 등)</li>
                  <li>그 외 계약과 관련하여 고객에게 취득한 고객에 관한 정보</li>
                  <li>채무불이행정보(연체, 대위변제, 대지급, 부도, 관련인 발생 사실 등)는 신용정보법 제32조 제1항에 의하여 동의 없이 신용정보집중기관 및 신용조회 당사에게 제공</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">다. 보유 및 이용기간</h4>
                <p className="text-sm">제공 동의일로부터 개인(신용)정보를 제공받는 자의 목적을 달성할 때까지, 단, 법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우 예외로 함</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">2. 신용정보집중기관 및 신용조회회사에 대한 제공</h3>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">가. 제공받는 자</h4>
                <ul className="list-decimal pl-6 space-y-1 text-sm">
                  <li>신용정보집중기관: 한국신용정보원</li>
                  <li>신용조회회사: NICE평가정보㈜, 코리아크레딧뷰㈜</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">나. 제공목적</h4>
                <p className="text-sm">신용정보 집중 · 관리 및 활용 등 신용정보집중기관의 업무, 신용도평가, 실명확인 등 신용조회업무, 기타 법령에서 정한 목적으로 이용</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">다. 제공항목</h4>
                <ul className="list-decimal pl-6 space-y-1 text-sm">
                  <li>개인식별정보: 성명, 성별, 주민등록번호, 주소, 전화번호, 직업 등</li>
                  <li>개인대출현황: 본 계약 이전 및 이후의 당사 및 기타 제3자로부터 받은 모든 대출 포함</li>
                  <li>채무보증현황: 본 보증 이전 및 이후에 제공된 모든 보증 포함</li>
                  <li>신용능력정보: 개인의 재산, 부채, 소득의 총액, 납세 실적 등</li>
                  <li>그 외 계약과 관련하여 고객에게 취득한 고객에 관한 정보</li>
                  <li>채무불이행정보: 연체, 대위변제, 대지급, 부도, 관련인 발생 사실 등은 신용정보법 제32조 제1항에 의거하여 동의 없이 신용정보집중기관 및 신용조회회사에 제공</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">라. 보유 및 이용기간</h4>
                <ul className="list-decimal pl-6 space-y-1 text-sm">
                  <li>제공 동의일로부터 개인(신용)정보를 제공받는 자의 목적을 달성할 때까지</li>
                  <li>단, 법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우 예외</li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">3. 자금차입에 의한 채권담보 제공</h3>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">가. 제공받는 자</h4>
                <p className="text-sm">오케이저축은행, 융창저축은행, 드림저축은행, 스마트저축은행, 부림저축은행, 금화저축은행, 키움예스저축은행, 한국투자저축은행, HB저축은행, 웰컴저축은행, 다올저축은행, 세람저축은행, 인천저축은행, 참저축은행, KB저축은행, 푸른저축은행, 대백저축은행, JT친애저축은행, 키움저축은행, JB우리캐피탈, 우리종합금융, 유진대부, NC파이낸스대부, 조이크레디트대부</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">나. 제공목적</h4>
                <p className="text-sm">자금차입</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">다. 제공항목</h4>
                <p className="text-sm">성명, 생년월일, 주소, 전화번호, 당사와의 대출거래정보</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">라. 보유 및 이용기간</h4>
                <p className="text-sm">제공 동의일로부터 개인(신용)정보를 제공받는 자의 목적을 달성할 때까지</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm">※ 마케팅 목적의 개인정보 제공에 동의하지 않더라도 대출거래상 불이익이 없음을 알려드리며, 미동의 시 대출담당자 또는 콜센터(02-765-5555)로 연락 주시기 바랍니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">개인정보처리 위탁현황</h2>
            <p className="mb-6">(개인정보처리 위탁) ㈜GME대부 회사는 원칙적으로 이용자의 동의없이 해당 개인정보의 처리를 타인에게 위탁하지 않습니다. 다만 이용자의 동의를 받아 회사가 현재 개인정보처리를 위탁하는 사항은 다음과 같습니다.</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 bg-white">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900 w-20">구분</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900 w-45">위탁대상자</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900">위탁업무내용</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900 w-36">위탁기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-center">1</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">㈜웨인테크놀로지</td>
                    <td className="border border-gray-300 px-4 py-3">대부전산과 관련된 각종 시스템관리 및 개발,유지보수,문자메시지 및 카카오알림톡 전송서비스</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">위탁계약종료시까지</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-center">2</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">나이스평가정보㈜</td>
                    <td className="border border-gray-300 px-4 py-3">신용정보조회</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">1년 자동연장</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
