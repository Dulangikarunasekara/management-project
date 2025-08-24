import PocketBase from "pocketbase";
import { type ViewAllGuestsShema } from "../schema/view-all-guests";
import type { addGuestSchema } from "@/schema/add-guest";
import type { updateGuestSchema } from "@/schema/update-guest";

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export interface Guest {
	id: string;
	email?: string;
	created: string;
	address?:string;
	phone?:string;
	lastName?:string,
	firstName?:string;
	dateOfBirth?:Date
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
		const newGuest= await pb.collection("guests").create(record);
		return newGuest;
	} catch (error) {
		console.log("Error creating user ", error);
		throw error;
	}
};

export const viewGuest = async (id: string) => {
	try {
		const record = await pb.collection("guests").getOne(id);
		const mapped = {
			id: record.id,
			email: record.email,
			created: record.created,
			firstName: record.first_name,
			lastName: record.last_name,
			phone: record.phone,
			address: record.address,
			dateOfBirth: record.date_of_birth,
		};

		return mapped;
	} catch (error) {
		console.log("Error fetching user ", error);
	}
};

export const updateGuest = async (
	input: Partial<updateGuestSchema>,
	id: string
) => {
	try {
		const data: Record<string, any> = {};

		if (input.firstName !== undefined) data.first_name = input.firstName;
		if (input.lastName !== undefined) data.last_name = input.lastName;
		if (input.email !== undefined) data.email = input.email;
		if (input.phoneNumer !== undefined) data.phone = input.phoneNumer;
		if (input.address !== undefined) data.address = input.address;
		if (input.dateOfBirth !== undefined) data.date_of_birth = input.dateOfBirth;

		const record = await pb.collection("guests").update(id, data);
		return record;
	} catch (error) {
		console.log("Error updating user ", error);
	}
};


export const getPaginatedGuestList = async ( page:number  , perPage:number , data?: ViewAllGuestsShema ) => {
	try {
		const filters: string[] = [];

		if (data?.bookingDate) {
			filters.push(`created~"${data.bookingDate}"`);
		}

		if (data?.searchText) {
			filters.push(`first_name="${data.searchText}"`);
		}

		const filterQuery = filters.length > 0 ? filters.join(" && ") : undefined;

		const records = await pb.collection("guests").getList<Guest>(page , perPage ,{
			filter: filterQuery,
		});

		if (!records || records.items.length === 0) {
			console.log("No records found matching the filter");
			return [];
		}

		const mapped = records.items.map((r) => {
			return {
				id: r.id,
				email: r.email,
				created: r.created,
				firstName: r.firstName,
				lastName: r.lastName,
				phone:r.phone,
				address:r.address,
				dateOfBirth:r.dateOfBirth
			};
		});

		return mapped;
	} catch (error) {
		console.error("Error fetching guest list:", error);
		throw error;
	}
};