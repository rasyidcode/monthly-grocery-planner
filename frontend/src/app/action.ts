"use server";

import { auth } from "@/auth";
import { Item, Plan } from "@/types";

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
    return plans;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getPlanById(id: number): Promise<Plan | null> {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/plans/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    if (!response.ok) {
      return null;
    }

    const plan = await response.json();
    return plan;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createPlan({
  year,
  month,
}: {
  year: number;
  month: number;
}): Promise<Plan | null> {
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
  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export async function updatePlan() {}

export async function deletePlan() {}

export async function createItem({
  planId,
  name,
  price,
  qty,
}: {
  planId: number;
  name: string;
  price: number;
  qty: number;
}): Promise<Item | null> {
  const session = await auth();
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/plans/${planId}/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({
        name: name,
        price: price,
        qty: qty,
      }),
    }
  );
  if (!response.ok) {
    return null;
  }

  return await response.json();
}
