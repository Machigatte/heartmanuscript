import { Sidebar, SidebarAction, SidebarContent, SidebarFooter, SidebarHeader, SidebarTitle } from "@/components/ui/sidebar";
import { UserArea } from "./UserArea";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { SearchPopover } from "./SearchPopover";
import { NoteList } from "./NoteList";
import { useQueryClient } from "@tanstack/react-query";
import { useNotes } from "@/hooks/useNotes";
import { useNoteStore } from "@/stores/useNoteStore";
import { useDeleteNote } from "@/hooks/useNoteMutations";
import { useSearchNotes } from "@/hooks/useSearchNotes";
import { SearchNotesParams } from "@/api/types";

interface NoteSidebarProps {
  onSelectNote: (id: number) => void;
  onNewNote: () => void
  onDeleteNote: (id: number) => void
}

export function NoteSidebar({
  onSelectNote,
  onNewNote,
  onDeleteNote,
}: NoteSidebarProps) {

  const queryClient = useQueryClient();
  const { data: notes, isLoading: isLoadingNotes } = useNotes();
  const { 
    data: searchResults, 
    searchNotes,      // 手动触发搜索的函数
    isPending: isSearching, 
    isFetched: searchIsFetched, // 标记是否执行过搜索
    reset: resetSearch,        // 重置搜索状态的函数
  } = useSearchNotes();

  const { mutate: deleteNote } = useDeleteNote();

  const { currentNoteId } = useNoteStore();
  const isSearchActive = searchIsFetched && searchResults !== undefined;

  const currentData = isSearchActive ? searchResults : notes;
  const isLoading = isLoadingNotes || isSearching;
  const isEmptySearch = isSearchActive && (!searchResults || searchResults.length === 0);

  const handleRefresh = async () => {
    resetSearch(); 
    try {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    } catch (error) {
      console.error("刷新失败:", error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    deleteNote(id);
    onDeleteNote(id);
  };

  const handleSearchNote = async (params: SearchNotesParams) => {
    console.log(params)
    searchNotes(params);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTitle>
          {isSearchActive ? "搜索结果" : "以前"}
        </SidebarTitle>
        <SidebarAction>
          <SearchPopover onSearch={handleSearchNote} />
          <Button variant="ghost" size="icon" onClick={handleRefresh}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNewNote}>
            <Plus className="w-4 h-4" />
          </Button>
        </SidebarAction>
      </SidebarHeader>

      <SidebarContent>
        {
          isLoading && 
          <p className="p-4 text-center">Loading...</p>
        }
        
        {
          !isLoading && isEmptySearch &&
          <p className="p-4 text-center text-muted-foreground">没有找到相关的笔记。</p>
        }

        {
          !isLoading && currentData &&
          <NoteList
            notes={currentData} // 使用 currentData
            currentNoteId={currentNoteId}
            onSelect={onSelectNote}
            onDelete={handleDeleteNote}
          />
        }
      </SidebarContent>

      <SidebarFooter>
        <UserArea />
      </SidebarFooter>
    </Sidebar>
  );
}
