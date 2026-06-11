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
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        {SettingItems.map((item) => (
          <TabsTrigger value={item.toLowerCase().replace(" ", "-")}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {SettingItems.map((item) => (
        <TabsContent value={item.toLowerCase().replace(" ", "-")}>
          <Card>
            <CardHeader>
              <CardTitle>{item}</CardTitle>
              <CardDescription>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
