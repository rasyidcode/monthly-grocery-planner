export default function createPlan() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-1">
        <h1 className="text-lg font-bold">Buat Rencana Baru</h1>
      </div>

      <form className="flex-1">
        <section className="bg-white shadow p-4 rounded border border-neutral-100 relative">
          <div className="space-y-2.5">
            <div className="grid grid-cols-[1fr_1fr] gap-4">
              <div>
                <label
                  htmlFor="month"
                  className="block text-sm text-neutral-600"
                >
                  Bulan
                </label>
                <select
                  name="month"
                  className="w-full border-0 border-b border-dashed bg-transparent border-dashed-color
                outline-none focus:border-dashed-focus-color"
                >
                  {[
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember",
                  ].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm text-neutral-600"
                >
                  Tahun
                </label>
                <select
                  name="year"
                  className="w-full border-0 border-b border-dashed bg-transparent border-dashed-color
                outline-none focus:border-dashed-focus-color"
                >
                  {Array.from(
                    { length: 2099 - 2025 + 1 },
                    (_, i) => 2025 + i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-neutral-500 text-sm text-white font-semibold py-1 rounded-sm px-4 shadow-md">
                Buat rencana
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
