import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { NoteType, SearchNotesParams } from "@/api/types";
import { Input } from "../ui/input";

interface SearchPopoverProps {
  onSearch: (params: SearchNotesParams) => void;
}

export function SearchPopover({ onSearch }: SearchPopoverProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState<NoteType | 0>(0);
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const [to, setTo] = useState<Date | undefined>(undefined);

  const handleSearchNotes = async () => {
    // 构建参数时过滤掉未设置的字段
    const params: SearchNotesParams = {
      ...(from && { from }),
      ...(to && { to }),
      ...(type !== 0 && { type }),
      ...(keyword && { keyword }),
    };

    try {
      onSearch(params);
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
                value={type.toString()}
                onValueChange={(value) => { setType(Number(value) as NoteType) }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择记录类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">未选择</SelectItem>
                  <SelectItem value="1">工作周报</SelectItem>
                  <SelectItem value="2">科研日记</SelectItem>
                  <SelectItem value="3">随想</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="font-medium">关键字</label>
              <Input
                type="text"
                placeholder="输入搜索关键字"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
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
                    {from ? from.toLocaleDateString() : "请选择日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={from}
                    onSelect={setFrom}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className="font-medium">终止时间</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {to ? to.toLocaleDateString() : "请选择日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={to}
                    onSelect={setTo}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleSearchNotes}
          >
            查询
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}