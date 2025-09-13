import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface SearchPopoverProps {
  onSearch: (params: {
    from?: Date;
    to?: Date;
    noteType?: string;
    keyword?: string;
  }) => Promise<void>;
}

export function SearchPopover({ onSearch }: SearchPopoverProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: undefined as Date | undefined,
    to: undefined as Date | undefined,
    noteType: "",
    keyword: ""
  });

  const handleSearchRecords = async () => {
    try {
      await onSearch(searchParams);
      setSearchOpen(false);
      toast("查询成功");
    } catch (error) {
      console.error('查询失败:', error);
      toast("查询失败");
    }
  };

  return (
    <Popover open={searchOpen} onOpenChange={setSearchOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-4">
          {/* 第一行：记录类型 + 关键字 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium">记录类型</label>
              <Select 
                value={searchParams.noteType}
                onValueChange={(value) => setSearchParams({...searchParams, noteType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择记录类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">工作周报</SelectItem>
                  <SelectItem value="2">科研日记</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="font-medium">关键字</label>
              <input
                type="text"
                placeholder="输入搜索关键字"
                value={searchParams.keyword}
                onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          {/* 第二行：时间选择 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium">起始时间</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {searchParams.from?.toLocaleDateString() || "选择时间"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={searchParams.from}
                    onSelect={(date) => setSearchParams({...searchParams, from: date})}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className="font-medium">终止时间</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {searchParams.to?.toLocaleDateString() || "选择时间"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={searchParams.to}
                    onSelect={(date) => setSearchParams({...searchParams, to: date})}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleSearchRecords}
          >
            查询
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}