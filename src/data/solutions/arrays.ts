import type { QuestionLogic } from "../types";

export const ARRAY_SOLUTIONS: Record<string, { logic: QuestionLogic; java: string }> = {
  "LC-1": {
    logic: {
      summary: "Given an array of integers and a target, return indices of the two numbers that add up to target.",
      approach: "One-pass HashMap: as we iterate, compute complement (target - num). If present in map, return indices; otherwise, store current number and its index in map.",
      intuition: "Trade memory for speed. By keeping a map of numbers seen so far, we can find the complement in O(1) time instead of O(n) scanning.",
      pseudocode: "Map<Integer, Integer> map = new HashMap()\nfor i from 0 to n-1:\n  int diff = target - nums[i]\n  if map.containsKey(diff) return [map.get(diff), i]\n  map.put(nums[i], i)\nreturn []",
      dryRun: "nums = [2,7,11,15], target = 9\ni = 0: nums[0] = 2, diff = 7. Not in map. Map puts (2, 0).\ni = 1: nums[1] = 7, diff = 2. Map contains 2! Return [0, 1].",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: ["Clarify if array is sorted (if so, two-pointer O(1) space is possible)", "Ask about duplicates and multiple solutions", "Confirm return values for no match"]
    },
    java: `import java.util.*;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] { -1, -1 };
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter array size: ");
        int n = sc.nextInt();
        int[] nums = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.print("Enter target sum: ");
        int target = sc.nextInt();
        int[] res = twoSum(nums, target);
        System.out.println("Indices: " + Arrays.toString(res));
        sc.close();
    }
}`
  },
  "LC-217": {
    logic: {
      summary: "Determine if any value appears at least twice in a given integer array.",
      approach: "Insert elements into a HashSet. If an element is already present in the set, a duplicate exists.",
      intuition: "HashSet offers O(1) average time complexity for insertion and lookup. If we ever try to add a number that is already in the set, we immediately know there's a duplicate.",
      pseudocode: "Set<Integer> set = new HashSet()\nfor x in nums:\n  if set.contains(x) return true\n  set.add(x)\nreturn false",
      dryRun: "nums = [1,2,3,1]\ni = 0: add 1. Set = {1}\ni = 1: add 2. Set = {1, 2}\ni = 2: add 3. Set = {1, 2, 3}\ni = 3: add 1. Already in set! Return true.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: ["Compare with sorting: O(n log n) time, O(1) space", "Discuss hash collisions and worst-case scenario O(n^2)", "Mention space-time trade-off"]
    },
    java: `import java.util.*;

public class ContainsDuplicate {
    public static boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (!set.add(num)) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter array size: ");
        int n = sc.nextInt();
        int[] nums = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println("Contains duplicate? " + containsDuplicate(nums));
        sc.close();
    }
}`
  },
  "LC-242": {
    logic: {
      summary: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
      approach: "Create a frequency table of size 26 for English letters. Increment counts for characters in s, decrement for t. Check if all values are zero.",
      intuition: "An anagram must have the exact same count for every character. If the lengths differ, they cannot be anagrams. Using an integer array serves as a high-performance hash map.",
      pseudocode: "if s.len != t.len return false\ncount = array of size 26\nfor i from 0 to s.len-1:\n  count[s[i] - 'a']++\n  count[t[i] - 'a']--\nfor x in count: if x != 0 return false\nreturn true",
      dryRun: "s = 'anagram', t = 'nagaram'\nLength is equal (7). Count array increments and decrements character counts. All end up at 0. Return true.",
      time: "O(n)",
      space: "O(1) - fixed alphabet size of 26",
      interviewPoints: ["What if inputs contain Unicode characters? Use a standard HashMap.", "Compare sorting approach: O(n log n) time, O(n) space.", "Length mismatch check is an O(1) early exit."]
    },
    java: `import java.util.*;

public class ValidAnagram {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] table = new int[26];
        for (int i = 0; i < s.length(); i++) {
            table[s.charAt(i) - 'a']++;
            table[t.charAt(i) - 'a']--;
        }
        for (int count : table) {
            if (count != 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter string s: ");
        String s = sc.next();
        System.out.print("Enter string t: ");
        String t = sc.next();
        System.out.println("Is anagram? " + isAnagram(s, t));
        sc.close();
    }
}`
  },
  "LC-49": {
    logic: {
      summary: "Group an array of strings into sublists where each sublist contains anagrams of each other.",
      approach: "Use a HashMap where the key is the sorted version of the string, and the value is a list of its anagrams.",
      intuition: "All anagrams will produce the exact same string when sorted. Thus, sorting provides a canonical representation to cluster them.",
      pseudocode: "Map<String, List<String>> map = new HashMap()\nfor s in strs:\n  char[] arr = s.toCharArray()\n  sort(arr)\n  String sorted = new String(arr)\n  map.computeIfAbsent(sorted, k -> new ArrayList()).add(s)\nreturn new ArrayList(map.values())",
      dryRun: "strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']\n'eat' -> sorted 'aet' -> map: {'aet': ['eat']}\n'tea' -> sorted 'aet' -> map: {'aet': ['eat', 'tea']}\nReturns clustered lists.",
      time: "O(n * k log k) where n is number of strings and k is max length of a string.",
      space: "O(n * k)",
      interviewPoints: ["Can we do it in O(n * k)? Yes, by representing character counts as a string key (e.g. '1#0#2...').", "Clarify handling of empty strings or special characters."]
    },
    java: `import java.util.*;

public class GroupAnagrams {
    public static List<List<String>> groupAnagrams(String[] strs) {
        if (strs == null || strs.length == 0) return new ArrayList<>();
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] ca = s.toCharArray();
            Arrays.sort(ca);
            String key = String.valueOf(ca);
            if (!map.containsKey(key)) map.put(key, new ArrayList<>());
            map.get(key).add(s);
        }
        return new ArrayList<>(map.values());
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of strings: ");
        int n = sc.nextInt();
        String[] strs = new String[n];
        System.out.println("Enter strings: ");
        for (int i = 0; i < n; i++) strs[i] = sc.next();
        List<List<String>> grouped = groupAnagrams(strs);
        System.out.println("Grouped Anagrams: " + grouped);
        sc.close();
    }
}`
  },
  "LC-347": {
    logic: {
      summary: "Given an integer array nums and an integer k, return the k most frequent elements.",
      approach: "Calculate frequencies using a Map. Use bucket sort where indices of the buckets correspond to frequencies.",
      intuition: "Bucket sort allows grouping numbers by frequency in linear time O(n), avoiding the O(n log n) overhead of a PriorityQueue.",
      pseudocode: "map = frequency map\nbuckets = array of lists of size nums.len + 1\nfor num, freq in map:\n  buckets[freq].add(num)\nresult = []\nfor i from nums.len down to 0:\n  add elements in buckets[i] to result until result.size == k\nreturn result",
      dryRun: "nums = [1,1,1,2,2,3], k = 2\nfreq: {1: 3, 2: 2, 3: 1}\nbuckets: 1 -> [3], 2 -> [2], 3 -> [1]\nIterating backwards from bucket 3: add 1 (from bucket 3), add 2 (from bucket 2). Result: [1, 2].",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: ["Compare with PriorityQueue solution which takes O(n log k) time.", "Explain bucket sort and why it achieves O(n) complexity here."]
    },
    java: `import java.util.*;

public class TopKFrequent {
    public static int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        
        List<Integer>[] bucket = new List[nums.length + 1];
        for (int key : count.keySet()) {
            int frequency = count.get(key);
            if (bucket[frequency] == null) {
                bucket[frequency] = new ArrayList<>();
            }
            bucket[frequency].add(key);
        }
        
        int[] res = new int[k];
        int counter = 0;
        for (int pos = bucket.length - 1; pos >= 0 && counter < k; pos--) {
            if (bucket[pos] != null) {
                for (int num : bucket[pos]) {
                    res[counter++] = num;
                    if (counter == k) break;
                }
            }
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter array size: ");
        int n = sc.nextInt();
        int[] nums = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.print("Enter k: ");
        int k = sc.nextInt();
        System.out.println("Top K frequent: " + Arrays.toString(topKFrequent(nums, k)));
        sc.close();
    }
}`
  },
  "LC-238": {
    logic: {
      summary: "Return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i] without using division.",
      approach: "Two passes: first pass calculates prefix products for each index. Second pass calculates suffix products on the fly, multiplying them with prefix values.",
      intuition: "For any element at index i, the result is prefix_product[i-1] * suffix_product[i+1]. We can construct this without division in O(1) auxiliary space.",
      pseudocode: "res = array of size n\nres[0] = 1\nfor i from 1 to n-1: res[i] = res[i-1] * nums[i-1]\nright = 1\nfor i from n-1 down to 0:\n  res[i] = res[i] * right\n  right = right * nums[i]\nreturn res",
      dryRun: "nums = [1,2,3,4]\nPrefix pass: [1, 1, 2, 6]\nSuffix pass (R starts at 1):\ni=3: res[3]=6*1=6. R=1*4=4\ni=2: res[2]=2*4=8. R=4*3=12\ni=1: res[1]=1*12=12. R=12*2=24\ni=0: res[0]=1*24=24. R=24*1=24\nReturns [24,12,8,6].",
      time: "O(n)",
      space: "O(1) auxiliary space (excluding output array)",
      interviewPoints: ["Why division doesn't work (zero values in input)", "How to handle single zero vs multiple zeroes in input"]
    },
    java: `import java.util.*;

public class ProductExceptSelf {
    public static int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] = res[i] * right;
            right = right * nums[i];
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter array size: ");
        int n = sc.nextInt();
        int[] nums = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int[] res = productExceptSelf(nums);
        System.out.println("Product except self: " + Arrays.toString(res));
        sc.close();
    }
}`
  },
  "LC-128": {
    logic: {
      summary: "Find the length of the longest consecutive elements sequence in an unsorted array.",
      approach: "Store all numbers in a HashSet. For each number, check if it's the start of a sequence (i.e. num-1 is not in set). If it is, count how far the sequence goes.",
      intuition: "Checking if a sequence exists from its start ensures that each number is visited at most twice, resulting in a linear runtime O(n).",
      pseudocode: "set = HashSet of nums\nmaxLen = 0\nfor x in set:\n  if x-1 not in set:\n    curr = x, len = 1\n    while curr+1 in set:\n      curr++, len++\n    maxLen = max(maxLen, len)\nreturn maxLen",
      dryRun: "nums = [100, 4, 200, 1, 3, 2]\nSet: {1, 2, 3, 4, 100, 200}\nStart check:\n100 (100-1 not in set) -> len=1\n4 (4-1=3 in set) -> skip\n200 (199 not in set) -> len=1\n1 (0 not in set) -> loop: 2,3,4 in set -> len=4\nReturns 4.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: ["Compare with sorting O(n log n) approach.", "Explain why the inner loop doesn't make it O(n^2) (amortized analysis)."]
    },
    java: `import java.util.*;

public class LongestConsecutiveSequence {
    public static int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) set.add(num);
        int maxLen = 0;
        for (int num : set) {
            if (!set.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;
                while (set.contains(currentNum + 1)) {
                    currentNum += 1;
                    currentStreak += 1;
                }
                maxLen = Math.max(maxLen, currentStreak);
            }
        }
        return maxLen;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter array size: ");
        int n = sc.nextInt();
        int[] nums = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println("Longest consecutive sequence: " + longestConsecutive(nums));
        sc.close();
    }
}`
  },
  "LC-271": {
    logic: {
      summary: "Design an algorithm to encode a list of strings to a single string, and decode it back.",
      approach: "Encode strings by prepending the length of each string followed by a delimiter (e.g. length + '#' + string). Decode by reading the length, scanning the string, and repeating.",
      intuition: "Using a length-based header prevents delimiters in the string from causing decoding errors, making it highly robust.",
      pseudocode: "encode(strs):\n  sb = new StringBuilder()\n  for s in strs: sb.append(s.length).append('#').append(s)\n  return sb.toString()\n\ndecode(str):\n  res = new ArrayList()\n  i = 0\n  while i < str.length:\n    j = find '#' from i\n    len = parseInt(str[i..j])\n    res.add(str[j+1 .. j+1+len])\n    i = j+1+len\n  return res",
      dryRun: "strs = ['hello', 'world']\nEncode: '5#hello5#world'\nDecode: Read 5, read 'hello'. Read 5, read 'world'. Done.",
      time: "O(n) for both encode and decode",
      space: "O(1) auxiliary space",
      interviewPoints: ["Can you use a simple delimiter like ','? No, because strings can contain commas.", "Explain handling of empty lists and empty strings."]
    },
    java: `import java.util.*;

public class EncodeDecodeStrings {
    public static String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();
        for (String s : strs) {
            sb.append(s.length()).append("#").append(s);
        }
        return sb.toString();
    }

    public static List<String> decode(String str) {
        List<String> res = new ArrayList<>();
        int i = 0;
        while (i < str.length()) {
            int slash = str.indexOf('#', i);
            int size = Integer.parseInt(str.substring(i, slash));
            i = slash + 1 + size;
            res.add(str.substring(slash + 1, i));
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of strings: ");
        int n = sc.nextInt();
        List<String> list = new ArrayList<>();
        System.out.println("Enter strings: ");
        for (int i = 0; i < n; i++) list.add(sc.next());
        String encoded = encode(list);
        System.out.println("Encoded: " + encoded);
        System.out.println("Decoded: " + decode(encoded));
        sc.close();
    }
}`
  },
  "LC-15": {
    logic: {
      summary: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and sum to 0.",
      approach: "Sort the array. Loop through elements as anchor. For each anchor, use two pointers (left & right) to find pairs that sum to the negative anchor value. Skip duplicates.",
      intuition: "Sorting reduces the search space and allows skipping duplicates easily in O(1) space. A two-pointer search on a sorted array reduces O(n^3) brute force to O(n^2).",
      pseudocode: "sort(nums)\nfor i from 0 to n-3:\n  if i > 0 and nums[i] == nums[i-1] continue\n  l = i + 1, r = n - 1\n  while l < r:\n    sum = nums[i] + nums[l] + nums[r]\n    if sum == 0:\n      res.add([nums[i], nums[l], nums[r]])\n      while l < r and nums[l] == nums[l+1] l++\n      while l < r and nums[r] == nums[r-1] r--\n      l++, r--\n    else if sum < 0: l++\n    else: r--",
      dryRun: "nums = [-1, 0, 1, 2, -1, -4]\nSorted: [-4, -1, -1, 0, 1, 2]\ni = 0 (anchor=-4): l=-1, r=2. Max sum=-3 < 0 -> l moves right. No pair.\ni = 1 (anchor=-1): l=-1, r=2. Sum=0 -> found [-1, -1, 2]. Loop handles duplicates. Return all unique triplets.",
      time: "O(n^2)",
      space: "O(1) or O(n) depending on sort space",
      interviewPoints: ["Why sorting is crucial (easy duplicate removal)", "How to implement without sorting (using a Set, but takes extra space)"]
    },
    java: `import java.util.*;

public class ThreeSum {
    public static List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    r--;
                }
            }
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] nums = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println("Triplets: " + threeSum(nums));
        sc.close();
    }
}`
  },
  "LC-11": {
    logic: {
      summary: "Find two lines that together with the x-axis form a container containing the most water.",
      approach: "Two pointers at the far ends (left & right). Calculate area. Move the pointer that points to the shorter line inward.",
      intuition: "Area is constrained by the shorter line. Moving the taller line inward can never increase the area because width decreases and height is bounded by the shorter line anyway. Thus, we must move the shorter line.",
      pseudocode: "l = 0, r = n - 1, maxArea = 0\nwhile l < r:\n  h = min(height[l], height[r])\n  maxArea = max(maxArea, h * (r - l))\n  if height[l] < height[r]: l++\n  else: r--\nreturn maxArea",
      dryRun: "height = [1,8,6,2,5,4,8,3,7]\nl = 0 (1), r = 8 (7). Area = min(1,7) * 8 = 8. height[l] < height[r] -> l++.\nl = 1 (8), r = 8 (7). Area = min(8,7) * 7 = 49. height[l] > height[r] -> r--. Updates maxArea at each step.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Prove the correctness of moving the shorter pointer.", "Can we skip elements that are shorter than the current height boundary? Yes, for small optimizations."]
    },
    java: `import java.util.*;

public class ContainerWithMostWater {
    public static int maxArea(int[] height) {
        int max = 0, l = 0, r = height.length - 1;
        while (l < r) {
            int h = Math.min(height[l], height[r]);
            max = Math.max(max, h * (r - l));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return max;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] height = new int[n];
        System.out.println("Enter heights: ");
        for (int i = 0; i < n; i++) height[i] = sc.nextInt();
        System.out.println("Max area: " + maxArea(height));
        sc.close();
    }
}`
  },
  "LC-42": {
    logic: {
      summary: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      approach: "Two pointers at left & right. Track max left boundary and max right boundary. Trap water by accumulating difference between boundary maxes and current height.",
      intuition: "The water level above any bar is bounded by the minimum of the max heights to its left and right. Two pointers move inward, calculating trapped water for the smaller boundary side.",
      pseudocode: "l = 0, r = n - 1\nleftMax = 0, rightMax = 0, trapped = 0\nwhile l < r:\n  if height[l] < height[r]:\n    if height[l] >= leftMax: leftMax = height[l]\n    else: trapped += leftMax - height[l]\n    l++\n  else:\n    if height[r] >= rightMax: rightMax = height[r]\n    else: trapped += rightMax - height[r]\n    r--",
      dryRun: "height = [0,1,0,2,1,0,1,3,2,1,2,1]\nl = 0, r = 11. Left is smaller. leftMax=0. l++.\nl = 1 (1). leftMax=1. l++.\nl = 2 (0). trapped += 1 - 0 = 1. l++. Continues to count total water trapped.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Compare with DP array method: O(n) space.", "Compare with monotonic stack method: O(n) time, O(n) space.", "Discuss edge cases: empty input or strictly increasing/decreasing heights."]
    },
    java: `import java.util.*;

public class TrappingRainWater {
    public static int trap(int[] height) {
        int l = 0, r = height.length - 1;
        int leftMax = 0, rightMax = 0, trapped = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= leftMax) leftMax = height[l];
                else trapped += leftMax - height[l];
                l++;
            } else {
                if (height[r] >= rightMax) rightMax = height[r];
                else trapped += rightMax - height[r];
                r--;
            }
        }
        return trapped;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] height = new int[n];
        System.out.println("Enter elevation map: ");
        for (int i = 0; i < n; i++) height[i] = sc.nextInt();
        System.out.println("Trapped water: " + trap(height));
        sc.close();
    }
}`
  },
  "TCS-A01": {
    logic: {
      summary: "Find the smallest number in a given array.",
      approach: "Initialize min variable with the first element. Iterate through the array and update min whenever an element smaller than min is found.",
      intuition: "A single linear scan is required because every element must be checked at least once in an unsorted array.",
      pseudocode: "min = arr[0]\nfor val in arr:\n  if val < min: min = val\nreturn min",
      dryRun: "arr = [4, 2, 7, 1, 9]\nmin = 4 -> min = 2 -> min = 2 -> min = 1 -> min = 1. Returns 1.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["How to handle empty arrays?", "Can sorting be used? (Yes, but sorting takes O(n log n) which is sub-optimal)."]
    },
    java: `import java.util.*;

public class SmallestNumber {
    public static int getSmallest(int[] arr) {
        if (arr == null || arr.length == 0) throw new IllegalArgumentException("Array is empty");
        int min = arr[0];
        for (int num : arr) {
            if (num < min) min = num;
        }
        return min;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println("Smallest: " + getSmallest(arr));
        sc.close();
    }
}`
  },
  "TCS-A02": {
    logic: {
      summary: "Find the largest number in a given array.",
      approach: "Initialize max variable with the first element. Traverse the array and update max if any element is greater than current max.",
      intuition: "Every index must be inspected to ensure we find the absolute maximum value. This takes linear time.",
      pseudocode: "max = arr[0]\nfor val in arr:\n  if val > max: max = val\nreturn max",
      dryRun: "arr = [3, 8, 1, 12, 5]\nmax = 3 -> max = 8 -> max = 8 -> max = 12 -> max = 12. Returns 12.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Edge cases like arrays with duplicate maximums or single-element inputs."]
    },
    java: `import java.util.*;

public class LargestNumber {
    public static int getLargest(int[] arr) {
        if (arr == null || arr.length == 0) throw new IllegalArgumentException("Array is empty");
        int max = arr[0];
        for (int num : arr) {
            if (num > max) max = num;
        }
        return max;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println("Largest: " + getLargest(arr));
        sc.close();
    }
}`
  },
  "TCS-A03": {
    logic: {
      summary: "Find the second smallest and second largest elements in an array.",
      approach: "Do a single pass maintaining four variables: smallest, secondSmallest, largest, secondLargest. Update them accordingly as you read each element.",
      intuition: "Avoid sorting O(n log n). By maintaining trackers for first and second extremes, we can solve this in a single scan.",
      pseudocode: "smallest = inf, secSmallest = inf\nlargest = -inf, secLargest = -inf\nfor x in arr:\n  update smallest & secSmallest\n  update largest & secLargest\nreturn [secSmallest, secLargest]",
      dryRun: "arr = [1, 2, 4, 7, 7, 5]\nPass computes smallest=1, secSmallest=2, largest=7, secLargest=5. Returns [2, 5].",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["How to handle arrays with fewer than 2 distinct elements?", "Discuss handling of duplicates (should second largest be strictly smaller than largest or equal?)."]
    },
    java: `import java.util.*;

public class SecondSmallestLargest {
    public static void findElements(int[] arr) {
        if (arr.length < 2) {
            System.out.println("Invalid input size");
            return;
        }
        int small = Integer.MAX_VALUE, secondSmall = Integer.MAX_VALUE;
        int large = Integer.MIN_VALUE, secondLarge = Integer.MIN_VALUE;

        for (int x : arr) {
            if (x < small) {
                secondSmall = small;
                small = x;
            } else if (x < secondSmall && x != small) {
                secondSmall = x;
            }

            if (x > large) {
                secondLarge = large;
                large = x;
            } else if (x > secondLarge && x != large) {
                secondLarge = x;
            }
        }
        System.out.println("Second Smallest: " + secondSmall);
        System.out.println("Second Largest: " + secondLarge);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        findElements(arr);
        sc.close();
    }
}`
  },

  "TCS-A05": {
    logic: {
      summary: "Count the frequency of each element in an array.",
      approach: "Use a HashMap to store the count of each element. If array is small and positive, a frequency array can be used.",
      intuition: "A HashMap lets us do key-value mappings of elements and their counts in a single pass.",
      pseudocode: "Map<Integer, Integer> map = HashMap()\nfor x in arr:\n  map.put(x, map.getOrDefault(x, 0) + 1)\nprint map",
      dryRun: "[2, 2, 3, 1, 3] -> map: {2: 2, 3: 2, 1: 1}.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: ["What if memory is limited but array elements are sorted? (O(1) space linear scan)."]
    },
    java: `import java.util.*;

public class ElementFrequency {
    public static void printFrequencies(int[] arr) {
        Map<Integer, Integer> map = new LinkedHashMap<>();
        for (int num : arr) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " occurs " + entry.getValue() + " times");
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        printFrequencies(arr);
        sc.close();
    }
}`
  },
  "LC-167": {
    logic: {
      summary: "Find two numbers in a sorted array that add up to target.",
      approach: "Use two pointers starting at the beginning (left = 0) and the end (right = n-1). Check the sum at each step and move the pointers inward.",
      intuition: "Since the array is sorted, increasing left increases the sum, and decreasing right decreases the sum. We scan the range in a single linear pass.",
      pseudocode: "left = 0, right = n-1\nwhile left < right:\n  sum = nums[left] + nums[right]\n  if sum == target return [left+1, right+1]\n  else if sum < target left++\n  else right--",
      dryRun: "nums=[2,7,11,15], target=9\nl=0(2), r=3(15) -> sum=17 > 9 -> r=2\nl=0(2), r=2(11) -> sum=13 > 9 -> r=1\nl=0(2), r=1(7) -> sum=9 == 9 -> return [1, 2]",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain when this is better than the HashMap approach.",
        "Clarify that indices are 1-based.",
        "Discuss handling of duplicate values and integer overflow."
      ]
    },
    java: `import java.util.*;

public class TwoSumII {
    public static int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[] { left + 1, right + 1 };
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[] { -1, -1 };
    }
}`
  },
  "LC-26": {
    logic: {
      summary: "Remove duplicates from a sorted array in-place.",
      approach: "Use a two-pointer approach. Keep a write pointer at index 1. Traverse the array with a read pointer from index 1. Overwrite value if it differs from the previous element.",
      intuition: "Since the array is sorted, duplicates are adjacent. We only need to write unique values forward.",
      pseudocode: "write = 1\nfor read from 1 to n-1:\n  if nums[read] != nums[read-1]:\n    nums[write] = nums[read]\n    write++\nreturn write",
      dryRun: "nums=[1,1,2]\nw=1, r=1 -> nums[1]==nums[0], skip\nw=1, r=2 -> nums[2](2)!=nums[1](1) -> nums[1]=2, w=2. Return 2.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain that elements beyond returned length do not matter.",
        "Discuss why we don't need extra space (HashSet).",
        "Consider boundary checks for arrays of size 0 or 1."
      ]
    },
    java: `import java.util.*;

public class RemoveDuplicatesSorted {
    public static int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int writeIndex = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[writeIndex] = nums[i];
                writeIndex++;
            }
        }
        return writeIndex;
    }
}`
  },
  "LC-53": {
    logic: {
      summary: "Find the contiguous subarray with the largest sum.",
      approach: "Kadane's Algorithm. Iterate through the array. At each index, decide whether to add the current element to the existing subarray or start a new subarray.",
      intuition: "A local maximum ending at index i is either the element itself, or the current element plus the maximum ending at i-1.",
      pseudocode: "maxSoFar = nums[0], maxEndingHere = nums[0]\nfor i from 1 to n-1:\n  maxEndingHere = max(nums[i], maxEndingHere + nums[i])\n  maxSoFar = max(maxSoFar, maxEndingHere)\nreturn maxSoFar",
      dryRun: "nums=[-2,1,-3,4,-1,2,1,-5,4]\nInit: maxEnding= -2, maxSoFar= -2\ni=1 (1): maxEnding= max(1, -1)= 1, maxSoFar= 1\ni=2 (-3): maxEnding= max(-3, -2)= -2, maxSoFar= 1\ni=3 (4): maxEnding= max(4, 2)= 4, maxSoFar= 4\ni=4 (-1): maxEnding= max(-1, 3)= 3, maxSoFar= 4\ni=5 (2): maxEnding= max(2, 5)= 5, maxSoFar= 5\ni=6 (1): maxEnding= max(1, 6)= 6, maxSoFar= 6. Returns 6.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain Kadane's algorithm for all-negative arrays.",
        "How to return the actual subarray bounds (pointers).",
        "Discuss Divide and Conquer solution (O(n log n))."
      ]
    },
    java: `import java.util.*;

public class MaxSubarray {
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        return maxSoFar;
    }
}`
  },
  "LC-152": {
    logic: {
      summary: "Find the contiguous subarray with the largest product.",
      approach: "Maintain a running maximum product and a running minimum product ending at the current index. Swap them if the current element is negative.",
      intuition: "Since multiplying by a negative number flips signs, a very small minimum product can suddenly become a very large maximum product.",
      pseudocode: "maxProd = nums[0], minProd = nums[0], res = nums[0]\nfor i from 1 to n-1:\n  if nums[i] < 0: swap(maxProd, minProd)\n  maxProd = max(nums[i], maxProd * nums[i])\n  minProd = min(nums[i], minProd * nums[i])\n  res = max(res, maxProd)\nreturn res",
      dryRun: "nums=[2,3,-2,4]\nInit: maxP=2, minP=2, res=2\ni=1 (3): maxP=max(3,6)=6, minP=min(3,6)=3, res=6\ni=2 (-2): swap -> maxP=3, minP=6. maxP=max(-2,-6)=-2, minP=min(-2,-12)=-12, res=6\ni=3 (4): maxP=max(4,-8)=4, minP=min(4,-48)=-48, res=6. Returns 6.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Why must we track both minimum and maximum products?",
        "How to handle zero values in the array.",
        "Compare with Kadane's algorithm."
      ]
    },
    java: `import java.util.*;

public class MaxProductSubarray {
    public static int maxProduct(int[] nums) {
        if (nums.length == 0) return 0;
        int maxProd = nums[0];
        int minProd = nums[0];
        int result = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int val = nums[i];
            if (val < 0) {
                int temp = maxProd;
                maxProd = minProd;
                minProd = temp;
            }
            maxProd = Math.max(val, maxProd * val);
            minProd = Math.min(val, minProd * val);
            result = Math.max(result, maxProd);
        }
        return result;
    }
}`
  },
  "LC-56": {
    logic: {
      summary: "Merge overlapping intervals.",
      approach: "Sort the intervals by their start values. Iterate through the intervals and merge current interval with the last merged one if they overlap.",
      intuition: "Sorting aligns overlapping boundaries. Overlap occurs if the start of current interval is <= the end of the previously merged interval.",
      pseudocode: "sort(intervals)\nmerged = []\nfor i in intervals:\n  if merged is empty or last(merged).end < i.start: merged.add(i)\n  else: last(merged).end = max(last(merged).end, i.end)\nreturn merged",
      dryRun: "intervals=[[1,3],[2,6],[8,10],[15,18]]\nSorted: [[1,3],[2,6],[8,10],[15,18]]\nmerged=[[1,3]]\ni=[2,6]: overlap (2<=3) -> merged[-1]=[1, max(3,6)] = [1,6]\ni=[8,10]: no overlap (8>6) -> merged.add([8,10])\ni=[15,18]: no overlap (15>10) -> merged.add([15,18])",
      time: "O(n log n)",
      space: "O(n) for sorted outputs",
      interviewPoints: [
        "Why sorting by start times is necessary.",
        "Edge cases: nested intervals, exact matches, empty lists.",
        "Compare in-place merging vs generating new list."
      ]
    },
    java: `import java.util.*;

public class MergeIntervals {
    public static int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        int[] current = intervals[0];
        merged.add(current);
        for (int[] next : intervals) {
            if (next[0] <= current[1]) {
                current[1] = Math.max(current[1], next[1]);
            } else {
                current = next;
                merged.add(current);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`
  },
  "LC-57": {
    logic: {
      summary: "Insert a new interval into a sorted list of non-overlapping intervals, merging if necessary.",
      approach: "Iterate through the list. Add all intervals ending before the new interval starts. Merge overlapping intervals with the new interval. Add remaining intervals.",
      intuition: "Partition intervals into three phases: purely left, overlapping (merge), and purely right.",
      pseudocode: "res = []\nfor i in intervals:\n  if i.end < new.start: res.add(i)\n  else if i.start > new.end: merge(new), new = i\n  else: new = [min(new.start, i.start), max(new.end, i.end)]\nres.add(new)",
      dryRun: "intervals=[[1,3],[6,9]], new=[2,5]\ni=[1,3]: overlaps (3>=2). new = [min(1,2), max(5,3)] = [1,5]\ni=[6,9]: no overlap (6>5) -> res.add([1,5]), new=[6,9]. Ends loop -> res.add([6,9]). Result: [[1,5],[6,9]]",
      time: "O(n)",
      space: "O(n) for outputs",
      interviewPoints: [
        "Explain why this can be solved in O(n) instead of O(n log n).",
        "Consider binary search to find insertion position (though merging still takes O(n)).",
        "Handle empty intervals lists."
      ]
    },
    java: `import java.util.*;

public class InsertInterval {
    public static int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0, n = intervals.length;
        // 1. Add all intervals that end before the new interval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }
        // 2. Merge all overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);
        // 3. Add the rest
        while (i < n) {
            result.add(intervals[i]);
            i++;
        }
        return result.toArray(new int[result.size()][]);
    }
}`
  },
  "LC-253": {
    logic: {
      summary: "Find the minimum number of conference rooms required.",
      approach: "Split intervals into start times and end times. Sort both lists separately. Use two pointers to traverse them. If start time < end time, we need a room. Otherwise, a room is freed.",
      intuition: "At any point in time, the number of active rooms equals the number of meetings started minus the number of meetings ended.",
      pseudocode: "starts = sort(intervals.start), ends = sort(intervals.end)\ns = 0, e = 0, rooms = 0\nwhile s < n:\n  if starts[s] < ends[e]: rooms++, s++\n  else: e++\nreturn rooms",
      dryRun: "intervals=[[0,30],[5,10],[15,20]]\nstarts=[0,5,15], ends=[10,20,30]\ns=0(0) < e=0(10): rooms=1, s=1\ns=1(5) < e=0(10): rooms=2, s=2\ns=2(15) >= e=0(10): e=1\ns=2(15) < e=1(20): rooms=2, s=3. Ends. Returns 2.",
      time: "O(n log n)",
      space: "O(n)",
      interviewPoints: [
        "Discuss MinHeap (PriorityQueue) solution.",
        "Compare Heap vs Double-pointer sorted arrays approaches in terms of space/time.",
        "Explain what start/end pointers signify."
      ]
    },
    java: `import java.util.*;

public class MeetingRoomsII {
    public static int minMeetingRooms(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;
        int n = intervals.length;
        int[] starts = new int[n];
        int[] ends = new int[n];
        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        Arrays.sort(starts);
        Arrays.sort(ends);
        int rooms = 0, endPtr = 0;
        for (int startPtr = 0; startPtr < n; startPtr++) {
            if (starts[startPtr] < ends[endPtr]) {
                rooms++;
            } else {
                endPtr++;
            }
        }
        return rooms;
    }
}`
  },
  "LC-724": {
    logic: {
      summary: "Find the pivot index where the sum of numbers on the left equals the sum of numbers on the right.",
      approach: "Calculate total sum of elements. Maintain a running left sum as you iterate. Check if `leftSum == totalSum - leftSum - nums[i]`.",
      intuition: "Knowing total sum allows computing right sum in O(1) time without nested scans.",
      pseudocode: "totalSum = sum(nums), leftSum = 0\nfor i from 0 to n-1:\n  if leftSum == totalSum - leftSum - nums[i] return i\n  leftSum += nums[i]\nreturn -1",
      dryRun: "nums=[1,7,3,6,5,6], total=28\ni=0 (1): left=0, right=28-0-1=27 (mismatch). left+=1\ni=1 (7): left=1, right=28-1-7=20 (mismatch). left+=7 (8)\ni=2 (3): left=8, right=28-8-3=17 (mismatch). left+=3 (11)\ni=3 (6): left=11, right=28-11-6=11 (match!). Returns 3.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Confirm behavior if no pivot exists (return -1).",
        "Consider arrays with negative numbers (the math still works).",
        "Explain index boundary handling."
      ]
    },
    java: `import java.util.*;

public class PivotIndex {
    public static int pivotIndex(int[] nums) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        int leftSum = 0;
        for (int i = 0; i < nums.length; i++) {
            if (leftSum == totalSum - leftSum - nums[i]) {
                return i;
            }
            leftSum += nums[i];
        }
        return -1;
    }
}`
  },
  "LC-287": {
    logic: {
      summary: "Find the duplicate number in an array of n+1 integers where each integer is in range [1, n].",
      approach: "Floyd's Cycle-Finding Algorithm (Tortoise and Hare). Interpret array values as pointer addresses. Traverse pointers to find cycle start.",
      intuition: "Since numbers are in [1, n], indices map to valid nodes. Duplicate values create multiple links to the same index, which forms a cycle.",
      pseudocode: "slow = nums[0], fast = nums[0]\ndo: slow = nums[slow], fast = nums[nums[fast]] while slow != fast\nslow = nums[0]\nwhile slow != fast:\n  slow = nums[slow]\n  fast = nums[fast]\nreturn slow",
      dryRun: "nums=[1,3,4,2,2]. Indices: 0->1, 1->3, 2->4, 3->2, 4->2.\nslow=1, fast=3. slow=3, fast=4. slow=2, fast=4. slow=4, fast=4. Meet!\nslow=1, fast=4. slow=3, fast=2. slow=2, fast=2. Meet! Returns 2.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain constraint: cannot modify the array (so sorting or index negation is ruled out).",
        "Explain constraint: O(1) auxiliary space (so HashSet is ruled out).",
        "Prove mathematically why tortoise and hare meet at the cycle entry."
      ]
    },
    java: `import java.util.*;

public class FindDuplicate {
    public static int findDuplicate(int[] nums) {
        int tortoise = nums[0];
        int hare = nums[0];
        do {
            tortoise = nums[tortoise];
            hare = nums[nums[hare]];
        } while (tortoise != hare);
        
        tortoise = nums[0];
        while (tortoise != hare) {
            tortoise = nums[tortoise];
            hare = nums[hare];
        }
        return tortoise;
    }
}`
  },
  "LC-904": {
    logic: {
      summary: "Find the maximum length of subarray containing at most two unique values.",
      approach: "Sliding Window. Maintain a map of the counts of element types in the current window. Expand right. If unique elements > 2, shrink left.",
      intuition: "Subproblem: finding longest contiguous subarray under unique element constraints.",
      pseudocode: "left = 0, maxLen = 0, counts = Map()\nfor right from 0 to n-1:\n  counts[fruits[right]]++\n  while counts.size > 2:\n    counts[fruits[left]]--\n    if counts[fruits[left]] == 0: counts.remove(fruits[left])\n    left++\n  maxLen = max(maxLen, right - left + 1)\nreturn maxLen",
      dryRun: "fruits=[1,2,1,2,3]\nr=0(1): map={1:1}\nr=1(2): map={1:1, 2:1}\nr=2(1): map={1:2, 2:1}\nr=3(2): map={1:2, 2:2}\nr=4(3): map={1:2, 2:2, 3:1} > 2! left=0 -> map={1:1, 2:2, 3:1}. left=1 -> map={2:2, 3:1}. returns maxLen=4.",
      time: "O(n)",
      space: "O(1) because map holds at most 3 items",
      interviewPoints: [
        "Explain why space complexity is O(1) rather than O(n).",
        "Clarify relationship to 'Longest Substring with At Most K Distinct Characters' (LC-340).",
        "Explain when left pointer advances."
      ]
    },
    java: `import java.util.*;

public class FruitBaskets {
    public static int totalFruit(int[] fruits) {
        Map<Integer, Integer> map = new HashMap<>();
        int left = 0, maxFruit = 0;
        for (int right = 0; right < fruits.length; right++) {
            map.put(fruits[right], map.getOrDefault(fruits[right], 0) + 1);
            while (map.size() > 2) {
                map.put(fruits[left], map.get(fruits[left]) - 1);
                if (map.get(fruits[left]) == 0) {
                    map.remove(fruits[left]);
                }
                left++;
            }
            maxFruit = Math.max(maxFruit, right - left + 1);
        }
        return maxFruit;
    }
}`
  },
  "LC-1004": {
    logic: {
      summary: "Find the maximum number of consecutive 1s after flipping at most k 0s.",
      approach: "Sliding Window. Track the count of zeros inside the window. Expand right. If zeros count exceeds k, shrink left until zeros <= k.",
      intuition: "Instead of flipping, look for the longest subarray containing at most k zeros.",
      pseudocode: "left = 0, zeros = 0, maxLen = 0\nfor right from 0 to n-1:\n  if nums[right] == 0: zeros++\n  while zeros > k:\n    if nums[left] == 0: zeros--\n    left++\n  maxLen = max(maxLen, right - left + 1)\nreturn maxLen",
      dryRun: "nums=[1,1,1,0,0,0,1,1,1,1,0], k=2\nr=0-2: zeros=0\nr=3: zeros=1\nr=4: zeros=2\nr=5: zeros=3 > 2 -> shrink: l=0,1,2,3 -> l=4, zeros=2\nr=6-9: zeros=2\nr=10: zeros=3 > 2 -> shrink: l=4,5 -> l=6, zeros=2. Returns maxLen=6.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain the amortized O(1) steps of the left pointer.",
        "How would you solve this if k was very large?",
        "Discuss window size calculation: right - left + 1."
      ]
    },
    java: `import java.util.*;

public class MaxConsecutiveOnesIII {
    public static int longestOnes(int[] nums, int k) {
        int left = 0, zeros = 0, maxLen = 0;
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) {
                zeros++;
            }
            while (zeros > k) {
                if (nums[left] == 0) {
                    zeros--;
                }
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
  },
  "LC-4": {
    logic: {
      summary: "Find the median of two sorted arrays in logarithmic time.",
      approach: "Binary Search on partition index. Partition the smaller array A at index i, and partition B at index j such that left half size matches right half size. Find partition boundaries where `A[i-1] <= B[j]` and `B[j-1] <= A[i]`.",
      intuition: "Instead of merging (O(n+m)), we binary search the partition point in the smaller array. The partition divides both arrays into two halves with equal size and sorted boundaries.",
      pseudocode: "If A.len > B.len: swap A and B\nlow = 0, high = A.len\nwhile low <= high:\n  i = (low + high) / 2\n  j = (A.len + B.len + 1) / 2 - i\n  check bounds and swap directions\n  if boundaries align: return median",
      dryRun: "A=[1,3], B=[2]. partition on A: low=0, high=2.\ni=1, j=1. A_left=1, A_right=3, B_left=2, B_right=inf. 1<=inf, 2<=3 -> matches. Median = max(1, 2) = 2.0.",
      time: "O(log(min(m, n)))",
      space: "O(1)",
      interviewPoints: [
        "Why must we binary search on the smaller array? (Guarantees that index j is always in bounds).",
        "Explain boundary values when partitions are at extreme ends (use -infinity and +infinity).",
        "Compare with O(n + m) merging."
      ]
    },
    java: `public class MedianSortedArrays {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        int x = nums1.length;
        int y = nums2.length;
        int low = 0, high = x;
        
        while (low <= high) {
            int partitionX = low + (high - low) / 2;
            int partitionY = (x + y + 1) / 2 - partitionX;
            
            int maxLeftX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int minRightX = (partitionX == x) ? Integer.MAX_VALUE : nums1[partitionX];
            
            int maxLeftY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int minRightY = (partitionY == y) ? Integer.MAX_VALUE : nums2[partitionY];
            
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((x + y) % 2 == 0) {
                    return ((double) Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2.0;
                } else {
                    return (double) Math.max(maxLeftX, maxLeftY);
                }
            } else if (maxLeftX > minRightY) {
                high = partitionX - 1;
            } else {
                low = partitionX + 1;
            }
        }
        return 0.0;
    }
}`
  },
  "LC-33": {
    logic: {
      summary: "Search for a target value in a rotated sorted array.",
      approach: "Binary Search. Determine which half of the array (left or right) is sorted. If target lies within the boundaries of the sorted half, search that half. Else search the other half.",
      intuition: "A rotated sorted array always has at least one sorted half when split in the middle. We identify the sorted half and check target boundaries.",
      pseudocode: "while low <= high:\n  mid = (low + high) / 2\n  if nums[mid] == target return mid\n  if nums[low] <= nums[mid]: // left is sorted\n    if nums[low] <= target < nums[mid]: high = mid - 1\n    else: low = mid + 1\n  else: // right is sorted\n    if nums[mid] < target <= nums[high]: low = mid + 1\n    else: high = mid - 1",
      dryRun: "nums=[4,5,6,7,0,1,2], target=0\nlow=0, high=6. mid=3(7). left half [4..7] is sorted. 0 is not in [4..7] -> low=4.\nlow=4, high=6. mid=5(1). right half [1..2] is sorted. 0 is not in [1..2] -> high=4.\nlow=4, high=4. mid=4(0) == target -> returns 4.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "Why is it possible to run binary search in a non-sorted array? (Because we can discard half the search space based on target bounds).",
        "How do duplicate elements affect time complexity? (If duplicates exist, e.g. LC-81, complexity degrades to O(n)).",
        "Verify edge cases with size 1 or 2."
      ]
    },
    java: `public class SearchRotatedArray {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}`
  },
  "LC-153": {
    logic: {
      summary: "Find the minimum element in a rotated sorted array.",
      approach: "Binary Search. Compare mid element with the right boundary. If `nums[mid] > nums[right]`, the minimum lies in the right half. Else, the minimum is in the left half (including mid).",
      intuition: "The rotation point shifts larger numbers left, making the right side boundary smaller than elements before the pivot.",
      pseudocode: "low = 0, high = n - 1\nwhile low < high:\n  mid = (low + high) / 2\n  if nums[mid] > nums[high] low = mid + 1\n  else high = mid\nreturn nums[low]",
      dryRun: "nums=[3,4,5,1,2]\nlow=0, high=4. mid=2(5). 5 > 2 -> low=3\nlow=3, high=4. mid=3(1). 1 <= 2 -> high=3. Loop ends. Returns nums[3] = 1.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "Why do we compare with `nums[high]` and not `nums[low]`? (If array is already sorted, comparison with low can mislead pivot detection).",
        "Prove loop termination (low < high ensures no infinite loops).",
        "Handle duplicates (LC-154)."
      ]
    },
    java: `public class FindMinRotated {
    public static int findMin(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] > nums[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return nums[low];
    }
}`
  },
  "LC-121": {
    logic: {
      summary: "Find the maximum profit from buying and selling a stock once.",
      approach: "Single pass. Maintain the minimum price seen so far, and calculate the potential profit at each day. Record maximum profit.",
      intuition: "We can only sell after buying. The optimal strategy is to buy at lowest preceding price.",
      pseudocode: "minPrice = infinity, maxProfit = 0\nfor price in prices:\n  minPrice = min(minPrice, price)\n  maxProfit = max(maxProfit, price - minPrice)\nreturn maxProfit",
      dryRun: "prices=[7,1,5,3,6,4]\nprice=7: min=7, profit=0\nprice=1: min=1, profit=0\nprice=5: min=1, profit=max(0, 5-1)=4\nprice=3: min=1, profit=4\nprice=6: min=1, profit=max(4, 6-1)=5. Returns 5.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Why is nested loop O(n^2) inefficient?",
        "Compare with Kadane's algorithm (difference array).",
        "Confirm behavior if prices are monotonically decreasing (should return 0)."
      ]
    },
    java: `public class SellStock {
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`
  },
  "LC-122": {
    logic: {
      summary: "Maximize stock profit buying and selling multiple times.",
      approach: "Greedy. Iterate through price changes and accumulate all positive daily price increases.",
      intuition: "Since we can buy and sell on any days, any price increase from day i-1 to day i contributes to max profit.",
      pseudocode: "profit = 0\nfor i from 1 to n-1:\n  if prices[i] > prices[i-1]:\n    profit += prices[i] - prices[i-1]\nreturn profit",
      dryRun: "prices=[7,1,5,3,6]\np1->p5 (diff +4) -> profit=4\np5->p3 (diff -2) -> ignore\np3->p6 (diff +3) -> profit=4+3=7. Returns 7.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Why is greedy choice correct? (Buying at valley and selling at peak is equivalent to adding up all consecutive upward slopes).",
        "Can we perform multiple transactions on the same day? Yes (net change is the same).",
        "Compare with 2-state DP."
      ]
    },
    java: `public class SellStockII {
    public static int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
}`
  },
  "LC-704": {
    logic: {
      summary: "Perform standard binary search on a sorted integer array.",
      approach: "Iterative search. Maintain low and high pointers. Check middle value and shrink search space.",
      intuition: "Splitting search space in half repeatedly yields logarithmic time.",
      pseudocode: "low = 0, high = n - 1\nwhile low <= high:\n  mid = low + (high-low)/2\n  if nums[mid] == target return mid\n  else if nums[mid] < target low = mid + 1\n  else high = mid - 1\nreturn -1",
      dryRun: "nums=[-1,0,3,5,9], target=9\nlow=0, high=4. mid=2(3) < 9 -> low=3\nlow=3, high=4. mid=3(5) < 9 -> low=4\nlow=4, high=4. mid=4(9) == 9 -> returns 4.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "Explain potential overflow with `(low + high) / 2` and how `low + (high - low) / 2` avoids it.",
        "Compare iterative vs recursive implementation.",
        "Why must array be sorted?"
      ]
    },
    java: `public class BinarySearch {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
  },
  "LC-875": {
    logic: {
      summary: "Find the minimum eating speed k to consume all bananas within h hours.",
      approach: "Binary Search on answer speed range [1, max_banana_in_pile]. For a speed `mid`, calculate total hours. If hours <= h, search left half; else search right half.",
      intuition: "Eating speed has monotonic properties: if Koko can finish at speed k, she can finish at any speed > k. We search for the boundary speed.",
      pseudocode: "low = 1, high = max(piles)\nwhile low < high:\n  mid = low + (high-low)/2\n  if canEatAll(mid) <= h: high = mid\n  else: low = mid + 1\nreturn low",
      dryRun: "piles=[3,6,7,11], h=8. low=1, high=11.\nmid=6. hours: ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 <= 8 -> high=6.\nmid=3. hours: ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 > 8 -> low=4.\nmid=5. hours: 1+2+2+3 = 8 <= 8 -> high=5.\nmid=4. hours: 1+2+2+3 = 8 <= 8 -> high=4. Loop ends. Returns 4.",
      time: "O(n log(max_val))",
      space: "O(1)",
      interviewPoints: [
        "How is ceiling division calculated efficiently in integer math? `(pile + speed - 1) / speed`.",
        "Why does binary search range upper bound equal `max(piles)`? (eating faster than the largest pile does not reduce hours further).",
        "Verify potential integer overflow in hour sums."
      ]
    },
    java: `public class KokoEating {
    public static int minEatingSpeed(int[] piles, int h) {
        int max = 0;
        for (int p : piles) max = Math.max(max, p);
        
        int low = 1, high = max;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (canFinish(piles, mid, h)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
    
    private static boolean canFinish(int[] piles, int speed, int h) {
        int hours = 0;
        for (int p : piles) {
            hours += (p + speed - 1) / speed;
            if (hours > h) return false; // early exit
        }
        return hours <= h;
    }
}`
  },
  "LC-162": {
    logic: {
      summary: "Find a peak element in an array and return its index.",
      approach: "Binary Search. Compare mid element with `mid + 1`. If `nums[mid] < nums[mid+1]`, a peak must lie in the right half. Else, a peak lies in the left half.",
      intuition: "An element larger than its neighbor must climb to a peak (or boundary) in that direction.",
      pseudocode: "low = 0, high = n - 1\nwhile low < high:\n  mid = (low + high) / 2\n  if nums[mid] < nums[mid+1] low = mid + 1\n  else high = mid\nreturn low",
      dryRun: "nums=[1,2,3,1]\nlow=0, high=3. mid=1(2) < 3 -> low=2\nlow=2, high=3. mid=2(3) >= 1 -> high=2. Loop ends. Returns 2.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "Why does a peak element always exist? (Boundary entries are treated as -infinity, guaranteeing a peak).",
        "Prove why we only need to compare `nums[mid]` with `nums[mid+1]`.",
        "Does the array need to be sorted? No."
      ]
    },
    java: `public class FindPeak {
    public static int findPeakElement(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] < nums[mid + 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}`
  },
  "LC-739": {
    logic: {
      summary: "Return an array representing the number of days you have to wait after each day to get a warmer temperature.",
      approach: "Monotonic decreasing stack. Store indices of temperatures. For each temperature, while current > stack top, pop stack top and set its wait days to `currIndex - poppedIndex`. Push current index.",
      intuition: "Indices in stack are waiting for a warmer day. A warm day resolves wait times for all smaller values below it.",
      pseudocode: "res = array of 0, stack = []\nfor i from 0 to n-1:\n  while stack and temp[i] > temp[stack.top]:\n    idx = stack.pop()\n    res[idx] = i - idx\n  stack.push(i)\nreturn res",
      dryRun: "temp=[73, 74, 75, 71, 69, 72]\ni=0(73): stack=[0]\ni=1(74): 74>73 -> res[0]=1-0=1. stack=[1]\ni=2(75): 75>74 -> res[1]=2-1=1. stack=[2]\ni=3(71): stack=[2, 3]\ni=4(69): stack=[2, 3, 4]\ni=5(72): 72>69 -> res[4]=5-4=1. 72>71 -> res[3]=5-3=2. stack=[2, 5]. Returns [1, 1, 0, 2, 1, 0].",
      time: "O(n)",
      space: "O(n) for stack storage",
      interviewPoints: [
        "Why is time complexity O(n) even with a nested while loop? (Each element is pushed and popped at most once).",
        "Compare with brute force O(n^2).",
        "Explain stack monotonicity."
      ]
    },
    java: `import java.util.*;

public class DailyTemp {
    public static int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int idx = stack.pop();
                result[idx] = i - idx;
            }
            stack.push(i);
        }
        return result;
    }
}`
  },
  "LC-215": {
    logic: {
      summary: "Find the kth largest element in an unsorted array.",
      approach: "MinHeap of size k. Add elements to MinHeap. If heap size exceeds k, pop the smallest element. At the end, heap top contains the kth largest.",
      intuition: "Keeping a min-heap of size k ensures that the smallest values are discarded, leaving the k largest elements, with the kth largest at the top.",
      pseudocode: "pq = MinHeap()\nfor num in nums:\n  pq.push(num)\n  if pq.size > k pq.pop()\nreturn pq.peek()",
      dryRun: "nums=[3,2,1,5,6], k=2\npq: [3] -> [2,3] -> [1,2,3] -> pop 1 -> [2,3,5] -> pop 2 -> [3,5,6] -> pop 3 -> [5,6]. Peak = 5. Returns 5.",
      time: "O(n log k)",
      space: "O(k) for heap",
      interviewPoints: [
        "Explain Quickselect O(n) average time complexity alternative.",
        "Compare space tradeoffs of both solutions.",
        "Handle negative numbers."
      ]
    },
    java: `import java.util.*;

public class KthLargest {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.add(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }
}`
  },
  "LC-560": {
    logic: {
      summary: "Find the total number of continuous subarrays whose sum equals to k.",
      approach: "Prefix Sum + Hash Map. Track running prefix sum. Store frequencies of prefix sums in a HashMap. If `prefixSum - k` exists in map, add its frequency to result.",
      intuition: "If the difference between two prefix sums equals k, the subarray between them sums to k.",
      pseudocode: "map = {0: 1}, sum = 0, count = 0\nfor num in nums:\n  sum += num\n  if sum - k in map: count += map[sum - k]\n  map[sum]++\nreturn count",
      dryRun: "nums=[1,1,1], k=2\nInit: map={0:1}\nval=1: sum=1. sum-k=-1 (not in map). map={0:1, 1:1}\nval=1: sum=2. sum-k=0 (in map: +1) -> count=1. map={0:1, 1:1, 2:1}\nval=1: sum=3. sum-k=1 (in map: +1) -> count=2. Returns 2.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: [
        "Why is it necessary to initialize map with `{0: 1}`? (to handle cases where prefix sum itself equals k).",
        "Can we use sliding window? (No, because array can contain negative numbers, violating window monotonicity).",
        "Analyze map lookup time complexity."
      ]
    },
    java: `import java.util.*;

public class SubarraySumEqualsK {
    public static int subarraySum(int[] nums, int k) {
        int count = 0, sum = 0;
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        for (int num : nums) {
            sum += num;
            if (map.containsKey(sum - k)) {
                count += map.get(sum - k);
            }
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        return count;
    }
}`
  },
  "LC-974": {
    logic: {
      summary: "Find the number of non-empty subarrays that have a sum divisible by k.",
      approach: "Prefix Sum + Modulo Hash Map. Track running prefix sum modulo k. Handle negative remainders. Add occurrences of same modulo value to count.",
      intuition: "If two prefix sums have the same remainder when divided by k, the subarray sum between them is divisible by k.",
      pseudocode: "map = {0: 1}, sum = 0, count = 0\nfor num in nums:\n  sum = (sum + num) % k\n  if sum < 0: sum += k\n  if sum in map: count += map[sum]\n  map[sum]++\nreturn count",
      dryRun: "nums=[4,5,0,-2,-3,1], k=5\nprefix remainders: 4, 4, 4, 2, 4, 0. Modulo checks yield counts. Returns 7.",
      time: "O(n)",
      space: "O(k) to store mod frequencies",
      interviewPoints: [
        "Explain negative modulo correction `(rem + k) % k`.",
        "Compare with Subarray Sum Equals K.",
        "Discuss space complexity bound."
      ]
    },
    java: `import java.util.*;

public class SubarraySumsDivisibleK {
    public static int subarraysDivByK(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int count = 0, sum = 0;
        for (int num : nums) {
            sum = (sum + num) % k;
            if (sum < 0) sum += k; // negative modulo adjust
            if (map.containsKey(sum)) {
                count += map.get(sum);
            }
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        return count;
    }
}`
  },
  "LC-1011": {
    logic: {
      summary: "Find the least weight capacity of a ship to transport all packages within d days.",
      approach: "Binary Search on answer capacity range [max_weight, sum_weights]. For a guess capacity, count days. Adjust search bounds.",
      intuition: "Monotonicity: if capacity c can ship packages in d days, any capacity > c can also do so. We search for the boundary capacity.",
      pseudocode: "low = max(weights), high = sum(weights)\nwhile low < high:\n  mid = low + (high-low)/2\n  if canShip(mid) <= d: high = mid\n  else: low = mid + 1\nreturn low",
      dryRun: "weights=[1,2,3], d=2. low=3, high=6.\nmid=4. days: [1,2](sum 3) -> day 1, [3] -> day 2. total=2 <= 2 -> high=4.\nmid=3. days: [1,2] -> day 1, [3] -> day 2. total=2 <= 2 -> high=3. Loop ends. Returns 3.",
      time: "O(n log(sum - max))",
      space: "O(1)",
      interviewPoints: [
        "Explain low bound constraint `max(weights)` (we cannot ship packages if capacity is smaller than the heaviest package).",
        "Define linear time validation function `canShip`.",
        "Compare with Split Array Largest Sum."
      ]
    },
    java: `public class ShipPackages {
    public static int shipWithinDays(int[] weights, int days) {
        int max = 0, sum = 0;
        for (int w : weights) {
            max = Math.max(max, w);
            sum += w;
        }
        int low = max, high = sum;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (canShip(weights, mid, days)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
    
    private static boolean canShip(int[] weights, int capacity, int limit) {
        int days = 1, current = 0;
        for (int w : weights) {
            if (current + w > capacity) {
                days++;
                current = 0;
            }
            current += w;
        }
        return days <= limit;
    }
}`
  },
  "LC-410": {
    logic: {
      summary: "Split an array into m non-empty continuous subarrays such that the largest sum is minimized.",
      approach: "Binary Search on answer range [max_element, sum_elements]. For a guess `mid`, check if we can partition the array into <= m subarrays. Adjust bounds.",
      intuition: "Identical model to Capacity to Ship Packages. The largest sum has monotonic properties.",
      pseudocode: "Same as Capacity to Ship Packages.",
      dryRun: "nums=[7,2,5], m=2. low=7, high=14.\nmid=10. splits: [7,2](sum 9), [5](sum 5) -> count=2 <= 2 -> high=10.\nmid=8. splits: [7](sum 7), [2,5](sum 7) -> count=2 <= 2 -> high=8. Returns 8.",
      time: "O(n log(sum - max))",
      space: "O(1)",
      interviewPoints: [
        "Prove why this is identical to Koko Eating Bananas or Book Allocation.",
        "Compare with O(n^2 * m) dynamic programming solution.",
        "Explain binary search bounds."
      ]
    },
    java: `public class SplitArrayLargestSum {
    public static int splitArray(int[] nums, int k) {
        int max = 0;
        int sum = 0;
        for (int num : nums) {
            max = Math.max(max, num);
            sum += num;
        }
        int low = max, high = sum;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (canSplit(nums, mid, k)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
    
    private static boolean canSplit(int[] nums, int maxTarget, int limit) {
        int pieces = 1, current = 0;
        for (int num : nums) {
            if (current + num > maxTarget) {
                pieces++;
                current = 0;
            }
            current += num;
        }
        return pieces <= limit;
    }
}`
  },
  "LC-918": {
    logic: {
      summary: "Find the maximum possible sum of a non-empty subarray of a circular array.",
      approach: "Kadane's algorithm. Calculate max subarray sum normally. Calculate total sum. Calculate min subarray sum. Circular max is `max(normalMax, totalSum - minSum)`. If all numbers are negative, return `normalMax`.",
      intuition: "A circular subarray wraps around, leaving out a contiguous central subarray. To maximize circular sum, we minimize the deleted central subarray sum.",
      pseudocode: "maxSum = kadaneMax(), minSum = kadaneMin()\ntotal = sum(nums)\nif maxSum < 0 return maxSum\nreturn max(maxSum, total - minSum)",
      dryRun: "nums=[5,-3,5]\nmaxSum=5, minSum=-3, total=7. max(5, 7 - (-3)=10) = 10. Returns 10.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Why do we return `maxSum` if it is negative? (Because if all elements are negative, `totalSum - minSum` would result in an empty subarray, which is invalid).",
        "Prove why circular max equals `totalSum - minSum`.",
        "Discuss space complexity."
      ]
    },
    java: `public class CircularSubarray {
    public static int maxSubarraySumCircular(int[] nums) {
        int totalSum = 0;
        int curMax = 0, maxSum = nums[0];
        int curMin = 0, minSum = nums[0];
        
        for (int num : nums) {
            totalSum += num;
            curMax = Math.max(curMax + num, num);
            maxSum = Math.max(maxSum, curMax);
            
            curMin = Math.min(curMin + num, num);
            minSum = Math.min(minSum, curMin);
        }
        return maxSum < 0 ? maxSum : Math.max(maxSum, totalSum - minSum);
    }
}`
  },
  "LC-39": {
    logic: {
      summary: "Find all unique combinations in candidates that sum to target.",
      approach: "Backtracking. Recursively search through candidates. At each index, we have two choices: include candidates[index] (retaining index to allow reuse) or exclude it (incrementing index).",
      intuition: "Generate combinations by making inclusion/exclusion decisions recursively while tracking the running target difference.",
      pseudocode: "res = []\nbacktrack(idx, target, current):\n  if target == 0: res.add(current), return\n  if idx == candidates.length or target < 0: return\n  // Include\n  current.add(candidates[idx])\n  backtrack(idx, target - candidates[idx], current)\n  current.pop()\n  // Exclude\n  backtrack(idx + 1, target, current)\nbacktrack(0, target, [])",
      dryRun: "candidates=[2,3], target=5\nidx=0(2): includes -> target=3. includes -> target=1. includes -> target=-1 (backtrack).\nexclude -> idx=1(3): target=3-3=0 -> add [2,3].",
      time: "O(2^t) where t is target/min_candidate",
      space: "O(target) recursion stack depth",
      interviewPoints: [
        "Why does target/min_candidate bound recursion depth? (Because at each step we subtract at least min_candidate).",
        "Why is sorting candidates helpful? (Allows early pruning when candidates[idx] > target).",
        "Explain backtracking list allocation."
      ]
    },
    java: `import java.util.*;

public class CombinationSum {
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates);
        backtrack(result, new ArrayList<>(), candidates, target, 0);
        return result;
    }

    private static void backtrack(List<List<Integer>> result, List<Integer> temp, int[] candidates, int target, int start) {
        if (target == 0) {
            result.add(new ArrayList<>(temp));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > target) break; // early pruning
            temp.add(candidates[i]);
            backtrack(result, temp, candidates, target - candidates[i], i); // keep 'i' to allow duplicate reuse
            temp.remove(temp.size() - 1);
        }
    }
}`
  },
  "LC-46": {
    logic: {
      summary: "Return all possible permutations of an array of distinct integers.",
      approach: "Backtracking with swap. Swap the current element with any element from the current index to the end of the array, recursively call permute for the next index, and swap back to restore.",
      intuition: "Permutations represent all orderings. Swapping elements in-place dynamically constructs all variations without extra memory.",
      pseudocode: "res = []\npermute(idx):\n  if idx == nums.length: res.add(copy(nums)), return\n  for i from idx to nums.length-1:\n    swap(nums[idx], nums[i])\n    permute(idx + 1)\n    swap(nums[idx], nums[i])\npermute(0)",
      dryRun: "nums=[1,2]\npermute(0):\n  i=0: swap(1,1)->[1,2]. permute(1) -> i=1: swap(2,2)->[1,2]. permute(2) -> add [1,2].\n  i=1: swap(1,2)->[2,1]. permute(1) -> i=1: swap(1,1)->[2,1]. permute(2) -> add [2,1].",
      time: "O(n! * n)",
      space: "O(n) recursion stack depth",
      interviewPoints: [
        "Explain how the swap method works in-place (avoids auxiliary boolean visited arrays).",
        "Contrast with permutations of duplicates (requires sorting and skip duplicate logic).",
        "Analyze stack overhead."
      ]
    },
    java: `import java.util.*;

public class Permutations {
    public static List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> list = new ArrayList<>();
        for (int num : nums) list.add(num);
        backtrack(result, list, 0);
        return result;
    }

    private static void backtrack(List<List<Integer>> result, List<Integer> nums, int start) {
        if (start == nums.size()) {
            result.add(new ArrayList<>(nums));
            return;
        }
        for (int i = start; i < nums.size(); i++) {
            Collections.swap(nums, start, i);
            backtrack(result, nums, start + 1);
            Collections.swap(nums, start, i); // backtrack
        }
    }
}`
  },
  "LC-198": {
    logic: {
      summary: "Find the maximum money you can rob without robbing two adjacent houses.",
      approach: "Dynamic Programming (Space Optimized). Maintain two variables: `prevMax` (max profit omitting adjacent) and `currMax` (max profit including current option). Update `temp = currMax`, `currMax = max(currMax, prevMax + nums[i])`, `prevMax = temp`.",
      intuition: "At each house, we decide to either skip it (keep previous profit) or rob it (add to profit from 2 houses ago).",
      pseudocode: "prevMax = 0, currMax = 0\nfor num in nums:\n  temp = currMax\n  currMax = max(currMax, prevMax + num)\n  prevMax = temp\nreturn currMax",
      dryRun: "nums=[1,2,3,1]\nnum=1: temp=0, curr=max(0, 0+1)=1, prev=0\nnum=2: temp=1, curr=max(1, 0+2)=2, prev=1\nnum=3: temp=2, curr=max(2, 1+3)=4, prev=2\nnum=1: temp=4, curr=max(4, 2+1)=4, prev=4. Returns 4.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "State relation formula: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.",
        "How space complexity is optimized to O(1).",
        "Explain base cases for empty or size 1 arrays."
      ]
    },
    java: `public class HouseRobber {
    public static int rob(int[] nums) {
        int prevMax = 0;
        int currMax = 0;
        for (int num : nums) {
            int temp = currMax;
            currMax = Math.max(currMax, prevMax + num);
            prevMax = temp;
        }
        return currMax;
    }
}`
  },
  "LC-202": {
    logic: {
      summary: "Determine if a number is happy (sum of squares of digits converges to 1).",
      approach: "Floyd's Cycle Finding Algorithm (Two Pointers). Treat the digit square sum as a function map. Use slow and fast pointers to detect cycles. If fast reaches 1, return true. If slow equals fast and is not 1, a cycle exists.",
      intuition: "Unhappy numbers fall into infinite periodic loops. Cycle detection prevents infinite recursion.",
      pseudocode: "slow = n, fast = sumSquares(n)\nwhile fast != 1 and slow != fast:\n  slow = sumSquares(slow)\n  fast = sumSquares(sumSquares(fast))\nreturn fast == 1",
      dryRun: "n=19 -> 1^2+9^2=82 -> 8^2+2^2=68 -> 6^2+8^2=100 -> 1^2+0+0=1. Returns true.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "Why is space complexity O(1) compared to HashSet storage?",
        "Prove that any number either reaches 1 or falls into a cycle (sum of squares of digits for large numbers quickly decreases to under 243).",
        "Explain slow/fast state transitions."
      ]
    },
    java: `public class HappyNumber {
    public static boolean isHappy(int n) {
        int slow = n;
        int fast = getNext(n);
        while (fast != 1 && slow != fast) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        return fast == 1;
    }

    private static int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int d = n % 10;
            sum += d * d;
            n /= 10;
        }
        return sum;
    }
}`
  },
  "LC-494": {
    logic: {
      summary: "Find the number of ways to assign signs (+/-) to elements to sum to target.",
      approach: "Dynamic Programming (Subset Sum). Let positive sum be P, negative sum be N. We have `P - N = target` and `P + N = totalSum`, which means `2 * P = target + totalSum` or `P = (target + totalSum) / 2`. Find subset counts that sum to P.",
      intuition: "Assigning signs partitions the array into two subsets. This maps the problem to 0-1 Knapsack Subset Sum.",
      pseudocode: "sum = totalSum(nums)\nif (sum + target) % 2 != 0 or sum < abs(target) return 0\nP = (sum + target) / 2\ndp = array of size P+1, dp[0] = 1\nfor num in nums:\n  for j from P down to num:\n    dp[j] += dp[j-num]\nreturn dp[P]",
      dryRun: "nums=[1,1], target=0. sum=2. P = (2+0)/2 = 1. dp=[1, 0]\nnum=1: dp=[1, 1]\nnum=1: dp[1] = dp[1] + dp[0] = 2. dp=[1, 2]. Returns 2.",
      time: "O(n * P) where P = (sum + target) / 2",
      space: "O(P) space complexity",
      interviewPoints: [
        "Explain modulo checking `(sum + target) % 2 != 0` (sum must share same parity as target).",
        "Why does reverse loop direction prevent using same element twice?",
        "Compare with memoized DFS."
      ]
    },
    java: `public class TargetSum {
    public static int findTargetSumWays(int[] nums, int target) {
        int sum = 0;
        for (int num : nums) sum += num;
        if (Math.abs(target) > sum || (sum + target) % 2 != 0) return 0;
        
        int subsetSum = (sum + target) / 2;
        int[] dp = new int[subsetSum + 1];
        dp[0] = 1;
        for (int num : nums) {
            for (int j = subsetSum; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        return dp[subsetSum];
    }
}`
  },
  "LC-621": {
    logic: {
      summary: "Find the minimum number of units of time to finish all tasks with cooldown cooldown.",
      approach: "Greedy. Find the maximum frequency among tasks. Let it be `maxFreq`. Let the number of tasks sharing this frequency be `numMax`. The minimum time required is `(maxFreq - 1) * (cooldown + 1) + numMax`. Return `max(tasks.length, minimum_intervals)`.",
      intuition: "The bottleneck is the task with the highest frequency. We arrange them with cooldown spaces, then fill remaining spaces with other tasks.",
      pseudocode: "counts = array of size 26\nfor task in tasks: counts[task]++\nmaxFreq = max(counts), numMax = countOf(maxFreq in counts)\nslots = (maxFreq - 1) * (cooldown + 1) + numMax\nreturn max(tasks.length, slots)",
      dryRun: "tasks=['A','A','A','B','B','B'], cooldown=2\nmaxFreq=3 (from A, B). numMax=2. slots = (3-1)*(2+1) + 2 = 6 + 2 = 8. Returns 8.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Why is it sufficient to look at maximum frequency tasks?",
        "What happens if cooldown is 0? (slots equals tasks.length).",
        "Explain how remaining tasks fit in the slots."
      ]
    },
    java: `import java.util.*;

public class TaskScheduler {
    public static int leastInterval(char[] tasks, int n) {
        int[] counts = new int[26];
        for (char t : tasks) {
            counts[t - 'A']++;
        }
        int maxFreq = 0;
        for (int c : counts) {
            maxFreq = Math.max(maxFreq, c);
        }
        int numMax = 0;
        for (int c : counts) {
            if (c == maxFreq) numMax++;
        }
        int ans = (maxFreq - 1) * (n + 1) + numMax;
        return Math.max(tasks.length, ans);
    }
}`
  },
  "LC-973": {
    logic: {
      summary: "Find the k closest points to the origin.",
      approach: "MinHeap or PriorityQueue. Maintain a MaxHeap of size k storing points based on distance. If heap size exceeds k, pop the farthest point. Heap top holds boundary closest point.",
      intuition: "Discarding larger distances leaves only the smallest k distances.",
      pseudocode: "pq = MaxHeap(size k, compare by dist)\nfor p in points:\n  pq.push(p)\n  if pq.size > k pq.pop()\nreturn pq.elements",
      dryRun: "points=[[1,3],[-2,2]], k=1. dist: [1,3]=10, [-2,2]=8\npq pushes [1,3](10) -> pushes [-2,2](8) -> size 2 > 1 -> pop largest [1,3](10). Returns [[-2,2]].",
      time: "O(n log k)",
      space: "O(k) for heap",
      interviewPoints: [
        "Explain O(n) average Quickselect alternative.",
        "Compare heap vs Quickselect in production environments (heap is online, Quickselect requires writing to array).",
        "Distance comparison calculation optimization (avoid Math.sqrt() to prevent precision issues)."
      ]
    },
    java: `import java.util.*;

public class KClosestPoints {
    public static int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> {
            int d1 = a[0]*a[0] + a[1]*a[1];
            int d2 = b[0]*b[0] + b[1]*b[1];
            return Integer.compare(d2, d1); // max-heap
        });
        for (int[] p : points) {
            maxHeap.add(p);
            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }
        int[][] result = new int[k][2];
        for (int i = 0; i < k; i++) {
            result[i] = maxHeap.poll();
        }
        return result;
    }
}`
  },
  "LC-1046": {
    logic: {
      summary: "Smash stones together repeatedly until at most 1 stone remains, and return its weight.",
      approach: "MaxHeap. Insert all stone weights into a MaxHeap. Repeatedly poll the two heaviest stones, subtract their weights, and push the difference back if positive. Repeat until size <= 1.",
      intuition: "Greedy stone comparison. PriorityQueue always yields the heaviest stones in logarithmic time.",
      pseudocode: "pq = MaxHeap(stones)\nwhile pq.size > 1:\n  s1 = pq.pop()\n  s2 = pq.pop()\n  if s1 != s2: pq.push(s1 - s2)\nreturn pq.isEmpty ? 0 : pq.peek()",
      dryRun: "stones=[2,7,4,1,8,1]\npq=[8,7,4,2,1,1] -> pop 8, 7. diff 1. pq=[4,2,1,1,1]\npop 4, 2. diff 2. pq=[2,1,1,1]\npop 2, 1. diff 1. pq=[1,1,1]\npop 1, 1. diff 0. pq=[1]. Returns 1.",
      time: "O(n log n)",
      space: "O(n)",
      interviewPoints: [
        "Why is PriorityQueue appropriate? (Frequent insert and retrieve operations).",
        "Could we solve this without a heap? (Yes, sorting repeatedly is O(n^2 log n) which is slower).",
        "Handle empty inputs."
      ]
    },
    java: `import java.util.*;

public class LastStoneWeight {
    public static int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int s : stones) maxHeap.add(s);
        while (maxHeap.size() > 1) {
            int s1 = maxHeap.poll();
            int s2 = maxHeap.poll();
            if (s1 != s2) {
                maxHeap.add(s1 - s2);
            }
        }
        return maxHeap.isEmpty() ? 0 : maxHeap.peek();
    }
}`
  },
  "LC-344": {
    logic: {
      summary: "Reverse an array of characters in-place.",
      approach: "Two Pointers. Place left pointer at 0, right pointer at n-1. Swap characters and move inward.",
      intuition: "Swapping boundaries recursively converges on the midpoint, reversing elements in O(1) space.",
      pseudocode: "l = 0, r = s.len-1\nwhile l < r:\n  swap(s[l], s[r])\n  l++, r--",
      dryRun: "s=['h','e','l','l','o']\nl=0, r=4 -> swap -> s=['o','e','l','l','h']. l=1, r=3 -> swap -> s=['o','l','l','e','h']. Returns.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Why is in-place modification required? (to meet O(1) auxiliary space constraint).",
        "Compare with string reversal (requires allocating new string).",
        "Prove loop bounds."
      ]
    },
    java: `public class ReverseString {
    public static void reverseString(char[] s) {
        int l = 0, r = s.length - 1;
        while (l < r) {
            char temp = s[l];
            s[l] = s[r];
            s[r] = temp;
            l++;
            r--;
        }
    }
}`
  },
  "P-02": {
    logic: {
      summary: "Segregate 0s and 1s in an array.",
      approach: "Two Pointers. Move left pointer right to find a 1, and move right pointer left to find a 0. Swap them if left < right.",
      intuition: "Place all 0s at the beginning and 1s at the end by partitioning with left and right indices.",
      pseudocode: "l = 0, r = n-1\nwhile l < r:\n  while arr[l] == 0: l++\n  while arr[r] == 1: r--\n  if l < r: swap(arr[l], arr[r]), l++, r--",
      dryRun: "arr=[0,1,0,1]\nl=0(0)->1. r=3(1)->2(0). swap(arr[1], arr[2]) -> arr=[0,0,1,1]. Returns.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Compare with counting 0s and rewriting (two-pass vs single-pass two-pointers).",
        "How to scale this to 3 colors? (Dutch National Flag / LC-75).",
        "Verify stability of values."
      ]
    },
    java: `public class Segregate0and1 {
    public static void segregate(int[] arr) {
        int l = 0, r = arr.length - 1;
        while (l < r) {
            while (l < r && arr[l] == 0) l++;
            while (l < r && arr[r] == 1) r--;
            if (l < r) {
                arr[l] = 0;
                arr[r] = 1;
                l++;
                r--;
            }
        }
    }
}`
  },
  "P-08": {
    logic: {
      summary: "Count the number of triplets in a sorted array whose sum is smaller than X.",
      approach: "Sort array. Loop through each element i. Use two pointers left = i+1 and right = n-1. If `arr[i] + arr[left] + arr[right] < sum`, then all pairs from left to right-1 also satisfy the condition (add `right - left` to count, increment left). Else decrement right.",
      intuition: "Sorting enables two-pointer sum boundaries. If sum of a pair is too small, any smaller second-element choice is also too small.",
      pseudocode: "sort(arr), count = 0\nfor i from 0 to n-3:\n  l = i + 1, r = n - 1\n  while l < r:\n    if arr[i] + arr[l] + arr[r] < X:\n      count += r - l\n      l++\n    else r--\nreturn count",
      dryRun: "arr=[-2,0,1,3], X=2\ni=0(-2): l=1(0), r=3(3). sum=1 < 2 -> count += 3-1=2. l=2(1)\nl=2(1), r=3(3). sum=2 >= 2 -> r=2. Loop ends. Returns 2.",
      time: "O(n^2)",
      space: "O(1)",
      interviewPoints: [
        "Why does `count += r - l` work? (Since array is sorted, if `arr[i] + arr[l] + arr[r] < X`, then any element between l and r will yield an even smaller sum).",
        "Compare with brute force O(n^3) complexity.",
        "Check index alignments."
      ]
    },
    java: `import java.util.*;

public class CountTripletsSumSmaller {
    public static int countTriplets(int[] arr, int sum) {
        Arrays.sort(arr);
        int n = arr.length;
        int count = 0;
        for (int i = 0; i < n - 2; i++) {
            int l = i + 1;
            int r = n - 1;
            while (l < r) {
                if (arr[i] + arr[l] + arr[r] < sum) {
                    count += (r - l);
                    l++;
                } else {
                    r--;
                }
            }
        }
        return count;
    }
}`
  },
  "P-21": {
    logic: {
      summary: "Find the maximum sum subarray of a fixed size K.",
      approach: "Sliding Window. Maintain a running sum of size K. Slide the window right, adding new element and subtracting leaving element. Track max.",
      intuition: "Fixed window avoids recalculating overlapping subarray values, running in linear time.",
      pseudocode: "sum = sum(first K elements), maxVal = sum\nfor i from K to n-1:\n  sum += arr[i] - arr[i-K]\n  maxVal = max(maxVal, sum)\nreturn maxVal",
      dryRun: "arr=[1,2,5,2], K=2\nInit: sum=3, max=3\ni=2: sum=3+5-1=7, max=7\ni=3: sum=7+2-2=7, max=7. Returns 7.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain why this runs in O(n) compared to nested loop O(n*k).",
        "Handle cases where array size is smaller than K.",
        "Discuss window index calculation."
      ]
    },
    java: `public class MaxSubarrayK {
    public static int maxSubarraySum(int[] arr, int k) {
        if (arr == null || arr.length < k || k <= 0) return 0;
        int sum = 0;
        for (int i = 0; i < k; i++) sum += arr[i];
        
        int maxSum = sum;
        for (int i = k; i < arr.length; i++) {
            sum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, sum);
        }
        return maxSum;
    }
}`
  },
  "P-34": {
    logic: {
      summary: "Find the smallest sum contiguous subarray.",
      approach: "Inverted Kadane's Algorithm. Maintain minimum sum ending here and global minimum sum.",
      intuition: "Smallest sum contiguous subarray is equivalent to maximum subarray sum if we flip signs of all numbers.",
      pseudocode: "currMin = arr[0], globalMin = arr[0]\nfor i from 1 to n-1:\n  currMin = min(arr[i], currMin + arr[i])\n  globalMin = min(globalMin, currMin)\nreturn globalMin",
      dryRun: "arr=[3,-4,2,-3,-1]\ncurrMin: 3 -> -4 -> -2 -> -5 -> -6. globalMin = -6. Returns -6.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain Kadane's state transition equation.",
        "Compare with Maximum Subarray Sum.",
        "Prove correctness for all positive arrays."
      ]
    },
    java: `public class SmallestSubarraySum {
    public static int smallestSumSubarray(int[] arr) {
        if (arr == null || arr.length == 0) return 0;
        int currMin = arr[0];
        int globalMin = arr[0];
        for (int i = 1; i < arr.length; i++) {
            currMin = Math.min(arr[i], currMin + arr[i]);
            globalMin = Math.min(globalMin, currMin);
        }
        return globalMin;
    }
}`
  },
  "LC-1186": {
    logic: {
      summary: "Find the maximum sum subarray with at most one deletion.",
      approach: "Dynamic Programming. Maintain two variables: `ignored` (max subarray sum ending at i with one deletion) and `kept` (max sum ending at i with zero deletions). `kept = max(kept + num, num)` and `ignored = max(ignored + num, temp_kept)`.",
      intuition: "At each step, we can either extend a path that already has one deletion, or perform a new deletion on the active path.",
      pseudocode: "kept = nums[0], ignored = nums[0], maxVal = nums[0]\nfor i from 1 to n-1:\n  temp = kept\n  kept = max(kept + nums[i], nums[i])\n  ignored = max(ignored + nums[i], temp)\n  maxVal = max(maxVal, kept, ignored)\nreturn maxVal",
      dryRun: "nums=[1,-2,0,3]\ni=1(-2): kept=max(1-2,-2)=-1, ignored=max(ignored-2, 1)=1. maxVal=1\ni=2(0): kept=max(-1,0)=0, ignored=max(1, -1)=1. maxVal=1\ni=3(3): kept=max(3,3)=3, ignored=max(1+3, 0)=4. maxVal=4. Returns 4.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Why is `ignored` updated with `temp` (previous `kept`) instead of current `kept`? (to ensure we only delete exactly one element, not more).",
        "Base case when all numbers are negative.",
        "Discuss space complexity optimizations."
      ]
    },
    java: `public class MaxSubarrayDeletion {
    public static int maximumSum(int[] nums) {
        int n = nums.length;
        int kept = nums[0];
        int ignored = nums[0];
        int maxVal = nums[0];
        for (int i = 1; i < n; i++) {
            int prevKept = kept;
            kept = Math.max(kept + nums[i], nums[i]);
            ignored = Math.max(ignored + nums[i], prevKept);
            maxVal = Math.max(maxVal, Math.max(kept, ignored));
        }
        return maxVal;
    }
}`
  },
  "LC-1749": {
    logic: {
      summary: "Find the maximum absolute sum of any subarray.",
      approach: "Kadane's variant. Calculate the maximum subarray sum and the minimum subarray sum in a single pass. Return `max(maxSubarraySum, abs(minSubarraySum))`.",
      intuition: "Maximum absolute sum is bounded by either the largest positive accumulation or the deepest negative accumulation.",
      pseudocode: "maxSum = 0, minSum = 0, curMax = 0, curMin = 0\nfor num in nums:\n  curMax = max(0, curMax + num)\n  maxSum = max(maxSum, curMax)\n  curMin = min(0, curMin + num)\n  minSum = min(minSum, curMin)\nreturn max(maxSum, abs(minSum))",
      dryRun: "nums=[1,-3,2,3]\ncurMax: 1 -> 0 -> 2 -> 5. maxSum=5\ncurMin: 0 -> -3 -> -1 -> 0. minSum=-3\nReturns max(5, |-3|) = 5.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain alternative Prefix Sum solution: the max absolute sum equals the difference between maximum and minimum prefix sums.",
        "Compare time and space complexities of both solutions.",
        "Why do we start curMax/curMin at 0? (allows empty subarray consideration, which is safe since we return absolute max)."
      ]
    },
    java: `public class MaxAbsoluteSumSubarray {
    public static int maxAbsoluteSum(int[] nums) {
        int maxAccum = 0, minAccum = 0;
        int curMax = 0, curMin = 0;
        for (int num : nums) {
            curMax = Math.max(0, curMax + num);
            maxAccum = Math.max(maxAccum, curMax);
            
            curMin = Math.min(0, curMin + num);
            minAccum = Math.min(minAccum, curMin);
        }
        return Math.max(maxAccum, Math.abs(minAccum));
    }
}`
  },
  "LC-525": {
    logic: {
      summary: "Find the maximum length of a contiguous subarray with an equal number of 0 and 1.",
      approach: "Prefix Sum + Hash Map. Treat 0 as -1 and 1 as 1. Track running prefix sum. If same prefix sum is seen again, calculate the distance between the two indices. Keep track of max distance.",
      intuition: "Equal count of 0s and 1s means the net sum of values is 0. If prefix sum matches, net change in between is 0.",
      pseudocode: "map = {0: -1}, sum = 0, maxLen = 0\nfor i from 0 to n-1:\n  sum += nums[i] == 1 ? 1 : -1\n  if sum in map: maxLen = max(maxLen, i - map[sum])\n  else: map[sum] = i\nreturn maxLen",
      dryRun: "nums=[0,1]\ni=0(0): sum=-1. map={0:-1, -1:0}\ni=1(1): sum=0 (in map: -1) -> len = 1 - (-1) = 2. Returns 2.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: [
        "Why is `map.put(0, -1)` necessary? (Handles subarrays starting at index 0).",
        "Compare with Subarray Sum Equals K.",
        "Discuss space complexity."
      ]
    },
    java: `import java.util.*;

public class ContiguousArray01 {
    public static int findMaxLength(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int sum = 0, maxLen = 0;
        for (int i = 0; i < nums.length; i++) {
            sum += (nums[i] == 1) ? 1 : -1;
            if (map.containsKey(sum)) {
                maxLen = Math.max(maxLen, i - map.get(sum));
            } else {
                map.put(sum, i);
            }
        }
        return maxLen;
    }
}`
  },
  "LC-862": {
    logic: {
      summary: "Find the length of the shortest non-empty subarray with a sum of at least k.",
      approach: "Monotonic Queue of Prefix Sums. Maintain a double-ended queue `dq` storing indices. If prefix difference `sum[i] - sum[dq.first] >= k`, pop from front and update min length. Keep queue monotonically increasing by popping elements from back if they are larger than the current prefix sum.",
      intuition: "A larger prefix sum appearing later is never useful because it yields smaller sums and larger lengths.",
      pseudocode: "P = prefixSums(nums), dq = Deque(), minLen = infinity\nfor i in P:\n  while dq and P[i] - P[dq.first] >= k:\n    minLen = min(minLen, i - dq.popFirst())\n  while dq and P[i] <= P[dq.last]:\n    dq.popLast()\n  dq.push(i)\nreturn minLen",
      dryRun: "nums=[2,-1,2], k=3. P=[0,2,1,3]\ni=0: Q=[0]\ni=1(2): Q=[0,1]\ni=2(1): P[2]<=P[1] -> pop 1. Q=[0,2]\ni=3(3): P[3]-P[0]=3>=3 -> pop 0, len=3. Q=[2,3]. Returns 3.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: [
        "Why does sliding window fail? (negative numbers mean prefix sum is not monotonic).",
        "Why is it safe to pop elements from the back of the queue when `P[i] <= P[dq.last]`? (Because `P[i]` is smaller and comes later, making it a better starting candidate than any larger predecessor).",
        "Explain deque amortized O(n) behavior."
      ]
    },
    java: `import java.util.*;

public class ShortestSubarraySumK {
    public static int shortestSubarray(int[] nums, int k) {
        int n = nums.length;
        long[] P = new long[n + 1];
        for (int i = 0; i < n; i++) P[i + 1] = P[i] + nums[i];
        
        Deque<Integer> dq = new ArrayDeque<>();
        int minLen = Integer.MAX_VALUE;
        for (int i = 0; i <= n; i++) {
            while (!dq.isEmpty() && P[i] - P[dq.peekFirst()] >= k) {
                minLen = Math.min(minLen, i - dq.pollFirst());
            }
            while (!dq.isEmpty() && P[i] <= P[dq.peekLast()]) {
                dq.pollLast();
            }
            dq.addLast(i);
        }
        return minLen == Integer.MAX_VALUE ? -1 : minLen;
    }
}`
  },
  "LC-327": {
    logic: {
      summary: "Count the number of range sums that lie in [lower, upper] inclusive.",
      approach: "Divide and Conquer (Merge Sort). Calculate prefix sums. During the merge step, use two pointers `i` and `j` to count elements in right half that fall within bounds relative to left half elements.",
      intuition: "Range sum is `prefix[right] - prefix[left]`. Merge sort sorts subsegments, allowing pointer walking instead of nested iterations.",
      pseudocode: "count = 0\nmergeSort(left, right):\n  if left >= right return\n  mid = (left+right)/2\n  mergeSort(left, mid), mergeSort(mid+1, right)\n  // Count step\n  low = mid+1, high = mid+1\n  for i from left to mid:\n    while low <= right and prefix[low] - prefix[i] < lower: low++\n    while high <= right and prefix[high] - prefix[i] <= upper: high++\n    count += high - low\n  merge(left, mid, right)",
      dryRun: "nums=[0,-3], lower=-3, upper=0. prefix=[0,0,-3]\nMerge sort processes subparts and counts aligned intervals. Returns 3.",
      time: "O(n log n)",
      space: "O(n) auxiliary space",
      interviewPoints: [
        "Why is prefix array of size `n + 1` needed? (to include subsets starting at index 0).",
        "Prove why the two pointers `low` and `high` only move forward across iterations (monotonicity of sorted halves).",
        "Compare with Segment Tree / Fenwick Tree."
      ]
    },
    java: `public class CountRangeSum {
    private static int count;
    private static int lowerBound;
    private static int upperBound;

    public static int countRangeSum(int[] nums, int lower, int upper) {
        count = 0;
        lowerBound = lower;
        upperBound = upper;
        long[] P = new long[nums.length + 1];
        for (int i = 0; i < nums.length; i++) P[i + 1] = P[i] + nums[i];
        
        mergeSort(P, 0, P.length - 1);
        return count;
    }

    private static void mergeSort(long[] P, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        mergeSort(P, left, mid);
        mergeSort(P, mid + 1, right);
        
        int low = mid + 1, high = mid + 1;
        for (int i = left; i <= mid; i++) {
            while (low <= right && P[low] - P[i] < lowerBound) low++;
            while (high <= right && P[high] - P[i] <= upperBound) high++;
            count += (high - low);
        }
        
        // Merge step
        long[] helper = new long[right - left + 1];
        int i = left, j = mid + 1, r = 0;
        while (i <= mid && j <= right) {
            if (P[i] <= P[j]) helper[r++] = P[i++];
            else helper[r++] = P[j++];
        }
        while (i <= mid) helper[r++] = P[i++];
        while (j <= right) helper[r++] = P[j++];
        System.arraycopy(helper, 0, P, left, helper.length);
    }
}`
  },
  "LC-986": {
    logic: {
      summary: "Find the intersection of two lists of closed intervals.",
      approach: "Two Pointers. Place pointer `i` in A and `j` in B. Find overlap boundary: `start = max(A[i].start, B[j].start)` and `end = min(A[i].end, B[j].end)`. If `start <= end`, add to results. Move pointer of interval that ends earlier.",
      intuition: "The interval ending earlier cannot intersect with any subsequent intervals in the other list.",
      pseudocode: "i = 0, j = 0, res = []\nwhile i < A.len and j < B.len:\n  start = max(A[i].start, B[j].start)\n  end = min(A[i].end, B[j].end)\n  if start <= end: res.add([start, end])\n  if A[i].end < B[j].end: i++\n  else j++",
      dryRun: "A=[[0,2]], B=[[1,5]]\ni=0, j=0. start=max(0,1)=1. end=min(2,5)=2. 1<=2 -> add [1,2].\nA[0].end(2) < B[0].end(5) -> i=1. Loop ends. Returns [[1,2]].",
      time: "O(n + m) where n, m are sizes of lists",
      space: "O(1) auxiliary space",
      interviewPoints: [
        "Why is moving the pointer of the earlier-ending interval optimal?",
        "Prove why we only need to compare elements sequentially (the lists are sorted and disjoint).",
        "Handle edge cases of single points."
      ]
    },
    java: `import java.util.*;

public class IntervalIntersection {
    public static int[][] intervalIntersection(int[][] firstList, int[][] secondList) {
        List<int[]> result = new ArrayList<>();
        int i = 0, j = 0;
        while (i < firstList.length && j < secondList.length) {
            int start = Math.max(firstList[i][0], secondList[j][0]);
            int end = Math.min(firstList[i][1], secondList[j][1]);
            
            if (start <= end) {
                result.add(new int[]{start, end});
            }
            if (firstList[i][1] < secondList[j][1]) {
                i++;
            } else {
                j++;
            }
        }
        return result.toArray(new int[result.size()][]);
    }
}`
  },
  "P-48": {
    logic: {
      summary: "Merge overlapping intervals.",
      approach: "Sort intervals by start times. Traverse intervals, merging current with previous if `curr.start <= prev.end`. Otherwise, append current to results.",
      intuition: "Sorting starts lines up intervals sequentially. If an interval starts before the previous one ends, they must merge.",
      pseudocode: "sort(intervals by start)\nres = [intervals[0]]\nfor i from 1 to n-1:\n  if intervals[i].start <= res.last.end:\n    res.last.end = max(res.last.end, intervals[i].end)\n  else: res.add(intervals[i])\nreturn res",
      dryRun: "intervals=[[1,3],[2,6],[8,10]]\nInit: res=[[1,3]]\ni=1([2,6]): 2<=3 -> res.last=[1,max(3,6)=6]\ni=2([8,10]): 8>6 -> res=[[1,6],[8,10]]. Returns [[1,6],[8,10]].",
      time: "O(n log n)",
      space: "O(n) for output list",
      interviewPoints: [
        "Prove why sorting by start time is sufficient (guarantees we only compare adjacent elements).",
        "What if we sort by end time instead? (Requires more checks, start time sorting is cleaner).",
        "Discuss in-place modification vs helper lists."
      ]
    },
    java: `import java.util.*;

public class MergeIntervals {
    public static int[][] merge(int[][] intervals) {
        if (intervals == null || intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        
        List<int[]> result = new ArrayList<>();
        int[] current = intervals[0];
        result.add(current);
        for (int[] next : intervals) {
            if (next[0] <= current[1]) {
                current[1] = Math.max(current[1], next[1]);
            } else {
                current = next;
                result.add(current);
            }
        }
        return result.toArray(new int[result.size()][]);
    }
}`
  },
  "P-50": {
    logic: {
      summary: "Find the maximum CPU load at any time given list of jobs with start, end times, and CPU load.",
      approach: "MinHeap / Greedy. Sort jobs by start time. Use a MinHeap (PriorityQueue) to track active jobs ordered by end times. When processing a job, remove all completed jobs from the heap and adjust active CPU load.",
      intuition: "Similar to Meeting Rooms II. Tracking active overlaps using end times gives the exact active concurrency profile.",
      pseudocode: "sort(jobs by start), heap = MinHeap(compare by end), maxLoad = 0, currentLoad = 0\nfor j in jobs:\n  while heap and heap.top.end <= j.start:\n    currentLoad -= heap.pop().load\n  heap.push(j)\n  currentLoad += j.load\n  maxLoad = max(maxLoad, currentLoad)\nreturn maxLoad",
      dryRun: "jobs=[[1,4,3],[2,5,4],[7,9,6]]\nSort: [[1,4,3],[2,5,4],[7,9,6]]\nj1: heap=[(4,3)], curr=3, max=3\nj2: heap=[(4,3),(5,4)], curr=7, max=7\nj3: heap pops 4 and 5 -> heap=[(9,6)], curr=6, max=7. Returns 7.",
      time: "O(n log n)",
      space: "O(n)",
      interviewPoints: [
        "Why is it optimal to sort by start time? (Ensures we process jobs sequentially as they arrive).",
        "Compare with interval partitioning algorithms.",
        "Check index alignment."
      ]
    },
    java: `import java.util.*;

public class MaxCPULoad {
    static class Job {
        int start, end, load;
        Job(int s, int e, int l) {
            start = s; end = e; load = l;
        }
    }
    public static int findMaxCPULoad(List<Job> jobs) {
        Collections.sort(jobs, (a, b) -> Integer.compare(a.start, b.start));
        PriorityQueue<Job> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a.end, b.end));
        int maxLoad = 0, currentLoad = 0;
        for (Job j : jobs) {
            while (!minHeap.isEmpty() && minHeap.peek().end <= j.start) {
                currentLoad -= minHeap.poll().load;
            }
            minHeap.add(j);
            currentLoad += j.load;
            maxLoad = Math.max(maxLoad, currentLoad);
        }
        return maxLoad;
    }
}`
  },
  "LC-759": {
    logic: {
      summary: "Find the list of finite intervals representing common, positive-length free time for all employees.",
      approach: "Sort and Merge. Extract all working intervals from all employees and sort them by start time. Merge overlapping intervals. The gaps between these merged intervals represent the common free time.",
      intuition: "Free time is the inverse of busy time. Finding busy blocks and extracting gaps yields common free time intervals.",
      pseudocode: "intervals = collectAllEmployeeIntervals(), sort(intervals by start)\nmerged = [intervals[0]], freeTime = []\nfor i from 1 to n-1:\n  if intervals[i].start <= merged.last.end:\n    merged.last.end = max(merged.last.end, intervals[i].end)\n  else merged.add(intervals[i])\nfor i from 0 to merged.size-2:\n  freeTime.add(Interval(merged[i].end, merged[i+1].start))\nreturn freeTime",
      dryRun: "schedule=[[[1,3],[6,7]],[[2,4]],[[2,5]]]\nAll: [1,3],[2,4],[2,5],[6,7]. Sorted: [1,3],[2,4],[2,5],[6,7]\nMerged: [1,5],[6,7]. Gap: [5,6]. Returns [[5,6]].",
      time: "O(N log N) where N is total intervals count",
      space: "O(N) to store intervals list",
      interviewPoints: [
        "Can we optimize using a Heap to merge K sorted lists of employee intervals? (Yes, reduces complexity to O(N log K) where K is number of employees).",
        "How are gaps identified? (whenever current interval start is strictly greater than previous merged interval end).",
        "Check index alignments."
      ]
    },
    java: `import java.util.*;

class Interval {
    int start, end;
    Interval(int s, int e) {
        start = s; end = e;
    }
}

public class EmployeeFreeTime {
    public static List<Interval> employeeFreeTime(List<List<Interval>> schedule) {
        List<Interval> all = new ArrayList<>();
        for (List<Interval> list : schedule) {
            all.addAll(list);
        }
        Collections.sort(all, (a, b) -> Integer.compare(a.start, b.start));
        
        List<Interval> result = new ArrayList<>();
        if (all.isEmpty()) return result;
        
        Interval prev = all.get(0);
        for (Interval curr : all) {
            if (curr.start <= prev.end) {
                prev.end = Math.max(prev.end, curr.end);
            } else {
                result.add(new Interval(prev.end, curr.start));
                prev = curr;
            }
        }
        return result;
    }
}`
  },
  "LC-503": {
    logic: {
      summary: "Find the next greater element for each element in a circular array.",
      approach: "Monotonic Stack. Traverse the array twice `(2 * n - 1 down to 0)`. Maintain a decreasing stack of indices. For each index, pop from stack while stack top element <= current element. Record stack top value as next greater.",
      intuition: "Circularity is simulated by wrapping indices `i % n`. Monotonic stack resolves next greater values linearly.",
      pseudocode: "stack = [], res = array of size n filled with -1\nfor i from 2*n-1 down to 0:\n  while stack and nums[stack.top] <= nums[i % n]: stack.pop()\n  if i < n and stack: res[i] = nums[stack.top]\n  stack.push(i % n)\nreturn res",
      dryRun: "nums=[1,2,1]\ni=5(1): Q=[2]. i=4(2): Q=[1]. i=3(1): Q=[0]. i=2(1): Q=[0], pop 0 -> Q=[1] -> res[2]=nums[1]=2. i=1(2): pop 2 -> Q=[1] (empty) -> res[1]=-1. i=0(1): Q=[1] -> res[0]=nums[1]=2. Returns [2, -1, 2].",
      time: "O(n)",
      space: "O(n) for stack",
      interviewPoints: [
        "Why is circularity handled by iterating twice? (Ensures any element can search elements before it in the array).",
        "Amortized O(n) complexity explanation.",
        "Compare with Next Greater Element I (non-circular)."
      ]
    },
    java: `import java.util.*;

public class NextGreaterElementII {
    public static int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 2 * n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && nums[stack.peek()] <= nums[i % n]) {
                stack.pop();
            }
            if (i < n && !stack.isEmpty()) {
                result[i] = nums[stack.peek()];
            }
            stack.push(i % n);
        }
        return result;
    }
}`
  },
  "LC-402": {
    logic: {
      summary: "Remove k digits from a number to make it the smallest possible.",
      approach: "Monotonic Stack. Loop through digits. While stack is not empty, k > 0, and current digit is smaller than stack top, pop from stack and decrement k. Push current digit. Handle leading zeros.",
      intuition: "To minimize a number, we want smaller digits at higher significance (leftmost positions). Removing peaks from left creates smaller numbers.",
      pseudocode: "stack = []\nfor digit in num:\n  while stack and k > 0 and stack.top > digit:\n    stack.pop(), k--\n  stack.push(digit)\npop remaining k elements from back\nremove leading zeros, return result",
      dryRun: "num='1432219', k=3\ndigit=1: [1]. digit=4: [1,4]. digit=3: 3<4 -> pop 4, k=2 -> [1,3]\ndigit=2: 2<3 -> pop 3, k=1 -> [1,2]. digit=2: [1,2,2]\ndigit=1: 1<2 -> pop 2, k=0 -> [1,2,1]. digit=9: [1,2,1,9]. Returns '1219'.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: [
        "Why is it optimal to pop from left? (Leftmost digits contribute most to the magnitude).",
        "How do you handle edge cases where k equals string length? (Should return '0').",
        "Leading zero trimming details."
      ]
    },
    java: `import java.util.*;

public class RemoveKDigits {
    public static String removeKdigits(String num, int k) {
        if (num.length() == k) return "0";
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : num.toCharArray()) {
            while (!stack.isEmpty() && k > 0 && stack.peek() > c) {
                stack.pop();
                k--;
            }
            stack.push(c);
        }
        while (k > 0) {
            stack.pop();
            k--;
        }
        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) {
            sb.append(stack.pollLast()); // build forward
        }
        // Remove leading zeros
        while (sb.length() > 1 && sb.charAt(0) == '0') {
            sb.deleteCharAt(0);
        }
        return sb.toString();
    }
}`
  },
  "P-72": {
    logic: {
      summary: "Find the ceiling of x in a sorted array (smallest element >= x).",
      approach: "Binary Search. Find the smallest element in array >= x. If `nums[mid] >= x`, search left half and record mid index; else search right half.",
      intuition: "Sorted array enables binary search. Shrink bounds to find the left boundary of elements >= x.",
      pseudocode: "low = 0, high = n-1, ans = -1\nwhile low <= high:\n  mid = low + (high-low)/2\n  if nums[mid] >= x: ans = mid, high = mid - 1\n  else: low = mid + 1\nreturn ans",
      dryRun: "nums=[1,2,8,10], x=5. low=0, high=3.\nmid=1(2) < 5 -> low=2\nmid=2(8) >= 5 -> ans=2, high=1. Loop ends. Returns 8.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "What is the difference between Floor and Ceiling? (Floor is largest element <= x, Ceiling is smallest element >= x).",
        "What if x is larger than the largest element? (Should return -1).",
        "Verify edge cases."
      ]
    },
    java: `public class CeilingSortedArray {
    public static int ceiling(int[] nums, int x) {
        int low = 0, high = nums.length - 1;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] >= x) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans == -1 ? -1 : nums[ans];
    }
}`
  },
  "LC-34": {
    logic: {
      summary: "Find the first and last position of a target element in a sorted array.",
      approach: "Binary Search. Run two binary searches: one to locate the leftmost index of target, and one for the rightmost index.",
      intuition: "Instead of searching linearly (O(n)), binary search finds boundaries in O(log n) time by continuing to search even after finding target.",
      pseudocode: "findBound(isFirst):\n  low = 0, high = n-1, ans = -1\n  while low <= high:\n    mid = (low+high)/2\n    if nums[mid] == target:\n      ans = mid\n      if isFirst: high = mid - 1\n      else: low = mid + 1\n    else if nums[mid] < target: low = mid + 1\n    else: high = mid - 1\n  return ans\nreturn [findBound(true), findBound(false)]",
      dryRun: "nums=[5,7,7,8,8,10], target=8\nfindBound(true): mid=2(7) < 8 -> low=3. mid=4(8)==8 -> ans=4, high=3. mid=3(8)==8 -> ans=3, high=2. Returns 3.\nfindBound(false): mid=4(8)==8 -> ans=4, low=5. mid=5(10) > 8 -> high=4. Returns 4. Output [3, 4].",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "Why run two separate searches? (to cleanly isolate leftmost and rightmost boundaries).",
        "What happens if target is not present? (returns [-1, -1]).",
        "Discuss complexity parameter."
      ]
    },
    java: `public class FirstLastPosition {
    public static int[] searchRange(int[] nums, int target) {
        int[] result = new int[2];
        result[0] = findBoundary(nums, target, true);
        result[1] = findBoundary(nums, target, false);
        return result;
    }
    
    private static int findBoundary(int[] nums, int target, boolean isFirst) {
        int low = 0, high = nums.length - 1;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                ans = mid;
                if (isFirst) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
}`
  },
  "P-74": {
    logic: {
      summary: "Count the number of occurrences of a target value in a sorted array.",
      approach: "Binary Search. Find the first and last position of target. Number of occurrences is `rightmost - leftmost + 1` if target exists, else 0.",
      intuition: "First and last positions outline the consecutive range of target in sorted array.",
      pseudocode: "first = findBoundary(true), last = findBoundary(false)\nif first == -1 return 0\nreturn last - first + 1",
      dryRun: "nums=[1,1,2,2,2,3], target=2\nfirst = 2, last = 4. Count = 4 - 2 + 1 = 3. Returns 3.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "Why is this better than linear scan O(n)? (In worst case where array consists only of target elements, binary search takes O(log n) compared to linear O(n)).",
        "Explain index boundary checks.",
        "Handle missing elements."
      ]
    },
    java: `public class OccurrenceCount {
    public static int count(int[] nums, int target) {
        int first = findBoundary(nums, target, true);
        if (first == -1) return 0;
        int last = findBoundary(nums, target, false);
        return last - first + 1;
    }
    
    private static int findBoundary(int[] nums, int target, boolean isFirst) {
        int low = 0, high = nums.length - 1;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                ans = mid;
                if (isFirst) high = mid - 1;
                else low = mid + 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
}`
  },
  "P-75": {
    logic: {
      summary: "Find the position of an element in a sorted array of infinite numbers.",
      approach: "Exponential Search. Double the search range bounds (`high = high * 2`) until target <= array[high]. Then run standard binary search in `[low, high]`.",
      intuition: "Since the array size is infinite, we cannot access array.length. We discover the boundary exponentially first.",
      pseudocode: "low = 0, high = 1\nwhile target > arr[high]:\n  low = high\n  high = high * 2\nreturn binarySearch(low, high, target)",
      dryRun: "arr=[1,2,3,4,5,6,7,8,9...], target=7\nInit: low=0, high=1. 7 > arr[1](2) -> low=1, high=2\n7 > arr[2](3) -> low=2, high=4\n7 > arr[4](5) -> low=4, high=8\n7 <= arr[8](9) -> run binary search on range [4, 8]. Returns index 6.",
      time: "O(log p) where p is the index of the target",
      space: "O(1)",
      interviewPoints: [
        "Why is it called exponential search? (Because the search interval size grows exponentially: 1, 2, 4, 8, 16...).",
        "How is array index out of bounds handled? (Assume target exists, or catch exception, or use a sentinel value).",
        "Compare with O(p) linear search."
      ]
    },
    java: `public class InfiniteArraySearch {
    public static int search(int[] arr, int target) {
        int low = 0, high = 1;
        while (target > arr[high]) {
            low = high;
            high = high * 2;
        }
        return binarySearch(arr, low, high, target);
    }
    
    private static int binarySearch(int[] arr, int low, int high, int target) {
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
  },
  "LC-852": {
    logic: {
      summary: "Find the peak index in a mountain array.",
      approach: "Binary Search. Compare `arr[mid]` with `arr[mid+1]`. If `arr[mid] < arr[mid+1]`, peak lies on the right (low = mid + 1). Else, peak is on the left (high = mid).",
      intuition: "A mountain array ascends then descends. The slope direction dictates where the peak lies.",
      pseudocode: "low = 0, high = n - 1\nwhile low < high:\n  mid = low + (high-low)/2\n  if arr[mid] < arr[mid+1] low = mid + 1\n  else high = mid\nreturn low",
      dryRun: "arr=[0,2,1,0]\nlow=0, high=3. mid=1(2) >= arr[2](1) -> high=1\nlow=0, high=1. mid=0(0) < arr[1](2) -> low=1. Loop ends. Returns 1.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "Why does comparing `arr[mid]` with `arr[mid+1]` work? (Guarantees we know the slope direction).",
        "What is the difference between this and Find Peak Element? (Find Peak Element has multiple peaks and arbitrary boundaries; mountain array has exactly one peak).",
        "Confirm constraints (size >= 3)."
      ]
    },
    java: `public class PeakMountainArray {
    public static int peakIndexInMountainArray(int[] arr) {
        int low = 0, high = arr.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] < arr[mid + 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}`
  },
  "P-79": {
    logic: {
      summary: "Find the number of rotations in a rotated sorted array.",
      approach: "Binary Search. The number of rotations is equal to the index of the minimum element in the rotated sorted array.",
      intuition: "Each rotation shifts the minimum element right. Its index corresponds exactly to the count of rotations.",
      pseudocode: "low = 0, high = n-1\nwhile low < high:\n  mid = low + (high-low)/2\n  if nums[mid] > nums[high] low = mid + 1\n  else high = mid\nreturn low",
      dryRun: "nums=[3,4,5,1,2]\nlow=0, high=4. mid=2(5) > 2 -> low=3\nlow=3, high=4. mid=3(1) <= 2 -> high=3. Loop ends. Returns index 3 (3 rotations).",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "Why is the number of rotations equal to the minimum element's index? (Because the original array started with the minimum at index 0).",
        "Discuss edge case where array is not rotated (minimum at 0 -> returns 0).",
        "Analyze duplicates."
      ]
    },
    java: `public class RotationsCount {
    public static int findRotations(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] > nums[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}`
  },
  "LC-1482": {
    logic: {
      summary: "Find the minimum number of days to make m bouquets of k adjacent flowers.",
      approach: "Binary Search on answer range [1, max_day]. For a guess day `mid`, count adjacent flower segments of size k. Adjust bounds.",
      intuition: "Monotonicity: if we can make m bouquets by day d, we can also make them by any day > d. We find the boundary day.",
      pseudocode: "low = 1, high = max(bloomDay)\nwhile low < high:\n  mid = low + (high-low)/2\n  if canMake(mid, m, k): high = mid\n  else: low = mid + 1\nreturn low",
      dryRun: "bloom=[1,10,3,10,2], m=2, k=1. low=1, high=10.\nmid=5. flowers: [1,x,3,x,2] -> can make 3 bouquets (>=2) -> high=5.\nmid=2. flowers: [1,x,x,x,2] -> can make 2 bouquets (>=2) -> high=2.\nmid=1. flowers: [1,x,x,x,x] -> can make 1 bouquet (<2) -> low=2. Returns 2.",
      time: "O(n log(max_day))",
      space: "O(1)",
      interviewPoints: [
        "Explain check condition `m * k > bloomDay.length` (returns -1 because there are not enough total flowers).",
        "Define linear validator `canMake`.",
        "Discuss space complexity."
      ]
    },
    java: `public class MakeBouquets {
    public static int minDays(int[] bloomDay, int m, int k) {
        if ((long) m * k > bloomDay.length) return -1;
        int max = 0;
        for (int d : bloomDay) max = Math.max(max, d);
        
        int low = 1, high = max;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (canMake(bloomDay, mid, m, k)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
    
    private static boolean canMake(int[] bloomDay, int day, int m, int k) {
        int count = 0, bouquets = 0;
        for (int d : bloomDay) {
            if (d <= day) {
                count++;
                if (count == k) {
                    bouquets++;
                    count = 0;
                }
            } else {
                count = 0;
            }
        }
        return bouquets >= m;
    }
}`
  },
  "P-83": {
    logic: {
      summary: "Find the maximum possible minimum distance between aggressive cows.",
      approach: "Binary Search on answer range [1, max_stall_dist]. Sort stall coordinates. For a guess distance `mid`, place cows at least `mid` distance apart. Adjust bounds.",
      intuition: "Distance has monotonic properties. If we can place cows with distance d, we can try larger values; else smaller.",
      pseudocode: "sort(stalls)\nlow = 1, high = stalls[n-1] - stalls[0]\nwhile low < high:\n  mid = low + (high-low+1)/2\n  if canPlace(mid, cows): low = mid\n  else: high = mid - 1\nreturn low",
      dryRun: "stalls=[1,2,8,4,9], cows=3. Sorted: [1,2,4,8,9]. low=1, high=8.\nmid=4. place: 1 -> 8 -> 9 (dist >=4, count 3) -> low=4.\nmid=6. place: 1 -> 8 (dist 7, count 2) -> high=5. Returns 4.",
      time: "O(n log n + n log(max_dist))",
      space: "O(1)",
      interviewPoints: [
        "Why use `(low + high + 1) / 2`? (To prevent infinite loops when low and high differ by 1, in maximum search).",
        "Define linear validator `canPlace`.",
        "Explain sorted coordinate requirement."
      ]
    },
    java: `import java.util.*;

public class AggressiveCows {
    public static int maxMinDistance(int[] stalls, int cows) {
        Arrays.sort(stalls);
        int low = 1;
        int high = stalls[stalls.length - 1] - stalls[0];
        int ans = 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canPlace(stalls, mid, cows)) {
                ans = mid;
                low = mid + 1; // try larger minimum distance
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
    
    private static boolean canPlace(int[] stalls, int dist, int cows) {
        int count = 1;
        int lastPlaced = stalls[0];
        for (int i = 1; i < stalls.length; i++) {
            if (stalls[i] - lastPlaced >= dist) {
                count++;
                lastPlaced = stalls[i];
                if (count == cows) return true;
            }
        }
        return false;
    }
}`
  },
  "LC-275": {
    logic: {
      summary: "Find the researcher's h-index from sorted citations.",
      approach: "Binary Search. Since the array is sorted, look for the first index `mid` where `citations[mid] >= n - mid`.",
      intuition: "An h-index of h means h papers have at least h citations. Since it's sorted, `n - mid` papers from mid to end have at least `citations[mid]` citations.",
      pseudocode: "low = 0, high = n-1\nwhile low <= high:\n  mid = low + (high-low)/2\n  if citations[mid] >= n - mid high = mid - 1\n  else low = mid + 1\nreturn n - low",
      dryRun: "citations=[0,1,3,5,6], n=5\nlow=0, high=4. mid=2(3) >= 5-2=3 -> high=1\nlow=0, high=1. mid=0(0) < 5-0=5 -> low=1\nlow=1, high=1. mid=1(1) < 5-1=4 -> low=2. Loop ends. Returns 5 - 2 = 3.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: [
        "Why is it O(log n) compared to unsorted h-index (O(n log n) or O(n) space)?",
        "Verify boundaries.",
        "Explain indexing formula `n - mid`."
      ]
    },
    java: `public class HIndexII {
    public static int hIndex(int[] citations) {
        int n = citations.length;
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (citations[mid] >= n - mid) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return n - low;
    }
}`
  },
  "LC-2226": {
    logic: {
      summary: "Find the maximum number of candies each child can get so that k children get equal candies.",
      approach: "Binary Search on answer range [1, max_candies]. For a guess candies `mid`, calculate total children we can feed. Adjust bounds.",
      intuition: "Monotonicity: if we can allocate c candies to each child, we can try larger counts; else smaller.",
      pseudocode: "low = 1, high = max(piles)\nwhile low <= high:\n  mid = low + (high-low)/2\n  if canDivide(mid, k): ans = mid, low = mid + 1\n  else: high = mid - 1\nreturn ans",
      dryRun: "piles=[5,8,6], k=4. low=1, high=8.\nmid=4. children: 5/4 + 8/4 + 6/4 = 1+2+1 = 4 >= 4 -> ans=4, low=5.\nmid=6. children: 0 + 1 + 1 = 2 < 4 -> high=5. Returns 4.",
      time: "O(n log(max_val))",
      space: "O(1)",
      interviewPoints: [
        "Verify sum requirement: if sum(piles) < k, return 0.",
        "Explain division logic `pile / target` per pile.",
        "Discuss complexity parameters."
      ]
    },
    java: `public class MaxCandies {
    public static int maximumCandies(int[] piles, long k) {
        long sum = 0;
        int max = 0;
        for (int p : piles) {
            sum += p;
            max = Math.max(max, p);
        }
        if (sum < k) return 0;
        
        int low = 1, high = max;
        int ans = 0;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canDistribute(piles, mid, k)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
    
    private static boolean canDistribute(int[] piles, int target, long k) {
        long count = 0;
        for (int p : piles) {
            count += p / target;
            if (count >= k) return true;
        }
        return count >= k;
    }
}`
  },
  "P-87": {
    logic: {
      summary: "Allocate minimum number of pages of books to m students such that maximum pages read by any student is minimized.",
      approach: "Binary Search on answer range [max_pages, sum_pages]. For a guess pages `mid`, calculate students required. Adjust bounds.",
      intuition: "Identical to Split Array Largest Sum. Monotonic constraints on maximum capacity.",
      pseudocode: "low = max(pages), high = sum(pages)\nwhile low <= high:\n  mid = low + (high-low)/2\n  if canAllocate(mid, m): ans = mid, high = mid - 1\n  else: low = mid + 1\nreturn ans",
      dryRun: "pages=[12,34,67,90], m=2. low=90, high=203.\nmid=113. groups: [12,34,67](sum 113), [90] -> count=2 <= 2 -> high=112. Returns 113.",
      time: "O(n log(sum - max))",
      space: "O(1)",
      interviewPoints: [
        "Explain when allocation is impossible (e.g. if books count < students count, return -1).",
        "Define linear validator `canAllocate`.",
        "Compare with Capacity to Ship Packages."
      ]
    },
    java: `public class BookAllocation {
    public static int findPages(int[] arr, int m) {
        if (arr.length < m) return -1;
        int max = 0, sum = 0;
        for (int pages : arr) {
            max = Math.max(max, pages);
            sum += pages;
        }
        
        int low = max, high = sum;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (isValid(arr, mid, m)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
    
    private static boolean isValid(int[] arr, int limit, int m) {
        int students = 1;
        int current = 0;
        for (int pages : arr) {
            if (current + pages > limit) {
                students++;
                current = pages;
                if (students > m) return false;
            } else {
                current += pages;
            }
        }
        return true;
    }
}`
  },
  "P-94": {
    logic: {
      summary: "Find the kth smallest element in an unsorted array.",
      approach: "MaxHeap of size k. Add elements to MaxHeap. If size exceeds k, pop the largest element. At the end, heap top holds the kth smallest element.",
      intuition: "A max-heap of size k keeps only the smallest k values, with the largest of these (the kth smallest) at the top.",
      pseudocode: "pq = MaxHeap()\nfor num in nums:\n  pq.push(num)\n  if pq.size > k pq.pop()\nreturn pq.peek()",
      dryRun: "nums=[7,10,4,3,20,15], k=3\npq: [7] -> [7,10] -> [4,7,10] -> [4,7,10] (pop 10) -> [3,4,7] -> [3,4,7] (pop 20) -> [3,4,7] (pop 15). Returns 7.",
      time: "O(n log k)",
      space: "O(k)",
      interviewPoints: [
        "Explain Quickselect O(n) average alternative.",
        "Compare heap vs sorting.",
        "Discuss space complexity."
      ]
    },
    java: `import java.util.*;

public class KthSmallest {
    public static int kthSmallest(int[] arr, int k) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int num : arr) {
            maxHeap.add(num);
            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }
        return maxHeap.peek();
    }
}`
  },
  "LC-658": {
    logic: {
      summary: "Find the k closest elements to x in a sorted array.",
      approach: "Binary Search on range [0, n - k]. Compare distance of x to `arr[mid]` vs `arr[mid + k]`. If `x - arr[mid] > arr[mid + k] - x`, the search window should move right. Else left.",
      intuition: "Instead of searching for elements individually, we binary search the starting index of the k-length window.",
      pseudocode: "low = 0, high = n - k\nwhile low < high:\n  mid = low + (high-low)/2\n  if x - arr[mid] > arr[mid+k] - x: low = mid + 1\n  else: high = mid\nreturn arr[low...low+k]",
      dryRun: "arr=[1,2,3,4,5], k=4, x=3. low=0, high=1.\nmid=0. |3-1|=2 vs |3-5|=2 -> left-leaning preferred -> high=0. Returns [1,2,3,4].",
      time: "O(log(n - k) + k)",
      space: "O(1) auxiliary space",
      interviewPoints: [
        "Why is `x - arr[mid] > arr[mid+k] - x` correct? (It determines if moving the window right decreases total distance to x).",
        "Compare with finding x's position and expanding outward (O(log n + k)).",
        "Discuss tie breaker rules (lexicographical smaller element gets preference)."
      ]
    },
    java: `import java.util.*;

public class KClosestElements {
    public static List<Integer> findClosestElements(int[] arr, int k, int x) {
        int low = 0, high = arr.length - k;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (x - arr[mid] > arr[mid + k] - x) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        List<Integer> result = new ArrayList<>();
        for (int i = low; i < low + k; i++) {
            result.add(arr[i]);
        }
        return result;
    }
}`
  },
  "P-101": {
    logic: {
      summary: "Merge k sorted arrays into a single sorted array.",
      approach: "MinHeap / PriorityQueue. Insert the first element of each array into a MinHeap. Repeatedly extract the minimum element, append it to result, and insert the next element from the same array.",
      intuition: "K-way merge. Heap naturally maintains sorted order of active elements across multiple arrays.",
      pseudocode: "pq = MinHeap(elements: (val, arrIdx, elemIdx))\nfor i in k: pq.push((arr[i][0], i, 0))\nwhile pq:\n  val, arrIdx, elemIdx = pq.pop()\n  res.add(val)\n  if elemIdx + 1 < arr[arrIdx].length:\n    pq.push((arr[arrIdx][elemIdx+1], arrIdx, elemIdx+1))",
      dryRun: "arrs=[[1,4],[2,3]]. pq=[(1,0,0),(2,1,0)]\npop 1. push 4. pq=[(2,1,0),(4,0,1)]\npop 2. push 3. pq=[(3,1,1),(4,0,1)]\npop 3. pop 4. Returns [1,2,3,4].",
      time: "O(N log k) where N is total elements count",
      space: "O(k) for heap",
      interviewPoints: [
        "Explain how the heap stores indexes to retrieve next elements.",
        "Compare with divide and conquer array merging (similar to Merge Sort).",
        "Discuss heap size memory bounds."
      ]
    },
    java: `import java.util.*;

public class MergeKSorted {
    static class Node {
        int val, arrIdx, elemIdx;
        Node(int v, int a, int e) {
            val = v; arrIdx = a; elemIdx = e;
        }
    }
    public static List<Integer> mergeKArrays(int[][] arr, int k) {
        List<Integer> result = new ArrayList<>();
        PriorityQueue<Node> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));
        
        for (int i = 0; i < k; i++) {
            if (arr[i].length > 0) {
                minHeap.add(new Node(arr[i][0], i, 0));
            }
        }
        
        while (!minHeap.isEmpty()) {
            Node curr = minHeap.poll();
            result.add(curr.val);
            if (curr.elemIdx + 1 < arr[curr.arrIdx].length) {
                minHeap.add(new Node(arr[curr.arrIdx][curr.elemIdx + 1], curr.arrIdx, curr.elemIdx + 1));
            }
        }
        return result;
    }
}`
  },
  "LC-480": {
    logic: {
      summary: "Find the median of each sliding window of size k.",
      approach: "Two Heaps (Min and Max) with Lazy Deletion. Balance heaps to maintain median states. HashMap tracks popped elements (delayed deletions) to avoid O(k) remove operations in PriorityQueue.",
      intuition: "MedianFinder with removal support. Use lazy deletion to keep PriorityQueue operations O(log n).",
      pseudocode: "small = MaxHeap(), large = MinHeap(), lazyMap = Map()\nfor i from 0 to n-1:\n  add(nums[i])\n  if i >= k:\n    remove(nums[i-k])\n    res.add(getMedian())",
      dryRun: "nums=[1,3,-1,-3,5,3,6,7], k=3\nHeaps keep elements and calculate medians, lazily removing elements outside window. Returns [1.0,-1.0,-1.0,3.0,5.0,6.0].",
      time: "O(n log n)",
      space: "O(n) for heaps and hash map",
      interviewPoints: [
        "Why is lazy deletion necessary? (Standard PriorityQueue.remove(x) takes O(k) linear time, degrading overall complexity to O(n * k)).",
        "Explain heap balance equations.",
        "How is double vs single median handled?"
      ]
    },
    java: `import java.util.*;

public class SlidingWindowMedian {
    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());
    private PriorityQueue<Integer> large = new PriorityQueue<>();
    private Map<Integer, Integer> lazy = new HashMap<>();
    private int smallSize = 0, largeSize = 0;

    public double[] medianSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        double[] result = new double[n - k + 1];
        
        for (int i = 0; i < k; i++) {
            add(nums[i]);
        }
        result[0] = getMedian(k);
        
        for (int i = k; i < n; i++) {
            add(nums[i]);
            remove(nums[i - k]);
            result[i - k + 1] = getMedian(k);
        }
        return result;
    }
    
    private void add(int num) {
        if (small.isEmpty() || num <= small.peek()) {
            small.add(num);
            smallSize++;
        } else {
            large.add(num);
            largeSize++;
        }
        balance();
    }
    
    private void remove(int num) {
        lazy.put(num, lazy.getOrDefault(num, 0) + 1);
        if (num <= small.peek()) {
            smallSize--;
        } else {
            largeSize--;
        }
        balance();
        prune();
    }
    
    private void balance() {
        if (smallSize > largeSize + 1) {
            large.add(small.poll());
            smallSize--;
            largeSize++;
            prune();
        } else if (smallSize < largeSize) {
            small.add(large.poll());
            smallSize++;
            largeSize--;
            prune();
        }
    }
    
    private void prune() {
        while (!small.isEmpty() && lazy.getOrDefault(small.peek(), 0) > 0) {
            int val = small.poll();
            lazy.put(val, lazy.get(val) - 1);
        }
        while (!large.isEmpty() && lazy.getOrDefault(large.peek(), 0) > 0) {
            int val = large.poll();
            lazy.put(val, lazy.get(val) - 1);
        }
    }
    
    private double getMedian(int k) {
        if (k % 2 != 0) {
            return (double) small.peek();
        } else {
            return ((double) small.peek() + large.peek()) / 2.0;
        }
    }
}`
  },
  "P-113": {
    logic: {
      summary: "Check if an array is sorted in non-decreasing order.",
      approach: "Linear scan. Traverse the array and check if any element `arr[i] < arr[i-1]`. If so, return false. Otherwise, return true.",
      intuition: "Sorted array must be monotonically increasing. A single drop violates this property.",
      pseudocode: "for i from 1 to n-1:\n  if arr[i] < arr[i-1] return false\nreturn true",
      dryRun: "arr=[1,2,5,4] -> i=3: arr[3](4) < arr[2](5) -> returns false.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain worst-case vs best-case behavior.",
        "How to extend this to support non-increasing sorting?",
        "Recursion check comparison."
      ]
    },
    java: `public class CheckSorted {
    public static boolean isSorted(int[] arr) {
        if (arr == null || arr.length <= 1) return true;
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    }
}`
  },
  "LC-123": {
    logic: {
      summary: "Find the maximum profit from buying and selling a stock at most twice.",
      approach: "Dynamic Programming. Maintain 4 state variables representing the net balance after operations: `buy1` (buy first), `sell1` (sell first), `buy2` (buy second), and `sell2` (sell second). Update states sequentially for each price.",
      intuition: "At each price, we calculate the max balance state transitions. Selling 2nd depends on buying 2nd, which depends on selling 1st, which depends on buying 1st.",
      pseudocode: "buy1 = -inf, sell1 = 0, buy2 = -inf, sell2 = 0\nfor p in prices:\n  buy1 = max(buy1, -p)\n  sell1 = max(sell1, buy1 + p)\n  buy2 = max(buy2, sell1 - p)\n  sell2 = max(sell2, buy2 + p)\nreturn sell2",
      dryRun: "prices=[3,3,5,0,0,3,1,4]\nTracks buy/sell states across price list. Returns 6 (buy at 0, sell at 3; buy at 1, sell at 4).",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain why the state variable updates must happen sequentially.",
        "Compare with Buy and Sell Stock IV (Generalizing to K transactions).",
        "State space analysis."
      ]
    },
    java: `public class SellStockIII {
    public static int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) return 0;
        int buy1 = Integer.MIN_VALUE;
        int sell1 = 0;
        int buy2 = Integer.MIN_VALUE;
        int sell2 = 0;
        for (int p : prices) {
            buy1 = Math.max(buy1, -p);
            sell1 = Math.max(sell1, buy1 + p);
            buy2 = Math.max(buy2, sell1 - p);
            sell2 = Math.max(sell2, buy2 + p);
        }
        return sell2;
    }
}`
  },
  "LC-188": {
    logic: {
      summary: "Find the maximum profit from buying and selling a stock at most k times.",
      approach: "Dynamic Programming. Maintain two arrays of size k + 1: `buy` (min cost to buy at transaction t) and `sell` (max profit after selling at transaction t). For each price, update states.",
      intuition: "Generalization of Stock III. DP state transitions: `buy[i] = max(buy[i], sell[i-1] - price)` and `sell[i] = max(sell[i], buy[i] + price)`.",
      pseudocode: "buy = array of -infinity, sell = array of 0\nfor p in prices:\n  for i from 1 to k:\n    buy[i] = max(buy[i], sell[i-1] - p)\n    sell[i] = max(sell[i], buy[i] + p)\nreturn sell[k]",
      dryRun: "prices=[3,2,6,5,0,3], k=2. buy=[-inf, -inf], sell=[0, 0]\nUpdates states up to k=2. Returns 7 (buy at 2, sell at 6; buy at 0, sell at 3).",
      time: "O(n * k)",
      space: "O(k) space complexity",
      interviewPoints: [
        "Why can we optimize space to O(k)? (Because state t only depends on state t-1 of the previous price step).",
        "What if k is extremely large (e.g. k >= n/2)? (Problem simplifies to Stock II where we can buy/sell as many times as we want: sum up all positive diffs).",
        "Prove correctness."
      ]
    },
    java: `import java.util.*;

public class SellStockIV {
    public static int maxProfit(int k, int[] prices) {
        if (prices == null || prices.length == 0 || k == 0) return 0;
        int n = prices.length;
        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) {
                    profit += prices[i] - prices[i - 1];
                }
            }
            return profit;
        }
        
        int[] buy = new int[k + 1];
        int[] sell = new int[k + 1];
        Arrays.fill(buy, Integer.MIN_VALUE);
        
        for (int p : prices) {
            for (int i = 1; i <= k; i++) {
                buy[i] = Math.max(buy[i], sell[i - 1] - p);
                sell[i] = Math.max(sell[i], buy[i] + p);
            }
        }
        return sell[k];
    }
}`
  },
  "LC-36": {
    logic: {
      summary: "Determine if a 9x9 Sudoku board is valid.",
      approach: "Single pass. Use HashSet to store visited status for rows, columns, and 3x3 boxes. Encode visited status as strings like `val + ' in row ' + r`, `val + ' in col ' + c`, and `val + ' in box ' + r/3 + '-' + c/3`.",
      intuition: "Sudoku validation only requires checking uniqueness constraints in each row, column, and sub-box.",
      pseudocode: "seen = Set()\nfor r from 0 to 8:\n  for c from 0 to 8:\n    val = board[r][c]\n    if val != '.' and (val in row, col, or box strings) return false\nreturn true",
      dryRun: "board[0][0]='5' -> seen adds '5 in row 0', '5 in col 0', '5 in box 0-0'. If '5' occurs again in row 0, check fails.",
      time: "O(1) (fixed 81 operations)",
      space: "O(1) (fixed HashSet size)",
      interviewPoints: ["How to map cell indices to sub-grid box index: `(r / 3) * 3 + c / 3`.", "Explain why this runs in O(1) time and space.", "Compare with boolean arrays."]
    },
    java: `import java.util.*;

