export default function Home() {
  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-neutral-200 
      dark:border-neutral-800 backdrop-blur-lg shadow-2xs"
      >
        <div className="max-w-md mx-auto px-4 py-3">
          <h1 className="text-lg font-semibold tracking-tight">
            🛒 Monthly Grocery Planner
          </h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-12 pb-16">
        <section className="text-center space-y-2">
          <p className="text-sm text-neutral-500">Current Month</p>
          <h2 className="text-2xl font-bold">September 2025</h2>
        </section>

        <section className="mt-10">
          <button
            className="w-full rounded-full border dark:bg-neutral-700
          px-5 py-4 font-medium shadow-sm border-none cursor-pointer
          bg-blue-500"
          >
            Add New Plan
          </button>
        </section>
      </main>
    </>
  );
}
