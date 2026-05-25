export interface MenuItem {
    label: string;
    icon: React.ReactNode;
    url: string;
    accessRoles: string[]; // Array of roles that can access this menu item
}