import type { LifeEvent } from "@/types";
import { EventCard } from "./EventCard";

interface TimelineProps {
  events: LifeEvent[];
}

export function Timeline({ events }: TimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="font-serif text-lg text-[#6B7280]">
          Your timeline is empty.
        </p>
        <p className="text-sm text-[#6B7280]">Add your first memory.</p>
      </div>
    );
  }

  // Sort events by date (descending for now, or user pref)
  // Let's go Ascending (Birth -> Now) or Descending (Now -> Birth)?
  // "Scroll of life" usually implies top = latest.
  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(b.event_date).getTime() - new Date(a.event_date).getTime(),
  );

  return (
    <div className="relative mx-auto max-w-3xl py-12 px-4">
      {/* Central Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gray-200" />

      <div className="space-y-0">
        {sortedEvents.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            position={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </div>
  );
}
