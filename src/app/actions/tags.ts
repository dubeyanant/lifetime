"use server";

import { linkFetch } from "@/lib/api";
import type { TagResponse } from "@/types";

export async function getUserTags(): Promise<TagResponse[]> {
  try {
    return await linkFetch<TagResponse[]>("/tags/");
  } catch (e) {
    console.error("Failed to fetch tags", e);
    return [];
  }
}
