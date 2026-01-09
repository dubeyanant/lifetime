import Link from "next/link";
import { ProfileActions } from "@/components/profile/profile-actions";
import { linkFetch } from "@/lib/api";
import type { User } from "@/types";
import { logout } from "../actions/auth";

export default async function ProfilePage() {
  let user: User | null = null;
  try {
    user = await linkFetch<User>("/users/me");
  } catch (err) {
    // Redirect handled by linkFetch or middleware usually,
    // but if it fails here we might want to show error or let error boundary handle it
    console.error("Failed to fetch user profile", err);
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF7] text-[#6B7280]">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-[#FAFAF7]/80 px-6 py-4 backdrop-blur-md">
        <Link
          href="/"
          className="font-serif text-xl font-medium tracking-tight text-[#1F2933]"
        >
          Lifetime
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-[#6B7280] hover:text-[#1F2933]"
          >
            Back to Timeline
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-[#6B7280] hover:text-[#1F2933]"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-2xl px-4 py-12">
        <div className="mb-12">
          <h1 className="font-serif text-3xl text-[#1F2933]">Your Profile</h1>
          <p className="mt-2 text-[#6B7280]">
            Manage your personal information and account settings.
          </p>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-8 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FAFAF7] text-2xl font-serif text-[#1F2933]">
                {user.display_name?.[0] || user.username[0].toUpperCase()}
              </div>
              <div>
                <h2 className="font-serif text-xl text-[#1F2933]">
                  {user.display_name || user.username}
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Member since {new Date(user.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-[#6B7280]">{user.email}</p>
              </div>
            </div>
          </div>

          <ProfileActions user={user} />
        </div>
      </main>
    </div>
  );
}
