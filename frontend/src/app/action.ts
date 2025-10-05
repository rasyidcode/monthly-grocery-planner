"use server";

import { auth } from "@/auth";

export async function getPlans() {}

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
      authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
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
