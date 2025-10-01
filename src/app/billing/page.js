import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React from 'react'

const items = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Billing", href: "/billing" },
//   { label: "Customer", href: null },
];

export default function page() {
  return (
    <BreadcrumbProvider value={items}>
      <span>Billing</span>
    </BreadcrumbProvider>
  )
}
