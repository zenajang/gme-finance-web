// 스켈레톤 로딩 컴포넌트들
export const NewsLoadingSkeleton = () => (
  <section className="py-12 md:py-14 lg:py-16 px-0 md:px-45 lg:px-45 bg-white relative overflow-hidden">
    <div className="px-0 md:px-3 lg:px-3 relative z-10">
      <div className="h-12 bg-gray-200 rounded-lg w-48 mx-auto mb-8 animate-pulse" />
      <div className="grid md:grid-cols-3 gap-8 px-5 md:px-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-3xl bg-white border-4 border-gray-200 h-[400px] md:h-[600px] animate-pulse">
            <div className="p-6 md:p-8">
              <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
              <div className="h-8 bg-gray-200 rounded w-full mb-2" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const FeedbackLoadingSkeleton = () => (
  <section className="py-12 md:py-16 lg:py-20 px-0 md:px-45 lg:px-45 bg-white relative">
    <div className="px-0 md:px-3 lg:px-3 relative z-10">
      <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-8 animate-pulse" />
      <div className="grid md:grid-cols-3 gap-8 px-5 md:px-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-3xl bg-gray-100 h-[420px] md:h-[600px] animate-pulse" />
        ))}
      </div>
    </div>
  </section>
);

export const BannerLoadingSkeleton = () => (
  <section className="py-10 bg-white">
    <div className="h-20 bg-gray-100 animate-pulse mb-4" />
    <div className="h-20 bg-gray-100 animate-pulse" />
  </section>
);

export const BranchLoadingSkeleton = () => (
  <section className="relative h-[600px] bg-gray-900">
    <div className="absolute inset-0 bg-gray-800 animate-pulse" />
    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="text-center">
        <div className="h-12 bg-gray-700 rounded-lg w-48 mx-auto mb-4 animate-pulse" />
        <div className="h-8 bg-gray-700 rounded-lg w-64 mx-auto animate-pulse" />
      </div>
    </div>
  </section>
);