export default function ManualPage() {
  const pdfFile = '/documents/대출상품설명서.pdf';

  return (
    <main className="min-h-screen py-20 px-4 md:px-8 lg:px-40">
      <div className="max-w-6xl mx-auto mt-15">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex justify-center">대출상품 설명서</h1>

        {/* PDF Viewer */}
        <div className="w-full">
          <iframe
            src={pdfFile}
            className="w-full h-[700px] border border-gray-300 rounded-lg"
            title="대출상품 설명서 PDF"
          />
        </div>

        {/* Download Section */}
        <div className="mt-6 flex items-center gap-4">
          <span className="text-gray-700 font-medium">대출상품설명서</span>
          <a
            href={pdfFile}
            download="대출상품설명서.pdf"
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Download
          </a>
        </div>
      </div>
    </main>
  );
}
