import { AppRoutes } from "./routes/AppRoutes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layouts/AppSidebar";
import { Header } from "./components/layouts/Header";

function App() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex p-4">
          <SidebarTrigger className="flex-1" />
          <div className="ml-5">
            <Header/>
            <AppRoutes />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
