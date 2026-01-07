import { logout } from "@/app/actions/auth";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 font-serif">
      <h1 className="text-4xl">Your Lifetime</h1>
      <p className="text-[#6B7280]">
        Welcome back. Your session token is present.
      </p>
      <div className="p-4 bg-white rounded shadow-sm border border-gray-100 max-w-lg break-all text-xs text-gray-400 font-mono">
        Token: {session?.slice(0, 20)}...
      </div>

      <form action={logout}>
        <button
          type="submit"
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