public class ValidSudoku {
    public static boolean isValidSudoku(char[][] board) {
        Set<String> seen = new HashSet<>();
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                char val = board[r][c];
                if (val != '.') {
                    if (!seen.add(val + " in row " + r) ||
                        !seen.add(val + " in col " + c) ||
                        !seen.add(val + " in box " + (r / 3) + "-" + (c / 3))) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}`
  },
  "LC-40": {
    logic: {
      summary: "Find all unique combinations in candidates where candidate numbers sum to target (candidates can only be used once).",
      approach: "Backtracking with sorting. Sort the array first. Skip duplicate adjacent elements in the same recursion level to avoid duplicate combinations.",
      intuition: "Sorting groups identical values together, allowing simple index-based skips of identical branches.",
      pseudocode: "dfs(idx, target, path):\n  if target == 0: result.add(path)\n  for i from idx to len:\n    if i > idx and arr[i] == arr[i-1] continue\n    if arr[i] > target break\n    dfs(i+1, target - arr[i], path + arr[i])",
      dryRun: "candidates=[1,1,2,5], target=8. sorted=[1,1,2,5].\ndfs(0, 8) -> include 1 -> dfs(1, 7) -> include 1 -> dfs(2, 6)...",
      time: "O(2^N)",
      space: "O(N) recursion depth",
      interviewPoints: ["Why sort candidates? (Enables early pruning and simple duplicates skipping).", "Explain `i > idx` duplicate check.", "Contrast with Combination Sum I."]
    },
    java: `import java.util.*;

public class CombinationSumII {
    public static List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates);
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }
    
