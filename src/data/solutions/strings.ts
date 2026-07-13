import type { QuestionLogic } from "../types";

export const STRING_SOLUTIONS: Record<string, { logic: QuestionLogic; java: string }> = {
  "LC-3": {
    logic: {
      summary: "Given a string s, find the length of the longest substring without repeating characters.",
      approach: "Sliding window using a HashMap or array. Maintain left and right pointers. Store the last seen index of each character to instantly jump the left pointer when a duplicate is found.",
      intuition: "Instead of moving left pointer step-by-step, we can record the index of characters. If s[r] was seen at index index, we set left = max(left, index + 1).",
      pseudocode: "left = 0, maxLen = 0\nlastSeen = Map()\nfor right from 0 to n-1:\n  c = s[right]\n  if c in lastSeen:\n    left = max(left, lastSeen[c] + 1)\n  lastSeen[c] = right\n  maxLen = max(maxLen, right - left + 1)\nreturn maxLen",
      dryRun: "s = 'abcabcbb'\nr=0: 'a'. map={a:0}, maxLen=1\nr=1: 'b'. map={a:0, b:1}, maxLen=2\r=2: 'c'. map={a:0, b:1, c:2}, maxLen=3\nr=3: 'a'. 'a' in map (index 0). left=1. map={a:3, b:1, c:2}, maxLen=3\nContinues, returns 3.",
      time: "O(n)",
      space: "O(min(m, n)) where m is alphabet size",
      interviewPoints: ["Clarify alphabet size (ASCII vs Unicode)", "Explain why sliding window is O(n) rather than O(n^2)", "Explain how the lookup table optimizes pointer jumping"]
    },
    java: `import java.util.*;

public class LongestSubstring {
    public static int lengthOfLongestSubstring(String s) {
        int n = s.length(), ans = 0;
        Map<Character, Integer> map = new HashMap<>();
        for (int j = 0, i = 0; j < n; j++) {
            if (map.containsKey(s.charAt(j))) {
                i = Math.max(map.get(s.charAt(j)) + 1, i);
            }
            ans = Math.max(ans, j - i + 1);
            map.put(s.charAt(j), j);
        }
        return ans;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: ");
        String s = sc.nextLine();
        System.out.println("Longest substring length: " + lengthOfLongestSubstring(s));
        sc.close();
    }
}`
  },
  "LC-5": {
    logic: {
      summary: "Given a string s, return the longest palindromic substring in s.",
      approach: "Expand around center. A palindrome has symmetry. For each character (and between each character), expand outward checking if left and right characters match.",
      intuition: "There are 2n-1 possible centers of palindromes (n single character centers and n-1 between character centers). Expanding from center takes O(n) worst case, total O(n^2) time.",
      pseudocode: "start = 0, end = 0\nfor i from 0 to n-1:\n  len1 = expand(s, i, i)\n  len2 = expand(s, i, i+1)\n  len = max(len1, len2)\n  if len > end - start:\n    start = i - (len - 1)/2\n    end = i + len/2\nreturn s[start..end]",
      dryRun: "s = 'babad'\ni=0 ('b'): expand(0,0)->'b'. expand(0,1)->''\ni=1 ('a'): expand(1,1)->'bab'. expand(1,2)->''\nUpdates start and end for longest palindrome. Returns 'bab' (or 'aba').",
      time: "O(n^2)",
      space: "O(1)",
      interviewPoints: ["Mention Manacher's Algorithm for O(n) solution (usually too complex for interviews but good to know).", "Discuss DP approach which is O(n^2) time and O(n^2) space."]
    },
    java: `import java.util.*;

public class LongestPalindromicSubstring {
    public static String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private static int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: ");
        String s = sc.next();
        System.out.println("Longest palindrome: " + longestPalindrome(s));
        sc.close();
    }
}`
  },
  "LC-20": {
    logic: {
      summary: "Determine if a string of brackets is valid.",
      approach: "Use a Deque as a Stack. Push opening brackets; on finding a closing bracket, pop the top of stack and verify if it matches. Return true if stack is empty at the end.",
      intuition: "Bracket matching operates in a Last-In-First-Out (LIFO) order. The most recently opened bracket must be closed first.",
      pseudocode: "stack = Stack()\nfor char c in s:\n  if c is opener: stack.push(c)\n  else:\n    if stack.isEmpty or top doesn't match c: return false\n    stack.pop()\nreturn stack.isEmpty",
      dryRun: "s = '([])'\nPush '(', stack = ['(']\nPush '[', stack = ['(', '[']\nRead ']'. Matches '[' -> pop. stack = ['(']\nRead ')'. Matches '(' -> pop. stack = []. Returns true.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: ["Handle empty input strings", "Odd string length check as O(1) optimization", "Discuss array-based custom stacks for performance"]
    },
    java: `import java.util.*;

public class ValidParentheses {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == ']' && top != '[') return false;
                if (c == '}' && top != '{') return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter brackets: ");
        String s = sc.nextLine();
        System.out.println("Is valid? " + isValid(s));
        sc.close();
    }
}`
  },

  "TCS-ST02": {
    logic: {
      summary: "Count the number of vowels, consonants, and spaces in a string.",
      approach: "Iterate through the string, check if character is a vowel, consonant (alphabet other than vowel), or space, and increment respective counters.",
      intuition: "Single pass character scanning.",
      pseudocode: "v = 0, c = 0, s = 0\nfor char in string:\n  if vowel: v++\n  else if letter: c++\n  else if whitespace: s++",
      dryRun: "str = 'hello world'\nCounts vowels (e, o -> 2), consonants (h, l, l, w, r, l, d -> 8), spaces (1).",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Handle capital letters", "Handling digits and special symbols (which are neither vowels nor consonants)."]
    },
    java: `import java.util.*;

public class CountVowelsConsonants {
    public static void count(String str) {
        int vowels = 0, consonants = 0, spaces = 0;
        str = str.toLowerCase();
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                vowels++;
            } else if (ch >= 'a' && ch <= 'z') {
                consonants++;
            } else if (ch == ' ') {
                spaces++;
            }
        }
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
        System.out.println("Spaces: " + spaces);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter line: ");
        String s = sc.nextLine();
        count(s);
        sc.close();
    }
}`
  },
  "TCS-ST03": {
    logic: {
      summary: "Find the ASCII value of a character.",
      approach: "Cast character to an integer in Java.",
      intuition: "Characters are stored internally as numeric code points.",
      pseudocode: "ascii = (int) character",
      dryRun: "'a' -> 97",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Explain UTF-8 vs ASCII ranges."]
    },
    java: `import java.util.*;

public class AsciiValue {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter character: ");
        char c = sc.next().charAt(0);
        System.out.println("ASCII value of " + c + " is: " + (int) c);
        sc.close();
    }
}`
  },

  "TCS-ST05": {
    logic: {
      summary: "Remove spaces from a string.",
      approach: "Iterate and skip space characters, or use replaceAll.",
      intuition: "Removing a target character from a string.",
      pseudocode: "res = StringBuilder()\nfor char in s:\n  if char != ' ': res.append(char)\nreturn res.toString()",
      dryRun: "'hello world' -> 'helloworld'",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: ["Explain time complexity of string builder vs string concatenation."]
    },
    java: `import java.util.*;

public class RemoveSpaces {
    public static String removeSpaces(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) != ' ') sb.append(s.charAt(i));
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: ");
        String s = sc.nextLine();
        System.out.println("Without spaces: " + removeSpaces(s));
        sc.close();
    }
}`
  },
  "LC-17": {
    logic: {
      summary: "Return all possible letter combinations that a digit string could represent.",
      approach: "Backtracking / DFS. Map each digit to its corresponding letters. Recursively traverse digits, appending letters to a combination string, and add to results when length matches input digits.",
      intuition: "Generate all permutations of letters mapped by the digits. Recursion naturally builds a tree of all combinations.",
      pseudocode: "mapping = ['', '', 'abc', 'def', ...]\nres = []\nbacktrack(index, current):\n  if index == digits.length: res.add(current), return\n  for char in mapping[digits[index]]:\n    backtrack(index+1, current + char)\nbacktrack(0, '')\nreturn res",
      dryRun: "digits='23'\nMapping for 2 is 'abc', 3 is 'def'.\nIndex 0 (2): tries 'a'. Index 1 (3): tries 'd' -> 'ad' (add), tries 'e' -> 'ae' (add), tries 'f' -> 'af' (add)\nIndex 0 (2): tries 'b' -> 'bd', 'be', 'bf'. Tries 'c' -> 'cd', 'ce', 'cf'. Return all.",
      time: "O(4^n * n) where n is digit length",
      space: "O(n) recursion stack",
      interviewPoints: [
        "What is the base case? (index equals length of input digits).",
        "Explain space complexity and how recursion stack behaves.",
        "Consider empty inputs (should return empty list)."
      ]
    },
    java: `import java.util.*;

public class LetterCombinations {
    private static final String[] MAPPING = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    public static List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits == null || digits.length() == 0) return result;
        backtrack(result, digits, new StringBuilder(), 0);
        return result;
    }

    private static void backtrack(List<String> result, String digits, StringBuilder current, int index) {
        if (index == digits.length()) {
            result.add(current.toString());
            return;
        }
        String letters = MAPPING[digits.charAt(index) - '0'];
        for (char c : letters.toCharArray()) {
            current.append(c);
            backtrack(result, digits, current, index + 1);
            current.deleteCharAt(current.length() - 1);
        }
    }
}`
  },
  "LC-22": {
    logic: {
      summary: "Generate all combinations of well-formed parentheses.",
      approach: "Backtracking. Keep track of the number of open and close parentheses. Add '(' if open < n. Add ')' if close < open.",
      intuition: "To ensure parentheses are valid, we must never add a closing parenthesis unless we have a matching opening parenthesis already placed.",
      pseudocode: "res = []\nbacktrack(open, close, current):\n  if current.len == 2*n: res.add(current), return\n  if open < n: backtrack(open+1, close, current + '(')\n  if close < open: backtrack(open, close+1, current + ')')\nbacktrack(0, 0, '')",
      dryRun: "n=2\n'(' -> '((' -> '(()' -> '(())' (add)\n'(' -> '()' -> '()(' -> '()()' (add)",
      time: "O(4^n / (n * sqrt(n))) Catalans number bound",
      space: "O(n) recursion depth",
      interviewPoints: [
        "Explain Catalan numbers and how they describe parenthesis combinations.",
        "Prove why the close < open check guarantees validity.",
        "Discuss recursive stack footprint."
      ]
    },
    java: `import java.util.*;

public class GenerateParentheses {
    public static List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        backtrack(result, new StringBuilder(), 0, 0, n);
        return result;
    }

    private static void backtrack(List<String> result, StringBuilder sb, int open, int close, int max) {
        if (sb.length() == max * 2) {
            result.add(sb.toString());
            return;
        }
        if (open < max) {
            sb.append('(');
            backtrack(result, sb, open + 1, close, max);
            sb.deleteCharAt(sb.length() - 1);
        }
        if (close < open) {
            sb.append(')');
            backtrack(result, sb, open, close + 1, max);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}`
  },
  "LC-76": {
    logic: {
      summary: "Find the minimum window substring in s that contains all characters of t.",
      approach: "Sliding Window. Count occurrences of t. Expand right pointer. When all characters are matched, shrink left pointer to find minimum valid window.",
      intuition: "Instead of rebuilding character check pools, maintain a count of 'required' character matches and shrink window aggressively from left.",
      pseudocode: "required = counts(t), window = Map(), matched = 0\nl = 0, minLen = infinity\nfor r in s:\n  add s[r] to window\n  if s[r] meets required count: matched++\n  while matched == required.size:\n    update minLen\n    remove s[l] from window\n    if s[l] falls below required: matched--\n    l++",
      dryRun: "s='ADOBECODEBANC', t='ABC'\nFirst valid window: 'ADOBEC' (index 0 to 5). Shrinks to same.\nNext valid: 'CODEBA' -> 'ODEBANC' -> 'BANC' (index 9 to 12). Min length = 4. Returns 'BANC'.",
      time: "O(n + m) where n is s.length and m is t.length",
      space: "O(k) where k is unique characters in s and t",
      interviewPoints: [
        "Discuss window contraction constraints.",
        "How to optimize using arrays instead of HashMap for character counts.",
        "Handle edge cases where t is larger than s."
      ]
    },
    java: `import java.util.*;

public class MinWindowSubstring {
    public static String minWindow(String s, String t) {
        if (s == null || t == null || s.length() < t.length()) return "";
        int[] targetMap = new int[128];
        for (char c : t.toCharArray()) targetMap[c]++;
        
        int left = 0, minLeft = 0, minLen = Integer.MAX_VALUE;
        int count = t.length();
        
        for (int right = 0; right < s.length(); right++) {
            if (targetMap[s.charAt(right)] > 0) {
                count--;
            }
            targetMap[s.charAt(right)]--;
            
            while (count == 0) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minLeft = left;
                }
                targetMap[s.charAt(left)]++;
                if (targetMap[s.charAt(left)] > 0) {
                    count++;
                }
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minLeft, minLeft + minLen);
    }
}`
  },
  "LC-424": {
    logic: {
      summary: "Find the length of the longest substring containing the same letter after performing at most k character replacements.",
      approach: "Sliding Window. Maintain character frequency count inside window. Track max frequency of any character in window. If (window_size - maxFreq) > k, shrink window from left.",
      intuition: "The number of replacements needed in any window is `window_size - frequency_of_most_frequent_char`. We slide left whenever this number exceeds k.",
      pseudocode: "left = 0, maxFreq = 0, counts = array[26]\nfor right from 0 to n-1:\n  counts[s[right]]++\n  maxFreq = max(maxFreq, counts[s[right]])\n  if (right - left + 1) - maxFreq > k:\n    counts[s[left]]--\n    left++\nreturn n - left",
      dryRun: "s='AABABBA', k=1\nr=0(A): counts={A:1}, maxFreq=1. window=1\nr=1(A): counts={A:2}, maxFreq=2. window=2\nr=2(B): counts={A:2, B:1}, maxFreq=2. window=3. 3-2<=1 (valid)\nr=3(A): counts={A:3, B:1}, maxFreq=3. window=4. 4-3<=1 (valid)\nr=4(B): counts={A:3, B:2}, maxFreq=3. window=5. 5-3=2 > 1. shrink -> l=1, counts={A:2, B:2}\nContinues, returns 4.",
      time: "O(n)",
      space: "O(1) auxiliary space (size 26 array)",
      interviewPoints: [
        "Why we do not need to decrement maxFreq when shrinking left pointer (historical maxFreq is sufficient to expand window).",
        "Amortized O(n) window behavior.",
        "Confirm behavior if k is larger than string length."
      ]
    },
    java: `import java.util.*;

public class LongestRepeatingCharacterReplacement {
    public static int characterReplacement(String s, int k) {
        int[] counts = new int[26];
        int left = 0, maxFreq = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            maxFreq = Math.max(maxFreq, ++counts[s.charAt(right) - 'A']);
            while ((right - left + 1) - maxFreq > k) {
                counts[s.charAt(left) - 'A']--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
  },
  "LC-567": {
    logic: {
      summary: "Check if s2 contains a permutation of s1.",
      approach: "Sliding Window. Count character frequencies of s1. Maintain a sliding window of size s1.length in s2. Compare frequencies of the window to s1's counts.",
      intuition: "A permutation is a substring containing identical counts of characters. We maintain a fixed-size window of length s1.",
      pseudocode: "s1Counts = count(s1), s2Counts = count(s2 window of size s1.len)\nif s1Counts == s2Counts return true\nfor i from s1.len to s2.len-1:\n  slide window: add s2[i], remove s2[i-s1.len]\n  if matches return true\nreturn false",
      dryRun: "s1='ab', s2='eidbaooo'\ns1Counts={a:1, b:1}\nWindow 0-1 ('ei'): counts={e:1, i:1} (no match)\nWindow 1-2 ('id'): counts={i:1, d:1} (no match)\nWindow 2-3 ('db'): counts={d:1, b:1} (no match)\nWindow 3-4 ('ba'): counts={b:1, a:1} (match!) -> return true.",
      time: "O(n) where n is s2.length",
      space: "O(1) auxiliary space (size 26 array)",
      interviewPoints: [
        "Explain how comparison of two size-26 arrays is O(1).",
        "Handle case where s1 is longer than s2.",
        "Optimize using a single 'matches' variable (checks count of identical counts)."
      ]
    },
    java: `import java.util.*;

public class PermutationInString {
    public static boolean checkInclusion(String s1, String s2) {
        int n1 = s1.length(), n2 = s2.length();
        if (n1 > n2) return false;
        
        int[] s1Map = new int[26];
        int[] s2Map = new int[26];
        for (int i = 0; i < n1; i++) {
            s1Map[s1.charAt(i) - 'a']++;
            s2Map[s2.charAt(i) - 'a']++;
        }
        
        for (int i = 0; i < n2 - n1; i++) {
            if (matches(s1Map, s2Map)) return true;
            s2Map[s2.charAt(i) - 'a']--;
            s2Map[s2.charAt(i + n1) - 'a']++;
        }
        return matches(s1Map, s2Map);
    }
    
    private static boolean matches(int[] a, int[] b) {
        for (int i = 0; i < 26; i++) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }
}`
  },
  "LC-438": {
    logic: {
      summary: "Find all start indices of s2's anagrams in s1.",
      approach: "Sliding Window. Keep character counts of s2. Maintain sliding window of size s2.length in s1. Keep track of matches and output starting index if match counts align.",
      intuition: "Anagram matches require identical character frequency distributions. Fixed-size window slides across s1.",
      pseudocode: "Same as Permutation in String but add starting index to list if window counts match s2's counts.",
      dryRun: "s1='cbaebabacd', s2='abc'\ns2Counts={a:1, b:1, c:1}\nWindow 0-2 ('cba') matches -> add index 0.\nWindow 1-3 ('bae') no match...\nWindow 6-8 ('bac') matches -> add index 6. Returns [0, 6].",
      time: "O(n) where n is s1.length",
      space: "O(1) auxiliary space (size 26 array)",
      interviewPoints: [
        "Explain when left pointer slides forward.",
        "How is this problem identical to Permutation in String?",
        "Discuss space complexity optimizations."
      ]
    },
    java: `import java.util.*;

public class FindAllAnagrams {
    public static List<Integer> findAnagrams(String s, String p) {
        List<Integer> result = new ArrayList<>();
        int ns = s.length(), np = p.length();
        if (ns < np) return result;
        
        int[] pMap = new int[26];
        int[] sMap = new int[26];
        for (int i = 0; i < np; i++) {
            pMap[p.charAt(i) - 'a']++;
            sMap[s.charAt(i) - 'a']++;
        }
        
        for (int i = 0; i < ns - np; i++) {
            if (matches(pMap, sMap)) {
                result.add(i);
            }
            sMap[s.charAt(i) - 'a']--;
            sMap[s.charAt(i + np) - 'a']++;
        }
        if (matches(pMap, sMap)) {
            result.add(ns - np);
        }
        return result;
    }
    
    private static boolean matches(int[] a, int[] b) {
        for (int i = 0; i < 26; i++) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }
}`
  },
  "LC-340": {
    logic: {
      summary: "Find the length of the longest substring that contains at most k distinct characters.",
      approach: "Sliding Window. Store counts of characters inside a HashMap. Expand right pointer. If map size > k, shrink left pointer until map size <= k.",
      intuition: "Dynamic window sizing. HashMap tracks current unique characters. Shrink to restore valid constraints.",
      pseudocode: "left = 0, counts = Map(), maxLen = 0\nfor right in s:\n  counts[right]++\n  while counts.size > k:\n    counts[left]--\n    if counts[left] == 0: counts.remove(left)\n    left++\n  maxLen = max(maxLen, right - left + 1)",
      dryRun: "s='eceba', k=2\nr=0(e): map={e:1}\nr=1(c): map={e:1, c:1}\nr=2(e): map={e:2, c:1}\nr=3(b): map={e:2, c:1, b:1} > 2! left=0 -> map={e:1, c:1, b:1}. left=1 -> map={c:1, b:1}. Returns maxLen=3 ('ece').",
      time: "O(n)",
      space: "O(k) auxiliary space",
      interviewPoints: [
        "Explain when map size is pruned.",
        "Compare with O(256) array constraint in fixed character sets.",
        "Why is it O(n) time when left pointer moves inside a loop?"
      ]
    },
    java: `import java.util.*;

public class LongestSubstringKDistinct {
    public static int lengthOfLongestSubstringKDistinct(String s, int k) {
        if (s == null || s.length() == 0 || k == 0) return 0;
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char rightChar = s.charAt(right);
            map.put(rightChar, map.getOrDefault(rightChar, 0) + 1);
            while (map.size() > k) {
                char leftChar = s.charAt(left);
                map.put(leftChar, map.get(leftChar) - 1);
                if (map.get(leftChar) == 0) {
                    map.remove(leftChar);
                }
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
  },
  "LC-1047": {
    logic: {
      summary: "Remove all adjacent duplicates from a string recursively.",
      approach: "Stack-like simulation. Maintain a StringBuilder as a stack. For each character, if it equals the end of the stack, pop it. Otherwise, append/push it.",
      intuition: "Adjacent elements cancel each other out. A stack naturally tracks the top elements in order to match incoming duplicates.",
      pseudocode: "stack = []\nfor char in s:\n  if stack and stack.top == char: stack.pop()\n  else: stack.push(char)\nreturn join(stack)",
      dryRun: "s='abbaca'\nsStack: 'a' -> 'ab' -> 'a' (b cancelled) -> '' (a cancelled) -> 'c' -> 'ca'. Returns 'ca'.",
      time: "O(n)",
      space: "O(n) for stack output",
      interviewPoints: [
        "Why using a StringBuilder as a stack is highly efficient in Java.",
        "Discuss why recursive elimination takes O(n^2) time.",
        "Compare memory footprints."
      ]
    },
    java: `import java.util.*;

public class RemoveAdjacentDuplicates {
    public static String removeDuplicates(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            int len = sb.length();
            if (len > 0 && sb.charAt(len - 1) == c) {
                sb.deleteCharAt(len - 1);
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}`
  },
  "LC-71": {
    logic: {
      summary: "Simplify an absolute Unix-style file path.",
      approach: "Split path by '/'. Iterate through directories. Push directories to stack. If directory is '..', pop from stack. Skip empty directories or '.'. Join stack with '/'.",
      intuition: "Unix paths resolve nested directories linearly. A stack handles nesting and parent movements ('..') correctly.",
      pseudocode: "parts = path.split('/')\nstack = []\nfor p in parts:\n  if p == '..': stack.pop()\n  else if p != '.' and p != '': stack.push(p)\nreturn '/' + join(stack, '/')",
      dryRun: "path='/a/./b/../../c/'\nParts: ['', 'a', '.', 'b', '..', '..', 'c', '']\nprocess 'a' -> stack=['a']\nprocess '.' -> skip\nprocess 'b' -> stack=['a','b']\nprocess '..' -> pop 'b' -> stack=['a']\nprocess '..' -> pop 'a' -> stack=[]\nprocess 'c' -> stack=['c']. Returns '/c'.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: [
        "Explain how you handle consecutive slashes (split treats them as empty strings, which are skipped).",
        "What happens if you pop from an empty stack? (safety checks, ignore '..').",
        "Compare StringJoiner vs Deque."
      ]
    },
    java: `import java.util.*;

public class SimplifyPath {
    public static String simplifyPath(String path) {
        Deque<String> stack = new ArrayDeque<>();
        String[] parts = path.split("/");
        for (String part : parts) {
            if (part.equals("..")) {
                if (!stack.isEmpty()) {
                    stack.pollLast();
                }
            } else if (!part.isEmpty() && !part.equals(".")) {
                stack.offerLast(part);
            }
        }
        StringBuilder sb = new StringBuilder();
        for (String dir : stack) {
            sb.append("/").append(dir);
        }
        return sb.length() == 0 ? "/" : sb.toString();
    }
}`
  },
  "LC-767": {
    logic: {
      summary: "Reorganize a string so that no two adjacent characters are identical.",
      approach: "Count frequencies. If max frequency > (n + 1) / 2, return ''. Otherwise, place the most frequent character in alternating indexes (0, 2, 4...). Place remaining characters.",
      intuition: "Greedy spacing. Placing elements in even indexes first prevents collisions as long as the frequency is bounded by half the length.",
      pseudocode: "counts = frequencies(s)\nmaxChar = char with highest count\nif count[maxChar] > (n+1)/2 return ''\nfill even indices with maxChar\nfill remaining indices with other characters",
      dryRun: "s='aab', n=3\ncounts={a:2, b:1}. maxChar='a' (2).\n2 <= (3+1)/2 -> valid.\nplace 'a' at 0, 2 -> res=['a', _, 'a']\nplace 'b' at 1 -> res=['a', 'b', 'a']. Returns 'aba'.",
      time: "O(n)",
      space: "O(1) auxiliary space (alphabet size 26)",
      interviewPoints: [
        "Explain when the greedy alternating placement fails.",
        "Compare with MaxHeap (PriorityQueue) solution: O(n log k) vs O(n) array buckets.",
        "Clarify odd vs even array length conditions."
      ]
    },
    java: `import java.util.*;

public class ReorganizeString {
    public static String reorganizeString(String s) {
        int[] counts = new int[26];
        for (char c : s.toCharArray()) counts[c - 'a']++;
        
        int maxCount = 0, letter = 0;
        for (int i = 0; i < 26; i++) {
            if (counts[i] > maxCount) {
                maxCount = counts[i];
                letter = i;
            }
        }
        int n = s.length();
        if (maxCount > (n + 1) / 2) return "";
        
        char[] res = new char[n];
        int idx = 0;
        // Place most frequent char
        while (counts[letter] > 0) {
            res[idx] = (char) (letter + 'a');
            idx += 2;
            counts[letter]--;
        }
        // Place rest of chars
        for (int i = 0; i < 26; i++) {
            while (counts[i] > 0) {
                if (idx >= n) {
                    idx = 1;
                }
                res[idx] = (char) (i + 'a');
                idx += 2;
                counts[i]--;
            }
        }
        return new String(res);
    }
}`
  },
  "LC-131": {
    logic: {
      summary: "Partition a string into all possible sets of palindromic substrings.",
      approach: "Backtracking / DFS. Recursively partition the string. If prefix is a palindrome, recurse on the remainder. Add partition set to results when full string is consumed.",
      intuition: "Split string at each position. Check if first part is a palindrome. If yes, dfs on the remainder.",
      pseudocode: "res = []\nbacktrack(start, currentList):\n  if start == s.len: res.add(currentList), return\n  for end from start to s.len-1:\n    if isPalindrome(s[start..end]):\n      backtrack(end+1, currentList + s[start..end])\nbacktrack(0, [])",
      dryRun: "s='aab'\nstart=0: 'a' is pal. Recurse s='ab'.\n  start=1: 'a' is pal. Recurse s='b'.\n    start=2: 'b' is pal. Recurse s=''. Done! -> ['a', 'a', 'b']\nstart=0: 'aa' is pal. Recurse s='b'.\n  start=2: 'b' is pal. Recurse s=''. Done! -> ['aa', 'b']",
      time: "O(2^n * n) where n is string length",
      space: "O(n) recursion stack",
      interviewPoints: [
        "Explain how dynamic programming (DP table) can speed up palindrome checks.",
        "Analyze time complexity (why O(2^n)).",
        "Discuss recursive stack space."
      ]
    },
    java: `import java.util.*;

public class PalindromePartitioning {
    public static List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), s, 0);
        return result;
    }

    private static void backtrack(List<List<String>> result, List<String> temp, String s, int start) {
        if (start == s.length()) {
            result.add(new ArrayList<>(temp));
            return;
        }
        for (int i = start; i < s.length(); i++) {
            if (isPalindrome(s, start, i)) {
                temp.add(s.substring(start, i + 1));
                backtrack(result, temp, s, i + 1);
                temp.remove(temp.size() - 1);
            }
        }
    }

    private static boolean isPalindrome(String s, int low, int high) {
        while (low < high) {
            if (s.charAt(low++) != s.charAt(high--)) return false;
        }
        return true;
    }
}`
  },
  "LC-387": {
    logic: {
      summary: "Find the index of the first non-repeating character in a string.",
      approach: "Frequency Array. Count occurrences of each character in a first pass. In a second pass, return index of the first character with a frequency count of 1.",
      intuition: "Two-pass character mapping. A size-26 integer array efficiently tracks character frequencies.",
      pseudocode: "counts = array[26]\nfor char in s: counts[char]++\nfor i from 0 to n-1:\n  if counts[s[i]] == 1 return i\nreturn -1",
      dryRun: "s='leetcode'\ncounts: {l:1, e:3, t:1, c:1, o:1, d:1}\nScan s: s[0]='l' (count 1) -> return 0.",
      time: "O(n)",
      space: "O(1) auxiliary space (size 26 array)",
      interviewPoints: [
        "Why standard two-pass is faster than single-pass with LinkedHashMap in average cases.",
        "Consider empty inputs or strings with all duplicates.",
        "Handle Unicode characters (requires HashMap or size-65536 array)."
      ]
    },
    java: `import java.util.*;

public class FirstUniqueChar {
    public static int firstUniqChar(String s) {
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }
        for (int i = 0; i < s.length(); i++) {
            if (counts[s.charAt(i) - 'a'] == 1) {
                return i;
            }
        }
        return -1;
    }
}`
  },
  "LC-383": {
    logic: {
      summary: "Determine if ransomNote can be constructed from magazine.",
      approach: "Frequency Array. Count characters in magazine. Loop through ransomNote and decrement character counts. If count becomes negative, return false.",
      intuition: "Magazine must provide a superset of all characters required by ransomNote.",
      pseudocode: "counts = array[26]\nfor char in magazine: counts[char]++\nfor char in ransomNote:\n  counts[char]--\n  if counts[char] < 0 return false\nreturn true",
      dryRun: "ransom='aab', mag='aba'\ncounts: {a:2, b:1}\nransom matches: 'a' -> counts[a]=1. 'a' -> counts[a]=0. 'b' -> counts[b]=0. Return true.",
      time: "O(n + m) where n is ransomNote length and m is magazine length",
      space: "O(1) auxiliary space",
      interviewPoints: [
        "Why is it O(1) space?",
        "Handle case where magazine is shorter than ransomNote.",
        "Verify character set constraints (lowercase letters vs ASCII)."
      ]
    },
    java: `import java.util.*;

public class RansomNote {
    public static boolean canConstruct(String ransomNote, String magazine) {
        int[] counts = new int[26];
        for (char c : magazine.toCharArray()) {
            counts[c - 'a']++;
        }
        for (char c : ransomNote.toCharArray()) {
            counts[c - 'a']--;
            if (counts[c - 'a'] < 0) {
                return false;
            }
        }
        return true;
    }
}`
  },
  "LC-409": {
    logic: {
      summary: "Find the length of the longest palindrome that can be built with the given string's letters.",
      approach: "Frequency count. Count occurrences of each character. Sum up the even parts of all counts. If any count is odd, we can place exactly one character in the center (add 1).",
      intuition: "A palindrome consists of symmetric halves plus an optional middle character. All letters must appear in pairs except at most one.",
      pseudocode: "counts = frequencies(s)\nlen = 0, hasOdd = false\nfor c in counts:\n  len += (c / 2) * 2\n  if c % 2 == 1: hasOdd = true\nreturn len + (hasOdd ? 1 : 0)",
      dryRun: "s='abccccdd'\ncounts: {a:1, b:1, c:4, d:2}\nlen: a(0), b(0), c(4), d(2) -> total=6. hasOdd=true (from 'a','b') -> return 7 ('ccdadcc').",
      time: "O(n)",
      space: "O(1) auxiliary space (size 128 ASCII array)",
      interviewPoints: [
        "Explain why odd counts contribute `count - 1` to symmetry.",
        "Can we use a HashSet instead of frequency counts? (Yes, add on first visit, remove and increment length by 2 on second visit. Add 1 at the end if set is not empty).",
        "Discuss case sensitivity."
      ]
    },
    java: `import java.util.*;

public class LongestPalindromeString {
    public static int longestPalindrome(String s) {
        int[] counts = new int[128];
        for (char c : s.toCharArray()) {
            counts[c]++;
        }
        int length = 0;
        boolean hasOdd = false;
        for (int c : counts) {
            length += (c / 2) * 2;
            if (c % 2 == 1) {
                hasOdd = true;
            }
        }
        return length + (hasOdd ? 1 : 0);
    }
}`
  },
  "LC-1189": {
    logic: {
      summary: "Find the maximum number of instances of the word 'balloon' that can be formed.",
      approach: "Frequency Count. Count frequency of letters 'b', 'a', 'l', 'o', 'n'. Divide counts of 'l' and 'o' by 2. Return the minimum value among these counts.",
      intuition: "The word 'balloon' requires 1 'b', 1 'a', 2 'l's, 2 'o's, and 1 'n'. The bottleneck character determines the total instances.",
      pseudocode: "counts = count(s)\nreturn min(counts['b'], counts['a'], counts['l']/2, counts['o']/2, counts['n'])",
      dryRun: "s='nlaebolko'\ncounts: b=1, a=1, l=2, o=2, n=1 -> min(1, 1, 1, 1, 1) = 1. Returns 1.",
      time: "O(n)",
      space: "O(1) auxiliary space",
      interviewPoints: [
        "Explain integer division for characters with frequency requirements > 1.",
        "How to scale this for any arbitrary word.",
        "Analyze character set constraints."
      ]
    },
    java: `import java.util.*;

public class MaxBalloons {
    public static int maxNumberOfBalloons(String text) {
        int[] counts = new int[26];
        for (char c : text.toCharArray()) {
            counts[c - 'a']++;
        }
        int b = counts['b' - 'a'];
        int a = counts['a' - 'a'];
        int l = counts['l' - 'a'] / 2;
        int o = counts['o' - 'a'] / 2;
        int n = counts['n' - 'a'];
        return Math.min(Math.min(Math.min(b, a), Math.min(l, o)), n);
    }
}`
  },
  "P-112": {
    logic: {
      summary: "Check if a string is a palindrome.",
      approach: "Two Pointers. Place left at 0, right at n-1. Compare characters and move inward. If characters mismatch, return false.",
      intuition: "Palindrome reads identical from start-to-end and end-to-start.",
      pseudocode: "left = 0, right = n-1\nwhile left < right:\n  if s[left] != s[right] return false\n  left++, right--\nreturn true",
      dryRun: "s='racecar'\nl=0(r), r=6(r) -> l=1(a), r=5(a) -> l=2(c), r=4(c) -> l=3(e), r=3(e). Returns true.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Discuss recursive vs iterative complexity.",
        "Compare with reversing the entire string.",
        "Handle spaces or alphanumeric filter constraints (like LC-125)."
      ]
    },
    java: `import java.util.*;

public class PalindromeString {
    public static boolean isPalindrome(String s) {
        if (s == null) return false;
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) return false;
        }
        return true;
    }
}`
  },
  "P-115": {
    logic: {
      summary: "Remove all occurrences of a character in a string.",
      approach: "Linear scan. Use StringBuilder. Append characters if they do not match the target character.",
      intuition: "Filter out target character elements from the string.",
      pseudocode: "res = StringBuilder()\nfor char in s:\n  if char != target: res.append(char)\nreturn res.toString()",
      dryRun: "s='abcda', target='a' -> sb: 'bcd'. Returns 'bcd'.",
      time: "O(n)",
      space: "O(n) for output",
      interviewPoints: [
        "Explain why StringBuilder is better than String concatenation.",
        "Discuss String.replace() vs manual char arrays.",
        "Can it be done in O(1) space if modifying char array in-place? (Yes, two-pointer write index)."
      ]
    },
    java: `import java.util.*;

public class RemoveOccurrences {
    public static String removeChar(String s, char target) {
        if (s == null) return null;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) != target) {
                sb.append(s.charAt(i));
            }
        }
        return sb.toString();
    }
}`
  },
  "LC-127": {
    logic: {
      summary: "Find the length of the shortest transformation sequence from beginWord to endWord using a dictionary of words.",
      approach: "Breadth First Search (BFS). Treat words as nodes and single-letter mutations as edges. Run level-by-level BFS from beginWord. Keep a visited set (or remove words directly from dictionary) to prevent cycles.",
      intuition: "Unweighted shortest path in a graph is solved optimally using BFS. Generating adjacent nodes by changing each letter position is faster than checking all words in dictionary if word length is small.",
      pseudocode: "Q = [beginWord], visited = Set(beginWord), level = 1\nwhile Q:\n  for i in Q.size:\n    curr = Q.pop()\n    if curr == endWord return level\n    for neighbor in generateNeighbors(curr):\n      if neighbor in wordList and not in visited:\n        visited.add(neighbor), Q.push(neighbor)\n  level++\nreturn 0",
      dryRun: "begin='hit', end='cog', list=['hot','dot','dog','lot','log','cog']\nQ=['hit']. level=1\nQ=['hot']. level=2\nQ=['dot','lot']. level=3\nQ=['dog','log']. level=4\nQ=['cog']. level=5 -> matched endWord. Returns 5.",
      time: "O(M^2 * N) where M is word length and N is wordList length",
      space: "O(M^2 * N) for BFS structures",
      interviewPoints: [
        "Why is BFS better than DFS here? (DFS might find a path, but not the shortest one without searching the entire graph).",
        "Explain optimization of using two-way (bidirectional) BFS to shrink search tree.",
        "Discuss word mutation check optimization (O(26 * M) vs O(N * M))."
      ]
    },
    java: `import java.util.*;

public class WordLadder {
    public static int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> dict = new HashSet<>(wordList);
        if (!dict.contains(endWord)) return 0;
        
        Queue<String> queue = new LinkedList<>();
        queue.add(beginWord);
        int level = 1;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String curr = queue.poll();
                if (curr.equals(endWord)) return level;
                char[] chars = curr.toCharArray();
                for (int j = 0; j < chars.length; j++) {
                    char original = chars[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        chars[j] = c;
                        String next = new String(chars);
                        if (dict.contains(next)) {
                            queue.add(next);
                            dict.remove(next);
                        }
                    }
                    chars[j] = original;
                }
            }
            level++;
        }
        return 0;
    }
}`
  },
  "LC-1143": {
    logic: {
      summary: "Find the length of the longest common subsequence of two strings.",
      approach: "Dynamic Programming. Maintain a 1D DP array of size min(n, m) + 1. At each step, update cells by checking match: `dp[j] = 1 + prev` if match, else `max(dp[j], dp[j-1])`.",
      intuition: "A subsequence match at `(i, j)` extends the best match of prefixes at `(i-1, j-1)`. Mismatches branch to either dropping text1's char or text2's char.",
      pseudocode: "dp = array of size m+1 filled with 0\nfor i from 1 to n:\n  prev = 0\n  for j from 1 to m:\n    temp = dp[j]\n    if s1[i-1] == s2[j-1]: dp[j] = 1 + prev\n    else: dp[j] = max(dp[j], dp[j-1])\n    prev = temp\nreturn dp[m]",
      dryRun: "s1='abc', s2='ac'\ndp=[0,0,0]\ni=1(a): dp=[0, 1(match), 1]\ni=2(b): dp=[0, 1, 1]\ni=3(c): dp=[0, 1, 2(match)]. Returns 2.",
      time: "O(N * M)",
      space: "O(min(N, M)) space complexity",
      interviewPoints: [
        "Explain transition relation and why we need separate `prev` tracking for 1D space compression.",
        "Compare Substring vs Subsequence.",
        "How to reconstruct the actual LCS string."
      ]
    },
    java: `import java.util.*;

public class LCS {
    public static int longestCommonSubsequence(String text1, String text2) {
        if (text1.length() < text2.length()) {
            return longestCommonSubsequence(text2, text1);
        }
        int n = text1.length();
        int m = text2.length();
        int[] dp = new int[m + 1];
        
        for (int i = 1; i <= n; i++) {
            int prev = 0;
            for (int j = 1; j <= m; j++) {
                int temp = dp[j];
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[j] = prev + 1;
                } else {
                    dp[j] = Math.max(dp[j], dp[j - 1]);
                }
                prev = temp;
            }
        }
        return dp[m];
    }
}`
  },
  "LC-30": {
    logic: {
      summary: "Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once.",
      approach: "Sliding Window. Let each word have length `L`. Run `L` separate sliding windows. Maintain count maps of words inside the window and match with target counts.",
      intuition: "Since all words have equal length `L`, we can partition our scan into `L` starting offsets to cover all word boundary alignments.",
      pseudocode: "wordLen = words[0].len, totalLen = wordLen * words.size\ncounts = wordFrequencies(words)\nfor i from 0 to wordLen-1:\n  left = i, matchedMap = Map()\n  for j from i to s.len - wordLen step wordLen:\n    word = s[j...j+wordLen]\n    if word in counts:\n      matchedMap[word]++\n      while matchedMap[word] > counts[word]:\n        matchedMap[s[left...left+wordLen]]--\n        left += wordLen\n      if windowSize == totalLen: res.add(left)\n    else matchedMap.clear(), left = j + wordLen",
      dryRun: "s='barfoothefoobar', words=['foo','bar']\nwordLen=3. Runs offsets 0, 1, 2.\nOffset 0: finds 'bar' -> counts={bar:1}. finds 'foo' -> counts={bar:1, foo:1} (match at left 0) -> add 0.\nOffset 1: starts 'arf', etc. No matches. Returns [0, 9].",
      time: "O(N * L) where N is s.length and L is word length",
      space: "O(M * L) where M is word counts",
      interviewPoints: [
        "Why run separate sliding windows for each offset in `[0, wordLen - 1]`? (to guarantee capturing any word boundary starts).",
        "Compare with brute force O(N * M * L) complexity.",
        "Discuss map pruning optimizations."
      ]
    },
    java: `import java.util.*;

public class ConcatenatedSubstrings {
    public static List<Integer> findSubstring(String s, String[] words) {
        List<Integer> result = new ArrayList<>();
        if (s == null || words == null || words.length == 0) return result;
        int wordLen = words[0].length();
        int wordCount = words.length;
        int totalLen = wordLen * wordCount;
        if (s.length() < totalLen) return result;
        
        Map<String, Integer> counts = new HashMap<>();
        for (String word : words) {
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }
        
        for (int i = 0; i < wordLen; i++) {
            int left = i;
            Map<String, Integer> currentMap = new HashMap<>();
            int count = 0;
            for (int j = i; j <= s.length() - wordLen; j += wordLen) {
                String word = s.substring(j, j + wordLen);
                if (counts.containsKey(word)) {
                    currentMap.put(word, currentMap.getOrDefault(word, 0) + 1);
                    count++;
                    while (currentMap.get(word) > counts.get(word)) {
                        String leftWord = s.substring(left, left + wordLen);
                        currentMap.put(leftWord, currentMap.get(leftWord) - 1);
                        count--;
                        left += wordLen;
                    }
                    if (count == wordCount) {
                        result.add(left);
                    }
                } else {
                    currentMap.clear();
                    count = 0;
                    left = j + wordLen;
                }
            }
        }
        return result;
    }
}`
  },
  "LC-1209": {
    logic: {
      summary: "Remove all k duplicate adjacent characters repeatedly.",
      approach: "Stack of pairs `(char, count)`. Loop through string characters. If stack top char matches current char, increment its count. If count reaches k, pop it. Else push character with count 1.",
      intuition: "Matching duplicates are adjacent. A stack resolves recursive cancellations linearly.",
      pseudocode: "stack = []\nfor char in s:\n  if stack and stack.top.char == char:\n    stack.top.count++\n    if stack.top.count == k: stack.pop()\n  else: stack.push((char, 1))\nreturn reconstruct(stack)",
      dryRun: "s='deeedbbcccbda', k=3\nstack: d(1) -> d(1),e(1) -> d(1),e(2) -> d(1),e(3) (pop e) -> d(1) -> d(1),d(1)=d(2) -> d(2),b(1) -> d(2),b(2) -> d(2),b(2),c(3) (pop c) -> d(2),b(2) -> d(2),b(3) (pop b) -> d(2) -> d(3) (pop d) -> empty -> a(1). Returns 'aa'.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: [
        "Explain stack space compared to recursive substitution O(n^2) method.",
        "How to optimize stack storage using parallel arrays (one char array, one int array).",
        "Reconstruction details."
      ]
    },
    java: `import java.util.*;

public class RemoveAdjacentDuplicatesII {
    static class Node {
        char ch;
        int count;
        Node(char ch, int count) {
            this.ch = ch;
            this.count = count;
        }
    }
    
    public static String removeDuplicates(String s, int k) {
        Deque<Node> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (!stack.isEmpty() && stack.peekLast().ch == c) {
                stack.peekLast().count++;
                if (stack.peekLast().count == k) {
                    stack.pollLast();
                }
            } else {
                stack.offerLast(new Node(c, 1));
            }
        }
        StringBuilder sb = new StringBuilder();
        for (Node node : stack) {
            for (int i = 0; i < node.count; i++) {
                sb.append(node.ch);
            }
        }
        return sb.toString();
    }
}`
  },
  "LC-692": {
    logic: {
      summary: "Return the k most frequent words sorted by frequency from highest to lowest. Bind ties lexicographically.",
      approach: "HashMap + PriorityQueue (MinHeap). Count frequencies. Maintain a MinHeap of size k. Compare words by frequency ascending, then lexicographically descending. Reverse final extracted list.",
      intuition: "A MinHeap of size k keeps the largest k frequencies. Invert comparison for ties so that lexicographically larger ones are popped early (leaving smaller ones in heap).",
      pseudocode: "counts = wordFrequencies(s)\nheap = PriorityQueue(compare: a.freq != b.freq ? a.freq - b.freq : b.word - a.word)\nfor word in counts:\n  heap.push(word)\n  if heap.size > k: heap.pop()\nres = heap.drain()\nreturn reverse(res)",
      dryRun: "words=['i','love','i','love','coding'], k=2\ncounts: i=2, love=2, coding=1\nheap: add coding(1). add love(2). add i(2) -> size=3 -> pop coding(1). heap=[love, i]. Returns ['i', 'love'] (sorted).",
      time: "O(N log K) where N is word count",
      space: "O(N) for HashMap storage",
      interviewPoints: [
        "Prove why min-heap is better than sorting entire frequency table (O(N log N)).",
        "Explain lexicographical ordering inversion in min-heap.",
        "Discuss space complexity."
      ]
    },
    java: `import java.util.*;

public class TopKFrequentWords {
    public static List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> counts = new HashMap<>();
        for (String w : words) {
            counts.put(w, counts.getOrDefault(w, 0) + 1);
        }
        
        PriorityQueue<String> minHeap = new PriorityQueue<>((a, b) -> {
            int fa = counts.get(a);
            int fb = counts.get(b);
            if (fa != fb) return Integer.compare(fa, fb);
            return b.compareTo(a); // lexicographical reverse for min-heap
        });
        
        for (String w : counts.keySet()) {
            minHeap.add(w);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        List<String> result = new ArrayList<>();
        while (!minHeap.isEmpty()) {
            result.add(minHeap.poll());
        }
        Collections.reverse(result);
        return result;
    }
}`
  },
  "LC-10": {
    logic: {
      summary: "Regular Expression Matching supporting '.' and '*'.",
      approach: "Bottom-up 2D Dynamic Programming. `dp[i][j]` indicates if `s[i...]` matches `p[j...]`.",
      intuition: "Matching is recursive. The wildcard '*' allows matching zero or more occurrences of the preceding element.",
      pseudocode: "dp[i][j]: if p[j+1] == '*': dp[i][j] = dp[i][j+2] || (match && dp[i+1][j]) else: match && dp[i+1][j+1]",
      dryRun: "s='aa', p='a*' -> match 'a' with 'a*'. Zero matches = dp[0][2] (false). >=1 matches = dp[1][0] which matches 'a' with 'a*', matching 'a' gives true. Returns true.",
      time: "O(M * N)",
      space: "O(M * N)",
      interviewPoints: ["Explain handling of '*'.", "Define base cases when strings are empty.", "Space optimization potential."]
    },
    java: `public class RegexMatching {
    public static boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[m][n] = true;
        
        for (int i = m; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                boolean firstMatch = i < m && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');
                if (j + 1 < n && p.charAt(j + 1) == '*') {
                    dp[i][j] = dp[i][j + 2] || (firstMatch && dp[i + 1][j]);
                } else {
                    dp[i][j] = firstMatch && dp[i + 1][j + 1];
                }
            }
        }
        return dp[0][0];
    }
}`
  },
  "LC-43": {
    logic: {
      summary: "Multiply two numbers represented as strings.",
      approach: "Array simulation of digit multiplication. Allocate array of size `m + n`. Add product at `i + j + 1` and update carry at `i + j`.",
      intuition: "Perform grade-school multiplication on digits, storing products in target indices to resolve carries.",
      pseudocode: "pos = array of size m+n\nfor i from m-1 to 0:\n  for j from n-1 to 0:\n    mul = s1[i] * s2[j]\n    sum = mul + pos[i+j+1]\n    pos[i+j+1] = sum % 10, pos[i+j] += sum / 10",
      dryRun: "s1='12', s2='3' -> pos size 3.\ni=1, j=0: mul=6. pos[2]=6. i=0, j=0: mul=3. pos[1]=3. Returns '36'.",
      time: "O(M * N)",
      space: "O(M + N)",
      interviewPoints: ["Why do we skip leading zeroes?", "Array size limits.", "Explain carry calculations."]
    },
    java: `public class MultiplyStrings {
    public static String multiply(String num1, String num2) {
        int m = num1.length(), n = num2.length();
        int[] pos = new int[m + n];
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
                int p1 = i + j, p2 = i + j + 1;
                int sum = mul + pos[p2];
                pos[p2] = sum % 10;
                pos[p1] += sum / 10;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int p : pos) {
            if (!(sb.length() == 0 && p == 0)) sb.append(p);
        }
        return sb.length() == 0 ? "0" : sb.toString();
    }
}`
  },
  "LC-51": {
    logic: {
      summary: "Solve N-Queens placing N non-attacking queens on NxN board.",
      approach: "Backtracking DFS. Place queens row-by-row. Maintain boolean columns, positive diagonals (`r + c`), and negative diagonals (`r - c`) arrays to check validity in O(1) time.",
      intuition: "Place queen, prune search space if attack bounds overlap, backtrack.",
      pseudocode: "dfs(row):\n  for col in cols:\n    if isValid(row, col):\n      placeQueen(row, col), dfs(row+1), removeQueen(row, col)",
      dryRun: "n=4 -> tries row 0 col 0, row 1 col 2... backtracking generates all valid boards.",
      time: "O(N!)",
      space: "O(N)",
      interviewPoints: ["Explain diagonal coordinates mapping.", "Time complexity derivation.", "Pruning efficiency."]
    },
    java: `import java.util.*;

public class NQueens {
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        boolean[] cols = new boolean[n];
        boolean[] d1 = new boolean[2 * n];
        boolean[] d2 = new boolean[2 * n];
        backtrack(0, n, board, cols, d1, d2, res);
        return res;
    }
    private static void backtrack(int r, int n, char[][] board, boolean[] cols, boolean[] d1, boolean[] d2, List<List<String>> res) {
        if (r == n) {
            List<String> list = new ArrayList<>();
            for (char[] row : board) list.add(new String(row));
            res.add(list);
            return;
        }
        for (int c = 0; c < n; c++) {
            int id1 = r + c;
            int id2 = r - c + n;
            if (!cols[c] && !d1[id1] && !d2[id2]) {
                board[r][c] = 'Q';
                cols[c] = d1[id1] = d2[id2] = true;
                backtrack(r + 1, n, board, cols, d1, d2, res);
                board[r][c] = '.';
                cols[c] = d1[id1] = d2[id2] = false;
            }
        }
    }
}`
  },
  "LC-72": {
    logic: {
      summary: "Edit Distance between two strings.",
      approach: "2D Dynamic Programming. `dp[i][j]` stores min operations to match prefix lengths i and j. If `s1[i-1] == s2[j-1]`, cost is `dp[i-1][j-1]`. Else, take `1 + min(insert, delete, replace)`.",
      intuition: "Align prefixes by picking cheapest operation step-by-step.",
      pseudocode: "dp[i][j] = min(dp[i][j-1]+1, dp[i-1][j]+1, dp[i-1][j-1]+1)",
      dryRun: "s1='cat', s2='car' -> prefix mismatch at last char -> cost = 1 + replace('t', 'r'). Returns 1.",
      time: "O(M * N)",
      space: "O(M * N)",
      interviewPoints: ["State transition equations.", "Base cases when one string is empty.", "Space optimization to 1D."]
    },
    java: `public class EditDistance {
    public static int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
                }
            }
        }
        return dp[m][n];
    }
}`
  },
  "LC-91": {
    logic: {
      summary: "Calculate the number of ways to decode a digit string.",
      approach: "1D Dynamic Programming. `dp[i]` is decode ways for length i. Single digit decodes if `s[i-1] != '0'`, double digit decodes if value is 10-26.",
      intuition: "Combinations are additive depending on valid suffix choices.",
      pseudocode: "dp[i] = (s[i-1]!='0' ? dp[i-1] : 0) + (val(s[i-2..i-1]) in 10-26 ? dp[i-2] : 0)",
      dryRun: "s='12' -> dp[0]=1. dp[1]=1. dp[2]=dp[1](1)+dp[0](1)=2. Returns 2.",
      time: "O(N)",
      space: "O(1) space optimized variables",
      interviewPoints: ["Handling leading zeroes (decodes to 0).", "Boundary validation.", "Transitions."]
    },
    java: `public class DecodeWays {
    public static int numDecodings(String s) {
        if (s == null || s.length() == 0 || s.charAt(0) == '0') return 0;
        int n = s.length();
        int prev1 = 1, prev2 = 1;
        for (int i = 1; i < n; i++) {
            int curr = 0;
            char c = s.charAt(i);
            char p = s.charAt(i - 1);
            if (c != '0') curr += prev1;
            int twoDigit = (p - '0') * 10 + (c - '0');
            if (twoDigit >= 10 && twoDigit <= 26) curr += prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`
  },
  "LC-97": {
    logic: {
      summary: "Check if s3 is formed by interleaving s1 and s2.",
      approach: "2D DP. `dp[i][j]` means `s3[0...i+j-1]` matches `s1[0...i-1]` and `s2[0...j-1]`.",
      intuition: "Match s3 characters by pulling from either s1 or s2 sequentially.",
      pseudocode: "dp[i][j] = (dp[i-1][j] and s1[i-1]==s3[i+j-1]) or (dp[i][j-1] and s2[j-1]==s3[i+j-1])",
      dryRun: "s1='a', s2='b', s3='ab' -> dp[1][0]=true, dp[1][1]=true. Returns true.",
      time: "O(M * N)",
      space: "O(N) space optimized",
      interviewPoints: ["Verify sum of lengths matches: `s1.len + s2.len == s3.len`.", "Recursive DFS alternative with memoization.", "Transitions."]
    },
    java: `public class InterleavingString {
    public static boolean isInterleave(String s1, String s2, String s3) {
        if (s1.length() + s2.length() != s3.length()) return false;
        int m = s1.length(), n = s2.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        for (int j = 1; j <= n; j++) dp[j] = dp[j - 1] && s2.charAt(j - 1) == s3.charAt(j - 1);
        
        for (int i = 1; i <= m; i++) {
            dp[0] = dp[0] && s1.charAt(i - 1) == s3.charAt(i - 1);
            for (int j = 1; j <= n; j++) {
                dp[j] = (dp[j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) ||
                        (dp[j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
            }
        }
        return dp[n];
    }
}`
  },
  "LC-115": {
    logic: {
      summary: "Count the number of distinct subsequences of s equal to t.",
      approach: "2D Dynamic Programming. `dp[i][j]` is the number of times `t[0...j-1]` appears in `s[0...i-1]`.",
      intuition: "If current characters match, we can either choose to match them or skip the character in s.",
      pseudocode: "if s[i-1] == t[j-1]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j] else: dp[i][j] = dp[i-1][j]",
      dryRun: "s='bab', t='b' -> matches count = 2.",
      time: "O(M * N)",
      space: "O(N) space optimized",
      interviewPoints: ["Explain skip transition.", "Explain match transition.", "Base cases."]
    },
    java: `public class DistinctSubsequences {
    public static int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        int[] dp = new int[n + 1];
        dp[0] = 1;
        
        for (int i = 1; i <= m; i++) {
            for (int j = n; j >= 1; j--) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return dp[n];
    }
}`
  },
  "LC-125": {
    logic: {
      summary: "Check if a string is a valid palindrome, ignoring non-alphanumeric characters and casing.",
      approach: "Two Pointers. Move indices inwards from bounds, skipping non-alphanumeric indices, and checking case-insensitive character equivalence.",
      intuition: "Clean strings using pointer skips to avoid string copy allocations.",
      pseudocode: "l = 0, r = len-1\nwhile l < r:\n  skip non-alphanumeric l, r\n  if lower(s[l]) != lower(s[r]) return false\nreturn true",
      dryRun: "s='A man, a plan' -> skips spaces and commas -> compares indices symmetrically.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Why is two pointers O(1) space better than `replaceAll()`? (Avoids creating new string copies).", "Character validation methods.", "Empty string edge cases."]
    },
    java: `public class ValidPalindrome {
    public static boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) {
                return false;
            }
            l++; r--;
        }
        return true;
    }
}`
  },
  "LC-139": {
    logic: {
      summary: "Determine if a string can be segmented into space-separated words from a dictionary.",
      approach: "DP. `dp[i]` is true if prefix `s[0...i-1]` is segmentable. Transition: `dp[i] = true` if `dp[j] == true` and `s[j...i-1]` is in dictionary.",
      intuition: "Match suffix against dictionary word, recursively resolving prefix segmentability.",
      pseudocode: "dp = boolean array, dp[0]=true\nfor i from 1 to n:\n  for j from 0 to i-1:\n    if dp[j] and s[j..i] in wordDict: dp[i] = true, break",
      dryRun: "s='leetcode', dict=['leet','code'] -> dp[4]=true (leet matches). dp[8]=true (code matches & dp[4] is true). Returns true.",
      time: "O(N^2)",
      space: "O(N)",
      interviewPoints: ["Trie optimization potential.", "Why HashSet lookup is O(1) on average.", "Transitions."]
    },
    java: `import java.util.*;

public class WordBreak {
    public static boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
}`
  },
  "LC-647": {
    logic: {
      summary: "Count total palindromic substrings in a string.",
      approach: "Expand Around Center. Expand outwards from every single character (odd length centers) and between adjacent characters (even length centers).",
      intuition: "Every palindrome has a center. Expand to capture all boundaries in O(n^2) time.",
      pseudocode: "count = 0\nfor i from 0 to n-1:\n  count += expand(i, i) + expand(i, i+1)\nreturn count",
      dryRun: "s='abc' -> expansions: (0,0)->1, (1,1)->1, (2,2)->1. Total = 3.",
      time: "O(N^2)",
      space: "O(1)",
      interviewPoints: ["Compare with DP O(N^2) space complexity.", "Manacher's Algorithm O(N) optimization overview.", "Expansion steps."]
    },
    java: `public class PalindromicSubstringsCount {
    public static int countSubstrings(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            count += expand(s, i, i);     // odd length
            count += expand(s, i, i + 1); // even length
        }
        return count;
    }
    private static int expand(String s, int l, int r) {
        int count = 0;
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            count++;
            l--; r++;
        }
        return count;
    }
}`
  },
  "LC-678": {
    logic: {
      summary: "Check if a string is valid parenthesization supporting wildcards '*'.",
      approach: "Greedy Range Tracking. Track `minOpen` and `maxOpen` active parenthesis. If `c == '('`, increment both. If `c == ')'`, decrement both. If `c == '*'`, decrement `minOpen` and increment `maxOpen`. Keep `minOpen >= 0`.",
      intuition: "Asterisks allow flexible configurations. Checking bounding limits ensures that a valid balance path exists.",
      pseudocode: "minOpen = maxOpen = 0\nfor c in s:\n  if c == '(': min++, max++\n  else if c == ')': min--, max--\n  else: min--, max++\n  if max < 0 return false\n  min = max(min, 0)\nreturn min == 0",
      dryRun: "s='(*)' -> min=0, max=0. Returns true.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Why do we clip `minOpen` at 0? (Negative open count is invalid, but '*' could choose to act as empty string instead of closed parenthesis).", "Two stacks alternative.", "State bounds."]
    },
    java: `public class ValidParenthesisString {
    public static boolean checkValidString(String s) {
        int minOpen = 0, maxOpen = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') {
                minOpen++;
                maxOpen++;
            } else if (c == ')') {
                minOpen--;
                maxOpen--;
            } else {
                minOpen--;
                maxOpen++;
            }
            if (maxOpen < 0) return false;
            minOpen = Math.max(minOpen, 0);
        }
        return minOpen == 0;
    }
}`
  },
  "LC-763": {
    logic: {
      summary: "Partition a string into as many parts as possible so that each letter appears in at most one part.",
      approach: "Greedy. 1) Map last index occurrence of each character. 2) Traverse string, updating partition boundary `end = max(end, last[char])`. When index reaches `end`, record partition size.",
      intuition: "A partition must cover all occurrences of any letter it contains, meaning its boundary must extend to the furthest last-occurrence index of its characters.",
      pseudocode: "last = array of last occurrences\nstart = end = 0\nfor i from 0 to n-1:\n  end = max(end, last[s[i]])\n  if i == end:\n    add size to res, start = i + 1",
      dryRun: "s='ababcbacadefegde'\n'a' last=8. end=8. loops until i=8 -> partition size = 9. Next partition starts at 9.",
      time: "O(N)",
      space: "O(1) (fixed 26-element array)",
      interviewPoints: ["Explain why single-pass boundary expansion is correct.", "Space complexity bounds.", "Relative partitions."]
    },
    java: `import java.util.*;

public class PartitionLabels {
    public static List<Integer> partitionLabels(String s) {
        int[] last = new int[26];
        for (int i = 0; i < s.length(); i++) {
            last[s.charAt(i) - 'a'] = i;
        }
        
        List<Integer> result = new ArrayList<>();
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            end = Math.max(end, last[s.charAt(i) - 'a']);
            if (i == end) {
                result.add(end - start + 1);
                start = i + 1;
            }
        }
        return result;
    }
}`
  },
  "LC-273": {
    logic: {
      summary: "Convert a non-negative integer to its English words representation.",
      approach: "Divide and conquer. Segment integer into chunks of thousands (Billion, Million, Thousand). Write helper to convert 3-digit numbers using maps.",
      intuition: "Number naming is recursive across scale boundaries.",
      pseudocode: "helper(num) -> resolves thousands chunks recursively",
      dryRun: "123 -> 'One Hundred Twenty Three'.",
      time: "O(log10 N)",
      space: "O(log10 N)",
      interviewPoints: ["Handle zero case explicitly.", "Spaces management.", "Recursive structures."]
    },
    java: `public class IntegerToWords {
    private final String[] LESS_THAN_20 = {"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};
    private final String[] TENS = {"", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};
    private final String[] THOUSANDS = {"", "Thousand", "Million", "Billion"};

    public String numberToWords(int num) {
        if (num == 0) return "Zero";
        int i = 0;
        String words = "";
        while (num > 0) {
            if (num % 1000 != 0) {
                words = helper(num % 1000) + THOUSANDS[i] + " " + words;
            }
            num /= 1000;
            i++;
        }
        return words.trim();
    }
    
    private String helper(int num) {
        if (num == 0) return "";
        else if (num < 20) return LESS_THAN_20[num] + " ";
        else if (num < 100) return TENS[num / 10] + " " + helper(num % 10);
        else return LESS_THAN_20[num / 100] + " Hundred " + helper(num % 100);
    }
}`
  },
  "LC-1119": {
    logic: {
      summary: "Remove all vowels from a string.",
      approach: "Linear scan filtering. Check characters and append non-vowels to a StringBuilder.",
      intuition: "Filter characters in O(n).",
      pseudocode: "filter vowel characters",
      dryRun: "'leetcode' -> 'ltcd'.",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Comparison with replaceAll regex."]
    },
    java: `public class RemoveVowelsSimple {
    public static String removeVowels(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c != 'a' && c != 'e' && c != 'i' && c != 'o' && c != 'u') {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}`
  },
  "TCS-ST06": {
    logic: {
      summary: "Remove characters from a string except alphabets.",
      approach: "Linear check. Retain characters in `a-z` and `A-Z` range.",
      intuition: "ASCII range filter.",
      pseudocode: "filter non-alphabet characters",
      dryRun: "'a1b!' -> 'ab'.",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Character classification methods."]
    },
    java: `public class KeepOnlyAlphabets {
    public static String filter(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLetter(c)) {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}`
  },
  "LC-1021": {
    logic: {
      summary: "Remove the outermost parentheses of every primitive decomposition of a parentheses string.",
      approach: "Track nesting level. Increment level on '(' (append to result if level > 0), decrement level on ')' (append if level > 0).",
      intuition: "Outermost parentheses always sit at nesting level 0.",
      pseudocode: "opened = 0\nfor c in s:\n  if c == '(': if opened > 0 add c, opened++\n  if c == ')': opened--, if opened > 0 add c",
      dryRun: "'(()())' -> opened=0 -> '(' ignored -> level=1 -> '(' added -> ')' added -> '(' added -> ')' added -> outer ')' ignored. Result: '()()'.",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Linear scan validation.", "Stack alternative comparison."]
    },
    java: `public class RemoveOuterParentheses {
    public static String removeOuterParentheses(String s) {
        StringBuilder sb = new StringBuilder();
        int opened = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') {
                if (opened > 0) sb.append(c);
                opened++;
            } else {
                opened--;
                if (opened > 0) sb.append(c);
            }
        }
        return sb.toString();
    }
}`
  },
  "TCS-ST09": {
    logic: {
      summary: "Sum of the numbers in a String.",
      approach: "Scan string. Accumulate current consecutive digits into a number. When non-digit is hit, add number to sum and reset.",
      intuition: "Group contiguous digit sequences to form integers.",
      pseudocode: "sum = num = 0\nfor c in s:\n  if digit: num = num*10 + digit\n  else: sum += num, num = 0",
      dryRun: "'12a30' -> 12 + 30 = 42.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Handle trailing numbers at end of string."]
    },
    java: `public class SumNumbersInString {
    public static int sumNumbers(String s) {
        int sum = 0, num = 0;
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                num = num * 10 + (c - '0');
            } else {
                sum += num;
                num = 0;
            }
        }
        return sum + num;
    }
}`
  },
  "TCS-ST10": {
    logic: {
      summary: "Capitalize first and last character of each word.",
      approach: "Split by space, capitalize start/end index of each token, and join.",
      intuition: "Modify bounds of word boundaries.",
      pseudocode: "split, change start and end chars, join",
      dryRun: "'hello world' -> 'HellO WorlD'.",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Handling single letter words."]
    },
    java: `public class CapitalizeStartEnd {
    public static String capitalize(String s) {
        String[] words = s.split(" ");
        StringBuilder sb = new StringBuilder();
        for (String w : words) {
            if (w.length() == 0) continue;
            char[] chars = w.toCharArray();
            chars[0] = Character.toUpperCase(chars[0]);
            chars[chars.length - 1] = Character.toUpperCase(chars[chars.length - 1]);
            sb.append(new String(chars)).append(" ");
        }
        return sb.toString().trim();
    }
}`
  },
  "TCS-ST11": {
    logic: {
      summary: "Calculate frequency of characters in a string.",
      approach: "Freq array of size 256. Count character occurrences.",
      intuition: "Counts buckets mapping.",
      pseudocode: "freq = array(256)\nfor c in s: freq[c]++",
      dryRun: "'aab' -> a:2, b:1.",
      time: "O(N)",
      space: "O(1) (fixed 256)",
      interviewPoints: ["Unicode character support options."]
    },
    java: `public class CharFrequencyCount {
    public static int[] getFrequency(String s) {
        int[] freq = new int[256];
        for (char c : s.toCharArray()) {
            freq[c]++;
        }
        return freq;
    }
}`
  },
  "LC-44": {
    logic: {
      summary: "Wildcard Matching supporting '?' and '*'.",
      approach: "Dynamic Programming. `dp[i][j]` indicates if `s[0...i-1]` matches `p[0...j-1]`. If `p[j-1] == '*'`, transitions: match empty string (`dp[i][j-1]`) or match character (`dp[i-1][j]`).",
      intuition: "Asterisk wildcard matches any sequence of characters including the empty sequence.",
      pseudocode: "dp[i][j]: if '*': dp[i][j-1] || dp[i-1][j] else if '?' or match: dp[i-1][j-1]",
      dryRun: "s='aa', p='*' -> matches anything. Returns true.",
      time: "O(M * N)",
      space: "O(M * N)",
      interviewPoints: ["Compare with Regular Expression Matching '*'.", "Iterative two pointers greedy search overview.", "Base cases."]
    },
    java: `public class WildcardMatching {
    public static boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        
        for (int j = 1; j <= n; j++) {
            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 1];
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                } else if (pc == '?' || pc == s.charAt(i - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        return dp[m][n];
    }
}`
  },
  "TCS-ST16": {
    logic: {
      summary: "Return maximum occurring character in the input string.",
      approach: "Scan frequencies, return character with highest count.",
      intuition: "Max value index lookup.",
      pseudocode: "find max index in freq array",
      dryRun: "'test' -> 't' (count 2).",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Tie breaker strategies."]
    },
    java: `public class MaxOccurChar {
    public static char getMax(String s) {
        int[] freq = new int[256];
        for (char c : s.toCharArray()) freq[c]++;
        char maxChar = ' ';
        int maxVal = -1;
        for (int i = 0; i < 256; i++) {
            if (freq[i] > maxVal) {
                maxVal = freq[i];
                maxChar = (char) i;
            }
        }
        return maxChar;
    }
}`
  },
  "TCS-ST18": {
    logic: {
      summary: "Print all duplicates in the input string.",
      approach: "Count frequencies. Scan frequency map and print keys with count > 1.",
      intuition: "Bucket threshold check.",
      pseudocode: "print keys with freq > 1",
      dryRun: "'aab' -> prints 'a'.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Maintain original order using LinkedHashMap."]
    },
    java: `import java.util.*;

public class PrintDuplicates {
    public static void print(String s) {
        int[] freq = new int[256];
        for (char c : s.toCharArray()) freq[c]++;
        for (int i = 0; i < 256; i++) {
            if (freq[i] > 1) {
                System.out.println((char) i + " -> " + freq[i]);
            }
        }
    }
}`
  },
  "TCS-ST19": {
    logic: {
      summary: "Remove characters from first string present in second string.",
      approach: "HashSet. Store second string characters. Scan first string, append characters not present in set.",
      intuition: "Set matching filter.",
      pseudocode: "filter s1 chars not in set(s2)",
      dryRun: "s1='abc', s2='b' -> 'ac'.",
      time: "O(N + M)",
      space: "O(M)",
      interviewPoints: ["Constant-time lookup benefits."]
    },
    java: `import java.util.*;

public class RemoveCommonChars {
    public static String remove(String s1, String s2) {
        Set<Character> set = new HashSet<>();
        for (char c : s2.toCharArray()) set.add(c);
        StringBuilder sb = new StringBuilder();
        for (char c : s1.toCharArray()) {
            if (!set.contains(c)) {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}`
  },
  "TCS-ST20": {
    logic: {
      summary: "Change every letter with next lexicographic alphabet.",
      approach: "Shift chars: `c -> c + 1` (watch out boundaries: 'z' -> 'a', 'Z' -> 'A').",
      intuition: "Caesar cipher shift of 1.",
      pseudocode: "shift chars by 1",
      dryRun: "'abc' -> 'bcd'. 'z' -> 'a'.",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Wrap around checks."]
    },
    java: `public class LexicographicShift {
    public static String shift(String s) {
        char[] chars = s.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            char c = chars[i];
            if (c == 'z') chars[i] = 'a';
            else if (c == 'Z') chars[i] = 'A';
            else if (Character.isLetter(c)) chars[i] = (char) (c + 1);
        }
        return new String(chars);
    }
}`
  },
  "TCS-ST21": {
    logic: {
      summary: "Find the largest word in a given string.",
      approach: "Split by space, track word with max length.",
      intuition: "Token size comparison.",
      pseudocode: "split, find max len word",
      dryRun: "'a big word' -> 'word'.",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Handle multiple consecutive space delimiters."]
    },
    java: `public class LargestWord {
    public static String find(String s) {
        String[] words = s.split("\\s+");
        String maxWord = "";
        for (String w : words) {
            if (w.length() > maxWord.length()) {
                maxWord = w;
            }
        }
        return maxWord;
    }
}`
  },
  "TCS-ST22": {
    logic: {
      summary: "Sort characters in a string.",
      approach: "Convert to charArray, sort, convert back.",
      intuition: "Characters sort.",
      pseudocode: "sort(charArray)",
      dryRun: "'cab' -> 'abc'.",
      time: "O(N log N)",
      space: "O(N)",
      interviewPoints: ["Counting sort O(N) alternative for ASCII ranges."]
    },
    java: `import java.util.*;

public class StringCharSort {
    public static String sort(String s) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        return new String(chars);
    }
}`
  },
  "TCS-ST23": {
    logic: {
      summary: "Count number of words in a given string.",
      approach: "Trim and split by spaces, count tokens length.",
      intuition: "Word tokenizer.",
      pseudocode: "trim, split by space, count",
      dryRun: "'hello world' -> 2.",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Empty string checks."]
    },
    java: `public class CountWords {
    public static int count(String s) {
        s = s.trim();
        if (s.isEmpty()) return 0;
        return s.split("\\s+").length;
    }
}`
  },
  "TCS-ST24": {
    logic: {
      summary: "Find word with highest number of repeated letters.",
      approach: "For each word, find max occurrences of any character. Return word with highest repetition score.",
      intuition: "Measure internal word character repetition frequency.",
      pseudocode: "for w in words: score = maxCharFreq(w). return max score word",
      dryRun: "'apple tree' -> tree has 'e' twice (score 2), apple has 'p' twice (score 2). Returns first matched.",
      time: "O(N * L)",
      space: "O(L)",
      interviewPoints: ["Compare sorting word letters approach."]
    },
    java: `public class HighestRepeatLetterWord {
    public static String find(String s) {
        String[] words = s.split("\\s+");
        String ans = "";
        int maxRep = 0;
        for (String w : words) {
            int score = maxRepeat(w);
            if (score > maxRep) {
                maxRep = score;
                ans = w;
            }
        }
        return maxRep <= 1 ? "-1" : ans;
    }
    private static int maxRepeat(String w) {
        int[] freq = new int[256];
        int max = 0;
        for (char c : w.toCharArray()) {
            freq[c]++;
            max = Math.max(max, freq[c]);
        }
        return max;
    }
}`
  },
  "TCS-ST25": {
    logic: {
      summary: "Change case of each character in a string.",
      approach: "Loop characters. Swap lowercase to uppercase and vice versa.",
      intuition: "Flip character case boundaries.",
      pseudocode: "flip cases",
      dryRun: "'aB' -> 'Ab'.",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["ASCII bitwise toggle operations (XOR 32)."]
    },
    java: `public class ToggleCase {
    public static String toggle(String s) {
        char[] chars = s.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            char c = chars[i];
            if (Character.isLowerCase(c)) chars[i] = Character.toUpperCase(c);
            else if (Character.isUpperCase(c)) chars[i] = Character.toLowerCase(c);
        }
        return new String(chars);
    }
}`
  },
  "TCS-ST26": {
    logic: {
      summary: "Concatenate one string to another.",
      approach: "String concat or StringBuilder.",
      intuition: "String merge.",
      pseudocode: "return s1 + s2",
      dryRun: "'a', 'b' -> 'ab'.",
      time: "O(N + M)",
      space: "O(N + M)",
      interviewPoints: ["Why is StringBuilder better in loops?"]
    },
    java: `public class ConcatStrings {
    public static String concat(String s1, String s2) {
        return s1 + s2;
    }
}`
  },
  "LC-28": {
    logic: {
      summary: "Find the Index of the First Occurrence of needle in haystack.",
      approach: "indexOf or KMP string searching algorithm.",
      intuition: "Pattern searching indices boundaries.",
      pseudocode: "haystack.indexOf(needle)",
      dryRun: "haystack='sadbutsad', needle='sad' -> returns 0.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["KMP algorithm details.", "Rabin-Karp Rolling Hash overview."]
    },
    java: `public class FirstOccurrence {
    public static int strStr(String haystack, String needle) {
        return haystack.indexOf(needle);
    }
}`
  },
  "LC-151": {
    logic: {
      summary: "Reverse the words in a string.",
      approach: "Trim and split by spaces, reverse tokens array order, and join.",
      intuition: "Reverse relative ordering of space-delimited units.",
      pseudocode: "split, reverse array, join with space",
      dryRun: "'the sky' -> ['the', 'sky'] -> reverse -> ['sky', 'the'] -> 'sky the'.",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Handle multiple spaces between words.", "Explain in-place word reverse alternative."]
    },
    java: `public class ReverseWords {
    public static String reverseWords(String s) {
        String[] words = s.trim().split("\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(" ");
        }
        return sb.toString();
    }
}`
  }
};


