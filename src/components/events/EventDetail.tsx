"use client";

import { clsx } from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteEvent } from "@/app/actions/events";
import { CreateEventForm } from "@/components/forms/CreateEventForm";
import type { LifeEvent } from "@/types";

interface EventDetailProps {
  event: LifeEvent;
}

export function EventDetail({ event }: EventDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this memory?")) {
      const res = await deleteEvent(event.id);
      if (res.error) {
        alert(res.error);
      } else {
        router.push("/");
      }
    }
  }

  if (isEditing) {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="font-serif text-2xl text-[#1F2933]">Edit Memory</h2>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-sm text-[#6B7280] hover:text-[#1F2933]"
          >
            Cancel
          </button>
        </div>
        <CreateEventForm
          initialData={event}
          eventId={event.id}
          onClose={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-[#6B7280] hover:text-[#1F2933] flex items-center gap-1 transition-colors"
        >
          ← Back to Timeline
        </Link>
      </div>

      {/* Header / Meta */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <time className="text-sm font-medium text-[#6B7280] font-sans uppercase tracking-wider">
            {format(new Date(event.event_date), "MMMM d, yyyy")}
          </time>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-full px-4 py-1.5 text-sm font-medium border border-gray-200 text-[#1F2933] hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        <h1 className="font-serif text-4xl font-medium text-[#1F2933] leading-tight">
          {event.title}
        </h1>

        {/* Attributes Pill Row */}
        <div className="flex gap-3 text-xs font-medium text-[#6B7280]">
          <span
            className={clsx(
              "px-2 py-1 rounded bg-gray-100",
              event.event_type === 1 && "bg-green-100 text-green-800",
              event.event_type === -1 && "bg-red-100 text-red-800",
            )}
          >
            {event.event_type === 1
              ? "Positive Vibes"
              : event.event_type === -1
                ? "Negative Vibes"
                : "Neutral Vibes"}
          </span>
          <span className="px-2 py-1 rounded bg-gray-100">
            Importance: {event.importance_score}/4
          </span>
          <span className="px-2 py-1 rounded bg-gray-100">
            {event.visibility === 1 ? "Public" : "Private"}
          </span>
          {event.tags && event.tags.length > 0 && (
            <div className="flex gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 rounded bg-gray-100 text-[#1F2933]"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="prose prose-lg prose-gray font-serif text-[#1F2933]">
        <p className="whitespace-pre-wrap leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
}
