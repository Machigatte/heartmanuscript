import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query'; // 使用 react-query 的 client 来更新缓存
import { Note } from '@/types';

export const useSummarizeStream = (note: Note) => {
    const queryClient = useQueryClient();
    
    // 状态管理：实时分析文本、加载状态、错误状态
    const [summary, setSummary] = useState<string>('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startStreaming = () => {
        // 确保不会重复启动
        if (isStreaming) return;
        
        setIsStreaming(true);
        setSummary('');
        setError(null);

        // 构造后端的 SSE URL
        const url = `/notes/${note.id}/summary-stream`; 
        
        // 1. 使用 EventSource API 连接 SSE
        const eventSource = new EventSource(url);

        // 2. 监听消息事件 (默认事件名 'message')
        eventSource.onmessage = (event) => {
            // 后端返回的是 Flux<String>，每个 event.data 就是一个字符串片段
            const chunk = event.data;
            setSummary(prev => prev + chunk); // 实时追加文本
        };

        // 3. 监听流关闭事件 (流结束)
        eventSource.onopen = () => {
            console.log('SSE 连接已打开');
        };

        // 4. 监听错误事件
        eventSource.onerror = (err) => {
            console.error('SSE 错误:', err);
            setError('分析流中断或失败。');
            setIsStreaming(false); // 停止流式状态
            eventSource.close();   // 关闭连接
            
            // 失败后尝试重新获取完整的 Note 数据
            queryClient.invalidateQueries({ queryKey: ['note', note.id.toString()] });
        };

        // 5. 监听流关闭（当服务器发送完毕后会关闭连接）
        // 尽管没有特定的 'onclose'，但当流完成且服务器关闭连接后，onmessage不会再触发，
        // 且可以通过检查 readyState 来确认。通常服务器在发送完所有数据后会自动断开。
        // 我们可以在 onmessage 接收到表示结束的特定信号，或依赖服务器的自动断开。
        // 这里假设当服务器关闭连接时，我们可以认为流结束。
        
        const handleClose = () => {
            console.log('SSE 连接已关闭，分析完成。');
            setIsStreaming(false);
            eventSource.close();
            
            // 重要：流结束后，后端数据库已经保存了最终结果。
            // 此时应该**刷新 react-query 缓存**，以便获取到带 Summary 字段的完整 Note 对象
            queryClient.invalidateQueries({ queryKey: ['note', note.id.toString()] });
        };

        // 实际应用中，你可能需要一个计时器或特定的服务器信号来确认流已完成。
        // 最简单的方法是依赖服务器在完成时自动关闭连接，并监听 readyState 变化。
        // 简单示例中，我们假设后端关闭连接后，我们手动关闭 EventSource 实例。
        eventSource.addEventListener('end', handleClose); // 假设后端发送了 'end' 事件

        return () => {
            // 组件卸载时或重新调用 startStreaming 时，确保清理旧连接
            eventSource.close();
            setIsStreaming(false);
        };
    }

    return { 
        summary, 
        isStreaming, 
        error, 
        startStreaming 
    };
};