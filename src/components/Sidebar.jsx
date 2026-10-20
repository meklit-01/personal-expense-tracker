import { NavLink } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="sidebar">
        <h2>Expense Tracker</h2>

        <nav>
            <ul>
                {/* end prop means the link will only look active if your current URL is an exact math for "/" coz every URL stars with "/" */}
                <NavLink to="/" end>Dashboard</NavLink>
                <NavLink to="/transactions" >Transactions</NavLink>
                <NavLink to="/budgets" >Budgets</NavLink>
                <NavLink to="/reports" >Reports</NavLink>
                
            </ul>
        </nav>
    </aside>
  )
}

export default Sidebar