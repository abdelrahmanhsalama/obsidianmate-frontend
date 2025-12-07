import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { LogOut } from "lucide-react";

const SidebarUser = () => {
  const { user, logout } = useKindeAuth();
  console.log(user);

  return (
    user && (
      <div className="p-2 pe-0 rounded-sm cursor-pointer flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-8 h-8 flex justify-center items-center bg-gray-100 text-gray-900 font-bold">
            {user?.givenName?.charAt(0)}
          </div>
          <div className="font-bold">
            {user?.givenName + " " + user?.familyName}
          </div>
        </div>
        <button
          className="hover:bg-gray-800 p-2 rounded-full cursor-pointer"
          onClick={() => logout()}
        >
          <LogOut size={16} />
        </button>
      </div>
    )
  );
};

export default SidebarUser;
