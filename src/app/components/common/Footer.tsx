import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F2F2F2] py-12">
      <div className="px-45">
        <div className="flex items-start gap-6 mb-8">
          <Image 
            src="/images/logo_g.png" 
            alt="GME Finance Logo" 
            width={120} 
            height={60}
            className="object-contain"
          />
          <div className="text-sm text-gray-600 space-y-1">
            <p>상호: 주식회사 지엠이대부</p>
            <p>브랜드명: GME Loan</p>
            <p>대표이등록번호: 2019-금감원-1801</p>
            <p>대표자: 성종화</p>
            <p>사업자등록번호: 646-88-01104</p>
            <p>소재지: 서울특별시 영등포구 영등포로 150, 비동 202호, 203호, 204호(당산동1가, 생각공장당산) (우)07292</p>
            <p>전화번호(영업소): 02-765-5555</p>
          </div>
        </div>
        <span className="block w-full border-1 border-gray-300 mb-8"/>
        <div className="space-y-4 text-xs text-gray-600 mb-6">
          <p>
            <span>대출금리 :</span> 연 20% 이내<br/>
            <span>연체금리 :</span> 대출금리+연3%이내(법정최고금리 20% 이내) 단, 2021.07.07 부터 계정된 것신, 연장되는 계약에 한함<br/>
            <span>대출기간 :</span> 4개월 ~ 60개월
          </p>

          <p>
            부대비용 및 중도상환수수료 없음. 이자는 매월 약정일에 부과되며, 상환금액은 대출기간 및 상환방법 등 대출계약 내용에 따라 달라질 수 있음(예시. 100만원을 연 20%로 12개월 동안 원리금균등 상환 시 총 납부금액은 1,111,614원). 공공정보, 신용도판단정보, 채무불이행정보 등의 보유자는 대출취급이 제한될 수 있습니다. 일반금융소비자는 금융판매사업자로부터 충분히 설명을 받을 권리가 있으며, 계약체결 전 금융상품 설명서 및 약관을 읽어보시기 바랍니다. 일정기간 납부해야 할 원리금이 연체될 경우 계약만료 기한이 도래하기 전에 모든 원리금을 변제해야 할 의무가 발생할 수 있습니다.
          </p>

          <p>
            대출 시 또는 상환능력에 비해 대출금이 과도할 경우 귀하의 신용등급 또는 개인신용평점이 하락할 수 있습니다. 개인신용평점 하락으로 금융거래와 관련된 불이익이 발생할 수 있습니다.
          </p>

          <p className="text-red-600 font-semibold">
            과도한 빚은 당신에게 큰 불행을 안겨줄 수 있습니다.
          </p>

          <p>
            이자 외 별도로 중개수수료를 수취하는 일은 불법입니다.
          </p>
        </div>

        <div className="pt-6 text-xs text-gray-600">
          <p className="mb-2">
            <span className="font-semibold">© 2025 GME Finance.</span> | 
            <Link href="/usage" className="underline ml-1">이용약관</Link> | 
            <Link href="/privacy" className="underline ml-1">대부업체 기본약관</Link> | 
            <Link href="/marketing" className="underline ml-1">상품/연관 변경고지</Link> | 
            <Link href="/personal-info" className="underline ml-1">개인정보취급(처리)방침</Link> | 
            <Link href="/credit-info" className="underline ml-1">신용정보활용체제</Link> | 
            <Link href="/guidelines" className="underline ml-1">고객 권리안내문</Link> | 
            <Link href="/restrictions" className="underline ml-1">제3자 제공현황 및 위탁현황</Link> | 
            <Link href="/manual" className="underline ml-1">Product Manual</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}