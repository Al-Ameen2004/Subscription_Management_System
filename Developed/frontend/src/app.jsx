
import React, { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import RevenueChart from "./components/RevenueChart";
import RecentSubscriptions from "./components/RecentSubscriptions";
import Customers from "./pages/Customers";
import Products from "./pages/Products";

function App() {
  const [activePage, setActivePage] = useState("Overview");

  return (
    <div className="bl-app">

      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {/* Main Dashboard */}
      <main className="bl-main">

        {/* Top Navigation */}
        <Topbar title={activePage} />

        <div className="bl-page-content">

        {activePage === "Overview" && (
            <>
            {/* Dashboard Heading */}
            <div className="dashboard-heading">
                <div>
                <h2>Welcome back!</h2>
                <p>Here's what's happening with your business today.</p>
                </div>

                <button className="btn btn-primary">
                <i className="bi bi-plus-lg me-2"></i>
                New Subscription
                </button>
            </div>

            {/* Summary Cards */}
            <div className="row g-3 mt-3">

                <div className="col-xl-3 col-md-6">
                <div className="bl-card stat-card">
                    <div className="stat-top">
                    <span>Active Subscriptions</span>
                    <i className="bi bi-arrow-repeat"></i>
                    </div>
                    <h3>1,284</h3>
                    <small className="text-success">+8.2% this month</small>
                </div>
                </div>

                <div className="col-xl-3 col-md-6">
                <div className="bl-card stat-card">
                    <div className="stat-top">
                    <span>Revenue Received</span>
                    <i className="bi bi-currency-rupee"></i>
                    </div>
                    <h3>₹8,45,000</h3>
                    <small className="text-success">+12.5% this month</small>
                </div>
                </div>

                <div className="col-xl-3 col-md-6">
                <div className="bl-card stat-card">
                    <div className="stat-top">
                    <span>Outstanding Amount</span>
                    <i className="bi bi-wallet2"></i>
                    </div>
                    <h3>₹1,24,500</h3>
                    <small className="text-secondary">Awaiting payment</small>
                </div>
                </div>

                <div className="col-xl-3 col-md-6">
                <div className="bl-card stat-card">
                    <div className="stat-top">
                    <span>Overdue Invoices</span>
                    <i className="bi bi-exclamation-circle"></i>
                    </div>
                    <h3>18</h3>
                    <small className="text-danger">Requires attention</small>
                </div>
                </div>

            </div>

            {/* Revenue Chart and Recent Subscriptions */}
            <div className="dashboard-lower">
                <RevenueChart />
                <RecentSubscriptions />
            </div>
            </>
        )}

        {activePage === "Customers" && <Customers />}
        {activePage === "Products" && <Products />}

        </div>
      </main>
    </div>
  );
}

export default App;
