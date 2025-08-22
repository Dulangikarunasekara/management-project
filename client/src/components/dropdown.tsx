import { type JSX } from "react";
import { DropdownMenuContent , DropdownMenuItem } from "./ui/dropdown-menu";

export interface IDropdownItem {
  id: number;
  text: string | JSX.Element;
  onClick: () => void;
}

interface IProps {
  dropdownItems: IDropdownItem[];
}

const Dropdown = (props: IProps) => {
  const { dropdownItems } = props;

  return (
    <DropdownMenuContent
      side="bottom"
      align="start"
      className="shadow-none border-none outline-none"
    >
      {dropdownItems.map((item) => {
        return (
          <DropdownMenuItem
            key={item.id}
            onClick={(event) => {
              event.stopPropagation();
              item.onClick();
            }}
            className="cursor-pointer"
          >
            {item.text}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuContent>
  );
};

export default Dropdown;
