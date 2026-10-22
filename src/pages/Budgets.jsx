
import { useState, useEffect } from "react";

const initialBudgets = [
  { id: 1, category: "Food", limit: 4000, spent: 1730 },
  { id: 2, category: "Transport", limit: 1500, spent: 350 },
  { id: 3, category: "Utilities", limit: 2000, spent: 800 },
  { id: 4, category: "Entertainment", limit: 1000, spent: 250 },
];

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(amount);

export default function Budgets() {
  const [budgets, setBudgets] = useState(() => {
  try {
    const savedBudgets = localStorage.getItem("expense-tracker-budgets");

    return savedBudgets ? JSON.parse(savedBudgets) : initialBudgets;
  } catch {
    return initialBudgets;
  }
});

useEffect(() => {
  localStorage.setItem(
    "expense-tracker-budgets",
    JSON.stringify(budgets)
  );
}, [budgets]);

  const totalBudget = budgets.reduce(
    (sum, budget) => sum + budget.limit,
    0
  );

  const totalSpent = budgets.reduce(
    (sum, budget) => sum + budget.spent,
    0
  );

  return (
    <section className="budgets-page">
      <div className="page-heading">
        <p className="eyebrow">PLAN YOUR MONEY</p>
        <h2>Budgets</h2>
        <p className="muted">
          Set spending limits and keep track of your expenses.
        </p>
      </div>

      <div className="budget-summary">
        <article className="budget-summary-card">
          <p>Total budget</p>
          <h3>{formatMoney(totalBudget)}</h3>
        </article>

        <article className="budget-summary-card">
          <p>Total spent</p>
          <h3>{formatMoney(totalSpent)}</h3>
        </article>

        <article className="budget-summary-card">
          <p>Remaining</p>
          <h3>{formatMoney(totalBudget - totalSpent)}</h3>
        </article>
      </div>

      <div className="budget-list">
        {budgets.map((budget) => {
          const percentage = Math.min(
            (budget.spent / budget.limit) * 100,
            100
          );

          const isOverBudget = budget.spent > budget.limit;

          return (
            <article className="budget-card" key={budget.id}>
              <div className="budget-card-heading">
                <div>
                  <h3>{budget.category}</h3>
                  <p className="muted">
                    {formatMoney(budget.spent)} of{" "}
                    {formatMoney(budget.limit)}
                  </p>
                </div>

                <strong>{Math.round(
                  (budget.spent / budget.limit) * 100
                )}%</strong>
              </div>

              <div
                className="budget-progress-track"
                role="progressbar"
                aria-label={`${budget.category} budget used`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(
                  (budget.spent / budget.limit) * 100
                )}
              >
                <div
                  className={`budget-progress-fill ${
                    isOverBudget ? "over-budget" : ""
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="budget-status">
                {isOverBudget
                  ? `Over budget by ${formatMoney(
                      budget.spent - budget.limit
                    )}`
                  : `${formatMoney(
                      budget.limit - budget.spent
                    )} remaining`}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
