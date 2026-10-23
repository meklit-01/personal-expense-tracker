
import { useState, useEffect } from "react";

// Default budgets
const initialBudgets = [
  { id: 1, category: "Food", limit: 4000 },
  { id: 2, category: "Transport", limit: 1500 },
  { id: 3, category: "Utilities", limit: 2000 },
  { id: 4, category: "Entertainment", limit: 1000 },
];

// Format amounts as Ethiopian Birr
function formatMoney(amount) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function Budgets() {
  // Load budgets saved in the browser
  const [budgets, setBudgets] = useState(() => {
    try {
      const savedBudgets = localStorage.getItem(
        "expense-tracker-budgets"
      );

      return savedBudgets
        ? JSON.parse(savedBudgets)
        : initialBudgets;
    } catch {
      return initialBudgets;
    }
  });

  // Load transactions saved by the Transactions page
  const [transactions, setTransactions] = useState(() => {
    try {
      const savedTransactions = localStorage.getItem(
        "expense-tracker-transactions"
      );

      return savedTransactions
        ? JSON.parse(savedTransactions)
        : [];
    } catch {
      return [];
    }
  });

  // Save budgets whenever they change
  useEffect(() => {
    localStorage.setItem(
      "expense-tracker-budgets",
      JSON.stringify(budgets)
    );
  }, [budgets]);

  // Refresh transactions when returning to this page
  useEffect(() => {
    function loadTransactions() {
      try {
        const savedTransactions = localStorage.getItem(
          "expense-tracker-transactions"
        );

        setTransactions(
          savedTransactions ? JSON.parse(savedTransactions) : []
        );
      } catch {
        setTransactions([]);
      }
    }

    window.addEventListener("focus", loadTransactions);
    window.addEventListener("storage", loadTransactions);

    return () => {
      window.removeEventListener("focus", loadTransactions);
      window.removeEventListener("storage", loadTransactions);
    };
  }, []);

  // Calculate total budget
  const totalBudget = budgets.reduce(
    (sum, budget) => sum + Number(budget.limit || 0),
    0
  );

  // Keep only expense transactions
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  // Calculate total expenses
  const totalSpent = expenseTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount || 0),
    0
  );

  // Calculate remaining budget
  const remainingBudget = totalBudget - totalSpent;

  return (
    <main className="budgets-page">
      <div className="page-heading">
        <div>
          <h1>Budgets</h1>
          <p>Track your spending against your monthly budgets.</p>
        </div>
      </div>

      {/* Summary cards */}
      <section className="budget-summary">
        <div className="budget-summary-card">
          <p>Total Budget</p>
          <h2>{formatMoney(totalBudget)}</h2>
        </div>

        <div className="budget-summary-card">
          <p>Total Spent</p>
          <h2>{formatMoney(totalSpent)}</h2>
        </div>

        <div className="budget-summary-card">
          <p>Remaining Budget</p>
          <h2>{formatMoney(remainingBudget)}</h2>
        </div>
      </section>

      {/* Individual category budgets */}
      <section className="budget-list">
        <h2>Budget by Category</h2>

        {budgets.map((budget) => {
          // Find expenses matching this budget category
          const spent = expenseTransactions
            .filter(
              (transaction) =>
                String(transaction.category || "").toLowerCase() ===
                budget.category.toLowerCase()
            )
            .reduce(
              (sum, transaction) =>
                sum + Number(transaction.amount || 0),
              0
            );

          const percentage =
            Number(budget.limit) > 0
              ? (spent / Number(budget.limit)) * 100
              : 0;

          const progress = Math.min(percentage, 100);
          const isOverBudget = spent > Number(budget.limit);

          return (
            <article className="budget-card" key={budget.id}>
              <div className="budget-card-heading">
                <div>
                  <h3>{budget.category}</h3>
                  <p>
                    {formatMoney(spent)} of{" "}
                    {formatMoney(Number(budget.limit))}
                  </p>
                </div>

                <span
                  className={
                    isOverBudget
                      ? "budget-status over-budget"
                      : "budget-status"
                  }
                >
                  {isOverBudget
                    ? "Over budget"
                    : `${Math.round(percentage)}% used`}
                </span>
              </div>

              <div
                className="budget-progress-track"
                role="progressbar"
                aria-label={`${budget.category} budget usage`}
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="budget-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="budget-remaining">
                {isOverBudget
                  ? `${formatMoney(spent - Number(budget.limit))} over budget`
                  : `${formatMoney(Number(budget.limit) - spent)} remaining`}
              </p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
