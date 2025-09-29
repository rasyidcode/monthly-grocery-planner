import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 gap-5">
      <section className="flex-1 flex flex-col">
        <h2 className="text-sm font-normal text-neutral-600">Bulan ini</h2>
        <div
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
        </div>
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
