import { Sun, Moon, Bell, CircleUserRound } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [username, setUsername] = useState("Username");

  return (
    <header className="w-full mb-2">
      <div className="flex justify-between items-center pt-2">
        <span className="font-semibold">TorchEye Ledger</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </button>
          <Bell className="cursor-pointer" />
          <span>|</span>
          <div className="flex items-center gap-2">
            <CircleUserRound />
            <span>{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
