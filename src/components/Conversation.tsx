import { useEffect, useRef, useState } from "react";
import { useActiveSession } from "../contexts/ActiveSessionContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

type Message = {
  text: string;
  author: string;
};

const Conversation = () => {
  const { activeSession } = useActiveSession();
  const { user } = useKindeAuth();

  const queryClient = useQueryClient();

  const {
    data: session,
    isLoading,
    isError: sessionError,
  } = useQuery({
    queryKey: ["session", activeSession],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/nlp/chat_history/${activeSession}/${user?.id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch session");
      }
      return res.json();
    },
    enabled: !!activeSession,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
  });

  const [newMessage, setNewMessage] = useState("");
  const [messageBeingSent, setMessageBeingSent] = useState("");
  const [botResponding, setBotResponding] = useState<boolean>(false);
  const [sendingError, setSendingError] = useState(false);

  const lastMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToLastMessage = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [session?.chat_history, botResponding, sendingError]);

  useEffect(() => {
    if (!botResponding) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [botResponding]);

  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      const encodedQuery = encodeURIComponent(messageText);
      const apiLink = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/nlp/chat/${activeSession}/${user?.id}?query=${encodedQuery}`;

      console.log("API Request:", apiLink);

      const response = await fetch(apiLink, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("API Error:", error);
        throw new Error(error.detail || "Failed to send message");
      }

      return await response.json();
    },
    onMutate: () => {
      setNewMessage("");
      setSendingError(false);
      setBotResponding(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["session", activeSession],
      });
      setMessageBeingSent("");
      setSendingError(false);
      setBotResponding(false);
    },
    onError: (error) => {
      console.log(error);
      setMessageBeingSent("");
      setNewMessage(messageBeingSent);
      setSendingError(true);
      setBotResponding(false);
    },
  });

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    setMessageBeingSent(message.trim());
    sendMessageMutation.mutate(message);
  };

  const summarize = useMutation({
    mutationFn: async () => {
      let query = "Summarize:";
      session.chat_history.forEach((chat: Message) => {
        query = query.concat("\n\n", chat.author, ": \n\n", chat.text);
      });
      const encodedQuery = encodeURIComponent(query);
      const apiLink = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/nlp/chat/${activeSession}/${user?.id}?query=${encodedQuery}`;

      console.log("API Request:", apiLink);

      const response = await fetch(apiLink, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("API Error:", error);
        throw new Error(error.detail || "Failed to send message");
      }

      return await response.json();
    },
    onMutate: () => {
      setNewMessage("");
      setSendingError(false);
      setBotResponding(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["session", activeSession],
      });
      setMessageBeingSent("");
      setSendingError(false);
      setBotResponding(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    },
    onError: (error) => {
      console.log(error);
      setMessageBeingSent("");
      setNewMessage(messageBeingSent);
      setSendingError(true);
      setBotResponding(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    },
  });

  return (
    <main className="dark:bg-gray-950">
      {(!session || isLoading || sessionError) && (
        <div className="flex flex-col h-full justify-center items-center space-y-2">
          {!activeSession && (
            <>
              <p className="text-2xl">
                Welcome to <span className="font-medium">ObsidianMate</span>!
              </p>
              <p className="w-[75%]">
                ObsidianMate is your AI-powered assistant for Obsidian, helping
                you organize, analyze, and enhance your knowledge base.
              </p>
            </>
          )}
          {isLoading && <p>Loading...</p>}
          {sessionError && <p>Failed to fetch conversation...</p>}
        </div>
      )}
      {session && (
        <div className="p-2 flex flex-col h-screen space-y-2">
          <div className="flex flex-col overflow-y-auto flex-1">
            {session.chat_history.map((message: Message, i: number) => (
              <div
                key={i}
                className={`flex ${
                  message.author === "user" ? "justify-end" : "justify-start"
                } p-2`}
              >
                <p className="bg-gray-800 p-2 rounded-sm whitespace-pre-line max-w-[80%]">
                  {message.text}
                </p>
              </div>
            ))}
            {messageBeingSent && (
              <div className="flex justify-end p-2">
                <p className="bg-gray-800 p-2 rounded-sm whitespace-pre-line">
                  {messageBeingSent}
                </p>
              </div>
            )}
            {botResponding && (
              <div className="flex justify-start p-2">
                <p className="bg-gray-800 p-2 rounded-sm">Bot Responding...</p>
              </div>
            )}
            {sendingError && (
              <div className="flex justify-start p-2">
                <p className="bg-red-200 text-red-600 p-2 rounded-sm">
                  Error sending message...
                </p>
              </div>
            )}
            <div ref={lastMessageRef} />
          </div>
          <div className="w-full flex gap-2 px-2 mb-1">
            <input
              className={`bg-gray-800 px-2 py-2.5 rounded-sm w-full ${
                botResponding ? "cursor-not-allowed" : ""
              }`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(newMessage)}
              disabled={botResponding}
              ref={inputRef}
            ></input>
            <button
              className="bg-gray-800 px-2 py-2.5 rounded-sm cursor-pointer hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-900"
              onClick={() => sendMessage(newMessage)}
              disabled={botResponding}
            >
              Send
            </button>
            <button
              className="bg-gray-800 px-2 py-2.5 rounded-sm cursor-pointer hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-900"
              onClick={() => summarize.mutate()}
              disabled={botResponding || session.chat_history.length < 4}
            >
              Summarize
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Conversation;
