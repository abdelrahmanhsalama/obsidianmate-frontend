import React, { createContext, useContext, useState } from "react";

type Session = null | number;

type ActiveSession = {
  activeSession: Session;
  setActiveSession: React.Dispatch<React.SetStateAction<Session>>;
};

const ActiveSessionContext = createContext<ActiveSession | null>(null);

const ActiveSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSession, setActiveSession] = useState<Session>(null);
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
