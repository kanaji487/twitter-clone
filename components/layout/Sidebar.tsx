import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { useCallback } from "react";
import { PiSignInDuotone } from "react-icons/pi";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut, signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLogin-modal";
import SidebarTweetButton from "./SidebarTweetButton";

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();
  
    const items = [
      {
        icon: BsHouseFill,
        label: 'Home',
        href: '/',
      },
      {
        icon: BsBellFill,
        label: 'Notifications',
        href: '/notifications',
        auth: true,
        alert: currentUser?.hasNotification
      },
      {
        icon: FaUser,
        label: 'Profile',
        href: `/users/${currentUser?.id}`,
        auth: true,
      },
    ]
  
    return (
      <div className="col-span-1 h-full pr-4 md:pr-6">
          <div className="flex flex-col items-end">
            <div className="space-y-2 lg:w-[230px]">
              <SidebarLogo />
              {items.map((item) => (
                <SidebarItem
                  key={item.href}
                  alert={item.alert}
                  auth={item.auth}
                  href={item.href} 
                  icon={item.icon} 
                  label={item.label}
                />
              ))}
              {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
              <SidebarTweetButton />
            </div>
          </div>
        </div>
    )
  };
  
  export default Sidebar;