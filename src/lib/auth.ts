import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "./constants";

export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}

export async function createSession(token: string) {
  const cookieStore = await cookies();
  // Set cookie for 30 minutes to match backend token expiry
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 60, // 30 minutes
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
