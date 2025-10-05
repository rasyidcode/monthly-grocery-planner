"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function PlanningCard() {
  const [status, setStatus] = useState<
    null | "initiating" | "planning" | "shopping" | "completed"
  >("initiating");

  async function handleInitiating() {
    setStatus("initiating");

    const response = await fetch(`${process.env.BACKEND_API_URL}/api/plans`, {
      method: "POST",
      headers: {
        authorization: "Bearer",
      },
    });
    setTimeout(() => {
      // redirect("/plans/1/items/create");
    }, 3000);
  }

  return (
    <>
      <div
        className="mt-2 flex flex-col items-center justify-center flex-1
         rounded-sm bg-white shadow p-4"
      >
        {status === null && (
          <button
            type="button"
            onClick={handleInitiating}
            className="text-sm font-semibold text-neutral-700 underline
            flex items-center"
          >
            <ChevronRightIcon className="size-4" />
            Buat rencana bulan depan
          </button>
        )}

        {status === "initiating" && (
          <>
            <div className="loader"></div>
            <p className="text-sm text-neutral-400">Proses inisiasi...</p>
          </>
        )}
      </div>

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
    </>
  );
}
