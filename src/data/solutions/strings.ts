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
  "TCS-ST01": {
    logic: {
      summary: "Check if a given string is a palindrome.",
      approach: "Two pointers, start and end. Compare characters, moving inward. Ignore case or non-alphanumeric if required by specific formats.",
      intuition: "Symmetric character check from boundaries inward.",
      pseudocode: "l = 0, r = s.length() - 1\nwhile l < r:\n  if s[l] != s[r] return false\n  l++, r--\nreturn true",
      dryRun: "s = 'radar'\nl=0 ('r'), r=4 ('r'). Match.\nl=1 ('a'), r=3 ('a'). Match. Returns true.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Ask if case sensitive", "Ask if whitespace or special characters should be ignored."]
    },
    java: `import java.util.*;

public class PalindromeString {
    public static boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) return false;
            l++; r--;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: ");
        String s = sc.next();
        System.out.println("Is palindrome? " + isPalindrome(s));
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
  "TCS-ST04": {
    logic: {
      summary: "Remove all vowels from the string.",
      approach: "Use a StringBuilder to construct a string, omitting any characters that are vowels.",
      intuition: "Filtering characters in O(n) time.",
      pseudocode: "res = StringBuilder()\nfor char in string:\n  if not vowel: res.append(char)\nreturn res.toString()",
      dryRun: "'hello' -> omit e, o -> 'hll'",
      time: "O(n)",
      space: "O(n) for return string",
      interviewPoints: ["Discuss regex alternatives: s.replaceAll('[aeiouAEIOU]', ''). Which is more performant? (Loops are generally faster)."]
    },
    java: `import java.util.*;

public class RemoveVowels {
    public static String removeVowels(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            char lower = Character.toLowerCase(ch);
            if (lower != 'a' && lower != 'e' && lower != 'i' && lower != 'o' && lower != 'u') {
                sb.append(ch);
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string: ");
        String s = sc.nextLine();
        System.out.println("Result: " + removeVowels(s));
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
  }
};
