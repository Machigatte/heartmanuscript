"use client";

import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { SearchPopover } from "@/containers/SearchPopover";

import { useState } from "react";
import { ItemWrapper } from "../containers/itemWrapper";
import { SettingWrapper } from "../containers/settingWrapper";
import { useData, sortRecordsByDate } from "@/dataManager";
import { deleteRecord, searchRecords } from "@/services/recordService";
import { toast } from "sonner";

export function Sidebar() {
  // 使用数据管理系统
  const { state, dispatch, loadRecords  } = useData();
  const { records, currentRecordId } = state;
  
  // 处理历史记录项点击事件
  const handleItemClick = (id: string) => {
    // 确保总是更新选中状态，即使点击的是当前选中的item
    dispatch({ type: 'SET_CURRENT_RECORD', payload: id });
  };
  
  // 处理添加新记录的点击事件
  const handleAddNew = () => {
    // 创建新记录并添加到记录列表
    dispatch({ type: 'CREATE_DRAFT' });
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
  
  const handleSearchRecords = async (params: {
    from?: Date;
    to?: Date;
    noteType?: string;
    keyword?: string;
  }) => {
    console.log(params);
    try {
      dispatch({ type: 'FETCH_RECORDS' });
      const records = await searchRecords(params);
      dispatch({ type: 'SET_RECORDS', payload: records });
      toast("查询成功");
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '查询失败' });
      toast("查询失败");
    }
  };
  
  const handleDeleteRecord = (id: string) => {
    try {
      deleteRecord(id)
      dispatch({ type: 'DELETE_RECORD', payload: id });
      toast("删除成功")
    } catch (e) {
      toast("删除失败")
    }
  };
  
  // 按日期排序记录
  // const sortedRecords = sortRecordsByDate(records);
  return (
    <aside className="w-64 border-r bg-white flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">以前</h2>
        <div className="flex space-x-1">
          <SettingWrapper onSaveSettings={handleSaveSettings} />

          <SearchPopover onSearch={handleSearchRecords} />

          <Button variant="ghost" size="icon" onClick={loadRecords}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleAddNew}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      

      {/* 列表容器 */}
      <div className="flex flex-col flex-1 overflow-y-auto p-2">
        
        {/* 上面列表 */}
        <ul className="space-y-1">
          {records.length > 0 ? (
            records.map((item) => (
              <ItemWrapper
                key={item.id}
                item={item}
                isSelected={currentRecordId === item.id}
                // 确保item.id和currentRecordId类型匹配
                onClick={handleItemClick}
                onDelete={handleDeleteRecord}
              />
            ))
          ) : (
            <li className="text-sm text-gray-500 text-center p-4">
              暂无记录，点击右上角加号添加
            </li>
          )}
        </ul>

        
      </div>
    </aside>
  );
}
