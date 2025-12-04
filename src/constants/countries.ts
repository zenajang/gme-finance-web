export type Country = {
  name: string;
  flag: string;
  code: string;
  scale: string | undefined;
};

export const COUNTRIES: Country[] = [
  { name: "Philippines", flag: "/images/country/philippines_r.svg", code: "ph", scale: "scale-75" },
  { name: "Pakistan", flag: "/images/country/pakistan_r.svg", code: "pk", scale: undefined },
  { name: "Russia", flag: "/images/country/russia_r.svg", code: "ru", scale: undefined },
  { name: "Mongolia", flag: "/images/country/mongolia_r.svg", code: "mn", scale: undefined },
  { name: "India", flag: "/images/country/india_r.svg", code: "in", scale: undefined },
  { name: "Uzbekistan", flag: "/images/country/uzbekistan_r.svg", code: "uz", scale: undefined },
  { name: "Thailand", flag: "/images/country/thailand_r.svg", code: "th", scale: undefined },
  { name: "SriLanka", flag: "/images/country/srilanka_r.svg", code: "lk", scale: undefined },
  { name: "Bangladesh", flag: "/images/country/bangladesh_r.svg", code: "bd", scale: undefined },
  { name: "Nepal", flag: "/images/country/nepal_r.svg", code: "np", scale: undefined },
  { name: "Myanmar", flag: "/images/country/myanmar_r.svg", code: "mm", scale: undefined },
  { name: "Indonesia", flag: "/images/country/indonesia_r.svg", code: "id", scale: undefined },
  { name: "Cambodia", flag: "/images/country/cambodia_r.svg", code: "kh", scale: undefined },
  { name: "Vietnam", flag: "/images/country/vietnam_r.svg", code: "vn", scale: "scale-100" },
];
