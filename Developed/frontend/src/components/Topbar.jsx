import React from "react";

const Topbar = () => {
  return (
    <header className="bl-topbar">
      <div>
        <h5 className="bl-topbar-title">Overview</h5>
        <span className="bl-breadcrumb">Workspace / Overview</span>
      </div>

      <div className="bl-topbar-actions">
        <div className="bl-search">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search anything..." />
          <span>⌘ K</span>
        </div>

        <button className="bl-icon-button" aria-label="Notifications">
          <i className="bi bi-bell"></i>
          <span className="bl-notification-dot"></span>
        </button>

        <div className="bl-topbar-avatar">N</div>
      </div>
    </header>
  );
};

export default Topbar;