import { AppRoutes } from "./routes/AppRoutes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layouts/AppSidebar";
import { Header } from "./components/layouts/Header";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="flex items-center gap-2 border-b border-b-amber-300 px-4 py-2">
            <SidebarTrigger />
            <Header />
          </div>
          <div className="px-4 py-2">
            <Toaster />
            <AppRoutes />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
