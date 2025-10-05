
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import ClientLayout from "./ClientLayout";

export default async function Layout({ children }) {

  return (
    <div className="max-h-screen w-screen">
      {/* <SidebarInset> */}
        <main className="">
        <ClientLayout>
            {children}
        </ClientLayout>
        </main>
      {/* </SidebarInset> */}
   </div>
  );
}