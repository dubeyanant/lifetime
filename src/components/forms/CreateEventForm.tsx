"use client";

import { clsx } from "clsx";
import { useActionState, useEffect, useState } from "react";
import { createEvent, updateEvent } from "@/app/actions/events";
import { getUserTags } from "@/app/actions/tags";
import type { LifeEvent } from "@/types";

interface EventFormProps {
  initialData?: LifeEvent;
  eventId?: number;
  onClose?: () => void;
}

export function CreateEventForm({
  initialData,
  eventId,
  onClose: _onClose,
}: EventFormProps) {
  const actionFn = eventId ? updateEvent.bind(null, eventId) : createEvent;
  const [state, action, isPending] = useActionState(actionFn, null);

  const [importance, setImportance] = useState(
    initialData?.importance_score ?? 1,
  );
  const [eventType, setEventType] = useState(initialData?.event_type ?? 0); // 0=Neutral, 1=Positive, -1=Negative
  const [visibility, setVisibility] = useState(initialData?.visibility ?? 1); // 1=Public, 0=Private

  // Tag State
  const [tags, setTags] = useState<string[]>(
    initialData?.tags?.map((t) => t.name) || [],
  );
  const [tagInput, setTagInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allUserTags, setAllUserTags] = useState<string[]>([]);

  // Fetch user tags on mount
  useEffect(() => {
    getUserTags().then((fetchedTags) => {
      const names = fetchedTags.map((t) => t.name);
      setAllUserTags(names);
    });
  }, []);

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTagInput(val);
    if (val.trim()) {
      setSuggestions(
        allUserTags.filter(
          (t) =>
            t.toLowerCase().includes(val.toLowerCase()) && !tags.includes(t),
        ),
      );
    } else {
      setSuggestions([]);
    }
  };

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
    setSuggestions([]);
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      addTag(tagInput);
    }
  };

  // If success, logic might need to differ. For create -> redirect home. For update -> maybe stay or redirect?
  // The actions currently revalidate. We can rely on that.
  // Although server component redirect is usually better, strictly client-side here we have:
  if (state?.success && typeof window !== "undefined") {
    // If updating, we might want to stay on the detail page or go back.
    // For now, let's just go home for consistency or reload if staying.
    // If we are in a modal contexts, we might just want to close.
    // Given the user request implies a dedicated detail screen, getting redirected to "/" might be annoying if just editing.
    // But let's stick to the current pattern for now.
    window.location.href = eventId ? `/events/${eventId}` : "/";
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
            defaultValue={initialData?.title}
            placeholder="Title of this memory..."
            className="w-full border-none bg-transparent p-0 text-3xl font-serif font-medium text-[#1F2933] placeholder:text-gray-300 focus:ring-0"
          />
        </div>

        <div className="flex flex-col gap-4 text-sm text-[#6B7280]">
          <div className="flex items-center gap-4">
            {/* Date Picker - Minimal */}
            <input
              type="date"
              name="date"
              required
              defaultValue={initialData?.event_date} // YYYY-MM-DD matches input
              className="bg-transparent font-sans uppercase tracking-wider focus:outline-none"
            />

            <span className="h-4 w-px bg-gray-200" />

            {/* Importance Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Importance
              </span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((v) => (
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
                          ? "h-2.5 w-2.5"
                          : v === 2
                            ? "h-3 w-3"
                            : v === 3
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

          <div className="flex items-center gap-4">
            {/* Event Type Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Vibe
              </span>
              <div className="flex bg-gray-100 rounded-md p-0.5">
                {[
                  { val: 1, label: "+" },
                  { val: 0, label: "o" },
                  { val: -1, label: "-" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setEventType(opt.val)}
                    className={clsx(
                      "px-2 py-0.5 rounded text-xs font-medium transition-colors",
                      eventType === opt.val
                        ? "bg-white shadow-sm text-[#1F2933]"
                        : "text-gray-400 hover:text-gray-600",
                    )}
                    title={
                      opt.val === 1
                        ? "Positive"
                        : opt.val === -1
                          ? "Negative"
                          : "Neutral"
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <input type="hidden" name="eventType" value={eventType} />
            </div>

            <span className="h-4 w-px bg-gray-200" />

            {/* Visibility Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Visibility
              </span>
              <div className="flex bg-gray-100 rounded-md p-0.5">
                {[
                  { val: 1, label: "Public" },
                  { val: 0, label: "Private" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setVisibility(opt.val)}
                    className={clsx(
                      "px-2 py-0.5 rounded text-xs font-medium transition-colors",
                      visibility === opt.val
                        ? "bg-white shadow-sm text-[#1F2933]"
                        : "text-gray-400 hover:text-gray-600",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <input type="hidden" name="visibility" value={visibility} />
            </div>
          </div>
        </div>

        {/* Description - Auto-expanding feels */}
        <div>
          <textarea
            name="description"
            rows={5}
            defaultValue={initialData?.description || ""}
            placeholder="Write about what happened..."
            className="w-full resize-none border-none bg-transparent p-0 text-lg font-serif text-[#1F2933] placeholder:text-gray-300 focus:ring-0 leading-relaxed"
          ></textarea>
        </div>

        {/* Tags Section */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-[#1F2933]"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-gray-400 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInput}
              onKeyDown={handleKeyDown}
              placeholder="Add tags..."
              className="w-full border-b border-gray-200 bg-transparent py-1 text-sm focus:border-[#B45309] focus:outline-none focus:ring-0"
            />
            {suggestions.length > 0 && (
              <div className="absolute top-full z-10 mt-1 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => addTag(suggestion)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input type="hidden" name="tags" value={JSON.stringify(tags)} />
        </div>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 font-sans">{state.error}</p>
      )}

      {state?.success && (
        <p className="text-sm text-[#1F2933] font-sans">
          {eventId ? "Changes saved." : "Published to timeline."}
        </p>
      )}

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending || state?.success}
          className="rounded-full bg-[#1F2933] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-black disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : eventId
              ? "Save Changes"
              : "Save to Lifetime"}
        </button>
      </div>
    </form>
  );
}
