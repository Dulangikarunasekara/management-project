"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "./ui/calender"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface IProps {
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
}

const DatePicker = ({ selected, onChange}: IProps) => {

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date ?? null); 

  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!selected}
          className="data-[empty=true]:text-muted-foreground w-[250px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={selected ?? undefined} onSelect={handleSelect}  />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker;
