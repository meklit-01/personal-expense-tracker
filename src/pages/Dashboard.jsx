
import { Link } from "react-router-dom";

const transactions = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Income",
    date: "Oct 18, 2026",
    amount: 25000,
    type: "income",
  },
  {
    id: 2,
    title: "Grocery Shopping",
    category: "Food",
    date: "Oct 17, 2026",
    amount: 1200,
    type: "expense",
  },
  {
    id: 3,
    title: "Internet Bill",
    category: "Utilities",
    date: "Oct 16, 2026",
    amount: 800,
    type: "expense",
  },
  {
    id: 4,
    title: "Freelance Project",
    category: "Extra Income",
    date: "Oct 15, 2026",
    amount: 4500,
    type: "income",
  },
];

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(amount);

export default function Dashboard() {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expenses;

  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h2>Dashboard</h2>
          <p className="muted">
            Here is what's happening with your money.
          </p>
        </div>

        <Link
          to="/transactions"
          className="primary-button"
        >
          View transactions
        </Link>
      </div>

      <div className="summary-grid">
        <article className="summary-card balance-card">
          <p>Total balance</p>
          <h3>{formatMoney(balance)}</h3>
          <span>Income minus expenses</span>
        </article>

        <article className="summary-card">
          <p>Total income</p>
          <h3>{formatMoney(income)}</h3>
          <span>Money received</span>
        </article>

        <article className="summary-card">
          <p>Total expenses</p>
          <h3>{formatMoney(expenses)}</h3>
          <span>Money spent</span>
        </article>
      </div>

      <section className="transactions-panel">
        <div className="panel-heading">
          <div>
            <h3>Recent transactions</h3>
            <p className="muted">
              Your latest money activity
            </p>
          </div>

          <Link to="/transactions" className="text-link">
            See all
          </Link>
        </div>

        <div className="transaction-list">
          {transactions.map((transaction) => (
            <article
              className="transaction-item"
              key={transaction.id}
            >
              <div className="transaction-icon">
                {transaction.type === "income" ? "+" : "−"}
              </div>

              <div className="transaction-info">
                <h4>{transaction.title}</h4>
                <p>
                  {transaction.category} · {transaction.date}
                </p>
              </div>

              <p
                className={`transaction-amount ${transaction.type}`}
              >
                {transaction.type === "income" ? "+" : "−"}
                {formatMoney(transaction.amount)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <p className="demo-notice">
        Demo data · These transactions are examples, not actual
        financial records.
      </p>
    </section>
  );
}
