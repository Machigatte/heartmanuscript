import client from '@/api/client';
import { SearchNotesParams } from '@/api/types';
import { NoteSummary } from '@/models/NoteSummary';
// 只需要 useQueryClient 来手动管理缓存，或者更简单地用 useState
import { useState, useCallback, useMemo } from 'react'; 


/**
 * 搜索笔记的 API 调用函数
 */
const searchNotesApi = async (params: SearchNotesParams): Promise<NoteSummary[]> => {
  // 确保至少有一个搜索条件，避免无效请求
  if (!params.keyword && !params.from && !params.to && !params.type) {
    return []; 
  }
  
  return await client.searchNotes(params); 
};

/**
 * 💡 自定义 Hook：用于管理搜索状态、结果和触发搜索
 */
export function useSearchNotes() {
  const [currentParams, setCurrentParams] = useState<SearchNotesParams | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<NoteSummary[] | undefined>(undefined);
  const [error, setError] = useState<unknown>(null);
  
  // 用于手动触发搜索的函数
  const searchNotes = useCallback(async (params: SearchNotesParams) => {
    // 只有当参数不为空或与当前参数不同时才执行搜索
    const hasQuery = !!params.keyword || !!params.from || !!params.to || !!params.type;

    if (!hasQuery) {
        // 如果查询为空，清空结果并返回
        setSearchResults(undefined);
        setCurrentParams(undefined);
        return;
    }

    setIsSearching(true);
    setError(null);
    setCurrentParams(params);
    
    try {
      const data = await searchNotesApi(params);
      setSearchResults(data);
    } catch (err) {
      setError(err);
      setSearchResults(undefined);
    } finally {
      setIsSearching(false);
    }
  }, []);
  
  // 用于重置搜索状态的函数
  const resetSearch = useCallback(() => {
    setCurrentParams(undefined);
    setSearchResults(undefined);
    setIsSearching(false);
    setError(null);
  }, []);

  // 返回给组件使用的数据和操作
  return useMemo(() => ({
    data: searchResults,
    isPending: isSearching,
    error,
    searchNotes,
    reset: resetSearch,
    // 判断是否已经执行过搜索，用于 UI 渲染判断
    isFetched: currentParams !== undefined, 
  }), [searchResults, isSearching, error, searchNotes, resetSearch, currentParams]);
}
