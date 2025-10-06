import { getPlanById } from "@/app/action";
import FormPlanning from "@/components/FormPlanning";
import { notFound } from "next/navigation";

export default async function PlanItemsAdd({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;

  const plan = await getPlanById(parseInt(id));
  if (!plan) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col space-y-4 w-full">
      <h1 className="text-xl font-semibold">Rencana November 2025</h1>
      <FormPlanning initialItems={plan?.items} planId={plan?.id} />
    </div>
  );
}
