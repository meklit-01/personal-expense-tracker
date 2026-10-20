import { useState } from "react";
import { Link } from "react-router-dom";

const sampleTransactions = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Income",
    date: "2026-10-18",
    amount: 25000,
    type: "income",
  },
  {
    id: 2,
    title: "Grocery Shopping",
    category: "Food",
    date: "2026-10-17",
    amount: 1200,
    type: "expense",
  },
  {
    id: 3,
    title: "Internet Bill",
    category: "Utilities",
    date: "2026-10-16",
    amount: 800,
    type: "expense",
  },
  {
    id: 4,
    title: "Freelance Project",
    category: "Extra Income",
    date: "2026-10-15",
    amount: 4500,
    type: "income",
  },
  {
    id: 5,
    title: "Transport",
    category: "Travel",
    date: "2026-10-14",
    amount: 350,
    type: "expense",
  },
  {
    id: 6,
    title: "Coffee",
    category: "Food",
    date: "2026-10-13",
    amount: 180,
    type: "expense",
  },
];
 
const formatMoney = (amount)=>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(amount);

  
const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });


function Transaction() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTransaction = sampleTransactions.filter((transaction)=>{
    const  matchesSearch = transaction.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || transaction.type === filter;
    return matchesSearch && matchesFilter;
  });
  
const totalIncome = sampleTransactions
  .filter((item) => item.type === "income")
  .reduce((sum, item) => sum + item.amount, 0);

const totalExpenses = sampleTransactions
  .filter((item) => item.type === "expense")
  .reduce((sum, item) => sum + item.amount, 0);

  return (
   <section className="transaction-page">
    <div className="transaction-page-heading">
      <div>
        <p className="eyebrow">YOUR MONEY</p>
        <h2>Transactions</h2>
        <p className="muted">
          Track where your money comes form and goes.
        </p>
      </div>

      <button className="primary-button" type="button" onClick={()=> alert("we'll build the Add Transaction form next:")}>+ Add transaction</button>
    </div>

    <div className="transatcion-stats">
      <article className="transaction-stat">
        <p>Total income</p>
        <h3>{formatMoney(totalIncome)}</h3>
      </article>

      <article className="transaction-stats">
        <p>Transactions</p>
        <h3>{formatMoney(totalExpenses)}</h3>
      </article>
    </div>

    <section className="transaction-table-panel">
      <div className="transaction-toolbar">
        <lable className="search-box">
          <span>Search</span>
          <input type="search" placeholder="Search transactions..." value={search} onChange={(event)=> setSearch(event.target.value)} />
        </lable>
        <label className="filter-box">
          <span>Type</span>
          <select value={filter} onChange={(event)=> setFilter(event.target.value)}>
            <option value="all">All transatcion</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </label>
      </div>

      <div className="transaction-results">
        <p className="results-count">
          Showing {filteredTransaction.length} of {" "}{sampleTransactions.length} transactions
        </p>

        {filteredTransaction.length === 0 ? (
          <div className="empty-transaction">
            <h3>No transaction found</h3>
            <p>Try another search or filter.</p>
          </div>
        ):(
          <div className="all-trasaction-list">
            {filteredTransaction.map((transaction) => (
              <Link to={`/transactions/${transaction.id}`}
              className="all-transaction-item"
              key={transaction.id}
              >
                <div className="transacion-icon">
                  {transaction.type === "income" ? "+" : "-"}
                </div>

                <div className="transaction-info">
                  <h4>{transaction.title}</h4>
                  <p>
                    {transaction.category} .{""}
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <div className="transaction-right">
                  <p className={`transaction-amount ${transaction.type}`}>
                    {transaction.type=== "income" ? "+" : "-"}
                    {formatMoney(transaction.amount)}
                  </p>
                <span className="details-hint">View details →</span>

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
   </section>
  )
}

export default Transaction