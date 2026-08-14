import { Sun, Moon, Bell, CircleUserRound, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { SearchBar } from "../common/SearchBar";
import { AlertDialog } from "../common/AlertDialog";
import { logoutDialog } from "@/config/AlertDialogConfig";
import { Button } from "../ui/button";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { user, logout } = useAuth();

  return (
    <header className="w-full mb-2">
      <div className="flex justify-between items-center pt-2">
        <span className="font-semibold">TorchEye Ledger</span>
        <div className="flex items-center gap-4">
          <SearchBar />
          <Button variant="ghost" size="icon-xs" asChild
            className="cursor-pointer"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </Button>
          <Button variant="ghost" size="icon-xs" asChild>
            <Bell className="cursor-pointer" />
          </Button>
          <AlertDialog {...logoutDialog} icon={LogOut} triggerClassName="bg-transparent hover:bg-transparent cursor-pointer" onConfirm={logout} />
          <span>|</span>
          <div className="flex items-center gap-2">
            <CircleUserRound />
            <span>{user?.username}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
