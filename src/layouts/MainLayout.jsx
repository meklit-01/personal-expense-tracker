import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
function MainLayout() {
  return (
    <div className="app-layout">
        <Sidebar />
        <main className="main-content">
            <header>
                <h1>My Finances</h1>
                <p>Manege your money in one place.</p>
            </header>
            <Outlet />
        </main>
    </div>
  )
}

export default MainLayout