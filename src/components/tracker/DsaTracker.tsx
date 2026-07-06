import { useMemo, useRef, useState, useEffect } from "react";
import { 
  Search, Upload, Download, RotateCcw, ExternalLink, ChevronDown, ChevronRight, 
  Code2, Copy, Check, Filter, Star, Terminal, Flame, Target, Cpu, 
  Brain, Activity, Sparkles, Folder, FolderOpen, RefreshCw, AlertTriangle, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { QUESTIONS, ALL_TOPICS } from "@/data/questions";
import type { MasterQuestion, Sheet, Difficulty } from "@/data/types";
import { useTrackerStore, type SharedFilter } from "@/hooks/useTrackerStore";
import { cn } from "@/lib/utils";

const SHEETS: (Sheet | "All")[] = ["All", "TCS", "Blind75", "NeetCode150"];

const sheetPillClass: Record<Sheet, string> = {
  TCS: "bg-amber-500/10 text-amber-500 border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/20",
  Blind75: "bg-blue-500/10 text-blue-500 border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/20",
  NeetCode150: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/20",
};

const difficultyClass: Record<Difficulty, string> = {
  Easy: "text-emerald-500 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  Medium: "text-amber-500 dark:text-amber-400 border-amber-500/20 bg-amber-500/5",
  Hard: "text-rose-500 dark:text-rose-400 border-rose-500/20 bg-rose-500/5",
};

function matchesShared(q: MasterQuestion, shared: SharedFilter): boolean {
  const has = (s: Sheet) => q.sheets.includes(s);
  const only = (s: Sheet) => q.sheets.length === 1 && has(s);
  switch (shared) {
    case "any": return true;
    case "only-tcs": return only("TCS");
    case "only-blind75": return only("Blind75");
    case "only-neetcode150": return only("NeetCode150");
    case "tcs-blind75": return has("TCS") && has("Blind75");
    case "tcs-neetcode150": return has("TCS") && has("NeetCode150");
    case "blind75-neetcode150": return has("Blind75") && has("NeetCode150");
    case "all-three": return has("TCS") && has("Blind75") && has("NeetCode150");
  }
}

// Java Code syntax highlighting parser
function highlightJava(code: string): string {
  if (!code) return "";
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    // Comments
    .replace(/(\/\/.*)/g, '<span class="text-zinc-500/90 italic">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-zinc-500/90 italic">$1</span>')
    // Strings
    .replace(/(".*?")/g, '<span class="text-emerald-400">$1</span>')
    // Annotations
    .replace(/(@\w+)/g, '<span class="text-yellow-500">$1</span>')
    // Keywords
    .replace(/\b(public|protected|private|class|interface|enum|extends|implements|static|final|abstract|void|int|double|float|long|boolean|char|byte|short|return|if|else|for|while|do|switch|case|break|continue|new|import|package|this|super|throw|throws|try|catch|finally|true|false|null)\b/g, '<span class="text-pink-500 font-semibold">$1</span>')
    // Core classes
    .replace(/\b(String|System|Scanner|List|ArrayList|LinkedList|Map|HashMap|Set|HashSet|Queue|Stack|PriorityQueue|TreeNode|ListNode|Math)\b/g, '<span class="text-cyan-400 font-medium">$1</span>');
}

// Multi-color palette maps
const themeColorMap = {
  "cyan-indigo": {
    primary: "bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    primaryBorder: "border-cyan-500/40 hover:border-cyan-500",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    glowBg1: "bg-cyan-500/10 dark:bg-cyan-500/5",
    glowBg2: "bg-indigo-500/10 dark:bg-indigo-500/5",
    textGradient: "from-cyan-500 to-indigo-500 dark:from-cyan-400 dark:to-indigo-400",
    ringFocus: "focus-visible:ring-cyan-500 focus-visible:border-cyan-500",
    badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    btnPrimary: "bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-600 dark:hover:bg-cyan-500",
    tabGlow: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]",
    filterBadge: "bg-cyan-500 text-white hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-500",
    topicBorderDefault: "border-cyan-500/20"
  },
  "purple-pink": {
    primary: "bg-gradient-to-tr from-purple-500 via-pink-600 to-rose-600 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    primaryBorder: "border-purple-500/40 hover:border-purple-500",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    glowBg1: "bg-purple-500/10 dark:bg-purple-500/5",
    glowBg2: "bg-rose-500/10 dark:bg-rose-500/5",
    textGradient: "from-purple-500 to-rose-500 dark:from-purple-400 dark:to-rose-400",
    ringFocus: "focus-visible:ring-purple-500 focus-visible:border-purple-500",
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    btnPrimary: "bg-purple-600 hover:bg-purple-500 text-white dark:bg-purple-600 dark:hover:bg-purple-500",
    tabGlow: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]",
    filterBadge: "bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500",
    topicBorderDefault: "border-purple-500/20"
  },
  "emerald-teal": {
    primary: "bg-gradient-to-tr from-emerald-500 via-teal-600 to-cyan-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    primaryBorder: "border-emerald-500/40 hover:border-emerald-500",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    glowBg1: "bg-emerald-500/10 dark:bg-emerald-500/5",
    glowBg2: "bg-cyan-500/10 dark:bg-cyan-500/5",
    textGradient: "from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400",
    ringFocus: "focus-visible:ring-emerald-500 focus-visible:border-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    btnPrimary: "bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500",
    tabGlow: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    filterBadge: "bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500",
    topicBorderDefault: "border-emerald-500/20"
  },
  "amber-rose": {
    primary: "bg-gradient-to-tr from-amber-500 via-orange-600 to-rose-600 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    primaryBorder: "border-amber-500/40 hover:border-amber-500",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    glowBg1: "bg-amber-500/10 dark:bg-amber-500/5",
    glowBg2: "bg-rose-500/10 dark:bg-rose-500/5",
    textGradient: "from-amber-500 to-rose-500 dark:from-amber-400 dark:to-rose-400",
    ringFocus: "focus-visible:ring-amber-500 focus-visible:border-amber-500",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    btnPrimary: "bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-600 dark:hover:bg-amber-500",
    tabGlow: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    filterBadge: "bg-amber-500 text-white hover:bg-emerald-600 dark:bg-amber-600 dark:hover:bg-amber-500",
    topicBorderDefault: "border-amber-500/20"
  }
};

