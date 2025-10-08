"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, RecordData, AppSettings } from './types';
import { fetchAllRecords } from '../services/recordService';
import { toast } from 'sonner';

// 初始状态
const initialState: AppState = {
  records: [],
  currentRecordId: null,
  settings: {
    model: 'gpt-4',
    apiKey: '',
    theme: 'light'
  },
  isLoading: false,
  error: null,
  isModified: false
};

// 定义操作类型
type ActionType = 
  | { type: 'SET_MODIFIED'; payload: boolean }
  | { type: 'FETCH_RECORDS' }
  | { type: 'SET_RECORDS'; payload: RecordData[] }
  | { type: 'CREATE_DRAFT' }
  | { type: 'ADD_RECORD'; payload: RecordData }
  | { type: 'UPDATE_RECORD'; payload: RecordData }
  | { type: 'DELETE_RECORD'; payload: string }
  | { type: 'SET_CURRENT_RECORD'; payload: string | null }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// 创建reducer函数
function dataReducer(state: AppState, action: ActionType): AppState {
  switch (action.type) {
    case 'SET_MODIFIED':
      return { ...state, isModified: action.payload };

    case 'FETCH_RECORDS':
      // 这里只设置loading状态，实际数据获取在useEffect中处理
      return { ...state, isLoading: true };

    case 'SET_RECORDS':
      return { ...state, records: action.payload, isLoading: false };
    
    case 'CREATE_DRAFT':
      return { ...state, currentRecordId: null };

    case 'ADD_RECORD':
      return { 
        ...state, 
        records: [...state.records, action.payload],
        currentRecordId: action.payload.id // 自动选中新添加的记录
      };
    
    case 'UPDATE_RECORD':
      return {
        ...state,
        records: state.records.map(record => 
          record.id === action.payload.id ? action.payload : record
        )
      };
    
    case 'DELETE_RECORD':
      return {
        ...state,
        records: state.records.filter(record => record.id !== action.payload),
        currentRecordId: state.currentRecordId === action.payload ? null : state.currentRecordId
      };
    
    case 'SET_CURRENT_RECORD':
      return { ...state, currentRecordId: action.payload };
    
    case 'UPDATE_SETTINGS':
      return { 
        ...state, 
        settings: { ...state.settings, ...action.payload } 
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      toast(action.payload || "操作失败");
      return { ...state, error: action.payload, isLoading: false };
    
    default:
      return state;
  }
}

// 创建Context
interface DataContextType {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
  loadRecords: () => Promise<void>;
}

export type { DataContextType };

const DataContext = createContext<DataContextType | undefined>(undefined);

// 创建Provider组件
interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  
  const loadRecords = React.useCallback(async () => {
    try {
      dispatch({ type: 'FETCH_RECORDS' });
      const records = await fetchAllRecords();
      dispatch({ type: 'SET_RECORDS', payload: records });
      toast("加载成功");
    } catch (error) {
      toast("加载失败");
      console.error('Failed to load records:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load records' });
    }
  }, [dispatch]);

  // 在组件挂载时从后端API加载数据
  React.useEffect(() => {
    console.log('Initial loadRecords called');
    loadRecords();
  }, [loadRecords]); // 添加loadRecords作为依赖
  
  const value = {
    state: state,
    dispatch: dispatch,
    loadRecords: loadRecords
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

// 创建自定义Hook以便于使用Context
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}