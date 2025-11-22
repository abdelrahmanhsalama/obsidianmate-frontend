import { useActiveSession } from "../contexts/ActiveSessionContext";

const sessions = [
  { id: 1, title: "Chat #1" },
  { id: 2, title: "Chat #2" },
];

const SidebarSessionsMenu = () => {
  const { setActiveSession } = useActiveSession();

  return (
    <div className="p-2">
      <p className="mb-2 font-medium">Chats</p>
      <ul>
        {sessions.map((session) => (
          <li
            key={session.id}
            className="p-2 rounded-sm cursor-pointer hover:bg-gray-800 flex gap-2 items-center"
            onClick={() => setActiveSession(session.id)}
          >
            {session.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarSessionsMenu;
