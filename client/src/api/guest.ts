import PocketBase from "pocketbase";
import type { addGuestSchema } from "@/schema/add-guest";
import type { updateGuestSchema } from "@/schema/update-guest";
import type { ViewAllGuestsFilterSchema } from "@/schema/view-all-guest-filters";

const pb = new PocketBase(import.meta.env.VITE_PB_URL || 'http://127.0.0.1:8090');
await pb.collection("users").authWithPassword("admin@gmail.com", "Admin123");

export interface Guest {
	id: string;
	email?: string;
	created: string;
	address?: string;
	phone?: string;
	last_name?: string;
	first_name?: string;
	date_of_birth?: Date;
}
export const fetchGuestList = async (data?: ViewAllGuestsFilterSchema) => {
	try {
		const filters: string[] = [];

		if (data?.bookingDate) {
			filters.push(`created~"${data.bookingDate}"`);
		}

		if (data?.searchText) {
			filters.push(`first_name~"${data.searchText}"`);
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
				firstName: r.first_name,
				lastName: r.last_name,
				address: r.address,
				phone: r.phone,
				dateOfBirth: r.date_of_birth ? new Date(r.date_of_birth) : undefined,
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
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			phone: data.phone,
			address: data.address,
			date_of_birth: data.date_of_birth,
		};
		const newGuest = await pb.collection("guests").create(record);
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
		if (input.first_name !== undefined) data.first_name = input.first_name;
		if (input.last_name !== undefined) data.last_name = input.last_name;
		if (input.email !== undefined) data.email = input.email;
		if (input.phone !== undefined) data.phone = input.phone;
		if (input.address !== undefined) data.address = input.address;
		if (input.date_of_birth !== undefined)
			data.date_of_birth = input.date_of_birth;

		const record = await pb.collection("guests").update(id, data);
		return record;
	} catch (error) {
		console.log("Error updating user ", error);
	}
};

export const getPaginatedGuestList = async (
	page: number,
	perPage: number,
	data?: ViewAllGuestsFilterSchema
) => {
	try {
		const filters: string[] = [];

		if (data?.bookingDate) {
			filters.push(`created~"${data.bookingDate}"`);
		}

		if (data?.searchText) {
			filters.push(`first_name="${data.searchText}"`);
		}

		const filterQuery = filters.length > 0 ? filters.join(" && ") : undefined;

		const records = await pb
			.collection("guests")
			.getList<Guest>(page, perPage, {
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
				firstName: r.first_name,
				lastName: r.last_name,
				phone: r.phone,
				address: r.address,
				dateOfBirth: r.date_of_birth,
			};
		});

		return mapped;
	} catch (error) {
		console.error("Error fetching guest list:", error);
		throw error;
	}
};
