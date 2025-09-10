"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, RecordData, AppSettings } from './types';

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
  error: null
};

// 定义操作类型
type ActionType = 
  | { type: 'SET_RECORDS'; payload: RecordData[] }
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
    case 'SET_RECORDS':
      return { ...state, records: action.payload };
    
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
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
}

// 创建Context
interface DataContextType {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// 创建Provider组件
interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  
  // 在组件挂载时从本地存储加载数据
  React.useEffect(() => {
    try {
      // 加载记录
      const savedRecords = localStorage.getItem('records');
      if (savedRecords) {
        dispatch({ type: 'SET_RECORDS', payload: JSON.parse(savedRecords) });
      }
      
      // 加载设置
      const savedSettings = localStorage.getItem('settings');
      if (savedSettings) {
        dispatch({ type: 'UPDATE_SETTINGS', payload: JSON.parse(savedSettings) });
      }
      
      // 加载当前选中的记录ID
      const currentId = localStorage.getItem('currentRecordId');
      if (currentId) {
        dispatch({ type: 'SET_CURRENT_RECORD', payload: currentId });
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
  }, []);
  
  // 当状态变化时保存到本地存储
  React.useEffect(() => {
    try {
      localStorage.setItem('records', JSON.stringify(state.records));
      localStorage.setItem('settings', JSON.stringify(state.settings));
      if (state.currentRecordId) {
        localStorage.setItem('currentRecordId', state.currentRecordId);
      } else {
        localStorage.removeItem('currentRecordId');
      }
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  }, [state.records, state.settings, state.currentRecordId]);
  
  return (
    <DataContext.Provider value={{ state, dispatch }}>
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