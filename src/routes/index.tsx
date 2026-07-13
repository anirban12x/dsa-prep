import { createFileRoute } from "@tanstack/react-router";
import { DsaTracker } from "@/components/tracker/DsaTracker";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSA Tracker — TCS NQT · Blind 75 · NeetCode 150 · Partyush Sheet" },
      { name: "description", content: "Offline coding-sheet tracker unifying TCS NQT, Blind 75, NeetCode 150, and Partyush Sheet with search, filters, Java solutions, and logic breakdowns." },
      { property: "og:title", content: "DSA Tracker — TCS NQT · Blind 75 · NeetCode 150 · Partyush Sheet" },
      { property: "og:description", content: "One clean tracker for all sheets. Filter, search, and mark questions solved with progress synced across sheets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <DsaTracker />
      <Toaster />
    </>
  );
}
