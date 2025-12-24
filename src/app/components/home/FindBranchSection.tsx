"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

type BranchInfo = {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  hours: string;
};

export default function FindBranchSection() {
  const { t } = useTranslation();

  const BRANCHES: BranchInfo[] = useMemo(() => [
    {
      id: "ansan",
      name: t("ansanBranch"),
      subtitle: "Ansan Finance Center",
      address: t("branch.ansanAddress"),
      phone: "031-492-1247",
      hours: `${t("daily")} 10:00AM ~ 7:00PM`,
    },
    {
      id: "bupyeong",
      name: t("bupyeongBranch"),
      subtitle: "Bupyeong Finance Center",
      address: t("branch.bupyeongAddress"),
      phone: "032-361-0875",
      hours: "Sat - Wed, 10:00AM ~ 7:00PM",
    },
    {
      id: "dongdaemun",
      name: t("dongdaemunBranch"),
      subtitle: "Seoul Postal Express",
      address: t("branch.dongdaemunAddress"),
      phone: "02-763-5559",
      hours: `${t("daily")} 10:00AM ~ 7:00PM`,
    },
    {
      id: "songu-ri",
      name: t("songuriBranch"),
      subtitle: "Songu-ri Finance Center",
      address: t("branch.songuriAddress"),
      phone: "031-541-1856",
      hours: "Sat - Wed, 10:00AM ~ 7:00PM",
    },
    {
      id: "mongolia",
      name: t("mongoliaBranch"),
      subtitle: "Mongolia Town Finance Center",
      address: t("branch.mongoliaAddress"),
      phone: "02-2261-5540",
      hours: `${t("daily")} 10:00AM ~ 7:00PM`,
    },
    {
      id: "hwaseong",
      name: t("hwaseongBranch"),
      subtitle: "Hwaseong Finance Center",
      address: t("branch.hwaseongAddress"),
      phone: "031-354-0450​",
      hours: "Fri - Tue, 10:00AM ~ 7:00PM",
    },
    {
      id: "suwon",
      name: t("suwonBranch"),
      subtitle: "Suwon Finance Center",
      address: t("branch.suwonAddress"),
      phone: "031-207-5559",
      hours: `${t("daily")} 10:00AM ~ 7:00PM`,
    },
    {
      id: "daerim",
      name: t("daerimBranch"),
      subtitle: "Daerim Finance Center",
      address: t("branch.daerimAddress"),
      phone: "02-841-8884",
      hours: `${t("daily")} 10:00AM ~ 7:00PM`,
    },
    {
      id: "itaewon",
      name: t("itaewonBranch"),
      subtitle: "Itaewon Finance Center",
      address: t("branch.itaewonAddress"),
      phone: "-",
      hours: `${t("daily")} 10:00AM ~ 7:00PM`,
    },
    {
      id: "daegu",
      name: t("daeguBranch"),
      subtitle: "Daegu Finance Center",
      address: t("branch.daeguAddress"),
      phone: "053-591-2603",
      hours: "Mon - Fri (10:00AM ~ 6:00PM), Sat-Sun (10:00AM ~ 7:00PM)",
    },
    {
      id: "gimhae",
      name: t("gimhaeBranch"),
      subtitle: "Gimhae Finance Center",
      address: t("branch.gimhaeAddress"),
      phone: "055-329-5559​",
      hours: `${t("daily")} 10:00AM ~ 7:00PM`,
    },
    {
      id: "gwangju",
      name: t("gwangjuBranch"),
      subtitle: "Gwangju Finance Center",
      address: t("branch.gwangjuAddress"),
      phone: "062-942-5598",
      hours: "Sat - Wed, 10:00AM ~ 7:00PM",
    },
  ], [t]);

  const [selectedBranchId, setSelectedBranchId] = useState<string>("dongdaemun");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 branch 정보 (언어 변경 시 자동으로 번역된 이름 사용)
  const selectedBranch = useMemo(() => {
    return BRANCHES.find(branch => branch.id === selectedBranchId) || BRANCHES[2];
  }, [BRANCHES, selectedBranchId]);

  const handleSelect = (branch: BranchInfo) => {
    setSelectedBranchId(branch.id);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <section className="relative h-60 md:h-70 lg:h-100">
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-5xl lg:text-5xl font-bold text-center mb-4 lg:mb-10 lg:mt-15">
            Find a branch
          </h2>
          <p className="text-subheading text-center mb-5 md:mb-10 lg:mb-15 text-red-500 font-medium">
            {t('home.findBranchSubtitle')}
          </p>
          <div className="relative z-[200] max-w-7xl w-full mb-10" ref={dropdownRef}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 md:px-6 py-4 md:py-6 pr-10 md:pr-12 rounded-md text-left text-black bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div className="text-md md:text-3xl font-semibold">{selectedBranch.name}</div>
                <div className="text-xs md:text-lg text-gray-500 mt-1">Global Money Express</div>
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <svg
                    className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {isOpen && (
                <div className="absolute z-[200] w-full mt-2 rounded-md shadow-[0_0_20px_rgba(0,0,0,0.15)] max-h-80 overflow-y-auto bg-white">
                  {BRANCHES.map((branch) => {
                    const isSelected = selectedBranch.id === branch.id;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => handleSelect(branch)}
                        className={`w-full px-6 py-4 text-left transition-colors ${isSelected
                          ? "bg-red-50"
                          : "bg-white hover:bg-gray-100"
                          }`}
                      >
                        <div className={`text-md lg:text-xl font-semibold ${isSelected ? "text-red-600" : "text-black"}`}>
                          {branch.name}
                        </div>
                        <div className={`text-xs lg:text-sm ${isSelected ? "text-red-400" : "text-gray-500"}`}>
                          Global Money Express
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Branch Info */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="space-y-3">
              <div className="p-3">
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

              <div className="p-3">
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

              <div className="p-3">
                <div className="flex items-center">
                  <Image
                    src="/images/icons/time.svg"
                    alt="time"
                    width={12}
                    height={16}
                    className="mr-3 flex-shrink-0"
                  />
                  <p className="font-medium text-[0.65rem] text-gray-800">
                    {t('hours')}: {selectedBranch.hours}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute left-0 bottom-0 -z-10">
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
          <div className="hidden md:grid gap-8 items-center mt-13 mb-8 ml-5">
            <div className="space-y-15 text-sm">
              <p className="font-semibold text-xl">
                <Image
                  src="/images/icons/pin_red.svg"
                  alt="location"
                  width={26}
                  height={26}
                  className="inline-block mr-10"
                />
                {selectedBranch.address}
              </p>
              <p className="font-semibold text-xl">
                <Image
                  src="/images/icons/phone.svg"
                  alt="phone"
                  width={26}
                  height={26}
                  className="inline-block mr-10"
                />
                {selectedBranch.phone}
              </p>
              <p className="font-semibold text-xl mb-15">
                <Image
                  src="/images/icons/time.svg"
                  alt="time"
                  width={26}
                  height={26}
                  className="inline-block mr-10 mb-1"
                />
                {t('hours')}: {selectedBranch.hours}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
