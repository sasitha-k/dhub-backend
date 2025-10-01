"use client";

import { BreadcrumbProvider } from "@/hooks/providers/useBreadcrumbProvider";

const items = [
  { label: "Dashboard", href: "/dashboard" },
//   { label: "Transactions", href: "/transaction" },
//   { label: "Customer", href: null },
];

export default function DashboardPage() {
  return (
    <BreadcrumbProvider value={items}>
      <span>Dashboard</span>
    </BreadcrumbProvider>
  );
}