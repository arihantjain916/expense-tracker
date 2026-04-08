"use server";

import { revalidatePath } from "next/cache";
import { deleteExpense, getExpenses, saveExpenses } from "@/lib/expenses";
import { randomUUID } from "crypto";

export async function addExpenseAction(formData: FormData) {
  const category = formData.get("category") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const description = formData.get("description") as string;

  if (!category.trim()) throw new Error("Category is required");
  if (!amount || amount <= 0) throw new Error("Amount must be positive");

  saveExpenses({
    id: randomUUID(),
    category,
    amount,
    description,
    createdAt: new Date().toISOString(),
  });
  revalidatePath("/");
}

export async function deleteExpenseAction(id: string) {
  deleteExpense(id);
  revalidatePath("/");
}
