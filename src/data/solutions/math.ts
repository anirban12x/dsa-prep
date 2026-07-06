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
  "TCS-N24": {
    logic: {
      summary: "Find GCD (Greatest Common Divisor) of two numbers.",
      approach: "Euclidean algorithm: repeat `gcd(b, a % b)` until b becomes 0. The remaining a is the GCD.",
      intuition: "The GCD of two numbers also divides their difference. This allows reduction of the larger number via modulo.",
      pseudocode: "while b != 0:\n  temp = b\n  b = a % b\n  a = temp\nreturn a",
      dryRun: "a = 36, b = 60\n36, 60 -> a=60, b=36 -> a=36, b=24 -> a=24, b=12 -> a=12, b=0. Returns 12.",
      time: "O(log(min(a, b)))",
      space: "O(1)",
      interviewPoints: ["Euclidean algorithm proof", "GCD connection to LCM: a * b = gcd(a,b) * lcm(a,b)"]
    },
    java: `import java.util.*;

public class GCD {
    public static int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a and b: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println("GCD: " + gcd(a, b));
        sc.close();
    }
}`
  }
};
