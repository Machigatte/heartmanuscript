import * as React from "react"
import { usePlatformKeys } from "@/hooks/use-platform-keys"

interface Shortcut {
  /** 触发键，例如 "n" */
  keyTrigger: string
  /** 是否需要 Ctrl/Cmd */
  ctrlKey?: boolean
  /** 是否需要 Shift */
  shiftKey?: boolean
  /** 是否需要 Alt/Option */
  altKey?: boolean
}

interface HotkeyProps {
  /** 快捷键组合数组 */
  shortcuts: Shortcut[]
  /** 回调函数 */
  onTrigger: () => void
  /** 是否显示标签 */
  showLabel?: boolean
}

export const Hotkey: React.FC<HotkeyProps> = ({ shortcuts, onTrigger, showLabel = true }) => {
  const platformKeys = usePlatformKeys()

  // 自动生成 label
  const generateLabel = (sc: Shortcut) => {
    const parts: string[] = []
    if (sc.ctrlKey) parts.push(platformKeys.label.mod)
    if (sc.altKey) parts.push(platformKeys.label.alt)
    if (sc.shiftKey) parts.push(platformKeys.label.shift)
    parts.push(sc.keyTrigger.toUpperCase())
    return parts.join(" + ")
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      for (const sc of shortcuts) {
        const metaKey = e.metaKey || e.ctrlKey
        if (
          e.key.toLowerCase() === sc.keyTrigger.toLowerCase() &&
          (!sc.ctrlKey || metaKey) &&
          (!sc.shiftKey || e.shiftKey) &&
          (!sc.altKey || e.altKey)
        ) {
          e.preventDefault()
          onTrigger()
          break
        }
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [shortcuts, onTrigger])

  if (!showLabel) return null

  return (
    <div className="flex items-center ml-auto gap-1">
      {shortcuts.map((sc, index) => (
        <kbd
          key={index}
          className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none"
        >
          <span className="text-xs">{generateLabel(sc)}</span>
        </kbd>
      ))}
    </div>
  )
}
