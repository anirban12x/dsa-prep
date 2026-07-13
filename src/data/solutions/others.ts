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
  },
  "LC-295": {
    logic: {
      summary: "Find the median of a running stream of numbers.",
      approach: "Two Heaps. Maintain a MaxHeap for the smaller half of the numbers, and a MinHeap for the larger half. Keep the heaps balanced: size difference <= 1.",
      intuition: "The median divides data into two equal halves. MaxHeap's top gives the largest of the lower half, and MinHeap's top gives the smallest of the upper half.",
      pseudocode: "maxHeap = MaxHeap(), minHeap = MinHeap()\naddNum(num):\n  maxHeap.push(num)\n  minHeap.push(maxHeap.pop())\n  if minHeap.size > maxHeap.size: maxHeap.push(minHeap.pop())\nfindMedian():\n  if maxHeap.size > minHeap.size return maxHeap.peek()\n  else return (maxHeap.peek() + minHeap.peek()) / 2.0",
      dryRun: "add 1: maxHeap=[1], minHeap=[]\nadd 2: maxHeap=[1], minHeap=[2]\nadd 3: maxHeap=[2, 1], minHeap=[3]. Median = 2.",
      time: "addNum: O(log n), findMedian: O(1)",
      space: "O(n) to store numbers",
      interviewPoints: [
        "Explain heap balancing operations.",
        "What if 99% of numbers are in range [0, 100]? (use bucket sorting / frequency array).",
        "What if we only need approximate median? (use reservoir sampling)."
      ]
    },
    java: `import java.util.*;

public class MedianFinder {
    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());
    private PriorityQueue<Integer> large = new PriorityQueue<>();

    public void addNum(int num) {
        small.add(num);
        large.add(small.poll());
        if (large.size() > small.size()) {
            small.add(large.poll());
        }
    }

    public double findMedian() {
        if (small.size() > large.size()) {
            return small.peek();
        }
        return (small.peek() + large.peek()) / 2.0;
    }
}`
  },
  "LC-502": {
    logic: {
      summary: "Maximize total capital after selecting at most k projects under capital constraints.",
      approach: "Greedy + Heap. Sort projects by required capital. Push profits of all projects we can afford into a MaxHeap. Pop the most profitable project and add its profit to capital. Repeat k times.",
      intuition: "At any step, we should greedily pick the most profitable project among those we can afford to maximize our capital for future projects.",
      pseudocode: "sort(projects by capital)\nheap = MaxHeap()\nfor k times:\n  push all affordable project profits to heap\n  if heap empty break\n  capital += heap.pop()\nreturn capital",
      dryRun: "k=2, w=0, profits=[1,2,3], capital=[0,1,1]\nSorted projects: [(0, profit 1), (1, profit 2), (1, profit 3)]\nk=1: afford cap 0 -> heap=[1] -> cap=0+1=1\nk=2: afford cap 1 -> add profit 2, 3 -> heap=[3, 2] -> cap=1+3=4. Returns 4.",
      time: "O(n log n)",
      space: "O(n)",
      interviewPoints: [
        "Why is the greedy choice optimal here?",
        "What happens if k is larger than the number of projects?",
        "Discuss space complexity."
      ]
    },
    java: `import java.util.*;

public class IPO {
    public static int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = profits.length;
        int[][] projects = new int[n][2];
        for (int i = 0; i < n; i++) {
            projects[i][0] = capital[i];
            projects[i][1] = profits[i];
        }
        Arrays.sort(projects, (a, b) -> Integer.compare(a[0], b[0]));
        
        PriorityQueue<Integer> maxProfitHeap = new PriorityQueue<>(Collections.reverseOrder());
        int idx = 0;
        for (int i = 0; i < k; i++) {
            while (idx < n && projects[idx][0] <= w) {
                maxProfitHeap.add(projects[idx][1]);
                idx++;
            }
            if (maxProfitHeap.isEmpty()) break;
            w += maxProfitHeap.poll();
        }
        return w;
    }
}`
  },
  "LC-871": {
    logic: {
      summary: "Find the minimum number of refueling stops to reach a destination.",
      approach: "Greedy + Heap. Drive as far as current fuel allows. Push all passed gas station capacities into a MaxHeap. If out of fuel, pop the largest capacity, refuel, increment stops, and repeat.",
      intuition: "Always delay refueling until absolutely necessary, and when refueling, greedily choose the station that offers the maximum fuel.",
      pseudocode: "heap = MaxHeap(), stations.add(target, 0)\nfor station in stations:\n  fuel -= distance\n  while fuel < 0:\n    if heap empty return -1\n    fuel += heap.pop(), stops++\n  heap.push(station.capacity)\nreturn stops",
      dryRun: "target=100, startFuel=10, stations=[[10,60],[20,30],[30,30],[60,40]]\nReach st 0 (dist 10, fuel left 0). Push 60.\nReach st 1 (dist 20, need 10 fuel). out of fuel! pop 60 -> stops=1, fuel=50. Push 30.\nReach st 2 (dist 30, fuel 40). Push 30.\nReach st 3 (dist 60, fuel 10). Push 40.\nReach target (dist 100, need 40 fuel). out of fuel! pop 40 -> stops=2, fuel=10. Return 2.",
      time: "O(n log n)",
      space: "O(n)",
      interviewPoints: [
        "Why is it correct to sort stations by distance?",
        "Compare with dynamic programming O(n^2) solution.",
        "Handle cases where target cannot be reached."
      ]
    },
    java: `import java.util.*;

public class MinRefuelStops {
    public static int minRefuelStops(int target, int startFuel, int[][] stations) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        int stops = 0;
        int i = 0, n = stations.length;
        int currentFuel = startFuel;
        int position = 0;
        
        while (position + currentFuel < target) {
            if (i < n && stations[i][0] <= position + currentFuel) {
                maxHeap.add(stations[i][1]);
                currentFuel -= (stations[i][0] - position);
                position = stations[i][0];
                i++;
            } else {
                if (maxHeap.isEmpty()) return -1;
                currentFuel += maxHeap.poll();
                stops++;
            }
        }
        return stops;
    }
}`
  },
  "LC-630": {
    logic: {
      summary: "Determine the maximum number of courses you can take given their durations and deadlines.",
      approach: "Greedy + Heap. Sort courses by deadline. For each course, add its duration to the total time and push it into a MaxHeap. If total time exceeds deadline, remove the course with the longest duration.",
      intuition: "Replacing a longer course with a shorter one while keeping the same deadline is always optimal because it frees up time for subsequent courses.",
      pseudocode: "sort(courses by deadline)\nheap = MaxHeap(), totalTime = 0\nfor c in courses:\n  totalTime += c.duration, heap.push(c.duration)\n  if totalTime > c.deadline:\n    totalTime -= heap.pop()\nreturn heap.size",
      dryRun: "courses=[[100,200],[200,1300],[1000,1250],[2000,3200]]\nSorted: [[100,200],[1000,1250],[2000,3200],[200,1300]] -> wait, sorted by deadline:\n[[100,200],[1000,1250],[200,1300],[2000,3200]]\nc1: time=100. heap=[100]\nc2: time=1100. heap=[1000, 100]\nc3: time=1300. heap=[1000, 200, 100]. time<=1300 -> valid.\nc4: time=3300 > 3200 -> pop 2000 -> time=1300. heap=[1000, 200, 100]. Returns 3.",
      time: "O(n log n)",
      space: "O(n)",
      interviewPoints: [
        "Prove why sorting by deadline (Earliest Deadline First) is correct.",
        "Why is it optimal to swap the maximum duration course when overloaded?",
        "Compare with recursive backtracking."
      ]
    },
    java: `import java.util.*;

public class CourseScheduleIII {
    public static int scheduleCourse(int[][] courses) {
        Arrays.sort(courses, (a, b) -> Integer.compare(a[1], b[1]));
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        int time = 0;
        for (int[] c : courses) {
            time += c[0];
            maxHeap.add(c[0]);
            if (time > c[1]) {
                time -= maxHeap.poll();
            }
        }
        return maxHeap.size();
    }
}`
  },
  "LC-25": {
    logic: {
      summary: "Reverse nodes of a linked list k at a time and return its modified list.",
      approach: "Check if there are k nodes remaining. If not, return the head as is. If yes, reverse these k nodes, then recursively connect the tail to the reversed result of the next k nodes.",
      intuition: "Divide and Conquer. Reversing a small section is standard pointer swapping. Recursion handles stitching subproblems.",
      pseudocode: "count = 0, curr = head\nwhile curr and count < k: curr = curr.next, count++\nif count == k:\n  reversedHead = reverseFirstK(head)\n  head.next = reverseKGroup(curr, k)\n  return reversedHead\nreturn head",
      dryRun: "list: 1->2->3->4->5, k=2\nfirst group [1,2] -> reversed: 2->1. 1's next is reverseKGroup(3, 2).\nsecond group [3,4] -> reversed: 4->3. 3's next is reverseKGroup(5, 2).\nremaining [5] < 2 -> returns 5. Final: 2->1->4->3->5.",
      time: "O(n)",
      space: "O(n/k) recursion stack space",
      interviewPoints: [
        "Explain iterative solution for O(1) space.",
        "Confirm that remaining nodes should not be reversed if length < k.",
        "Discuss pointer updates at boundaries."
      ]
    },
    java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class ReverseKGroup {
    public static ListNode reverseKGroup(ListNode head, int k) {
        ListNode curr = head;
        int count = 0;
        while (curr != null && count < k) {
            curr = curr.next;
            count++;
        }
        if (count == k) {
            curr = reverseKGroup(curr, k); // Reverse next parts first
            while (count-- > 0) {
                ListNode temp = head.next;
                head.next = curr;
                curr = head;
                head = temp;
            }
            head = curr;
        }
        return head;
    }
}`
  },
  "LC-92": {
    logic: {
      summary: "Reverse a portion of a linked list between positions left and right.",
      approach: "Dummy node setup. Skip first left-1 nodes. Maintain `prev` and `curr`. Swap node links sequentially (right - left) times to insert each node at the beginning of the subsegment.",
      intuition: "In-place insertion. Instead of reversing the sublist separately, slide nodes one-by-one to the start of the sublist segment.",
      pseudocode: "dummy = Node(0, head), pre = dummy\nfor i in left-1: pre = pre.next\nstart = pre.next, then = start.next\nfor i in right-left:\n  start.next = then.next\n  then.next = pre.next\n  pre.next = then\n  then = start.next\nreturn dummy.next",
      dryRun: "1->2->3->4->5, left=2, right=4\npre=1, start=2, then=3\nStep 1: 1->3->2->4->5, then=4\nStep 2: 1->4->3->2->5. Done. Returns 1->4->3->2->5.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain benefit of using a dummy node (handles edge cases where left=1).",
        "Trace pointer values after swaps.",
        "Discuss single-pass vs double-pass options."
      ]
    },
    java: `public class ReverseLinkedListII {
    public static ListNode reverseBetween(ListNode head, int left, int right) {
        if (head == null) return null;
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        for (int i = 0; i < left - 1; i++) {
            pre = pre.next;
        }
        ListNode start = pre.next;
        ListNode then = start.next;
        for (int i = 0; i < right - left; i++) {
            start.next = then.next;
            then.next = pre.next;
            pre.next = then;
            then = start.next;
        }
        return dummy.next;
    }
}`
  },
  "LC-24": {
    logic: {
      summary: "Swap every two adjacent nodes in a linked list.",
      approach: "Recursive or iterative approach. Swap first two nodes, recursively call swap on the rest of the list, and point the swapped second node's next to the recursion result.",
      intuition: "Pairwise reversal. The second node becomes the new head of the pair, and the first node connects to the next pair's result.",
      pseudocode: "if head is null or head.next is null return head\nfirst = head, second = head.next\nfirst.next = swapPairs(second.next)\nsecond.next = first\nreturn second",
      dryRun: "1->2->3->4\nfirst=1, second=2. 1's next is swapPairs(3)->4->3.\n2's next is 1. Returns 2->1->4->3.",
      time: "O(n)",
      space: "O(n) recursion stack space",
      interviewPoints: [
        "Discuss iterative implementation using a dummy node for O(1) auxiliary space.",
        "Why we cannot swap values (violates typical interviewer constraints).",
        "Consider lists with odd number of nodes."
      ]
    },
    java: `public class SwapNodesPairs {
    public static ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode first = head;
        ListNode second = head.next;
        first.next = swapPairs(second.next);
        second.next = first;
        return second;
    }
}`
  },
  "LC-61": {
    logic: {
      summary: "Rotate the linked list to the right by k places.",
      approach: "Find the length of the list and connect the tail to the head to form a loop. Move length - (k % length) - 1 steps from head, cut the loop, and return the new head.",
      intuition: "Rotating by k is equivalent to moving the split boundary. Connecting tail to head avoids resetting links.",
      pseudocode: "len = 1, curr = head\nwhile curr.next: curr = curr.next, len++\ncurr.next = head (close circle)\nk = k % len\nfor i in len - k - 1: head = head.next\nnewHead = head.next\nhead.next = null\nreturn newHead",
      dryRun: "1->2->3->4->5, k=2. len=5. tail=5 connected to 1. circle: 1->2->3->4->5->1.\nmove 5 - 2 - 1 = 2 steps from head (ends at node 3).\nnewHead = 3.next = 4. 3's next becomes null. Returns 4->5->1->2->3.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Why is modulo `k % length` necessary? (optimizes cases where k > length).",
        "What happens if k is 0 or list is empty? (safety checks).",
        "Explain split pointer cut boundary."
      ]
    },
    java: `public class RotateList {
    public static ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        ListNode curr = head;
        int len = 1;
        while (curr.next != null) {
            curr = curr.next;
            len++;
        }
        curr.next = head; // Connect to form circle
        k = k % len;
        int stepsToNewTail = len - k;
        for (int i = 0; i < stepsToNewTail; i++) {
            curr = curr.next;
        }
        head = curr.next;
        curr.next = null; // Cut circle
        return head;
    }
}`
  },
  "LC-143": {
    logic: {
      summary: "Reorder a linked list to alternate first and last elements in-place.",
      approach: "Find the middle of the list. Split the list into two halves. Reverse the second half. Interleave/merge the first and second halves.",
      intuition: "To alternate start/end nodes, we need to traverse forward in the first half and backward in the second half. Reversing the second half enables linear interleaving.",
      pseudocode: "mid = findMiddle(head)\nh1 = head, h2 = reverse(mid.next)\nmid.next = null\nwhile h2:\n  temp1 = h1.next, temp2 = h2.next\n  h1.next = h2, h2.next = temp1\n  h1 = temp1, h2 = temp2",
      dryRun: "1->2->3->4. mid=2. Split: 1->2 and 3->4.\nReverse second half: 4->3.\nInterleave: 1 -> 4 -> 2 -> 3.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Explain how to find the middle using fast and slow pointers.",
        "Trace step-by-step pointers during list stitching.",
        "Verify odd vs even length lists."
      ]
    },
    java: `public class ReorderList {
    public static void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        
        // 1. Find middle
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // 2. Reverse second half
        ListNode prev = null, curr = slow.next;
        slow.next = null; // Cut list in half
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        
        // 3. Interleave
        ListNode first = head, second = prev;
        while (second != null) {
            ListNode t1 = first.next;
            ListNode t2 = second.next;
            first.next = second;
            second.next = t1;
            first = t1;
            second = t2;
        }
    }
}`
  },
  "LC-19": {
    logic: {
      summary: "Remove the nth node from the end of a linked list.",
      approach: "Two Pointers (Fast & Slow). Advance the fast pointer by n+1 steps. Then move both fast and slow pointers in unison until the fast pointer reaches null. The slow pointer will be positioned just before the target node to delete.",
      intuition: "Maintaining a gap of n nodes between fast and slow pointers allows single-pass identification of the target offset.",
      pseudocode: "dummy = Node(0), dummy.next = head\nfast = dummy, slow = dummy\nfor i from 1 to n+1: fast = fast.next\nwhile fast:\n  fast = fast.next, slow = slow.next\nslow.next = slow.next.next\nreturn dummy.next",
      dryRun: "list=[1,2,3,4,5], n=2\ndummy->1->2->3->4->5. fast advances 3 steps to node 3. slow at dummy.\nstep 1: fast=4, slow=1.\nstep 2: fast=5, slow=2.\nstep 3: fast=null, slow=3. Loop ends. slow.next=slow.next.next (removes 4). Returns 1->2->3->5.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Why is a dummy node necessary? (Handles edge cases where head itself needs deletion).",
        "Can this be solved recursively? Yes, but recursive stack takes O(n) space.",
        "Verify boundaries."
      ]
    },
    java: `public class RemoveNthFromEnd {
    public static ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy;
        ListNode slow = dummy;
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`
  },
  "LC-138": {
    logic: {
      summary: "Clone a linked list where each node contains an additional random pointer.",
      approach: "In-place Interleaving. 1) Create duplicates of nodes and insert them immediately after their originals (A -> A' -> B -> B'). 2) Assign random pointers for duplicates: `A'.random = A.random.next`. 3) Separate the interleaved lists.",
      intuition: "Interleaving places the original and clone nodes adjacent to each other, allowing us to find random counterparts in O(1) auxiliary space.",
      pseudocode: "curr = head\nwhile curr:\n  next = curr.next, curr.next = Node(curr.val), curr.next.next = next, curr = next\ncurr = head\nwhile curr:\n  if curr.random: curr.next.random = curr.random.next\n  curr = curr.next.next\ncurr = head, dummy = Node(0), copy = dummy\nwhile curr:\n  next = curr.next.next, copy.next = curr.next, copy = copy.next, curr.next = next, curr = next\nreturn dummy.next",
      dryRun: "list A(random B) -> B(random null). Interleaved: A -> A' -> B -> B'.\nSet randoms: A'.random = A.random.next = B.next = B'. Separated: A -> B and A' -> B'. Correct.",
      time: "O(n)",
      space: "O(1) auxiliary space",
      interviewPoints: [
        "Compare with HashMap approach: HashMap takes O(n) space, interleaving takes O(1) space.",
        "Ensure we cleanly restore original list pointers before returning (failure to do so violates input immutability).",
        "Handle null random references."
      ]
    },
    java: `public class CopyListRandomPointer {
    static class Node {
        int val;
        Node next, random;
        Node(int val) { this.val = val; }
    }
    public static Node copyRandomList(Node head) {
        if (head == null) return null;
        Node curr = head;
        while (curr != null) {
            Node next = curr.next;
            Node copy = new Node(curr.val);
            curr.next = copy;
            copy.next = next;
            curr = next;
        }
        
        curr = head;
        while (curr != null) {
            if (curr.random != null) {
                curr.next.random = curr.random.next;
            }
            curr = curr.next.next;
        }
        
        curr = head;
        Node dummy = new Node(0);
        Node copyCurr = dummy;
        while (curr != null) {
            Node next = curr.next.next;
            copyCurr.next = curr.next;
            copyCurr = copyCurr.next;
            curr.next = next;
            curr = next;
        }
        return dummy.next;
    }
}`
  },
  "LC-146": {
    logic: {
      summary: "Design a Least Recently Used (LRU) Cache.",
      approach: "Doubly Linked List + HashMap. Map key to Node to achieve O(1) lookup. Doubly Linked List tracks order of access (recently accessed at head, oldest at tail) to achieve O(1) insertions/deletions.",
      intuition: "HashMap provides instant access; DLL provides instant ordering updates. Combining both enables O(1) cache updates.",
      pseudocode: "get(key):\n  if key not in map return -1\n  node = map[key]\n  moveToHead(node)\n  return node.val\n\nput(key, val):\n  if key in map:\n    node = map[key], node.val = val\n    moveToHead(node)\n  else:\n    if size == capacity:\n      remove(tail.prev)\n    addAtHead(Node(key, val))",
      dryRun: "capacity=2. put(1,10) -> map={1:Node(1)}, DLL=head<->Node(1)<->tail.\nput(2,20) -> map={1:Node(1), 2:Node(2)}, DLL=head<->Node(2)<->Node(1)<->tail.\nget(1) -> returns 10, DLL=head<->Node(1)<->Node(2)<->tail.\nput(3,30) -> evicts Node(2). map={1:Node(1), 3:Node(3)}.",
      time: "O(1) for both get and put operations",
      space: "O(capacity) storage size",
      interviewPoints: [
        "Why Doubly Linked List instead of Singly Linked List? (DLL allows deleting a node in O(1) time without traversing to find its predecessor).",
        "Why use dummy head and tail nodes? (Simplifies boundary conditions, preventing null pointer checks).",
        "How to handle thread safety in production? (Use synchronized block or ReentrantLock)."
      ]
    },
    java: `import java.util.*;

public class LRUCache {
    static class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }
    
    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insertAtHead(node);
        return node.val;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.val = value;
            remove(node);
            insertAtHead(node);
        } else {
            if (map.size() == capacity) {
                map.remove(tail.prev.key);
                remove(tail.prev);
            }
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            insertAtHead(newNode);
        }
    }
    
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void insertAtHead(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }
}`
  },
  "LC-150": {
    logic: {
      summary: "Evaluate the value of an arithmetic expression in Reverse Polish Notation.",
      approach: "Stack. Loop through tokens. If token is a number, push to stack. If it is an operator, pop two elements, apply the operator, and push the result back.",
      intuition: "RPN expressions place operators after operands, which maps naturally to a stack's Last-In-First-Out behavior.",
      pseudocode: "stack = []\nfor token in tokens:\n  if token in operators:\n    b = stack.pop(), a = stack.pop()\n    stack.push(eval(a, b, token))\n  else stack.push(parseInt(token))\nreturn stack.pop()",
      dryRun: "tokens=['2','1','+','3','*']\nt=2: push 2. t=1: push 1. t=+: pop 1, 2. push 2+1=3. stack=[3].\nt=3: push 3. stack=[3,3]. t=*: pop 3, 3. push 3*3=9. Returns 9.",
      time: "O(n)",
      space: "O(n) for stack storage",
      interviewPoints: [
        "Be careful with operand division order: the second popped operand is the divisor (i.e. `a / b`, where b is popped first, then a).",
        "Why is recursive RPN parser O(1) space not possible without input mutation?",
        "Discuss switch expression syntax in Java."
      ]
    },
    java: `import java.util.*;

public class EvaluateRPN {
    public static int evalRPN(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String t : tokens) {
            if (t.equals("+") || t.equals("-") || t.equals("*") || t.equals("/")) {
                int b = stack.pop();
                int a = stack.pop();
                if (t.equals("+")) stack.push(a + b);
                else if (t.equals("-")) stack.push(a - b);
                else if (t.equals("*")) stack.push(a * b);
                else stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`
  },
  "LC-155": {
    logic: {
      summary: "Design a stack that supports retrieving the minimum element in constant time.",
      approach: "Two Stacks. Maintain an actual value stack `st` and a helper minimum stack `minSt`. When pushing value val, push `min(val, minSt.peek())` to `minSt`. When popping, pop both.",
      intuition: "Tracking the minimum value at each stack frame size ensures that constant-time retrieval survives pops.",
      pseudocode: "push(val):\n  st.push(val)\n  minSt.push(minSt.isEmpty() ? val : min(val, minSt.peek()))\npop():\n  st.pop(), minSt.pop()\ntop(): return st.peek()\ngetMin(): return minSt.peek()",
      dryRun: "push(2) -> st=[2], minSt=[2]\npush(3) -> st=[2,3], minSt=[2,2]\npush(1) -> st=[2,3,1], minSt=[2,2,1]. getMin() = 1.\npop() -> st=[2,3], minSt=[2,2]. getMin() = 2.",
      time: "O(1) for all operations",
      space: "O(n) auxiliary space for min stack",
      interviewPoints: [
        "Explain O(1) auxiliary space alternative (store differences `val - min` in a single stack).",
        "Compare memory footprints of both solutions.",
        "Ensure we handle empty stack conditions."
      ]
    },
    java: `import java.util.*;

public class MinStack {
    private final Deque<Integer> stack;
    private final Deque<Integer> minStack;

    public MinStack() {
        stack = new ArrayDeque<>();
        minStack = new ArrayDeque<>();
    }
    
    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }
    
    public void pop() {
        stack.pop();
        minStack.pop();
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        return minStack.peek();
    }
}`
  },
  "LC-355": {
    logic: {
      summary: "Design a simplified version of Twitter.",
      approach: "HashMaps + Max-Heap. Maintain user follows in `Map<UserId, Set<FolloweeId>>`. Maintain user tweets in `Map<UserId, List<Tweet>>` where each tweet has a global timestamp. To fetch feed: gather latest tweets from user and all their followees, push them to a Max-Heap ordered by timestamp, and extract top 10.",
      intuition: "Dynamic feed merging. PriorityQueue merges multiple sorted streams of tweets (each user's timeline) optimally in logarithmic time.",
      pseudocode: "postTweet(u, tId): tweets[u].add(Tweet(tId, timestamp++))\nfollow(u, f): followers[u].add(f)\nunfollow(u, f): followers[u].remove(f)\ngetNewsFeed(u):\n  pq = MaxHeap(compare by timestamp)\n  for f in followers[u] + u:\n    pq.addAll(tweets[f])\n  return top 10 from pq",
      dryRun: "postTweet(1, 101) -> timestamp=0.\nfollow(1, 2). postTweet(2, 102) -> timestamp=1.\ngetNewsFeed(1) -> returns [102, 101] since 102 has larger timestamp.",
      time: "O(N log K) where N is total tweets and K is number of followees",
      space: "O(users + tweets) memory footprint",
      interviewPoints: [
        "How is the global timestamp implemented? (A simple atomic integer incremented on postTweet).",
        "Optimize news feed generation using pointer iteration in list (similar to merge k sorted arrays: push only the last tweet of each followee first, then push preceding tweets as we poll).",
        "Verify unfollowing edge cases."
      ]
    },
    java: `import java.util.*;

public class Twitter {
    private static int timestamp = 0;
    
    static class Tweet {
        int id, time;
        Tweet(int id, int time) { this.id = id; this.time = time; }
    }
    
    private final Map<Integer, Set<Integer>> followers;
    private final Map<Integer, List<Tweet>> userTweets;

    public Twitter() {
        followers = new HashMap<>();
        userTweets = new HashMap<>();
    }
    
    public void postTweet(int userId, int tweetId) {
        userTweets.putIfAbsent(userId, new ArrayList<>());
        userTweets.get(userId).add(new Tweet(tweetId, timestamp++));
    }
    
    public List<Integer> getNewsFeed(int userId) {
        PriorityQueue<Tweet> maxHeap = new PriorityQueue<>((a, b) -> Integer.compare(b.time, a.time));
        
        // Add user's own tweets
        if (userTweets.containsKey(userId)) {
            maxHeap.addAll(userTweets.get(userId));
        }
        
        // Add followees' tweets
        Set<Integer> followed = followers.get(userId);
        if (followed != null) {
            for (int fId : followed) {
                if (userTweets.containsKey(fId)) {
                    maxHeap.addAll(userTweets.get(fId));
                }
            }
        }
        
        List<Integer> feed = new ArrayList<>();
        int count = 0;
        while (!maxHeap.isEmpty() && count < 10) {
            feed.add(maxHeap.poll().id);
            count++;
        }
        return feed;
    }
    
    public void follow(int followerId, int followeeId) {
        if (followerId == followeeId) return;
        followers.putIfAbsent(followerId, new HashSet<>());
        followers.get(followerId).add(followeeId);
    }
    
    public void unfollow(int followerId, int followeeId) {
        if (followers.containsKey(followerId)) {
            followers.get(followerId).remove(followeeId);
        }
    }
}`
  },
  "LC-703": {
    logic: {
      summary: "Find the kth largest element in a stream.",
      approach: "MinHeap of size k. Maintain a PriorityQueue of size k. During construction or addition, add value to heap. If size exceeds k, poll the smallest element. Peak contains the kth largest.",
      intuition: "MinHeap of size k keeps only the largest k numbers, making the smallest among them (the kth largest) sit at the top of the heap.",
      pseudocode: "constructor(k, nums):\n  pq = MinHeap()\n  for num in nums: add(num)\n\nadd(val):\n  pq.push(val)\n  if pq.size > k: pq.pop()\n  return pq.peek()",
      dryRun: "k=3, nums=[4,5,8,2]. heap=[4,5,8] (popped 2).\nadd(3) -> heap=[4,5,8] (popped 3). returns 4.\nadd(5) -> heap=[5,5,8] (popped 4). returns 5.",
      time: "O(log k) for add operation, O(N log k) for constructor",
      space: "O(k) for heap storage",
      interviewPoints: [
        "Why is MinHeap size capped at k? (Ensures insertions take O(log k) instead of O(log N)).",
        "What happens if stream size is smaller than k? (Peek returns smallest so far, or handle null/exception).",
        "Amortized space bounds."
      ]
    },
    java: `import java.util.*;

public class KthLargest {
    private final PriorityQueue<Integer> minHeap;
    private final int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        this.minHeap = new PriorityQueue<>();
        for (int num : nums) {
            add(num);
        }
    }
    
    public int add(int val) {
        minHeap.add(val);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
        return minHeap.peek();
    }
}`
  },
  "LC-981": {
    logic: {
      summary: "Design a time-based key-value store.",
      approach: "HashMap + Binary Search. Map key to a list of Node objects containing value and timestamp. Since timestamps are strictly increasing on set, we can perform binary search on the list to find the largest timestamp <= target.",
      intuition: "Key lookup is O(1) via map. Timestamp matching is O(log N) via binary search on the sorted timeline list.",
      pseudocode: "set(key, val, time):\n  map[key].add(Node(val, time))\n\nget(key, time):\n  list = map[key]\n  if not list return \"\"\n  idx = binarySearch(list, time)\n  return idx == -1 ? \"\" : list[idx].val",
      dryRun: "set('foo','bar',1). set('foo','bar2',4).\nget('foo',3) -> search list for <=3 -> finds 1 -> returns 'bar'.\nget('foo',0) -> search list for <=0 -> not found -> returns ''.",
      time: "O(1) for set, O(log N) for get operation",
      space: "O(N) total stored entries",
      interviewPoints: [
        "Explain custom binary search boundary search (finding the floor of a value).",
        "Why is Collections.binarySearch appropriate? (Returns negative insertion point if exact key not found, which can be bitwise inverted `~idx - 1` to find floor).",
        "Discuss space complexity comparison."
      ]
    },
    java: `import java.util.*;

public class TimeMap {
    static class Entry {
        String val;
        int time;
        Entry(String v, int t) { val = v; time = t; }
    }
    
    private final Map<String, List<Entry>> map;

    public TimeMap() {
        map = new HashMap<>();
    }
    
    public void set(String key, String value, int timestamp) {
        map.putIfAbsent(key, new ArrayList<>());
        map.get(key).add(new Entry(value, timestamp));
    }
    
    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) return "";
        List<Entry> list = map.get(key);
        int idx = searchFloor(list, timestamp);
        return idx == -1 ? "" : list.get(idx).val;
    }
    
    private int searchFloor(List<Entry> list, int time) {
        int low = 0, high = list.size() - 1;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (list.get(mid).time <= time) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
}`
  }
};

