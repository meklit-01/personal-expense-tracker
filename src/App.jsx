import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import Transaction from "./pages/Transaction"
import Budgets from "./pages/Budgets"
import Reports from "./pages/Reports"
import NotFound from "./pages/NotFound"
import TransactionDetails from "./pages/TransactionDetails"

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route
          path="transactions"
          element={<Transaction />}
        />
        <Route path="budgets" element={<Budgets />} />
        <Route path="reports" element={<Reports />} />
        <Route path="transactions/:id"element={<TransactionDetails />}/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
