import { useCallback, useEffect, useState } from "react";
import type { Sheet } from "@/data/types";

export type SharedFilter =
  | "any"
  | "only-tcs"
  | "only-blind75"
  | "only-neetcode150"
  | "tcs-blind75"
  | "tcs-neetcode150"
  | "blind75-neetcode150"
  | "all-three";

export interface Filters {
  difficulty: ("Easy" | "Medium" | "Hard")[];
  status: "all" | "solved" | "unsolved";
  topics: string[];
  shared: SharedFilter;
}

export interface TrackerState {
  solved: string[];
  bookmarks: string[];
  filters: Filters;
  search: string;
  activeTab: Sheet | "All";
  collapsedTopics: string[];
}

const KEY = "dsa-tracker:v1";

const DEFAULT_STATE: TrackerState = {
  solved: [],
  bookmarks: [],
  filters: { difficulty: [], status: "all", topics: [], shared: "any" },
  search: "",
  activeTab: "All",
  collapsedTopics: [],
};

function load(): TrackerState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    const p = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...p, filters: { ...DEFAULT_STATE.filters, ...(p.filters ?? {}) } };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useTrackerStore() {
  const [state, setState] = useState<TrackerState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const toggleSolved = useCallback((id: string) => {
    setState(s => ({
      ...s,
      solved: s.solved.includes(id) ? s.solved.filter(x => x !== id) : [...s.solved, id],
    }));
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setState(s => ({
      ...s,
      bookmarks: s.bookmarks.includes(id) ? s.bookmarks.filter(x => x !== id) : [...s.bookmarks, id],
    }));
  }, []);

  const toggleCollapsed = useCallback((topic: string) => {
    setState(s => ({
      ...s,
      collapsedTopics: s.collapsedTopics.includes(topic)
        ? s.collapsedTopics.filter(x => x !== topic)
        : [...s.collapsedTopics, topic],
    }));
  }, []);

  const setSearch = useCallback((search: string) => setState(s => ({ ...s, search })), []);
  const setActiveTab = useCallback((activeTab: Sheet | "All") => setState(s => ({ ...s, activeTab })), []);
  const setFilters = useCallback((f: Partial<Filters>) => setState(s => ({ ...s, filters: { ...s.filters, ...f } })), []);

  const reset = useCallback(() => setState(DEFAULT_STATE), []);

  const exportProgress = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dsa-tracker-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const importProgress = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          setState({ ...DEFAULT_STATE, ...parsed, filters: { ...DEFAULT_STATE.filters, ...(parsed.filters ?? {}) } });
          resolve();
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }, []);

  return {
    state,
    hydrated,
    toggleSolved,
    toggleBookmark,
    toggleCollapsed,
    setSearch,
    setActiveTab,
    setFilters,
    reset,
    exportProgress,
    importProgress,
  };
}
