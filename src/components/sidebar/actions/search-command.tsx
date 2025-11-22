"use client"

import * as React from "react"

import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import { useSearchNotes } from "@/hooks/use-search-notes"
import { useAppStore } from "@/stores/use-app-store"
import { Note } from "@/types"
import { useConfirmNavigation } from "@/hooks/use-confirm-navigation"
import { Skeleton } from "@/components/ui/skeleton"

export interface SearchCommandHandle {
  openDialog: () => void
}

export const SearchCommand = React.forwardRef<SearchCommandHandle>(
  (_, ref) => {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const { isDirty, searchParams } = useAppStore();

    const newParams = React.useMemo(() => ({ keyword: query, ...searchParams }), [query, searchParams]);

    const { data: results, isLoading } = useSearchNotes(newParams);
    const { confirmNavigation } = useConfirmNavigation(isDirty);

    const handleClick = (note: Note) => {
      confirmNavigation(`/notes/${note.id}`);
      setOpen(false);
    }

    // 暴露给外部调用
    React.useImperativeHandle(ref, () => ({
      openDialog: () => setOpen(true),
    }))

    return (
      <>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="在库中搜索笔记" 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
                <div className="px-4 py-4">
            {
              isLoading ? (
                <>
                  <Skeleton className="h-7 w-full rounded-md" />
                  <Skeleton className="h-7 w-full rounded-md" />
                  <Skeleton className="h-7 w-full rounded-md" />
                  <Skeleton className="h-7 w-full rounded-md" />
                  <Skeleton className="h-7 w-full rounded-md" />
                  <Skeleton className="h-7 w-full rounded-md" />
                </>
              ) : (
              results?.map((note) => {
                return (
                  <li
                    key={note.id}
                    className="
                      data-[selected=true]:bg-accent 
                      data-[selected=true]:text-accent-foreground 
                      [&_svg:not([class*='text-'])]:text-muted-foreground 
                      relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm 
                      outline-hidden select-none 
                      data-[disabled=true]:pointer-events-none 
                      data-[disabled=true]:opacity-50 
                      [&_svg]:pointer-events-none 
                      [&_svg]:shrink-0 
                      [&_svg:not([class*='size-'])]:size-4

                      hover:bg-accent/80        /* hover 背景色 */
                      hover:text-accent-foreground /* hover 文字色 */
                    "
                    onClick={() => handleClick(note)}
                  >
                    {note.title}
                  </li>
                )
              })
              )
            }
                </div>
          </CommandList>
        </CommandDialog>
      </>
    )
  }
)

SearchCommand.displayName = "SearchCommand"
