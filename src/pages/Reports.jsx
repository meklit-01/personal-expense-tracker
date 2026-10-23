import React, { useEffect, useState } from 'react'
function formatMoney( amount ){
  return new Intl.NumberFormat("en-ET",{
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(amount);
}

function Reports() {
  const [transactions, setTransactions] = useState([]);

  useEffect(()=>{
    try{
      const savedTransactions = localStorage.getItem("expense-tracker-transactions");

      setTransactions( savedTransactions ? JSON.parse(savedTransactions) : []);
    } catch{
      setTransactions([]);
    }
  },[]);

  const income = transactions 
      .filter((transaction)=>transaction.type === "income")
      .reduce((total, transaction)=> total + Number(transaction.amount || 0), 0);

  const expenses = transactions
       .filter((transaction)=> transaction.type === "expense") 
       .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);
       
  const balance = income - expenses;     
  return (
    <main className='reports-page' >
      <div className="page-heading">
        <div>
          <h1>Reports</h1>
          <p>Understand your income and spending.</p>
        </div>
      </div>

      <section className='report-summary'>
        <article className="report-card">
          <p>Total Income</p>
          <h2>{formatMoney(income)}</h2>
        </article>

        <article className="report-card">
          <p>Total Expenses</p>
          <h2>{formatMoney(balance)}</h2>
        </article>

        <article className="report-card">
          <p>Net Balance</p>
          <h2>{formatMoney(balance)}</h2>
        </article>
      </section>

      <section className="report-details">
        <h2>Finacial Summary</h2>

        <p>You have recorded {transactions.length} transactions.</p>

        <p>
          {income > expenses ? "You recoded income is greater than your expenses": income < expenses ? "You recorded expenses are greater than your income." : "You recorded income and expenses are equal."}
        </p>
      </section>
    </main>
  )
}

export default Reports