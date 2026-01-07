"use client";

import { clsx } from "clsx";
import { useActionState, useState } from "react";
import { createEvent } from "@/app/actions/events";

export function CreateEventForm({
  onClose: _onClose,
}: {
  onClose?: () => void;
}) {
  const [state, action, isPending] = useActionState(createEvent, null);
  const [importance, setImportance] = useState(1);

  // If success, redirect (client-side navigation to clear params)
  if (state?.success && typeof window !== "undefined") {
    window.location.href = "/";
  }

  return (
    <form action={action} className="w-full max-w-lg space-y-6 mx-auto">
      <div className="space-y-4">
        {/* Title Input - Large & Clean */}
        <div>
          <input
            type="text"
            name="title"
            required
            placeholder="Title of this memory..."
            className="w-full border-none bg-transparent p-0 text-3xl font-serif font-medium text-[#1F2933] placeholder:text-gray-300 focus:ring-0"
          />
        </div>

        <div className="flex items-center gap-4 text-sm text-[#6B7280]">
          {/* Date Picker - Minimal */}
          <input
            type="date"
            name="date"
            required
            className="bg-transparent font-sans uppercase tracking-wider focus:outline-none"
          />

          <span className="h-4 w-px bg-gray-200" />

          {/* Importance Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              Importance
            </span>
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setImportance(v)}
                  className={clsx(
                    "rounded-full transition-all duration-200",
                    importance === v
                      ? "bg-[#B45309]"
                      : "bg-gray-200 hover:bg-gray-300",
                    v === 0
                      ? "h-2 w-2"
                      : v === 1
                        ? "h-3 w-3"
                        : v === 2
                          ? "h-4 w-4"
                          : "h-5 w-5",
                  )}
                  title={`Importance: ${v}`}
                />
              ))}
            </div>
            <input type="hidden" name="importance" value={importance} />
          </div>
        </div>

        {/* Description - Auto-expanding feels */}
        <div>
          <textarea
            name="description"
            rows={5}
            placeholder="Write about what happened..."
            className="w-full resize-none border-none bg-transparent p-0 text-lg font-serif text-[#1F2933] placeholder:text-gray-300 focus:ring-0 leading-relaxed"
          ></textarea>
        </div>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 font-sans">{state.error}</p>
      )}

      {state?.success && (
        <p className="text-sm text-[#1F2933] font-sans">
          Published to timeline.
        </p>
      )}

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending || state?.success}
          className="rounded-full bg-[#1F2933] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-black disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save to Lifetime"}
        </button>
      </div>
    </form>
  );
}
