export default function ProductChangesTermPage() {
  return (
    <main className="min-h-screen py-5 md:py-20 px-4 md:px-8 lg:px-40">
      <div className="max-w-6xl mx-auto mt-15">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex justify-center">상품/약관 변경고시</h1>
        <div className="prose prose-lg max-w-none text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">대부거래표준약관 변경에 대한 안내(2025.05.21 시행)</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>1. 시행일 : 2025년 05월 21일부터 시행</li>
              <li>2. 대상고객 : 신용대출 상품을 이용하는 모든 고객(기존 고객 제외)</li>
              <li>3. 변경내용 : 변경된 대부거래표준약관에 대한 자세항 사항은 하단의 「기본약관」에서 확인하실 수 있습니다.</li>
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
                  <td className="border border-gray-300 px-4 py-3 text-center">대부거래기본약관</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">대부거래표준약관</td>
                </tr>

                <tr>
                  <td className="border border-gray-300 px-4 py-4 align-top">
                    <p className="font-semibold mb-2">제12조(기한의 이익의 상실) 제1항 제6호</p>
                    <p>6. 제16조(통지사항 및 효력) 1항에서 대부업자와 정한 약정을 위반하면서 분할상환원리금의 지급을 지체하는 등 건전한 계속 거래 유지가 어렵다고 인정된 때</p>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 align-top">
                    <p className="font-semibold mb-2">[삭제]</p>
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 px-4 py-4 align-top">
                    <p className="font-semibold mb-2">{`<특약 1~2항>`}</p>
                    <p className="mb-3">1.외국인 신용대출은 소재지 불명 또는 비자만료등 대부업자의 채권보전에 현저한 위험이 발생 할 수 있으므로 제12조(기한의 이익의 상실)1항을 1회라도 위반시 대부업자의 독촉 · 통지 등이 없어도, 채무자는 기한의 이익을 상실한다.</p>
                    <p className="mb-3">2. 대출금 상환을 하지 않고 본국으로 출국한 때에는 변호사 및 추심업체에 채권 추심을 위한 의뢰를 할 수 있으며, 또한 채무자의 본국 주소지를 관한하는 법원을 관한법원으로 하기로 한다.</p>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 align-top">
                    <p className="font-semibold mb-2">[삭제]</p>
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
