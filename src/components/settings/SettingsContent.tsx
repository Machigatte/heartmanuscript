import * as React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { User, MessageCircleMore, Info, Settings } from "lucide-react";
import { ProfilePanel } from "./ProfilePanel";

const tabs = [
  { id: "general", title: "常规", icon: Settings },
  { id: "llm", title: "模型", icon: MessageCircleMore },
  { id: "profile", title: "账号", icon: User, component: ProfilePanel },
  { id: "about", title: "关于", icon: Info },
];

export function SettingsContent() {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);
  const ActivePanel = tabs.find(t => t.id === activeTab)?.component;

  return (
    <DialogContent className="sm:max-w-2xl h-[66vh] p-0 flex overflow-hidden">
      {/* 左侧 Tabs */}
      <div className="w-32 bg-gray-100 p-4 flex flex-col space-y-1">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <div
              key={tab.id}
              className={`flex items-center gap-2 p-1.5 rounded-md cursor-pointer transition-colors ${
                isSelected ? "bg-white font-medium" : "hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="w-4 h-4 text-gray-600" />
              <div className="flex-1 min-w-0">
                <span className="truncate">{tab.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 右侧内容 */}
      <div className="flex-1 p-6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tabs.find((t) => t.id === activeTab)?.title}</DialogTitle>
          <DialogDescription>
            {tabs.find((t) => t.id === activeTab)?.title} 设置内容
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 text-gray-700">
          {ActivePanel ? <ActivePanel /> : <p>此部分内容正在建设中</p>}
        </div>
      </div>
    </DialogContent>
  );
}
