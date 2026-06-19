import { Sun, Moon, Bell, CircleUserRound, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { SearchBar } from "../common/SearchBar";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { user, logout } = useAuth();

  return (
    <header className="w-full mb-2">
      <div className="flex justify-between items-center pt-2">
        <span className="font-semibold">TorchEye Ledger</span>
        <div className="flex items-center gap-4">
          <SearchBar />
          <button
            className="cursor-pointer"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </button>
          <Bell className="cursor-pointer" />
          <LogOut className="cursor-pointer" onClick={logout} />
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
