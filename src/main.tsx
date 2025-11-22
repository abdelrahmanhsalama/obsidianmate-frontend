import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ActiveSessionProvider } from "./contexts/ActiveSessionContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ActiveSessionProvider>
      <App />
    </ActiveSessionProvider>
  </StrictMode>
);
