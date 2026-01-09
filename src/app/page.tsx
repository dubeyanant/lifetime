import { clsx } from "clsx";
import Link from "next/link";
import { CreateEventForm } from "@/components/forms/CreateEventForm";
import { Timeline } from "@/components/timeline/Timeline";
import { linkFetch } from "@/lib/api";
import type { LifeEvent } from "@/types";
import { logout } from "./actions/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const isWriting = mode === "write";

  let events: LifeEvent[] = [];
  try {
    events = await linkFetch<LifeEvent[]>("/events/list");
  } catch (err: unknown) {
    if ((err as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.error("Failed to fetch events", err);
    // In a real app, handle error UI
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-[#FAFAF7]/80 px-6 py-4 backdrop-blur-md">
        <h1 className="font-serif text-xl font-medium tracking-tight text-[#1F2933]">
          Lifetime
        </h1>
        <div className="flex items-center gap-4">
          <Link
            href={isWriting ? "/" : "/?mode=write"}
            className={clsx(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border",
              isWriting
                ? "bg-transparent border-[#B45309] text-[#B45309]"
                : "bg-[#1F2933] border-transparent text-white hover:bg-black",
            )}
          >
            {isWriting ? "Close" : "Add Memory"}
          </Link>

          <Link
            href="/profile"
            className="text-sm text-[#6B7280] hover:text-[#1F2933]"
          >
            Profile
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
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {isWriting ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mx-auto max-w-2xl pt-12">
              <h2 className="mb-8 font-serif text-2xl text-[#1F2933]">
                Capture a moment
              </h2>
              <CreateEventForm />

              <div className="mt-12 text-center">
                <Link
                  href="/"
                  className="text-sm text-[#6B7280] hover:underline"
                >
                  Cancel and return to timeline
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            <div className="mb-12 text-center">
              <p className="font-serif text-[#6B7280] italic">
                {events.length} {events.length === 1 ? "memory" : "memories"}{" "}
                collected
              </p>
            </div>
            <Timeline events={events} />
          </div>
        )}
      </main>
    </div>
  );
}
