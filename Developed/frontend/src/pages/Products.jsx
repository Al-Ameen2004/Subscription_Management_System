
import React, { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Odoo ERP Software",
    type: "Software",
    salesPrice: 24999,
    costPrice: 12000,
    notes: "Complete business management software.",
    variants: [
      { id: 1, name: "Standard", extraPrice: 0 },
      { id: 2, name: "Premium", extraPrice: 560 },
    ],
  },
  {
    id: 2,
    name: "CRM Management System",
    type: "Software",
    salesPrice: 9999,
    costPrice: 4500,
    notes: "Customer relationship management solution.",
    variants: [
      { id: 1, name: "Basic", extraPrice: 0 },
      { id: 2, name: "Advanced", extraPrice: 1500 },
    ],
  },
  {
    id: 3,
    name: "Cloud Storage",
    type: "Service",
    salesPrice: 2499,
    costPrice: 900,
    notes: "Secure cloud storage service.",
    variants: [
      { id: 1, name: "100 GB", extraPrice: 0 },
      { id: 2, name: "500 GB", extraPrice: 1200 },
    ],
  },
];

const emptyForm = {
  name: "",
  type: "",
  salesPrice: "",
  costPrice: "",
  notes: "",
  variants: [],
};

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  const openAddDrawer = () => {
    setEditingId(null);
    setFormData({
      ...emptyForm,
      variants: [],
    });
    setError("");
    setShowDrawer(true);
  };

  const openEditDrawer = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      type: product.type,
      salesPrice: String(product.salesPrice),
      costPrice: String(product.costPrice),
      notes: product.notes,
      variants: product.variants.map((variant) => ({ ...variant })),
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

  const addVariant = () => {
    setFormData((previous) => ({
      ...previous,
      variants: [
        ...previous.variants,
        {
          id: Date.now(),
          name: "",
          extraPrice: 0,
        },
      ],
    }));
  };

  const updateVariant = (id, field, value) => {
    setFormData((previous) => ({
      ...previous,
      variants: previous.variants.map((variant) =>
        variant.id === id
          ? { ...variant, [field]: value }
          : variant
      ),
    }));
  };

  const removeVariant = (id) => {
    setFormData((previous) => ({
      ...previous,
      variants: previous.variants.filter(
        (variant) => variant.id !== id
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.type.trim() ||
      Number(formData.salesPrice) < 0 ||
      Number(formData.costPrice) < 0
    ) {
      setError("Please enter valid product details and prices.");
      return;
    }

    const invalidVariant = formData.variants.some(
      (variant) =>
        !variant.name.trim() ||
        Number(variant.extraPrice) < 0
    );

    if (invalidVariant) {
      setError("Please complete every variant or remove empty variants.");
      return;
    }

    const productData = {
      name: formData.name.trim(),
      type: formData.type.trim(),
      salesPrice: Number(formData.salesPrice),
      costPrice: Number(formData.costPrice),
      notes: formData.notes.trim(),
      variants: formData.variants.map((variant) => ({
        ...variant,
        name: variant.name.trim(),
        extraPrice: Number(variant.extraPrice),
      })),
    };

    if (editingId !== null) {
      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingId
            ? { ...product, ...productData }
            : product
        )
      );
    } else {
      setProducts((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...productData,
        },
      ]);
    }

    closeDrawer();
  };

  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((previous) =>
      previous.filter((product) => product.id !== id)
    );
  };

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="products-page">

      {/* Page Heading */}
      <div className="products-heading">
        <div>
          <h2>Products</h2>
          <p>Manage your products, pricing and variants.</p>
        </div>

        <button className="btn btn-primary" onClick={openAddDrawer}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Product
        </button>
      </div>

      {/* Summary Cards */}
      <div className="product-summary">

        <div className="bl-card product-summary-card">
          <span>Total Products</span>
          <h3>{products.length}</h3>
        </div>

        <div className="bl-card product-summary-card">
          <span>Total Variants</span>
          <h3>
            {products.reduce(
              (total, product) => total + product.variants.length,
              0
            )}
          </h3>
        </div>

        <div className="bl-card product-summary-card">
          <span>Average Sales Price</span>
          <h3>
            {formatINR(
              products.length
                ? products.reduce(
                    (total, product) => total + product.salesPrice,
                    0
                  ) / products.length
                : 0
            )}
          </h3>
        </div>

      </div>

      {/* Product Directory */}
      <div className="bl-card product-table-card">

        <div className="product-table-heading">
          <div>
            <h5>All Products</h5>
            <p>View and manage your product catalogue.</p>
          </div>

          <div className="customer-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle bl-table">

            <thead>
              <tr>
                <th>Product Name</th>
                <th>Type</th>
                <th>Sales Price</th>
                <th>Cost Price</th>
                <th>Variants</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="customer-name">
                      {product.name}
                    </td>

                    <td>
                      <span className="product-type-badge">
                        {product.type}
                      </span>
                    </td>

                    <td>{formatINR(product.salesPrice)}</td>

                    <td>{formatINR(product.costPrice)}</td>

                    <td>
                      <span className="product-variant-count">
                        {product.variants.length} variants
                      </span>
                    </td>

                    <td>
                      <div className="customer-actions">
                        <button
                          className="btn btn-sm btn-light"
                          title="Edit product"
                          onClick={() => openEditDrawer(product)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-light text-danger"
                          title="Delete product"
                          onClick={() => deleteProduct(product.id)}
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
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="customer-table-footer">
          Showing {filteredProducts.length} of {products.length} products
        </div>

      </div>

      {/* Product Drawer */}
      {showDrawer && (
        <div
          className="customer-drawer-overlay"
          onClick={closeDrawer}
        >
          <section
            className="customer-drawer product-drawer"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="customer-drawer-header">
              <div>
                <h4>
                  {editingId !== null ? "Edit Product" : "Add New Product"}
                </h4>
                <p>Enter product details and configure its variants.</p>
              </div>

              <button
                className="btn btn-light"
                type="button"
                onClick={closeDrawer}
                aria-label="Close drawer"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="customer-drawer-form"
            >
              <div className="customer-drawer-body">

                {error && (
                  <div className="alert alert-danger py-2">
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Product Name *</label>
                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Product Type *</label>
                  <input
                    className="form-control"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Enter product type"
                    required
                  />
                </div>

                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label">Sales Price (₹) *</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-control"
                      name="salesPrice"
                      value={formData.salesPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label">Cost Price (₹) *</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-control"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div className="mt-3 mb-4">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add product description or notes..."
                  ></textarea>
                </div>

                {/* Variants */}
                <div className="product-variants-section">

                  <div className="product-variants-heading">
                    <div>
                      <h6>Product Variants</h6>
                      <p>Add optional variants and their extra prices.</p>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={addVariant}
                    >
                      <i className="bi bi-plus-lg me-1"></i>
                      Add Variant
                    </button>
                  </div>

                  {formData.variants.length === 0 && (
                    <div className="no-variants">
                      No variants added yet.
                    </div>
                  )}

                  {formData.variants.map((variant, index) => (
                    <div className="variant-row" key={variant.id}>
                      <div className="variant-number">
                        {index + 1}
                      </div>

                      <div className="variant-fields">
                        <input
                          className="form-control"
                          placeholder="Variant name"
                          value={variant.name}
                          onChange={(e) =>
                            updateVariant(
                              variant.id,
                              "name",
                              e.target.value
                            )
                          }
                          required
                        />

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="form-control"
                          placeholder="Extra price (₹)"
                          value={variant.extraPrice}
                          onChange={(e) =>
                            updateVariant(
                              variant.id,
                              "extraPrice",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-light text-danger"
                        onClick={() => removeVariant(variant.id)}
                        title="Remove variant"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))}

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
                  {editingId !== null ? "Save Changes" : "Save Product"}
                </button>
              </div>

            </form>
          </section>
        </div>
      )}

    </div>
  );
};

export default Products;
