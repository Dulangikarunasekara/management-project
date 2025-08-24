import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { setSearch } from "@/state/guest-slice";

interface IProps {
  value: string;
  placeholder?: string;
}

const Search = (props: IProps) => {
  const { value, placeholder } = props;
  const [searchValue, setSearchValue] = useState(value);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchValue(value)
  }, [value])

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = searchValue.trim();

      dispatch(setSearch(trimmed))
    }, 1000);

    return () => clearTimeout(handler)

  }, [searchValue]);

  return (
    <div className="flex justify-between items-center border border-input px-2 rounded-lg h-[40px] bg-white">
      <div className="flex-grow">
        <Input
          placeholder={placeholder}
          className="border-none outline-none focus-visible:ring-0 shadow-none px-0"
          value={searchValue}
          onChange={(event) => {
            // if (event.target.value.trim() === "") {
            //   setValue("");
            // }
            setSearchValue(event.target.value);
          }}
        />
      </div>

    </div>
  )

}

export default Search;