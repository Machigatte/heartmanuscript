import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { SearchCommand, SearchCommandHandle } from "./search-command";
import React from "react";
import { Hotkey } from "../../common/hotkey";

const action = {
  title: "搜索笔记",
  icon: Search,
}

export const SearchNoteAction: React.FC = () => {
  const searchRef = React.useRef<SearchCommandHandle>(null)

  const handleOpen = () => searchRef.current?.openDialog();

  return (
    <SidebarMenuItem key={action.title}>
      <SidebarMenuButton tooltip={action.title} onClick={handleOpen}>
        {action.icon && <action.icon />}
        <span>{action.title}</span>
        <Hotkey
          shortcuts={[
            { keyTrigger: "f", altKey: true },
          ]}
          onTrigger={handleOpen}
        />
      </SidebarMenuButton>
      <SearchCommand ref={searchRef} />
    </SidebarMenuItem>
  );
}