// Sheet-specific beautiful glowing button styling configuration
const sheetTabStyles = {
  All: {
    active: (theme: string) => {
      if (theme === "purple-pink") return "border-purple-500 bg-purple-500/15 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]";
      if (theme === "emerald-teal") return "border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
      if (theme === "amber-rose") return "border-amber-500 bg-amber-500/15 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
      return "border-cyan-500 bg-cyan-500/15 text-cyan-405 shadow-[0_0_15px_rgba(6,182,212,0.2)]";
    },
    inactive: "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-cyan-500/40 hover:text-cyan-400"
  },
  TCS: {
    active: () => "border-amber-500 bg-amber-500/15 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    inactive: "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-amber-500/50 hover:text-amber-400"
  },
  Blind75: {
    active: () => "border-blue-500 bg-blue-500/15 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    inactive: "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-blue-500/50 hover:text-blue-400"
  },
  NeetCode150: {
    active: () => "border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    inactive: "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-400"
  }
};

// Map each topic to dynamic colorful borders and badges
function getTopicColor(topic: string) {
  const t = topic.toLowerCase();
  if (t.includes("array") || t.includes("hash")) {
    return {
      border: "border-sky-500/25 dark:border-sky-500/15 hover:border-sky-500/40 shadow-sky-500/5",
      bg: "bg-sky-500/5",
      accent: "text-sky-500 bg-sky-500/10 dark:bg-sky-500/15 border-sky-500/20",
      bar: "bg-sky-500"
    };
  }
  if (t.includes("string") || t.includes("sliding") || t.includes("window")) {
    return {
      border: "border-teal-500/25 dark:border-teal-500/15 hover:border-teal-500/40 shadow-teal-500/5",
      bg: "bg-teal-500/5",
      accent: "text-teal-500 bg-teal-500/10 dark:bg-teal-500/15 border-teal-500/20",
      bar: "bg-teal-500"
    };
  }
  if (t.includes("tree") || t.includes("bst") || t.includes("trie")) {
    return {
      border: "border-emerald-500/25 dark:border-emerald-500/15 hover:border-emerald-500/40 shadow-emerald-500/5",
      bg: "bg-emerald-500/5",
      accent: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/20",
      bar: "bg-emerald-500"
    };
  }
  if (t.includes("graph")) {
    return {
      border: "border-indigo-500/25 dark:border-indigo-500/15 hover:border-indigo-500/40 shadow-indigo-500/5",
      bg: "bg-indigo-500/5",
      accent: "text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/20",
      bar: "bg-indigo-500"
    };
  }
  if (t.includes("dp") || t.includes("dynamic") || t.includes("greedy")) {
    return {
      border: "border-violet-500/25 dark:border-violet-500/15 hover:border-violet-500/40 shadow-violet-500/5",
      bg: "bg-violet-500/5",
      accent: "text-violet-500 bg-violet-500/10 dark:bg-violet-500/15 border-violet-500/20",
      bar: "bg-violet-500"
    };
  }
  if (t.includes("math") || t.includes("number")) {
    return {
      border: "border-amber-500/25 dark:border-amber-500/15 hover:border-amber-500/40 shadow-amber-500/5",
      bg: "bg-amber-500/5",
      accent: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/20",
      bar: "bg-amber-500"
    };
  }
  if (t.includes("stack") || t.includes("queue") || t.includes("heap") || t.includes("backtrack")) {
    return {
      border: "border-rose-500/25 dark:border-rose-500/15 hover:border-rose-500/40 shadow-rose-500/5",
      bg: "bg-rose-500/5",
      accent: "text-rose-500 bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/20",
      bar: "bg-rose-500"
    };
  }
  return {
    border: "border-zinc-500/25 dark:border-zinc-500/15 hover:border-zinc-500/40 shadow-zinc-500/5",
    bg: "bg-zinc-500/5",
    accent: "text-zinc-500 bg-zinc-500/10 dark:bg-zinc-500/15 border-zinc-500/20",
    bar: "bg-zinc-500"
  };
}

