import { clsx } from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import type { LifeEvent } from "@/types";

interface EventCardProps {
  event: LifeEvent;
  position: "left" | "right";
}

export function EventCard({ event, position }: EventCardProps) {
  // Importance Score Mapping: 0=Minor, 1=Normal, 2=Major, 3=Life-changing
  const isMinor = event.importance_score === 0;

  return (
    <div
      className={clsx(
        "relative flex w-[45%] flex-col",
        position === "left"
          ? "mr-auto items-end text-right"
          : "ml-auto items-start text-left",
      )}
    >
      {/* Date Connector Dot */}
      <div
        className={clsx(
          "absolute top-6 h-2 w-2 rounded-full border border-[#FAFAF7]",
          // Color based on vibe (event_type)
          event.event_type === 1
            ? "bg-green-500"
            : event.event_type === -1
              ? "bg-red-500"
              : "bg-gray-400",
          position === "left"
            ? "-right-[calc(5.55%+5px)]"
            : "-left-[calc(5.55%+5px)]",
        )}
      />

      {/* Date Label */}
      <time className="mb-1 text-xs font-medium text-[#6B7280] font-sans">
        {format(new Date(event.event_date), "MMM d, yyyy")}
      </time>

      {/* Card Content */}
      <Link
        href={`/events/${event.id}`}
        className={clsx(
          "group relative mb-8 rounded-lg border transition-all duration-300 hover:-translate-y-px hover:shadow-md",
          "max-w-md w-full block", // Added block for Link
          // Importance 0: Minimal
          isMinor &&
            "border-transparent bg-transparent shadow-none p-0 hover:bg-white hover:p-4 hover:border-gray-100",

          // Importance > 0: Card styles
          !isMinor && [
            // Base card styles
            "shadow-sm",
            // Vibe colors (bg & border)
            event.event_type === 1
              ? "bg-green-50/50 border-green-100 hover:border-green-200"
              : event.event_type === -1
                ? "bg-red-50/50 border-red-100 hover:border-red-200"
                : "bg-white border-gray-100", // Neutral default

            // Importance Sizing
            event.importance_score === 1 && "p-3",
            event.importance_score === 2 && "p-5",
            event.importance_score === 3 && "p-6",
            event.importance_score === 4 && "p-8",
          ],
        )}
      >
        <div className="flex flex-col gap-1 min-w-0">
          <h3
            className={clsx(
              "font-serif font-medium text-[#1F2933]",
              isMinor && "text-sm text-gray-500",
              // Importance Text Sizes
              event.importance_score === 1 && "text-base",
              event.importance_score === 2 && "text-lg",
              event.importance_score === 3 && "text-xl",
              event.importance_score === 4 && "text-2xl font-semibold",
            )}
          >
            {event.title}
          </h3>

          {event.description && (
            <p
              className={clsx(
                "text-sm leading-relaxed text-[#6B7280] font-serif",
                // Truncate to 1 line
                "truncate",
                // Importance 0: hidden unless hovered
                isMinor && "hidden group-hover:block",
                // For others, just block (truncate handles width)
                !isMinor && "block",
              )}
            >
              {event.description}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
