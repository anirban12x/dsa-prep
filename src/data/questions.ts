import type { MasterQuestion, Sheet, Difficulty, Mapping, QuestionLogic } from "./types";
import { getSolution } from "./solutions";

// ---- Question factory ----
type Def = {
  lc: number | null;
  title: string;
  diff: Difficulty;
  topics: string[];
  sheets: Sheet[];
  mapping?: Mapping;
  tcsId?: string; // for TCS-only entries
  tcsTitle?: string;
};

const slug = (t: string) =>
  t.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const normalizeTopic = (t: string): string => {
  const clean = t.trim();
  if (clean === "Array" || clean === "Arrays") return "Arrays";
  if (clean === "String" || clean === "Strings") return "Strings";
  if (clean === "Graph" || clean === "Graphs") return "Graphs";
  if (clean === "Tree" || clean === "Trees") return "Trees";
  if (clean === "Map" || clean === "HashMap") return "HashMap";
  if (clean === "Dynamic Programming" || clean === "DP") return "DP";
  return clean;
};

function make(d: Def): MasterQuestion {
  const id = d.lc !== null ? `LC-${d.lc}` : d.tcsId!;
  const displayTitle = d.tcsTitle ?? d.title;
  const sol = getSolution(id, displayTitle, d.topics[0] ?? "General");
  return {
    id,
    title: displayTitle,
    leetcodeNumber: d.lc,
    leetcodeTitle: d.lc !== null ? d.title : null,
    leetcodeUrl: d.lc !== null ? `https://leetcode.com/problems/${slug(d.title)}/` : null,
    mapping: d.mapping ?? "Exact",
    difficulty: d.diff,
    topics: d.topics.map(normalizeTopic),
    sheets: d.sheets,
    logic: sol.logic,
    java: sol.java,
  };
}

// ---- Data ----
// Sheets: B=Blind75, N=NeetCode150, T=TCS
const B: Sheet = "Blind75", N: Sheet = "NeetCode150", T: Sheet = "TCS";

