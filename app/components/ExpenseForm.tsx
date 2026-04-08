"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { addExpenseAction } from "../action";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 rounded-lg
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Adding..." : "Add Expense"}
    </button>
  );
}

export default function ExpenseForm() {
  const ref = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await addExpenseAction(formData);
    ref.current?.reset();
  }

  return (
    <form ref={ref} action={handleSubmit} className="space-y-3 mb-8">
      <input
        name="category"
        placeholder="Category (e.g. Groceries)"
        className="w-full border rounded-lg p-2"
        required
      />
      <input
        name="amount"
        type="number"
        step="0.01"
        min="0.01"
        placeholder="Amount"
        className="w-full border rounded-lg p-2"
        required
      />
      <input
        name="description"
        placeholder="Description"
        className="w-full border rounded-lg p-2"
      />
      <SubmitButton />
    </form>
  );
}
