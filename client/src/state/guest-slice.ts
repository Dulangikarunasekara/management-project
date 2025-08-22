import { createSlice } from "@reduxjs/toolkit";
import {type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type GuestFilters = { 
    bookingDate:Date|null;
    numberofOfFiltersApplied:number;
}

type GuestSliceState = {
    search:string;
    filters:GuestFilters;
    
}

const initialFilterStates: GuestFilters = {
    bookingDate:null,
    numberofOfFiltersApplied:0
}

const initialClientSate: GuestSliceState= {
    search:"",
    filters:{ ...initialFilterStates},
}


export const guestSlice = createSlice({
    name:"guest",
    initialState: { ...initialClientSate},
    reducers:{
        setSearch: (state , action:PayloadAction<string>) =>{
            state.search = action.payload;
        },
        setGuestFilters: (state , action:PayloadAction<GuestFilters>) =>{
            state.filters = action.payload;
        },
        resetGuestFilters:(state) => {
            state.filters = {...initialFilterStates}
        },
        //why no reset search?
    }
});



const { actions , reducer} = guestSlice;
export const {
    setSearch,
    setGuestFilters,
    resetGuestFilters,

} = actions;

export default reducer;

export const selectSearch = (state: RootState) => state.search;
export const selectGuestFilters = (state: RootState) => state.filters;



