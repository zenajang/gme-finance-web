export type Country = {
  name: string;
  flag: string;
  code: string;
};

export const COUNTRIES: Country[] = [
  { name: "Uzbekistan", flag: "/images/country/uzbekistan_r.png", code: "uz" },
  { name: "Indonesia", flag: "/images/country/indonesia_r.png", code: "id" },
  { name: "Myanmar", flag: "/images/country/myanmar_r.png", code: "mm" },
  { name: "Sri Lanka", flag: "/images/country/srilanka_r.png", code: "lk" },
  { name: "Bangladesh", flag: "/images/country/bangladesh_r.png", code: "bd" },
  { name: "Nepal", flag: "/images/country/nepal_r.png", code: "np" },
  { name: "Cambodia", flag: "/images/country/cambodia_r.png", code: "kh" },
  { name: "Philippines", flag: "/images/country/philippines_r.png", code: "ph" },
  { name: "Mongolia", flag: "/images/country/mongolia_r.png", code: "mn" },
  { name: "Thailand", flag: "/images/country/thailand_r.png", code: "th" },
  { name: "Vietnam", flag: "/images/country/vietnam_r.png", code: "vn" },
  { name: "Russia", flag: "/images/country/russia_r.png", code: "ru" },
  { name: "India", flag: "/images/country/india_r.png", code: "in" },
  { name: "Pakistan", flag: "/images/country/pakistan_r.png", code: "pk" },
];

// 대출 상담 폼용 국적 리스트
export const NATIONALITIES: Country[] = [
  { name: "Bangladesh", flag: "", code: "bd" },
  { name: "Cambodia", flag: "", code: "kh" },
  { name: "China", flag: "", code: "cn" },
  { name: "CIS", flag: "", code: "cis" },
  { name: "India", flag: "", code: "in" },
  { name: "Indonesia", flag: "", code: "id" },
  { name: "Laos", flag: "", code: "la" },
  { name: "Mongolia", flag: "", code: "mn" },
  { name: "Myanmar", flag: "", code: "mm" },
  { name: "Nepal", flag: "", code: "np" },
  { name: "Pakistan", flag: "", code: "pk" },
  { name: "Philippines", flag: "", code: "ph" },
  { name: "Sri Lanka", flag: "", code: "lk" },
  { name: "Thailand", flag: "", code: "th" },
  { name: "Vietnam", flag: "", code: "vn" },
  { name: "African Nationalities", flag: "", code: "african" },
  { name: "Western Nationalities", flag: "", code: "western" }
];

// 국가별 대출 가능 비자 타입
export const COUNTRY_VISA_TYPES: Record<string, string[]> = {
  bd: ["E9", "E7", "F2", "F5", "F6", "D2"],
  kh: ["E9", "E7", "F2", "F5", "F6", "D-2"],
  cn: ["E9", "E7", "F2", "F5", "F6", "D2"],
  cis: ["D2", "E9", "E7", "F2", "F4", "F5", "F6", "H2"],
  in: ["E9", "E7", "F2", "F5", "F6", "D2"],
  id: ["D2", "E7-1", "E7-3", "E7-4", "E9", "E10", "F2", "F4", "F5", "F6"],
  la: ["E9", "E7", "F2", "F5", "F6", "D2"],
  mn: ["E9", "E7", "F2", "F5", "F6", "D8"],
  mm: ["E9", "E7", "F2", "F5", "F6", "D8"],
  np: ["E9", "E7", "F2", "D2", "F5", "F6", "D8"],
  pk: ["E9", "E7", "F2", "F5", "F6", "D8", "D2"],
  ph: ["E9", "E7", "E3", "F2", "F5", "F6", "D2", "G1"],
  lk: ["E9", "E7", "F2", "F5", "F6", "D8"],
  th: ["E9", "E7", "F2", "F5", "F6", "D2"],
  vn: ["E10", "E9", "E7", "F2", "F5", "F6", "D2"],
  african: ["E9", "E7", "F2", "F5", "F6", "D2"],
  western: ["E9", "E7", "F2", "F5", "F6", "D2"],
};

// 국가별 담당자 이메일
export const COUNTRY_EMAILS: Record<string, string> = {
  bd: "gmefinancebd@gmeremit.com",
  kh: "gmefinancekh@gmeremit.com",
  cn: "gmefinancechina@gmeremit.com",
  cis: "gmefinancecis@gmeremit.com",
  in: "gmefinanceindia@gmeremit.com",
  id: "gmefinanceidn@gmeremit.com",
  la: "gmefinancepak@gmeremit.com",
  mn: "gmefinancemongolia@gmeremit.com",
  mm: "gmefinancemyan@gmeremit.com",
  np: "gmefinancenepal@gmeremit.com",
  pk: "gmefinancepak@gmeremit.com",
  ph: "gmefinanceph@gmeremit.com",
  lk: "gmefinancesl@gmeremit.com",
  th: "gmefinancethailand@gmeremit.com",
  vn: "gmefinancevietnam@gmeremit.com",
  african: "gmefinancepak@gmeremit.com",
  western: "gmefinancepak@gmeremit.com"
};
