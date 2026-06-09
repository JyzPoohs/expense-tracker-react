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

import type { MenuItem } from "@/types/menuItems";

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
    accessRoles: ["user", "admin"],
  },
  {
    label: "Analytics",
    icon: ChartArea,
    url: "/analytics",
    accessRoles: ["admin"],
  },
  {
    label: "Profile",
    icon: User2,
    url: "/profile",
    accessRoles: ["user", "admin"],
  },
  {
    label: "Transactions",
    icon: ArrowRightLeftIcon,
    url: "/transactions",
    accessRoles: ["user", "admin"],
  },
  {
    label: "Accounts",
    icon: Landmark,
    url: "/accounts",
    accessRoles: ["user", "admin"],
  },
  {
    label: "Notifications",
    icon: Bell,
    url: "/notifications",
    accessRoles: ["user", "admin"],
  },
  {
    label: "Settings",
    icon: Settings,
    url: "/settings",
    accessRoles: ["user", "admin"],
  },
];
