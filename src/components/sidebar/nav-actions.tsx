"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
}) {
  return <>{condition ? wrapper(children) : children}</>;
}

export function NavActions({
  actions,
}: {
  actions: {
    title: string
    url: string
    icon?: LucideIcon
    link?: string
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {actions.map((action) => (
          <SidebarMenuItem key={action.title}>
            <ConditionalWrapper
              condition={!!action.link}
              wrapper={(children) => <Link href={action.link!}>{children}</Link>}
            >
              <SidebarMenuButton tooltip={action.title}>
                {action.icon && <action.icon />}
                <span>{action.title}</span>
              </SidebarMenuButton>
            </ConditionalWrapper>
            </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
