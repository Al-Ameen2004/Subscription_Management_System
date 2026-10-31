
import React, { useState } from "react";

const initialCustomers = [
  { id: 1, name: "Aarav Technologies", email: "aarav@example.com", phone: "+91 98765 43210", company: "Aarav Technologies", status: "Active" },
  { id: 2, name: "Nova Retail", email: "contact@novaretail.com", phone: "+91 98765 12345", company: "Nova Retail", status: "Active" },
  { id: 3, name: "Pixel Studio", email: "hello@pixelstudio.com", phone: "+91 91234 56789", company: "Pixel Studio", status: "Inactive" },
  { id: 4, name: "Vertex Solutions", email: "info@vertex.com", phone: "+91 99887 66554", company: "Vertex Solutions", status: "Active" },
  { id: 5, name: "CloudNine Systems", email: "admin@cloudnine.com", phone: "+91 98765 98765", company: "CloudNine Systems", status: "Active" },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
};

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  const openAddDrawer = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setShowDrawer(true);
  };

  const openEditDrawer = (customer) => {
    setEditingId(customer.id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
    });
    setError("");
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedEmail = formData.email.trim().toLowerCase();

    const emailExists = customers.some(
      (customer) =>
        customer.email.toLowerCase() === normalizedEmail &&
        customer.id !== editingId
    );

    if (emailExists) {
      setError("A customer with this email already exists.");
      return;
    }

    const customerData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
    };

    if (editingId !== null) {
      setCustomers((previous) =>
        previous.map((customer) =>
          customer.id === editingId
            ? { ...customer, ...customerData }
            : customer
        )
      );
    } else {
      setCustomers((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...customerData,
          status: "Active",
        },
      ]);
    }

    closeDrawer();
  };

  const toggleStatus = (id) => {
    setCustomers((previous) =>
      previous.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status: customer.status === "Active" ? "Inactive" : "Active",
            }
          : customer
      )
    );
  };

  const deleteCustomer = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) return;

    setCustomers((previous) =>
      previous.filter((customer) => customer.id !== id)
    );
  };

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const activeCount = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCount = customers.length - activeCount;

  return (
    <div className="customers-page">

      {/* Page Heading */}
      <div className="customers-heading">
        <div>
          <h2>Customers</h2>
          <p>Manage your customer information and records.</p>
        </div>

        <button className="btn btn-primary" onClick={openAddDrawer}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Customer
        </button>
      </div>

      {/* Summary Cards */}
      <div className="customer-summary">
        <div className="bl-card customer-summary-card">
          <span>Total Customers</span>
          <h3>{customers.length}</h3>
        </div>

        <div className="bl-card customer-summary-card">
          <span>Active Customers</span>
          <h3>{activeCount}</h3>
        </div>

        <div className="bl-card customer-summary-card">
          <span>Inactive Customers</span>
          <h3>{inactiveCount}</h3>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bl-card customer-table-card">
        <div className="customer-table-heading">
          <div>
            <h5>All Customers</h5>
            <p>View and manage your customer directory.</p>
          </div>

          <div className="customer-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle bl-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="customer-name">{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.company}</td>

                    <td>
                      <span className={`status-badge ${customer.status.toLowerCase()}`}>
                        {customer.status}
                      </span>
                    </td>

                    <td>
                      <div className="customer-actions">
                        <button
                          className="btn btn-sm btn-light"
                          title="Edit customer"
                          onClick={() => openEditDrawer(customer)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-light"
                          title="Change status"
                          onClick={() => toggleStatus(customer.id)}
                        >
                          <i className="bi bi-arrow-left-right"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-light text-danger"
                          title="Delete customer"
                          onClick={() => deleteCustomer(customer.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="customer-table-footer">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>

      {/* Drawer Overlay */}
      {showDrawer && (
        <div className="customer-drawer-overlay" onClick={closeDrawer}>
          <section
            className="customer-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="customer-drawer-header">
              <div>
                <h4>{editingId !== null ? "Edit Customer" : "Add New Customer"}</h4>
                <p>
                  {editingId !== null
                    ? "Update the customer's information."
                    : "Enter the customer's contact information."}
                </p>
              </div>

              <button
                className="btn btn-light"
                onClick={closeDrawer}
                aria-label="Close drawer"
                type="button"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="customer-drawer-form">
              <div className="customer-drawer-body">

                {error && (
                  <div className="alert alert-danger py-2">
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Customer Name *</label>
                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Company Name *</label>
                  <input
                    className="form-control"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    required
                  />
                </div>

              </div>

              <div className="customer-drawer-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={closeDrawer}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check-lg me-2"></i>
                  {editingId !== null ? "Save Changes" : "Save Customer"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

    </div>
  );
};

export default Customers;
