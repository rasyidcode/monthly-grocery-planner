"use client";

import { ChevronLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  function handleBack() {
    router.push("/");
  }

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

        <h1 className="text-lg font-semibold tracking-tight">
          Rencana Belanja Bulanan
        </h1>
      </div>
    </header>
  );
}
