"use client"

import * as React from "react"

import Image from "next/image";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link";

export function TeamSwitcher({
  team
}) {

  return (
    (<SidebarMenu>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Link href="/" className="flex items-center gap-2 w-full">
          <div
            className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Image alt="logo" src={"/logo.svg"} height={100} width={100} className="size-12" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{team.name}</span>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenu>)
  );
}
