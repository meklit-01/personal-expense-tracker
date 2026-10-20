
import { Link, useParams } from "react-router-dom";

const transactions = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Income",
    date: "18 October 2026",
    amount: 25000,
    type: "income",
  },
  {
    id: 2,
    title: "Grocery Shopping",
    category: "Food",
    date: "17 October 2026",
    amount: 1200,
    type: "expense",
  },
  {
    id: 3,
    title: "Internet Bill",
    category: "Utilities",
    date: "16 October 2026",
    amount: 800,
    type: "expense",
  },
  {
    id: 4,
    title: "Freelance Project",
    category: "Extra Income",
    date: "15 October 2026",
    amount: 4500,
    type: "income",
  },
  {
    id: 5,
    title: "Transport",
    category: "Travel",
    date: "14 October 2026",
    amount: 350,
    type: "expense",
  },
  {
    id: 6,
    title: "Coffee",
    category: "Food",
    date: "13 October 2026",
    amount: 180,
    type: "expense",
  },
];

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(amount);

export default function TransactionDetails() {
  const { id } = useParams();

  const transaction = transactions.find(
    (item) => item.id === Number(id)
  );

  if (!transaction) {
    return (
      <section>
        <h2>Transaction not found</h2>
        <p>This transaction doesn't exist.</p>
        <Link to="/transactions">Back to transactions</Link>
      </section>
    );
  }

  return (
    <section className="transaction-details">
      <Link to="/transactions" className="text-link">
        ← Back to transactions
      </Link>

      <p className="eyebrow">TRANSACTION DETAILS</p>
      <h2>{transaction.title}</h2>

      <article className="detail-card">
        <p className="detail-label">Amount</p>

        <h3 className={`transaction-amount ${transaction.type}`}>
          {transaction.type === "income" ? "+" : "−"}
          {formatMoney(transaction.amount)}
        </h3>

        <div className="detail-row">
          <span>Category</span>
          <strong>{transaction.category}</strong>
        </div>

        <div className="detail-row">
          <span>Date</span>
          <strong>{transaction.date}</strong>
        </div>

        <div className="detail-row">
          <span>Type</span>
          <strong>
            {transaction.type === "income" ? "Income" : "Expense"}
          </strong>
        </div>

        <div className="detail-row">
          <span>Transaction ID</span>
          <strong>#{transaction.id}</strong>
        </div>
      </article>
    </section>
  );
}
