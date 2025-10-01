import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User, CreditCard, Bell, LogOut } from "lucide-react";

export default function UserProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 bg-primary/90 rounded-xl p-2 cursor-pointer select-none">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User avatar"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div className="flex-1">
            <div className="font-semibold leading-tight">John Doe</div>
            <div className="text-xs text-primary-foreground/70">john@gmail.com</div>
          </div>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 mt-2">
        <div className="flex items-center gap-2 px-2 py-1">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User avatar"
            className="w-8 h-8 rounded-full border border-primary"
          />
          <div>
            <div className="font-semibold text-sm">John Doe</div>
            <div className="text-xs text-muted-foreground">john@gmail.com</div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="w-4 h-4 mr-2" /> Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="w-4 h-4 mr-2" /> Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="w-4 h-4 mr-2" /> Notifications
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 