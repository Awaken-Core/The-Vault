"use client";

import { Button } from "@repo/ui"
import { Separator } from "@repo/ui"
import { SidebarTrigger } from "@repo/ui"
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const currentPath = pathname.split('/').filter(Boolean).slice(1)[0];

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{currentPath[0].toUpperCase() + currentPath.slice(1)}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">

          </Button>
        </div>
      </div>
    </header>
  )
};
