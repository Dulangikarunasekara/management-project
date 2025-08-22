import { useEffect, useState } from "react";
import { Input } from "./ui/input";

interface IProps {
    value:string;
    placeholder?:string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search = (props:IProps) =>{
    const {value , placeholder , setValue} = props;
    const [ search , setSearch ] = useState(value);

    useEffect(() =>{ 
        setSearch(value)
    }, [value])

    useEffect(() => { 
        const handler = setTimeout(() =>{
            setValue(search.trim())
        }, 1000);

        return () =>  clearTimeout(handler)
        
    }, [search , setValue]);

    return (
        <div className="flex justify-between items-center border border-input px-2 rounded-lg h-[40px] bg-white">
      <div className="flex-grow">
        <Input
          placeholder={placeholder}
          className="border-none outline-none focus-visible:ring-0 shadow-none px-0"
          value={search}
          onChange={(event) => {
            if (event.target.value.trim() === "") {
              setValue("");
            }
            setSearch(event.target.value);
          }}
        />
      </div>
      {/* <div className="w-auto ps-2">
        <MaterialIcon icon="search" color="var(--primary)" />
      </div> */}
    </div>
    )

}

export default Search;