// app/layout/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { createContext, useContext } from "react";

export const BreadcrumbContext = createContext([]);

export function useBreadcrumb() {
  return useContext(BreadcrumbContext);
}

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full w-full">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 lg:hidden">
              <SidebarTrigger className="-ml-1" />
              <div className="flex items-center gap-2 px-4 italic font-bold">
                <span className="text-primary">Driver</span>hub
              </div>
            </header>
            <main className="flex-1 overflow-auto ">
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
