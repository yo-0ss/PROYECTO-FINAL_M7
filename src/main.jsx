import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./context/global-context.jsx";
import "./index.css";
import App from "./App.jsx";
import History from "./components/History.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <div className="flex">
      <History />
      <App />
    </div>
  </GlobalProvider>
);
