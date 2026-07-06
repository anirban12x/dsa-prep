import type { QuestionLogic } from "../types";

export const OTHER_SOLUTIONS: Record<string, { logic: QuestionLogic; java: string }> = {
  "LC-206": {
    logic: {
      summary: "Reverse a singly linked list.",
      approach: "Iterative two-pointer approach: maintain `curr`, `prev` (initially null), and `next`. Swap pointers step-by-step as you traverse the list.",
      intuition: "For each node, we change its `next` pointer to point to its predecessor (`prev`).",
      pseudocode: "prev = null, curr = head\nwhile curr != null:\n  nextTemp = curr.next\n  curr.next = prev\n  prev = curr\n  curr = nextTemp\nreturn prev",
      dryRun: "List: 1 -> 2 -> 3\ncurr=1: nextTemp=2. curr.next=null. prev=1. curr=2.\ncurr=2: nextTemp=3. curr.next=1. prev=2. curr=3.\ncurr=3: nextTemp=null. curr.next=2. prev=3. curr=null. Returns prev (3 -> 2 -> 1).",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Compare iterative and recursive solutions.", "How to handle a list with 0 or 1 nodes (base cases)."]
    },
    java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class ReverseLinkedList {
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        ListNode rev = reverseList(head);
        System.out.println("Reversed head: " + rev.val);
    }
}`
  },
  "LC-141": {
    logic: {
      summary: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
      approach: "Floyd's Cycle-Finding Algorithm (Tortoise and Hare): maintain two pointers, slow (moves 1 step) and fast (moves 2 steps). If they meet, there is a cycle.",
      intuition: "If there's a cycle, the fast pointer will eventually lap the slow pointer, similar to two runners on a circular track.",
      pseudocode: "slow = head, fast = head\nwhile fast != null and fast.next != null:\n  slow = slow.next\n  fast = fast.next.next\n  if slow == fast return true\nreturn false",
      dryRun: "List with cycle. slow at 1, fast at 1. slow->2, fast->3. slow->3, fast->2. slow->4, fast->4. Met! Returns true.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Why fast moves by 2 instead of 3 or more (moves by 2 guarantees meeting without skipping if a cycle exists).", "Compare with HashSet approach: O(n) space."]
    },
    java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class LinkedListCycle {
    public static boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(3);
        ListNode node2 = new ListNode(2);
        head.next = node2;
        node2.next = new ListNode(0);
        node2.next.next = node2; // cycle back to node2
        System.out.println("Has cycle? " + hasCycle(head)); // true
    }
}`
  },
  "LC-21": {
    logic: {
      summary: "Merge two sorted linked lists and return it as a sorted list.",
      approach: "Iteration using a dummy node. Compare values of current nodes of both lists, attach the smaller node to merged list, and advance the corresponding pointer.",
      intuition: "Standard two-pointer merge from merge sort, modified for linked list pointers. Dummy node simplifies head node handling.",
      pseudocode: "dummy = Node(0), curr = dummy\nwhile l1 != null and l2 != null:\n  if l1.val <= l2.val: curr.next = l1, l1 = l1.next\n  else: curr.next = l2, l2 = l2.next\n  curr = curr.next\ncurr.next = l1 != null ? l1 : l2\nreturn dummy.next",
      dryRun: "l1 = [1,2,4], l2 = [1,3,4]\nCompare 1 & 1 -> attach l1's 1. Compare l1's 2 & l2's 1 -> attach l2's 1. Returns [1, 1, 2, 3, 4, 4].",
      time: "O(n + m)",
      space: "O(1)",
      interviewPoints: ["Discuss recursive solution: elegant but uses O(n + m) stack space.", "Why is a dummy node useful here? (Avoids null checks when inserting the first element)."]
    },
    java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class MergeSortedLists {
    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                curr.next = list1;
                list1 = list1.next;
            } else {
                curr.next = list2;
                list2 = list2.next;
            }
            curr = curr.next;
        }
        curr.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }

    public static void main(String[] args) {
        ListNode l1 = new ListNode(1); l1.next = new ListNode(3);
        ListNode l2 = new ListNode(2); l2.next = new ListNode(4);
        ListNode merged = mergeTwoLists(l1, l2);
        System.out.println("Merged head: " + merged.val + " -> " + merged.next.val);
    }
}`
  },
  "LC-78": {
    logic: {
      summary: "Given an integer array nums of unique elements, return all possible subsets (the power set).",
      approach: "Backtracking (DFS). At each index, decide whether to include the element in the subset or exclude it, then recurse.",
      intuition: "For each element, we have a binary choice: yes/no. Total subsets will be 2^N.",
      pseudocode: "res = []\nbacktrack(index, currSubset):\n  if index == nums.length: res.add(currSubset); return\n  // Option 1: Include nums[index]\n  currSubset.add(nums[index])\n  backtrack(index + 1, currSubset)\n  // Option 2: Exclude nums[index]\n  currSubset.removeLast()\n  backtrack(index + 1, currSubset)",
      dryRun: "nums = [1, 2]\nbacktrack(0, []) -> includes 1 -> backtrack(1, [1]) -> includes 2 -> backtrack(2, [1, 2]) -> add [1,2]. Excludes 2 -> backtrack(2, [1]) -> add [1]. Backtracks...",
      time: "O(N * 2^N) to generate all subsets and copy them into output list",
      space: "O(N) recursion stack",
      interviewPoints: ["Explain time complexity (2^N subsets, N elements in each).", "Show iterative approach using bit manipulation (bitmasking)."]
    },
    java: `import java.util.*;

public class Subsets {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), nums, 0);
        return res;
    }

    private static void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] nums, int start) {
        list.add(new ArrayList<>(tempList));
        for (int i = start; i < nums.length; i++) {
            tempList.add(nums[i]);
            backtrack(list, tempList, nums, i + 1);
            tempList.remove(tempList.size() - 1);
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        System.out.println("Subsets: " + subsets(nums));
    }
}`
  },
  "TCS-S01": {
    logic: {
      summary: "Implement Bubble Sort algorithm to sort an array.",
      approach: "Iteratively step through the list, compare adjacent elements, and swap them if they are in the wrong order. Repeat until no swaps are needed.",
      intuition: "Larger elements bubble up to the end of the array after each pass.",
      pseudocode: "for i from 0 to n-1:\n  swapped = false\n  for j from 0 to n-i-2:\n    if arr[j] > arr[j+1]: swap, swapped = true\n  if not swapped break",
      dryRun: "[5, 1, 4] -> pass 1: swap 5 & 1 -> [1, 5, 4] -> swap 5 & 4 -> [1, 4, 5]. Sorted. Returns [1, 4, 5].",
      time: "O(n^2) worst/average, O(n) best (sorted array with swapped optimization)",
      space: "O(1)",
      interviewPoints: ["Explain the 'swapped' optimization for O(n) best-case.", "Is Bubble Sort stable? Yes, because we only swap strictly greater elements."]
    },
    java: `import java.util.*;

public class BubbleSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        sort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
        sc.close();
    }
}`
  }
};
