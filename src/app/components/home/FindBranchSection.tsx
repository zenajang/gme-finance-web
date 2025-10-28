'use client';

import Image from "next/image";
import { useState } from "react";

type ProcessItem = {
  id: string;
  content: string;
  icon: string;
  name: string;
};

const PROCESS: ProcessItem[] = [
  {
    id: 'apply gme app',
    content: "Download GME app on google play and app store Register and apply loan",
    icon: '/images/icons/app.svg',
    name: 'APPLY THROUGH GME APP',
  },
  {
    id: 'requirement submission',
    content: 'Fill up your information and submit required docs',
    icon: '/images/icons/submission.svg',
    name:'REQUIREMENT SUBMISSION'
  },
  {
    id: 'verification',
    content: 'Our staff will verify your documents and will check your credit standing',
    icon: '/images/icons/verification.svg',
    name :'VERIFICATION'
  },
  {
    id: 'approval',
    content: 'Once approved, contract signing will be digital',
    icon: '/images/icons/approval.svg',
    name:'APPROVAL'
  },
  {
    id: 'disbursements',
    content: 'After contract signing we will deposit the loan amount to your bank account',
    icon: '/images/icons/disbursements.svg',
    name :'DISBURSEMENTS'
  },
];

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
    id: 'ansan',
    name: 'Ansan Branch',
    subtitle: 'Ansan Finance Center',
    address: '1st floor, 6, Damunhwa-gil, Danwon-gu, Ansan-si, Gyeonggi-do',
    phone: '031-492-1247',
    hours: 'Hours: Daily 10:00AM ~ 7:00PM'
  },
  {
    id: 'bupyeong',
    name: 'Bupyeong Branch',
    subtitle: 'Bupyeong Finance Center',
    address: 'Bupyeong History Shooping Mall, 16 Gwangjang-ro, Bupyeong-gu, Incheon',
    phone: '032-361-0875',
    hours: 'Hours: Sat - Wed, 10:00AM ~ 7:00PM'
  },
  {
    id: 'dongdaemun',
    name: 'Dongdaemun Branch',
    subtitle: 'Seoul Postal Express',
    address: '315, Jong-ro Jongno-gu, Seoul (Dongdaemun Station – Exit 3)',
    phone: '02-763-5559',
    hours: 'Hours: Daily 10:00AM ~ 7:00PM'
  },
  {
    id: 'songu-ri',
    name: 'Songu-ri Branch',
    subtitle: 'Songu-ri Finance Center',
    address: '91, Solmoru-ro, Soheul-eup, Pocheon-si, Gyeonggi-do, Korea (Next to Nonghyub Bank)',
    phone: '031-541-1856',
    hours: 'Hours: Sat - Wed, 10:00AM ~ 7:00PM'
  },
  {
    id: 'mongolia',
    name: 'Mongolia Town Branch',
    subtitle: 'Mongolia Town Finance Center',
    address: 'Mongol Town 3th floor, 12, Eulji-ro 44-gil, Jung-gu, Seoul, Seoul, South Korea',
    phone: '02-2261-5540',
    hours: 'Hours: Daily 10:00AM ~ 7:00PM'
  },
  {
    id: 'hwaseong',
    name: 'Hwaseong Branch',
    subtitle: 'Hwaseong Finance Center',
    address: '1st floor, 1109-3 3.1manse-ro, Hyangnam-eup, Hwaseong-si, Gyeonggi-do',
    phone: '031-354-0450​',
    hours: 'Hours: Fri - Tue, 10:00AM ~ 7:00PM'
  },
  {
    id: 'suwon',
    name: 'Suwon Branch',
    subtitle: 'Suwon Finance Center',
    address: '2-10, Maesan-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    phone: '031-207-5559',
    hours: 'Hours: Daily 10:00AM ~ 7:00PM'
  },
  {
    id: 'daerim',
    name: 'Daerim Branch',
    subtitle: 'Daerim Finance Center',
    address: '1st floor, 134 Dorim-ro, Yeongdeungpo-gu, Seoul',
    phone: '02-841-8884',
    hours: 'Hours: Daily 10:00AM ~ 7:00PM'
  },
  {
    id: 'itaewon',
    name: 'Itaewon Branch',
    subtitle: 'Itaewon Finance Center',
    address: 'Itaewon-ro, Yongsan-gu, Seoul',
    phone: '-',
    hours: 'Hours: Daily 10:00AM ~ 7:00PM'
  },
  {
    id: 'daegu',
    name: 'Daegu Branch',
    subtitle: 'Daegu Finance Center',
    address: '1st floor, 64, Seongseo-ro 69-gil, Dalseo-gu, Daegu',
    phone: '053-591-2603',
    hours: 'Hours: Mon - Fri (10:00AM ~ 6:00PM), Sat-Sun (10:00AM ~ 7:00PM)'
  },
  {
    id: 'gimhae',
    name: 'Gimhae Branch',
    subtitle: 'Gimhae Finance Center',
    address: '84, Garak-ro, Gimhae-si, Gyeongsangnam-do, (Opposite to Top Mart)',
    phone: '055-329-5559​',
    hours: 'Hours: Daily 10:00AM ~ 7:00PM'
  },
  {
    id: 'gwangju',
    name: 'Gwangju Branch',
    subtitle: 'Gwangju Finance Center',
    address: '7-2, Gwangsan-ro, Gwangsan-gu, Gwangju',
    phone: '062-942-5598',
    hours: 'Hours: Sat - Wed, 10:00AM ~ 7:00PM'
  }
];