// Merged unique LC problems (Blind75 ∪ NeetCode150) with metadata
const LC_DEFS: Def[] = [
  { lc:1, title:"Two Sum", diff:"Easy", topics:["Array","HashMap"], sheets:[B,N] },
  { lc:2, title:"Add Two Numbers", diff:"Medium", topics:["Linked List","Math"], sheets:[N] },
  { lc:3, title:"Longest Substring Without Repeating Characters", diff:"Medium", topics:["String","Sliding Window","HashMap"], sheets:[B,N] },
  { lc:4, title:"Median of Two Sorted Arrays", diff:"Hard", topics:["Array","Binary Search"], sheets:[N] },
  { lc:5, title:"Longest Palindromic Substring", diff:"Medium", topics:["String","DP"], sheets:[B,N] },
  { lc:7, title:"Reverse Integer", diff:"Medium", topics:["Math"], sheets:[N] },
  { lc:10, title:"Regular Expression Matching", diff:"Hard", topics:["String","DP"], sheets:[N] },
  { lc:11, title:"Container With Most Water", diff:"Medium", topics:["Array","Two Pointers"], sheets:[B,N] },
  { lc:15, title:"3Sum", diff:"Medium", topics:["Array","Two Pointers"], sheets:[B,N] },
  { lc:17, title:"Letter Combinations of a Phone Number", diff:"Medium", topics:["String","Backtracking"], sheets:[N] },
  { lc:19, title:"Remove Nth Node From End of List", diff:"Medium", topics:["Linked List","Two Pointers"], sheets:[B,N] },
  { lc:20, title:"Valid Parentheses", diff:"Easy", topics:["String","Stack"], sheets:[B,N] },
  { lc:21, title:"Merge Two Sorted Lists", diff:"Easy", topics:["Linked List"], sheets:[B,N] },
  { lc:22, title:"Generate Parentheses", diff:"Medium", topics:["String","Backtracking"], sheets:[N] },
  { lc:23, title:"Merge k Sorted Lists", diff:"Hard", topics:["Linked List","Heap"], sheets:[B,N] },
  { lc:25, title:"Reverse Nodes in k-Group", diff:"Hard", topics:["Linked List"], sheets:[N] },
  { lc:33, title:"Search in Rotated Sorted Array", diff:"Medium", topics:["Array","Binary Search"], sheets:[B,N] },
  { lc:36, title:"Valid Sudoku", diff:"Medium", topics:["Array","HashMap","Matrix"], sheets:[N] },
  { lc:39, title:"Combination Sum", diff:"Medium", topics:["Array","Backtracking"], sheets:[B,N] },
  { lc:40, title:"Combination Sum II", diff:"Medium", topics:["Array","Backtracking"], sheets:[N] },
  { lc:42, title:"Trapping Rain Water", diff:"Hard", topics:["Array","Two Pointers","Stack"], sheets:[N] },
  { lc:43, title:"Multiply Strings", diff:"Medium", topics:["String","Math"], sheets:[N] },
  { lc:45, title:"Jump Game II", diff:"Medium", topics:["Array","Greedy"], sheets:[N] },
  { lc:46, title:"Permutations", diff:"Medium", topics:["Array","Backtracking"], sheets:[N] },
  { lc:48, title:"Rotate Image", diff:"Medium", topics:["Array","Matrix"], sheets:[B,N] },
  { lc:49, title:"Group Anagrams", diff:"Medium", topics:["String","HashMap"], sheets:[B,N] },
  { lc:50, title:"Pow(x, n)", diff:"Medium", topics:["Math"], sheets:[N] },
  { lc:51, title:"N-Queens", diff:"Hard", topics:["Backtracking"], sheets:[N] },
  { lc:53, title:"Maximum Subarray", diff:"Medium", topics:["Array","DP"], sheets:[B,N] },
  { lc:54, title:"Spiral Matrix", diff:"Medium", topics:["Array","Matrix"], sheets:[B,N] },
  { lc:55, title:"Jump Game", diff:"Medium", topics:["Array","Greedy","DP"], sheets:[B,N] },
  { lc:56, title:"Merge Intervals", diff:"Medium", topics:["Array","Sorting"], sheets:[B,N] },
  { lc:57, title:"Insert Interval", diff:"Medium", topics:["Array"], sheets:[B,N] },
  { lc:62, title:"Unique Paths", diff:"Medium", topics:["Matrix","DP"], sheets:[B,N] },
  { lc:66, title:"Plus One", diff:"Easy", topics:["Array","Math"], sheets:[N] },
  { lc:70, title:"Climbing Stairs", diff:"Easy", topics:["DP"], sheets:[B,N] },
  { lc:72, title:"Edit Distance", diff:"Medium", topics:["String","DP"], sheets:[N] },
  { lc:73, title:"Set Matrix Zeroes", diff:"Medium", topics:["Array","Matrix"], sheets:[B,N] },
  { lc:74, title:"Search a 2D Matrix", diff:"Medium", topics:["Matrix","Binary Search"], sheets:[N] },
  { lc:76, title:"Minimum Window Substring", diff:"Hard", topics:["String","Sliding Window","HashMap"], sheets:[B,N] },
  { lc:78, title:"Subsets", diff:"Medium", topics:["Array","Backtracking"], sheets:[N] },
  { lc:79, title:"Word Search", diff:"Medium", topics:["Matrix","Backtracking"], sheets:[B,N] },
  { lc:84, title:"Largest Rectangle in Histogram", diff:"Hard", topics:["Stack","Array"], sheets:[N] },
  { lc:90, title:"Subsets II", diff:"Medium", topics:["Array","Backtracking"], sheets:[N] },
  { lc:91, title:"Decode Ways", diff:"Medium", topics:["String","DP"], sheets:[B,N] },
  { lc:97, title:"Interleaving String", diff:"Medium", topics:["String","DP"], sheets:[N] },
  { lc:98, title:"Validate Binary Search Tree", diff:"Medium", topics:["Trees"], sheets:[B,N] },
  { lc:100, title:"Same Tree", diff:"Easy", topics:["Trees"], sheets:[B,N] },
  { lc:102, title:"Binary Tree Level Order Traversal", diff:"Medium", topics:["Trees","BFS"], sheets:[B,N] },
  { lc:104, title:"Maximum Depth of Binary Tree", diff:"Easy", topics:["Trees","DFS"], sheets:[B,N] },
  { lc:105, title:"Construct Binary Tree from Preorder and Inorder Traversal", diff:"Medium", topics:["Trees"], sheets:[B,N] },
  { lc:110, title:"Balanced Binary Tree", diff:"Easy", topics:["Trees"], sheets:[N] },
  { lc:115, title:"Distinct Subsequences", diff:"Hard", topics:["String","DP"], sheets:[N] },
  { lc:121, title:"Best Time to Buy and Sell Stock", diff:"Easy", topics:["Array","DP"], sheets:[B,N] },
  { lc:124, title:"Binary Tree Maximum Path Sum", diff:"Hard", topics:["Trees","DP"], sheets:[B,N] },
  { lc:125, title:"Valid Palindrome", diff:"Easy", topics:["String","Two Pointers"], sheets:[B,N] },
  { lc:127, title:"Word Ladder", diff:"Hard", topics:["String","BFS","Graphs"], sheets:[N] },
  { lc:128, title:"Longest Consecutive Sequence", diff:"Medium", topics:["Array","HashMap"], sheets:[B,N] },
  { lc:130, title:"Surrounded Regions", diff:"Medium", topics:["Matrix","DFS"], sheets:[N] },
  { lc:131, title:"Palindrome Partitioning", diff:"Medium", topics:["String","Backtracking","DP"], sheets:[N] },
  { lc:133, title:"Clone Graph", diff:"Medium", topics:["Graphs","DFS"], sheets:[B,N] },
  { lc:134, title:"Gas Station", diff:"Medium", topics:["Array","Greedy"], sheets:[N] },
  { lc:136, title:"Single Number", diff:"Easy", topics:["Array","Bit Manipulation"], sheets:[N] },
  { lc:138, title:"Copy List with Random Pointer", diff:"Medium", topics:["Linked List","HashMap"], sheets:[N] },
  { lc:139, title:"Word Break", diff:"Medium", topics:["String","DP"], sheets:[B,N] },
  { lc:141, title:"Linked List Cycle", diff:"Easy", topics:["Linked List","Two Pointers"], sheets:[B,N] },
  { lc:143, title:"Reorder List", diff:"Medium", topics:["Linked List"], sheets:[B,N] },
  { lc:146, title:"LRU Cache", diff:"Medium", topics:["Design","Linked List","HashMap"], sheets:[N] },
  { lc:150, title:"Evaluate Reverse Polish Notation", diff:"Medium", topics:["Stack"], sheets:[N] },
  { lc:152, title:"Maximum Product Subarray", diff:"Medium", topics:["Array","DP"], sheets:[B,N] },
  { lc:153, title:"Find Minimum in Rotated Sorted Array", diff:"Medium", topics:["Array","Binary Search"], sheets:[B,N] },
  { lc:155, title:"Min Stack", diff:"Medium", topics:["Stack","Design"], sheets:[N] },
  { lc:167, title:"Two Sum II - Input Array Is Sorted", diff:"Medium", topics:["Array","Two Pointers"], sheets:[N] },
  { lc:190, title:"Reverse Bits", diff:"Easy", topics:["Bit Manipulation"], sheets:[B,N] },
  { lc:191, title:"Number of 1 Bits", diff:"Easy", topics:["Bit Manipulation"], sheets:[B,N] },
  { lc:198, title:"House Robber", diff:"Medium", topics:["Array","DP"], sheets:[B,N] },
  { lc:199, title:"Binary Tree Right Side View", diff:"Medium", topics:["Trees","BFS"], sheets:[N] },
  { lc:200, title:"Number of Islands", diff:"Medium", topics:["Matrix","DFS","BFS"], sheets:[B,N] },
  { lc:202, title:"Happy Number", diff:"Easy", topics:["Math","HashMap"], sheets:[N] },
  { lc:206, title:"Reverse Linked List", diff:"Easy", topics:["Linked List"], sheets:[B,N] },
  { lc:207, title:"Course Schedule", diff:"Medium", topics:["Graphs","DFS"], sheets:[B,N] },
  { lc:208, title:"Implement Trie (Prefix Tree)", diff:"Medium", topics:["Trie","Design"], sheets:[B,N] },
  { lc:210, title:"Course Schedule II", diff:"Medium", topics:["Graphs","DFS"], sheets:[N] },
  { lc:211, title:"Design Add and Search Words Data Structure", diff:"Medium", topics:["Trie","Design"], sheets:[B,N] },
  { lc:212, title:"Word Search II", diff:"Hard", topics:["Trie","Backtracking","Matrix"], sheets:[B,N] },
  { lc:213, title:"House Robber II", diff:"Medium", topics:["Array","DP"], sheets:[B,N] },
  { lc:215, title:"Kth Largest Element in an Array", diff:"Medium", topics:["Array","Heap"], sheets:[N] },
  { lc:217, title:"Contains Duplicate", diff:"Easy", topics:["Array","HashMap"], sheets:[B,N] },
  { lc:226, title:"Invert Binary Tree", diff:"Easy", topics:["Trees"], sheets:[B,N] },
  { lc:230, title:"Kth Smallest Element in a BST", diff:"Medium", topics:["Trees"], sheets:[B,N] },
  { lc:235, title:"Lowest Common Ancestor of a Binary Search Tree", diff:"Medium", topics:["Trees"], sheets:[B,N] },
  { lc:238, title:"Product of Array Except Self", diff:"Medium", topics:["Array"], sheets:[B,N] },
  { lc:239, title:"Sliding Window Maximum", diff:"Hard", topics:["Array","Sliding Window","Queue"], sheets:[N] },
  { lc:242, title:"Valid Anagram", diff:"Easy", topics:["String","HashMap"], sheets:[B,N] },
  { lc:252, title:"Meeting Rooms", diff:"Easy", topics:["Array","Sorting"], sheets:[B,N] },
  { lc:253, title:"Meeting Rooms II", diff:"Medium", topics:["Array","Heap"], sheets:[B,N] },
  { lc:261, title:"Graph Valid Tree", diff:"Medium", topics:["Graphs","Union Find"], sheets:[B,N] },
  { lc:268, title:"Missing Number", diff:"Easy", topics:["Array","Math","Bit Manipulation"], sheets:[B,N] },
  { lc:269, title:"Alien Dictionary", diff:"Hard", topics:["Graphs","Topological Sort"], sheets:[B,N] },
  { lc:271, title:"Encode and Decode Strings", diff:"Medium", topics:["String","Design"], sheets:[B,N] },
  { lc:286, title:"Walls and Gates", diff:"Medium", topics:["Matrix","BFS"], sheets:[N] },
  { lc:287, title:"Find the Duplicate Number", diff:"Medium", topics:["Array","Two Pointers"], sheets:[N] },
  { lc:295, title:"Find Median from Data Stream", diff:"Hard", topics:["Heap","Design"], sheets:[B,N] },
  { lc:297, title:"Serialize and Deserialize Binary Tree", diff:"Hard", topics:["Trees","Design"], sheets:[B,N] },
  { lc:300, title:"Longest Increasing Subsequence", diff:"Medium", topics:["Array","DP"], sheets:[B,N] },
  { lc:309, title:"Best Time to Buy and Sell Stock with Cooldown", diff:"Medium", topics:["Array","DP"], sheets:[N] },
  { lc:312, title:"Burst Balloons", diff:"Hard", topics:["Array","DP"], sheets:[N] },
  { lc:322, title:"Coin Change", diff:"Medium", topics:["Array","DP"], sheets:[B,N] },
  { lc:323, title:"Number of Connected Components in an Undirected Graph", diff:"Medium", topics:["Graphs","Union Find"], sheets:[B,N] },
  { lc:329, title:"Longest Increasing Path in a Matrix", diff:"Hard", topics:["Matrix","DFS","DP"], sheets:[N] },
  { lc:332, title:"Reconstruct Itinerary", diff:"Hard", topics:["Graphs","DFS"], sheets:[N] },
  { lc:338, title:"Counting Bits", diff:"Easy", topics:["Bit Manipulation","DP"], sheets:[B,N] },
  { lc:347, title:"Top K Frequent Elements", diff:"Medium", topics:["Array","Heap","HashMap"], sheets:[B,N] },
  { lc:355, title:"Design Twitter", diff:"Medium", topics:["Design","Heap"], sheets:[N] },
  { lc:371, title:"Sum of Two Integers", diff:"Medium", topics:["Bit Manipulation"], sheets:[B,N] },
  { lc:416, title:"Partition Equal Subset Sum", diff:"Medium", topics:["Array","DP"], sheets:[N] },
  { lc:417, title:"Pacific Atlantic Water Flow", diff:"Medium", topics:["Matrix","DFS"], sheets:[B,N] },
  { lc:424, title:"Longest Repeating Character Replacement", diff:"Medium", topics:["String","Sliding Window"], sheets:[B,N] },
  { lc:435, title:"Non-overlapping Intervals", diff:"Medium", topics:["Array","Greedy"], sheets:[B,N] },
  { lc:494, title:"Target Sum", diff:"Medium", topics:["Array","DP"], sheets:[N] },
  { lc:518, title:"Coin Change II", diff:"Medium", topics:["Array","DP"], sheets:[N] },
  { lc:543, title:"Diameter of Binary Tree", diff:"Easy", topics:["Trees"], sheets:[N] },
  { lc:567, title:"Permutation in String", diff:"Medium", topics:["String","Sliding Window"], sheets:[N] },
  { lc:572, title:"Subtree of Another Tree", diff:"Easy", topics:["Trees"], sheets:[B,N] },
  { lc:621, title:"Task Scheduler", diff:"Medium", topics:["Array","Heap","Greedy"], sheets:[N] },
  { lc:647, title:"Palindromic Substrings", diff:"Medium", topics:["String","DP"], sheets:[B,N] },
  { lc:678, title:"Valid Parenthesis String", diff:"Medium", topics:["String","Stack","Greedy"], sheets:[N] },
  { lc:684, title:"Redundant Connection", diff:"Medium", topics:["Graphs","Union Find"], sheets:[N] },
  { lc:695, title:"Max Area of Island", diff:"Medium", topics:["Matrix","DFS"], sheets:[N] },
  { lc:703, title:"Kth Largest Element in a Stream", diff:"Easy", topics:["Heap","Design"], sheets:[N] },
  { lc:704, title:"Binary Search", diff:"Easy", topics:["Array","Binary Search"], sheets:[N] },
  { lc:739, title:"Daily Temperatures", diff:"Medium", topics:["Array","Stack"], sheets:[N] },
  { lc:743, title:"Network Delay Time", diff:"Medium", topics:["Graphs","Heap"], sheets:[N] },
  { lc:746, title:"Min Cost Climbing Stairs", diff:"Easy", topics:["Array","DP"], sheets:[N] },
  { lc:763, title:"Partition Labels", diff:"Medium", topics:["String","Greedy","HashMap"], sheets:[N] },
  { lc:778, title:"Swim in Rising Water", diff:"Hard", topics:["Matrix","Binary Search","Heap"], sheets:[N] },
  { lc:787, title:"Cheapest Flights Within K Stops", diff:"Medium", topics:["Graphs","DP"], sheets:[N] },
  { lc:846, title:"Hand of Straights", diff:"Medium", topics:["Array","Greedy","Heap"], sheets:[N] },
  { lc:853, title:"Car Fleet", diff:"Medium", topics:["Array","Stack"], sheets:[N] },
  { lc:875, title:"Koko Eating Bananas", diff:"Medium", topics:["Array","Binary Search"], sheets:[N] },
  { lc:973, title:"K Closest Points to Origin", diff:"Medium", topics:["Array","Heap"], sheets:[N] },
  { lc:981, title:"Time Based Key-Value Store", diff:"Medium", topics:["Design","Binary Search"], sheets:[N] },
  { lc:994, title:"Rotting Oranges", diff:"Medium", topics:["Matrix","BFS"], sheets:[N] },
  { lc:1046, title:"Last Stone Weight", diff:"Easy", topics:["Array","Heap"], sheets:[N] },
  { lc:1143, title:"Longest Common Subsequence", diff:"Medium", topics:["String","DP"], sheets:[B,N] },
  { lc:1448, title:"Count Good Nodes in Binary Tree", diff:"Medium", topics:["Trees","DFS"], sheets:[N] },
  { lc:1584, title:"Min Cost to Connect All Points", diff:"Medium", topics:["Graphs","Union Find"], sheets:[N] },
  { lc:1851, title:"Minimum Interval to Include Each Query", diff:"Hard", topics:["Array","Heap","Sorting"], sheets:[N] },
  { lc:1899, title:"Merge Triplets to Form Target Triplet", diff:"Medium", topics:["Array","Greedy"], sheets:[N] },
  { lc:2013, title:"Detect Squares", diff:"Medium", topics:["Design","HashMap"], sheets:[N] },
];

