import { AppRoutes } from "./routes/AppRoutes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layouts/AppSidebar";

function App() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          <AppRoutes />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
