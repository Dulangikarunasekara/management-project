import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { selectGuestFilters, setGuestFilters, resetGuestFilters } from "@/state/guest-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "../date-picker";
import { Button } from "../ui/button";


type IFilterPanel = {
  show: boolean,
  onClose?: () => void;
  onFilter?: () => void;
  onClear?: () => void;
}
interface IProps extends IFilterPanel {
  show: boolean;
}

const GuestFilterSheet = (props: IProps) => {
  const { show, onClose, ...rest } = props;
  const dispatch = useDispatch();
  const guestFilters = useSelector(selectGuestFilters);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  useEffect(() => {
    const filterDate = guestFilters.bookingDate 
      ? new Date(guestFilters.bookingDate)
      : null;
    
    setSelectedDate(filterDate);
  }, [guestFilters.bookingDate]);



  const getNoOfFiltersApplied = () => {
    let noOfFiltersApplied = 0;

    if (selectedDate) {
      noOfFiltersApplied++;
    }

    return noOfFiltersApplied;
  };

  const onFilter = () => {
    dispatch(
      setGuestFilters({
        bookingDate: selectedDate ? selectedDate : null,
        numberofOfFiltersApplied: getNoOfFiltersApplied()
      })
    );

    if (onClose) onClose();
  };

  const onClear = () => {
    setSelectedDate(null)
    dispatch(resetGuestFilters());
    if (onClose) onClose();
  };

  return (
    <Sheet open={show} onOpenChange={(open) => {
      if (!open && onClose) onClose();
    }}>      
    <SheetTrigger asChild>
        <button className="btn">Filters</button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Apply filters to narrow down the guest list.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          <div className="text-sm mb-2">Booking Date</div>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
          />
           <div className="text-xs text-gray-500 mt-1">
            Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button className="btn btn-outline" onClick={onClear}>
            Clear
          </button>
          <Button className="pt-10" onClick={onFilter}> apply</Button>

        </div>
      </SheetContent>
    </Sheet>




  );
};

export default GuestFilterSheet;