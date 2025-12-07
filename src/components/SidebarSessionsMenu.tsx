import { useState } from "react";
import { useActiveSession } from "../contexts/ActiveSessionContext";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SidebarSessionsMenu = () => {
  const { activeSession, setActiveSession } = useActiveSession();
  const { user } = useKindeAuth();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState("");

  const queryClient = useQueryClient();

  const {
    data: sessionsList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/data/list_sessions/${
          user?.id
        }`
      );
      if (!res.ok) throw new Error("Failed to fetch sessions");
      return res.json();
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
  });

  const deleteSessionMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/data/delete_session/${sessionId}/${user?.id}`,
        { method: "DELETE" }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      if (activeSession === toBeDeleted) {
        setActiveSession(null);
      }
    },
  });

  const deleteSession = (sessionId: string) => {
    setDeleteConfirmation(true);
    setToBeDeleted(sessionId);
  };

  const hasSessions = sessionsList?.sessions_ids?.length > 0;

  return (
    <div className="p-2">
      <p className="mb-2 font-medium">Chats</p>
      {isLoading && <p>Loading conversations...</p>}
      {isError && <p>Error loading conversations...</p>}
      {hasSessions ? (
        sessionsList.sessions_ids.map((session: string) => (
          <li
            key={session}
            className={`p-2 rounded-sm cursor-pointer hover:bg-gray-800 flex gap-2 items-center justify-between ${
              session === activeSession ? "bg-gray-800" : null
            }`}
            onClick={() => setActiveSession(session)}
          >
            <p>{session}</p>
            <button
              className="hover:bg-gray-900 p-2 rounded-full cursor-pointer"
              onClick={(e) => {
                deleteSession(session);
                e.stopPropagation();
              }}
            >
              <Trash size={16} />
            </button>
          </li>
        ))
      ) : (
        <p className="p-2 text-gray-400">No sessions found</p>
      )}
      {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded shadow-lg max-w-sm w-full space-y-4">
            <p>Are you sure you want to delete this session?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmation(false)}
                className="px-4 py-2 rounded hover:bg-gray-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteSessionMutation.mutate(toBeDeleted);
                  setDeleteConfirmation(false);
                }}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-800 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarSessionsMenu;
