"use client";

import React, { useState, useEffect } from "react";
import {
  Bike,
  BookText,
  Calendar,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCardIcon,
  FileBarChart2,
  FileStack,
  FileText,
  GalleryVertical,
  GalleryVerticalEnd,
  Home,
  Inbox,
  Package,
  Search,
  Settings,
  UserCog,
  Users,
  UserSquare,
  Receipt,
  Wallet,
} from "lucide-react";

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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const navItems = [
  { label: "Bookings", icon: FileStack, path: "/booking" },
  { label: "Customers", icon: UserSquare, path: "/customers" },
  // { label: 'Credit Hires', icon: Receipt, path: '/credit-hires' },
  { label: "Drivers", icon: Car, path: "/drivers" },
  // { label: 'Riders', icon: Bike, path: '/riders' },
  { label: "Packages", icon: CreditCardIcon, path: "/packages" },
  // { label: 'Billing', icon: BookText, path: '/billing' },
  { label: "Reports", icon: FileText, path: "/reports" },
];

const bottomNav = [
  // { label: 'Users', icon: Users, path: '/users' },
  { label: "Roles", icon: UserCog, path: "/roles" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isDriversOpen, setIsDriversOpen] = useState(false);

  // Auto-open submenu when on customer-related pages
  useEffect(() => {
    const isCustomerActive =
      pathname === "/customers" || pathname === "/customer-balances";
    if (isCustomerActive && state !== "collapsed") {
      setIsCustomersOpen(true);
    }
  }, [pathname, state]);

  // Auto-open submenu when on driver-related pages
  useEffect(() => {
    const isDriverActive =
      pathname === "/drivers" ||
      pathname === "/driver-balances" ||
      pathname === "/driver-leaves";
    if (isDriverActive && state !== "collapsed") {
      setIsDriversOpen(true);
    }
  }, [pathname, state]);

  return (
    <Sidebar className="group z-50 border-r border-gray-200 [&_[data-sidebar=sidebar]]:!bg-white">
      {/* App logo / header */}
      <SidebarHeader className="transition-all duration-300 h-20 px-4 py-4 border-b border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={`flex items-center w-full gap-2 ${state === "collapsed" ? "justify-center" : "justify-between"}`}
            >
              <a
                href="/booking"
                className={`flex gap-3 items-center group/logo transition-all duration-200 hover:opacity-80 ${state === "collapsed" ? "flex-none" : "flex-1"}`}
              >
                {state === "collapsed" ? (
                  <div className="ml-6 flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-md font-extrabold text-xl shadow-sm transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95">
                    D
                  </div>
                ) : (
                  <>
                    <div className="relative transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95">
                      {/* <GalleryVerticalEnd className="w-8 h-8 text-primary transition-transform duration-300 group-hover/logo:scale-110" /> */}
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-left-2 delay-75">
                      <h1 className="font-bold uppercase text-lg tracking-tight">
                        <span className="bg-primary text-primary-foreground px-2.5 py-1 rounded-md text-sm font-extrabold mr-2 shadow-sm">
                          Driver
                        </span>
                        <span className="text-gray-900">hub</span>
                      </h1>
                    </div>
                  </>
                )}
              </a>
              <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110 group/toggle"
                aria-label="Toggle sidebar"
              >
                {state === "expanded" ? (
                  <ChevronLeft className="w-5 h-5 text-gray-600 group-hover/toggle:text-gray-900 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover/toggle:text-gray-900 transition-transform duration-200" />
                )}
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main content */}
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Top navigation items */}
            <SidebarMenu className="space-y-1">
              {navItems.map(({ label, icon: Icon, path }) => {
                // Handle Customers menu item separately with submenu
                if (label === "Customers") {
                  const isCustomerActive =
                    pathname === "/customers" ||
                    pathname === "/customer-balances";
                  const isCustomersPage = pathname === "/customers";
                  const isCustomerBalancesPage =
                    pathname === "/customer-balances";

                  return (
                    <React.Fragment key={label}>
                      <SidebarMenuItem className="group/customers-menu relative">
                        <SidebarMenuButton
                          tooltip={label}
                          asChild={state === "collapsed"}
                          onClick={(e) => {
                            if (state === "collapsed") {
                              e.preventDefault();
                              toggleSidebar();
                              setIsCustomersOpen(true);
                              setIsDriversOpen(false);
                            } else {
                              setIsCustomersOpen(!isCustomersOpen);
                              setIsDriversOpen(false);
                            }
                          }}
                          className={`
                            relative w-full justify-start gap-3 px-3 py-2.5 md:py-2.5 rounded-lg
                            transition-all duration-200 ease-in-out
                            touch-manipulation
                            ${
                              isCustomerActive
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium"
                                : "text-gray-700 hover:bg-gray-100 active:bg-gray-200 hover:text-gray-900"
                            }
                            hover:translate-x-1 active:translate-x-0.5
                            group/item
                          `}
                        >
                          {state === "collapsed" ? (
                            <Link
                              href="/customers"
                              className="flex items-center gap-3 w-full"
                              onClick={(e) => e.preventDefault()}
                            >
                              {/* <Icon
                                className={`w-5 h-5 text-black rounded-md p-1 transition-all duration-200 ${
                                  isCustomerActive
                                    ? "scale-110"
                                    : "group-hover/item:scale-110"
                                }`}
                              /> */}
                              <Icon
                                className={`w-5 h-5 transition-all duration-200 ${
                                  isCustomerActive
                                    ? "scale-110"
                                    : "group-hover/item:scale-110"
                                }`}
                              />
                              {isCustomerActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full" />
                              )}
                            </Link>
                          ) : (
                            <div className="flex items-center gap-3 w-full">
                              <Icon
                                className={`w-5 h-5 transition-all duration-200 ${
                                  isCustomerActive
                                    ? "scale-110"
                                    : "group-hover/item:scale-110"
                                }`}
                              />
                              <span className="text-sm font-medium flex-1">
                                {label}
                              </span>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isCustomersOpen ? "rotate-180" : ""
                                }`}
                              />
                              {isCustomerActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full" />
                              )}
                            </div>
                          )}
                        </SidebarMenuButton>
                        {state !== "collapsed" && isCustomersOpen && (
                          <SidebarMenuSub className="transition-all duration-200 ease-in-out">
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isCustomersPage}
                                className={
                                  isCustomersPage
                                    ? "bg-primary text-primary-foreground font-medium"
                                    : ""
                                }
                              >
                                <Link
                                  href="/customers"
                                  className="flex items-center gap-2"
                                >
                                  <UserSquare className="w-4 h-4 bg-black" />
                                  <span>Customer</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isCustomerBalancesPage}
                                className={
                                  isCustomerBalancesPage
                                    ? "bg-primary text-primary-foreground font-medium"
                                    : ""
                                }
                              >
                                <Link
                                  href="/customer-balances"
                                  className="flex items-center gap-2"
                                >
                                  <Wallet className="w-4 h-4 bg-black" />
                                  <span>Balances</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        )}
                      </SidebarMenuItem>
                    </React.Fragment>
                  );
                }

                // Handle Drivers menu item separately with submenu
                if (label === "Drivers") {
                  const isDriverActive =
                    pathname === "/drivers" ||
                    pathname === "/driver-balances" ||
                    pathname === "/driver-leaves";
                  const isDriversPage = pathname === "/drivers";
                  const isDriverBalancesPage = pathname === "/driver-balances";
                  const isDriverLeavesPage = pathname === "/driver-leaves";

                  return (
                    <React.Fragment key={label}>
                      <SidebarMenuItem className="group/drivers-menu relative">
                        <SidebarMenuButton
                          tooltip={label}
                          asChild={state === "collapsed"}
                          onClick={(e) => {
                            if (state === "collapsed") {
                              e.preventDefault();
                              toggleSidebar();
                              setIsDriversOpen(true);
                              setIsCustomersOpen(false);
                            } else {
                              setIsDriversOpen(!isDriversOpen);
                              setIsCustomersOpen(false);
                            }
                          }}
                          className={`
                            relative w-full justify-start gap-3 px-3 py-2.5 md:py-2.5 rounded-lg
                            transition-all duration-200 ease-in-out
                            touch-manipulation
                            ${
                              isDriverActive
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium"
                                : "text-gray-700 hover:bg-gray-100 active:bg-gray-200 hover:text-gray-900"
                            }
                            hover:translate-x-1 active:translate-x-0.5
                            group/item
                          `}
                        >
                          {state === "collapsed" ? (
                            <Link
                              href="/drivers"
                              className="flex items-center gap-3 w-full"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Icon
                                className={`w-5 h-5 transition-all duration-200 ${
                                  isDriverActive
                                    ? "scale-110"
                                    : "group-hover/item:scale-110"
                                }`}
                              />
                              {isDriverActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full" />
                              )}
                            </Link>
                          ) : (
                            <div className="flex items-center gap-3 w-full">
                              <Icon
                                className={`w-5 h-5 transition-all duration-200 ${
                                  isDriverActive
                                    ? "scale-110"
                                    : "group-hover/item:scale-110"
                                }`}
                              />
                              <span className="text-sm font-medium flex-1">
                                {label}
                              </span>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isDriversOpen ? "rotate-180" : ""
                                }`}
                              />
                              {isDriverActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full" />
                              )}
                            </div>
                          )}
                        </SidebarMenuButton>
                        {state !== "collapsed" && isDriversOpen && (
                          <SidebarMenuSub className="transition-all duration-200 ease-in-out">
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isDriversPage}
                                className={
                                  isDriversPage
                                    ? "bg-primary text-primary-foreground font-medium"
                                    : ""
                                }
                              >
                                <Link
                                  href="/drivers"
                                  className="flex items-center gap-2 "
                                >
                                  <Car className="w-4 h-4 bg-black" />
                                  <span>Driver</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isDriverBalancesPage}
                                className={
                                  isDriverBalancesPage
                                    ? "bg-primary text-primary-foreground font-medium"
                                    : ""
                                }
                              >
                                <Link
                                  href="/driver-balances"
                                  className="flex items-center gap-2"
                                >
                                  <Wallet className="w-4 h-4 bg-black" />
                                  <span>Balances</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isDriverLeavesPage}
                                className={
                                  isDriverLeavesPage
                                    ? "bg-primary text-primary-foreground font-medium"
                                    : ""
                                }
                              >
                                <Link
                                  href="/driver-leaves"
                                  className="flex items-center gap-2"
                                >
                                  <Calendar className="w-4 h-4 bg-black" />
                                  <span>Leaves</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        )}
                      </SidebarMenuItem>
                    </React.Fragment>
                  );
                }

                // Regular menu items
                const isActive = pathname === path;
                return (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      tooltip={label}
                      asChild
                      onClick={() => {
                        setIsCustomersOpen(false);
                        setIsDriversOpen(false);
                      }}
                      className={`
                        relative w-full justify-start gap-3 px-3 py-2.5 md:py-2.5 rounded-lg
                        transition-all duration-200 ease-in-out
                        touch-manipulation
                        ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium"
                            : "text-gray-700 hover:bg-gray-100 active:bg-gray-200 hover:text-gray-900"
                        }
                        hover:translate-x-1 active:translate-x-0.5
                        group/item
                      `}
                    >
                      <Link
                        href={path}
                        className="flex items-center gap-3 w-full"
                      >
                        <Icon
                          className={`w-5 h-5 transition-all duration-200 ${
                            isActive
                              ? "scale-110"
                              : "group-hover/item:scale-110"
                          }`}
                        />
                        <span className="text-sm font-medium">{label}</span>
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            {/* Bottom navigation */}
            <div className="mt-auto pt-8">
              <SidebarSeparator className="mb-4 bg-gray-200" />
              <SidebarMenu className="space-y-1">
                {bottomNav.map(({ label, icon: Icon, path }) => {
                  const isActive = pathname === path;
                  return (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        tooltip={label}
                        asChild
                        onClick={() => {
                          setIsCustomersOpen(false);
                          setIsDriversOpen(false);
                        }}
                        className={`
                          relative w-full justify-start gap-3 px-3 py-2.5 rounded-lg
                          transition-all duration-200 ease-in-out
                          touch-manipulation
                          ${
                            isActive
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium"
                              : "text-gray-700 hover:bg-gray-100 active:bg-gray-200 hover:text-gray-900"
                          }
                          hover:translate-x-1 active:translate-x-0.5
                          group/item
                        `}
                      >
                        <Link
                          href={path}
                          className="flex items-center gap-3 w-full"
                        >
                          <Icon
                            className={`w-5 h-5 transition-all duration-200 ${
                              isActive
                                ? "scale-110"
                                : "group-hover/item:scale-110"
                            }`}
                          />
                          <span className="text-sm font-medium">{label}</span>
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
