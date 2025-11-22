import { useActiveSession } from "../contexts/ActiveSessionContext";

const Conversation = () => {
  const { activeSession } = useActiveSession();
  return (
    <main className="p-4 dark:bg-gray-950">
      {!activeSession && (
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
    </main>
  );
};

export default Conversation;
