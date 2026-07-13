import type { QuestionLogic } from "../types";

export const MATH_SOLUTIONS: Record<string, { logic: QuestionLogic; java: string }> = {
  "LC-9": {
    logic: {
      summary: "Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.",
      approach: "Reverse the second half of the integer and compare it with the first half. This avoids integer overflow compared to reversing the entire number.",
      intuition: "Negative numbers are not palindromes. Numbers ending in 0 (except 0 itself) are not palindromes. Reversing digits can be done using modulo and division arithmetic.",
      pseudocode: "if x < 0 or (x % 10 == 0 and x != 0) return false\nrev = 0\nwhile x > rev:\n  rev = rev * 10 + x % 10\n  x /= 10\nreturn x == rev or x == rev / 10",
      dryRun: "x = 121\nx=121, rev=0 -> x=12, rev=1 -> x=1, rev=12. Loop stops (x <= rev). Return (1 == 12/10) -> true.",
      time: "O(log10(n))",
      space: "O(1)",
      interviewPoints: ["Why reversing the whole number can overflow", "Explain why negative numbers are never palindromes in this definition"]
    },
    java: `import java.util.*;

public class PalindromeNumber {
    public static boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int revertedNumber = 0;
        while (x > revertedNumber) {
            revertedNumber = revertedNumber * 10 + x % 10;
            x /= 10;
        }
        return x == revertedNumber || x == revertedNumber / 10;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int x = sc.nextInt();
        System.out.println("Is palindrome? " + isPalindrome(x));
        sc.close();
    }
}`
  },
  "LC-7": {
    logic: {
      summary: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range, return 0.",
      approach: "Pop digits from the back of x one-by-one using modulo. Check for overflow before multiplying the result by 10 and adding the digit.",
      intuition: "Standard reverse algorithm, but with overflow guard values. Integer bounds in Java are Integer.MAX_VALUE and Integer.MIN_VALUE.",
      pseudocode: "rev = 0\nwhile x != 0:\n  pop = x % 10\n  x /= 10\n  if rev > MAX/10 or (rev == MAX/10 and pop > 7) return 0\n  if rev < MIN/10 or (rev == MIN/10 and pop < -8) return 0\n  rev = rev * 10 + pop\nreturn rev",
      dryRun: "x = 123\npop=3, x=12, rev=3\npop=2, x=1, rev=32\npop=1, x=0, rev=321. Returns 321.",
      time: "O(log10(x))",
      space: "O(1)",
      interviewPoints: ["Explain the overflow check bounds (+7 and -8 values)", "Handling negative values (modulo keeps sign in Java)"]
    },
    java: `import java.util.*;

public class ReverseInteger {
    public static int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            if (rev > Integer.MAX_VALUE/10 || (rev == Integer.MAX_VALUE/10 && pop > 7)) return 0;
            if (rev < Integer.MIN_VALUE/10 || (rev == Integer.MIN_VALUE/10 && pop < -8)) return 0;
            rev = rev * 10 + pop;
        }
        return rev;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter integer: ");
        int x = sc.nextInt();
        System.out.println("Reversed: " + reverse(x));
        sc.close();
    }
}`
  },
  "TCS-N03": {
    logic: {
      summary: "Check if a number is prime.",
      approach: "Check if number is less than 2 (not prime). Loop from 2 to sqrt(n). If n is divisible by any value in this range, it's not prime; otherwise, it is prime.",
      intuition: "Factors of a number always appear in pairs. If a number has a factor larger than sqrt(n), its counterpart must be smaller than sqrt(n).",
      pseudocode: "if n <= 1 return false\nfor i from 2 to sqrt(n):\n  if n % i == 0 return false\nreturn true",
      dryRun: "n = 11\nCheck i=2, 3 (sqrt(11) ~ 3.3). 11 is not divisible by 2 or 3. Returns true.",
      time: "O(sqrt(n))",
      space: "O(1)",
      interviewPoints: ["Why checking up to sqrt(n) is sufficient.", "Optimize check by skipping even numbers after checking 2."]
    },
    java: `import java.util.*;

public class PrimeCheck {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n == 2 || n == 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int n = sc.nextInt();
        System.out.println("Is prime? " + isPrime(n));
        sc.close();
    }
}`
  },
  "TCS-N05": {
    logic: {
      summary: "Check if a number is an Armstrong number.",
      approach: "Count digits (d). Calculate sum of each digit raised to power d. If sum equals original number, return true.",
      intuition: "An Armstrong number is equal to sum of its digits raised to power of count of digits.",
      pseudocode: "temp = n, sum = 0, digits = len(str(n))\nwhile temp > 0:\n  d = temp % 10\n  sum += pow(d, digits)\n  temp /= 10\nreturn sum == n",
      dryRun: "n = 153. Digits = 3.\n1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153. Returns true.",
      time: "O(log10(n))",
      space: "O(1)",
      interviewPoints: ["Confirm definition: standard 3-digit cube sum vs n-digit general powers."]
    },
    java: `import java.util.*;

public class ArmstrongNumber {
    public static boolean isArmstrong(int n) {
        int temp = n;
        int digits = String.valueOf(n).length();
        int sum = 0;
        while (temp > 0) {
            int d = temp % 10;
            sum += Math.pow(d, digits);
            temp /= 10;
        }
        return sum == n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int n = sc.nextInt();
        System.out.println("Is Armstrong? " + isArmstrong(n));
        sc.close();
    }
}`
  },

  "LC-509": {
    logic: {
      summary: "Compute the N-th Fibonacci number.",
      approach: "Iterative dynamic programming with space optimization. Keep track of the last two values (a and b) and update them in each step.",
      intuition: "Each Fibonacci number is the sum of the two preceding ones. We only need the last two values to compute the next, requiring O(1) space.",
      pseudocode: "if n <= 1 return n\na = 0, b = 1\nfor i from 2 to n:\n  c = a + b\n  a = b\n  b = c\nreturn b",
      dryRun: "n=3\ni=2: c=0+1=1, a=1, b=1\ni=3: c=1+1=2, a=1, b=2. Returns 2.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: [
        "Compare recursion (O(2^n)), memoization (O(n) time/space), and iterative (O(n) time, O(1) space).",
        "Mention matrix exponentiation for O(log n) time.",
        "Verify integer overflow bounds for large n."
      ]
    },
    java: `public class Fibonacci {
    public static int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`
  },
  "P-114": {
    logic: {
      summary: "Compute the sum of digits of a number.",
      approach: "Iteratively extract the last digit using modulo 10, add it to sum, and divide the number by 10 until it becomes 0.",
      intuition: "Modulo 10 gives the last digit, and division by 10 shifts digits right.",
      pseudocode: "sum = 0\nwhile n > 0:\n  sum += n % 10\n  n = n / 10\nreturn sum",
      dryRun: "n=123\nstep 1: sum = 0 + 3 = 3, n = 12\nstep 2: sum = 3 + 2 = 5, n = 1\nstep 3: sum = 5 + 1 = 6, n = 0. Returns 6.",
      time: "O(log10(n))",
      space: "O(1)",
      interviewPoints: [
        "Explain time complexity in terms of digits count.",
        "How to handle negative inputs? (Take absolute value).",
        "Recursive solution comparison."
      ]
    },
    java: `public class SumOfDigits {
    public static int sumDigits(int n) {
        n = Math.abs(n);
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }
}`
  },
  "LC-2": {
    logic: {
      summary: "Add two numbers represented by linked lists.",
      approach: "Traverse both lists node-by-node, sum values along with carry, and build the resulting list.",
      intuition: "Simulate digit addition from right to left, tracking carry value for next columns.",
      pseudocode: "carry = 0, dummy = Node(0)\nwhile l1 or l2 or carry:\n  sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry\n  carry = sum / 10\n  curr.next = Node(sum % 10)\n  curr = curr.next\nreturn dummy.next",
      dryRun: "l1=[2,4], l2=[5,6]\ncol 1: 2+5=7, carry=0. col 2: 4+6=10, carry=1. Result: [7,0,1].",
      time: "O(max(m, n))",
      space: "O(1) auxiliary space",
      interviewPoints: ["Handle lists of different lengths.", "Explain carry propagation.", "Avoid mutating input lists."]
    },
    java: `public class AddTwoNumbers {
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry > 0) {
            int sum = carry;
            if (l1 != null) { sum += l1.val; l1 = l1.next; }
            if (l2 != null) { sum += l2.val; l2 = l2.next; }
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
        }
        return dummy.next;
    }
}`
  },
  "LC-50": {
    logic: {
      summary: "Compute x raised to power n.",
      approach: "Binary exponentiation. Recursively compute half powers: `pow(x, n) = pow(x * x, n / 2)`.",
      intuition: "Reduce multiplications from O(n) to O(log n) by squaring base at each bit shift.",
      pseudocode: "pow(x, n):\n  if n == 0 return 1\n  if n < 0: return 1 / pow(x, -n)\n  if n is even return pow(x*x, n/2)\n  return x * pow(x*x, n/2)",
      dryRun: "x=2, n=10 -> pow(4, 5) -> 4 * pow(16, 2) -> 4 * pow(256, 1) -> 4 * 256 = 1024.",
      time: "O(log n)",
      space: "O(log n) recursion stack",
      interviewPoints: ["Prevent integer overflow for -n (especially Integer.MIN_VALUE).", "Explain binary reduction.", "Show iterative version."]
    },
    java: `public class PowerXN {
    public static double myPow(double x, int n) {
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        return fastPow(x, N);
    }
    private static double fastPow(double x, long n) {
        if (n == 0) return 1.0;
        double half = fastPow(x, n / 2);
        if (n % 2 == 0) {
            return half * half;
        } else {
            return half * half * x;
        }
    }
}`
  },
  "LC-190": {
    logic: {
      summary: "Reverse bits of a 32-bit unsigned integer.",
      approach: "Iterate 32 times, shifting result left and pulling the rightmost bit of input n.",
      intuition: "Extract bits from right, push them to the left of the new value.",
      pseudocode: "res = 0\nfor 32 times:\n  res = (res << 1) | (n & 1)\n  n = n >> 1\nreturn res",
      dryRun: "n=4321 -> extracts and pushes bits sequentially, shifting 32 times.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Clarify signed vs unsigned right shift (use `>>>`).", "Explain bit masking.", "Optimize for multiple queries (cache byte results)."]
    },
    java: `public class ReverseBits32 {
    public static int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>>= 1;
        }
        return result;
    }
}`
  },
  "LC-191": {
    logic: {
      summary: "Count the number of set bits (Hamming Weight).",
      approach: "Brian Kernighan's Algorithm. Clear the lowest set bit repeatedly with `n = n & (n - 1)`.",
      intuition: "Subtracting 1 flips all bits after the lowest set bit. Bitwise AND clears that set bit.",
      pseudocode: "count = 0\nwhile n != 0:\n  n = n & (n - 1)\n  count++\nreturn count",
      dryRun: "n=11 (1011) -> n & 10 (1010) [count=1] -> n & 9 (1000) [count=2] -> n & 7 (0000) [count=3]. Returns 3.",
      time: "O(1) (proportional to set bits)",
      space: "O(1)",
      interviewPoints: ["Compare with bit shifting 32 times.", "State Brian Kernighan's formula.", "Discuss compiler built-ins (Integer.bitCount)."]
    },
    java: `public class HammingWeight {
    public static int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
}`
  },
  "LC-338": {
    logic: {
      summary: "Generate set bits count for all numbers up to n.",
      approach: "Dynamic Programming. `dp[i] = dp[i >> 1] + (i & 1)`.",
      intuition: "The number of set bits in i is equal to the count in i/2 plus 1 if i is odd.",
      pseudocode: "dp = array of size n+1\nfor i from 1 to n:\n  dp[i] = dp[i >> 1] + (i & 1)\nreturn dp",
      dryRun: "n=2 -> dp[0]=0. dp[1]=dp[0]+1=1. dp[2]=dp[1]+0=1. Returns [0,1,1].",
      time: "O(n)",
      space: "O(1) auxiliary space",
      interviewPoints: ["Explain relationship between i and i/2.", "Why bitwise operations are faster.", "Base cases."]
    },
    java: `public class CountingBits {
    public static int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}`
  },
  "LC-371": {
    logic: {
      summary: "Add two integers without using + or - operators.",
      approach: "Bitwise XOR for sum, AND-Shift for carry. Repeat until carry is 0.",
      intuition: "XOR performs addition without carry. AND identifies carries, which must shift left.",
      pseudocode: "while b != 0:\n  carry = (a & b) << 1\n  a = a ^ b\n  b = carry\nreturn a",
      dryRun: "a=1(01), b=2(10) -> carry=(01&10)<<1=0. a=01^10=3. b=0. Loop ends. Returns 3.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["How XOR acts as half-adder.", "Why we shift carry by 1.", "Handle negative numbers (represented as two's complement)."]
    },
    java: `public class SumWithoutOperators {
    public static int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}`
  },
  "LC-204": {
    logic: {
      summary: "Count primes strictly less than n.",
      approach: "Sieve of Eratosthenes. Mark multiples of discovered primes as non-prime starting from p*p.",
      intuition: "Eliminate multiples iteratively to filter prime candidates.",
      pseudocode: "sieve = array of true\nfor p from 2 to sqrt(n):\n  if sieve[p]:\n    mark multiples starting from p*p as false\ncount trues from 2 to n-1",
      dryRun: "n=10 -> marks 4,6,8,9 as false. Primes: 2,3,5,7. Returns 4.",
      time: "O(n log log n)",
      space: "O(n)",
      interviewPoints: ["Why start marking from p*p? (Smaller multiples already marked by smaller primes).", "Discuss memory footprint.", "Optimize loops."]
    },
    java: `public class CountPrimesSieve {
    public static int countPrimes(int n) {
        if (n <= 2) return 0;
        boolean[] isPrime = new boolean[n];
        java.util.Arrays.fill(isPrime, true);
        for (int p = 2; p * p < n; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i < n; i += p) {
                    isPrime[i] = false;
                }
            }
        }
        int count = 0;
        for (int i = 2; i < n; i++) {
            if (isPrime[i]) count++;
        }
        return count;
    }
}`
  },
  "LC-507": {
    logic: {
      summary: "Check if a number is a perfect number.",
      approach: "Iterate up to sqrt(n) to accumulate all divisors. Subtract n itself if matched.",
      intuition: "Divisors appear in pairs: if d divides n, then n/d also divides n.",
      pseudocode: "sum = 1\nfor d from 2 to sqrt(n):\n  if n % d == 0:\n    sum += d + n/d\nreturn sum == n and n != 1",
      dryRun: "n=6 -> d=2: sum = 1 + 2 + 3 = 6. Returns true.",
      time: "O(sqrt(n))",
      space: "O(1)",
      interviewPoints: ["Why search up to sqrt(n)?", "Handle n=1 (special case).", "Discuss perfect number formulas."]
    },
    java: `public class PerfectNumber {
    public static boolean checkPerfectNumber(int num) {
        if (num <= 1) return false;
        int sum = 1;
        for (int d = 2; d * d <= num; d++) {
            if (num % d == 0) {
                sum += d;
                if (d * d != num) {
                    sum += num / d;
                }
            }
        }
        return sum == num;
    }
}`
  },
  "LC-1071": {
    logic: {
      summary: "Find the greatest common divisor of two strings.",
      approach: "Check string concatenation consistency: `str1 + str2 == str2 + str1`. If matches, GCD string is substring of length `gcd(str1.length, str2.length)`.",
      intuition: "If two strings share a common base string divisor, their concatenations must be equal.",
      pseudocode: "if str1+str2 != str2+str1 return \"\"\nreturn str1.substring(0, gcd(str1.len, str2.len))",
      dryRun: "s1='ABCABC', s2='ABC' -> s1+s2 == s2+s1 -> gcd(6,3)=3. Returns s1[0...3] = 'ABC'.",
      time: "O(N + M)",
      space: "O(N + M) for concatenation checks",
      interviewPoints: ["Why does string concatenation check prove common divisor existence?", "Euclidean algorithm for integer GCD.", "Time complexity."]
    },
    java: `public class GCDStrings {
    public static String gcdOfStrings(String str1, String str2) {
        if (!(str1 + str2).equals(str2 + str1)) return "";
        int gcdLength = gcd(str1.length(), str2.length());
        return str1.substring(0, gcdLength);
    }
    private static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}`
  },
  "LC-258": {
    logic: {
      summary: "Add digits of a number repeatedly until a single digit remains.",
      approach: "Digital Root formula: `1 + (n - 1) % 9`.",
      intuition: "In base 10, sum of digits matches modulo 9 arithmetic properties.",
      pseudocode: "if n == 0 return 0\nreturn 1 + (n - 1) % 9",
      dryRun: "n=38 -> 1 + 37 % 9 = 1 + 1 = 2. Correct.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Explain modulo 9 arithmetic details.", "Provide iterative O(log n) solution.", "Special case n=0."]
    },
    java: `public class AddDigitsDigitalRoot {
    public static int addDigits(int num) {
        if (num == 0) return 0;
        return 1 + (num - 1) % 9;
    }
}`
  },
  "LC-592": {
    logic: {
      summary: "Add and subtract fractions represented as a string.",
      approach: "Parse fractions using a Scanner/Regex, accumulate using running numerator and denominator, simplify by dividing by GCD at the end.",
      intuition: "Treat sum fraction as `A/B + C/D = (A*D + B*C) / (B*D)`. Simplify at each step.",
      pseudocode: "num = 0, den = 1\nfor each fraction parsed:\n  num = num * d + den * n\n  den = den * d\n  g = gcd(num, den)\n  num /= g, den /= g\nreturn num/den as string",
      dryRun: "'-1/2+1/2' -> num=0, den=1. Returns '0/1'.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Regex matching for signed integers.", "How to handle negative numerators.", "Euclidean GCD simplification."]
    },
    java: `import java.util.*;

public class FractionAddition {
    public static String fractionAddition(String expression) {
        Scanner sc = new Scanner(expression).useDelimiter("(?=[-+])");
        int num = 0, den = 1;
        while (sc.hasNext()) {
            String[] parts = sc.next().split("/");
            int n = Integer.parseInt(parts[0]);
            int d = Integer.parseInt(parts[1]);
            num = num * d + den * n;
            den = den * d;
            int g = gcd(Math.abs(num), den);
            num /= g;
            den /= g;
        }
        return num + "/" + den;
    }
    private static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}`
  },
  "TCS-N02": {
    logic: {
      summary: "Find all palindrome numbers in a given range.",
      approach: "Loop from min to max, check if number equals its reverse, record matches.",
      intuition: "Reverse integer via arithmetic loop and check equality.",
      pseudocode: "for i from min to max:\n  if isPal(i): add i",
      dryRun: "range 10 to 12 -> 11 is palindrome. Returns [11].",
      time: "O(R log N)",
      space: "O(1)",
      interviewPoints: ["Explain reversing logic.", "Optimize bounds checks.", "Bitwise palindrome variations."]
    },
    java: `import java.util.*;

public class RangePalindromes {
    public static List<Integer> findPalindromes(int min, int max) {
        List<Integer> list = new ArrayList<>();
        for (int i = min; i <= max; i++) {
            if (isPalindrome(i)) list.add(i);
        }
        return list;
    }
    private static boolean isPalindrome(int n) {
        if (n < 0) return false;
        int rev = 0, temp = n;
        while (temp > 0) {
            rev = rev * 10 + (temp % 10);
            temp /= 10;
        }
        return rev == n;
    }
}`
  },
  "TCS-N07": {
    logic: {
      summary: "Check if a number is even or odd.",
      approach: "Bitwise AND with 1. If `n & 1 == 0`, even, else odd.",
      intuition: "Even numbers have 0 as their lowest significant bit.",
      pseudocode: "return n & 1 == 0 ? 'Even' : 'Odd'",
      dryRun: "n=5 -> 5 & 1 = 1 -> 'Odd'.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Why bitwise AND is faster than modulo.", "Negative number handling."]
    },
    java: `public class EvenOrOdd {
    public static String check(int n) {
        return (n & 1) == 0 ? "Even" : "Odd";
    }
}`
  },
  "TCS-N08": {
    logic: {
      summary: "Check whether a number is positive or negative.",
      approach: "Compare with 0.",
      intuition: "Basic logical branches.",
      pseudocode: "if n > 0 positive else negative",
      dryRun: "n=-5 -> negative",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Handle zero case explicitly."]
    },
    java: `public class PositiveNegative {
    public static String check(int n) {
        if (n > 0) return "Positive";
        if (n < 0) return "Negative";
        return "Zero";
    }
}`
  },
  "TCS-N09": {
    logic: {
      summary: "Sum of first N natural numbers.",
      approach: "Use formula: `N * (N + 1) / 2`.",
      intuition: "Arithmetic progression summation closed-form solution.",
      pseudocode: "return N * (N + 1) / 2",
      dryRun: "N=5 -> 5 * 6 / 2 = 15.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Prevent integer overflow using long type."]
    },
    java: `public class SumNaturalNumbers {
    public static long getSum(int n) {
        return (long) n * (n + 1) / 2;
    }
}`
  },
  "TCS-N10": {
    logic: {
      summary: "Find the sum of an Arithmetic Progression series.",
      approach: "Use AP formula: `n/2 * (2*a + (n-1)*d)`.",
      intuition: "Closed-form summation for linear sequences.",
      pseudocode: "return n * (2*a + (n-1)*d) / 2",
      dryRun: "a=1, d=2, n=3 -> 3 * (2 + 4) / 2 = 9.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Explain parameters.", "Overflow handling."]
    },
    java: `public class SumAPSeries {
    public static double sumAP(double a, double d, int n) {
        return (n / 2.0) * (2 * a + (n - 1) * d);
    }
}`
  },
  "TCS-N11": {
    logic: {
      summary: "Find the sum of a Geometric Progression series.",
      approach: "Use GP formula: `a * (1 - r^n) / (1 - r)`.",
      intuition: "Exponential sequence summation.",
      pseudocode: "return a * (1 - r^n) / (1 - r)",
      dryRun: "a=2, r=2, n=3 -> 2 * (1-8)/(1-2) = 14.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: ["Identify singularity when r=1."]
    },
    java: `public class SumGPSeries {
    public static double sumGP(double a, double r, int n) {
        if (r == 1) return a * n;
        return a * (1 - Math.pow(r, n)) / (1 - r);
    }
}`
  },
  "TCS-N12": {
    logic: {
      summary: "Find the greatest of two numbers.",
      approach: "Compare both using Math.max.",
      intuition: "Max operation.",
      pseudocode: "return a > b ? a : b",
      dryRun: "5, 8 -> 8",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Branchless implementation alternatives."]
    },
    java: `public class GreatestOfTwo {
    public static int greatest(int a, int b) {
        return Math.max(a, b);
    }
}`
  },
  "TCS-N13": {
    logic: {
      summary: "Find the greatest of three numbers.",
      approach: "Nested checks or Math.max(a, Math.max(b, c)).",
      intuition: "Multi-comparison reduction.",
      pseudocode: "max(a, max(b, c))",
      dryRun: "2,9,5 -> max(2, 9) = 9. Returns 9.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Explain comparison steps."]
    },
    java: `public class GreatestOfThree {
    public static int greatest(int a, int b, int c) {
        return Math.max(a, Math.max(b, c));
    }
}`
  },
  "TCS-N14": {
    logic: {
      summary: "Determine if a year is a leap year.",
      approach: "Check if divisible by 400, or divisible by 4 but not 100.",
      intuition: "Gregorian calendar leap rule.",
      pseudocode: "return (y % 400 == 0) or (y % 4 == 0 and y % 100 != 0)",
      dryRun: "2000 -> leap. 1900 -> not leap.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Why is 1900 not a leap year? (Gregorian century rule)."]
    },
    java: `public class LeapYear {
    public static boolean isLeap(int year) {
        return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    }
}`
  },
  "TCS-N16": {
    logic: {
      summary: "Find the maximum and minimum digit in a number.",
      approach: "Parse digits mathematically using mod 10, update running min/max.",
      intuition: "Scan digits and capture bounds.",
      pseudocode: "while n > 0:\n  d = n % 10\n  min = min(min, d), max = max(max, d)\n  n /= 10",
      dryRun: "291 -> min=1, max=9.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: ["Handle negative numbers.", "Explain time complexity relative to digit count."]
    },
    java: `public class MaxMinDigit {
    public static int[] find(int n) {
        n = Math.abs(n);
        int min = 9, max = 0;
        if (n == 0) return new int[]{0, 0};
        while (n > 0) {
            int d = n % 10;
            min = Math.min(min, d);
            max = Math.max(max, d);
            n /= 10;
        }
        return new int[]{min, max};
    }
}`
  },
  "TCS-N18": {
    logic: {
      summary: "Calculate the factorial of a number.",
      approach: "Loop from 1 to n, accumulating products.",
      intuition: "Multiplicative sequence.",
      pseudocode: "fact = 1\nfor i from 1 to n: fact *= i\nreturn fact",
      dryRun: "n=4 -> 1 * 2 * 3 * 4 = 24.",
      time: "O(n)",
      space: "O(1)",
      interviewPoints: ["Explain potential overflow (factorial grows rapidly, use BigInteger for large inputs)."]
    },
    java: `public class Factorial {
    public static long getFactorial(int n) {
        long res = 1;
        for (int i = 1; i <= n; i++) {
            res *= i;
        }
        return res;
    }
}`
  },
  "TCS-N20": {
    logic: {
      summary: "Find all factors of a given number.",
      approach: "Iterate up to sqrt(n). If d divides n, record both d and n/d.",
      intuition: "Divisors mirror each other across sqrt(n).",
      pseudocode: "factors = []\nfor d from 1 to sqrt(n):\n  if n % d == 0: add d, add n/d",
      dryRun: "n=6 -> 1,6,2,3.",
      time: "O(sqrt(n))",
      space: "O(sqrt(n))",
      interviewPoints: ["Why search only up to sqrt(n)?", "Sort factors before returning if required."]
    },
    java: `import java.util.*;

public class FactorsOfNumber {
    public static List<Integer> getFactors(int n) {
        List<Integer> factors = new ArrayList<>();
        for (int i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                factors.add(i);
                if (i * i != n) {
                    factors.add(n / i);
                }
            }
        }
        Collections.sort(factors);
        return factors;
    }
}`
  },
  "TCS-N21": {
    logic: {
      summary: "Print all prime factors of the given number.",
      approach: "Iterate from 2 up to sqrt(n). While n is divisible by divisor, add divisor and divide n.",
      intuition: "Repeated division by smallest factors strips away non-prime multiples.",
      pseudocode: "for d from 2 to sqrt(n):\n  while n % d == 0: add d, n /= d\nif n > 1 add n",
      dryRun: "n=12 -> d=2: adds 2, n=6 -> adds 2, n=3 -> loop ends -> add n=3. Factors: [2, 2, 3].",
      time: "O(sqrt(n))",
      space: "O(log n)",
      interviewPoints: ["Why does dividing out factors guarantee we only collect prime divisors?", "Best-case vs worst-case bounds."]
    },
    java: `import java.util.*;

public class PrimeFactors {
    public static List<Integer> getPrimeFactors(int n) {
        List<Integer> factors = new ArrayList<>();
        for (int d = 2; d * d <= n; d++) {
            while (n % d == 0) {
                factors.add(d);
                n /= d;
            }
        }
        if (n > 1) factors.add(n);
        return factors;
    }
}`
  },
  "TCS-N22": {
    logic: {
      summary: "Check if a number is a strong number.",
      approach: "Sum the factorials of all digits. If the sum equals the original number, it is strong.",
      intuition: "Digit-by-digit factorial sum checking.",
      pseudocode: "sum = 0, temp = n\nwhile temp > 0:\n  sum += fact(temp % 10), temp /= 10\nreturn sum == n",
      dryRun: "n=145 -> 1!+4!+5! = 1+24+120 = 145. Returns true.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: ["Precompute factorials 0-9 in a lookup table for speed.", "Identify range limits."]
    },
    java: `public class StrongNumber {
    private static final int[] FACT = {1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880};
    public static boolean isStrong(int n) {
        int sum = 0, temp = n;
        while (temp > 0) {
            sum += FACT[temp % 10];
            temp /= 10;
        }
        return sum == n;
    }
}`
  },
  "TCS-N23": {
    logic: {
      summary: "Check if a number is Automorphic (square ends with the number itself).",
      approach: "Square the number. Compare trailing digits of square with original number.",
      intuition: "Match modulo 10^k where k is digit length.",
      pseudocode: "sq = n*n\nwhile n > 0:\n  if sq%10 != n%10 return false\n  sq /= 10, n /= 10\nreturn true",
      dryRun: "n=25 -> sq=625. Trailing matches 25. Returns true.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: ["Discuss integer overflow bounds on squares (use long)."]
    },
    java: `public class AutomorphicNumber {
    public static boolean isAutomorphic(int n) {
        long sq = (long) n * n;
        int temp = n;
        while (temp > 0) {
            if (sq % 10 != temp % 10) return false;
            sq /= 10;
            temp /= 10;
        }
        return true;
    }
}`
  },
  "TCS-N25": {
    logic: {
      summary: "LCM of two numbers.",
      approach: "LCM formula: `(a * b) / GCD(a, b)`.",
      intuition: "LCM correlates directly to GCD.",
      pseudocode: "return (a * b) / gcd(a, b)",
      dryRun: "4, 6 -> gcd(4,6)=2. LCM = 24 / 2 = 12.",
      time: "O(log(min(a, b)))",
      space: "O(1)",
      interviewPoints: ["Why divide before multiplying to prevent overflow? `(a / gcd(a,b)) * b`."]
    },
    java: `public class LCMOfTwo {
    public static int lcm(int a, int b) {
        return (a / gcd(a, b)) * b;
    }
    private static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}`
  },
  "TCS-N26": {
    logic: {
      summary: "Check if a number is a Harshad number.",
      approach: "Sum the digits of the number. If the number is divisible by this sum, return true.",
      intuition: "Digit sum divisor check.",
      pseudocode: "sum = digitSum(n)\nreturn n % sum == 0",
      dryRun: "n=18 -> sum=9. 18 % 9 == 0 -> true.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: ["What constitutes a Harshad/Niven number?"]
    },
    java: `public class HarshadNumber {
    public static boolean isHarshad(int n) {
        int sum = 0, temp = n;
        while (temp > 0) {
            sum += temp % 10;
            temp /= 10;
        }
        return n % sum == 0;
    }
}`
  },
  "TCS-N27": {
    logic: {
      summary: "Check if a number is an abundant number.",
      approach: "Calculate sum of all proper divisors. If sum > n, it is abundant.",
      intuition: "Sum of divisors exceeding value threshold.",
      pseudocode: "sum = sumDivisors(n) - n\nreturn sum > n",
      dryRun: "n=12 -> divisors sum = 1+2+3+4+6 = 16 > 12 -> true.",
      time: "O(sqrt(n))",
      space: "O(1)",
      interviewPoints: ["Compare with deficient and perfect numbers."]
    },
    java: `public class AbundantNumber {
    public static boolean isAbundant(int n) {
        int sum = 1;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                sum += i;
                if (i * i != n) {
                    sum += n / i;
                }
            }
        }
        return sum > n;
    }
}`
  },
  "TCS-N29": {
    logic: {
      summary: "Sum of numbers in the given range.",
      approach: "Use formula: `sum(1 to R) - sum(1 to L-1)`.",
      intuition: "Sequence difference math formulation.",
      pseudocode: "return sum(R) - sum(L-1)",
      dryRun: "L=2, R=4 -> sum(4)-sum(1) = 10 - 1 = 9. (2+3+4=9).",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Closed-form vs loop summation."]
    },
    java: `public class RangeSum {
    public static long getSum(int L, int R) {
        return sumToN(R) - sumToN(L - 1);
    }
    private static long sumToN(long n) {
        return n * (n + 1) / 2;
    }
}`
  },
  "TCS-N30": {
    logic: {
      summary: "Calculate permutations of N people in R seats.",
      approach: "Calculate `N! / (N - R)!`.",
      intuition: "Standard permutation equation.",
      pseudocode: "return fact(N) / fact(N-R)",
      dryRun: "N=5, R=3 -> 120 / 2 = 60.",
      time: "O(N)",
      space: "O(1)",
      interviewPoints: ["Discuss numeric limits."]
    },
    java: `public class PermutationsSeats {
    public static long permutations(int n, int r) {
        long res = 1;
        for (int i = n; i > n - r; i--) {
            res *= i;
        }
        return res;
    }
}`
  },
  "TCS-N32": {
    logic: {
      summary: "Replace all 0s with 1s in a given integer.",
      approach: "Convert to string and replace, or process arithmetically.",
      intuition: "Digit replacement on integers.",
      pseudocode: "return parseInt(toString(n).replace('0','1'))",
      dryRun: "1020 -> 1121.",
      time: "O(log n)",
      space: "O(log n) string storage",
      interviewPoints: ["Explain arithmetic conversion alternative."]
    },
    java: `public class ReplaceZeroWithOne {
    public static int replace(int n) {
        if (n == 0) return 1;
        int ans = 0, place = 1;
        while (n > 0) {
            int d = n % 10;
            if (d == 0) d = 1;
            ans += d * place;
            place *= 10;
            n /= 10;
        }
        return ans;
    }
}`
  },
  "TCS-N33": {
    logic: {
      summary: "Check if a number can be expressed as sum of two primes.",
      approach: "Sieve to find primes up to n. Loop and check if both i and n-i are prime.",
      intuition: "Goldbach's conjecture check.",
      pseudocode: "sieve = primesUpTo(n)\nfor i from 2 to n/2:\n  if sieve[i] and sieve[n-i]: return true",
      dryRun: "n=4 -> 2 + 2 = 4 (both prime) -> true.",
      time: "O(n log log n)",
      space: "O(n)",
      interviewPoints: ["Sieve boundaries."]
    },
    java: `public class SumOfTwoPrimes {
    public static boolean check(int n) {
        boolean[] isPrime = new boolean[n + 1];
        java.util.Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        for (int p = 2; p * p <= n; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i <= n; i += p) isPrime[i] = false;
            }
        }
        for (int i = 2; i <= n / 2; i++) {
            if (isPrime[i] && isPrime[n - i]) return true;
        }
        return false;
    }
}`
  },
  "TCS-N34": {
    logic: {
      summary: "Calculate the area of a circle.",
      approach: "Formula: `PI * r * r`.",
      intuition: "Circle area formula.",
      pseudocode: "return Math.PI * r * r",
      dryRun: "r=5 -> Area = PI * 25 = 78.54.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Explain PI precision levels."]
    },
    java: `public class CircleArea {
    public static double getArea(double r) {
        return Math.PI * r * r;
    }
}`
  },
  "TCS-N35": {
    logic: {
      summary: "Find the roots of a Quadratic Equation.",
      approach: "Calculate determinant `D = b^2 - 4*a*c`. Check real vs imaginary roots.",
      intuition: "Quadratic formula.",
      pseudocode: "quadratic roots calculation",
      dryRun: "x^2 - 5x + 6 = 0 -> roots 3 and 2.",
      time: "O(1)",
      space: "O(1)",
      interviewPoints: ["Handling D < 0 imaginary numbers."]
    },
    java: `public class QuadraticRoots {
    public static double[] findRoots(double a, double b, double c) {
        double d = b * b - 4 * a * c;
        if (d < 0) return new double[0]; // imaginary roots
        double r1 = (-b + Math.sqrt(d)) / (2 * a);
        double r2 = (-b - Math.sqrt(d)) / (2 * a);
        return new double[]{r1, r2};
    }
}`
  },
  "TCS-NS01": {
    logic: {
      summary: "Convert Binary to Decimal.",
      approach: "Integer.parseInt(s, 2).",
      intuition: "Weighted digits conversion.",
      pseudocode: "ans = 0\nfor each char: ans = ans*2 + bit",
      dryRun: "'101' -> 1*4 + 0*2 + 1*1 = 5.",
      time: "O(L)",
      space: "O(1)",
      interviewPoints: ["Radix base conversion."]
    },
    java: `public class BinaryToDecimal {
    public static int convert(String s) {
        return Integer.parseInt(s, 2);
    }
}`
  },
  "TCS-NS02": {
    logic: {
      summary: "Convert Binary to Octal.",
      approach: "Parse binary to decimal, convert decimal to octal using `Integer.toOctalString`.",
      intuition: "Pivot through base 10.",
      pseudocode: "return toOctalString(parseInt(s, 2))",
      dryRun: "'1100' -> dec 12 -> octal '14'.",
      time: "O(L)",
      space: "O(1)",
      interviewPoints: ["Base mappings."]
    },
    java: `public class BinaryToOctal {
    public static String convert(String s) {
        int dec = Integer.parseInt(s, 2);
        return Integer.toOctalString(dec);
    }
}`
  },
  "TCS-NS03": {
    logic: {
      summary: "Convert Decimal to Binary.",
      approach: "Integer.toBinaryString(n).",
      intuition: "Division by 2 remainder loop.",
      pseudocode: "return toBinary(n)",
      dryRun: "5 -> '101'.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: ["Explain bit string allocation."]
    },
    java: `public class DecimalToBinary {
    public static String convert(int n) {
        return Integer.toBinaryString(n);
    }
}`
  },
  "TCS-NS04": {
    logic: {
      summary: "Convert Decimal to Octal.",
      approach: "Integer.toOctalString(n).",
      intuition: "Division by 8 remainder loop.",
      pseudocode: "return toOctal(n)",
      dryRun: "12 -> '14'.",
      time: "O(log n)",
      space: "O(1)",
      interviewPoints: ["Radix divisions."]
    },
    java: `public class DecimalToOctal {
    public static String convert(int n) {
        return Integer.toOctalString(n);
    }
}`
  },
  "TCS-NS05": {
    logic: {
      summary: "Convert Octal to Binary.",
      approach: "Parse octal to decimal, convert decimal to binary string.",
      intuition: "Pivot through base 10.",
      pseudocode: "toBinary(parseInt(s, 8))",
      dryRun: "'14' -> dec 12 -> binary '1100'.",
      time: "O(L)",
      space: "O(1)",
      interviewPoints: ["Base transitions."]
    },
    java: `public class OctalToBinary {
    public static String convert(String s) {
        int dec = Integer.parseInt(s, 8);
        return Integer.toBinaryString(dec);
    }
}`
  },
  "TCS-NS06": {
    logic: {
      summary: "Convert Octal to Decimal.",
      approach: "Integer.parseInt(s, 8).",
      intuition: "Base 8 weighted addition.",
      pseudocode: "return parseInt(s, 8)",
      dryRun: "'14' -> 1*8 + 4 = 12.",
      time: "O(L)",
      space: "O(1)",
      interviewPoints: ["Explain parsing bases."]
    },
    java: `public class OctalToDecimal {
    public static int convert(String s) {
        return Integer.parseInt(s, 8);
    }
}`
  }
};
