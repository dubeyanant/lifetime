"use client";

import { clsx } from "clsx";
import { useMemo, useState } from "react";
import type { LifeEvent } from "@/types";
import { EventCard } from "./EventCard";

interface TimelineProps {
  events: LifeEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Sort events
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const dateA = new Date(a.event_date).getTime();
      const dateB = new Date(b.event_date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [events, sortOrder]);

  // Derive unique tags from *all* events
  // We want tags that are actually used.
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    for (const event of events) {
      if (event.tags) {
        for (const tag of event.tags) {
          tags.add(tag.name);
        }
      }
    }
    return Array.from(tags).sort();
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    if (selectedTags.length === 0) {
      return sortedEvents;
    }
    return sortedEvents.filter((event) => {
      if (!event.tags) return false;
      return event.tags.some((tag) => selectedTags.includes(tag.name));
    });
  }, [sortedEvents, selectedTags]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

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

  return (
    <div className="relative mx-auto max-w-3xl py-12 px-4">
      {/* Filter & Sort Section */}
      <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
          <button
            type="button"
            onClick={() => setSelectedTags([])}
            className={clsx(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
              selectedTags.length === 0
                ? "bg-[#1F2933] text-white shadow-md"
                : "bg-white text-[#6B7280] hover:bg-gray-50 border border-transparent",
            )}
          >
            All
          </button>
          {availableTags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => toggleTag(tag)}
              className={clsx(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 border",
                selectedTags.includes(tag)
                  ? "bg-[#1F2933] text-white border-[#1F2933] shadow-md"
                  : "bg-white text-[#6B7280] border-gray-200 hover:border-gray-300 hover:bg-gray-50",
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={toggleSort}
          className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#6B7280] border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <span className="uppercase text-xs tracking-wider">Sort:</span>
          <span>{sortOrder === "desc" ? "Newest First" : "Oldest First"}</span>
        </button>
      </div>

      {/* Central Line */}
      <div className="absolute left-1/2 top-32 bottom-0 w-px -translate-x-1/2 bg-gray-200" />

      <div className="space-y-0 relative">
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-[#6B7280] italic">
            No events found with these tags.
          </div>
        )}
        {filteredEvents.map((event, index) => (
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
