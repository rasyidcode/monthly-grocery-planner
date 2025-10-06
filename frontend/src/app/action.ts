"use server";

import { auth } from "@/auth";
import { Plan } from "@/types";

export async function getPlans({
  year,
  month,
}: {
  year?: number;
  month?: number;
}): Promise<Plan[]> {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/plans?year=${year}&month=${month}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    if (!response.ok) {
      return [];
    }

    const plans = await response.json();
    console.log("plans", plans);
    return plans;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getPlanById() {}

export async function createPlan({
  year,
  month,
}: {
  year: number;
  month: number;
}): Promise<void> {
  const session = await auth();
  const response = await fetch(`${process.env.BACKEND_API_URL}/api/plans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify({
      month,
      year,
    }),
  });

  console.log(await response.json());
}

export async function updatePlan() {}

export async function deletePlan() {}
