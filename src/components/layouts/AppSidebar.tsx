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
  ChartArea,
} from "lucide-react";

import logo from "../../assets/TorchEye_Ledger_logo.png";
import { NavLink } from "react-router-dom";
import type { MenuItem } from "@/types/menuItems";
import { useAuth } from "@/auth/AuthProvider";

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    url: "/",
    accessRoles: ["user", "admin"],
  },
  {
    label: "Analytics",
    icon: <ChartArea />,
    url: "/analytics",
    accessRoles: ["admin"],
  },
  {
    label: "Profile",
    icon: <User2 />,
    url: "/profile",
    accessRoles: ["user", "admin"],
  },
  {
    label: "Transactions",
    icon: <ArrowRightLeftIcon />,
    url: "/transactions",
    accessRoles: ["user", "admin"],
  },
  {
    label: "Accounts",
    icon: <Landmark />,
    url: "/accounts",
    accessRoles: ["user", "admin"],
  },
  {
    label: "Notifications",
    icon: <Bell />,
    url: "/notifications",
    accessRoles: ["user", "admin"],
  },
  {
    label: "Settings",
    icon: <Settings />,
    url: "/settings",
    accessRoles: ["user", "admin"],
  },
];

export function AppSidebar() {
  const { user } = useAuth();

  const accessibleMenuItems = menuItems.filter((item) =>
    item.accessRoles.some((role) => user?.roles.includes(role.toUpperCase())),
  );

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <img
          src={logo}
          className="w-32 h-18 object-contain mx-auto"
          alt="TorchEye Ledger Logo"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {accessibleMenuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? "bg-accent font-medium" : ""
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
