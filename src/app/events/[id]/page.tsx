import { notFound } from "next/navigation";
import { getEvent } from "@/app/actions/events";
import { EventDetail } from "@/components/events/EventDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = Number(id);

  if (Number.isNaN(eventId)) return notFound();

  const event = await getEvent(eventId);

  if (!event) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <EventDetail event={event} />
      </div>
    </div>
  );
}
