
import React from "react";

const subscriptions = [
  {
    id: "SUB-1024",
    customer: "Aarav Technologies",
    plan: "Enterprise",
    amount: 24999,
    date: "28 Oct 2026",
    status: "Active",
  },
  {
    id: "SUB-1023",
    customer: "Nova Retail",
    plan: "Professional",
    amount: 9999,
    date: "27 Oct 2026",
    status: "Active",
  },
  {
    id: "SUB-1022",
    customer: "Pixel Studio",
    plan: "Starter",
    amount: 2499,
    date: "26 Oct 2026",
    status: "Pending",
  },
  {
    id: "SUB-1021",
    customer: "Vertex Solutions",
    plan: "Enterprise",
    amount: 24999,
    date: "25 Oct 2026",
    status: "Active",
  },
  {
    id: "SUB-1020",
    customer: "CloudNine Systems",
    plan: "Professional",
    amount: 9999,
    date: "24 Oct 2026",
    status: "Closed",
  },
];

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const RecentSubscriptions = () => {
  return (
    <div className="bl-card recent-card">
      <div className="section-heading">
        <div>
          <h5>Recent Subscriptions</h5>
          <p>Latest subscription activity</p>
        </div>

        <button className="btn btn-outline-secondary btn-sm">
          View all
          <i className="bi bi-arrow-right ms-2"></i>
        </button>
      </div>

      <div className="table-responsive">
        <table className="table align-middle bl-table">
          <thead>
            <tr>
              <th>Subscription ID</th>
              <th>Customer</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Start Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td className="subscription-id">
                  {subscription.id}
                </td>
                <td className="customer-name">
                  {subscription.customer}
                </td>
                <td>{subscription.plan}</td>
                <td className="amount">
                  {formatINR(subscription.amount)}
                </td>
                <td>{subscription.date}</td>
                <td>
                  <span
                    className={`status-badge ${subscription.status.toLowerCase()}`}
                  >
                    {subscription.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSubscriptions;
