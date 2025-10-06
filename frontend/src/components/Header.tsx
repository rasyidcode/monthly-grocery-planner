"use client";

import { ChevronLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPlanById } from "@/app/action";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { id } = useParams();
  const [year, setYear] = useState<number | null>(null);
  const [monthTitle, setMonthTitle] = useState("Bulanan");

  function handleBack() {
    redirect("/");
  }

  useEffect(() => {
    if (!id) return;

    async function getPlan(id: number) {
      const plan = await getPlanById(id);
      if (plan) {
        setYear(plan.year ?? null);
        const planDate = new Date(plan.year!, plan.month! - 1, 1);
        setMonthTitle(planDate.toLocaleString("id-ID", { month: "long" }));
      }
    }

    getPlan(parseInt(id as string));
  }, [id]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-neutral-200 shadow-2xs w-full
        bg-white"
    >
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-2.5">
        {isHome && <ShoppingCartIcon className="size-6" />}
        {!isHome && (
          <button
            onClick={handleBack}
            className="active:bg-active rounded-full"
          >
            <ChevronLeftIcon className="size-6" />
          </button>
        )}

        <h1 className="text-lg font-semibold tracking-tight truncate">
          Rencana Belanja {monthTitle} {year}
        </h1>
      </div>
    </header>
  );
}