export default function FindBranchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<BranchInfo>(BRANCHES[2]); // Default to Dongdaemun

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    const found = BRANCHES.find(branch =>
      branch.name.toLowerCase().includes(query) ||
      branch.id.toLowerCase().includes(query)
    );

    if (found) {
      setSelectedBranch(found);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

// Helper function to get pin position for each branch on the map
const getBranchPinPosition = (branchId: string, isMobile: boolean = false): { top: string; left: string } => {
  const mobilePositions: Record<string, { top: string; left: string }> = {
    ansan: { top: '27%', left: '37%' },
    bupyeong: { top: '20%', left: '32%' },
    dongdaemun: { top: '20%', left: '40%' },
    'songu-ri': { top: '11%', left: '45%' },
    mongolia: { top: '19%', left: '39%' },
    hwaseong: { top: '30%', left: '38%' },
    suwon: { top: '28%', left: '40%' },
    daerim: { top: '21%', left: '38%' },
    itaewon: { top: '20%', left: '41%' },
    daegu: { top: '55%', left: '73%' },
    gimhae: { top: '66%', left: '79%' },
    gwangju: { top: '67%', left: '37%' },
  };

  const desktopPositions: Record<string, { top: string; left: string }> = {
    ansan: { top: '27%', left: '27%' },
    bupyeong: { top: '20%', left: '23%' },
    dongdaemun: { top: '20%', left: '29%' },
    'songu-ri': { top: '12%', left: '33%' },
    mongolia: { top: '19%', left: '28%' },
    hwaseong: { top: '30%', left: '27%' },
    suwon: { top: '28%', left: '30%' },
    daerim: { top: '21%', left: '27%' },
    itaewon: { top: '21%', left: '30%' },
    daegu: { top: '55%', left: '56%' },
    gimhae: { top: '65%', left: '60.5%' },
    gwangju: { top: '67%', left: '27%' },
  };

  const positions = isMobile ? mobilePositions : desktopPositions;
  return positions[branchId] || { top: '50%', left: '50%' };
};

  return (
    <div className="relative">
      <section className="relative h-45 md:h-70 lg:h-70 bg-gray-900">
        <Image
          src="/images/branch_bg.jpg"
          alt="branch background"
          fill
          className="object-cover opacity-50"
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-white">
          <h2 className="text-xl md:text-5xl lg:text-5xl font-bold text-white text-center mb-2">Find a branch</h2>
          <p className="text-xs md:text-xl lg:text-xl text-center text-white mb-5 md:mb-10 lg:mb-10">Visit a nearby GME Finance branch for a consultation!</p>
          <div className="relative max-w-2xl w-full">
            <input
              type="text"
              placeholder="Go to Store Locator"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 pr-14 rounded-3xl text-body text-black bg-white border border-gray-300"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-red-600 rounded-3xl hover:bg-red-700 transition-colors"
            >
              <img src="/images/icons/search.svg" alt="search" className="w-3 h-3 md:w-5 md:h-5 lg:w-5 lg:h-5"/>
            </button>
          </div>
        </div>
      </section>

      {/* Branch Info */}
      <section className="relative py-10 overflow-hidden">
        {/* Earth Background - Desktop only */}
        <div className="hidden md:block absolute left-0 bottom-0 w-1/2">
          <Image
            src="/images/earth.svg"
            alt="earth background"
            width={1000}
            height={1000}
            className="object-contain h-full ml-auto"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Centered Title and Subtitle */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-black-600">{selectedBranch.name}</h2>
              <p className="text-base font-medium text-red-600">{selectedBranch.subtitle}</p>
            </div>

          <div className="relative mb-6 -mx-4">
            <div className="relative w-full overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
              <Image
                src="/images/earth.svg"
                alt="earth background"
                width={800}
                height={800}
                className="object-contain w-full"
                style={{ 
                  transform: 'scale(1.4)',
                  marginLeft:'30px'
                }}
              />
            </div>
              <div className="relative z-10 flex justify-center px-4">
                <Image
                  src="/images/map.svg"
                  alt="Branch location"
                  width={280}
                  height={280}
                  className="object-cover w-full"
                />
              </div>
                {/* All branch pins */}
                {BRANCHES.map((branch) => {
                  const position = getBranchPinPosition(branch.id,true);
                  const isSelected = selectedBranch.id === branch.id;

                  return (
                    <div
                      key={branch.id}
                      className="absolute cursor-pointer hover:scale-110 transition-transform z-11"
                      style={{
                        top: position.top,
                        left: position.left,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onClick={() => setSelectedBranch(branch)}
                      title={branch.name}
                    >
                      <Image
                        src={isSelected ? '/images/icons/pin_red.svg' : '/images/icons/pin_black.svg'}
                        alt={`${branch.name} pin`}
                        width={18}
                        height={18}
                        className={isSelected ? 'animate-pulse' : ''}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Branch Info Cards */}
            <div className="space-y-3">
              {/* Address Card */}
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                <div className="flex items-start">
                  <Image
                    src="/images/icons/pin_red.svg"
                    alt="location"
                    width={12}
                    height={16}
                    className="mt-1 mr-3 flex-shrink-0"
                  />
                  <p className="font-medium text-base text-[0.65rem] text-gray-800">{selectedBranch.address}</p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                <div className="flex items-center">
                  <Image
                    src="/images/icons/phone.svg"
                    alt="phone"
                    width={12}
                    height={16}
                    className="mr-3 flex-shrink-0"
                  />
                  <p className="font-medium text-base text-[0.65rem] text-gray-800">{selectedBranch.phone}</p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                <div className="flex items-center">
                  <Image
                    src="/images/icons/time.svg"
                    alt="time"
                    width={12}
                    height={16}
                    className="mr-3 flex-shrink-0"
                  />
                  <p className="font-medium text-base text-[0.65rem] text-gray-800">{selectedBranch.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Keep Original */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl md:text-5xl lg:text-5xl font-bold mb-4 text-black-600">{selectedBranch.name}</h2>
              <p className="text-sm md:text-xl lg:text-xl font-medium mb-60 text-red-600">{selectedBranch.subtitle}</p>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-lg">
                <Image
                src="/images/icons/pin_red.svg"
                alt="earth background"
                width={20}
                height={20}
                className="inline-block mr-2"
                />
                {selectedBranch.address}</p>
                <p className="font-medium text-lg">
                <Image
                src="/images/icons/phone.svg"
                alt="earth background"
                width={20}
                height={20}
                className="inline-block mr-2"
                />
                {selectedBranch.phone}
                </p>
                <p className="font-medium text-lg">
                <Image
                src="/images/icons/time.svg"
                alt="earth background"
                width={20}
                height={20}
                className="inline-block mr-2"
                />
                 {selectedBranch.hours}</p>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="relative">
                <Image
                  src="/images/map.svg"
                  alt="Branch location"
                  width={450}
                  height={450}
                  className="object-cover"
                />
                {/* All branch pins */}
                {BRANCHES.map((branch) => {
                  const position = getBranchPinPosition(branch.id,false);
                  const isSelected = selectedBranch.id === branch.id;

                  return (
                    <div
                      key={branch.id}
                      className="absolute cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        top: position.top,
                        left: position.left,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onClick={() => setSelectedBranch(branch)}
                      title={branch.name}
                    >
                      <Image
                        src={isSelected ? '/images/icons/pin_red.svg' : '/images/icons/pin_black.svg'}
                        alt={`${branch.name} pin`}
                        width={24}
                        height={24}
                        className={isSelected ? 'animate-pulse' : ''}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}