"use client";

import BreadcrumbComponent from "@/components/common/BreadcrumbComponent";
import { CustomTrigger } from "@/components/sidebar/CustomTrigger";
import { createContext, useContext } from "react";

const BreadcrumbContext = createContext([]);

export const BreadcrumbProvider = ({ value, children }) => (
    <BreadcrumbContext.Provider value={value}>
         <div className="w-full font-semibold border-b border-foreground/20 flex gap-4 items-center bg-gradient-to-r from-secondary to-[#01333C] dark:bg-gradient-to-r dark:from-secondary dark:to-[#01333C]">
            <CustomTrigger /> | <BreadcrumbComponent items={value}/>
          </div>
    <div className="w-full p-4 h-screen  text-primary  font-semibold">
      {children}
    </div>
  </BreadcrumbContext.Provider>
);

export const useBreadcrumb = () => useContext(BreadcrumbContext);
