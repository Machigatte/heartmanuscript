import { cn } from "@/lib/utils"
import * as React from "react"

function Sidebar({ className, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside className={cn(
      "w-full h-screen bg-white flex flex-col",
      className
    )}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        "flex justify-between items-center p-4",
        className
      )}
      {...props}
    />
  )
}

function SidebarTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-title"
      className={cn(
        "leading-none font-semibold text-lg",
        className
      )}
      {...props}
    />
  )
}

function SidebarDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-description"
      className={cn(
        "text-muted-foreground text-sm",
        className
      )}
      {...props}
    />
  )
}

function SidebarAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-action"
      className={cn(
        "flex space-x-1",
        className
      )}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex flex-col flex-1 overflow-y-auto p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("w-full px-3 py-2 border-t border-gray-200", className)}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarHeader,
  SidebarTitle,
  SidebarDescription,
  SidebarAction,
  SidebarContent,
  SidebarFooter
}
