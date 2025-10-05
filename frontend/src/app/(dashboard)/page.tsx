import { auth, signOut } from "@/auth";
import PlanningCard from "@/components/PlanningCard";
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
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
        </div>

        <PlanningCard />
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
