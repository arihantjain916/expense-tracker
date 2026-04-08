"use client";

import { Expense } from "@/lib/types";
import { deleteExpenseAction } from "../action";
import moment from "moment";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  Groceries: "bg-green-100 text-green-700",
  Transport: "bg-blue-100 text-blue-700",
  "Food & Dining": "bg-orange-100 text-orange-700",
  Utilities: "bg-yellow-100 text-yellow-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Health: "bg-red-100 text-red-700",
  Shopping: "bg-pink-100 text-pink-700",
  Education: "bg-indigo-100 text-indigo-700",
};

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">💸</p>
        <p className="font-medium">No expenses yet</p>
        <p className="text-sm">Add your first expense above</p>
      </div>
    );
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setTimeout(() => setDeletingId(null), 2000);
    try {
      await deleteExpenseAction(id);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <ul className="space-y-2">
      {expenses
        .slice()
        .reverse()
        .map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between items-center border rounded-lg p-3"
          >
            <div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[expense.category] ?? "bg-gray-100 text-gray-600"}`}
              >
                {expense.category}
              </span>

              <p className="text-sm text-gray-500">{expense.description}</p>
              <p className="text-sm text-gray-500">
                {moment(expense.createdAt).format("DD/MM/YY")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-green-600">
                ₹{expense.amount.toFixed(2)}
              </span>
              <button
                onClick={() => handleDelete(expense.id)}
                disabled={deletingId === expense.id}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                {deletingId === expense.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
