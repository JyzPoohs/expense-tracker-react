import { Card, CardTitle, CardContent } from "@/components/ui/card";
import DefaultAvatar from "../assets/default_avatar.png";

export const Profile = () => {
  return (
    <div>
      <Card className="border border-amber-200">
        <CardContent className="flex">
          <img src={DefaultAvatar} alt="Default Avatar" className="w-40 h-40" />
          <div className="ml-5">
            <p>Name: John Doe</p>
            <p>Email: johndoe@example.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
