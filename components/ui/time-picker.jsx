"use client"

import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { Clock } from "lucide-react"
import { TimePickerInput } from "./time-picker-input"


export function TimePicker({ value, onChange }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <Clock className="mr-2 h-4 w-4" />
          {value || "Pick a time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-3">
          <TimePickerInput 
            value={value} 
            onChange={onChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}