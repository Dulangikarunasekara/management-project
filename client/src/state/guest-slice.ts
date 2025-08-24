import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import {type Guest } from "@/api/guest";

type GuestFilters = {
	bookingDate: Date | null;
	numberofOfFiltersApplied: number;
};

type GuestSliceState = {
	search: string;
	filters: GuestFilters;
	guests: Guest[];
};

const initialFilterStates: GuestFilters = {
	bookingDate: null,
	numberofOfFiltersApplied: 0,
};

const initialClientSate: GuestSliceState = {
	search: "",
	filters: { ...initialFilterStates },
	guests: [],
};

export const guestSlice = createSlice({
	name: "guest",
	initialState: { ...initialClientSate },
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setGuestFilters: (state, action: PayloadAction<GuestFilters>) => {
			state.filters = action.payload;
		},
		resetGuestFilters: (state) => {
			state.filters = { ...initialFilterStates };
		},
		setGuests: (state, action: PayloadAction<Guest[]>) => {
			state.guests = action.payload; 
		},
		addGuestToState: (state, action: PayloadAction<Guest>) => {
			state.guests.push(action.payload);
		},
		removeGuest: (state, action: PayloadAction<string>) => {
			state.guests = state.guests.filter((g) => g.id !== action.payload);
		},

    
	},
});

const { actions, reducer } = guestSlice;
export const { setSearch, setGuestFilters, resetGuestFilters , setGuests , addGuestToState , removeGuest  } = actions;

export default reducer;

export const selectSearch = (state: RootState) => state.search;
export const selectGuestFilters = (state: RootState) => state.filters;
export const selectGuests = (state:RootState) => state.guests;
