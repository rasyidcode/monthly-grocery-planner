import { getPlanById } from "@/app/action";
import FormPlanning from "@/components/FormPlanning";
import { notFound } from "next/navigation";

export default async function PlanItems({
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

  const planDate = new Date(plan.year!, plan.month!, 1);

  return (
    <div className="flex-1 flex flex-col space-y-4 w-full">
      <h1 className="text-xl font-semibold">
        Rencana {`${planDate.toLocaleString("id-ID", { month: "long" })}`}{" "}
        {plan.year}
      </h1>
      <FormPlanning initialItems={plan?.items} planId={plan?.id} />
    </div>
  );
}
