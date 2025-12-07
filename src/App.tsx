import "./App.css";
import Sidebar from "./components/Sidebar";
import Conversation from "./components/Conversation";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Welcome from "./components/Welcome";

function App() {
  const { isAuthenticated } = useKindeAuth();
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100">
      {isAuthenticated ? (
        <div className="grid grid-cols-[1fr_4fr] h-screen">
          <Sidebar />
          <Conversation />
        </div>
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default App;
