import { clsx } from "clsx";
import { format } from "date-fns";
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
          "absolute top-6 h-2 w-2 rounded-full border border-[#FAFAF7] bg-[#B45309]",
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
      <div
        className={clsx(
          "group relative mb-8 rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-px hover:shadow-md",
          isMinor
            ? "border-transparent bg-transparent shadow-none p-0 hover:bg-white hover:p-4 hover:border-gray-100"
            : "border-gray-100",
          "max-w-md",
        )}
      >
        <h3
          className={clsx(
            "font-serif font-medium text-[#1F2933]",
            !isMinor && "text-lg",
          )}
        >
          {event.title}
        </h3>

        {event.description && (
          <p
            className={clsx(
              "mt-2 text-sm leading-relaxed text-[#6B7280] font-serif",
              isMinor && "hidden group-hover:block",
            )}
          >
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}
