// web-gmeremit와 동일하게 GA ID 하드코딩 (GA4 ID는 공개 식별자라 노출돼도 무방)
const GA_ID = 'G-1Q21GW688N';

// Rendered inside <head> so Google Search Console can verify ownership via GA.
export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
