"use client"

import * as React from "react"
import {
  IconBuildingStore,
  IconChartBar,
  IconContract,
  IconHelp,
  IconInnerShadowTop,
  IconLayoutDashboardFilled,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react"
import { NavMain } from "@/components/home/nav-main"
import { NavSecondary } from "@/components/home/nav-secondary"
import { NavUser } from "@/components/home/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"

const data = {
  navMain: [
    {
      title: "Analytics",
      url: "/analytics", // This is nothing but Analytics of the business
      icon: IconChartBar,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconListDetails,
    },
    {
      title: "Services",
      url: "/services",
      icon: IconLayoutDashboardFilled,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: IconBuildingStore,
    },
    {
      title: "Contracts",
      url: "/contracts",
      icon: IconContract,
    },
    {
      title: "Members",
      url: "/members",
      icon: IconUserPlus,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/search",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <div>
                <IconInnerShadowTop className="size-5!" />
                <Link href={'/home'} className="text-base font-semibold tracking-tight">Awaken Studios.</Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser user={user!} />
        )}
      </SidebarFooter>
    </Sidebar>
  )
};

