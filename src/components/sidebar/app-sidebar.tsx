"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { NavNotes } from "./nav-notes"
import { NavActions } from "./nav-actions"
import { NoteTypeSwitcher } from "./note-type-switcher"
import { NewDraftAction } from "./actions/new-draft-action"
import { SearchNoteAction } from "./actions/search-note-action"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NoteTypeSwitcher />
        <NavActions>
          <NewDraftAction />
          <SearchNoteAction />
        </NavActions>
      </SidebarHeader>
      <SidebarContent>
        <NavNotes />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
