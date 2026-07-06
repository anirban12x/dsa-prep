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
  }
};
