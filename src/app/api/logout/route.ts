import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get("error");

  await deleteSession();

  if (error) {
    redirect(`/login?error=${error}`);
  } else {
    redirect("/login");
  }
}
