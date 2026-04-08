"use client";

import { Expense } from "@/lib/types";
import { deleteExpense } from "../action";
import moment from "moment";

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return <p className="text-gray-400 text-center">No expenses yet.</p>;
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
              <p className="font-medium">{expense.category}</p>
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
                onClick={() => deleteExpense(expense.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
