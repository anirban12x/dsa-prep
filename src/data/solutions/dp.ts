import type { QuestionLogic } from "../types";

export const DP_SOLUTIONS: Record<string, { logic: QuestionLogic; java: string }> = {
  "LC-70": {
    logic: {
      summary: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      approach: "Bottom-up Dynamic Programming. The number of ways to reach step i is `dp[i-1] + dp[i-2]`. Space can be optimized to O(1) by only tracking the last two values.",
      intuition: "This is mathematically equivalent to the Fibonacci sequence because to reach step n, you must take a step of size 1 from n-1, or a step of size 2 from n-2.",
      pseudocode: "if n <= 2 return n\nprev2 = 1, prev1 = 2\nfor i from 3 to n:\n  curr = prev1 + prev2\n  prev2 = prev1\n  prev1 = curr\nreturn prev1",
      dryRun: "n = 4\ni=3: curr = 2 + 1 = 3. prev2=2, prev1=3\ni=4: curr = 3 + 2 = 5. prev2=3, prev1=5. Returns 5.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Explain relationship with Fibonacci.", "Discuss recursion with memoization (top-down) vs bottom-up.", "Matrix exponentiation for O(log n) time (theoretical option)."]
    },
    java: `import java.util.*;

public class ClimbingStairs {
    public static int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter steps: ");
        int n = sc.nextInt();
        System.out.println("Ways to climb: " + climbStairs(n));
        sc.close();
    }
}`
  },
  "LC-322": {
    logic: {
      summary: "Find the fewest number of coins needed to make up a given amount. If not possible, return -1.",
      approach: "1D Dynamic Programming. Create array `dp` of size `amount + 1` filled with `amount + 1` (as infinity). `dp[0] = 0`. For each amount from 1 to `amount`, check each coin.",
      intuition: "To make amount `i`, we look at all coins `c` and find the minimum of `1 + dp[i - c]` for all valid coin values.",
      pseudocode: "dp = array of size amount+1 filled with amount+1\ndp[0] = 0\nfor i from 1 to amount:\n  for coin in coins:\n    if i - coin >= 0:\n      dp[i] = min(dp[i], dp[i - coin] + 1)\nreturn dp[amount] > amount ? -1 : dp[amount]",
      dryRun: "coins = [1, 2, 5], amount = 11\ndp[0]=0, dp[1]=1 (using coin 1), dp[2]=1 (using coin 2), dp[3]=2 (using coin 2+1), ..., dp[11]=3 (using coins 5+5+1). Returns 3.",
      time: "O(N * C) where N is amount, C is number of coins",
      space: "O(N) for DP array",
      interviewPoints: ["Why greedy approach doesn't work for all coin sets (e.g. coins=[1,3,4], amount=6).", "Explain why default values in DP array are initialized to `amount + 1`."]
    },
    java: `import java.util.*;

public class CoinChange {
    public static int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of coins: ");
        int n = sc.nextInt();
        int[] coins = new int[n];
        System.out.println("Enter coins: ");
        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();
        System.out.print("Enter amount: ");
        int amt = sc.nextInt();
        System.out.println("Fewest coins needed: " + coinChange(coins, amt));
        sc.close();
    }
}`
  },
  "LC-300": {
    logic: {
      summary: "Find the length of the longest strictly increasing subsequence in an array.",
      approach: "Binary search patience-sorting strategy. Maintain an active tail list. For each number, search for its position in list using binary search and replace or append it.",
      intuition: "Instead of standard O(n^2) DP, we can maintain the smallest tail of all increasing subsequences of various lengths. This allows O(n log n) total time.",
      pseudocode: "tails = array\nlen = 0\nfor x in nums:\n  i = binarySearch(tails, 0, len, x)\n  if i < 0: i = -(i + 1)\n  tails[i] = x\n  if i == len: len++\nreturn len",
      dryRun: "nums = [10, 9, 2, 5, 3, 7, 101, 18]\ntails=[10] -> [9] -> [2] -> [2, 5] -> [2, 3] -> [2, 3, 7] -> [2, 3, 7, 101] -> [2, 3, 7, 18]. Length = 4. Returns 4.",
      time: "O(n log n)",
      space: "O(n) for tails array",
      interviewPoints: ["Compare O(n^2) DP solution with O(n log n) binary search solution.", "Prove that the tails array always remains sorted."]
    },
    java: `import java.util.*;

public class LIS {
    public static int lengthOfLIS(int[] nums) {
        int[] dp = new int[nums.length];
        int len = 0;
        for (int num : nums) {
            int i = Arrays.binarySearch(dp, 0, len, num);
            if (i < 0) {
                i = -(i + 1);
            }
            dp[i] = num;
            if (i == len) {
                len++;
            }
        }
        return len;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] nums = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println("Length of LIS: " + lengthOfLIS(nums));
        sc.close();
    }
}`
  },
  "LC-55": {
    logic: {
      summary: "Determine if you can reach the last index starting from index 0.",
      approach: "Greedy: keep track of the maximum index we can reach. If our current index exceeds the max reachable index, return false. If max reachable reaches or exceeds the last index, return true.",
      intuition: "At each step, calculate the furthest index we can jump to. If we can reach the end, return true.",
      pseudocode: "maxReach = 0\nfor i from 0 to n-1:\n  if i > maxReach return false\n  maxReach = max(maxReach, i + nums[i])\n  if maxReach >= n-1 return true\nreturn true",
      dryRun: "nums = [2,3,1,1,4]\ni=0: maxReach=max(0, 0+2)=2\ni=1: maxReach=max(2, 1+3)=4. maxReach >= 4 -> return true.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Compare with DP approach which takes O(n^2) time.", "Explain the logic of backward traversal greedy approach (shifting target)."]
    },
    java: `import java.util.*;

public class JumpGame {
    public static boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] nums = new int[n];
        System.out.println("Enter elements: ");
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println("Can reach end? " + canJump(nums));
        sc.close();
    }
}`
  },
  "P-175": {
    logic: {
      summary: "Solve the 0-1 Knapsack problem using recursion and memoization.",
      approach: "Top-down Dynamic Programming. Define recursive function `knapsack(idx, cap)` which returns the maximum value obtainable using a subset of first `idx` items under capacity `cap`. Memoize results in a 2D array.",
      intuition: "At each item, we face a binary choice: either include the item (if its weight <= capacity) or exclude it. We recursively take the maximum of these options and cache the state.",
      pseudocode: "memo = 2D array of -1\nknapsack(idx, cap):\n  if idx < 0 or cap == 0 return 0\n  if memo[idx][cap] != -1 return memo[idx][cap]\n  exclude = knapsack(idx-1, cap)\n  include = 0\n  if weight[idx] <= cap:\n    include = val[idx] + knapsack(idx-1, cap - weight[idx])\n  memo[idx][cap] = max(exclude, include)\n  return memo[idx][cap]",
      dryRun: "weights=[1,2], profits=[10,15], W=3, N=2\nknapsack(1, 3):\n  exclude = knapsack(0, 3) -> include (0,2) or exclude (0,3) -> return 10\n  include = 15 + knapsack(0, 1) -> return 15 + 10 = 25. max(10, 25) = 25. Returns 25.",
      time: "O(N * W) where N is number of items and W is knapsack capacity",
      space: "O(N * W) for memoization table and recursion stack",
      interviewPoints: [
        "Explain subproblem definition and state spaces.",
        "How is stack overflow mitigated in deep recursion? (Use bottom-up tabulation).",
        "Explain when the top-down approach is faster than tabulation (if only a fraction of the state space is visited)."
      ]
    },
    java: `import java.util.*;

public class KnapsackMemo {
    public static int knapSack(int W, int[] wt, int[] val, int n) {
        int[][] memo = new int[n][W + 1];
        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }
        return solve(n - 1, W, wt, val, memo);
    }
    
    private static int solve(int idx, int cap, int[] wt, int[] val, int[][] memo) {
        if (idx < 0 || cap == 0) return 0;
        if (memo[idx][cap] != -1) return memo[idx][cap];
        
        int exclude = solve(idx - 1, cap, wt, val, memo);
        int include = 0;
        if (wt[idx] <= cap) {
            include = val[idx] + solve(idx - 1, cap - wt[idx], wt, val, memo);
        }
        return memo[idx][cap] = Math.max(exclude, include);
    }
}`
  },
  "P-177": {
    logic: {
      summary: "Solve the 0-1 Knapsack problem using bottom-up tabulation with space optimization.",
      approach: "Bottom-up Dynamic Programming. Maintain a 1D DP array of size W + 1. Iterate through items and update DP array in reverse order to ensure we only use results from the previous item step.",
      intuition: "Since `dp[w]` only depends on values from the previous row at smaller capacities, we can compress the 2D table into a single row updated from right to left.",
      pseudocode: "dp = array of size W+1 filled with 0\nfor i from 0 to N-1:\n  for w from W down to weight[i]:\n    dp[w] = max(dp[w], profit[i] + dp[w - weight[i]])\nreturn dp[W]",
      dryRun: "weights=[1,2], profits=[10,15], W=3\nInit: dp=[0,0,0,0]\ni=0 (wt=1, val=10): w=3..1 -> dp=[0, 10, 10, 10]\ni=1 (wt=2, val=15): w=3..2 -> dp[3]=max(10, 15+dp[1])=25. dp[2]=max(10, 15+dp[0])=15. dp=[0, 10, 15, 25]. Returns 25.",
      time: "O(N * W)",
      space: "O(W) space complexity",
      interviewPoints: [
        "Why must the inner loop run backwards? (To prevent using the current item's value multiple times, which would solve Unbounded Knapsack instead of 0-1).",
        "Compare 2D DP table O(N*W) space vs 1D DP table O(W) space.",
        "What if capacity W is extremely large? (If W > 2^N, use backtracking; if profits are small, DP on profit space)."
      ]
    },
    java: `public class KnapsackTabulation {
    public static int knapSack(int W, int[] wt, int[] val, int n) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < n; i++) {
            for (int w = W; w >= wt[i]; w--) {
                dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);
            }
        }
        return dp[W];
    }
}`
  },
  "P-178": {
    logic: {
      summary: "Determine if there is a subset of the given set with sum equal to given sum.",
      approach: "Tabulation Dynamic Programming. Maintain a 1D boolean array `dp` of size `sum + 1`. Initialize `dp[0] = true`. Iterate through each number, and update `dp[j] = dp[j] || dp[j - num]` in reverse direction.",
      intuition: "A sum `j` is possible if it was already possible or if the remainder `j - num` was possible before adding this number.",
      pseudocode: "dp = boolean array of size sum+1, dp[0] = true\nfor num in arr:\n  for j from sum down to num:\n    dp[j] = dp[j] or dp[j - num]\nreturn dp[sum]",
      dryRun: "arr=[3,4], sum=5\nInit: dp=[T, F, F, F, F, F]\nnum=3: j=5..3 -> dp[3] = dp[3]||dp[0] = T. dp=[T, F, F, T, F, F]\nnum=4: j=5..4 -> dp[4] = dp[4]||dp[0] = T. dp=[T, F, F, T, T, F]. Returns dp[5] = false.",
      time: "O(N * Sum)",
      space: "O(Sum) space complexity",
      interviewPoints: [
        "Why is reverse iteration required? (Prevents using the same element multiple times).",
        "Discuss recursive memoization complexity.",
        "Explain NP-completeness and pseudo-polynomial time behavior."
      ]
    },
    java: `public class SubsetSum {
    public static boolean isSubsetSum(int[] arr, int sum) {
        int n = arr.length;
        boolean[] dp = new boolean[sum + 1];
        dp[0] = true;
        
        for (int num : arr) {
            for (int j = sum; j >= num; j--) {
                if (dp[j - num]) {
                    dp[j] = true;
                }
            }
        }
        return dp[sum];
    }
}`
  },
  "P-181": {
    logic: {
      summary: "Find the length of the Longest Increasing Subsequence.",
      approach: "Tabulation DP. Maintain a DP array where `dp[i]` represents the length of LIS ending at index `i`. For each index, scan all previous indices and update `dp[i] = max(dp[i], dp[j] + 1)` if `arr[j] < arr[i]`.",
      intuition: "To find LIS ending at index `i`, we can extend any LIS ending at index `j < i` as long as `arr[j] < arr[i]`.",
      pseudocode: "dp = array of size n filled with 1\nfor i from 1 to n-1:\n  for j from 0 to i-1:\n    if arr[j] < arr[i]:\n      dp[i] = max(dp[i], dp[j] + 1)\nreturn max(dp)",
      dryRun: "arr=[10,9,25]\ndp=[1, 1, 1]\ni=1(9): j=0(10) -> no change\ni=2(25): j=0(10) -> dp[2]=2. j=1(9) -> dp[2]=max(2, 1+1)=2. Returns max(dp) = 2.",
      time: "O(N^2)",
      space: "O(N)",
      interviewPoints: [
        "Discuss the O(N log N) binary search solution (Patience Sorting / tails array).",
        "What is the base case? (Every single element itself forms an LIS of length 1).",
        "Explain how to print the actual LIS subsequence (store parent pointers)."
      ]
    },
    java: `import java.util.*;

public class LIS {
    public static int lengthOfLIS(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        int maxLen = 1;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
        return maxLen;
    }
}`
  },
  "LC-1547": {
    logic: {
      summary: "Find the minimum cost to make all cuts on a stick of length n.",
      approach: "Range/Interval DP. Add 0 and n to the cuts array, sort it. Let `dp[i][j]` be the minimum cost to cut the stick between cuts[i] and cuts[j]. For each pair, choose partition index `k` to minimize `dp[i][k] + dp[k][j] + cuts[j] - cuts[i]`.",
      intuition: "Making a cut splits the problem into two independent sub-sticks. The cost of the first cut is the length of the current sub-stick.",
      pseudocode: "cuts.add(0, n), sort(cuts)\ndp = 2D array of size m x m\nfor length from 2 to m-1:\n  for i from 0 to m - 1 - length:\n    j = i + length\n    dp[i][j] = infinity\n    for k from i+1 to j-1:\n      dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j] + cuts[j] - cuts[i])\nreturn dp[0][m-1]",
      dryRun: "n=7, cuts=[1,3,45]. Extended: [0, 1, 3, 45, 7]\nCompute intervals of increasing sizes and select optimal split index k.",
      time: "O(M^3) where M is cuts.length",
      space: "O(M^2) for DP storage table",
      interviewPoints: [
        "Explain why sorting the cuts array is necessary.",
        "Why is the cost of a cut `cuts[j] - cuts[i]`?",
        "Compare with Matrix Chain Multiplication or Balloon Bursting."
      ]
    },
    java: `import java.util.*;

public class MinCostCutStick {
    public static int minCost(int n, int[] cuts) {
        int m = cuts.length;
        int[] newCuts = new int[m + 2];
        newCuts[0] = 0;
        newCuts[m + 1] = n;
        for (int i = 0; i < m; i++) {
            newCuts[i + 1] = cuts[i];
        }
        Arrays.sort(newCuts);
        
        int len = newCuts.length;
        int[][] dp = new int[len][len];
        
        for (int diff = 2; diff < len; diff++) {
            for (int i = 0; i < len - diff; i++) {
                int j = i + diff;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i + 1; k < j; k++) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + newCuts[j] - newCuts[i]);
                }
            }
        }
        return dp[0][len - 1];
    }
}`
  },
  "LC-2074": {
    logic: {
      summary: "Reverse nodes of a linked list in groups of increasing length (1, 2, 3...) if the group length is even.",
      approach: "Linked List Group Iteration. Scan groups. For each group, count available nodes. If count is even, reverse group; else keep it as is. Connect boundaries and proceed to next group.",
      intuition: "We process group boundaries dynamically. Modulo check on the group size (or remaining nodes count) determines if group requires reversing.",
      pseudocode: "groupSize = 1, prevTail = dummy\nwhile curr:\n  count = countNodes(curr, groupSize)\n  if count is even:\n    reversedHead, nextGroupHead = reverse(curr, count)\n    prevTail.next = reversedHead\n    prevTail = curr\n    curr = nextGroupHead\n  else:\n    prevTail = getTail(curr, count)\n    curr = prevTail.next\n  groupSize++",
      dryRun: "list: 5->2->6->3->9->1, groups: size 1, 2, 3...\ngroup 1 (size 1, actual 1): odd -> keep. prevTail=5, curr=2.\ngroup 2 (size 2, actual 2): even -> reverse [2,6] to [6,2]. 5.next=6. prevTail=2, curr=3.\ngroup 3 (size 3, actual 3): [3,9,1]. odd -> keep. prevTail=1, curr=null. Final: 5->6->2->3->9->1.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Be extremely careful with pointer connections at the boundaries of reversed segments.",
        "What happens in the last group if it has fewer nodes than expected? (Check actual count, not expected group size).",
        "Discuss space complexity comparison with recursion."
      ]
    },
    java: `public class ReverseEvenGroups {
    public static ListNode reverseEvenLengthGroups(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode prev = head;
        int groupLen = 2;
        
        while (prev.next != null) {
            ListNode node = prev.next;
            int count = 0;
            ListNode curr = node;
            while (curr != null && count < groupLen) {
                curr = curr.next;
                count++;
            }
            
            if (count % 2 == 0) {
                ListNode reversePrev = curr;
                ListNode reverseCurr = node;
                for (int i = 0; i < count; i++) {
                    ListNode next = reverseCurr.next;
                    reverseCurr.next = reversePrev;
                    reversePrev = reverseCurr;
                    reverseCurr = next;
                }
                prev.next = reversePrev;
                prev = node;
            } else {
                for (int i = 0; i < count; i++) {
                    prev = prev.next;
                }
            }
            groupLen++;
        }
        return head;
    }
}`
  },
  "LC-2487": {
    logic: {
      summary: "Remove nodes from a linked list that have a node with a strictly greater value to their right.",
      approach: "Recursive Suffix Maximum. Recursively process `head.next`. If current node's value is smaller than its processed next node's value, discard current node and return `head.next`.",
      intuition: "We scan from right to left. A node is only kept if it is greater than or equal to the maximum element seen so far from the right side.",
      pseudocode: "removeNodes(head):\n  if head is null return null\n  head.next = removeNodes(head.next)\n  if head.next and head.val < head.next.val:\n    return head.next\n  return head",
      dryRun: "list: 5->2->13->3->8\nRecursion returns suffix lists:\nprocess 8 -> 8. process 3 -> 3.next=8. 3 < 8 -> return 8.\nprocess 13 -> 13.next=8. 13 >= 8 -> return 13.\nprocess 2 -> 2.next=13. 2 < 13 -> return 13.\nprocess 5 -> 5.next=13. 5 < 13 -> return 13. Returns 13->8.",
      time: "O(n)",
      space: "O(n) recursion stack space",
      interviewPoints: [
        "Explain iterative solution using a Stack (monotonically decreasing stack) for O(n) space.",
        "Explain O(1) space solution by reversing the list, keeping suffix maximums, and reversing back.",
        "Compare complexity trade-offs."
      ]
    },
    java: `public class RemoveNodes {
    public static ListNode removeNodes(ListNode head) {
        if (head == null) return null;
        head.next = removeNodes(head.next);
        if (head.next != null && head.val < head.next.val) {
            return head.next;
        }
        return head;
    }
}`
  },
  "P-176": {
    logic: {
      summary: "Introduction to Dynamic Programming Tabulation.",
      approach: "Convert top-down recursive definitions into bottom-up array iterations. Solve smaller subproblems first and build up to the target state.",
      intuition: "Tabulation fills a table iteratively, avoiding function call overhead and recursion stack memory.",
      pseudocode: "tabulateFib(n):\n  table = array[n+1]\n  table[0] = 0, table[1] = 1\n  for i from 2 to n:\n    table[i] = table[i-1] + table[i-2]\n  return table[n]",
      dryRun: "n=4 -> table: [0, 1, 1, 2, 3]. Returns 3.",
      time: "O(n)",
      space: "O(n)",
      interviewPoints: [
        "Compare Memoization (top-down) vs Tabulation (bottom-up).",
        "Explain space optimization (dropping table size if states only look back a fixed distance).",
        "Explain stack overflow risks in recursion."
      ]
    },
    java: `public class TabulationIntro {
    public static int getFibonacci(int n) {
        if (n <= 1) return n;
        int[] table = new int[n + 1];
        table[0] = 0;
        table[1] = 1;
        for (int i = 2; i <= n; i++) {
            table[i] = table[i - 1] + table[i - 2];
        }
        return table[n];
    }
}`
  },
  "P-186": {
    logic: {
      summary: "Dynamic Programming Cheat Sheet and Revision Guide.",
      approach: "Review key DP models: Knapsack, LIS, LCS, MCM, and Subset Sum, summarizing their transition states and optimal space equations.",
      intuition: "Mapping multiple patterns side-by-side highlights structural similarities.",
      pseudocode: "LCS: dp[i][j] = match ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])\nLIS: dp[i] = max(dp[i], dp[j] + 1)\nKnapsack: dp[w] = max(dp[w], val[i] + dp[w - wt[i]])",
      dryRun: "Conceptual reference class.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: [
        "Identify transition models in coding interviews.",
        "Check index alignment and base cases.",
        "Explain state space pruning."
      ]
    },
    java: `public class DPCheatSheet {
    public static void displaySummary() {
        System.out.println("DP Revision:");
        System.out.println("1. LCS: 2D table, transition matches prefix indices.");
        System.out.println("2. LIS: 1D tabulation, compares all previous entries.");
        System.out.println("3. 0-1 Knapsack: 1D space optimized table, reverse iteration.");
    }
}`
  },
  "LC-23": {
    logic: {
      summary: "Merge k sorted linked lists and return it as one sorted list.",
      approach: "MinHeap / PriorityQueue. Insert the head of each non-null list into a MinHeap. Repeatedly extract the minimum node, attach it to the merged list, and insert its next node if it exists.",
      intuition: "K-way merge on linked lists. Heap maintains the smallest active node among all k lists, allowing us to build the sorted list sequentially in logarithmic time.",
      pseudocode: "pq = MinHeap(compare by node.val)\nfor head in lists:\n  if head: pq.push(head)\ndummy = Node(0), curr = dummy\nwhile pq:\n  minNode = pq.pop()\n  curr.next = minNode\n  curr = curr.next\n  if minNode.next: pq.push(minNode.next)\nreturn dummy.next",
      dryRun: "lists=[[1,4,5],[1,3,4],[2,6]]\npq=[1(list 0), 1(list 1), 2(list 2)]\npop 1(0) -> next 4. pq=[1(1), 2(2), 4(0)]. dummy->1(0)\npop 1(1) -> next 3. pq=[2(2), 3(1), 4(0)]. dummy->1(0)->1(1)\npop 2(2) -> next 6. pq=[3(1), 4(0), 6(2)]. dummy->1->1->2. Returns merged list.",
      time: "O(N log k) where N is total nodes and k is number of lists",
      space: "O(k) for PriorityQueue storage",
      interviewPoints: [
        "Why is PriorityQueue optimal for K-way merge? (Ensures O(log k) retrieval of minimum).",
        "Explain alternative Divide and Conquer solution (merging lists in pairs, similar to Merge Sort, also takes O(N log k) time and O(log k) recursive space).",
        "Verify edge cases like empty list of lists or empty nested lists."
      ]
    },
    java: `import java.util.*;

public class MergeKLists {
    public static ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));
        
        for (ListNode node : lists) {
            if (node != null) {
                pq.add(node);
            }
        }
        
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (!pq.isEmpty()) {
            ListNode minNode = pq.poll();
            curr.next = minNode;
            curr = curr.next;
            if (minNode.next != null) {
                pq.add(minNode.next);
            }
        }
        return dummy.next;
    }
}`
  }
};


