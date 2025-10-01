'use client'

import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeft } from "lucide-react"

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

    return <button onClick={toggleSidebar}>
        <div className="p-3 hover:bg-primary/30 m-1 rounded-xl">
            <PanelLeft className="w-7 h-7"/>
      </div>
  </button>
}