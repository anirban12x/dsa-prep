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
  "TCS-A04": {
    logic: {
      summary: "Reverse a given array of elements.",
      approach: "Two pointers: one at start (0) and one at end (n-1). Swap elements at pointers and move them towards the middle until they meet.",
      intuition: "Reversing changes the mirror positions. Swapping elements inward accomplishes this in-place with O(1) space.",
      pseudocode: "l = 0, r = n - 1\nwhile l < r:\n  swap(arr[l], arr[r])\n  l++, r--",
      dryRun: "[1, 2, 3, 4] -> swap 1 & 4 -> [4, 2, 3, 1] -> swap 2 & 3 -> [4, 3, 2, 1]. Done.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Is in-place modification preferred?", "Explain the same algorithm applied to strings."]
    },
    java: `import java.util.*;

public class ReverseArray {
    public static void reverse(int[] arr) {
        int l = 0, r = arr.length - 1;
        while (l < r) {
            int temp = arr[l];
            arr[l] = arr[r];
            arr[r] = temp;
            l++; r--;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        reverse(arr);
        System.out.println("Reversed: " + Arrays.toString(arr));
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
  }
};
