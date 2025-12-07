import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ActiveSessionProvider } from "./contexts/ActiveSessionContext";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDE_ISSUER_URL}
      redirectUri={import.meta.env.VITE_KINDE_SITE_URL}
      logoutUri={import.meta.env.VITE_KINDE_POST_LOGOUT_REDIRECT_URL}
    >
      <QueryClientProvider client={queryClient}>
        <ActiveSessionProvider>
          <App />
        </ActiveSessionProvider>
      </QueryClientProvider>
    </KindeProvider>
  </StrictMode>
);
