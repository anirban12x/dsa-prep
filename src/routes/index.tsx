import { createFileRoute } from "@tanstack/react-router";
import { DsaTracker } from "@/components/tracker/DsaTracker";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSA Tracker — TCS NQT · Blind 75 · NeetCode 150" },
      { name: "description", content: "Offline coding-sheet tracker unifying TCS NQT, Blind 75, and NeetCode 150 with search, filters, Java solutions, and logic breakdowns." },
      { property: "og:title", content: "DSA Tracker — TCS NQT · Blind 75 · NeetCode 150" },
      { property: "og:description", content: "One clean tracker for all three sheets. Filter, search, and mark questions solved with progress synced across sheets." },
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
