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
import { LogOut } from "lucide-react";

import logo from "../../assets/TorchEye_Ledger_logo.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";

import { menuItems } from "@/config/SidebarConfig";
import { logoutDialog } from "@/config/AlertDialogConfig";
import { AlertDialog } from "../common/AlertDialog";

export function AppSidebar() {
  const { user, logout } = useAuth();

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
                      {item.icon && <item.icon />}
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
            <AlertDialog
              {...logoutDialog}
              icon={LogOut}
              triggerClassName="bg-transparent hover:bg-transparent cursor-pointer"
              onConfirm={logout}
            />
            <SidebarMenuButton></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
