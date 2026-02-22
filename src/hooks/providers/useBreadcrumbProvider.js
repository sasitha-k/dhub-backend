"use client";

import BreadcrumbComponent from "@/components/common/BreadcrumbComponent";
import { createContext, useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Bell, CreditCard, ChevronsDownUp } from 'lucide-react';
import { useLogin } from '@/hooks/login/useLogin';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-device';

const BreadcrumbContext = createContext([]);

export const BreadcrumbProvider = ({ value, children }) => {
  const { onLogout } = useLogin();
  const isMobile = useIsMobile();

  return (
    <BreadcrumbContext.Provider value={value}>
      <>
         <div className="w-full h-14 font-semibold flex gap-2 md:gap-4 items-center justify-between bg-white border-b-2 px-2 md:px-4">
            {isMobile && (
              <SidebarTrigger className="shrink-0 -ml-1 size-10 [&_svg]:w-5 [&_svg]:h-5" />
            )}
            <div className="flex-1 min-w-0">
              <BreadcrumbComponent items={value}/>
            </div>
            <div className="flex items-center flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 cursor-pointer group/profile touch-manipulation">
                    <div className="relative">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="User avatar"
                        className="w-8 h-8 md:w-9 md:h-8 rounded-full border-2 border-gray-200 shadow-md transition-transform duration-200 group-hover/profile:scale-105"
                      />
                      <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover/profile:opacity-100 transition-opacity duration-200" />
                    </div>
                    <div className="hidden md:flex flex-col items-start">
                      {/* <div className="font-semibold text-sm text-gray-900">
                        John Doe
                      </div>
                      <div className="text-xs text-gray-600">
                        john@gmail.com
                      </div> */}
                    </div>
                    <ChevronsDownUp className="w-4 h-4 text-gray-500 transition-transform duration-200 group-hover/profile:rotate-180 hidden md:block" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent 
                  className="w-64 mt-2 shadow-lg border-gray-200 bg-white" 
                  side="bottom" 
                  align="end"
                >
                  <div className="flex items-center gap-3 py-3 px-3">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="User avatar"
                      className="w-10 h-10 rounded-full border-2 border-primary/20 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 truncate">
                        John Doe
                      </div>
                      <div className="text-xs text-gray-600 truncate">
                        john@gmail.com
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-gray-200" />

                  <DropdownMenuItem className="gap-2 cursor-pointer transition-colors duration-150 hover:bg-gray-100">
                    <User className="w-4 h-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer transition-colors duration-150 hover:bg-gray-100">
                    <CreditCard className="w-4 h-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer transition-colors duration-150 hover:bg-gray-100">
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem 
                    onClick={() => {
                      onLogout();
                    }}
                    className="gap-2 cursor-pointer transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        <div className="w-full text-primary font-semibold">
          {children}
        </div>
      </>
  </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => useContext(BreadcrumbContext);
