import SidebarActionsMenu from "./SidebarActionsMenu";
import SidebarSessionsMenu from "./SidebarSessionsMenu";
import SidebarUser from "./SidebarUser";

const Sidebar = () => {
  return (
    <aside className="p-2 dark:bg-gray-900 flex flex-col justify-between h-screen text-sm">
      <div className="">
        <h1 className="text-2xl font-medium p-1">ObsidianMate</h1>
        <SidebarActionsMenu />
        <SidebarSessionsMenu />
      </div>
      <SidebarUser />
    </aside>
  );
};

export default Sidebar;
