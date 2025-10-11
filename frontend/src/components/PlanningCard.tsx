"use client";

import { createPlan } from "@/app/action";
import { Plan } from "@/types";
import {
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export default function PlanningCard({ plan }: { plan: Plan }) {
  const [status, setStatus] = useState<Plan["status"] | "initiating">(
    plan.status ?? null
  );
  const priceTotal =
    plan.items?.reduce((acc, curr) => acc + (curr.price ?? 0), 0) ?? 0;
  const itemsTotal =
    plan.items?.reduce((acc, curr) => acc + (curr.qty ?? 0), 0) ?? 0;

  async function handleInitiating() {
    setStatus("initiating");

    await createPlan({ year: 2025, month: 11 });
    // setTimeout(() => {
    //   // redirect("/plans/1/items/create");
    // }, 3000);

    setStatus("planning");
  }

  return (
    <>
      {status === null && (
        <div
          className="mt-2 flex flex-col items-center justify-center flex-1
         rounded-sm bg-white shadow p-4"
        >
          <button
            type="button"
            onClick={handleInitiating}
            className="text-sm font-semibold text-neutral-700 underline
            flex items-center"
          >
            <ChevronRightIcon className="size-4" />
            Buat rencana bulan depan
          </button>
        </div>
      )}

      {status === "initiating" && (
        <div
          className="mt-2 flex flex-col items-center justify-center flex-1
         rounded-sm bg-white shadow p-4"
        >
          <div className="loader"></div>
          <p className="text-sm text-neutral-400">Proses inisiasi...</p>
        </div>
      )}

      {/* Shopping button only active on first day of next month*/}
      {status === "planning" && (
        <div
          className="mt-2 flex flex-col rounded-sm
        p-4 shadow bg-white"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">November 2025</h1>
            <button className="active:bg-neutral-200 rounded-full p-1">
              <EllipsisVerticalIcon className="size-5" />
            </button>
          </div>
          <hr className="border-neutral-500 border-dotted" />
          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <h2>Prediksi total harga</h2>
              <strong className="text-green-600">
                {priceTotal
                  ?.toLocaleString("id-ID", {
                    currency: "IDR",
                    style: "currency",
                  })
                  .slice(0, -3)}
              </strong>
            </div>
            <div className="flex items-baseline justify-between">
              <h2>Prediksi jumlah barang</h2>
              <strong>{itemsTotal}</strong>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-green-600 text-white font-bold py-1.5 rounded-sm">
                Mulai belanja
              </button>
              <Link
                href={`plans/${plan.id}/items/add`}
                className="flex-1 border-green-600 border-2 text-green-600 font-bold 
              rounded-sm py-1.5 flex items-center justify-center"
              >
                Lihat detail
              </Link>
            </div>
          </div>
        </div>
      )}

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
