import React from "react";
import AppRoutes from "./router";
import { SearchProvider } from "./context/SearchContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <SearchProvider>
      <ToastProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </ToastProvider>
    </SearchProvider>
  );
}

export default App;
