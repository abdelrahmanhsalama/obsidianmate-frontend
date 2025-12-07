// import { Plus } from "lucide-react";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useActiveSession } from "../contexts/ActiveSessionContext";
import { useQueryClient } from "@tanstack/react-query";

const SidebarActionsMenu = () => {
  const { setActiveSession } = useActiveSession();
  const { user } = useKindeAuth();
  const queryClient = useQueryClient();

  const sidebarMenuItems = [
    {
      title: "New Chat",
      // icon: <Plus size={18} />,
      icon: "+ ",
      action: async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/data/create_session/${
              user?.id
            }`,
            { method: "POST" }
          );

          if (!response.ok) {
            console.error("Failed to create session", response.status);
            setActiveSession(null);
            return;
          }

          const newSession = await response.json();
          console.log("Session created successfully", newSession.session_id);
          queryClient.invalidateQueries({ queryKey: ["sessions"] });
          setActiveSession(newSession.session_id);
        } catch (error) {
          console.error("Session couldn't be created!", error);
          setActiveSession(null);
        }
      },
    },
  ];

  return (
    <div className="px-1">
      <ul>
        {sidebarMenuItems.map((item) => (
          <li
            key={item.title}
            onClick={item.action}
            className="p-2 rounded-sm cursor-pointer hover:bg-gray-800 flex gap-2 items-center"
          >
            {item.icon}
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarActionsMenu;
