"use server";

import { revalidatePath } from "next/cache";
import { linkFetch } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";
import type { LifeEvent } from "@/types";

export async function createEvent(_prevState: unknown, formData: FormData) {
  const title = formData.get("title");
  const date = formData.get("date");
  const description = formData.get("description");
  const importance = formData.get("importance"); // 0-4
  const eventType = formData.get("eventType"); // 1, 0, -1
  const visibility = formData.get("visibility"); // 1, 0
  const tagsRaw = formData.get("tags");
  let tags: string[] = [];
  if (tagsRaw && typeof tagsRaw === "string") {
    try {
      tags = JSON.parse(tagsRaw);
    } catch (_e) {
      // ignore
    }
  }

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
        tags,
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

export async function getEvent(id: number): Promise<LifeEvent | null> {
  try {
    return await linkFetch<LifeEvent>(`/events/${id}`);
  } catch (e: unknown) {
    if ((e as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
      throw e;
    }
    console.error("Failed to fetch event", e);
    return null;
  }
}

export async function updateEvent(
  id: number,
  _prevState: unknown,
  formData: FormData,
) {
  const title = formData.get("title");
  const date = formData.get("date");
  const description = formData.get("description");
  const importance = formData.get("importance");
  const eventType = formData.get("eventType");
  const visibility = formData.get("visibility");
  const tagsRaw = formData.get("tags");
  let tags: string[] = [];
  if (tagsRaw && typeof tagsRaw === "string") {
    try {
      tags = JSON.parse(tagsRaw);
    } catch (_e) {
      // ignore
    }
  }

  if (!title) {
    return { error: "Title is required." };
  }

  const token = await getSession();
  if (!token) return { error: "Not authenticated" };

  try {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PATCH",
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
        tags,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { error: err.detail || "Failed to update event" };
    }

    revalidatePath("/");
    revalidatePath(`/events/${id}`);
    return { success: true };
  } catch (_err) {
    return { error: "Something went wrong." };
  }
}
