import React, { createContext, useContext, useState } from "react";

const ActiveSessionContext = createContext<{
  activeSession: string | null;
  setActiveSession: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

const ActiveSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  return (
    <ActiveSessionContext.Provider value={{ activeSession, setActiveSession }}>
      {children}
    </ActiveSessionContext.Provider>
  );
};

const useActiveSession = () => {
  const context = useContext(ActiveSessionContext);
  if (!context) {
    throw new Error(
      "useActiveSession must be used within an ActiveSessionProvider"
    );
  }
  return context;
};

export { ActiveSessionProvider, useActiveSession };
