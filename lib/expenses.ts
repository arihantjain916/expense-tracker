
import { Expense } from "./types";


let expenses: Expense[] = [
  {
    id: "1",
    category: "Groceries",
    amount: 50,
    description: "Weekly groceries from DMart",
    createdAt: "2026-03-01T08:30:00.000Z",
  },
  {
    id: "2",
    category: "Transport",
    amount: 12.5,
    description: "Uber ride to office",
    createdAt: "2026-03-03T09:15:00.000Z",
  },
  {
    id: "3",
    category: "Food & Dining",
    amount: 35,
    description: "Dinner at restaurant with friends",
    createdAt: "2026-03-05T20:00:00.000Z",
  },
  {
    id: "ba0c741b-a887-4c69-b170-04d9bb6ee5b5",
    category: "Health",
    amount: 7858,
    description: "Hand Injury",
    createdAt: "2026-04-08T11:10:03.981Z",
  },
];

export function getExpenses(): Expense[] {
  return expenses;
}

export function saveExpenses(expense: Expense): void {
  expenses.push(expense);
}

export function deleteExpense(id: string): void {
  expenses = expenses.filter((e) => e.id !== id);
}
