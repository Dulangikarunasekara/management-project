// guest.js - Updated with better error handling and debugging
import PocketBase from "pocketbase";
import { type ViewAllGuestsShema } from "../schema/view-all-guests";
import type { addGuestSchema } from "@/schema/add-guest";

const pb = new PocketBase(
	import.meta.env.VITE_PB_URL || "http://127.0.0.1:8090"
);

interface Guest {
	id: string;
	email?: string;
	created: string;
}
export const fetchGuestList = async (data?: ViewAllGuestsShema) => {
	try {
		const filters: string[] = [];

		if (data?.bookingDate) {
			filters.push(`created~"${data.bookingDate}"`);
		}

		if (data?.searchText) {
			filters.push(`first_name="${data.searchText}"`);
		}

		const filterQuery = filters.length > 0 ? filters.join(" && ") : undefined;

		const records = await pb.collection("guests").getFullList<Guest>({
			filter: filterQuery,
		});

		if (!records || records.length === 0) {
			console.log("No records found matching the filter");
			return [];
		}

		const mapped = records.map((r) => {
			return {
				id: r.id,
				email: r.email,
				created: r.created,
			};
		});

		return mapped;
	} catch (error) {
		console.error("Error fetching guest list:", error);
		throw error;
	}
};

export const addGuest = async (data: addGuestSchema) => {
	try {
		const record = {
			first_name: data.firstName,
			last_name: data.lastName,
			email: data.email,
			phone: data.phoneNumer,
			address: data.address,
			date_of_birth: data.dateOfBirth,
		};
		return await pb.collection("guests").create(record);
	} catch (error) {
		console.log("Error creating user ", error);
	}
};


