import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React from 'react'

const items = [
  // { label: "Dashboard", href: "/dashboard" },
  { label: "Reports", href: "/reports" },
//   { label: "Customer", href: null },
];

export default function page() {
  return (
    <BreadcrumbProvider value={items}>
      <span>Reports</span>
    </BreadcrumbProvider>
  )
}
