"use client";
import { Note } from "@/types";
import { usePathname } from "next/navigation";
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react";
import { useDeleteNote } from "@/hooks/use-note-mutations";
import { useAppStore } from "@/stores/use-app-store";
import { useConfirmNavigation } from "@/hooks/use-confirm-navigation";

export default function NoteItem({ note }: { note: Note }) {
  const pathname = usePathname();
  const isActive = pathname === `/notes/${note.id}`;
  const { isMobile } = useSidebar();
  const { isDirty } = useAppStore();
  const { confirmNavigation } = useConfirmNavigation(isDirty);

  const { mutate: deleteNote } = useDeleteNote()

  const handleClick = () => {
    confirmNavigation(`/notes/${note.id}`);
  }

  const handleDelete = (note: Note) => {
    deleteNote(note)
  }

  return (
    <SidebarMenuItem key={note.id}>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        onClick={handleClick}
      >
        <span>{note.title}</span>
      </SidebarMenuButton>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">更多</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-48 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          <DropdownMenuItem
            onClick={handleClick}
          >
            <Folder className="text-muted-foreground" />
            <span>打开笔记</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Forward className="text-muted-foreground" />
            <span>创建副本</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={() => handleDelete(note)}
          >
            <Trash2 className="text-muted-foreground" />
            <span>删除笔记</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>

  )
};