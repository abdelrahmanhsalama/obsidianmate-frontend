import { useEffect, useState } from "react";
import { useActiveSession } from "../contexts/ActiveSessionContext";

interface Message {
  sender: string;
  content: string;
}

interface Session {
  id: number;
  messages: Message[];
}

const initialSessions: Session[] = [
  {
    id: 1,
    messages: [
      { sender: "user", content: "Hello!" },
      { sender: "bot", content: "Hello! How can I help you today?" },
      { sender: "user", content: "Can you create a new page for me?" },
      { sender: "bot", content: "For sure! Give me the details." },
    ],
  },
  {
    id: 2,
    messages: [
      { sender: "user", content: "Good morning!" },
      {
        sender: "bot",
        content: "Good morning! How can I help you today?",
      },
      { sender: "user", content: "Can you help me with my research?" },
      {
        sender: "bot",
        content: "Of course! What topic are you researching?",
      },
    ],
  },
  {
    id: 3,
    messages: [],
  },
];

const Conversation = () => {
  const { activeSession } = useActiveSession();
  const [session, setSession] = useState<undefined | Session>();
  const [newMessage, setNewMessage] = useState("");
  const [botResponding, setBotResponding] = useState<boolean>(false);

  useEffect(() => {
    const fetchedSession = initialSessions.find(
      (session) => session.id === activeSession
    );
    setSession(fetchedSession);
  }, [activeSession]);

  const sendMessage = (message: string) => {
    if (!session || !message.trim()) return;
    const newSession = {
      ...session,
      messages: [
        ...session?.messages,
        {
          sender: "user",
          content: message.trim(),
        },
      ],
    };
    setSession(newSession);
    setNewMessage("");
    setBotResponding(true);
    setTimeout(() => {
      setBotResponding(false);
    }, 2000);
  };

  return (
    <main className="p-2 dark:bg-gray-950">
      {!session && (
        <div className="flex flex-col justify-center items-center h-full space-y-2">
          <p className="text-2xl">
            Welcome to <span className="font-medium">ObsidianMate</span>!
          </p>
          <p className="w-[75%]">
            ObsidianMate is your AI-powered assistant for Obsidian, helping you
            organize, analyze, and enhance your knowledge base.
          </p>
        </div>
      )}
      {session && (
        <div className="flex flex-col justify-end h-full space-y-2">
          {session.messages.map((message) => (
            <div
              key={message.content}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } p-2`}
            >
              <p className="bg-gray-800 p-2 rounded-sm">{message.content}</p>
            </div>
          ))}
          {botResponding && (
            <div className="flex justify-start p-2">
              <p className="bg-gray-800 p-2 rounded-sm">Bot Responding...</p>
            </div>
          )}
          <div className="w-full flex gap-2 px-2 mb-1">
            <input
              className={`bg-gray-800 px-2 py-2.5 rounded-sm w-full ${
                botResponding ? "cursor-not-allowed" : ""
              }`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(newMessage)}
              disabled={botResponding}
            ></input>
            <button
              className={`bg-gray-800 px-2 py-2.5 rounded-sm cursor-pointer hover:bg-gray-600 ${
                botResponding ? "cursor-not-allowed" : ""
              }`}
              onClick={() => sendMessage(newMessage)}
              disabled={botResponding}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Conversation;
