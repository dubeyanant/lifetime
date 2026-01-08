"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";
import { loginSchema, registerSchema } from "@/lib/schemas";

export async function login(_prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  const { username, password } = result.data;

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
  const result = registerSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  const { username, email, password, display_name } = result.data;

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
