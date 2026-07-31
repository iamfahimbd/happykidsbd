export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="animate-pulse">
        <div className="mb-8 h-8 w-64 rounded bg-gray-200" />

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-72 rounded-3xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}