import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Welcome = () => {
  const { login } = useKindeAuth();

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-2">
      <p className="text-2xl">
        Welcome to <span className="font-medium">ObsidianMate</span>!
      </p>
      <p className="w-[50%]">
        ObsidianMate is your AI-powered assistant for Obsidian, helping you
        organize, analyze, and enhance your knowledge base.
      </p>
      <button
        className="dark:bg-gray-100 dark:text-gray-900 p-2 rounded-sm cursor-pointer hover:bg-gray-200"
        onClick={() => login()}
      >
        Register/Login
      </button>
    </div>
  );
};

export default Welcome;
