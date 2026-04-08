import fs from "fs";
import path from "path";
import { Expense } from "./types";

const filePath = path.join(process.cwd(), "data", "expenses.json");

export function getExpenses(): Expense[] {
  const file = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(file);
}

export function saveExpenses(expenses: Expense[]): void {
  fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
}
