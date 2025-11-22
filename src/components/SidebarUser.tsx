const user = { userId: 1, name: "Abdelrahman" };

const SidebarUser = () => {
  return (
    <div className="p-2 rounded-sm cursor-pointer hover:bg-gray-800 flex items-center gap-2">
      <div className="rounded-full w-8 h-8 flex justify-center items-center bg-gray-100 text-gray-900">
        {user.name.charAt(0)}
      </div>
      <div className="font-bold">{user.name}</div>
    </div>
  );
};

export default SidebarUser;
