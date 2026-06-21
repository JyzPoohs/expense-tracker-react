import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingItems } from "@/config/SettingItems";

export function Tab() {
  return (
    <Tabs defaultValue="categorires" className="w-full">
      <TabsList>
        {SettingItems.map((setting) => (
          <TabsTrigger value={setting.item.toLowerCase().replace(" ", "-")}>
            {setting.item}
          </TabsTrigger>
        ))}
      </TabsList>
      {SettingItems.map((setting) => (
        <TabsContent value={setting.item.toLowerCase().replace(" ", "-")}>
          <Card>
            <CardHeader>
              <CardTitle>{setting.item}</CardTitle>
                {setting.component}
            </CardHeader>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
