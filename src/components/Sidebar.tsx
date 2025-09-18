"use client";

import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { SearchPopover } from "@/containers/SearchPopover";

import { ItemWrapper } from "../containers/itemWrapper";
import { SettingWrapper } from "../containers/settingWrapper";
import { useData } from "@/dataManager";
import { deleteRecord, searchRecords } from "@/services/recordService";
import { sortRecordsByDate } from "@/dataManager/dataUtils";
import { toast } from "sonner";
import { useConfirmDialog } from "@/contexts/ConfirmDialogContext";

export function Sidebar() {
  // 使用数据管理系统
  const { state, dispatch, loadRecords  } = useData();
  const { records, currentRecordId } = state;
  const { show } = useConfirmDialog();
  
  // 处理历史记录项点击事件
  const handleItemClick = (id: string) => {
    if (state.isModified && id !== currentRecordId) {
      show({
        title: "更改未保存",
        description: "确定要离开吗？如果您现在离开，您当前的信息不会被保存。",
        confirmText: "留下",
        cancelText: "离开",
        onCancel: () => {
          console.log("Setting current record to:", id);
          dispatch({ type: 'SET_CURRENT_RECORD', payload: id });
        }
      });
    } else {
      // 不存在未保存更改，直接更新当前记录
      dispatch({ type: 'SET_CURRENT_RECORD', payload: id });
    }
  };
  
  // 处理添加新记录的点击事件
  const handleAddNew = () => {
    if(state.isModified) {
      show({
        title: "创建草稿",
        description: "当前记录未保存，是否创建草稿？",
        confirmText: "取消",
        cancelText: "创建",
        onCancel: () => {
          // 创建草稿
          dispatch({ type: 'CREATE_DRAFT' });
        }
      })
    } else {
      dispatch({ type: 'CREATE_DRAFT' });
    }
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

  // 处理安全刷新 - 检查是否有未保存的更改
  const handleSafeRefresh = () => {
    if (state.isModified) {
      show({
        title: "更改未保存",
        description: "刷新列表将丢失当前未保存的更改。确定要继续吗？",
        confirmText: "取消",
        cancelText: "刷新",
        onCancel: () => {
          loadRecords();
        }
      });
    } else {
      // 没有未保存的更改，直接刷新
      loadRecords();
    }
  };
  
  // 按日期排序记录（最新的在前）
  const sortedRecords = sortRecordsByDate(records);
  return (
    <aside className="w-full bg-white flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">以前</h2>
        <div className="flex space-x-1">
          <SettingWrapper onSaveSettings={handleSaveSettings} />

          <SearchPopover onSearch={handleSearchRecords} />

          <Button variant="ghost" size="icon" onClick={handleSafeRefresh}>
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
          {sortedRecords.length > 0 ? (
            sortedRecords.map((item) => (
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
