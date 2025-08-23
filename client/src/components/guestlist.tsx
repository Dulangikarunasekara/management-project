import { useEffect, useState } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_PB_URL || "http://127.0.0.1:8090");

interface Guest {
  id: string;
  email?: string;
  created: string;
}

const Guests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const records = await pb.collection("guests").getFullList<Guest>({
          sort: "-created",
        });
        setGuests(records);
      } catch (err) {
        console.error("Error fetching guests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  if (loading) return <p>Loading guests...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Guest List</h2>
      {guests.length === 0 ? (
        <p>No guests found.</p>
      ) : (
        <ul className="space-y-2">
          {guests.map((guest) => (
            <li key={guest.id} className="border p-2 rounded">
              {guest.email && <p><strong>Email:</strong> {guest.email}</p>}
              <p className="text-sm text-gray-500">Joined: {new Date(guest.created).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Guests;
