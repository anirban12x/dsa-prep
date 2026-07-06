
# DSA Tracker — Build Plan

A single-page app that tracks progress across TCS NQT, Blind 75, and NeetCode 150 from one canonical question database. All state is LocalStorage. Built on the existing TanStack Start + Tailwind v4 + shadcn stack (no Next.js migration).

## Scope (exactly what ships)

Page contains only: Header → 4 stat cards → Overall progress bar → Sheet tabs → Search → Collapsible filters → Topic-grouped question rows. Nothing else — no dashboards, streaks, charts, calendars, notes, achievements.

## Data model

One canonical `MasterQuestion` per problem — deduped by LeetCode number (or synthetic `TCS-###` id when no LC equivalent).

```ts
type Sheet = "TCS" | "Blind75" | "NeetCode150";
type Mapping = "Exact" | "Closest" | "Concept" | "None";

interface MasterQuestion {
  id: string;              // e.g. "LC-1" or "TCS-042"
  title: string;
  leetcodeNumber: number | null;
  leetcodeTitle: string | null;
  leetcodeUrl: string | null;
  mapping: Mapping;        // Exact | Closest | Concept | None
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  sheets: Sheet[];         // membership
  logic: {
    summary: string;
    approach: string;
    intuition: string;
    pseudocode: string;
    dryRun: string;
    time: string;
    space: string;
    interviewPoints: string[];
  };
  java: string;            // full runnable program with imports + main + Scanner
}
```

Files:
- `src/data/questions.ts` — array of all master questions (Blind 75 + NeetCode 150 merged and deduped, then TCS 100 appended with closest-concept LC mapping and clear `mapping` label).
- `src/data/topics.ts` — canonical topic list.

Completion sync is automatic: solved state is keyed by `MasterQuestion.id`, so ticking Two Sum in Blind75 instantly reflects in NeetCode150 and TCS.

## LocalStorage

Single key `dsa-tracker:v1` holding:
```ts
{ solved: string[], bookmarks: string[], filters: Filters, search: string, activeTab: Sheet | "All", collapsedTopics: string[] }
```
Wrapped in a `useLocalStorage` hook with SSR-safe hydration guard. Import/Export = JSON download/upload. Reset = clear key + confirm dialog.

## UI structure

```
src/routes/index.tsx           → page composition only
src/components/tracker/
  Header.tsx                   → title, subtitle, Import/Export/Reset
  StatsCards.tsx               → 4 cards: Solved x/y, Easy, Medium, Hard
  OverallProgress.tsx          → animated bar + counts
  SheetTabs.tsx                → All Sheets / TCS / Blind75 / NeetCode150 with counts
  SearchBar.tsx                → searches title, LC number, topic
  FilterPanel.tsx              → collapsible: Sheet, Difficulty, Status, Topic, Shared-Sheets combos
  TopicGroup.tsx               → collapsible group with per-topic progress
  QuestionRow.tsx              → checkbox • #LC • title • difficulty pill • sheet pills • Logic • Java • Open LC • bookmark
  LogicModal.tsx               → shadcn Dialog with the 8 sections
  JavaModal.tsx                → code block + Copy button
src/hooks/
  useTrackerStore.ts           → central state, derived selectors, persistence
```

Sheet pills are color-coded (TCS amber, Blind75 blue, NeetCode150 green). Difficulty pills: Easy green / Medium amber / Hard red.

## Filters

- Sheet: All / TCS / Blind75 / NeetCode150
- Difficulty: Easy / Medium / Hard (multi)
- Status: All / Solved / Unsolved
- Topic: multi-select
- Shared Questions: Only TCS · Only Blind75 · Only NeetCode150 · TCS+Blind75 · TCS+NeetCode150 · Blind75+NeetCode150 · In all three
Filters compose with Search; results grouped by topic; per-group counts always reflect the current filter.

## TCS → LeetCode mapping strategy

Per your choice: every TCS problem is mapped to the closest concept LeetCode problem and labeled `Closest` or `Concept`. Exact matches (e.g. TCS "Reverse a String" → LC 344) are labeled `Exact`. The mapping label is visible on the row (small tag) so you always know what you're opening. Open LeetCode always works.

## Content generation (all 241 pre-written)

Java + Logic authored for every master question. To keep this manageable and consistent, solutions follow a shared template (imports, `Solution` class, `main` with `Scanner`, inline comments, complexity in header). Content is stored as plain strings in `src/data/questions.ts` split across a few files by sheet for reviewability:
- `src/data/blind75.ts`
- `src/data/neetcode150.ts` (extends/overlaps Blind 75 by id)
- `src/data/tcs.ts`
Then `src/data/questions.ts` merges + dedupes into the final master array.

## Design

Clean, minimal, information-dense. Reuses existing Tailwind v4 tokens in `src/styles.css`; adds semantic tokens for the three sheet colors and difficulty colors via `@theme inline`. Framer Motion only for: progress bar fill, filter panel collapse, topic group expand, modal transitions. No decorative motion.

## SEO / head

`src/routes/index.tsx` sets a real `head()`: title "DSA Tracker — TCS NQT · Blind 75 · NeetCode 150", matching description, og:title/description, twitter:card. Root `__root.tsx` defaults get overridden.

## Out of scope (explicitly not built)

Backend, auth, database, charts, streaks, achievements, notes, calendars, daily goals, favorites list page, code editor/runner, submission history.

## Milestones

1. Master data files + types + LocalStorage store + Import/Export/Reset.
2. Layout shell: Header, Stats, Overall Progress, Tabs.
3. Search + Filters (incl. Shared-Sheets combos) + Topic groups + Question rows with sheet pills and sync.
4. Logic modal + Java modal + Open LC.
5. Content pass: fill Java + Logic for all 241 questions.
6. Polish: motion, empty states, responsive, accessibility (keyboard, aria on checkboxes/dialogs).
