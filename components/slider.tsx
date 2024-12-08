import { useState } from 'react'
import { Trash2, MoreVertical } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface SliderProps {
  id: number
  label: string
  value: number
  color: string
  onChange: (newValue: number) => void
  onLabelChange: (newLabel: string) => void
  onColorChange: (newColor: string) => void
  onDelete: () => void
}

export function Slider({ id, label, value, color, onChange, onLabelChange, onColorChange, onDelete }: SliderProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLabelChange(e.target.value)
  }

  const handleLabelClick = () => {
    setIsEditing(true)
  }

  const handleLabelBlur = () => {
    setIsEditing(false)
  }

  const handleLabelFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  return (
    <div id={`need-${id}`} className="flex items-center space-x-2">
      <div className="flex-grow">
        <div className="flex items-center shadow-xl">
          <button
            onClick={() => onChange(Math.max(0, value - 1))}
            className="text-2xl w-8 h-12 flex items-center justify-center bg-indigo-700 hover:bg-indigo-600 rounded-l-full transition-colors"
            style={{ backgroundColor: color, textShadow: `0 0 4px black` }}
          >
            -
          </button>
          <div className="flex-1 h-12 bg-gray-900 relative">
            <div
              className="h-full transition-all duration-300 ease-in-out"
              style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }}
            ></div>
            <div className="flex-grow absolute inset-0 flex items-center justify-center z-10">
              {isEditing ? (
                <input
                  type="text"
                  value={label}
                  onChange={handleLabelChange}
                  onBlur={handleLabelBlur}
                  onFocus={handleLabelFocus}
                  className="bg-indigo-700 text-cyan-100 p-1 bg-opacity-50 font-mono rounded text-center w-full max-w-[90%]"
                  autoFocus
                />
              ) : (
                <h2
                  className="flex-grow text-lg font-mono font-bold cursor-pointer text-center px-2 py-1"
                  style={{textShadow: `0 0 8px black` }}
                  onClick={handleLabelClick}
                >
                  {label}
                </h2>
              )}
            </div>
          </div>
          <button
            onClick={() => onChange(Math.min(5, value + 1))}
            className="text-2xl w-8 h-12 flex items-center justify-center bg-indigo-700 hover:bg-indigo-600 rounded-r-full transition-colors"
            style={{ backgroundColor: color, textShadow: `0 0 4px black` }}
          >
            +
          </button>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="text-cyan-300 hover:text-cyan-100 transition-colors pl-1"
            aria-label="More options"
          >
            <MoreVertical size={20} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-16 p-2 bg-gray-800 border-none">
          <div className="flex flex-col items-center space-y-2 pt-4">
            <label className="flex items-center border-none space-x-2 pb-2">
              <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-10 h-10 rounded-full border-none cursor-pointer bg-none"
              />
            </label>
            <button
              onClick={onDelete}
              className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors pb-4"
            >
              <Trash2 className="bg-gray-900 rounded-full p-2" size={42} />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

