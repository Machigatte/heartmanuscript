"use client";

import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { ItemWrapper } from "./itemWrapper";
import { SettingWrapper } from "./settingWrapper";
import { useData, createNewRecord, sortRecordsByDate } from "@/dataManager";


export function Sidebar() {
  // 使用数据管理系统
  const { state, dispatch } = useData();
  const { records, currentRecordId } = state;
  
  // 处理历史记录项点击事件
  const handleItemClick = (id: string) => {
    // 确保总是更新选中状态，即使点击的是当前选中的item
    dispatch({ type: 'SET_CURRENT_RECORD', payload: id });
    
    // 如果需要切换选中状态，可以改为：
    // dispatch({ type: 'SET_CURRENT_RECORD', 
    //   payload: currentRecordId === id ? null : id 
    // });
  };
  
  // 处理添加新记录的点击事件
  const handleAddNew = () => {
    // 创建新记录并添加到记录列表
    const newRecord = createNewRecord("其他");
    dispatch({ type: 'ADD_RECORD', payload: newRecord });
  };
  
  // 处理保存设置
  const handleSaveSettings = (settings: { model: string; apiKey: string }) => {
    dispatch({ 
      type: 'UPDATE_SETTINGS', 
      payload: { 
        model: settings.model, 
        apiKey: settings.apiKey 
      } 
    });
  };
  
  // 处理记录查询
  const handleSearchRecords = () => {
    console.log("查询记录");
    // 这里可以添加记录查询的逻辑，例如打开搜索对话框
  };
  
  // 按日期排序记录
  const sortedRecords = sortRecordsByDate(records);
  return (
    <aside className="w-64 border-r bg-white flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">历史记录</h2>
        <div className="flex space-x-1">
          <SettingWrapper onSaveSettings={handleSaveSettings} />
          
          <Button variant="ghost" size="icon" onClick={handleAddNew}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 列表 + 按钮容器 */}
      <div className="flex flex-col flex-1 overflow-y-auto justify-between p-4">
        {/* 上面列表 */}
        <ul className="space-y-2">
          {sortedRecords.length > 0 ? (
            sortedRecords.map((item) => (
              <ItemWrapper
                key={item.id}
                item={item}
                isSelected={currentRecordId === item.id}
                // 确保item.id和currentRecordId类型匹配
                onClick={handleItemClick}
                onDelete={(id) => dispatch({ type: 'DELETE_RECORD', payload: id })}
              />
            ))
          ) : (
            <li className="text-sm text-gray-500 text-center p-4">
              暂无记录，点击右上角加号添加
            </li>
          )}
        </ul>

        {/* 底部记录查询按钮 */}
        <div className="mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleSearchRecords}
          >
            <Search className="w-4 h-4" />
            <span>记录查询</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
