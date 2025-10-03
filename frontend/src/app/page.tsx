import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default async function Home() {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const nextMonth = currentMonth + 1;
  const year = date.getFullYear();
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/plans?year=${year}&month=${nextMonth}`,
    {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhamFwcm8wN0BnbWFpbC5jb20iLCJpYXQiOjE3NTk0OTg5OTEsImV4cCI6MTc2MDEwMzc5MX0.izjvoCcl1SE7dyC9_9nKIIPff2lcTKxjHOMnIuTH5h4",
      },
    }
  );
  if (!response.ok) {
    return <h1>Something went wrong</h1>;
  }

  const currentPlan = await response.json();
  console.log(currentPlan);

  const prevMonthPlan = null;
  return (
    <div className="flex flex-col flex-1 gap-5">
      <section className="flex-1 flex flex-col">
        <h2 className="text-sm font-normal text-neutral-600">
          Rencana saat ini
        </h2>
        {/* No plan */}
        {/* <div
          className="mt-2 flex flex-col items-center justify-center flex-1 gap-1
        border border-neutral-300 border-dotted rounded-sm"
        >
          <p>Tidak ada rencana</p>
          <button
            className="text-sm font-bold bg-neutral-950 text-neutral-100 px-2
           py-1 rounded-sm flex items-center justify-center gap-2"
          >
            <PlusCircleIcon className="size-6" />
            Tambah Rencana
          </button>
        </div> */}

        {/* Planning */}
        <div
          className="mt-2 flex flex-col flex-1 border border-neutral-300 border-dotted rounded-sm
        p-4"
        >
          <h1 className="text-2xl font-bold">November 2025</h1>
          <hr />
          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <h2>Prediksi total harga</h2>
              <strong className="text-green-600">Rp. 520,000</strong>
            </div>
            <div className="flex items-baseline justify-between">
              <h2>Prediksi jumlah barang</h2>
              <strong>69</strong>
            </div>
            <div className="flex gap-2 mt-4">
              {/*Only active on first day of next month*/}
              <button className="flex-1 bg-pink-600 text-white font-bold py-1.5 rounded-sm">
                Mulai belanja
              </button>
              <button
                className="flex-1 border-pink-600 border-2 text-pink-600 font-bold 
              rounded-sm py-1.5"
              >
                Lihat detail
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </section>

      <section className="flex-1 flex flex-col">
        <h2 className="text-sm font-normal text-neutral-600">Bulan kemarin</h2>
        <div
          className="mt-2 flex flex-col items-center justify-center flex-1 gap-1
        border border-neutral-300 border-dotted rounded-sm"
        >
          <p>Tidak ada rencana</p>
        </div>
      </section>
    </div>
  );
}
