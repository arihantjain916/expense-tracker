"use server";

import { revalidatePath } from "next/cache";
import { getExpenses, saveExpenses } from "@/lib/expenses";
import { randomUUID } from "crypto";

export async function addExpense(formData: FormData) {
  const category = formData.get("category") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const description = formData.get("description") as string;

  // Validation
  if (!category.trim()) throw new Error("Category is required");
  if (!amount || amount <= 0) throw new Error("Amount must be positive");

  const expenses = getExpenses();

  expenses.push({
    id: randomUUID(),
    category,
    amount,
    description,
    createdAt: new Date().toISOString(),
  });

  saveExpenses(expenses);
  revalidatePath("/");
}

export async function deleteExpense(id: string) {
  const expenses = getExpenses();
  const updated = expenses.filter((e) => e.id !== id);
  saveExpenses(updated);
  revalidatePath("/");
}
