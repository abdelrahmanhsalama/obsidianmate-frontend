// import { Plus } from "lucide-react";

const sidebarMenuItems = [
  {
    title: "New Chat",
    // icon: <Plus size={18} />,
    icon: "+ ",
    action: () => {
      alert("Working!");
    },
  },
];

const SidebarActionsMenu = () => {
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
