import { Room } from "./types";

const API_URL = "http://127.0.0.1:8000/api/rooms/";

export async function getRooms(): Promise<Room[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }

  const data = await response.json();

  return data.map((room: any) => ({
    ...room,
    image: `http://127.0.0.1:8000${room.image}`
  }));
}