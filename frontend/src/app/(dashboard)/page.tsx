import PlanningCard from "@/components/PlanningCard";
import { getPlans } from "../action";

export default async function Home() {
  const plan = await getPlans({ year: 2025, month: 11 });

  return (
    <div className="flex flex-col flex-1 gap-5">
      <section className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-normal text-neutral-600">
            Rencana saat ini
          </h2>
        </div>

        <PlanningCard plan={plan[0] ?? {}} />
      </section>

      {/* <section className="flex flex-col">
        <h2 className="text-sm font-normal text-neutral-600">
          Rencana sebelumnya
        </h2>
        <div
          className="mt-2 flex flex-col items-center justify-center flex-1 gap-1
        border border-neutral-300 border-dotted rounded-sm bg-white"
        >
          <p>Tidak ada rencana</p>
        </div>
      </section> */}
      {/* <form
        action={async (formData) => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form> */}
    </div>
  );
}
