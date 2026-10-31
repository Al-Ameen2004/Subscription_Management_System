import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";

// Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Custom Brightloop styles
import "./styles.css";

// Render the React application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);