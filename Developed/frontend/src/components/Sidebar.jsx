
import React from "react";

const Sidebar = ({ activePage, onNavigate }) => {
  const menuItems = [
    { name: "Overview", icon: "bi-grid" },
    { name: "Customers", icon: "bi-people" },
    { name: "Products", icon: "bi-box-seam" },
    { name: "Plans", icon: "bi-card-list" },
    { name: "Subscriptions", icon: "bi-arrow-repeat" },
    { name: "Invoices", icon: "bi-receipt" },
    { name: "Payments", icon: "bi-credit-card" },
    { name: "Discounts", icon: "bi-tag" },
    { name: "Analytics", icon: "bi-bar-chart" },
    { name: "Settings", icon: "bi-gear" },
  ];

  return (
    <aside className="bl-sidebar">

      <div className="bl-brand">
        <div className="bl-brand-icon">B</div>
        <span>brightloop</span>
      </div>

      <div className="bl-menu-label">WORKSPACE</div>

      <nav className="bl-nav">
        {menuItems.map((item) => (
          <a
            href="#"
            key={item.name}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.name);
            }}
            className={`bl-nav-item ${
              activePage === item.name ? "active" : ""
            }`}
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      <div className="bl-sidebar-footer">
        <div className="bl-avatar">N</div>

        <div>
          <div className="bl-user-name">Admin User</div>
          <div className="bl-user-role">Administrator</div>
        </div>

        <i className="bi bi-three-dots ms-auto"></i>
      </div>

    </aside>
  );
};

export default Sidebar;
