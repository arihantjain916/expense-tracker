import { getExpenses } from "@/lib/expenses";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default function Home() {
  const expenses = getExpenses();
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>

      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-500">Total Expenses</p>
        <p className="text-3xl font-bold text-blue-600">${total.toFixed(2)}</p>
      </div>

      <ExpenseForm />

      <ExpenseList expenses={expenses} />
    </main>
  );
}
