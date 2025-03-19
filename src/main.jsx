import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import the necessary QueryClientProvider
import App from "./App.jsx";
import "./index.css";

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}> {/* Wrap your app with QueryClientProvider */}
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);