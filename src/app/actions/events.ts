"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";

export async function createEvent(_prevState: unknown, formData: FormData) {
  const title = formData.get("title");
  const date = formData.get("date");
  const description = formData.get("description");
  const importance = formData.get("importance"); // 0-4
  const eventType = formData.get("eventType"); // 1, 0, -1
  const visibility = formData.get("visibility"); // 1, 0

  if (!title || !date) {
    return { error: "Title and Date are required." };
  }

  const token = await getSession();
  if (!token) return { error: "Not authenticated" };

  try {
    const res = await fetch(`${API_BASE_URL}/events/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        event_date: date,
        description: description || "",
        importance_score: Number(importance || 0),
        visibility: Number(visibility ?? 1),
        event_type: Number(eventType || 0),
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { error: err.detail || "Failed to create event" };
    }

    revalidatePath("/");
    return { success: true };
  } catch (_err) {
    return { error: "Something went wrong." };
  }
}

export async function deleteEvent(id: number) {
  const token = await getSession();
  if (!token) return { error: "Not authenticated" };

  try {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return { error: "Failed to delete" };

    revalidatePath("/");
    return { success: true };
  } catch (_err) {
    return { error: "Failed to delete" };
  }
}
