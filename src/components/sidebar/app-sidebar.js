'use client';

import {
  Bell,
  Bike,
  Calendar,
  Car,
  ChevronsDownUp,
  CreditCard,
  FileBarChart2,
  FileStack,
  FileText,
  GalleryVertical,
  GalleryVerticalEnd,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  User,
  UserCog,
  Users,
  UserSquare,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogin } from '@/hooks/login/useLogin';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Bookings', icon: FileStack, path: '/booking' },
  { label: 'Customers', icon: UserSquare, path: '/customers' },
  { label: 'Drivers', icon: Car, path: '/drivers' },
  { label: 'Riders', icon: Bike, path: '/riders' },
  { label: 'Billing', icon: CreditCard, path: '/billing' },
  { label: 'Reports', icon: FileText, path: '/reports' },
];

const bottomNav = [
  { label: 'Users', icon: Users, path: '/users' },
  { label: 'Roles', icon: UserCog, path: '/roles' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export function AppSidebar() {

  const { onLogout} = useLogin();

  return (
    <Sidebar  className="group ">
      {/* App logo / header */}
         
    <SidebarHeader className="transition-all duration-200 h-32 pl-4  py-6">
            <SidebarMenu>
              <SidebarMenuItem>
                      <a href="/dashboard" className="flex gap-4 items-center">
                      <GalleryVerticalEnd
                        className="w-8 h-8  "
                          />
                          <div className='group-data-[state=collapsed]:hidden'>
                               <h1 className=' font-bold uppercase text-md tracking-widest'>
                              <span className='bg-white px-2 py-1 rounded-xs text-primary mr-2'>Driver</span>
                              hub
                          </h1>
                         </div>
                    </a>
              </SidebarMenuItem>
            </SidebarMenu>
      </SidebarHeader>

      {/* Main content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="grid items-center ">
            {/* Top navigation items */}
            <SidebarMenu className={"space-y-2"}>
              {navItems.map(({ label, icon: Icon, path }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton >
                    <a href={path} className="flex gap-2 items-center justify-center">
                      <Icon className="w-6 h-6" />
                      <span>{label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* Bottom navigation */}
            <SidebarMenu className="mt-32 space-y-2">
              {bottomNav.map(({ label, icon: Icon, path }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton >
                    <a href={path} className="flex gap-2 items-center">
                      <Icon className="w-6 h-6" />
                      <span>{label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <SidebarSeparator className="my-4" />

            {/* User dropdown */}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton  asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-4 rounded-xl cursor-pointer">
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="User avatar"
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <div className="flex flex-col items-start mr-6">
                          <div className="font-semibold">John Doe</div>
                          <div className="text-xs text-primary-foreground/70">john@gmail.com</div>
                        </div>
                        <ChevronsDownUp className="w-4 h-4" />
                      </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-64 mt-2" side="left" align="start">
                      <div className="flex items-center gap-4 py-2 px-2">
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="User avatar"
                          className="w-5 h-5 rounded-full border border-primary"
                        />
                        <div>
                          <div className="font-semibold text-sm">John Doe</div>
                          <div className="text-xs text-muted-foreground">john@gmail.com</div>
                        </div>
                      </div>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <User className="w-4 h-4 mr-2" />
                        Account
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Billing
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                          onLogout();
                        }}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
