import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export async function linkFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const token = await getSession();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      redirect("/login?error=SessionExpired");
    }
    // For other unexpected errors, we also want to catch them if they are critical
    // The user asked for "if a session becomes invalid ... or something unexpected happens"
    // "Something unexpected" often implies 500s or network issues, but network issues throw earlier.
    // 500s will be caught here.
    if (res.status >= 500) {
      redirect("/login?error=ApiError");
    }

    // For 4xx errors that aren't auth (e.g. 400 validation), we probably should NOT redirect
    // and let the caller handle it or throw.
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}
