import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ActiveSessionProvider } from "./contexts/ActiveSessionContext";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KindeProvider
      clientId="6d6f72a9536347c7b55b862dbd112e1b"
      domain="https://obsidianmate.kinde.com"
      redirectUri="http://localhost:5173"
      logoutUri="http://localhost:5173"
    >
      <ActiveSessionProvider>
        <App />
      </ActiveSessionProvider>
    </KindeProvider>
  </StrictMode>
);
