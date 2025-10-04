import FormPlanning from "@/components/FormPlanning";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function AddPlanPage() {
  return (
    <div className="flex-1 flex flex-col space-y-4 w-full">
      <div className="flex items-center gap-1">
        <button className="p-1 active:bg-active rounded-full">
          <ChevronLeftIcon className="size-6" />
        </button>
        <h1 className="text-log font-bold">Tambah barang</h1>
      </div>

      <FormPlanning />
    </div>
  );
}
