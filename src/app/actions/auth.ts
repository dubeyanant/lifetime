"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";

export async function login(_prevState: unknown, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    return { error: "Please provide both username and password." };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { error: errorData.detail || "Invalid credentials." };
    }

    const data = await res.json();
    await createSession(data.access_token);
  } catch (_err) {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/");
}

export async function register(_prevState: unknown, formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const display_name = formData.get("display_name");

  if (!username || !email || !password) {
    return { error: "Please provide all required fields." };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        display_name: display_name || undefined,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { error: errorData.detail || "Registration failed." };
    }

    const data = await res.json();
    await createSession(data.access_token);
  } catch (_err) {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
