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
    }, 500);

    return () => clearTimeout(handler)

  }, [searchValue]);

  return (
    <div id="search-bar" className="flex justify-between space-x-2 
    items-center border border-input px-4 rounded-full h-14  bg-searchbar text-searchbartext" >
      <div className="w-auto">
        <span className="material-symbols-outlined  text-black">
          search
        </span>
      </div>
      <div className="flex-grow">
        <Input
          placeholder={placeholder}
          className="border-none outline-none focus-visible:ring-0 
          shadow-none px-0"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
      </div>


    </div>
  )

}

export default Search;