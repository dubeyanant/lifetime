"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { linkFetch } from "@/lib/api";
import { deleteSession } from "@/lib/auth";

export async function updateProfile(
  _state: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: string }> {
  const displayName = formData.get("display_name") as string | null;
  const visibility = formData.get("account_visibility");
  const password = formData.get("password") as string | null;
  const currentPassword = formData.get("current_password") as string | null;

  const payload: Record<string, unknown> = {};

  if (displayName !== null) payload.display_name = displayName;
  if (visibility !== null)
    payload.account_visibility = Number.parseInt(visibility as string, 10);

  if (password && currentPassword) {
    payload.password = password;
    payload.current_password = currentPassword;
  } else if (password) {
    return { error: "Current password is required to set a new password" };
  }

  try {
    await linkFetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    revalidatePath("/profile");
    return { success: "Profile updated successfully" };
  } catch (_err) {
    // Attempt to parse API error message if possible, otherwise generic
    // linkFetch throws standard Error with message, but we might want more detail if we improved linkFetch
    return { error: "Failed to update profile" };
  }
}

export async function deleteAccount() {
  try {
    await linkFetch("/users/me", {
      method: "DELETE",
    });
    await deleteSession();
  } catch (_err) {
    return { error: "Failed to delete account" };
  }
  redirect("/login");
}
