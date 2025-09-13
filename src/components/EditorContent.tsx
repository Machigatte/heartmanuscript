import { useRecordEditor } from "../containers/RecordEditorContext";

export function EditorContent() {
  const { record, setRecord } = useRecordEditor();
  const type = record.noteType;
  const isArchived = !!record.archivedAt;
  // const date = record.date; // 如需用date可解构
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {/* 编辑展示区 */}
      <div className="bg-white shadow rounded p-4">
        {type === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold">工作安排</h3>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              value={record.head} 
              onChange={!isArchived ? (e) => setRecord(r => ({ ...r, head: e.target.value })) : undefined}
              readOnly={isArchived}
            ></textarea>
            <h3 className="font-semibold">资料</h3>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              value={record.body} 
              onChange={!isArchived ? (e) => setRecord(r => ({ ...r, body: e.target.value })) : undefined}
              readOnly={isArchived}
            ></textarea>
            <h3 className="font-semibold">结果</h3>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              value={record.tail} 
              onChange={!isArchived ? (e) => setRecord(r => ({ ...r, tail: e.target.value })) : undefined}
              readOnly={isArchived}
            ></textarea>
            {record.summary && (
              <>
                <h3 className="font-semibold">分析结果</h3>
                <div className="w-full border rounded p-2 bg-gray-50">
                  {record.summary}
                </div>
              </>
            )}
          </div>
        )}
        {type === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold">实验安排</h3>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              value={record.head} 
              onChange={!isArchived ? (e) => setRecord(r => ({ ...r, head: e.target.value })) : undefined}
              readOnly={isArchived}
            ></textarea>
            <h3 className="font-semibold">代码</h3>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              value={record.body} 
              onChange={!isArchived ? (e) => setRecord(r => ({ ...r, body: e.target.value })) : undefined}
              readOnly={isArchived}
            ></textarea>
            <h3 className="font-semibold">结果</h3>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              value={record.tail} 
              onChange={!isArchived ? (e) => setRecord(r => ({ ...r, tail: e.target.value })) : undefined}
              readOnly={isArchived}
            ></textarea>
            {record.summary && (
              <>
                <h3 className="font-semibold">分析结果</h3>
                <div className="w-full border rounded p-2 bg-gray-50">
                  {record.summary}
                </div>
              </>
            )}
          </div>
        )}
        {type !== 1 && type !== 2 && (
          <div className="space-y-4">
            <p>其他类型的内容</p>
          </div>
        )}
      </div>
    </div>
  );
}