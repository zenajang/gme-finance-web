export default function CreditInfoPage() {
  return (
    <main className="min-h-screen py-20 px-4 md:px-8 lg:px-40">
      <div className="max-w-4xl mx-auto mt-15">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex justify-center">신용정보활용체제</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">

          <p>㈜GME대부는 『신용정보의 이용 및 보호에 관한 법률』 제31조에 의하여 신용정보활용체제를 아래와 같이 공시합니다.</p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제1조 관리하는 신용정보의 종류 및 이용 목적</h2>

            <h3 className="font-bold text-gray-800 mb-2">1. 신용정보의 종류</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>가. 개인식별정보</li>
              <li>나. 신용거래정보</li>
              <li>다. 신용능력정보</li>
              <li>라. 신용평가정보</li>
              <li>마. 연체·신용질서문란 등 신용도판단정보</li>
              <li>바. 공공정보</li>
              <li>사. 기타 금융거래의 설정, 유지, 이행, 관리를 위한 상담, 채권관리 등을 통해 생성되는 정보</li>
            </ul>

            <h3 className="font-bold text-gray-800 mb-2">2. 이용목적</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>가. 금융거래 등 상거래관계의 설정 및 유지여부 등의 판단 및 고객관리</li>
              <li>나. 상품서비스 안내 등 마케팅 활동</li>
              <li>다. 금융사고 조사, 분쟁해결, 민원처리, 수사협조 및 법령상 의무 이행 등</li>
              <li>라. 채권추심</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제2조 제공대상자, 제공받는자의 이용목적 및 제공하는 신용정보의 종류</h2>
            <p>회사는 원칙적으로 고객의 신용정보를 제1조에서 명시한 목적 범위 내에서 처리하며, 고객의 사전동의 없이 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 단, 법률의 규정에 의한 정보제공과 기타 법령이 허용한 위탁가능한 범위 내에서 신용정보를 제공합니다. 제3자 제공현황은 홈페이지 하단 &apos;제3자 제공현황&apos;에서 확인 가능합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제3조 보유 및 이용기간, 신용정보 파기절차 및 방법</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>1. 보유기간</strong>
                <p className="mt-1">회사와의 거래관계 존속 시 또는 고객정보제공 동의 철회 시까지</p>
              </li>
              <li>
                <strong>2. 파기절차 및 방법</strong>
                <p className="mt-1">신용정보는 이용목적 또는 제공받은 목적이 달성된 후 내부방침 및 기타 관련 법령(상법 등)에 의거 일정기간 저장된 후, 개인정보의 안전한 처리를 위하여 다음과 같은 방법으로 개인정보를 파기합니다.</p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                  <li>종이 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
                  <li>전자적 파일 형태의 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제4조 신용정보 처리를 위탁하는 경우에 그 업무의 내용 및 수탁</h2>
            <p>회사는 원칙적으로 이용자의 동의 없이 해당 개인정보의 처리를 타인에게 위탁하지 않습니다. 단, 이용자의 동의를 받아 회사가 현재 개인정보 처리를 위탁하는 사항은 홈페이지 하단 &apos;위탁현황&apos; 에서 확인 가능합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제5조 고객의 권리와 그 행사방법</h2>
            <p className="mb-4">고객은 개인정보 보호법, 신용정보의 이용 및 보호에 관한 법률 및 신용정보업감독규정 등에 따라 아래의 권리가 부여되어 있습니다.</p>
            <p className="mb-4 text-sm text-gray-600">동 권리를 행사하고자 하는 고객은 당사 홈페이지 또는 고객센터로 신청해주시기 바랍니다. 신청과 관련하여 불편함을 느끼시거나 애로가 있으신 경우 당사의 정보관리보호인, 또는 한국대부금융협회 소비자보호센터로 연락하여 주시기 바랍니다.</p>

            <div className="space-y-4">
              <div className="mb-10">
                <h3 className="font-bold text-gray-800 mb-2">1. 개인신용정보 열람 및 정정·삭제 청구</h3>
                <p className="text-sm mb-2">고객은 당사가 보유한 본인의 개인신용정보의 열람을 청구할 수 있으며, 본인의 개인신용정보가 사실과 다른 경우 이에 대한 정정 또는 삭제를 청구할 수 있습니다.</p>
                <p className="text-sm mb-2">고객은 처리결과에 이의가 있으면 금융위원회에 그 시정을 요청할 수 있습니다. 또한 고객은 금융거래 등 상거래관계가 종료되고 일정 기간(금융거래 등 상거래관계의 설정 및 유지 등에 필수적인 개인신용정보의 경우 5년, 그 외 개인신용정보의 경우 3개월)이 경과한 경우 본인의 개인신용정보의 삭제를 요구할 수 있습니다.</p>
                <p className="text-sm text-gray-600">단, 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우, 다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우 등에는 청구가 제한 또는 거절될 수 있습니다.</p>
              </div>

              <div className="mb-10">
                <h3 className="font-bold text-gray-800 mb-2">2. 개인신용정보 이용 및 제공사실 조회 및 통지 요청</h3>
                <p className="text-sm">고객은 당사가 본인에 관한 개인신용정보를 이용하거나 제공한 경우 최근 3년간의 &apos;이용 또는 제공한 주체, 목적, 날짜, 신용정보의 내용, 이용기간(보유기간) 등&apos;의 내역을 조회하거나, 개인신용정보를 이용하거나 제공하는 때에 해당 내역의 통지를 요청할 수 있습니다(단, 내부 경영관리의 목적으로 이용하거나 신용위험관리 등 내부통제, 고객분석과 상품 및 서비스 개발, 위탁업무 수행과 같은 반복적인 업무위탁을 위하여 제공한 정보는 포함되지 않습니다.)</p>
              </div>

              <div className="mb-10">
                <h3 className="font-bold text-gray-800 mb-2">3. 개인신용정보의 제공 동의 철회 및 연락중지 요청</h3>
                <p className="text-sm mb-2">고객은 개인신용정보를 제3자 제공하는 것에 대한 동의(개인신용평가회사, 개인사업자신용평가회사 또는 신용정보집중기관에 제공하여 개인의 신용도 등을 평가하기 위한 목적 제외)를 철회할 수 있습니다.</p>
                <p className="text-sm">다만, 해당 개인신용정보를 제공하지 아니하면 고객과 약정한 용역을 제공 못하게 되는 등 계약 이행이 어려워지거나, 고객이 신청한 금융거래 등 상거래관계의 설정 및 유지 여부 등을 판단하기 위한 목적을 달성할 수 없는 경우에는 고객이 동의를 철회하려면 그 용역의 제공을 받지 아니할 의사를 명확하게 밝혀야 합니다. 또한 고객은 상품이나 용역을 소개하거나 구매를 권유할 목적으로 고객에게 연락하는 것을 중지하도록 청구할 수 있습니다.</p>
              </div>

              <div className="mb-10">
                <h3 className="font-bold text-gray-800 mb-2">4. 자동화평가 결과에 대한 설명요구 및 이의제기</h3>
                <p className="text-sm mb-2">고객은 개인신용평가, 금융거래의 설정 및 유지 여부의 결정, 금융거래에 관한 계약의 청약 또는 승낙 여부의 결정을 자동화평가하는지 여부와 자동화평가를 하는 경우 자동화평가의 결과, 주요 기준, 이용된 기초정보의 개요에 대한 설명을 요구할 수 있습니다.</p>
                <p className="text-sm">또한 고객은 고객에게 자동화평가 결과의 산출에 유리하다고 판단되는 정보를 제출할 수 있으며, 자동화평가에 이용된 기초정보의 내용이 정확하지 아니하거나 최신의 정보가 아니라고 판단되는 경우 기초정보를 정정하거나 삭제하고 자동화평가 결과를 다시 산출할 것을 요구할 수 있습니다.</p>
              </div>

              <div className="mb-10">
                <h3 className="font-bold text-gray-800 mb-2">5. 상거래 거절 근거 신용정보의 고지</h3>
                <p className="text-sm mb-2">고객은 신용정보의 이용 및 보호에 관한 법률에 따라 회사가 개인신용평가회사 또는 신용정보집중기관으로부터 제공받은 개인신용정보에 근거하여 상거래관계 설정을 거절하거나 중지한 경우, 구두·서면 및 유·무선의 방법을 통해 거절 또는 중지의 근거가 된 정보 등을 요구할 수 있습니다.</p>
                <p className="text-sm">고객이 위 정보의 고지를 요청하는 경우, 당사는 신용정보주체인지 여부를 확인하기 위하여 본인의 신분을 나타내는 증표를 요구하는 등 본인확인을 위한 절차를 진행할 수 있습니다. 고객은 고지 받은 내용에 이의가 있는 경우 상거래 거절 또는 중지의 근거가 된 정보를 고지 받은 날로부터 60일 이내에 해당 신용정보를 수집·제공한 기관 및 신용정보집중기관에게 그 신용정보의 정확성을 확인하도록 요청할 수 있습니다.</p>
              </div>

              <div className="mb-10">
                <h3 className="font-bold text-gray-800 mb-2">6. 개인신용정보의 전송요구</h3>
                <p className="text-sm mb-2">고객은 신용정보의 이용 및 보호에 관한 법률에 따라 회사가 보유하고 있는 본인에 관한 개인신용정보를 본인, 본인신용정보관리회사, 개인신용평가회사 등에 전송하여 줄 것을 요구할 수 있습니다.</p>
                <p className="text-sm mb-3">자사가 보유하고 있는 개인신용정보를 본인 등에게 전송하거나 전송요구를 철회하고자 하는 경우 신용정보원의 MYPDS 앱을 통해서도 가능하며 본인 신용정보관리회사에 전송하거나 전송요구를 철회하고자 하는 경우 해당 회사의 마이데이터 앱 등을 통해서 가능합니다.</p>
                <div className="bg-white p-2 rounded text-sm mb-3">
                  <p>▷ 한국신용정보원 : 02-3705-5800 (www.kcredit.or.kr)</p>
                  <p>▷ 마이데이터 지원센터 : 02-3705-5900 (www.mydatacenter.or.kr)</p>
                </div>
                <p className="text-sm mb-2">고객은 위 전송요구를 철회할 수 있으며, 다음 각 내용을 모두 특정하여 전송요구를 신청하셔야 합니다.</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>가. 개인신용정보처리자로서 전송요구를 받는 자</li>
                  <li>나. 전송을 요구하는 개인신용정보</li>
                  <li>다. 전송요구에 따라 개인신용정보를 제공받는 자</li>
                  <li>라. 정기적인 전송을 요구하는지 여부 및 요구하는 경우 그 주기</li>
                  <li>마. 전송요구의 종료시점</li>
                  <li>바. 전송을 요구하는 목적 및 전송을 요구하는 개인신용정보의 보유기간</li>
                </ul>
                <p className="text-sm mt-2 text-gray-600">고객이 위와 같은 전송요구를 요청해 오는 경우, 당사는 신용정보주체인지 여부를 확인하기 위하여 본인의 신분을 나타내는 증표를 요구하는 등 본인확인을 위한 절차를 진행할 수 있습니다.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제6조 가명정보 처리현황</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>개인정보보호법 제28조의 2에 의거, 통계작성, 과학적연구, 공익적 기록보전 등을 위하여 개인정보를 가명처리할 수 있습니다. 그 외에 사항에 대하여는 가명정보를 처리하고 있지 않습니다. 만약 제공하는 경우가 발생한다면 그 즉시 공시할 예정입니다.</li>
              <li>통계작성, 과학적연구, 공익적 기록보전에 활용하기 위해 가명처리한 개인정보(이하 &apos;가명정보&apos;)는 가명처리 계획 수립시 정한 목적을 달성하는 기간(시점)까지만 보유·이용됩니다.</li>
              <li>당사는 상기1항의 목적 외에 가명정보를 제3자에게 제공하지 않습니다. 만약 제공하는 경우가 발생한다면 그 즉시 공시할 예정입니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제7조 신용정보 관리·보호 관련 고충을 처리하는 담당자</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-1">
                <li><strong>성명:</strong> 성정우 이사</li>
                <li><strong>부서:</strong> 영업총괄본부</li>
                <li><strong>연락처:</strong> 02-765-5555</li>
                <li><strong>이메일:</strong> eric@gmeremit.com</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3">「부 칙」</h2>
            <p>1. 신용정보 활용체제 시행일자 : 2024.12.30</p>
          </section>

        </div>
      </div>
    </main>
  );
}
