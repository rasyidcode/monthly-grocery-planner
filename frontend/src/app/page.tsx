import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ChevronUpIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Home() {
  const date = new Date();
  // const currentMonth = date.getMonth() + 1;
  // const nextMonth = currentMonth + 1;
  // const year = date.getFullYear();
  // const response = await fetch(
  //   `${process.env.BACKEND_API_URL}/api/plans?year=${year}&month=${nextMonth}`,
  //   {
  //     headers: {
  //       authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhamFwcm8wN0BnbWFpbC5jb20iLCJpYXQiOjE3NTk0OTg5OTEsImV4cCI6MTc2MDEwMzc5MX0.izjvoCcl1SE7dyC9_9nKIIPff2lcTKxjHOMnIuTH5h4",
  //     },
  //   }
  // );
  // if (!response.ok) {
  //   return <h1>Something went wrong</h1>;
  // }

  // const currentPlan = await response.json();
  // console.log(currentPlan);

  // const prevMonthPlan = null;
  return (
    <div className="flex flex-col flex-1 gap-5">
      <section className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-normal text-neutral-600">
            Rencana saat ini
          </h2>
          <Link
            href="/add-plan"
            className="text-sm font-semibold bg-pink-600 text-white px-2
            rounded-sm"
          >
            Tambah Rencana
          </Link>
        </div>
        {/* No plan */}
        {/* <div
          className="mt-2 flex flex-col items-center justify-center flex-1
         rounded-sm bg-white shadow p-4"
        >
          <p className="text-sm font-light">Tidak ada rencana</p>
        </div> */}

        {/* Planning */}
        {/* Shopping button only active on first day of next month*/}
        {/* <div
          className="mt-2 flex flex-col rounded-sm
        p-4 shadow bg-white"
        >
          <h1 className="text-xl font-bold">November 2025</h1>
          <hr className="border-neutral-500 border-dotted" />
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
        </div> */}

        {/* Shopping */}

        {/* Completed */}
        {/* <div
          className="mt-2 flex flex-col rounded-sm
        p-4 shadow bg-white"
        >
          <h1 className="text-xl font-bold">November 2025</h1>
          <hr className="border-neutral-500 border-dotted" />
          <div className="mt-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <h2>Total harga</h2>
                <div className="flex items-center">
                  <ArrowLongDownIcon className="size-4 text-green-500" />
                  <strong className="text-green-600">Rp. 520,000</strong>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-xs text-neutral-500">
                  (Prediksi total harga)
                </h2>
                <strong className="text-xs text-neutral-500">
                  (Rp. 560,000)
                </strong>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h2>Jumlah barang</h2>
                <div className="flex items-center">
                  <ArrowLongUpIcon className="size-4 text-red-600" />
                  <strong className="text-red-500">69</strong>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-xs text-neutral-500">
                  (Prediksi jumlah barang)
                </h2>
                <strong className="text-xs text-neutral-500">(59)</strong>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 border-pink-600 border-2 text-pink-600 font-bold 
              rounded-sm py-1.5"
              >
                Lihat detail
              </button>
            </div>
          </div>
        </div> */}
      </section>

      <section className="flex flex-col">
        <h2 className="text-sm font-normal text-neutral-600">
          Rencana sebelumnya
        </h2>
        <div
          className="mt-2 flex flex-col items-center justify-center flex-1 gap-1
        border border-neutral-300 border-dotted rounded-sm bg-white"
        >
          <p>Tidak ada rencana</p>
        </div>
      </section>
    </div>
  );
}
