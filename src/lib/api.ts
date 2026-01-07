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
    // We handle 401/403 specifically if needed, primarily letting components handle errors
    // or throwing to trigger error boundaries.
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}
