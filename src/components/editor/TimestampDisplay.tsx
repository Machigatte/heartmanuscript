"use client";

import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from 'date-fns';

interface TimestampDisplayProps {
  tooltipContent?: React.ReactNode;
}

export function TimestampDisplay({ tooltipContent }: TimestampDisplayProps) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = format(now, 'yyyy-MM-dd HH:mm:ss');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-gray-600 font-mono text-sm cursor-pointer">
            {formattedTime}
          </div>
        </TooltipTrigger>
        {tooltipContent && (
          <TooltipContent>
            {tooltipContent}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
