export type Sheet = "TCS" | "Blind75" | "NeetCode150";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Mapping = "Exact" | "Closest" | "Concept" | "None";

export interface QuestionLogic {
  summary: string;
  approach: string;
  intuition: string;
  pseudocode: string;
  dryRun: string;
  time: string;
  space: string;
  interviewPoints: string[];
}

export interface MasterQuestion {
  id: string;
  title: string;
  leetcodeNumber: number | null;
  leetcodeTitle: string | null;
  leetcodeUrl: string | null;
  mapping: Mapping;
  difficulty: Difficulty;
  topics: string[];
  sheets: Sheet[];
  logic: QuestionLogic;
  java: string;
}
