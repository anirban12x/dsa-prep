import type { QuestionLogic } from "../types";

export const PARTYUSH_SOLUTIONS: Record<string, { logic: QuestionLogic; java: string }> = {
  "LC-83": {
    logic: {
      summary: "Remove duplicates from a sorted linked list in-place.",
      approach: "Iterate through the list using a single pointer. Compare the current node's value with the next node's value. If they are equal, skip the next node by pointing current's next to next-next. Otherwise, advance the pointer.",
      intuition: "Since the list is already sorted, duplicates are guaranteed to be adjacent. A single linear scan is sufficient.",
      pseudocode: "curr = head\nwhile curr != null and curr.next != null:\n  if curr.val == curr.next.val: curr.next = curr.next.next\n  else: curr = curr.next\nreturn head",
      dryRun: "head = [1,1,2]\ncurr=1: curr.next is 1 (equal). curr.next becomes 2. List: [1, 2].\ncurr=1: curr.next is 2 (not equal). curr becomes 2.\ncurr=2: curr.next is null. Terminate. Return [1, 2].",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Clarify if the list is sorted.",
        "Be careful with null pointers when accessing next.next.",
        "Discuss garbage collection of skipped nodes."
      ]
    },
    java: "public class RemoveDuplicatesSortedList {\n    public static ListNode deleteDuplicates(ListNode head) {\n        ListNode current = head;\n        while (current != null && current.next != null) {\n            if (current.val == current.next.val) {\n                current.next = current.next.next;\n            } else {\n                current = current.next;\n            }\n        }\n        return head;\n    }\n}"
  },
  "LC-80": {
    logic: {
      summary: "Remove duplicates from a sorted array such that duplicates appear at most twice.",
      approach: "Maintain a slow pointer 'i' indicating the write position. Loop through the array with a fast pointer. If the current number is greater than nums[i-2], overwrite nums[i] and increment i.",
      intuition: "Since the array is sorted, we can check if a number can be added by comparing it with the element written two steps ago.",
      pseudocode: "i = 0\nfor num in nums:\n  if i < 2 or num > nums[i-2]:\n    nums[i] = num\n    i++\nreturn i",
      dryRun: "nums = [1,1,1,2,2,3]\ni=0: add 1. i=1: add 1. i=2: num=1 == nums[0], skip.\ni=2: num=2 > nums[0](1). nums[2]=2, i=3.\ni=3: num=2 > nums[1](1). nums[3]=2, i=4.\ni=4: num=3 > nums[2](2). nums[4]=3, i=5. Return 5.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Clarify what 'in-place' modifications are allowed.",
        "Explain why checking nums[i-2] works for up to 'k' duplicates.",
        "Analyze the write pointer boundaries."
      ]
    },
    java: "public class RemoveDuplicatesSortedArrayII {\n    public static int removeDuplicates(int[] nums) {\n        int i = 0;\n        for (int num : nums) {\n            if (i < 2 || num > nums[i - 2]) {\n                nums[i] = num;\n                i++;\n            }\n        }\n        return i;\n    }\n}"
  },
  "LC-977": {
    logic: {
      summary: "Return an array of the squares of each number in sorted order.",
      approach: "Use two pointers, left at 0 and right at n-1. Compare the absolute values. Place the larger square at the end of a new result array and move the corresponding pointer.",
      intuition: "Since the input is sorted, the largest squares must reside at either the far left (highly negative) or the far right (highly positive).",
      pseudocode: "left = 0, right = n-1, p = n-1\nwhile left <= right:\n  if abs(nums[left]) > abs(nums[right]): res[p] = nums[left]^2, left++\n  else: res[p] = nums[right]^2, right--\n  p--\nreturn res",
      dryRun: "nums = [-4,-1,0,3,10]\nabs(-4) < abs(10) -> res[4] = 100, right=3.\nabs(-4) > abs(3) -> res[3] = 16, left=1.\nabs(-1) < abs(3) -> res[2] = 9, right=2.\nabs(-1) > abs(0) -> res[1] = 1, left=2.\nabs(0) == abs(0) -> res[0] = 0, right=1. Terminate.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: [
        "Explain why standard sorting takes O(n log n).",
        "Describe the two-pointer convergence.",
        "Compare space complexity with in-place sorting (if we were allowed to sort)."
      ]
    },
    java: "public class SquaresSortedArray {\n    public static int[] sortedSquares(int[] nums) {\n        int n = nums.length;\n        int[] result = new int[n];\n        int left = 0, right = n - 1;\n        for (int i = n - 1; i >= 0; i--) {\n            if (Math.abs(nums[left]) > Math.abs(nums[right])) {\n                result[i] = nums[left] * nums[left];\n                left++;\n            } else {\n                result[i] = nums[right] * nums[right];\n                right--;\n            }\n        }\n        return result;\n    }\n}"
  },
  "LC-16": {
    logic: {
      summary: "Find three integers in nums such that the sum is closest to target.",
      approach: "Sort the array. Loop through elements and use two pointers (left and right) to find sums. Update the closest sum whenever a smaller absolute difference is found.",
      intuition: "Sorting simplifies searching. For each element, a two-pointer scan handles the remaining array in linear time.",
      pseudocode: "sort(nums)\nclosest = infinity\nfor i from 0 to n-3:\n  l = i+1, r = n-1\n  while l < r:\n    sum = nums[i] + nums[l] + nums[r]\n    if abs(target - sum) < abs(target - closest): closest = sum\n    if sum < target: l++\n    else: r--\nreturn closest",
      dryRun: "nums=[-1,2,1,-4], target=1. Sorted: [-4,-1,1,2].\ni=0 (-4): l=1(-1), r=3(2). Sum=-3. Diff=4. closest=-3.\nl=2(1), r=3(2). Sum=-1. Diff=2. closest=-1.\ni=1 (-1): l=2(1), r=3(2). Sum=2. Diff=1. closest=2. Return 2.",
      time: "O(n^2)",
      space: "O(log n) or O(1) depending on sorting implementation.",
      interviewPoints: [
        "Compare with 3Sum (exact sum vs closest sum).",
        "Optimize by early exits if sum equals target.",
        "Handle potential integer overflow during differences calculation."
      ]
    },
    java: "import java.util.Arrays;\n\npublic class ThreeSumClosest {\n    public static int threeSumClosest(int[] nums, int target) {\n        Arrays.sort(nums);\n        int closestSum = nums[0] + nums[1] + nums[2];\n        for (int i = 0; i < nums.length - 2; i++) {\n            int left = i + 1;\n            int right = nums.length - 1;\n            while (left < right) {\n                int currentSum = nums[i] + nums[left] + nums[right];\n                if (Math.abs(target - currentSum) < Math.abs(target - closestSum)) {\n                    closestSum = currentSum;\n                }\n                if (currentSum < target) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        return closestSum;\n    }\n}"
  },
  "LC-713": {
    logic: {
      summary: "Count contiguous subarrays where the product of all elements is strictly less than k.",
      approach: "Use a sliding window. Maintain the product of elements. If the product becomes >= k, divide by the left element and shrink the window until product < k. Add window size to count.",
      intuition: "Each valid window ending at right adds (right - left + 1) valid subarrays to the total count.",
      pseudocode: "if k <= 1 return 0\nprod = 1, left = 0, count = 0\nfor right from 0 to n-1:\n  prod *= nums[right]\n  while prod >= k: prod /= nums[left], left++\n  count += right - left + 1\nreturn count",
      dryRun: "nums=[10,5,2,6], k=100\nr=0 (10): prod=10 < 100. count += 1 ([10]).\nr=1 (5): prod=50 < 100. count += 2 ([5], [10,5]).\nr=2 (2): prod=100 >= 100. Shrink left: prod/10=10, left=1. count += 2 ([2], [5,2]).\nr=3 (6): prod=60 < 100. count += 3 ([6], [2,6], [5,2,6]). Return 8.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Why k <= 1 returns 0 immediately (since elements are positive integers).",
        "Amortized cost of shrinking left pointer.",
        "Handling potential overflow of product (use long if constraints require)."
      ]
    },
    java: "public class SubarrayProductLessThanK {\n    public static int numSubarrayProductLessThanK(int[] nums, int k) {\n        if (k <= 1) return 0;\n        int count = 0;\n        int prod = 1;\n        int left = 0;\n        for (int right = 0; right < nums.length; right++) {\n            prod *= nums[right];\n            while (prod >= k) {\n                prod /= nums[left];\n                left++;\n            }\n            count += right - left + 1;\n        }\n        return count;\n    }\n}"
  },
  "LC-75": {
    logic: {
      summary: "Sort an array of 0s, 1s, and 2s in-place in a single pass.",
      approach: "Dutch National Flag algorithm. Maintain pointers for 0s (low), 1s (mid), and 2s (high). If nums[mid] is 0, swap with low and increment low/mid. If 2, swap with high and decrement high. If 1, increment mid.",
      intuition: "Partition the array into three sections: [0...low-1] is 0s, [low...mid-1] is 1s, and [high+1...n-1] is 2s.",
      pseudocode: "low = 0, mid = 0, high = n-1\nwhile mid <= high:\n  if nums[mid] == 0: swap(low, mid), low++, mid++\n  else if nums[mid] == 1: mid++\n  else: swap(mid, high), high--",
      dryRun: "nums=[2,0,2,1,1,0]\nlow=0, mid=0, high=5. Swap(mid, high) -> high=4. nums=[0,0,2,1,1,2]\nlow=0, mid=0. Swap(low, mid) -> low=1, mid=1. nums=[0,0,2,1,1,2]\nlow=1, mid=1. Swap(low, mid) -> low=2, mid=2. nums=[0,0,2,1,1,2]\nlow=2, mid=2. Swap(mid, high) -> high=3. nums=[0,0,1,1,2,2]\nlow=2, mid=2. nums[2]==1 -> mid=3. Terminate.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain why we don't increment mid when swapping with high.",
        "Discuss alternative two-pass counting sort.",
        "Compare with standard quicksort partitioning."
      ]
    },
    java: "public class SortColors {\n    public static void sortColors(int[] nums) {\n        int low = 0, mid = 0, high = nums.length - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) {\n                int temp = nums[low];\n                nums[low] = nums[mid];\n                nums[mid] = temp;\n                low++;\n                mid++;\n            } else if (nums[mid] == 1) {\n                mid++;\n            } else {\n                int temp = nums[high];\n                nums[high] = nums[mid];\n                nums[mid] = temp;\n                high--;\n            }\n        }\n    }\n}"
  },
  "LC-18": {
    logic: {
      summary: "Find all unique quadruplets in nums that sum up to target.",
      approach: "Sort the array. Nest two loops (i and j) to fix the first two numbers. Use a two-pointer approach (left and right) for the remaining two. Skip duplicate values at all levels to ensure uniqueness.",
      intuition: "Reduces O(n^4) brute force search to O(n^3) by sorting and applying two-pointer reduction on the inner state.",
      pseudocode: "sort(nums)\nfor i from 0 to n-4:\n  skip duplicates\n  for j from i+1 to n-3:\n    skip duplicates\n    l = j+1, r = n-1\n    while l < r:\n      sum = nums[i]+nums[j]+nums[l]+nums[r]\n      if sum == target: add to list, l++, r++, skip duplicates\n      else if sum < target: l++\n      else: r--",
      dryRun: "nums=[1,0,-1,0,-2,2], target=0. Sorted: [-2,-1,0,0,1,2]\ni=0 (-2): j=1 (-1): l=2(0), r=5(2). sum=-1 < 0. l=3(0)... matches found recursively.",
      time: "O(n^3)",
      space: "O(log n) or O(1) auxiliary space.",
      interviewPoints: [
        "How to generalize to k-Sum using recursion.",
        "Explain how sorting avoids duplicates.",
        "Handle potential integer overflow when target is large or negative."
      ]
    },
    java: "import java.util.*;\n\npublic class FourSum {\n    public static List<List<Integer>> fourSum(int[] nums, int target) {\n        List<List<Integer>> res = new ArrayList<>();\n        int n = nums.length;\n        if (n < 4) return res;\n        Arrays.sort(nums);\n        for (int i = 0; i < n - 3; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            // Overflow pruning\n            if ((long) nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;\n            if ((long) nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target) continue;\n            for (int j = i + 1; j < n - 2; j++) {\n                if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n                if ((long) nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;\n                if ((long) nums[i] + nums[j] + nums[n - 2] + nums[n - 1] < target) continue;\n                int left = j + 1, right = n - 1;\n                while (left < right) {\n                    long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];\n                    if (sum == target) {\n                        res.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));\n                        while (left < right && nums[left] == nums[left + 1]) left++;\n                        while (left < right && nums[right] == nums[right - 1]) right--;\n                        left++;\n                        right--;\n                    } else if (sum < target) {\n                        left++;\n                    } else {\n                        right--;\n                    }\n                }\n            }\n        }\n        return res;\n    }\n}"
  },
  "LC-844": {
    logic: {
      summary: "Determine if two strings are equal when both are typed into empty text editors containing backspace characters '#'.",
      approach: "Process both strings backwards. Maintain count of skips (backspaces) to ignore characters. Compare first active characters of both strings. If they mismatch, return false.",
      intuition: "Going backwards allows us to know immediately if a character will be deleted by a subsequent '#'.",
      pseudocode: "i = s.len - 1, j = t.len - 1\nwhile i >= 0 or j >= 0:\n  i = getNextValidCharIndex(s, i)\n  j = getNextValidCharIndex(t, j)\n  if i < 0 and j < 0: return true\n  if i < 0 or j < 0 or s[i] != t[j]: return false\n  i--, j--\nreturn true",
      dryRun: "s='ab#c', t='ad#c'\nBackward scan:\ns: 'c' (valid), t: 'c' (valid). Match. i=2, j=2.\ns: skip 'b' because of '#', next is 'a'. i=0.\nt: skip 'd' because of '#', next is 'a'. j=0.\ns: 'a', t: 'a'. Match. i=-1, j=-1. Return true.",
      time: "O(n + m)",
      space: "O(1)",
      interviewPoints: [
        "Compare with simple stack-based simulation which requires O(n + m) space.",
        "Discuss pointer boundary checks.",
        "Handle consecutive backspaces ('###a')."
      ]
    },
    java: "public class BackspaceStringCompare {\n    public static boolean backspaceCompare(String s, String t) {\n        int i = s.length() - 1, j = t.length() - 1;\n        int skipS = 0, skipT = 0;\n        while (i >= 0 || j >= 0) {\n            while (i >= 0) {\n                if (s.charAt(i) == '#') { skipS++; i--; }\n                else if (skipS > 0) { skipS--; i--; }\n                else break;\n            }\n            while (j >= 0) {\n                if (t.charAt(j) == '#') { skipT++; j--; }\n                else if (skipT > 0) { skipT--; j--; }\n                else break;\n            }\n            if (i >= 0 && j >= 0 && s.charAt(i) != t.charAt(j)) return false;\n            if ((i >= 0) != (j >= 0)) return false;\n            i--; j--;\n        }\n        return true;\n    }\n}"
  },
  "LC-581": {
    logic: {
      summary: "Find the length of the shortest continuous subarray that, if sorted, makes the entire array sorted.",
      approach: "Find the min value in the array that is out of order (smaller than its predecessor). Find the max value that is out of order. Find where this min and max belong in the sorted parts.",
      intuition: "An element is out of order if there is an element to its right smaller than it, or to its left larger than it.",
      pseudocode: "minVal = infinity, maxVal = -infinity\nfor i from 1 to n-1:\n  if nums[i] < nums[i-1]: minVal = min(minVal, nums[i])\nfor i from n-2 to 0:\n  if nums[i] > nums[i+1]: maxVal = max(maxVal, nums[i])\nleft = findFirstIndexGreater(minVal)\nright = findLastIndexLesser(maxVal)\nreturn right - left + 1",
      dryRun: "nums=[2,6,4,8,10,9,15]\nDip at 4 (minVal=4). Rise at 9 (maxVal=10).\n4 fits at index 1 (after 2). 10 fits at index 5 (before 15). Shortest subarray is [6,4,8,10,9], length = 5.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Compare with sorting the entire array and comparing differences: O(n log n) time, O(n) space.",
        "Discuss linear scans for monotonicity.",
        "Verify empty array or already sorted inputs."
      ]
    },
    java: "public class ShortestUnsortedSubarray {\n    public static int findUnsortedSubarray(int[] nums) {\n        int n = nums.length;\n        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;\n        boolean flag = false;\n        for (int i = 1; i < n; i++) {\n            if (nums[i] < nums[i - 1]) flag = true;\n            if (flag) min = Math.min(min, nums[i]);\n        }\n        flag = false;\n        for (int i = n - 2; i >= 0; i--) {\n            if (nums[i] > nums[i + 1]) flag = true;\n            if (flag) max = Math.max(max, nums[i]);\n        }\n        int l, r;\n        for (l = 0; l < n; l++) {\n            if (min < nums[l]) break;\n        }\n        for (r = n - 1; r >= 0; r--) {\n            if (max > nums[r]) break;\n        }\n        return r - l < 0 ? 0 : r - l + 1;\n    }\n}"
  },
  "LC-142": {
    logic: {
      summary: "Find the node where the cycle begins in a linked list. Return null if no cycle exists.",
      approach: "Floyd's Cycle-Finding Algorithm. Maintain slow and fast pointers. If they meet, reset slow to head. Move both pointers at speed 1. The node where they meet again is the start of the cycle.",
      intuition: "Let the distance from head to cycle entry be 'a', and entry to meeting point be 'b'. It mathematically proves that head to entry equals meeting point to entry.",
      pseudocode: "slow = head, fast = head\nwhile fast != null and fast.next != null:\n  slow = slow.next, fast = fast.next.next\n  if slow == fast:\n    slow = head\n    while slow != fast: slow = slow.next, fast = fast.next\n    return slow\nreturn null",
      dryRun: "3 -> 2 -> 0 -> -4 -> 2 (cycle at 2). slow & fast meet at -4. reset slow to 3. slow->2, fast->2. Met! Return node 2.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Provide mathematical proof of the algorithm.",
        "Discuss edge cases: list with 1 or 2 nodes.",
        "Explain why hashing with HashSet takes O(n) space."
      ]
    },
    java: "public class LinkedListCycleII {\n    public static ListNode detectCycle(ListNode head) {\n        if (head == null || head.next == null) return null;\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) {\n                ListNode entry = head;\n                while (entry != slow) {\n                    entry = entry.next;\n                    slow = slow.next;\n                }\n                return entry;\n            }\n        }\n        return null;\n    }\n}"
  },
  "LC-876": {
    logic: {
      summary: "Return the middle node of a singly linked list. If there are two, return the second middle.",
      approach: "Use fast and slow pointers. Advance slow by one node and fast by two nodes at each step. When fast reaches the end, slow will be at the middle.",
      intuition: "Fast travels twice as fast as slow, so slow covers half the distance in the same time.",
      pseudocode: "slow = head, fast = head\nwhile fast != null and fast.next != null:\n  slow = slow.next, fast = fast.next.next\nreturn slow",
      dryRun: "1 -> 2 -> 3 -> 4 -> 5\nInit: slow=1, fast=1\nStep 1: slow=2, fast=3\nStep 2: slow=3, fast=5. fast.next is null, terminate. Returns 3.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "How to handle lists of odd vs even length.",
        "Show how it scales for finding k-th fraction node.",
        "Explain pointer safety checks."
      ]
    },
    java: "public class MiddleOfLinkedList {\n    public static ListNode middleNode(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        return slow;\n    }\n}"
  },
  "LC-234": {
    logic: {
      summary: "Check if a singly linked list is a palindrome.",
      approach: "Find the middle of the list using fast/slow pointers. Reverse the second half of the list. Compare the first and second halves. Restore the list to its original state (optional).",
      intuition: "Comparing values from the center outwards requires constant memory if we modify list pointers in-place.",
      pseudocode: "mid = findMiddle(head)\nhead2 = reverse(mid)\np1 = head, p2 = head2\nwhile p2 != null:\n  if p1.val != p2.val: return false\n  p1 = p1.next, p2 = p2.next\nreturn true",
      dryRun: "1 -> 2 -> 2 -> 1. Middle is second 2. Reversed second half: 1 -> 2. Compare 1->2->... with 1->2. All match. Return true.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Discuss O(n) space recursion vs in-place reversal.",
        "Explain why list restoration is good practice in interviews.",
        "Confirm if empty lists are palindromes."
      ]
    },
    java: "public class PalindromeLinkedList {\n    public static boolean isPalindrome(ListNode head) {\n        if (head == null || head.next == null) return true;\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        ListNode prev = null, curr = slow;\n        while (curr != null) {\n            ListNode temp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = temp;\n        }\n        ListNode p1 = head, p2 = prev;\n        while (p2 != null) {\n            if (p1.val != p2.val) return false;\n            p1 = p1.next;\n            p2 = p2.next;\n        }\n        return true;\n    }\n}"
  },
  "LC-457": {
    logic: {
      summary: "Determine if there is a cycle in a circular array with positive (forward) and negative (backward) moves.",
      approach: "Apply slow/fast pointer cycle detection from each index. Ensure cycle consists of more than 1 node and is unidirectional (no direction changes during iteration). Mark visited elements to optimize time.",
      intuition: "Elements in a cycle must move in a single direction and not consist of a self-loop (1 element).",
      pseudocode: "for i from 0 to n-1:\n  if nums[i] == 0: continue\n  slow = i, fast = i\n  while directionMatches:\n    slow = getNext(slow)\n    fast = getNext(getNext(fast))\n    if slow == fast:\n      if slow == getNext(slow): break (self-loop)\n      return true\n  markPathVisited(i)\nreturn false",
      dryRun: "nums=[2,-1,1,2,2]. Scan index 0: moves forward. Cycle detected: [0, 2, 3...]. Return true.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain index wrapping logic (modulo operator).",
        "Prune the search by setting visited indices to 0.",
        "Describe condition checking for direction mismatch."
      ]
    },
    java: "public class CircularArrayLoop {\n    public static boolean circularArrayLoop(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            if (nums[i] == 0) continue;\n            int slow = i, fast = i;\n            boolean isForward = nums[i] > 0;\n            while (true) {\n                slow = getNext(nums, slow, isForward);\n                if (slow == -1) break;\n                fast = getNext(nums, fast, isForward);\n                if (fast == -1) break;\n                fast = getNext(nums, fast, isForward);\n                if (fast == -1) break;\n                if (slow == fast) {\n                    if (slow == getNext(nums, slow, isForward)) break; // self loop\n                    return true;\n                }\n            }\n            int curr = i;\n            while (getNext(nums, curr, isForward) != -1) {\n                int next = getNext(nums, curr, isForward);\n                nums[curr] = 0;\n                curr = next;\n            }\n        }\n        return false;\n    }\n    private static int getNext(int[] nums, int curr, boolean isForward) {\n        int n = nums.length;\n        boolean direction = nums[curr] > 0;\n        if (direction != isForward) return -1;\n        int next = (curr + nums[curr]) % n;\n        if (next < 0) next += n;\n        return next;\n    }\n}"
  },
  "LC-209": {
    logic: {
      summary: "Find the minimal length of a contiguous subarray of which the sum is >= target.",
      approach: "Use a sliding window. Add elements to sum. While sum >= target, update the min length and subtract the left element from sum, incrementing left.",
      intuition: "Instead of recalculating sums, slide the window rightwards to find valid subarrays and shrink to find the minimal width.",
      pseudocode: "left = 0, sum = 0, minLen = infinity\nfor right from 0 to n-1:\n  sum += nums[right]\n  while sum >= target:\n    minLen = min(minLen, right - left + 1)\n    sum -= nums[left++]\nreturn minLen == infinity ? 0 : minLen",
      dryRun: "target=7, nums=[2,3,1,2,4,3]\nr=0: sum=2. r=1: sum=5. r=2: sum=6. r=3: sum=8 >= 7 -> minLen=4, sum=6, left=1.\nr=4: sum=10 >= 7 -> minLen=4, sum=7, left=2 -> minLen=3, sum=4, left=3.\nr=5: sum=7 >= 7 -> minLen=3, sum=5, left=4 -> minLen=2, sum=3, left=5. Return 2.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Compare with O(n log n) binary search solution.",
        "Handle all elements being smaller than target.",
        "Explain the amortized O(1) step count of the left pointer."
      ]
    },
    java: "public class MinimumSizeSubarraySum {\n    public static int minSubArrayLen(int target, int[] nums) {\n        int left = 0, sum = 0;\n        int minLen = Integer.MAX_VALUE;\n        for (int right = 0; right < nums.length; right++) {\n            sum += nums[right];\n            while (sum >= target) {\n                minLen = Math.min(minLen, right - left + 1);\n                sum -= nums[left];\n                left++;\n            }\n        }\n        return minLen == Integer.MAX_VALUE ? 0 : minLen;\n    }\n}"
  }
};
