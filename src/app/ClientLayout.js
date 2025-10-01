// app/layout/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
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
    <div className='h-screen '>
       <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
   </div>
  );
}
