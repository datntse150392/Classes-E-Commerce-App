import React from "react";
import AppRoutes from "./router";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </SearchProvider>
  );
}

export default App;