// ---- TCS problems: mapped to closest LeetCode concept ----
// Format: [tcs order-key, tcs-friendly title, closest LC#, LC title, mapping]
// tcsId keeps them unique when LC is duplicated by an already-existing entry.
type Tcs = { tcsId: string; tcsTitle: string; lc: number | null; lcTitle?: string; diff: Difficulty; topics: string[]; mapping: Mapping };

const TCS_DEFS: Tcs[] = [
  // Arrays
  { tcsId:"TCS-A01", tcsTitle:"Find the smallest number in an array", lc:null, diff:"Easy", topics:["Arrays"], mapping:"Concept" },
  { tcsId:"TCS-A02", tcsTitle:"Find the largest number in an array", lc:null, diff:"Easy", topics:["Arrays"], mapping:"Concept" },
  { tcsId:"TCS-A03", tcsTitle:"Second Smallest and Second Largest element in an array", lc:null, diff:"Easy", topics:["Arrays"], mapping:"Concept" },
  { tcsId:"TCS-A04", tcsTitle:"Reverse a given array", lc:344, lcTitle:"Reverse String", diff:"Easy", topics:["Arrays","Two Pointers"], mapping:"Closest" },
  { tcsId:"TCS-A05", tcsTitle:"Count frequency of each element in an array", lc:null, diff:"Easy", topics:["Arrays","HashMap"], mapping:"Concept" },
  { tcsId:"TCS-A06", tcsTitle:"Rearrange array in increasing-decreasing order", lc:null, diff:"Medium", topics:["Arrays","Sorting"], mapping:"Concept" },
  { tcsId:"TCS-A07", tcsTitle:"Sum of elements of the array", lc:null, diff:"Easy", topics:["Arrays"], mapping:"Concept" },
  { tcsId:"TCS-A08", tcsTitle:"Rotate array by K elements (Block Swap)", lc:189, lcTitle:"Rotate Array", diff:"Medium", topics:["Arrays"], mapping:"Exact" },
  { tcsId:"TCS-A09", tcsTitle:"Average of all elements in an array", lc:null, diff:"Easy", topics:["Arrays"], mapping:"Concept" },
  { tcsId:"TCS-A10", tcsTitle:"Find the median of the given array", lc:null, diff:"Easy", topics:["Arrays","Sorting"], mapping:"Concept" },
  { tcsId:"TCS-A11", tcsTitle:"Remove duplicates from a sorted array", lc:26, lcTitle:"Remove Duplicates from Sorted Array", diff:"Easy", topics:["Arrays","Two Pointers"], mapping:"Exact" },
  { tcsId:"TCS-A12", tcsTitle:"Remove duplicates from an unsorted array", lc:null, diff:"Easy", topics:["Arrays","HashMap"], mapping:"Concept" },
  { tcsId:"TCS-A13", tcsTitle:"Adding element in an array", lc:null, diff:"Easy", topics:["Arrays"], mapping:"Concept" },
  { tcsId:"TCS-A14", tcsTitle:"Find all repeating elements in an array", lc:442, lcTitle:"Find All Duplicates in an Array", diff:"Medium", topics:["Arrays","HashMap"], mapping:"Closest" },
  { tcsId:"TCS-A15", tcsTitle:"Find all non-repeating elements in an array", lc:null, diff:"Easy", topics:["Arrays","HashMap"], mapping:"Concept" },
  { tcsId:"TCS-A16", tcsTitle:"Find all symmetric pairs in array", lc:null, diff:"Medium", topics:["Arrays","HashMap"], mapping:"Concept" },
  { tcsId:"TCS-A17", tcsTitle:"Maximum product subarray in an array", lc:152, lcTitle:"Maximum Product Subarray", diff:"Medium", topics:["Arrays","DP"], mapping:"Exact" },
  { tcsId:"TCS-A18", tcsTitle:"Replace each element of the array by its rank", lc:1331, lcTitle:"Rank Transform of an Array", diff:"Easy", topics:["Arrays","Sorting"], mapping:"Exact" },
  { tcsId:"TCS-A19", tcsTitle:"Sorting elements of an array by frequency", lc:1636, lcTitle:"Sort Array by Increasing Frequency", diff:"Easy", topics:["Arrays","Sorting"], mapping:"Closest" },
  { tcsId:"TCS-A20", tcsTitle:"Rotation of elements of array - left and right", lc:189, lcTitle:"Rotate Array", diff:"Medium", topics:["Arrays"], mapping:"Exact" },
  { tcsId:"TCS-A21", tcsTitle:"Finding equilibrium index of an array", lc:724, lcTitle:"Find Pivot Index", diff:"Easy", topics:["Arrays"], mapping:"Exact" },
  { tcsId:"TCS-A22", tcsTitle:"Circular rotation of an array by K positions", lc:189, lcTitle:"Rotate Array", diff:"Medium", topics:["Arrays"], mapping:"Exact" },
  { tcsId:"TCS-A23", tcsTitle:"Sort an array according to the order defined by another", lc:1122, lcTitle:"Relative Sort Array", diff:"Easy", topics:["Arrays","Sorting"], mapping:"Exact" },
  { tcsId:"TCS-A24", tcsTitle:"Search an element in an array", lc:704, lcTitle:"Binary Search", diff:"Easy", topics:["Arrays","Searching"], mapping:"Closest" },
  { tcsId:"TCS-A25", tcsTitle:"Check if array is a subset of another array", lc:null, diff:"Easy", topics:["Arrays","HashMap"], mapping:"Concept" },
  // Numbers
  { tcsId:"TCS-N01", tcsTitle:"Check if a number is palindrome", lc:9, lcTitle:"Palindrome Number", diff:"Easy", topics:["Math"], mapping:"Exact" },
  { tcsId:"TCS-N02", tcsTitle:"Find all palindrome numbers in a given range", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N03", tcsTitle:"Check if a number is prime", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N04", tcsTitle:"Prime numbers in a given range", lc:204, lcTitle:"Count Primes", diff:"Medium", topics:["Math"], mapping:"Closest" },
  { tcsId:"TCS-N05", tcsTitle:"Check if a number is Armstrong number", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N06", tcsTitle:"Check if a number is perfect number", lc:507, lcTitle:"Perfect Number", diff:"Easy", topics:["Math"], mapping:"Exact" },
  { tcsId:"TCS-N07", tcsTitle:"Even or Odd", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N08", tcsTitle:"Check whether a number is positive or negative", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N09", tcsTitle:"Sum of first N natural numbers", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N10", tcsTitle:"Find sum of AP series", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N11", tcsTitle:"Find sum of GP series", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N12", tcsTitle:"Greatest of two numbers", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N13", tcsTitle:"Greatest of three numbers", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N14", tcsTitle:"Leap year or not", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N15", tcsTitle:"Reverse digits of a number", lc:7, lcTitle:"Reverse Integer", diff:"Medium", topics:["Math"], mapping:"Exact" },
  { tcsId:"TCS-N16", tcsTitle:"Maximum and Minimum digit in a number", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N17", tcsTitle:"Print Fibonacci up to Nth Term", lc:509, lcTitle:"Fibonacci Number", diff:"Easy", topics:["Math","DP"], mapping:"Exact" },
  { tcsId:"TCS-N18", tcsTitle:"Factorial of a number", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N19", tcsTitle:"Power of a number", lc:50, lcTitle:"Pow(x, n)", diff:"Medium", topics:["Math"], mapping:"Exact" },
  { tcsId:"TCS-N20", tcsTitle:"Factors of a given number", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N21", tcsTitle:"Print all prime factors of the given number", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N22", tcsTitle:"Check if a number is a strong number", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N23", tcsTitle:"Check if a number is Automorphic", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N24", tcsTitle:"GCD of two numbers", lc:1071, lcTitle:"Greatest Common Divisor of Strings", diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N25", tcsTitle:"LCM of two numbers", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N26", tcsTitle:"Check if a number is Harshad number", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N27", tcsTitle:"Check if a number is abundant number", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N28", tcsTitle:"Sum of digits of a number", lc:258, lcTitle:"Add Digits", diff:"Easy", topics:["Math"], mapping:"Closest" },
  { tcsId:"TCS-N29", tcsTitle:"Sum of numbers in the given range", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N30", tcsTitle:"Permutations of N people in R seats", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N31", tcsTitle:"Add two fractions", lc:592, lcTitle:"Fraction Addition and Subtraction", diff:"Medium", topics:["Math"], mapping:"Closest" },
  { tcsId:"TCS-N32", tcsTitle:"Replace all 0s with 1s in a given integer", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N33", tcsTitle:"Can a number be expressed as sum of two primes", lc:null, diff:"Medium", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N34", tcsTitle:"Calculate the area of a circle", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-N35", tcsTitle:"Find roots of a Quadratic Equation", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  // Number System
  { tcsId:"TCS-NS01", tcsTitle:"Convert Binary to Decimal", lc:null, diff:"Easy", topics:["Math","Bit Manipulation"], mapping:"Concept" },
  { tcsId:"TCS-NS02", tcsTitle:"Convert Binary to Octal", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-NS03", tcsTitle:"Convert Decimal to Binary", lc:null, diff:"Easy", topics:["Math","Bit Manipulation"], mapping:"Concept" },
  { tcsId:"TCS-NS04", tcsTitle:"Convert Decimal to Octal", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-NS05", tcsTitle:"Convert Octal to Binary", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-NS06", tcsTitle:"Convert Octal to Decimal", lc:null, diff:"Easy", topics:["Math"], mapping:"Concept" },
  { tcsId:"TCS-NS07", tcsTitle:"Convert digits/numbers to words", lc:273, lcTitle:"Integer to English Words", diff:"Hard", topics:["Math","String"], mapping:"Exact" },
  // Sorting
  { tcsId:"TCS-S01", tcsTitle:"Bubble Sort Algorithm", lc:null, diff:"Easy", topics:["Sorting"], mapping:"Concept" },
  { tcsId:"TCS-S02", tcsTitle:"Selection Sort Algorithm", lc:null, diff:"Easy", topics:["Sorting"], mapping:"Concept" },
  { tcsId:"TCS-S03", tcsTitle:"Insertion Sort Algorithm", lc:null, diff:"Easy", topics:["Sorting"], mapping:"Concept" },
  { tcsId:"TCS-S04", tcsTitle:"Quick Sort Algorithm", lc:912, lcTitle:"Sort an Array", diff:"Medium", topics:["Sorting"], mapping:"Concept" },
  { tcsId:"TCS-S05", tcsTitle:"Merge Sort Algorithm", lc:912, lcTitle:"Sort an Array", diff:"Medium", topics:["Sorting"], mapping:"Concept" },
  // Strings
  { tcsId:"TCS-ST01", tcsTitle:"Check if a given string is palindrome", lc:125, lcTitle:"Valid Palindrome", diff:"Easy", topics:["String","Two Pointers"], mapping:"Closest" },
  { tcsId:"TCS-ST02", tcsTitle:"Count vowels, consonants, spaces in String", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST03", tcsTitle:"Find the ASCII value of a character", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST04", tcsTitle:"Remove all vowels from the string", lc:1119, lcTitle:"Remove Vowels from a String", diff:"Easy", topics:["String"], mapping:"Exact" },
  { tcsId:"TCS-ST05", tcsTitle:"Remove spaces from a string", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST06", tcsTitle:"Remove characters from a string except alphabets", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST07", tcsTitle:"Reverse a String", lc:344, lcTitle:"Reverse String", diff:"Easy", topics:["String","Two Pointers"], mapping:"Exact" },
  { tcsId:"TCS-ST08", tcsTitle:"Remove brackets from an algebraic expression", lc:1021, lcTitle:"Remove Outermost Parentheses", diff:"Easy", topics:["String","Stack"], mapping:"Closest" },
  { tcsId:"TCS-ST09", tcsTitle:"Sum of the numbers in a String", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST10", tcsTitle:"Capitalize first and last character of each word", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST11", tcsTitle:"Calculate frequency of characters in a string", lc:null, diff:"Easy", topics:["String","HashMap"], mapping:"Concept" },
  { tcsId:"TCS-ST12", tcsTitle:"Find non-repeating characters of a String", lc:387, lcTitle:"First Unique Character in a String", diff:"Easy", topics:["String","HashMap"], mapping:"Closest" },
  { tcsId:"TCS-ST13", tcsTitle:"Check if two strings are anagram of each other", lc:242, lcTitle:"Valid Anagram", diff:"Easy", topics:["String","HashMap"], mapping:"Exact" },
  { tcsId:"TCS-ST14", tcsTitle:"Count common sub-sequence in two strings", lc:1143, lcTitle:"Longest Common Subsequence", diff:"Medium", topics:["String","DP"], mapping:"Closest" },
  { tcsId:"TCS-ST15", tcsTitle:"Wildcard string match", lc:44, lcTitle:"Wildcard Matching", diff:"Hard", topics:["String","DP"], mapping:"Exact" },
  { tcsId:"TCS-ST16", tcsTitle:"Return maximum occurring character in the input string", lc:null, diff:"Easy", topics:["String","HashMap"], mapping:"Concept" },
  { tcsId:"TCS-ST17", tcsTitle:"Remove all duplicates from the input string", lc:1047, lcTitle:"Remove All Adjacent Duplicates In String", diff:"Easy", topics:["String","Stack"], mapping:"Closest" },
  { tcsId:"TCS-ST18", tcsTitle:"Print all duplicates in the input string", lc:null, diff:"Easy", topics:["String","HashMap"], mapping:"Concept" },
  { tcsId:"TCS-ST19", tcsTitle:"Remove characters from first string present in second string", lc:null, diff:"Easy", topics:["String","HashMap"], mapping:"Concept" },
  { tcsId:"TCS-ST20", tcsTitle:"Change every letter with next lexicographic alphabet", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST21", tcsTitle:"Find the largest word in a given string", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST22", tcsTitle:"Sort characters in a string", lc:null, diff:"Easy", topics:["String","Sorting"], mapping:"Concept" },
  { tcsId:"TCS-ST23", tcsTitle:"Count number of words in a given string", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST24", tcsTitle:"Find word with highest number of repeated letters", lc:null, diff:"Easy", topics:["String","HashMap"], mapping:"Concept" },
  { tcsId:"TCS-ST25", tcsTitle:"Change case of each character in a string", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST26", tcsTitle:"Concatenate one string to another", lc:null, diff:"Easy", topics:["String"], mapping:"Concept" },
  { tcsId:"TCS-ST27", tcsTitle:"Find substring within a string with starting position", lc:28, lcTitle:"Find the Index of the First Occurrence in a String", diff:"Easy", topics:["String"], mapping:"Exact" },
  { tcsId:"TCS-ST28", tcsTitle:"Reverse words in a string", lc:151, lcTitle:"Reverse Words in a String", diff:"Medium", topics:["String"], mapping:"Exact" },
];

// ---- Build master list ----
// LC entries first
const lcQuestions: MasterQuestion[] = LC_DEFS.map(make);

// TCS entries — add TCS sheet; if LC matches an existing LC question, extend that question's sheets instead of creating a duplicate row
const tcsExtras: MasterQuestion[] = [];
for (const t of TCS_DEFS) {
  if (t.lc !== null) {
    const existing = lcQuestions.find(q => q.leetcodeNumber === t.lc);
    if (existing) {
      if (!existing.sheets.includes(T)) existing.sheets.push(T);
      // Still keep a TCS-specific alias for search? No — dedupe: single canonical row.
      continue;
    }
    // LC not in Blind75/NC150; create a new LC-based master question with TCS sheet
    tcsExtras.push(make({
      lc: t.lc,
      title: t.lcTitle ?? t.tcsTitle,
      diff: t.diff,
      topics: t.topics,
      sheets: [T],
      mapping: t.mapping,
    }));
  } else {
    // No official LC — create TCS-only entry
    tcsExtras.push(make({
      lc: null,
      title: t.tcsTitle,
      diff: t.diff,
      topics: t.topics,
      sheets: [T],
      mapping: "None",
      tcsId: t.tcsId,
      tcsTitle: t.tcsTitle,
    }));
  }
}

export const QUESTIONS: MasterQuestion[] = [...lcQuestions, ...tcsExtras];

export const ALL_TOPICS: string[] = Array.from(
  new Set(QUESTIONS.flatMap(q => q.topics))
).sort();

export const SHEET_LABEL: Record<Sheet, string> = {
  TCS: "TCS",
  Blind75: "Blind75",
  NeetCode150: "NeetCode150",
};
