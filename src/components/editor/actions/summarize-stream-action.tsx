import { Hotkey } from "@/components/common/hotkey";
import { useEditorContext } from "../editor-context";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useUser } from "@/hooks/use-user";
import { useQueryClient } from "@tanstack/react-query";
import { fetchEventSource } from "@microsoft/fetch-event-source"
import { useState } from "react";
import { config } from "@/config";

export const SummarizeStreamAction: React.FC = () => {
  const { currentNote, isDirty, isDraft, isArchived, setRealtimeSummary } = useEditorContext();
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = () => {
    if (disabled || !currentNote?.id) return;
    if (!user) return;

    setIsSummarizing(true);

    const token = user.access_token;

    const baseUrl = config.apiUrl;

    fetchEventSource(`${baseUrl}/notes/${currentNote.id}/summarize-stream`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      onmessage(event) {
        setRealtimeSummary((prev) => prev + event.data);
      },
      onerror(err) {
        console.error("SSE Error:", err);
        queryClient.invalidateQueries({ queryKey: ['note', currentNote.id.toString()] });
        setRealtimeSummary("");
        setIsSummarizing(false);
      },
      onclose() {
        queryClient.invalidateQueries({ queryKey: ['note', currentNote.id.toString()] });
        setRealtimeSummary("");
        setIsSummarizing(false);
      }
    });
  };

  const disabled = isDraft || isDirty || isArchived || isSummarizing;

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={handleSummarize} disabled={disabled}>
          {isSummarizing ? "分析中" : "分析"}
        </Button>
      </TooltipTrigger>
      <TooltipContent >
        Alt + A
      </TooltipContent>
      <Hotkey
        shortcuts={[
          {
            keyTrigger: "a", altKey: true
          }
        ]}
        onTrigger={handleSummarize}
        showLabel={false}
      />
    </Tooltip>
  );
};
