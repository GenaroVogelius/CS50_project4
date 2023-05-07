import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TestContextProvider } from "./context/TestContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TestContextProvider>
      <App />
    </TestContextProvider>
  </React.StrictMode>
);
