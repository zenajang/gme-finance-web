export default function MarketingPage() {
  return (
    <main className="min-h-screen py-5 md:py-20 px-4 md:px-8 lg:px-40">
      <div className="max-w-6xl mx-auto mt-15">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex justify-center">상품/약관 변경고시</h1>
        <div className="prose prose-lg max-w-none text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">대부거래기본약관 변경에 대한 안내(2023.12.01 시행)</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>1. 시행일 : 2023년 12월 01일부터 시행</li>
              <li>2. 대상고객 : 신용대출 상품을 이용하는 모든 고객(기존 고객 제외)</li>
              <li>3. 변경내용 : 변경된 대부거래기본약관에 대한 자세항 사항은 하단의 “기본약관”에서 확인하실 수 있습니다.</li>
            </ul>
          </section>


          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-5 flex justify-center">대부거래표준약관 신구대조표</h2>

          {/* 비교 표 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900 w-1/2">변경 전</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900 w-1/2">변경 후</th>
                </tr>
              </thead>
              <tbody>
                {/* 약관명 */}
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-center">대부거래표준약관</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">대부거래기본약관</td>
                </tr>

                {/* 제1조 (목적) */}
                <tr>
                  <td className="border border-gray-300 px-4 py-4 align-top">
                    <p className="font-semibold mb-2">제1조(목적)</p>
                    <p>이 약관은 대부업자와 채무자간의 대부거래에 있어서 권리와 의무를 명확히 하고 공정하며 건전한 금전소비대차를 하는 것을 목표로 한다.</p>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 align-top">
                    <p className="font-semibold mb-2">제1조(목적)</p>
                    <p>이 약관은 (주)지엠이대부(이하 &quot;대부업자&quot; 라고 한다)와 채무자 간의 대부거래에 있어서 권리와 의무를 명확히 하고 공정하며 건전한 금전소비대차를 하는 것을 목표로 한다.</p>
                  </td>
                </tr>

                {/* 제12조 (기한의 이익의 상실) */}
                <tr>
                  <td className="border border-gray-300 px-4 py-4 align-top">
                    <p className="font-semibold mb-2">제12조(기한의 이익의 상실)</p>
                    <p className="mb-3">① 채무자에게 다음 각 호의 사유가 발생한 경우에는 대부업자로부터의 독촉 · 통지 등이 없어도, 채무자는 기한의 이익을 상실한다.</p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>채무자가 제공한 담보재산에 대하여 압류명령이나 체납처분 압류 통지가 발송된 때 또는 기타의 방법에 의한 강제집행개시나 체납처분착수가 있는 때</li>
                      <li>채무불이행자명부 등재 신청이 있는 때</li>
                      <li>어음교환소의 거래정지처분이 있을 때</li>
                      <li>도피 또는 기타의 사유로 금융기관에서 채무자에 대한 지급을 정지한 것으로 인정된 때</li>
                      <li>파산신청이 있는 때</li>
                    </ol>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 align-top">
                    <p className="font-semibold mb-2">제12조(기한의 이익의 상실)</p>
                    <p className="mb-3">① 채무자에게 다음 각 호의 사유가 발생한 경우에는 대부업자로부터의 독촉 · 통지 등이 없어도, 채무자는 기한의 이익을 상실한다.</p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>채무자가 제공한 담보재산에 대하여 압류명령이나 체납처분 압류 통지가 발송된 때 또는 기타의 방법에 의한 강제집행개시나 체납처분착수가 있는 때</li>
                      <li>채무불이행자명부 등재 신청이 있는 때</li>
                      <li>어음교환소의 거래정지처분이 있을 때</li>
                      <li>도피 또는 기타의 사유로 금융기관에서 채무자에 대한 지급을 정지한 것으로 인정된 때</li>
                      <li>파산신청이 있는 때</li>
                      <li className="text-red-600 font-medium">(신설)제16조(통지사항 및 효력) 1항에서 대부업자와 정한 약정을 위반하면서 분할상환원리금의 지급을 지체하는 등 건전한 계속 거래 유지가 어렵다고 인정된 때</li>
                    </ol>
                    <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="font-semibold text-red-600 mb-2">(신설)&lt;특약&gt;</p>
                      <p className="text-sm">외국인 신용대출은 소재지 불명 또는 비자만료등 대부업자의 채권보전에 현저한 위험이 발생 할 수 있으므로 제12조(기한의 이익의 상실)1항을 1회라도 위반시 대부업자의 독촉 · 통지 등이 없어도, 채무자는 기한의 이익을 상실한다.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </main>
  );
}
