import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React from 'react'

const items = [
  { label: "Billing", href: "/billing" },
];

export default function page() {
  return (
    <BreadcrumbProvider value={items}>
      <span>Billing</span>
    </BreadcrumbProvider>
  )
}
