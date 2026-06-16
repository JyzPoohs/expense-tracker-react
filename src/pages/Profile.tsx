import { Card, CardTitle, CardContent } from "@/components/ui/card";
import DefaultAvatar from "../assets/default_avatar.png";
import { useAuth } from "@/auth/AuthProvider";

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <Card className="border border-amber-200">
        <CardContent className="flex">
          <img src={DefaultAvatar} alt="Default Avatar" className="w-40 h-40" />
          <div className="ml-5">
            <p>Name: {user?.username}</p>
            <p>Email: {user?.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
