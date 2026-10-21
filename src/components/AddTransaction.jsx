
import { useState } from "react";

export default function AddTransactionForm({ onAddTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("expense");

  function handleSubmit(event) {
    event.preventDefault();

    const transaction = {
      title,
      amount: Number(amount),
      category,
      date,
      type,
    };

    onAddTransaction(transaction);
  }

  return (
    <form onSubmit={handleSubmit} className="add-transaction-form">
      <h2>Add transaction</h2>

      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Grocery shopping"
          required
        />
      </label>

      <label>
        Amount (ETB)
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
      </label>

      <label>
        Category
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="e.g. Food"
          required
        />
      </label>

      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </label>

      <label>
        Type
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </label>

      <button type="submit" className="primary-button">
        Save transaction
      </button>
    </form>
  );
}