    private static void backtrack(int[] candidates, int target, int start, List<Integer> path, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] == candidates[i - 1]) continue; // skip duplicates
            if (candidates[i] > target) break; // early pruning
            path.add(candidates[i]);
            backtrack(candidates, target - candidates[i], i + 1, path, result);
            path.remove(path.size() - 1);
        }
    }
}`
  },
  "LC-45": {
    logic: {
      summary: "Find the minimum number of jumps to reach the last index of the array.",
      approach: "Greedy BFS. Maintain current jump end boundary `currEnd` and furthest reachable index `farthest`. Increment jump count when we reach `currEnd`.",
      intuition: "At each step, look ahead to see the farthest index reachable in the next jump range.",
      pseudocode: "jumps = 0, currEnd = 0, farthest = 0\nfor i from 0 to n-2:\n  farthest = max(farthest, i + nums[i])\n  if i == currEnd:\n    jumps++, currEnd = farthest\nreturn jumps",
      dryRun: "nums=[2,3,1,1,4]\ni=0: farthest=2. i==currEnd(0) -> jumps=1, currEnd=2.\ni=1: farthest=max(2, 1+3)=4. i=2: farthest=4. i==currEnd(2) -> jumps=2, currEnd=4. End loop. Returns 2.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Why is greedy O(N) better than O(N^2) DP? (Only iterates list once).", "Boundary conditions for single-element array.", "Furthest reach concepts."]
    },
    java: `public class JumpGameII {
    public static int jump(int[] nums) {
        int jumps = 0, currEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currEnd) {
                jumps++;
                currEnd = farthest;
            }
        }
        return jumps;
    }
}`
  },
  "LC-48": {
    logic: {
      summary: "Rotate a 2D image matrix 90 degrees clockwise in-place.",
      approach: "Transpose then Reverse. 1) Transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]`). 2) Reverse each row.",
      intuition: "Geometrical transformation: Transpose flips diagonally; row reversal rotates 90 degrees.",
      pseudocode: "transpose(matrix)\nfor each row:\n  reverse(row)",
      dryRun: "matrix=[[1,2],[3,4]] -> Transpose: [[1,3],[2,4]] -> Reverse rows: [[3,1],[4,2]]. Correct.",
      time: "O(N^2) where N is matrix dimension",
      space: "O(1) auxiliary space",
      interviewPoints: ["Why is in-place optimal? (Saves O(N^2) memory).", "Alternative shell rotation approach.", "Anti-clockwise rotation steps (Transpose + Reverse columns)."]
    },
    java: `public class RotateImage {
    public static void rotate(int[][] matrix) {
        int n = matrix.length;
        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // Reverse rows
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }
}`
  },
  "LC-54": {
    logic: {
      summary: "Return all elements of a matrix in spiral order.",
      approach: "Layer-by-layer traversal. Maintain bounds for top, bottom, left, and right. Traverse boundaries and shrink them accordingly.",
      intuition: "Set explicit indices for walls. Step around clockwise, reducing boundary size each round.",
      pseudocode: "spiralOrder(matrix):\n  traverse top row -> right col -> bottom row -> left col\n  adjust boundaries",
      dryRun: "matrix=[[1,2,3],[4,5,6],[7,8,9]] -> 1,2,3 -> 6,9 -> 8,7 -> 4 -> 5.",
      time: "O(M * N)",
      space: "O(1) auxiliary space",
      interviewPoints: ["Checking double boundaries when traversing bottom or left rows to prevent duplicate prints.", "Empty matrix check.", "Dynamic bounds."]
    },
    java: `import java.util.*;

public class SpiralMatrix {
    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix == null || matrix.length == 0) return result;
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) result.add(matrix[top][i]);
            top++;
            for (int i = top; i <= bottom; i++) result.add(matrix[i][right]);
            right--;
            
            if (top <= bottom) {
                for (int i = right; i >= left; i--) result.add(matrix[bottom][i]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) result.add(matrix[i][left]);
                left++;
            }
        }
        return result;
    }
}`
  },
  "LC-66": {
    logic: {
      summary: "Increment a large integer represented as a digit array.",
      approach: "Iterate from right to left. If digit < 9, increment and return. Else, set digit to 0. If loop finishes, create a new array with 1 at index 0.",
      intuition: "Adding 1 propagates carry leftwards only if digit is 9.",
      pseudocode: "for i from n-1 down to 0:\n  if digits[i] < 9: digits[i]++, return digits\n  digits[i] = 0\nnewArr = Array(n+1), newArr[0]=1, return newArr",
      dryRun: "digits=[1,2,9] -> index 2 is 9 -> digits[2]=0. index 1 is 2 -> digits[1]=3, return [1,3,0].",
      time: "O(N)",
      space: "O(N) worst case (all 9s)",
      interviewPoints: ["Avoid string or math conversions (can overflow standard types).", "Identify early exits.", "In-place updates."]
    },
    java: `public class PlusOne {
    public static int[] plusOne(int[] digits) {
        int n = digits.length;
        for (int i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int[] result = new int[n + 1];
        result[0] = 1;
        return result;
    }
}`
  },
  "LC-73": {
    logic: {
      summary: "Set entire row and column of a matrix to 0 if a cell is 0.",
      approach: "Use the first row and first column of the matrix as state markers. Track first row/column zero status separately using two flags.",
      intuition: "In-place storage. First row/col acts as indicators for rest of grid, saving auxiliary memory.",
      pseudocode: "setMatrixZeroes(matrix):\n  check if first row or first col has any 0\n  mark zeroes in first row/col\n  zero out inner cells based on markers\n  zero first row/col if flags set",
      dryRun: "matrix=[[1,0],[3,4]] -> first row has 0. mark first row. updates matrix.",
      time: "O(M * N)",
      space: "O(1)",
      interviewPoints: ["Why is O(1) space optimal compared to O(M+N) temp arrays?", "First cell `matrix[0][0]` overlapping indicator management.", "In-place markers."]
    },
    java: `public class SetMatrixZeroes {
    public static void setZeroes(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        boolean firstRowZero = false;
        boolean firstColZero = false;
        
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstColZero = true;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRowZero = true;
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        
        if (firstRowZero) for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (firstColZero) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
}`
  },
  "LC-84": {
    logic: {
      summary: "Find the area of the largest rectangle in a histogram.",
      approach: "Monotonic Stack. Maintain a stack of indices representing increasing bar heights. When we see a shorter bar, pop and calculate area with popped height as minimum.",
      intuition: "For each bar, find the left and right boundary indices where the height drops.",
      pseudocode: "stack = []\nfor i from 0 to n:\n  while stack and height[i] < height[stack.top]:\n    h = height[stack.pop()]\n    w = stack.isEmpty() ? i : i - stack.top - 1\n    maxArea = max(maxArea, h * w)\n  stack.push(i)",
      dryRun: "heights=[2,1,5,6,2]\ni=0: push 0. i=1: pop 0 (h=2, w=1, area=2), push 1. i=2: push 2. i=3: push 3.\ni=4: pop 3 (h=6, w=1, area=6), pop 2 (h=5, w=2, area=10). maxArea=10.",
      time: "O(N)",
      space: "O(N) stack capacity",
      interviewPoints: ["Explain monotonic stack properties.", "Why we push a dummy 0 height at the end (forces emptying stack).", "Calculate width calculation boundaries."]
    },
    java: `import java.util.*;

public class LargestRectangle {
    public static int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0;
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && h < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}`
  },
  "LC-90": {
    logic: {
      summary: "Find all subsets of an array with duplicate elements (subsets must be unique).",
      approach: "Backtracking. Sort the array. Skip duplicate adjacent elements in the same recursion loop to prevent duplicate subsets.",
      intuition: "Identical elements grouped together. If we skip the start of identical branches, we suppress duplicate subsets.",
      pseudocode: "backtrack(idx, path):\n  result.add(path)\n  for i from idx to n:\n    if i > idx and arr[i] == arr[i-1] continue\n    backtrack(i+1, path + arr[i])",
      dryRun: "arr=[1,2,2]. sorted.\ndfs(0) -> []. dfs(1)->[1]. dfs(2)->[1,2]. dfs(3)->[1,2,2]. skips duplicate 2 at start.",
      time: "O(2^N)",
      space: "O(N) recursion stack",
      interviewPoints: ["Why is sorting required? (Guarantees duplicates cluster together).", "Compare with Subsets I.", "Space complexity."]
    },
    java: `import java.util.*;

public class SubsetsII {
    public static List<List<Integer>> subsetsWithDup(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }
    
    private static void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        result.add(new ArrayList<>(path));
        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            path.add(nums[i]);
            backtrack(nums, i + 1, path, result);
            path.remove(path.size() - 1);
        }
    }
}`
  },
  "LC-134": {
    logic: {
      summary: "Find the starting gas station index to complete a circular circuit.",
      approach: "Greedy. Track total gas deficit and current gas surplus. If current gas drops below 0, reset start station to `i + 1`.",
      intuition: "If total gas >= total cost, a solution is guaranteed. If we cannot reach B from A, we cannot reach B from any station between A and B.",
      pseudocode: "totalTank = 0, currTank = 0, start = 0\nfor i from 0 to n-1:\n  totalTank += gas[i] - cost[i]\n  currTank += gas[i] - cost[i]\n  if currTank < 0: start = i + 1, currTank = 0\nreturn totalTank >= 0 ? start : -1",
      dryRun: "gas=[1,2], cost=[2,1]\ni=0: total=-1, curr=-1 -> start=1, curr=0.\ni=1: total=-1+1=0, curr=1. Ends. total>=0 -> return 1.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Explain why starting station must be unique.", "Explain the proof that if `totalTank >= 0` a solution must exist.", "Pruning checks."]
    },
    java: `public class GasStation {
    public static int canCompleteCircuit(int[] gas, int[] cost) {
        int totalTank = 0, currTank = 0, start = 0;
        for (int i = 0; i < gas.length; i++) {
            int net = gas[i] - cost[i];
            totalTank += net;
            currTank += net;
            if (currTank < 0) {
                start = i + 1;
                currTank = 0;
            }
        }
        return totalTank >= 0 ? start : -1;
    }
}`
  },
  "LC-136": {
    logic: {
      summary: "Find the single element in an array where every other element appears twice.",
      approach: "Bitwise XOR. XOR of two identical numbers is 0 (`x ^ x = 0`). XOR of any number with 0 is itself (`x ^ 0 = x`).",
      intuition: "XOR cancels out all paired numbers, leaving only the single element.",
      pseudocode: "res = 0\nfor x in nums: res = res ^ x\nreturn res",
      dryRun: "nums=[2,1,2] -> 0 ^ 2 = 2 -> 2 ^ 1 = 3 -> 3 ^ 2 = 1. Returns 1.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Why is XOR optimal compared to HashMap? (HashMap uses O(N) space, XOR uses O(1)).", "XOR arithmetic properties.", "State constraints (exactly twice)."]
    },
    java: `public class SingleNumberXOR {
    public static int singleNumber(int[] nums) {
        int res = 0;
        for (int x : nums) {
            res ^= x;
        }
        return res;
    }
}`
  },
  "LC-213": {
    logic: {
      summary: "House Robber II (circular arrangement).",
      approach: "Run standard House Robber DP on two sub-arrays: 1) excluding the first house, 2) excluding the last house. Return the maximum of these two results.",
      intuition: "Circular constraint prevents robbing both the first and last house simultaneously. Splitting resolves the cycle.",
      pseudocode: "return max(robHelper(nums[0..n-2]), robHelper(nums[1..n-1]))",
      dryRun: "nums=[2,3,2] -> sub1=[2,3]->3. sub2=[3,2]->3. max(3,3)=3.",
      time: "O(N)",
      space: "O(1) space optimized dynamic programming",
      interviewPoints: ["Explain state transitions.", "Why cyclic arrays require two passes.", "Handling of single-house array."]
    },
    java: `public class HouseRobberII {
    public static int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(robHelper(nums, 0, nums.length - 2),
                        robHelper(nums, 1, nums.length - 1));
    }
    private static int robHelper(int[] nums, int start, int end) {
        int prev1 = 0, prev2 = 0;
        for (int i = start; i <= end; i++) {
            int temp = prev1;
            prev1 = Math.max(prev1, prev2 + nums[i]);
            prev2 = temp;
        }
        return prev1;
    }
}`
  },
  "LC-239": {
    logic: {
      summary: "Find the maximum elements in all sliding windows of size k.",
      approach: "Monotonic Queue (Deque). Maintain index entries. Keep queue sorted in descending order of values. Pop indices that fall outside window, and pop elements smaller than current element.",
      intuition: "Maintains indices of candidates that could be maximums. Front of queue is always maximum for current window.",
      pseudocode: "Q = Deque()\nfor i in array:\n  remove out-of-window indices from front\n  remove smaller values from back\n  push i\n  if window matches size: res.add(arr[Q.front])",
      dryRun: "nums=[1,3,-1], k=2\ni=0: Q=[0]. i=1: pop 0 (since 3>1), Q=[1]. win size reached -> res=[3]. i=2: Q=[1,2] (since -1<3). res=[3,3].",
      time: "O(N)",
      space: "O(k) deque capacity",
      interviewPoints: [
        "Why is Deque average runtime O(N) when we have nested loops? (Each element is pushed and popped at most once).",
        "Compare with Max-Heap O(N log k) approach.",
        "Edge cases (k = 1)."
      ]
    },
    java: `import java.util.*;

public class SlidingWindowMax {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0) return new int[0];
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();
        int idx = 0;
        
        for (int i = 0; i < n; i++) {
            // remove indices out of range
            if (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }
            // remove elements smaller than current
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            
            if (i >= k - 1) {
                result[idx++] = nums[deque.peekFirst()];
            }
        }
        return result;
    }
}`
  },
  "LC-252": {
    logic: {
      summary: "Determine if a person can attend all meetings.",
      approach: "Sort intervals by start times. Verify that no meeting overlaps with the next: `intervals[i][1] <= intervals[i+1][0]`.",
      intuition: "Sorting simplifies overlap check to comparison between adjacent entries.",
      pseudocode: "sort(intervals)\nfor i from 0 to n-2:\n  if intervals[i][1] > intervals[i+1][0] return false\nreturn true",
      dryRun: "intervals=[[0,30],[5,10]] -> sorted: [[0,30],[5,10]]. 30 > 5 -> returns false.",
      time: "O(N log N) sorting cost",
      space: "O(1) auxiliary space",
      interviewPoints: ["Overlapping bounds checks.", "Sorting comparator definition.", "Interval representations."]
    },
    java: `import java.util.*;

public class MeetingRooms {
    public static boolean canAttendMeetings(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        for (int i = 0; i < intervals.length - 1; i++) {
            if (intervals[i][1] > intervals[i + 1][0]) {
                return false;
            }
        }
        return true;
    }
}`
  },
  "LC-268": {
    logic: {
      summary: "Find the missing number in an array containing numbers from 0 to n.",
      approach: "Sum Formula or XOR. Sum: calculate expected sum `n*(n+1)/2` and subtract actual sum. XOR: XOR all indices and all array values.",
      intuition: "Math arithmetic closed-form comparison directly reveals the missing value.",
      pseudocode: "expected = n * (n + 1) / 2\nreturn expected - sum(nums)",
      dryRun: "nums=[3,0,1], n=3 -> expected=6, actual=4 -> missing = 6-4 = 2.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Compare XOR vs Sum (XOR avoids integer overflow risk for extremely large N).", "Explain indices matching.", "Alternative sorting approach."]
    },
    java: `public class MissingNumberSum {
    public static int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int x : nums) actual += x;
        return expected - actual;
    }
}`
  },
  "LC-309": {
    logic: {
      summary: "Best Time to Buy and Sell Stock with Cooldown.",
      approach: "State Machine DP. 3 states: `held`, `sold` (cooldown next), `reset`. Write transitions: `held = max(held, reset - price)`, `sold = held + price`, `reset = max(reset, sold_prev)`.",
      intuition: "Track maximum profit configurations depending on choice availability at each day.",
      pseudocode: "held = -inf, sold = 0, reset = 0\nfor p in prices:\n  new_sold = held + p\n  held = max(held, reset - p)\n  reset = max(reset, prev_sold)\nreturn max(sold, reset)",
      dryRun: "prices=[1,2,3,0,2] -> calculates optimal state profits iteratively.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Define transitions.", "How cooldown constraint changes equations compared to normal stock DP.", "Base cases."]
    },
    java: `public class StockCooldown {
    public static int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) return 0;
        int held = Integer.MIN_VALUE, sold = 0, reset = 0;
        for (int price : prices) {
            int preSold = sold;
            sold = held + price;
            held = Math.max(held, reset - price);
            reset = Math.max(reset, preSold);
        }
        return Math.max(sold, reset);
    }
}`
  },
  "LC-312": {
    logic: {
      summary: "Burst Balloons to maximize coins.",
      approach: "Interval DP. `dp[i][j]` is max coins obtained by bursting balloons between i and j. Iterate from length 1 to n. For each interval, select the last balloon `k` to burst.",
      intuition: "Solve backwards: pick the last balloon to burst in interval `[i, j]`. This isolates subproblems cleanly.",
      pseudocode: "dp[i][j] = max(dp[i][k-1] + val[i-1]*val[k]*val[j+1] + dp[k+1][j] for k in [i, j])",
      dryRun: "balloons=[3,1,5] -> paddings [1,3,1,5,1] -> computes optimal coins recursively.",
      time: "O(N^3)",
      space: "O(N^2)",
      interviewPoints: ["Why solve from 'last burst balloon' perspective instead of first? (First balloon burst couples left and right subproblems; last balloon decouples them).", "Space optimizations.", "Base cases."]
    },
    java: `public class BurstBalloons {
    public static int maxCoins(int[] nums) {
        int n = nums.length;
        int[] vals = new int[n + 2];
        vals[0] = vals[n + 1] = 1;
        System.arraycopy(nums, 0, vals, 1, n);
        
        int[][] dp = new int[n + 2][n + 2];
        for (int len = 1; len <= n; len++) {
            for (int i = 1; i <= n - len + 1; i++) {
                int j = i + len - 1;
                for (int k = i; k <= j; k++) {
                    dp[i][j] = Math.max(dp[i][j],
                        dp[i][k - 1] + vals[i - 1] * vals[k] * vals[j + 1] + dp[k + 1][j]);
                }
            }
        }
        return dp[1][n];
    }
}`
  },
  "LC-416": {
    logic: {
      summary: "Check if an array can be partitioned into two subsets with equal sum.",
      approach: "0-1 Knapsack DP. Total sum must be even, target = sum / 2. Maintain a boolean array `dp` where `dp[i]` indicates if subset sum `i` is possible.",
      intuition: "Subset sum target mapping. Working backwards prevents duplicate element usage.",
      pseudocode: "if sum is odd return false\ntarget = sum/2, dp = boolean array of size target+1, dp[0]=true\nfor num in nums:\n  for i from target down to num:\n    dp[i] = dp[i] or dp[i - num]\nreturn dp[target]",
      dryRun: "nums=[1,5,5], target=5. dp[0]=true.\nnum=1 -> dp=[t,t,f,f,f,f]. num=5 -> dp[5]=dp[5]||dp[0]=true. dp[5] is true -> returns true.",
      time: "O(N * Target) where Target = sum / 2",
      space: "O(Target)",
      interviewPoints: ["Why iterate backwards? (Prevents reusing the same element multiple times in the same step).", "Base case explanation.", "Space reduction from 2D to 1D."]
    },
    java: `public class PartitionEqualSum {
    public static boolean canPartition(int[] nums) {
        int sum = 0;
        for (int x : nums) sum += x;
        if ((sum & 1) == 1) return false;
        
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        
        for (int num : nums) {
            for (int i = target; i >= num; i--) {
                dp[i] = dp[i] || dp[i - num];
            }
        }
        return dp[target];
    }
}`
  },
  "LC-435": {
    logic: {
      summary: "Find the minimum number of intervals to remove to make the rest non-overlapping.",
      approach: "Greedy. Sort intervals by end times. Keep the interval that ends earliest. Remove any meeting that starts before the current meeting ends.",
      intuition: "Picking the interval with the earliest end time leaves maximum room for subsequent intervals.",
      pseudocode: "sort(intervals by end time)\ncount = 0, end = -inf\nfor interval in intervals:\n  if start >= end: end = interval.end\n  else: count++\nreturn count",
      dryRun: "intervals=[[1,2],[2,3],[1,3]] -> sorted: [1,2],[2,3],[1,3].\n[1,2] -> end=2. [2,3] -> start(2)>=end(2) -> end=3. [1,3] -> start(1)<end(3) -> count=1. Returns 1.",
      time: "O(N log N) sorting cost",
      space: "O(1)",
      interviewPoints: ["Why sort by end times rather than start times? (Earliest end times guarantee maximum remaining resource space).", "Contrast with Merge Intervals.", "Define overlap criteria."]
    },
    java: `import java.util.*;

public class EraseOverlapIntervals {
    public static int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int count = 0;
        int end = intervals[0][1];
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < end) {
                count++;
            } else {
                end = intervals[i][1];
            }
        }
        return count;
    }
}`
  },
  "LC-518": {
    logic: {
      summary: "Find the number of combinations that make up a target amount using coins.",
      approach: "Unbounded Knapsack DP. Maintain a 1D `dp` array where `dp[i]` is the combinations to make change for amount `i`.",
      intuition: "Iterating through coins first ensures that order of coins in combination does not produce duplicate permutations.",
      pseudocode: "dp = array of size target+1, dp[0]=1\nfor coin in coins:\n  for i from coin to target:\n    dp[i] += dp[i - coin]\nreturn dp[target]",
      dryRun: "amount=3, coins=[1,2]. dp=[1,0,0,0]\ncoin=1 -> dp=[1,1,1,1]\ncoin=2 -> dp[2]+=dp[0]=2, dp[3]+=dp[1]=2. Returns 2.",
      time: "O(N * Target)",
      space: "O(Target)",
      interviewPoints: ["Why do we loop coins outer and target inner? (To find combinations instead of permutations).", "State transitions.", "Base case."]
    },
    java: `public class CoinChangeCombinations {
    public static int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        return dp[amount];
    }
}`
  },
  "LC-746": {
    logic: {
      summary: "Find the minimum cost to climb stairs to reach the top.",
      approach: "DP. `dp[i] = cost[i] + min(dp[i-1], dp[i-2])`. Optimize space by keeping track of only the last two values.",
      intuition: "At each step, we pay the step cost plus the minimum of the paths from the previous two steps.",
      pseudocode: "prev1 = 0, prev2 = 0\nfor x in cost:\n  curr = x + min(prev1, prev2)\n  prev2 = prev1, prev1 = curr\nreturn min(prev1, prev2)",
      dryRun: "cost=[10,15,20] -> step 1: prev1=10. step 2: prev1=15, prev2=10. step 3: curr=20+min(10,15)=30. Returns min(30, 15)=15.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Space reduction from O(N) array to O(1) two variables.", "Identify base cases.", "Why return min of last two? (Can start at step 0 or step 1)."]
    },
    java: `public class MinCostClimbingStairs {
    public static int minCostClimbingStairs(int[] cost) {
        int prev1 = 0, prev2 = 0;
        for (int c : cost) {
            int curr = c + Math.min(prev1, prev2);
            prev2 = prev1;
            prev1 = curr;
        }
        return Math.min(prev1, prev2);
    }
}`
  },
  "LC-846": {
    logic: {
      summary: "Determine if hand of cards can be rearranged into groups of consecutive cards.",
      approach: "TreeMap / Sorted Map. Track card frequencies. Repeatedly pick the smallest card available, and verify that the next `groupSize - 1` consecutive cards exist and decrement their counts.",
      intuition: "Greedy choice: the smallest card in hand must start a group since no card smaller than it exists to cover it.",
      pseudocode: "map = TreeMap(card -> count)\nwhile map:\n  start = map.firstKey()\n  for i from 0 to groupSize-1:\n    if start+i not in map return false\n    decrement map[start+i] count",
      dryRun: "hand=[1,2,3,6,2,3,4,7,8], groupSize=3.\nGroups: [1,2,3], [2,3,4], [6,7,8]. All consecutive. Returns true.",
      time: "O(N log N) tree map updates",
      space: "O(N)",
      interviewPoints: ["Why TreeMap? (Allows constant O(log N) access to sorted elements).", "Why check smallest card first? (Simplifies start anchor choice).", "Handle groupSize = 1."]
    },
    java: `import java.util.*;

public class HandOfStraights {
    public static boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false;
        TreeMap<Integer> map = new TreeMap<>();
        for (int card : hand) {
            map.put(card, map.getOrDefault(card, 0) + 1);
        }
        
        while (!map.isEmpty()) {
            int first = map.firstKey();
            for (int i = 0; i < groupSize; i++) {
                int nextCard = first + i;
                if (!map.containsKey(nextCard)) return false;
                int count = map.get(nextCard);
                if (count == 1) {
                    map.remove(nextCard);
                } else {
                    map.put(nextCard, count - 1);
                }
            }
        }
        return true;
    }
}`
  },
  "LC-853": {
    logic: {
      summary: "Count the number of car fleets that arrive at target.",
      approach: "Sort cars by start positions in descending order. Calculate time to target for each car. Fleet forms if a trailing car's arrival time is <= leading car's time (gets blocked).",
      intuition: "Cars closer to target define speed limit bounds. Trailing cars catch up and join fleet.",
      pseudocode: "Sort cars descending by position\nfleets = 0, lastTime = 0\nfor car in sortedCars:\n  time = (target - pos) / speed\n  if time > lastTime: fleets++, lastTime = time\nreturn fleets",
      dryRun: "target=12, pos=[10,8,0,5,3], speed=[2,4,1,1,3]\nSorted pos: 10(time 1.0), 8(time 1.0), 5(time 7.0), 3(time 3.0), 0(time 12.0).\nCar 10: time 1.0 > 0.0 -> fleets=1, last=1.0.\nCar 8: time 1.0 <= 1.0 -> fleet 1.\nCar 5: time 7.0 > 1.0 -> fleets=2, last=7.0. returns fleets count.",
      time: "O(N log N) sorting cost",
      space: "O(N)",
      interviewPoints: ["Explain why sorting position is necessary.", "Floating point division for arrival times.", "Fleet absorption rule."]
    },
    java: `import java.util.*;

public class CarFleet {
    public static int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        double[][] cars = new double[n][2];
        for (int i = 0; i < n; i++) {
            cars[i][0] = position[i];
            cars[i][1] = (double) (target - position[i]) / speed[i]; // arrival time
        }
        Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0])); // descending order
        
        int fleets = 0;
        double lastTime = 0.0;
        for (int i = 0; i < n; i++) {
            if (cars[i][1] > lastTime) {
                fleets++;
                lastTime = cars[i][1];
            }
        }
        return fleets;
    }
}`
  },
  "LC-1851": {
    logic: {
      summary: "Find the size of the minimum interval containing each query.",
      approach: "Sort queries (keep original index) and sort intervals. Traverse sorted queries, add matching intervals to MinHeap ordered by size, and prune heap from top if intervals do not span current query.",
      intuition: "Sweep-line + Min-Priority Queue. Sorting both streams aligns interval coverage checks sequentially.",
      pseudocode: "Sort intervals, sort queries\nfor q in queries:\n  add matching intervals (start <= q) to PQ\n  pop intervals from PQ whose end < q\n  res[q.originalIndex] = PQ.peek().size",
      dryRun: "intervals=[[1,4],[2,4]], queries=[2,3]\nsorted queries. q=2: add [1,4],[2,4] to PQ. sizes 4, 3. PQ peek size=3. Returns 3.",
      time: "O(N log N + Q log Q)",
      space: "O(N + Q)",
      interviewPoints: ["Explain sweep-line optimization.", "Why MinHeap is essential.", "Keep track of query mapping."]
    },
    java: `import java.util.*;

public class MinIntervalQuery {
    public static int[] minInterval(int[][] intervals, int[] queries) {
        int n = intervals.length;
        int q = queries.length;
        int[][] sortedQueries = new int[q][2];
        for (int i = 0; i < q; i++) {
            sortedQueries[i][0] = queries[i];
            sortedQueries[i][1] = i;
        }
        
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        Arrays.sort(sortedQueries, (a, b) -> Integer.compare(a[0], b[0]));
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0])); // order by size
        int[] result = new int[q];
        Arrays.fill(result, -1);
        
        int i = 0;
        for (int[] query : sortedQueries) {
            int qVal = query[0];
            int qIdx = query[1];
            
            while (i < n && intervals[i][0] <= qVal) {
                int size = intervals[i][1] - intervals[i][0] + 1;
                pq.add(new int[]{size, intervals[i][1]});
                i++;
            }
            
            while (!pq.isEmpty() && pq.peek()[1] < qVal) {
                pq.poll();
            }
            
            if (!pq.isEmpty()) {
                result[qIdx] = pq.peek()[0];
            }
        }
        return result;
    }
}`
  },
  "LC-1899": {
    logic: {
      summary: "Determine if target triplet can be formed by merging triplets.",
      approach: "Greedy. Keep track of triplet max values we can achieve. Filter out any candidate triplets containing value greater than target triplet at respective positions. Perform union of remainder values.",
      intuition: "Triplets containing any value > target can never be used in merge since merge only increases values.",
      pseudocode: "a = b = c = false\nfor t in triplets:\n  if t[0] <= target[0] and t[1] <= target[1] and t[2] <= target[2]:\n    if t[0] == target[0] a = true\n    if t[1] == target[1] b = true\n    if t[2] == target[2] c = true\nreturn a and b and c",
      dryRun: "triplets=[[2,5,3],[1,8,4]], target=[2,7,5] -> [1,8,4] filtered (8 > 7). [2,5,3] has t[0]==target[0] -> a=true. Since b, c false -> false.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Why triplets with elements > target must be skipped.", "State merge function properties: `max(a, b)`.", "Correctness proof."]
    },
    java: `public class MergeTriplets {
    public static boolean mergeTriplets(int[][] triplets, int[] target) {
        boolean a = false, b = false, c = false;
        for (int[] t : triplets) {
            if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
                if (t[0] == target[0]) a = true;
                if (t[1] == target[1]) b = true;
                if (t[2] == target[2]) c = true;
            }
        }
        return a && b && c;
    }
}`
  },
  "LC-2013": {
    logic: {
      summary: "Detect and count squares on a 2D plane.",
      approach: "HashMap. Store points count in a coordinate map. To count squares for query point P(x, y), look for diagonal points D(dx, dy) where `|x - dx| == |y - dy| > 0`. For each match, multiply counts of coordinates (x, dy) and (dx, y).",
      intuition: "Diagonal point D and query point P uniquely define a square on a grid, pointing to coordinates of the remaining two vertices.",
      pseudocode: "add(p): countMap[p]++\ncount(p):\n  for diag in points:\n    if isDiagSquare(p, diag):\n      ans += countMap[diag] * countMap[x, diag.y] * countMap[diag.x, y]",
      dryRun: "add(3,10), add(11,2), add(3,2). P=(11,10). Diag=(3,2). |11-3|==|10-2|==8. Vertices (3,10) and (11,2) exist. count = 1*1*1 = 1.",
      time: "O(1) add, O(N) count where N is unique points count",
      space: "O(N) storage",
      interviewPoints: ["How to define diagonal point checks.", "Efficient 2D coordinate hashing.", "Square uniqueness verification."]
    },
    java: `import java.util.*;

public class DetectSquares {
    private final Map<String, Integer> counts;
    private final List<int[]> points;

    public DetectSquares() {
        counts = new HashMap<>();
        points = new ArrayList<>();
    }
    
    public void add(int[] point) {
        String key = point[0] + "," + point[1];
        counts.put(key, counts.getOrDefault(key, 0) + 1);
        points.add(point);
    }
    
    public int count(int[] point) {
        int x = point[0];
        int y = point[1];
        int total = 0;
        
        for (int[] p : points) {
            int px = p[0];
            int py = p[1];
            if (Math.abs(x - px) == Math.abs(y - py) && x != px && y != py) {
                String key1 = px + "," + y;
                String key2 = x + "," + py;
                String keyDiag = px + "," + py;
                if (counts.containsKey(key1) && counts.containsKey(key2)) {
                    total += counts.get(key1) * counts.get(key2);
                }
            }
        }
        return total;
    }
}`
  },
  "TCS-A06": {
    logic: {
      summary: "Rearrange array in increasing-decreasing order.",
      approach: "Sort the array. Keep first half as sorted (increasing), reverse second half.",
      intuition: "Sort groupings, dividing the list into two monotonic sections.",
      pseudocode: "sort(arr)\nreverse(arr[n/2..n-1])",
      dryRun: "arr=[8,7,1,6] -> sorted: [1,6,7,8] -> half size=2. reverse second half: [1,6,8,7].",
      time: "O(N log N) sorting cost",
      space: "O(1)",
      interviewPoints: ["Explain reverse indices calculations."]
    },
    java: `import java.util.*;

public class IncreaseDecreaseSort {
    public static void rearrange(int[] arr) {
        Arrays.sort(arr);
        int n = arr.length;
        int mid = n / 2;
        // reverse second half
        int l = mid, r = n - 1;
        while (l < r) {
            int temp = arr[l];
            arr[l] = arr[r];
            arr[r] = temp;
            l++; r--;
        }
    }
}`
  },
  "TCS-A07": {
    logic: {
      summary: "Sum of elements of the array.",
      approach: "Loop through elements, accumulating values.",
      intuition: "Linear accumulation.",
      pseudocode: "sum = 0\nfor x in arr: sum += x\nreturn sum",
      dryRun: "[1, 2] -> 3.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Prevent integer overflow using long types."]
    },
    java: `public class ArraySum {
    public static long getSum(int[] arr) {
        long sum = 0;
        for (int x : arr) sum += x;
        return sum;
    }
}`
  },
  "LC-189": {
    logic: {
      summary: "Rotate array to the right by k steps.",
      approach: "Triple Reverse. Modulo k first (`k %= n`). 1) Reverse the entire array. 2) Reverse the first `k` elements. 3) Reverse the remaining `n-k` elements.",
      intuition: "Reversing entire array shifts elements to correct global positions, but flips their order. Reversing sub-arrays restores order.",
      pseudocode: "k = k % n\nreverse(arr, 0, n-1)\nreverse(arr, 0, k-1)\nreverse(arr, k, n-1)",
      dryRun: "arr=[1,2,3], k=1 -> reverse: [3,2,1] -> reverse first 1: [3,2,1] -> reverse rest: [3,1,2]. Correct.",
      time: "O(N)",
      space: "O(1) in-place",
      interviewPoints: ["Why is triple reverse O(1) space optimal?", "Explain modulo step for large k.", "Alternative array clone approach."]
    },
    java: `public class RotateArrayTripleReverse {
    public static void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }
    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++; end--;
        }
    }
}`
  },
  "TCS-A09": {
    logic: {
      summary: "Average of all elements in an array.",
      approach: "Calculate sum of all elements, divide by array length as double.",
      intuition: "Mean computation.",
      pseudocode: "sum(arr) / arr.length",
      dryRun: "[1, 2, 3] -> sum=6 -> avg = 6.0/3 = 2.0.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Watch out for integer division truncation."]
    },
    java: `public class ArrayAverage {
    public static double getAverage(int[] arr) {
        long sum = 0;
        for (int x : arr) sum += x;
        return (double) sum / arr.length;
    }
}`
  },
  "TCS-A10": {
    logic: {
      summary: "Find the median of the given array.",
      approach: "Sort the array. If length is odd, return middle element. If even, return average of the two middle elements.",
      intuition: "Median definition.",
      pseudocode: "sort(arr)\nodd ? arr[n/2] : (arr[n/2] + arr[n/2-1])/2.0",
      dryRun: "[1, 3, 2] -> sorted: [1,2,3]. median = 2.0.",
      time: "O(N log N) sorting cost",
      space: "O(1)",
      interviewPoints: ["Median in even vs odd sizes."]
    },
    java: `import java.util.*;

public class ArrayMedian {
    public static double findMedian(int[] arr) {
        Arrays.sort(arr);
        int n = arr.length;
        if (n % 2 != 0) {
            return arr[n / 2];
        }
        return (arr[n / 2] + arr[(n / 2) - 1]) / 2.0;
    }
}`
  },
  "TCS-A12": {
    logic: {
      summary: "Remove duplicates from an unsorted array.",
      approach: "Use a LinkedHashSet to retain order while filtering duplicate values. Copy entries back.",
      intuition: "HashSet handles uniqueness; Linked list implementation preserves original relative positions.",
      pseudocode: "seen = LinkedHashSet()\nfor x in arr: seen.add(x)\nreturn array from seen",
      dryRun: "[2, 1, 2] -> seen: {2, 1}. Returns [2, 1].",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Compare with sorting to remove duplicates (modifies original order)."]
    },
    java: `import java.util.*;

public class UnsortedDuplicatesRemove {
    public static int[] remove(int[] arr) {
        Set<Integer> seen = new LinkedHashSet<>();
        for (int x : arr) seen.add(x);
        int[] result = new int[seen.size()];
        int idx = 0;
        for (int x : seen) result[idx++] = x;
        return result;
    }
}`
  },
  "TCS-A13": {
    logic: {
      summary: "Adding element in an array.",
      approach: "Create a new array of size `n + 1`. Copy original elements, insert new element at target position, shift remaining elements.",
      intuition: "Array size mutation simulation.",
      pseudocode: "newArr = Array(n+1)\ncopy index 0 to pos-1\nnewArr[pos] = val\ncopy pos to end",
      dryRun: "arr=[1,2], insert 3 at pos 1 -> newArr=[1,3,2].",
      time: "O(N)",
      space: "O(N) allocation",
      interviewPoints: ["Array resizing limitations in Java."]
    },
    java: `public class InsertElement {
    public static int[] insert(int[] arr, int element, int position) {
        int n = arr.length;
        int[] newArr = new int[n + 1];
        for (int i = 0; i < position; i++) {
            newArr[i] = arr[i];
        }
        newArr[position] = element;
        for (int i = position; i < n; i++) {
            newArr[i + 1] = arr[i];
        }
        return newArr;
    }
}`
  },
  "LC-442": {
    logic: {
      summary: "Find all duplicates in an array where values are in range [1, n].",
      approach: "In-place Sign Flipping. Traverse array. Use value `val = abs(nums[i])` as index. Flip `nums[val-1]` to negative. If it is already negative, we found a duplicate.",
      intuition: "Values act as indices. Sign bit acts as a boolean visited array, saving space.",
      pseudocode: "for x in nums:\n  idx = abs(x) - 1\n  if nums[idx] < 0: res.add(idx + 1)\n  else nums[idx] = -nums[idx]\nreturn res",
      dryRun: "nums=[2,1,2]\ni=0: idx=1. nums[1]=-1.\ni=1: idx=0. nums[0]=-2.\ni=2: idx=1. nums[1] is already negative -> duplicate 2 found. Returns [2].",
      time: "O(N)",
      space: "O(1) auxiliary space",
      interviewPoints: ["Why is sign flipping O(1) space optimal?", "What if array is not mutable? (Requires O(N) space).", "Range constraints [1, n]."]
    },
    java: `import java.util.*;

public class FindDuplicates {
    public static List<Integer> findDuplicates(int[] nums) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            int idx = Math.abs(nums[i]) - 1;
            if (nums[idx] < 0) {
                result.add(idx + 1);
            } else {
                nums[idx] = -nums[idx];
            }
        }
        return result;
    }
}`
  },
  "TCS-A15": {
    logic: {
      summary: "Find all non-repeating elements in an array.",
      approach: "HashMap frequency check. Return keys with frequency equal to 1.",
      intuition: "Track occurrences.",
      pseudocode: "frequency map creation, filter value == 1",
      dryRun: "[1,2,1] -> non-repeating: [2].",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Optimized search using LinkedHashMap to retain order."]
    },
    java: `import java.util.*;

public class NonRepeatingElements {
    public static List<Integer> find(int[] arr) {
        Map<Integer, Integer> map = new LinkedHashMap<>();
        for (int x : arr) map.put(x, map.getOrDefault(x, 0) + 1);
        List<Integer> res = new ArrayList<>();
        for (int x : map.keySet()) {
            if (map.get(x) == 1) res.add(x);
        }
        return res;
    }
}`
  },
  "TCS-A16": {
    logic: {
      summary: "Find all symmetric pairs in array (e.g. (a,b) and (b,a)).",
      approach: "HashMap. For each pair `(first, second)`, check if `map[second] == first`. If yes, it is a symmetric pair. Else, store `map[first] = second`.",
      intuition: "Reverse pair lookup table.",
      pseudocode: "for first, second in pairs:\n  if map[second] == first: print pair\n  else map[first] = second",
      dryRun: "pairs=[[1,2],[3,4],[2,1]] -> (1,2) saved -> (2,1) matches map[1]=2 -> prints (2,1).",
      time: "O(N)",
      space: "O(N)",
      interviewPoints: ["Explain lookup key strategy."]
    },
    java: `import java.util.*;

public class SymmetricPairs {
    public static void findPairs(int[][] pairs) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int[] pair : pairs) {
            int first = pair[0];
            int second = pair[1];
            Integer val = map.get(second);
            if (val != null && val == first) {
                System.out.println("(" + second + ", " + first + ")");
            } else {
                map.put(first, second);
            }
        }
    }
}`
  },
  "LC-1331": {
    logic: {
      summary: "Transform elements in an array to their rank ordered from smallest to largest.",
      approach: "Clone, sort, and assign unique rank starting from 1 to unique numbers using a HashMap. Map original values to their ranks.",
      intuition: "Sorting groups relative ordering; map deduplicates matching values to share a single rank.",
      pseudocode: "sorted = unique(sort(clone(arr)))\nmap = Map(val -> rank)\nreturn arr.map(x -> map[x])",
      dryRun: "[40,10,10] -> unique sorted: [10,40] -> map: {10:1, 40:2}. Result: [2,1,1].",
      time: "O(N log N)",
      space: "O(N)",
      interviewPoints: ["Handle duplicate elements correctly (must share same rank).", "Compare with sorting index arrays."]
    },
    java: `import java.util.*;

public class RankTransform {
    public static int[] arrayRankTransform(int[] arr) {
        int[] sorted = arr.clone();
        Arrays.sort(sorted);
        Map<Integer, Integer> ranks = new HashMap<>();
        int rank = 1;
        for (int x : sorted) {
            if (!ranks.containsKey(x)) {
                ranks.put(x, rank++);
            }
        }
        int[] result = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            result[i] = ranks.get(arr[i]);
        }
        return result;
    }
}`
  },
  "LC-1636": {
    logic: {
      summary: "Sort array by increasing frequency. If frequencies match, sort by descending values.",
      approach: "Custom sorting. Map frequencies. Box integers and sort using a comparator checking frequencies first, then value comparison.",
      intuition: "Sort wrapper that queries occurrence counts dynamically.",
      pseudocode: "Sort wrapper with custom comparator",
      dryRun: "[1,1,2,2,3] -> freq {1:2, 2:2, 3:1}. Sorted: [3, 2, 2, 1, 1].",
      time: "O(N log N)",
      space: "O(N)",
      interviewPoints: ["Comparator logic.", "Explain how boxing overhead can be reduced."]
    },
    java: `import java.util.*;

public class SortByFrequency {
    public static int[] frequencySort(int[] nums) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int x : nums) freq.put(x, freq.getOrDefault(x, 0) + 1);
        
        Integer[] boxed = new Integer[nums.length];
        for (int i = 0; i < nums.length; i++) boxed[i] = nums[i];
        
        Arrays.sort(boxed, (a, b) -> {
            int f1 = freq.get(a);
            int f2 = freq.get(b);
            if (f1 != f2) {
                return Integer.compare(f1, f2);
            }
            return Integer.compare(b, a); // descending order
        });
        
        for (int i = 0; i < nums.length; i++) nums[i] = boxed[i];
        return nums;
    }
}`
  },
  "LC-1122": {
    logic: {
      summary: "Sort array relative to another ordering template array.",
      approach: "Counting Sort. Count occurrences of arr1 in a frequency array. Write elements in arr2 order first, then write remaining elements in ascending order.",
      intuition: "Since values are bounded, counting sort executes relative alignment in linear time.",
      pseudocode: "counts = frequencyArray(arr1)\nfor x in arr2:\n  write x counts[x] times, counts[x]=0\nwrite remaining indices 0-1000 in order",
      dryRun: "arr1=[2,3,1,3], arr2=[3,2] -> counts: {1:1, 2:1, 3:2}.\nOutput 3 twice, 2 once -> [3,3,2]. Remaining 1 once -> [3,3,2,1].",
      time: "O(N + M + K) where K is range limits",
      space: "O(K) frequency count table",
      interviewPoints: ["Why is counting sort faster than comparison sort here?", "Handle elements not present in arr2."]
    },
    java: `public class RelativeSort {
    public static int[] relativeSortArray(int[] arr1, int[] arr2) {
        int[] counts = new int[1001];
        for (int x : arr1) counts[x]++;
        int idx = 0;
        for (int x : arr2) {
            while (counts[x] > 0) {
                arr1[idx++] = x;
                counts[x]--;
            }
        }
        for (int i = 0; i <= 1000; i++) {
            while (counts[i] > 0) {
                arr1[idx++] = i;
                counts[i]--;
            }
        }
        return arr1;
    }
}`
  },
  "TCS-A25": {
    logic: {
      summary: "Check if array is a subset of another array.",
      approach: "HashSet. Store elements of parent array in a HashSet. Verify that all elements of subset array are present in the set.",
      intuition: "HashSet lookup reduces subset matching time from quadratic to linear.",
      pseudocode: "parentSet = Set(arr1)\nfor x in arr2:\n  if x not in parentSet return false\nreturn true",
      dryRun: "arr1=[1,2,3], arr2=[2,3] -> all in set -> true.",
      time: "O(N + M)",
      space: "O(N)",
      interviewPoints: ["Explain handling of duplicate elements (multiset subset vs simple set subset)."]
    },
    java: `import java.util.*;

public class ArraySubsetCheck {
    public static boolean isSubset(int[] arr1, int[] arr2) {
        Set<Integer> set = new HashSet<>();
        for (int x : arr1) set.add(x);
        for (int x : arr2) {
            if (!set.contains(x)) return false;
        }
        return true;
    }
}`
  },
  "TCS-S02": {
    logic: {
      summary: "Selection Sort Algorithm.",
      approach: "Repeatedly find the minimum element from the unsorted part and swap it with the first element of that part.",
      intuition: "Build sorted array incrementally, securing smallest active values sequentially.",
      pseudocode: "for i from 0 to n-1:\n  minIdx = findMin(i to n-1)\n  swap(i, minIdx)",
      dryRun: "[3,1,2] -> minIdx=1. swap -> [1,3,2] -> minIdx=2. swap -> [1,2,3].",
      time: "O(N^2)",
      space: "O(1)",
      interviewPoints: ["Why is selection sort unstable? (Swaps can disrupt original relative orders).", "Analyze best/worst case comparisons."]
    },
    java: `public class SelectionSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`
  },
  "TCS-S03": {
    logic: {
      summary: "Insertion Sort Algorithm.",
      approach: "Iterate through elements. Take current element and insert it into its correct sorted position in the left prefix sub-array.",
      intuition: "Similar to sorting playing cards in hand; slide elements right until slot opens.",
      pseudocode: "for i from 1 to n-1:\n  curr = arr[i]\n  shift elements > curr to right\n  arr[correctSlot] = curr",
      dryRun: "[2, 1] -> key=1. shifts 2 right -> [2, 2] -> slots 1 -> [1, 2].",
      time: "O(N^2) worst case, O(N) best case (already sorted)",
      space: "O(1)",
      interviewPoints: ["Why is insertion sort stable?", "Explain performance on nearly sorted inputs."]
    },
    java: `public class InsertionSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`
  },
  "LC-912": {
    logic: {
      summary: "Sort an Array.",
      approach: "Merge Sort. Recursively split array in half, sort both halves, and merge them back using two pointers.",
      intuition: "Divide and conquer guarantees stable, worst-case logarithmic-linear comparisons.",
      pseudocode: "mergesort(left, right):\n  mid = (left+right)/2\n  mergesort(left, mid)\n  mergesort(mid+1, right)\n  merge(left, mid, right)",
      dryRun: "[5,2,3,1] -> split [5,2] and [3,1] -> sort -> [2,5] and [1,3] -> merge -> [1,2,3,5].",
      time: "O(N log N)",
      space: "O(N) auxiliary space",
      interviewPoints: ["Why is Merge Sort stable?", "Compare with Quick Sort (O(N^2) worst case) and Heap Sort (O(1) space but unstable).", "Explain recursion boundaries."]
    },
    java: `public class MergeSort {
    public static int[] sortArray(int[] nums) {
        mergeSort(nums, 0, nums.length - 1);
        return nums;
    }
    private static void mergeSort(int[] nums, int l, int r) {
        if (l >= r) return;
        int mid = l + (r - l) / 2;
        mergeSort(nums, l, mid);
        mergeSort(nums, mid + 1, r);
        merge(nums, l, mid, r);
    }
    private static void merge(int[] nums, int l, int mid, int r) {
        int[] temp = new int[r - l + 1];
        int i = l, j = mid + 1, k = 0;
        while (i <= mid && j <= r) {
            if (nums[i] <= nums[j]) temp[k++] = nums[i++];
            else temp[k++] = nums[j++];
        }
        while (i <= mid) temp[k++] = nums[i++];
        while (j <= r) temp[k++] = nums[j++];
        System.arraycopy(temp, 0, nums, l, temp.length);
    }
}`
  }
};




