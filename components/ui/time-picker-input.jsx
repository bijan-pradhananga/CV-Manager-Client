"use client"

import { Input } from "./input"


export function TimePickerInput({ value, onChange }) {
  return (
    <Input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}