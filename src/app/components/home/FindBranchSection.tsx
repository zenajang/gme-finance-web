
"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";

type BranchInfo = {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  hours: string;
};

const BRANCHES: BranchInfo[] = [
  {
    id: "ansan",
    name: "Ansan Branch",
    subtitle: "Ansan Finance Center",
    address: "1st floor, 6, Damunhwa-gil, Danwon-gu, Ansan-si, Gyeonggi-do",
    phone: "031-492-1247",
    hours: "Hours: Daily 10:00AM ~ 7:00PM",
  },
  {
    id: "bupyeong",
    name: "Bupyeong Branch",
    subtitle: "Bupyeong Finance Center",
    address: "Bupyeong History Shooping Mall, 16 Gwangjang-ro, Bupyeong-gu, Incheon",
    phone: "032-361-0875",
    hours: "Hours: Sat - Wed, 10:00AM ~ 7:00PM",
  },
  {
    id: "dongdaemun",
    name: "Dongdaemun Branch",
    subtitle: "Seoul Postal Express",
    address: "315, Jong-ro Jongno-gu, Seoul (Dongdaemun Station – Exit 3)",
    phone: "02-763-5559",
    hours: "Hours: Daily 10:00AM ~ 7:00PM",
  },
  {
    id: "songu-ri",
    name: "Songu-ri Branch",
    subtitle: "Songu-ri Finance Center",
    address:
      "91, Solmoru-ro, Soheul-eup, Pocheon-si, Gyeonggi-do, Korea (Next to Nonghyub Bank)",
    phone: "031-541-1856",
    hours: "Hours: Sat - Wed, 10:00AM ~ 7:00PM",
  },
  {
    id: "mongolia",
    name: "Mongolia Town Branch",
    subtitle: "Mongolia Town Finance Center",
    address:
      "Mongol Town 3th floor, 12, Eulji-ro 44-gil, Jung-gu, Seoul, Seoul, South Korea",
    phone: "02-2261-5540",
    hours: "Hours: Daily 10:00AM ~ 7:00PM",
  },
  {
    id: "hwaseong",
    name: "Hwaseong Branch",
    subtitle: "Hwaseong Finance Center",
    address: "1st floor, 1109-3 3.1manse-ro, Hyangnam-eup, Hwaseong-si, Gyeonggi-do",
    phone: "031-354-0450​",
    hours: "Hours: Fri - Tue, 10:00AM ~ 7:00PM",
  },
  {
    id: "suwon",
    name: "Suwon Branch",
    subtitle: "Suwon Finance Center",
    address: "2-10, Maesan-ro, Paldal-gu, Suwon-si, Gyeonggi-do",
    phone: "031-207-5559",
    hours: "Hours: Daily 10:00AM ~ 7:00PM",
  },
  {
    id: "daerim",
    name: "Daerim Branch",
    subtitle: "Daerim Finance Center",
    address: "1st floor, 134 Dorim-ro, Yeongdeungpo-gu, Seoul",
    phone: "02-841-8884",
    hours: "Hours: Daily 10:00AM ~ 7:00PM",
  },
  {
    id: "itaewon",
    name: "Itaewon Branch",
    subtitle: "Itaewon Finance Center",
    address: "Itaewon-ro, Yongsan-gu, Seoul",
    phone: "-",
    hours: "Hours: Daily 10:00AM ~ 7:00PM",
  },
  {
    id: "daegu",
    name: "Daegu Branch",
    subtitle: "Daegu Finance Center",
    address: "1st floor, 64, Seongseo-ro 69-gil, Dalseo-gu, Daegu",
    phone: "053-591-2603",
    hours: "Hours: Mon - Fri (10:00AM ~ 6:00PM), Sat-Sun (10:00AM ~ 7:00PM)",
  },
  {
    id: "gimhae",
    name: "Gimhae Branch",
    subtitle: "Gimhae Finance Center",
    address: "84, Garak-ro, Gimhae-si, Gyeongsangnam-do, (Opposite to Top Mart)",
    phone: "055-329-5559​",
    hours: "Hours: Daily 10:00AM ~ 7:00PM",
  },
  {
    id: "gwangju",
    name: "Gwangju Branch",
    subtitle: "Gwangju Finance Center",
    address: "7-2, Gwangsan-ro, Gwangsan-gu, Gwangju",
    phone: "062-942-5598",
    hours: "Hours: Sat - Wed, 10:00AM ~ 7:00PM",
  },
];

export default function FindBranchSection() {
  const [selectedBranch, setSelectedBranch] = useState<BranchInfo>(BRANCHES[2]); // Default: Dongdaemun

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const found = BRANCHES.find((b) => b.id === id);
    if (found) {
      setSelectedBranch(found);
    }
  };

  return (
    <div className="relative">
      <section className="relative h-50 md:h-70 lg:h-70">
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-5xl lg:text-5xl font-bold text-center mb-2">
            Find a branch
          </h2>
          <p className="text-xs md:text-xl lg:text-xl text-center mb-5 md:mb-10 lg:mb-10">
            Visit a nearby GME Finance branch for a consultation!
          </p>

          {/* 🔽 여기 검색 인풋 → 셀렉트 박스로 변경 */}
          <div className="relative max-w-2xl w-full">
            <div className="relative">
              <select
                value={selectedBranch.id}
                onChange={handleSelectChange}
                className="w-full px-4 py-3 pr-10 rounded-3xl text-body text-black bg-white border border-gray-300 appearance-none"
              >
                {BRANCHES.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Info */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="space-y-3">
              <div className="p-4">
                <div className="flex items-start">
                  <Image
                    src="/images/icons/pin_red.svg"
                    alt="location"
                    width={12}
                    height={16}
                    className="mt-1 mr-3 flex-shrink-0"
                  />
                  <p className="font-medium text-[0.65rem] text-gray-800">
                    {selectedBranch.address}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center">
                  <Image
                    src="/images/icons/phone.svg"
                    alt="phone"
                    width={12}
                    height={16}
                    className="mr-3 flex-shrink-0"
                  />
                  <p className="font-medium text-[0.65rem] text-gray-800">
                    {selectedBranch.phone}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center">
                  <Image
                    src="/images/icons/time.svg"
                    alt="time"
                    width={12}
                    height={16}
                    className="mr-3 flex-shrink-0"
                  />
                  <p className="font-medium text-[0.65rem] text-gray-800">
                    {selectedBranch.hours}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute left-0 bottom-0">
            <Image
              src="/images/earth.svg"
              alt="earth background"
              width={500}
              height={500}
              className="object-contain h-full ml-auto"
            />
          </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="space-y-15 text-sm">
                <p className="font-medium text-lg">
                  <Image
                    src="/images/icons/pin_red.svg"
                    alt="location"
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                  />
                  {selectedBranch.address}
                </p>
                <p className="font-medium text-lg">
                  <Image
                    src="/images/icons/phone.svg"
                    alt="phone"
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                  />
                  {selectedBranch.phone}
                </p>
                <p className="font-medium text-lg">
                  <Image
                    src="/images/icons/time.svg"
                    alt="time"
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                  />
                  {selectedBranch.hours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
