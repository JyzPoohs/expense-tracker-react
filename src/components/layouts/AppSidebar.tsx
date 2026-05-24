import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  User2,
  LogOut,
  LayoutDashboard,
  ArrowRightLeftIcon,
  Landmark,
  Bell,
  Settings,
} from "lucide-react";

import logo from "../../assets/TorchEye_Ledger_logo.png";

const menuItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    url: "/",
  },
  {
    label: "Profile",
    icon: <User2 />,
    url: "/profile",
  },
  {
    label: "Transactions",
    icon: <ArrowRightLeftIcon />,
    url: "/transactions",
  },
  {
    label: "Accounts",
    icon: <Landmark />,
    url: "/accounts",
  },
  {
    label: "Notifications",
    icon: <Bell />,
    url: "/notifications",
  },
  {
    label: "Settings",
    icon: <Settings />,
    url: "/settings",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <img
          src={logo}
          className="w-32 h-18 m-auto"
          alt="TorchEye Ledger Logo"
        />
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((item, index) => (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    {item.icon}
                    {item.label}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut /> Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