// Custom Markdown/Pointwise formatter for beginner-friendly rendering
function renderFormattedBody(text: string) {
  if (!text) return null;
  const lines = text.split("\n");
  return (
    <div className="space-y-3.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1.5" />;

        // Match numbered steps (e.g. "1. ", "Step 1: ")
        const isNumbered = /^\d+[\.:]\s+/.test(trimmed) || /^step\s+\d+[\.:]\s+/i.test(trimmed);
        // Match bullet points (e.g. "- ", "* ")
        const isBulleted = /^[-\*•]\s+/.test(trimmed);

        let cleanText = trimmed;
        let stepNumber = "•";

        if (isNumbered) {
          const numMatch = trimmed.match(/\d+/);
          stepNumber = numMatch ? numMatch[0] : "1";
          cleanText = trimmed.replace(/^\d+[\.:]\s+/, "").replace(/^step\s+\d+[\.:]\s+/i, "");
        } else if (isBulleted) {
          cleanText = trimmed.replace(/^[-\*•]\s+/, "");
        }

        // Format inline code blocks `code` and bold parts **bold**
        const parts = cleanText.split(/(`[^`]+`)/g);
        const formattedLine = parts.map((part, pIdx) => {
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code key={pIdx} className="font-mono text-[13px] sm:text-[14px] bg-zinc-900 text-pink-400 dark:text-pink-300 px-1.5 py-0.5 rounded border border-border/40 font-bold shadow-sm">
                {part.slice(1, -1)}
              </code>
            );
          }
          const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
          return boldParts.map((bPart, bIdx) => {
            if (bPart.startsWith("**") && bPart.endsWith("**")) {
              return <strong key={bIdx} className="font-extrabold text-white text-[15px] sm:text-[16px]">{bPart.slice(2, -2)}</strong>;
            }
            return bPart;
          });
        });

        if (isNumbered) {
          return (
            <div key={idx} className="flex gap-3.5 items-start bg-card/65 hover:bg-card/90 transition-all p-4 rounded-xl border border-border/40 shadow-sm leading-relaxed">
              <span className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 text-[13px] font-extrabold font-mono border border-cyan-500/20">
                {stepNumber}
              </span>
              <span className="text-[15px] sm:text-[16px] text-zinc-200 font-medium pt-0.5">
                {formattedLine}
              </span>
            </div>
          );
        }

        if (isBulleted) {
          return (
            <div key={idx} className="flex gap-2.5 items-start pl-2 leading-relaxed">
              <span className="text-cyan-500 font-extrabold text-[15px] shrink-0 pt-0.5">▸</span>
              <span className="text-[15px] sm:text-[16px] text-zinc-200 font-medium">
                {formattedLine}
              </span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-[15px] sm:text-[16px] leading-relaxed text-zinc-300 font-medium">
            {formattedLine}
          </p>
        );
      })}
    </div>
  );
}

// Programmatically expands approach strings into highly structured step-by-step recipes
function renderDetailedApproach(q: MasterQuestion) {
  const rawApproach = q.logic.approach;
  // Segment approach using punctuation delimiters (semicolon or period followed by space)
  const steps = rawApproach.split(/;\s*|\.\s+(?=[A-Z])/).map(s => s.trim()).filter(s => s.length > 3);
  
  return (
    <div className="space-y-5">
      {/* Point-wise Execution Steps */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2">
          <Brain className="h-4.5 w-4.5" />
          <span>Point-wise Optimal Execution Recipe</span>
        </div>
        
        {steps.map((step, idx) => {
          let stepPhase = "Core Loop & State Mutation";
          if (idx === 0) {
            stepPhase = "1. Initialization Phase & Setup";
          } else if (idx === steps.length - 1) {
            stepPhase = "3. Solution Assembly & Return";
          } else if (idx === 1 && steps.length > 2) {
            stepPhase = "2. Logic Execution & Traversal";
          }

          return (
            <div key={idx} className="flex gap-4 items-start bg-zinc-900/50 hover:bg-zinc-900/90 transition-all p-4 rounded-xl border border-zinc-800/80 shadow-md">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-black font-mono border border-cyan-500/20">
                {idx + 1}
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-500 block opacity-90">
                  {stepPhase}
                </span>
                <p className="text-[15px] sm:text-[16px] leading-relaxed text-zinc-100 font-medium">
                  {step.endsWith(".") ? step : step + "."}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Auxiliary Detailed Complexity analysis */}
      <div className="bg-zinc-900/35 p-4 rounded-xl border border-zinc-800 space-y-3.5">
        <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm uppercase tracking-wider">
          <Cpu className="h-4.5 w-4.5 text-indigo-400" />
          <span>Point-wise Complexity Analysis & Proof</span>
        </div>
        
        <div className="space-y-2.5 font-sans">
          <div className="flex justify-between items-center py-1 border-b border-zinc-800/40 text-[14px]">
            <span className="text-zinc-400 font-bold">Time Bounds</span>
            <span className="text-emerald-400 font-mono font-black">{q.logic.time}</span>
          </div>
          <p className="text-[14px] text-zinc-400 leading-relaxed pl-2 border-l-2 border-emerald-500/30">
            • **Proof**: Iterates through input size `N` in a single pass. Map queries, set checks, or pointers resolve in constant time `O(1)`, resulting in an optimal linear complexity.
          </p>
          
          <div className="flex justify-between items-center py-1 border-b border-zinc-800/40 text-[14px] mt-3">
            <span className="text-zinc-400 font-bold">Space Bounds</span>
            <span className="text-indigo-400 font-mono font-black">{q.logic.space}</span>
          </div>
          <p className="text-[14px] text-zinc-400 leading-relaxed pl-2 border-l-2 border-indigo-500/30">
            • **Proof**: The algorithm consumes `{q.logic.space}` auxiliary memory. {q.logic.space.includes("O(1)") ? "Only constant space variables are initialized." : "A hashing table or tracker is initialized to store elements proportionally to the input size."}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DsaTracker() {
  const t = useTrackerStore();
  const { state } = t;
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [logicQ, setLogicQ] = useState<MasterQuestion | null>(null);
  const [javaQ, setJavaQ] = useState<MasterQuestion | null>(null);
  const importRef = useRef<HTMLInputElement>(null);

  // Active theme state
  const [accentTheme, setAccentTheme] = useState<keyof typeof themeColorMap>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("accentTheme") as any) || "cyan-indigo";
    }
    return "cyan-indigo";
  });

  const activeColor = themeColorMap[accentTheme] || themeColorMap["cyan-indigo"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accentTheme", accentTheme);
    }
  }, [accentTheme]);

  // Dark mode only setup
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const solvedSet = useMemo(() => new Set(state.solved), [state.solved]);
  const bookmarkSet = useMemo(() => new Set(state.bookmarks), [state.bookmarks]);

  const filtered = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    return QUESTIONS.filter(x => {
      if (state.activeTab !== "All" && !x.sheets.includes(state.activeTab)) return false;
      if (state.filters.difficulty.length && !state.filters.difficulty.includes(x.difficulty)) return false;
      if (state.filters.status === "solved" && !solvedSet.has(x.id)) return false;
      if (state.filters.status === "unsolved" && solvedSet.has(x.id)) return false;
      if (state.filters.topics.length && !x.topics.some(tp => state.filters.topics.includes(tp))) return false;
      if (!matchesShared(x, state.filters.shared)) return false;
      if (q) {
        const hay = `${x.title} ${x.leetcodeNumber ?? ""} ${x.topics.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [state, solvedSet]);

  const tabCounts = useMemo(() => {
    const total = QUESTIONS.length;
    const c: Record<string, number> = { All: total };
    for (const s of ["TCS", "Blind75", "NeetCode150"] as Sheet[]) {
      c[s] = QUESTIONS.filter(q => q.sheets.includes(s)).length;
    }
    return c;
  }, []);

  const stats = useMemo(() => {
    const overallSolved = QUESTIONS.filter(q => solvedSet.has(q.id));
    const easyTotal = QUESTIONS.filter(q => q.difficulty === "Easy");
    const mediumTotal = QUESTIONS.filter(q => q.difficulty === "Medium");
    const hardTotal = QUESTIONS.filter(q => q.difficulty === "Hard");
    return {
      overallSolved: overallSolved.length,
      overallTotal: QUESTIONS.length,
      easySolved: overallSolved.filter(q => q.difficulty === "Easy").length,
      easyTotal: easyTotal.length,
      mediumSolved: overallSolved.filter(q => q.difficulty === "Medium").length,
      mediumTotal: mediumTotal.length,
      hardSolved: overallSolved.filter(q => q.difficulty === "Hard").length,
      hardTotal: hardTotal.length,
    };
  }, [solvedSet]);

  const grouped = useMemo(() => {
    const map = new Map<string, MasterQuestion[]>();
    for (const q of filtered) {
      const topic = q.topics[0] ?? "General";
      if (!map.has(topic)) map.set(topic, []);
      map.get(topic)!.push(q);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const progressPct = stats.overallTotal ? Math.round((stats.overallSolved / stats.overallTotal) * 100) : 0;

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (state.filters.difficulty.length) count += state.filters.difficulty.length;
    if (state.filters.status !== "all") count += 1;
    if (state.filters.shared !== "any") count += 1;
    if (state.filters.topics.length) count += state.filters.topics.length;
    return count;
  }, [state.filters]);

  const handleClearFilters = () => {
    t.setFilters({ difficulty: [], status: "all", shared: "any", topics: [] });
    t.setSearch("");
    toast.success("Filters and search cleared successfully!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    t.importProgress(f).then(() => toast.success("Progress imported successfully!")).catch(() => toast.error("Invalid progress file."));
    e.target.value = "";
  };

  return (
    <div className="relative min-h-screen pb-16 bg-zinc-950 text-zinc-100 selection:bg-cyan-500/30">
      {/* Visual background textures */}
      <div className="fixed inset-0 -z-40 h-full w-full bg-[radial-gradient(#1f2937_1.2px,transparent_1.2px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />
      
      {/* Dynamic Theme Glowing Blobs */}
      <div className={cn("fixed top-[-10%] left-[-15%] -z-30 h-[500px] w-[500px] rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms] transition-all", activeColor.glowBg1)} />
      <div className={cn("fixed bottom-[-10%] right-[-15%] -z-30 h-[500px] w-[500px] rounded-full blur-[120px] pointer-events-none animate-pulse duration-[10000ms] transition-all", activeColor.glowBg2)} />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className={cn("relative flex items-center justify-center h-12 w-12 rounded-xl transition-all duration-500", activeColor.primary)}>
                <Terminal className="h-6 w-6 text-white" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Code. Track. Conquer.
              </h1>
            </div>
            <p className="mt-2.5 text-base sm:text-lg text-muted-foreground/90 flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-cyan-400">TCS NQT</span>
              <span className="opacity-40">•</span>
              <span className="font-semibold text-blue-400">Blind 75</span>
              <span className="opacity-40">•</span>
              <span className="font-semibold text-emerald-400">NeetCode 150</span>
              <span className="opacity-40">—</span>
              <span className="font-medium text-zinc-300">Your Ultimate DSA Preparation Cockpit</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            {/* Theme Palette Switcher */}
            <div className="flex items-center gap-2 mr-3 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/80">
              <span className="text-xs uppercase font-mono font-bold text-zinc-400 px-1.5 hidden md:inline">Theme:</span>
              <div className="flex gap-1.5">
                {(Object.keys(themeColorMap) as (keyof typeof themeColorMap)[]).map(themeKey => (
                  <button
                    key={themeKey}
                    onClick={() => setAccentTheme(themeKey)}
                    className={cn(
                      "h-5.5 w-5.5 rounded-full border transition-all duration-300 transform hover:scale-110",
                      themeKey === "cyan-indigo" && "bg-cyan-500 border-cyan-400",
                      themeKey === "purple-pink" && "bg-purple-500 border-purple-400",
                      themeKey === "emerald-teal" && "bg-emerald-500 border-emerald-400",
                      themeKey === "amber-rose" && "bg-amber-500 border-amber-400",
                      accentTheme === themeKey ? "ring-2 ring-zinc-100 scale-110 border-white shadow-md" : "opacity-70 border-transparent"
                    )}
                    title={`Switch to ${themeKey.replace("-", " ")}`}
                  />
                ))}
              </div>
            </div>

            <input ref={importRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => importRef.current?.click()}
              className="h-10 hover:border-cyan-500/40 hover:text-cyan-400 text-sm font-bold"
            >
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={t.exportProgress}
              className="h-10 hover:border-indigo-500/40 hover:text-indigo-400 text-sm font-bold"
            >
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-10 hover:border-red-500/40 hover:text-red-500 hover:bg-red-500/5 text-sm font-bold"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-red-500/20 bg-zinc-950/95 backdrop-blur-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-red-500 text-lg font-black">
                    <AlertTriangle className="h-5 w-5" /> Reset all progress?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-300 text-sm leading-relaxed">
                    This will clear all your solved questions, bookmarks, search queries, and filters. This action is destructive and cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-zinc-900 border-zinc-800 text-zinc-300 text-sm font-bold">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => { t.reset(); toast.success("All progress has been reset."); }}
                    className="bg-red-600 text-white hover:bg-red-500 text-sm font-bold"
                  >
                    Reset Progress
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </header>

        {/* Stats Grid with Background Pictures */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard 
            label="Total Solved" 
            value={`${stats.overallSolved} / ${stats.overallTotal}`}
            icon={<Target className="h-6 w-6 text-cyan-400" />}
            color="cyan"
            percentage={stats.overallTotal ? Math.round((stats.overallSolved / stats.overallTotal) * 100) : 0}
            bgImage="/images/solved.png"
          />
          <StatCard 
            label="Easy" 
            value={`${stats.easySolved} / ${stats.easyTotal}`}
            icon={<Activity className="h-6 w-6 text-emerald-400" />}
            color="emerald"
            percentage={stats.easyTotal ? Math.round((stats.easySolved / stats.easyTotal) * 100) : 0}
            bgImage="/images/easy.png"
          />
          <StatCard 
            label="Medium" 
            value={`${stats.mediumSolved} / ${stats.mediumTotal}`}
            icon={<Brain className="h-6 w-6 text-amber-400" />}
            color="amber"
            percentage={stats.mediumTotal ? Math.round((stats.mediumSolved / stats.mediumTotal) * 100) : 0}
            bgImage="/images/medium.png"
          />
          <StatCard 
            label="Hard" 
            value={`${stats.hardSolved} / ${stats.hardTotal}`}
            icon={<Flame className="h-6 w-6 text-rose-400" />}
            color="rose"
            percentage={stats.hardTotal ? Math.round((stats.hardSolved / stats.hardTotal) * 100) : 0}
            bgImage="/images/hard.png"
          />
        </section>

        {/* Global Progress Bar */}
        <section className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-md relative overflow-hidden group">
          <div className={cn("absolute top-0 left-0 w-1.5 h-full transition-all duration-500 bg-gradient-to-b", activeColor.gradient)} />
          <div className="mb-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-wide text-zinc-100">Preparation Completion</span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold transition-all duration-300", activeColor.badge)}>
                {progressPct}% Done
              </span>
            </div>
            <div className="text-sm text-zinc-305 font-mono font-black">
              {stats.overallSolved} solved / {stats.overallTotal - stats.overallSolved} left
            </div>
          </div>
          <div className="h-4.5 w-full overflow-hidden rounded-full bg-zinc-950 p-0.5 border border-zinc-800/50">
            <div
              className={cn("h-full rounded-full transition-[width,background] duration-700 ease-out bg-gradient-to-r", activeColor.gradient)}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </section>

        {/* Sheet Tabs - Brand Colors */}
        <section className="mt-8 flex flex-wrap gap-2.5 border-b border-zinc-800/40 pb-4">
          {SHEETS.map(s => {
            const isActive = state.activeTab === s;
            const style = sheetTabStyles[s];
            return (
              <button
                key={s}
                onClick={() => t.setActiveTab(s)}
                className={cn(
                  "relative rounded-xl border px-5 py-3.5 text-base sm:text-lg font-bold tracking-wide transition-all duration-205 cursor-pointer hover:scale-[1.01] flex items-center gap-2.5 border-2",
                  isActive ? style.active(accentTheme) : style.inactive
                )}
              >
                <span>{s === "All" ? "All Sheets" : s === "TCS" ? "TCS NQT" : s === "Blind75" ? "Blind 75" : "NeetCode 150"}</span>
                <span className={cn(
                  "rounded-md px-2 py-0.5 text-xs sm:text-sm font-mono font-black transition-colors", 
                  isActive ? "bg-black/30 text-white" : "bg-zinc-950/60 text-zinc-400"
                )}>
                  {tabCounts[s]}
                </span>
                {isActive && (
                  <span className={cn("absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-10 h-1 rounded-t-full transition-all duration-300", activeColor.tabGlow)} />
                )}
              </button>
            );
          })}
        </section>

        {/* Search & Filter Trigger */}
        <section className="mt-6 flex flex-col gap-3 sm:flex-row items-center">
          <div className="relative flex-1 w-full group">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 group-focus-within:text-cyan-400 transition-colors" />
            <Input
              value={state.search}
              onChange={e => t.setSearch(e.target.value)}
              placeholder="Search problem title, LeetCode #, or topic tag..."
              className={cn("pl-10 h-12 border-zinc-800 bg-zinc-900/40 focus:bg-zinc-900/70 text-zinc-100 placeholder:text-zinc-500 transition-all text-base sm:text-lg", activeColor.ringFocus)}
            />
            {state.search && (
              <button 
                onClick={() => t.setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 hover:text-zinc-200 font-mono font-black"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
            <Button 
              variant={filtersOpen || activeFiltersCount > 0 ? "default" : "outline"} 
              onClick={() => setFiltersOpen(o => !o)}
              className={cn(
                "h-12 px-6 border-zinc-800 font-extrabold text-base transition-all bg-zinc-900 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-850 w-full sm:w-auto",
                activeFiltersCount > 0 && activeColor.filterBadge
              )}
            >
              <Filter className="mr-2.5 h-4.5 w-4.5" /> 
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="ml-2.5 rounded-full bg-white/20 dark:bg-black/20 text-white px-2 py-0.5 text-xs sm:text-sm font-bold font-mono">
                  {activeFiltersCount}
                </span>
              )}
              {filtersOpen ? <ChevronDown className="ml-2.5 h-4.5 w-4.5 opacity-70" /> : <ChevronRight className="ml-2.5 h-4.5 w-4.5 opacity-70" />}
            </Button>

            {/* Clear Filters Button */}
            {(activeFiltersCount > 0 || state.search.trim().length > 0) && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="h-12 px-5 text-base font-extrabold text-rose-450 hover:text-rose-350 hover:bg-rose-500/10 border-rose-500/30 rounded-xl"
              >
                <X className="mr-2 h-4 w-4" /> Clear
              </Button>
            )}
          </div>
        </section>

        {/* Filters Panel */}
        {filtersOpen && (
          <section className="mt-3 grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-lg sm:grid-cols-2 lg:grid-cols-5 animate-in fade-in slide-in-from-top-3 duration-200">
            <FilterGroup label="Active Sheet">
              <select
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs sm:text-sm font-bold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer text-zinc-200"
                value={state.activeTab}
                onChange={e => t.setActiveTab(e.target.value as any)}
              >
                <option value="All">All Sheets Combined</option>
                <option value="TCS">TCS NQT Sheet</option>
                <option value="Blind75">Blind 75 Sheet</option>
                <option value="NeetCode150">NeetCode 150 Sheet</option>
              </select>
            </FilterGroup>
            
            <FilterGroup label="Difficulty">
              <div className="flex flex-wrap gap-1.5">
                {(["Easy", "Medium", "Hard"] as Difficulty[]).map(d => {
                  const active = state.filters.difficulty.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => t.setFilters({
                        difficulty: active
                          ? state.filters.difficulty.filter(x => x !== d)
                          : [...state.filters.difficulty, d],
                      })}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-xs sm:text-sm font-extrabold transition-all border-2",
                        active 
                          ? d === "Easy" ? "border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-sm shadow-emerald-500/10"
                            : d === "Medium" ? "border-amber-500 bg-amber-500/15 text-amber-400 shadow-sm shadow-amber-500/10"
                            : "border-rose-500 bg-rose-500/15 text-rose-455 shadow-sm shadow-rose-500/10"
                          : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                      )}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </FilterGroup>
            
            <FilterGroup label="Status">
              <div className="flex gap-1.5">
                {(["all", "solved", "unsolved"] as const).map(s => {
                  const active = state.filters.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => t.setFilters({ status: s })}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-xs sm:text-sm font-extrabold capitalize transition-all border-2",
                        active 
                          ? s === "solved" ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                            : s === "unsolved" ? "border-rose-500 bg-rose-500/15 text-rose-455"
                            : activeColor.filterBadge.includes("cyan") ? "border-cyan-500 bg-cyan-500/15 text-cyan-400"
                            : activeColor.filterBadge.includes("purple") ? "border-purple-500 bg-purple-500/15 text-purple-400"
                            : activeColor.filterBadge.includes("emerald") ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                            : "border-amber-500 bg-amber-500/15 text-amber-400"
                          : "border-zinc-800 bg-zinc-955 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </FilterGroup>
            
            <FilterGroup label="Cross-Sheet Mapping">
              <select
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs sm:text-sm font-bold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer text-zinc-200"
                value={state.filters.shared}
                onChange={e => t.setFilters({ shared: e.target.value as SharedFilter })}
              >
                <option value="any">Any problem</option>
                <option value="only-tcs">Only in TCS NQT</option>
                <option value="only-blind75">Only in Blind 75</option>
                <option value="only-neetcode150">Only in NeetCode 150</option>
                <option value="tcs-blind75">Shared: TCS + Blind 75</option>
                <option value="tcs-neetcode150">Shared: TCS + NeetCode 150</option>
                <option value="blind75-neetcode150">Shared: Blind 75 + NeetCode 150</option>
                <option value="all-three">Shared: Present in All Three</option>
              </select>
            </FilterGroup>
            
            <FilterGroup label={`Topics (${state.filters.topics.length} selected)`}>
              <div className="flex max-h-28 flex-wrap gap-1 overflow-y-auto pr-1 border border-zinc-800 rounded-lg p-2 bg-zinc-955/60 dialog-scrollbar">
                {ALL_TOPICS.map(tp => {
                  const active = state.filters.topics.includes(tp);
                  return (
                    <button
                      key={tp}
                      onClick={() => t.setFilters({
                        topics: active ? state.filters.topics.filter(x => x !== tp) : [...state.filters.topics, tp],
                      })}
                      className={cn(
                        "rounded-md border px-2 py-0.5 text-[11px] font-bold transition-all",
                        active 
                          ? "border-zinc-500 bg-zinc-800 text-zinc-205" 
                          : "border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                      )}
                    >
                      {tp}
                    </button>
                  );
                })}
              </div>
            </FilterGroup>
          </section>
        )}

        {/* Question Registry */}
        <section className="mt-8 space-y-5">
          {grouped.length === 0 && (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 p-12 text-center text-sm text-zinc-400 backdrop-blur-sm">
              <Terminal className="mx-auto h-8 w-8 text-zinc-500 mb-3 animate-bounce" />
              <p className="font-semibold text-zinc-300">No problems found</p>
              <p className="text-xs text-zinc-500 mt-1">Adjust search terms or reset filters to explore.</p>
              <Button 
                onClick={handleClearFilters}
                variant="outline" 
                size="sm"
                className="mt-4 border-zinc-800 text-zinc-300 text-xs font-bold"
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {grouped.map(([topic, items]) => {
            const collapsed = state.collapsedTopics.includes(topic);
            const solvedInGroup = items.filter(q => solvedSet.has(q.id)).length;
            const completionPercent = items.length ? Math.round((solvedInGroup / items.length) * 100) : 0;
            const topicColors = getTopicColor(topic);
            return (
              <div 
                key={topic} 
                className={cn(
                  "overflow-hidden rounded-2xl border bg-zinc-900/40 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md",
                  topicColors.border
                )}
              >
                {/* Topic Header Accordion */}
                <button
                  onClick={() => t.toggleCollapsed(topic)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-zinc-900/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={cn("transition-colors p-2 rounded-lg border", topicColors.accent)}>
                      {collapsed ? <Folder className="h-5 w-5" /> : <FolderOpen className="h-5 w-5" />}
                    </div>
                    <div>
                      <span className="font-black text-zinc-55 text-lg tracking-wide group-hover:text-zinc-50 transition-colors">
                        {topic}
                      </span>
                      <span className="ml-3 rounded-full bg-zinc-900 border border-zinc-800/80 px-3 py-1 text-[13px] font-mono font-bold text-zinc-400">
                        {items.length} Questions
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Visual mini-bar */}
                    <div className="hidden sm:flex items-center gap-2.5">
                      <span className="text-[12px] font-mono font-black text-zinc-400">{completionPercent}%</span>
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-950 border border-zinc-800/40">
                        <div 
                          className={cn("h-full transition-all duration-500", topicColors.bar)} 
                          style={{ width: `${completionPercent}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-black font-mono text-zinc-300">
                      {solvedInGroup} / {items.length} solved
                    </span>
                    <div>
                      {collapsed ? <ChevronRight className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-100" />}
                    </div>
                  </div>
                </button>
                
                {/* Collapsible Problems List */}
                {!collapsed && (
                  <ul className="divide-y divide-zinc-800/70 border-t border-zinc-800/80 bg-zinc-950/20">
                    {items.map(q => (
                      <QuestionRow
                        key={q.id}
                        q={q}
                        solved={solvedSet.has(q.id)}
                        bookmarked={bookmarkSet.has(q.id)}
                        onToggleSolved={() => t.toggleSolved(q.id)}
                        onToggleBookmark={() => t.toggleBookmark(q.id)}
                        onOpenLogic={() => setLogicQ(q)}
                        onOpenJava={() => setJavaQ(q)}
                      />
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-zinc-550 border-t border-zinc-850 pt-6">
          <p className="font-mono">
            <span className="text-cyan-400 font-black">{QUESTIONS.length}</span> canonical questions integrated · Offline-first local storage persistence
          </p>
          <p className="mt-1.5 opacity-70">
            Crafted for developers preparing for top tech opportunities.
          </p>
        </footer>
      </div>

      <LogicModal q={logicQ} onClose={() => setLogicQ(null)} />
      <JavaModal q={javaQ} onClose={() => setJavaQ(null)} />
    </div>
  );
}

// Subcomponent: StatCard with Background Pictures
function StatCard({ 
  label, value, icon, color, percentage, bgImage 
}: { 
  label: string; 
  value: string; 
  icon: React.ReactNode;
  color: "cyan" | "emerald" | "amber" | "rose";
  percentage: number;
  bgImage?: string;
}) {
  const colorMap = {
    cyan: "hover:shadow-[0_0_20px_rgba(6,182,212,0.22)] hover:border-cyan-500/40 border-l-cyan-500",
    emerald: "hover:shadow-[0_0_20px_rgba(16,185,129,0.22)] hover:border-emerald-500/40 border-l-emerald-500",
    amber: "hover:shadow-[0_0_20px_rgba(245,158,11,0.22)] hover:border-amber-500/40 border-l-amber-500",
    rose: "hover:shadow-[0_0_20px_rgba(244,63,94,0.22)] hover:border-rose-500/40 border-l-rose-500",
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5.5 transition-all duration-500 hover:-translate-y-1 border-l-4 shadow-md group backdrop-blur-sm",
      colorMap[color]
    )}>
      {/* Background themed image */}
      {bgImage && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img 
            src={bgImage} 
            alt="" 
            className="h-full w-full object-cover opacity-25 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-35" 
          />
          {/* Subtle gradient overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent" />
        </div>
      )}

      <div className="flex items-center justify-between relative z-10">
        <div className="text-sm font-extrabold uppercase tracking-wider text-zinc-400">{label}</div>
        <div className="rounded-xl bg-zinc-950 p-2.5 border border-zinc-800 shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:rotate-6">
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-baseline justify-between relative z-10">
        <div className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums text-zinc-50">
          {value}
        </div>
        <div className="text-[12px] font-black font-mono text-zinc-400">{percentage}%</div>
      </div>

      {/* Mini Progress Bar inside Card */}
      <div className="h-2 w-full bg-zinc-955 rounded-full mt-3.5 overflow-hidden border border-zinc-800 relative z-10">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500",
            color === "cyan" && "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]",
            color === "emerald" && "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
            color === "amber" && "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
            color === "rose" && "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]",
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Subcomponent: FilterGroup
function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">{label}</div>
      {children}
    </div>
  );
}

// Subcomponent: QuestionRow
function QuestionRow({
  q, solved, bookmarked, onToggleSolved, onToggleBookmark, onOpenLogic, onOpenJava,
}: {
  q: MasterQuestion;
  solved: boolean;
  bookmarked: boolean;
  onToggleSolved: () => void;
  onToggleBookmark: () => void;
  onOpenLogic: () => void;
  onOpenJava: () => void;
}) {
  return (
    <li className={cn(
      "flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 transition-all duration-200 border-l-2 border-l-transparent hover:border-l-cyan-500 hover:bg-zinc-900/35", 
      solved && "bg-emerald-500/[0.015] hover:bg-emerald-500/[0.03]"
    )}>
      
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Animated Checkbox */}
        <div className="flex items-center shrink-0">
          <Checkbox 
            checked={solved} 
            onCheckedChange={onToggleSolved} 
            aria-label={`Mark ${q.title} solved`} 
            className="h-5.5 w-5.5 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 rounded border-zinc-700 cursor-pointer"
          />
        </div>
        
        {/* LeetCode Number */}
        <span className="w-16 shrink-0 text-sm font-mono font-extrabold text-zinc-400 tabular-nums">
          {q.leetcodeNumber !== null ? `#${q.leetcodeNumber.toString().padStart(4, "0")}` : "——"}
        </span>
        
        {/* Title & Complexities */}
        <div className="min-w-0 flex-1 flex flex-col md:flex-row md:items-center gap-3">
          <span className={cn(
            "truncate text-base sm:text-[17px] font-extrabold tracking-wide transition-all text-zinc-100", 
            solved ? "line-through text-zinc-500" : "text-zinc-150"
          )}>
            {q.title}
          </span>

          {/* Programmer Friendly: Inline Complexities */}
          <span className="hidden md:inline-flex items-center gap-1.5 rounded bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 font-mono text-xs sm:text-[13px] text-zinc-400">
            <span>T:</span>
            <span className="font-bold text-zinc-200">{q.logic.time.split(" ")[0]}</span>
            <span className="mx-0.5 opacity-40">|</span>
            <span>S:</span>
            <span className="font-bold text-zinc-200">{q.logic.space.split(" ")[0]}</span>
          </span>
        </div>
      </div>

      {/* Tags & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3.5 sm:gap-5 shrink-0">
        
        {/* Difficulty & Sheet tags */}
        <div className="flex items-center gap-2">
          <span className={cn("rounded-md border px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase", difficultyClass[q.difficulty])}>
            {q.difficulty}
          </span>
          
          <div className="flex gap-1">
            {q.sheets.map(s => (
              <span key={s} className={cn("rounded-md border px-2 py-0.5 text-[11px] font-black tracking-wider uppercase", sheetPillClass[s])}>
                {s === "Blind75" ? "B75" : s === "NeetCode150" ? "NC150" : s}
              </span>
            ))}
            {q.mapping !== "Exact" && q.mapping !== "None" && (
              <span 
                className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[11px] font-bold text-zinc-405 font-mono" 
                title={`${q.mapping} match to official LeetCode`}
              >
                {q.mapping}
              </span>
            )}
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center gap-1.5">
          {/* Logic Details Modal Button */}
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-9 px-3.5 text-sm sm:text-base font-extrabold text-zinc-350 hover:bg-cyan-500/10 hover:text-cyan-400" 
            onClick={onOpenLogic}
          >
            <Cpu className="mr-1.5 h-4 w-4" /> Logic
          </Button>

          {/* Java Code Modal Button */}
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-9 px-3.5 text-sm sm:text-base font-extrabold text-zinc-350 hover:bg-indigo-500/10 hover:text-indigo-400" 
            onClick={onOpenJava}
          >
            <Code2 className="mr-1.5 h-4 w-4" /> Java
          </Button>

          {/* LeetCode link */}
          {q.leetcodeUrl ? (
            <a 
              href={q.leetcodeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-zinc-805 text-zinc-450 hover:text-zinc-200 transition-colors" 
              title="Open on LeetCode"
            >
              <ExternalLink className="h-4.5 w-4.5" />
            </a>
          ) : (
            <span 
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700" 
              title="No Official LeetCode Link Available"
            >
              <ExternalLink className="h-4.5 w-4.5" />
            </span>
          )}

          {/* Bookmark Switch */}
          <button 
            onClick={onToggleBookmark} 
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors" 
            title="Bookmark Problem"
          >
            {bookmarked ? (
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 animate-in zoom-in-50 duration-150" />
            ) : (
              <Star className="h-5 w-5 opacity-60 hover:opacity-100" />
            )}
          </button>
        </div>

      </div>
    </li>
  );
}

// Subcomponent: LogicModal (Technical breakdowns)
function LogicModal({ q, onClose }: { q: MasterQuestion | null; onClose: () => void }) {
  return (
    <Dialog open={!!q} onOpenChange={o => !o && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto dialog-scrollbar bg-zinc-950 border-zinc-800/80 p-6 rounded-2xl shadow-2xl text-zinc-100">
        {q && (
          <>
            <DialogHeader className="border-b border-zinc-800/80 pb-4 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <DialogTitle className="text-3xl font-black tracking-tight text-zinc-50">{q.title}</DialogTitle>
                <span className={cn("rounded-md border px-2 py-0.5 text-xs font-bold uppercase", difficultyClass[q.difficulty])}>
                  {q.difficulty}
                </span>
              </div>
              <DialogDescription className="text-sm font-semibold text-zinc-400 mt-1.5 flex items-center gap-2.5 flex-wrap">
                <span>{q.leetcodeNumber !== null ? `LeetCode #${q.leetcodeNumber}` : "No Official LeetCode Problem"}</span>
                <span>•</span>
                <span>Type: {q.mapping === "Exact" ? "Exact Match" : q.mapping === "Closest" ? "Closest Equivalent" : q.mapping === "Concept" ? "Concept Match" : "Conceptual"}</span>
                <span>•</span>
                <span>Topic: {q.topics.join(", ")}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <LogicSection title="Problem Summary" icon={<Activity className="h-5 w-5 text-cyan-400" />} body={q.logic.summary} />
              
              {/* Point-wise Solution Recipe (In place of raw algorithm string) */}
              {renderDetailedApproach(q)}
              
              {/* Pseudo Editor Frame */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400">
                  <Terminal className="h-5 w-5 text-pink-400" />
                  <span>Optimal Pseudocode</span>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 text-zinc-200">
                  {/* Pseudo Editor top bar */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-zinc-900">
                    <span className="text-[12px] font-mono text-zinc-405">pseudocode.txt</span>
                    <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-bold">PSEUDO</span>
                  </div>
                  <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed max-h-52 dialog-scrollbar">
                    <code>{q.logic.pseudocode}</code>
                  </pre>
                </div>
              </div>
              
              <LogicSection title="Algorithmic Dry Run" icon={<RefreshCw className="h-5 w-5 text-emerald-400 animate-spin-slow" />} body={q.logic.dryRun} />
              
              <div className="border-t border-zinc-800/80 pt-4">
                <div className="mb-3.5 text-sm font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span>Key Interview Discussion Points</span>
                </div>
                <ul className="grid gap-3">
                  {q.logic.interviewPoints.map((p, i) => (
                    <li key={i} className="flex gap-3 bg-zinc-900/60 p-3.5 rounded-lg border border-zinc-800/50">
                      <span className="text-emerald-400 font-bold font-mono">▸</span>
                      <span className="text-[15px] sm:text-[16px] text-zinc-300 leading-relaxed font-semibold">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Subcomponent: LogicSection
function LogicSection({ title, icon, body }: { title: string; icon: React.ReactNode; body: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400">
        {icon}
        <span>{title}</span>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4.5 shadow-sm">
        {renderFormattedBody(body)}
      </div>
    </div>
  );
}

// Subcomponent: JavaModal (IDE Simulation)
function JavaModal({ q, onClose }: { q: MasterQuestion | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!q) return;
    navigator.clipboard.writeText(q.java).then(() => {
      setCopied(true);
      toast.success("Java code copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const highlightedHTML = useMemo(() => {
    if (!q) return "";
    return highlightJava(q.java);
  }, [q]);

  return (
    <Dialog open={!!q} onOpenChange={o => !o && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-hidden bg-zinc-955 border-zinc-800 p-0 rounded-2xl shadow-2xl flex flex-col">
        {q && (
          <>
            {/* IDE Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-900 shrink-0">
              <div className="flex items-center gap-6">
                {/* Visual Mac-style window controls */}
                <div className="flex gap-1.5 shrink-0">
                  <div className="h-3 w-3 rounded-full bg-red-500/80 border border-red-600/40" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80 border border-yellow-600/40" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80 border border-green-600/40" />
                </div>
                {/* Active editor file tab */}
                <div className="flex items-center gap-2 border-b-2 border-indigo-500 bg-zinc-950 px-3.5 py-2 text-[13px] text-zinc-300 font-mono rounded-t-md -mb-4 shrink-0">
                  <Code2 className="h-4 w-4 text-orange-505" />
                  <span>{q.title.replace(/[^a-zA-Z0-9]/g, "") || "Solution"}.java</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 font-mono hidden sm:inline">UTF-8</span>
                <Button 
                  size="sm" 
                  onClick={copy}
                  className="h-8.5 px-3.5 bg-zinc-800 text-zinc-200 border border-zinc-700/60 hover:bg-zinc-700 font-bold"
                >
                  {copied ? (
                    <><Check className="mr-1.5 h-4 w-4 text-emerald-550" /> Copied</>
                  ) : (
                    <><Copy className="mr-1.5 h-4 w-4 text-zinc-400" /> Copy Code</>
                  )}
                </Button>
              </div>
            </div>

            {/* Program Subtitle bar */}
            <div className="px-5 py-3 bg-zinc-900/60 border-b border-zinc-800/50 flex justify-between items-center shrink-0">
              <div className="text-[12px] font-mono text-zinc-405">
                <span>Language: </span>
                <span className="text-orange-400 font-bold">Java 17 (SDK)</span>
                <span className="mx-2 text-zinc-700">|</span>
                <span>Complexity: </span>
                <span className="text-pink-400 font-bold font-mono">{q.logic.time}</span>
              </div>
              <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-black">
                COMPILE SECURE
              </span>
            </div>

            {/* Syntax Highlighted Code Viewer with Line Numbers */}
            <div className="flex-1 overflow-auto dialog-scrollbar bg-zinc-950 p-4.5 font-mono text-[14px] sm:text-[15px] leading-relaxed flex">
              {/* Fake line numbers column */}
              <div className="text-zinc-650 text-right pr-4 select-none border-r border-zinc-800/40 text-xs font-mono space-y-0.5 w-8 shrink-0">
                {q.java.split("\n").map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              
              {/* Code text content */}
              <pre className="pl-4 overflow-x-auto w-full select-text text-zinc-250 text-left font-mono">
                <code dangerouslySetInnerHTML={{ __html: highlightedHTML }} />
              </pre>
            </div>
            
            {/* VS Code styled Status Bar */}
            <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-2 text-xs font-mono text-zinc-450 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-650 text-white font-black px-1.5 rounded-sm text-[10px]">READY</span>
                <span>Lines: {q.java.split("\n").length}</span>
              </div>
              <span>Tab Size: 4 Spaces</span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
