export default function Loading() {
  return (
    <main className="max-w-3xl mx-auto p-8 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24 mb-6"></div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-40 sm:col-span-2"></div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
