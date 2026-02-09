'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useBreadcrumb } from '@/hooks/providers/useBreadcrumbProvider';
import React from 'react'

export default function BreadcrumbComponent({ items: propItems, separator = "/" }) {
  const contextItems = useBreadcrumb();
  const items = propItems || contextItems;
  
  return (
    <div className="w-full">
      <Breadcrumb>
        <BreadcrumbList>
          {items?.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem key={index} className={"text-md"}>
                {item?.href !== null ? (
                  <BreadcrumbLink href={item?.href} className="text-base text-primary font-medium">{item?.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className=" text-base text-primary font-medium">{item?.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && (
                <BreadcrumbSeparator className="">{separator}</BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
