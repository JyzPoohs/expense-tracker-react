import { Button } from "@/components/ui/button";
import { House } from "lucide-react";

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button>
        <House className="mr-2 h-4 w-4" />
        Home
      </Button>
    </div>
  );
};
