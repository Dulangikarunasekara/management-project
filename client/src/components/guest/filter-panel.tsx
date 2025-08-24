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
      <SheetContent side="right" className="w-[400px]">
        <SheetHeader className='shadow-md'>
          <SheetTitle>Apply Filters</SheetTitle>
          <SheetDescription>
            Currently guests can only be filtered by search and booking date(created date).
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 p-3">

          <div className="text-sm mb-2">Booking Date</div>
          <div className="bg-cell-bg text-text-primary p-2 rounded-sm">
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
            />
            <div className="text-xs text-searchbartext mt-1">
              Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
            </div>
          </div>


        </div>

        <div className="flex p-3 space-x-2">
          <Button onClick={onClear}>Clear</Button>
          <Button onClick={onFilter}> apply</Button>

        </div>
      </SheetContent>
    </Sheet>




  );
};

export default GuestFilterSheet;