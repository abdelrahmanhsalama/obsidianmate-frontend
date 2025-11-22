import "./App.css";
import Sidebar from "./components/Sidebar";
import Conversation from "./components/Conversation";

function App() {
  return (
    <div className="min-h-screen dark:text-gray-100 grid grid-cols-[1fr_4fr]">
      <Sidebar />
      <Conversation />
    </div>
  );
}

export default App;
