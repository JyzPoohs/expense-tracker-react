import type { LucideIcon } from "lucide-react";

export interface MenuItem {
    label: string;
    icon: LucideIcon;
    url: string;
    accessRoles: string[]; // Array of roles that can access this menu item
}