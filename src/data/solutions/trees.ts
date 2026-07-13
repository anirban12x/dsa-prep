import type { QuestionLogic } from "../types";

export const TREE_SOLUTIONS: Record<string, { logic: QuestionLogic; java: string }> = {
  "LC-226": {
    logic: {
      summary: "Invert a binary tree (mirror it).",
      approach: "Recursive Depth First Search (DFS). Swap left and right child pointers of the current node, then recursively invert the left and right subtrees.",
      intuition: "Mirroring a tree means reversing the left and right subtrees at every level. A post-order or pre-order traversal works perfectly.",
      pseudocode: "invert(node):\n  if node == null return null\n  temp = node.left\n  node.left = invert(node.right)\n  node.right = invert(temp)\n  return node",
      dryRun: "Root = [4,2,7]\nInvert node 4: swaps children 2 and 7.\nInverts node 7, inverts node 2.\nResult tree: [4,7,2].",
      time: "O(n) where n is number of nodes",
      space: "O(h) where h is height of tree (due to call stack)",
      interviewPoints: ["Explain recursive call stack space complexity (worst case O(n) for skewed tree, best case O(log n) for balanced tree)", "Discuss iterative solution using a Queue (BFS)."]
    },
    java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

public class InvertBinaryTree {
    public static TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
        return root;
    }

    public static void main(String[] args) {
        // Visual representation test
        TreeNode root = new TreeNode(4);
        root.left = new TreeNode(2);
        root.right = new TreeNode(7);
        TreeNode res = invertTree(root);
        System.out.println("Inverted Root Value: " + res.val);
        System.out.println("Left child: " + res.left.val + ", Right child: " + res.right.val);
    }
}`
  },
  "LC-104": {
    logic: {
      summary: "Find the maximum depth (height) of a binary tree.",
      approach: "Recursive DFS: depth of a node is 1 + max(depth of left child, depth of right child). Base case is 0 for null nodes.",
      intuition: "The height of any node is determined by the longer path of its children.",
      pseudocode: "maxDepth(root):\n  if root == null return 0\n  return 1 + max(maxDepth(root.left), maxDepth(root.right))",
      dryRun: "Tree = [3,9,20,null,null,15,7]\nDepth(15)=1, Depth(7)=1. Depth(20) = 1 + max(1,1) = 2.\nDepth(9)=1. Depth(3) = 1 + max(1, 2) = 3. Returns 3.",
      time: "O(n)",
      space: "O(h) call stack",
      interviewPoints: ["Compare DFS vs BFS (iterative level-order traversal) for height calculation.", "What is the space complexity if the tree is extremely deep/skewed?"]
    },
    java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

public class MaxDepthBinaryTree {
    public static int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        System.out.println("Max depth: " + maxDepth(root));
    }
}`
  },
  "LC-100": {
    logic: {
      summary: "Check if two binary trees are identical in structure and node values.",
      approach: "Recursion: two trees are same if their roots match, their left subtrees match, and their right subtrees match.",
      intuition: "Compare roots. If both null, true; if one null, false; if value mismatch, false. Recursively check children.",
      pseudocode: "isSame(p, q):\n  if p == null and q == null return true\n  if p == null or q == null return false\n  if p.val != q.val return false\n  return isSame(p.left, q.left) and isSame(p.right, q.right)",
      dryRun: "p = [1,2], q = [1,2]. roots match (1). p.left (2) and q.left (2) match. Rights match (null). Returns true.",
      time: "O(min(n, m))",
      space: "O(min(h1, h2))",
      interviewPoints: ["Base cases logic structure", "Iterative equivalent using standard Queue"]
    },
    java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

public class SameTree {
    public static boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }

    public static void main(String[] args) {
        TreeNode p = new TreeNode(1); p.left = new TreeNode(2);
        TreeNode q = new TreeNode(1); q.left = new TreeNode(2);
        System.out.println("Are same? " + isSameTree(p, q));
    }
}`
  },
  "LC-208": {
    logic: {
      summary: "Implement a Trie (Prefix Tree) with insert, search, and startsWith methods.",
      approach: "Use a TrieNode class containing an array of 26 TrieNode pointers (for 'a'-'z') and a boolean flag `isEndOfWord`.",
      intuition: "Each node represents a character. Nodes share common prefixes, allowing quick insertion and retrieval of prefixes in O(L) time where L is word length.",
      pseudocode: "class TrieNode:\n  TrieNode[] children = new TrieNode[26]\n  boolean isWord = false\n\ninsert(word):\n  curr = root\n  for c in word:\n    if curr.children[c - 'a'] == null: curr.children[c - 'a'] = new TrieNode()\n    curr = curr.children[c - 'a']\n  curr.isWord = true",
      dryRun: "insert('apple'). Creates nodes 'a'->'p'->'p'->'l'->'e'. Sets 'e' word flag to true. search('app') returns false because word flag is not set on 'p', startsWith('app') returns true because prefix exists.",
      time: "O(L) for insert, search, startsWith",
      space: "O(N * L) where N is number of words, L is average length",
      interviewPoints: ["Space optimization (HashMap children instead of 26-size array for sparse trees)", "Use cases of Trie (autocomplete, spelling checkers)"]
    },
    java: `import java.util.*;

class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEndOfWord = false;
}

public class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return curr.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return true;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("apple");
        System.out.println("Search apple: " + trie.search("apple")); // true
        System.out.println("Search app: " + trie.search("app"));     // false
        System.out.println("StartsWith app: " + trie.startsWith("app")); // true
    }
}`
  },
  "LC-98": {
    logic: {
      summary: "Validate if a binary tree is a valid Binary Search Tree (BST).",
      approach: "Recursive Depth First Search (DFS). Pass lower and upper bounds (min and max) to each recursive call. For a node to be valid, its value must be strictly within (min, max).",
      intuition: "For any node, all nodes in its left subtree must be strictly less than it, and all nodes in its right subtree must be strictly greater than it. Carrying min/max bounds validates this constraint.",
      pseudocode: "isValid(node, min, max):\n  if node is null return true\n  if node.val <= min or node.val >= max return false\n  return isValid(node.left, min, node.val) and isValid(node.right, node.val, max)\nisValid(root, -infinity, +infinity)",
      dryRun: "Root = [2, 1, 3]\nisValid(2, -inf, inf)\n  isValid(1, -inf, 2) -> returns true\n  isValid(3, 2, inf) -> returns true. Returns true.",
      time: "O(n)",
      space: "O(h) call stack depth",
      interviewPoints: [
        "Why can't we just compare a node with its immediate children? (Because a child's descendant could violate constraints higher up).",
        "How to handle integer overflow boundaries? (Use Long or Object wrapper nulls).",
        "Discuss iterative inorder traversal solution (values must be strictly increasing)."
      ]
    },
    java: `public class ValidateBST {
    public static boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
    
    private static boolean validate(TreeNode node, Integer min, Integer max) {
        if (node == null) return true;
        if ((min != null && node.val <= min) || (max != null && node.val >= max)) {
            return false;
        }
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
}`
  },
  "LC-102": {
    logic: {
      summary: "Return the level order traversal of a binary tree's nodes' values.",
      approach: "Breadth First Search (BFS) using a Queue. Add root to queue. Loop while queue is not empty, recording size of current level. Process all nodes of current level and enqueue their children.",
      intuition: "Queue naturally processes nodes in first-in first-out order. Level size tracking isolates levels.",
      pseudocode: "queue = [root], res = []\nwhile queue is not empty:\n  levelSize = queue.size, currentLevel = []\n  for i in levelSize:\n    curr = queue.pop()\n    currentLevel.add(curr.val)\n    if curr.left: queue.push(curr.left)\n    if curr.right: queue.push(curr.right)\n  res.add(currentLevel)",
      dryRun: "Tree = [3,9,20,null,null,15,7]\nQ=[3]. level 0: val=[3], Q=[9, 20]\nQ=[9,20]. level 1: val=[9, 20], Q=[15, 7]\nQ=[15,7]. level 2: val=[15, 7], Q=[]. Returns [[3], [9, 20], [15, 7]].",
      time: "O(n)",
      space: "O(n) for queue and result storage",
      interviewPoints: [
        "Explain queue space complexity (at most O(n/2) leaf nodes at lowest level).",
        "How would you solve this recursively using DFS? (Pass level depth and append to correct list).",
        "Verify null root edge cases."
      ]
    },
    java: `import java.util.*;

public class LevelOrderTraversal {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode curr = queue.poll();
                currentLevel.add(curr.val);
                if (curr.left != null) queue.add(curr.left);
                if (curr.right != null) queue.add(curr.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}`
  },
  "LC-110": {
    logic: {
      summary: "Determine if a binary tree is height-balanced.",
      approach: "Recursive height function. A binary tree is height-balanced if left and right heights differ by at most 1, and both subtrees are balanced. Propagate -1 upward if unbalanced.",
      intuition: "Instead of recalculating height at each node (O(n^2)), check balance state during the post-order height calculation (O(n)).",
      pseudocode: "height(node):\n  if node is null return 0\n  lh = height(node.left)\n  rh = height(node.right)\n  if lh == -1 or rh == -1 or abs(lh - rh) > 1 return -1\n  return 1 + max(lh, rh)\nreturn height(root) != -1",
      dryRun: "Tree = [1,2,null,3]\nheight(3) = 1. height(2) = 1 + max(1, 0) = 2. height(null) = 0.\nRoot: diff = 2 - 0 = 2 > 1 -> returns -1. Unbalanced.",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Explain the advantage of returning -1 compared to separate height and balance checks.",
        "Compare height balanced vs skew trees.",
        "Verify stack depth."
      ]
    },
    java: `public class BalancedBinaryTree {
    public static boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }
    
    private static int checkHeight(TreeNode node) {
        if (node == null) return 0;
        int leftHeight = checkHeight(node.left);
        if (leftHeight == -1) return -1;
        int rightHeight = checkHeight(node.right);
        if (rightHeight == -1) return -1;
        
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        return 1 + Math.max(leftHeight, rightHeight);
    }
}`
  },
  "LC-124": {
    logic: {
      summary: "Find the maximum path sum in a binary tree.",
      approach: "Recursive DFS (post-order). At each node, calculate the maximum single path contribution (left or right). Update the global maximum using left contribution + right contribution + current node's value.",
      intuition: "A path can only branch at one node. Any child subtree contribution must be non-negative (ignore if negative).",
      pseudocode: "maxSum = -infinity\ndfs(node):\n  if node is null return 0\n  leftGain = max(dfs(node.left), 0)\n  rightGain = max(dfs(node.right), 0)\n  maxSum = max(maxSum, node.val + leftGain + rightGain)\n  return node.val + max(leftGain, rightGain)\ndfs(root)",
      dryRun: "Tree = [-10,9,20,null,null,15,7]\ndfs(15)=15, dfs(7)=7. Node 20: gains=15, 7 -> sum = 20+15+7 = 42. globalMax=42. Return 20+15=35.\nNode 9: gains=0 -> sum = 9. Return 9.\nRoot (-10): gains=9, 35 -> sum = -10+9+35 = 34. Returns globalMax (42).",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Why do we return `node.val + max(left, right)` but update max sum with `left + right + node.val`?",
        "How to handle negative node values.",
        "Can a path have only one node? Yes."
      ]
    },
    java: `public class MaxPathSum {
    private static int maxSum;

    public static int maxPathSum(TreeNode root) {
        maxSum = Integer.MIN_VALUE;
        dfs(root);
        return maxSum;
    }

    private static int dfs(TreeNode node) {
        if (node == null) return 0;
        int leftGain = Math.max(dfs(node.left), 0);
        int rightGain = Math.max(dfs(node.right), 0);
        
        int currentPathSum = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, currentPathSum);
        
        return node.val + Math.max(leftGain, rightGain);
    }
}`
  },
  "LC-230": {
    logic: {
      summary: "Find the kth smallest element in a Binary Search Tree.",
      approach: "Inorder traversal. Since inorder traversal of a BST visits elements in strictly increasing order, we can perform traversal and return the kth node visited.",
      intuition: "Exploit BST sorting property. Traversal order matches sorted order.",
      pseudocode: "stack = [], curr = root\nwhile curr or stack:\n  while curr: stack.push(curr), curr = curr.left\n  curr = stack.pop()\n  k--\n  if k == 0 return curr.val\n  curr = curr.right",
      dryRun: "Tree = [3,1,4,null,2], k=1\nstack=[3, 1]. pop 1. k=0 -> return 1.",
      time: "O(h + k) which is O(log n + k) in balanced trees",
      space: "O(h) stack depth",
      interviewPoints: [
        "Explain benefits of iterative traversal (allows early termination).",
        "How would you optimize if the tree is frequently modified? (Store node count in each subtree to find kth element in O(log n)).",
        "Compare stack space in skew trees."
      ]
    },
    java: `import java.util.*;

public class KthSmallestBST {
    public static int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            k--;
            if (k == 0) return curr.val;
            curr = curr.right;
        }
        return -1;
    }
}`
  },
  "LC-235": {
    logic: {
      summary: "Find the Lowest Common Ancestor (LCA) of two nodes in a BST.",
      approach: "Iterative BST search. Start from root. If both p and q are smaller than current node, go left. If both are larger, go right. Otherwise, current node is the LCA.",
      intuition: "In a BST, the LCA is the split point where p and q lie in different subtrees (or one node is the root itself).",
      pseudocode: "curr = root\nwhile curr:\n  if p.val < curr.val and q.val < curr.val: curr = curr.left\n  else if p.val > curr.val and q.val > curr.val: curr = curr.right\n  else return curr",
      dryRun: "BST=[6,2,8,0,4], p=2, q=8\nStart root 6. 2 < 6 and 8 > 6 -> no split. Returns root 6.",
      time: "O(h) which is O(log n) average",
      space: "O(1) iterative",
      interviewPoints: [
        "Why is the space complexity O(1) in the iterative approach?",
        "Compare with LCA in a general binary tree.",
        "Confirm that nodes p and q are guaranteed to exist in the tree."
      ]
    },
    java: `public class LcaBST {
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode curr = root;
        while (curr != null) {
            if (p.val < curr.val && q.val < curr.val) {
                curr = curr.left;
            } else if (p.val > curr.val && q.val > curr.val) {
                curr = curr.right;
            } else {
                return curr;
            }
        }
        return null;
    }
}`
  },
  "LC-543": {
    logic: {
      summary: "Find the length of the diameter (longest path between any two nodes) of a binary tree.",
      approach: "Recursive height function. For any node, the diameter passing through it is `leftHeight + rightHeight`. Keep track of the maximum sum seen, and return `1 + max(leftHeight, rightHeight)`.",
      intuition: "The longest path doesn't necessarily pass through the root. It branches at some node, where its path length is the sum of left and right heights.",
      pseudocode: "maxDiameter = 0\nheight(node):\n  if node is null return 0\n  lh = height(node.left)\n  rh = height(node.right)\n  maxDiameter = max(maxDiameter, lh + rh)\n  return 1 + max(lh, rh)\nheight(root)",
      dryRun: "Tree = [1,2,3,4,5]\nheight(4)=1, height(5)=1. Node 2: diam=2. height=2.\nNode 3: diam=0. height=1. Root 1: diam=2+1=3. Returns maxDiameter (3).",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Why does the height return `1 + max` but diameter adds `lh + rh`?",
        "Define diameter in terms of edges vs nodes.",
        "Discuss space complexity on skewed trees."
      ]
    },
    java: `public class DiameterBinaryTree {
    private static int maxDiameter;

    public static int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        checkHeight(root);
        return maxDiameter;
    }

    private static int checkHeight(TreeNode node) {
        if (node == null) return 0;
        int left = checkHeight(node.left);
        int right = checkHeight(node.right);
        maxDiameter = Math.max(maxDiameter, left + right);
        return 1 + Math.max(left, right);
    }
}`
  },
  "LC-572": {
    logic: {
      summary: "Check if a binary tree is a subtree of another binary tree.",
      approach: "Recursive traversal. For each node in tree s, check if it matches subRoot using isSameTree. If not, recursively check s.left and s.right.",
      intuition: "A tree contains a subtree if they have matching structural roots, or if either child subtree matches the subRoot.",
      pseudocode: "isSubtree(root, subRoot):\n  if root is null return false\n  if isSame(root, subRoot) return true\n  return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)",
      dryRun: "s=[3,4,5,1,2], sub=[4,1,2]\nisSame(3, 4) is false -> isSubtree(4, sub) || isSubtree(5, sub)\nisSame(4, sub) -> isSame(1,1) && isSame(2,2) -> true. Returns true.",
      time: "O(n * m) where n, m are node counts of both trees",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Discuss string serialization approach: serialize both trees and check substring (O(n + m) time/space).",
        "Consider boundary checks when root or subRoot are null.",
        "Compare time complexity of both approaches."
      ]
    },
    java: `public class SubtreeOfAnother {
    public static boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false;
        if (isSame(root, subRoot)) return true;
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }

    private static boolean isSame(TreeNode s, TreeNode t) {
        if (s == null && t == null) return true;
        if (s == null || t == null) return false;
        if (s.val != t.val) return false;
        return isSame(s.left, t.left) && isSame(s.right, t.right);
    }
}`
  },
  "LC-94": {
    logic: {
      summary: "Return the inorder traversal of a binary tree's nodes' values.",
      approach: "Recursive DFS. Visit left child, record current node value, and visit right child.",
      intuition: "Inorder traversal visits nodes in left-root-right order.",
      pseudocode: "inorder(node):\n  if node is null return\n  inorder(node.left)\n  res.add(node.val)\n  inorder(node.right)",
      dryRun: "Tree = [1,null,2,3]\ninorder(1): inorder(null) -> visit 1 -> inorder(2).\n  inorder(2): inorder(3) -> visit 3 -> inorder(null) -> visit 2. Returns [1, 3, 2].",
      time: "O(n)",
      space: "O(h) call stack depth",
      interviewPoints: [
        "Discuss iterative inorder traversal using a Stack.",
        "Explain Morris traversal for O(1) space complexity.",
        "Time complexity comparison."
      ]
    },
    java: `import java.util.*;

public class InorderTraversal {
    public static List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        traverse(root, result);
        return result;
    }
    
    private static void traverse(TreeNode node, List<Integer> list) {
        if (node == null) return;
        traverse(node.left, list);
        list.add(node.val);
        traverse(node.right, list);
    }
}`
  },
  "LC-101": {
    logic: {
      summary: "Check if a binary tree is symmetric (a mirror of itself).",
      approach: "Recursive comparison. A tree is symmetric if its left and right subtrees are mirrors of each other. Verify `left.val == right.val` and recursively mirror checks.",
      intuition: "For mirroring: left child's left matches right child's right, and left child's right matches right child's left.",
      pseudocode: "isMirror(t1, t2):\n  if t1 is null and t2 is null return true\n  if t1 is null or t2 is null return false\n  return t1.val == t2.val and isMirror(t1.left, t2.right) and isMirror(t1.right, t2.left)\nisMirror(root.left, root.right)",
      dryRun: "Tree = [1,2,2,3,4,4,3]\nisMirror(2, 2)\n  isMirror(3, 3) -> true\n  isMirror(4, 4) -> true. Returns true.",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Discuss iterative solution using a Queue.",
        "Compare isMirror with isSameTree.",
        "Analyze memory performance."
      ]
    },
    java: `public class SymmetricTree {
    public static boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }

    private static boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        return (t1.val == t2.val)
            && isMirror(t1.left, t2.right)
            && isMirror(t1.right, t2.left);
    }
}`
  },
  "LC-236": {
    logic: {
      summary: "Find the Lowest Common Ancestor (LCA) of two nodes in a binary tree.",
      approach: "Recursive DFS. Search for nodes p and q in subtrees. If a subtree contains a target, return it. If left search and right search both return non-null, current node is the LCA.",
      intuition: "LCA is the node where search paths for p and q split (one left, one right). If both are in one subtree, LCA is in that subtree.",
      pseudocode: "lca(node):\n  if node is null or node == p or node == q return node\n  left = lca(node.left)\n  right = lca(node.right)\n  if left and right return node\n  return left ? left : right",
      dryRun: "Tree = [3,5,1], p=5, q=1\nlca(3):\n  lca(5) -> returns 5\n  lca(1) -> returns 1\n  left(5) and right(1) are non-null -> return root 3.",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Explain when a node can be an ancestor of itself (e.g. if node == p, search stops, which is correct since q must be in its descendants if p is the LCA).",
        "Discuss iterative approach using parent pointers HashMap.",
        "Handle case where nodes are not guaranteed to exist in the tree."
      ]
    },
    java: `public class LcaBinaryTree {
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        
        if (left != null && right != null) {
            return root;
        }
        return left != null ? left : right;
    }
}`
  },
  "LC-105": {
    logic: {
      summary: "Construct a binary tree from preorder and inorder traversals.",
      approach: "Recursive divide and conquer. Use a HashMap to index inorder values. The first element of preorder is the root. Locate its index in inorder array to split into left and right subtrees recursively.",
      intuition: "Preorder traversal visits root first, then left, then right. Inorder traversal visits left first, then root, then right. Combining both allows unique reconstruction of tree structure.",
      pseudocode: "inMap = HashMap(inorderIndices)\nbuild(preStart, inStart, inEnd):\n  if preStart > max or inStart > inEnd return null\n  rootVal = preorder[preStart]\n  root = Node(rootVal)\n  idx = inMap[rootVal]\n  root.left = build(preStart + 1, inStart, idx - 1)\n  root.right = build(preStart + (idx - inStart) + 1, idx + 1, inEnd)\n  return root\nbuild(0, 0, inorder.length - 1)",
      dryRun: "preorder=[3,9,20], inorder=[9,3,20]\nbuild(0, 0, 2): root=3, idx=1 (index of 3 in inorder).\n  root.left = build(1, 0, 0) -> root=9, returns 9.\n  root.right = build(2, 2, 2) -> root=20, returns 20. Returns tree 3(9,20).",
      time: "O(n)",
      space: "O(n) for HashMap and recursion stack",
      interviewPoints: [
        "Why is HashMap used? (optimizes inorder index lookup from O(n) to O(1)).",
        "Can we construct a tree with only preorder? No, we need at least one inorder or postorder to separate left and right boundaries.",
        "Discuss recursive stack footprints."
      ]
    },
    java: `import java.util.*;

public class ConstructTreePreIn {
    private static int preIdx;
    private static Map<Integer, Integer> inMap;

    public static TreeNode buildTree(int[] preorder, int[] inorder) {
        preIdx = 0;
        inMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return build(preorder, 0, inorder.length - 1);
    }

    private static TreeNode build(int[] preorder, int inStart, int inEnd) {
        if (inStart > inEnd) return null;
        
        int rootVal = preorder[preIdx++];
        TreeNode root = new TreeNode(rootVal);
        int idx = inMap.get(rootVal);
        
        root.left = build(preorder, inStart, idx - 1);
        root.right = build(preorder, idx + 1, inEnd);
        return root;
    }
}`
  },
  "LC-144": {
    logic: {
      summary: "Return the preorder traversal of a binary tree's nodes' values.",
      approach: "Recursive DFS. Visit the current node, recursively traverse left subtree, and recursively traverse right subtree.",
      intuition: "Preorder traversal visits nodes in root-left-right order.",
      pseudocode: "preorder(node):\n  if node is null return\n  res.add(node.val)\n  preorder(node.left)\n  preorder(node.right)",
      dryRun: "Tree=[1,null,2] -> visit 1 -> preorder(null) -> preorder(2) -> visit 2. Returns [1, 2].",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Explain iterative preorder traversal using a Stack.",
        "Compare preorder vs inorder traversals.",
        "Discuss Morris traversal for O(1) space."
      ]
    },
    java: `import java.util.*;

public class PreorderTraversal {
    public static List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        traverse(root, result);
        return result;
    }

    private static void traverse(TreeNode node, List<Integer> list) {
        if (node == null) return;
        list.add(node.val);
        traverse(node.left, list);
        traverse(node.right, list);
    }
}`
  },
  "LC-145": {
    logic: {
      summary: "Return the postorder traversal of a binary tree's nodes' values.",
      approach: "Recursive DFS. Recursively traverse left subtree, recursively traverse right subtree, and visit the current node.",
      intuition: "Postorder traversal visits nodes in left-right-root order.",
      pseudocode: "postorder(node):\n  if node is null return\n  postorder(node.left)\n  postorder(node.right)\n  res.add(node.val)",
      dryRun: "Tree=[1,null,2] -> postorder(null) -> postorder(2) -> visit 2 -> visit 1. Returns [2, 1].",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Explain iterative postorder traversal using a Stack.",
        "Discuss typical use cases for postorder traversal (deleting tree, finding height).",
        "Compare stack allocations."
      ]
    },
    java: `import java.util.*;

public class PostorderTraversal {
    public static List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        traverse(root, result);
        return result;
    }

    private static void traverse(TreeNode node, List<Integer> list) {
        if (node == null) return;
        traverse(node.left, list);
        traverse(node.right, list);
        list.add(node.val);
    }
}`
  },
  "LC-103": {
    logic: {
      summary: "Return the zigzag level order traversal of a binary tree's nodes' values.",
      approach: "BFS using a Queue. Keep track of current level size. For each level, add elements to a LinkedList: add to back if traversing left-to-right, add to front if traversing right-to-left. Toggle direction flag at each level.",
      intuition: "Alternate insertion directions in list to simulate zigzag pathing without reversing list elements explicitly.",
      pseudocode: "Q = [root], res = [], leftToRight = true\nwhile Q:\n  level = LinkedList(), size = Q.size\n  for i in size:\n    curr = Q.pop()\n    if leftToRight: level.addLast(curr.val)\n    else: level.addFirst(curr.val)\n    if curr.left: Q.push(curr.left)\n    if curr.right: Q.push(curr.right)\n  res.add(level), leftToRight = not leftToRight",
      dryRun: "Tree=[3,9,20]. Q=[3]. level 0(L->R): val=[3], Q=[9,20]\nQ=[9,20]. level 1(R->L): val=[20, 9] (add 9 then 20 to front), Q=[]\nReturns [[3], [20, 9]].",
      time: "O(n)",
      space: "O(n) for queue and result storage",
      interviewPoints: [
        "Why LinkedList is preferred over ArrayList? (ArrayList requires O(n) shifts for addFirst, whereas LinkedList takes O(1)).",
        "Discuss DFS alternative solution.",
        "Verify empty root node handling."
      ]
    },
    java: `import java.util.*;

public class ZigzagLevelOrder {
    public static List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        boolean leftToRight = true;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            LinkedList<Integer> currentLevel = new LinkedList<>();
            for (int i = 0; i < size; i++) {
                TreeNode curr = queue.poll();
                if (leftToRight) {
                    currentLevel.addLast(curr.val);
                } else {
                    currentLevel.addFirst(curr.val);
                }
                if (curr.left != null) queue.add(curr.left);
                if (curr.right != null) queue.add(curr.right);
            }
            result.add(currentLevel);
            leftToRight = !leftToRight;
        }
        return result;
    }
}`
  },
  "LC-107": {
    logic: {
      summary: "Return the bottom-up level order traversal of a binary tree's nodes' values.",
      approach: "Breadth First Search (BFS). Traverse level order normally using a Queue, but insert each level's list at the beginning (index 0) of the result list.",
      intuition: "BFS naturally scans top-to-bottom. Reversing insertion index yields bottom-to-top order.",
      pseudocode: "Q = [root], res = LinkedList()\nwhile Q:\n  level = []\n  for i in Q.size:\n    curr = Q.pop()\n    level.add(curr.val)\n    if curr.left: Q.push(curr.left)\n    if curr.right: Q.push(curr.right)\n  res.addFirst(level)",
      dryRun: "Tree=[3,9,20]. Q=[3]. level 0: val=[3], res=[[3]]\nQ=[9,20]. level 1: val=[9, 20], res=[[9,20], [3]]. Returns [[9,20], [3]].",
      time: "O(n)",
      space: "O(n) for queue and result storage",
      interviewPoints: [
        "Why do we insert at index 0 or use LinkedList.addFirst? (to produce reverse level order).",
        "Compare memory footprint with standard level order.",
        "DFS alternative with depth offset calculations."
      ]
    },
    java: `import java.util.*;

public class LevelOrderTraversalII {
    public static List<List<Integer>> levelOrderBottom(TreeNode root) {
        LinkedList<List<Integer>> result = new LinkedList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode curr = queue.poll();
                currentLevel.add(curr.val);
                if (curr.left != null) queue.add(curr.left);
                if (curr.right != null) queue.add(curr.right);
            }
            result.addFirst(currentLevel);
        }
        return result;
    }
}`
  },
  "LC-951": {
    logic: {
      summary: "Determine if two binary trees are flip equivalent.",
      approach: "Recursive structure comparison. Two nodes are flip equivalent if their values are equal, and either (left matches left and right matches right) or (left matches right and right matches left).",
      intuition: "Flipping is local. Recursion checks both possible child matches (standard match or swapped match).",
      pseudocode: "flipEquiv(r1, r2):\n  if r1 is null and r2 is null return true\n  if r1 is null or r2 is null or r1.val != r2.val return false\n  return (flipEquiv(r1.left, r2.left) and flipEquiv(r1.right, r2.right))\n      or (flipEquiv(r1.left, r2.right) and flipEquiv(r1.right, r2.left))",
      dryRun: "r1=[1,2], r2=[1,null,2]\nflipEquiv(1, 1)\n  tries left-left (2, null) -> false\n  tries left-right (2, 2) and right-left (null, null) -> both true. Returns true.",
      time: "O(min(N1, N2))",
      space: "O(min(H1, H2)) recursion stack depth",
      interviewPoints: [
        "Why is time complexity linear? (Each node is visited at most constant times).",
        "Compare with standard isSameTree.",
        "Explain backtracking behavior on mismatched levels."
      ]
    },
    java: `public class FlipEquivalent {
    public static boolean flipEquiv(TreeNode root1, TreeNode root2) {
        if (root1 == null && root2 == null) return true;
        if (root1 == null || root2 == null || root1.val != root2.val) return false;
        
        return (flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right))
            || (flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left));
    }
}`
  },
  "LC-700": {
    logic: {
      summary: "Search in a Binary Search Tree for a node with the given val.",
      approach: "BST search. If current node is null or matches value, return it. If value is smaller than current, search left; else search right.",
      intuition: "BST sorted structure allows binary reduction in search directions.",
      pseudocode: "searchBST(root, val):\n  if root is null or root.val == val return root\n  if val < root.val return searchBST(root.left, val)\n  return searchBST(root.right, val)",
      dryRun: "BST=[4,2,7], val=2. 2 < 4 -> search left -> root=2 == 2 -> returns node 2.",
      time: "O(h) which is O(log n) average",
      space: "O(h) recursion stack or O(1) iterative",
      interviewPoints: [
        "Provide O(1) space iterative solution.",
        "Compare with searching in a general binary tree (O(n)).",
        "Clarify average vs worst-case bounds."
      ]
    },
    java: `public class SearchBST {
    public static TreeNode searchBST(TreeNode root, int val) {
        TreeNode curr = root;
        while (curr != null && curr.val != val) {
            if (val < curr.val) curr = curr.left;
            else curr = curr.right;
        }
        return curr;
    }
}`
  },
  "LC-1123": {
    logic: {
      summary: "Find the Lowest Common Ancestor (LCA) of deepest leaves.",
      approach: "Recursive height lookup. For each node, calculate the height of its left and right subtrees. If left height == right height, current node is the LCA of deepest leaves in its subtree.",
      intuition: "The deepest leaves must lie under both subtrees of the LCA. If one subtree is taller, the deepest leaves must only exist under that taller subtree.",
      pseudocode: "dfs(node):\n  if node is null return (0, null)\n  left = dfs(node.left)\n  right = dfs(node.right)\n  if left.height == right.height: return (left.height + 1, node)\n  else if left.height > right.height: return (left.height + 1, left.node)\n  else return (right.height + 1, right.node)\ndfs(root).node",
      dryRun: "Tree=[1,2,3,4]\ndfs(4)=(1,4), dfs(2)=(2,2) (left=1, right=0 -> returns left.node 4)\ndfs(3)=(1,3). Root 1: left height 2, right height 1 -> returns left.node (4). Returns 4.",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Explain why checking leftHeight == rightHeight yields the LCA.",
        "Compare this problem with LC-865 (LCA of Deepest Nodes - identical problem).",
        "Analyze stack space on skewed trees."
      ]
    },
    java: `public class LcaDeepestLeaves {
    static class Result {
        int dist;
        TreeNode node;
        Result(int dist, TreeNode node) {
            this.dist = dist;
            this.node = node;
        }
    }

    public static TreeNode lcaDeepestLeaves(TreeNode root) {
        return dfs(root).node;
    }

    private static Result dfs(TreeNode node) {
        if (node == null) return new Result(0, null);
        Result left = dfs(node.left);
        Result right = dfs(node.right);
        if (left.dist == right.dist) {
            return new Result(left.dist + 1, node);
        } else if (left.dist > right.dist) {
            return new Result(left.dist + 1, left.node);
        } else {
            return new Result(right.dist + 1, right.node);
        }
    }
}`
  },
  "LC-653": {
    logic: {
      summary: "Find if there exist two elements in the BST such that their sum is equal to target.",
      approach: "DFS + HashSet. Traverse the tree. For each node, check if `k - node.val` is in set. If yes, return true. Otherwise, add `node.val` to set and recursively search children.",
      intuition: "Convert BST search into a Two Sum hash lookup during tree traversal.",
      pseudocode: "set = Set()\nfind(node):\n  if node is null return false\n  if k - node.val in set return true\n  set.add(node.val)\n  return find(node.left) or find(node.right)\nfind(root)",
      dryRun: "BST=[5,3,6], k=9\nvisit 5: set={5}\nvisit 3: k-3=6 not in set -> set={5,3}\nvisit 6: k-6=3 is in set! -> return true.",
      time: "O(n)",
      space: "O(n) for visited set",
      interviewPoints: [
        "Explain O(h) space alternative (two pointers using BST iterators: one starts from min, one from max).",
        "Why is HashSet approach O(n) space?",
        "Compare BST traversal methods."
      ]
    },
    java: `import java.util.*;

public class TwoSumBST {
    public static boolean findTarget(TreeNode root, int k) {
        Set<Integer> set = new HashSet<>();
        return find(root, k, set);
    }

    private static boolean find(TreeNode node, int k, Set<Integer> set) {
        if (node == null) return false;
        if (set.contains(k - node.val)) return true;
        set.add(node.val);
        return find(node.left, k, set) || find(node.right, k, set);
    }
}`
  },
  "LC-111": {
    logic: {
      summary: "Find the minimum depth of a binary tree.",
      approach: "Recursive DFS. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.",
      intuition: "Be careful: a leaf is a node with no children. If a node only has one child, we must traverse down that child path (do not treat it as depth 1).",
      pseudocode: "minDepth(node):\n  if node is null return 0\n  if node.left is null return 1 + minDepth(node.right)\n  if node.right is null return 1 + minDepth(node.left)\n  return 1 + min(minDepth(node.left), minDepth(node.right))",
      dryRun: "Tree=[1,2]\nminDepth(1): left(2) is not null, right(null) is null -> returns 1 + minDepth(2) = 2. Correct.",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Why can't we simply use `1 + min(depth(left), depth(right))`? (because it would yield depth 1 for root with single child, which is invalid since root is not a leaf).",
        "BFS alternative using queue (returns immediately when the first leaf node is dequeued, which is faster on average).",
        "Compare worst-case space."
      ]
    },
    java: `public class MinDepth {
    public static int minDepth(TreeNode root) {
        if (root == null) return 0;
        if (root.left == null) return 1 + minDepth(root.right);
        if (root.right == null) return 1 + minDepth(root.left);
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
    }
}`
  },
  "LC-958": {
    logic: {
      summary: "Check completeness of a binary tree.",
      approach: "Breadth First Search (BFS) using a Queue. Enqueue all nodes (including nulls). Pop nodes. If we pop a null node, all subsequent popped nodes in BFS must also be null for the tree to be complete.",
      intuition: "A complete binary tree has no gaps. BFS traversal of a complete tree must list all non-null nodes consecutively before any nulls.",
      pseudocode: "Q = [root], seenNull = false\nwhile Q:\n  curr = Q.pop()\n  if curr is null seenNull = true\n  else:\n    if seenNull return false\n    Q.push(curr.left), Q.push(curr.right)\nreturn true",
      dryRun: "Tree=[1,2,3,4,null,6]\nBFS queue sequence: 1 -> 2 -> 3 -> 4 -> null (seenNull=true) -> 6 (seenNull is true -> return false). Uncomplete.",
      time: "O(n)",
      space: "O(n) queue storage",
      interviewPoints: [
        "Explain mathematical properties of complete binary trees.",
        "Why can BFS queue hold null nodes safely in Java? (LinkedList accepts nulls, unlike ArrayDeque).",
        "Discuss DFS index-based alternative (node index must be <= total node count)."
      ]
    },
    java: `import java.util.*;

public class CompleteBinaryTree {
    public static boolean isCompleteTree(TreeNode root) {
        if (root == null) return true;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        boolean seenNull = false;
        
        while (!queue.isEmpty()) {
            TreeNode curr = queue.poll();
            if (curr == null) {
                seenNull = true;
            } else {
                if (seenNull) return false;
                queue.add(curr.left);
                queue.add(curr.right);
            }
        }
        return true;
    }
}`
  },
  "LC-99": {
    logic: {
      summary: "Recover a Binary Search Tree where exactly two nodes were swapped by mistake.",
      approach: "Inorder traversal. Since inorder traversal of a BST is sorted, swapped nodes will cause adjacent decreases. Track `prev`, `first`, and `second` pointers. After traversing, swap values of `first` and `second`.",
      intuition: "Locating out-of-order nodes in a sorted array is O(n). We can do it in-place during recursive traversal.",
      pseudocode: "prev = null, first = null, second = null\ntraverse(curr):\n  if curr is null return\n  traverse(curr.left)\n  if prev and prev.val > curr.val:\n    if first is null: first = prev\n    second = curr\n  prev = curr\n  traverse(curr.right)\nSwap first.val and second.val",
      dryRun: "Inorder elements: [1, 3, 2, 4] (3 and 2 swapped)\nprev=1, curr=3 (sorted)\nprev=3, curr=2 (decrease!) -> first=3, second=2.\nprev=2, curr=4 (sorted). Swap 3 and 2. Correct BST.",
      time: "O(n)",
      space: "O(h) recursion stack depth",
      interviewPoints: [
        "Why does `second` get updated again if there is a second decrease? (If swapped nodes are non-adjacent, e.g. [1, 5, 3, 4, 2], first decrease is 5>3 (first=5, second=3), second decrease is 4>2 (second becomes 2). We swap 5 and 2).",
        "Explain Morris Inorder Traversal for O(1) auxiliary space.",
        "Compare complexity parameters."
      ]
    },
    java: `public class RecoverBST {
    private static TreeNode first;
    private static TreeNode second;
    private static TreeNode prev;

    public static void recoverTree(TreeNode root) {
        first = null;
        second = null;
        prev = null;
        inorder(root);
        
        if (first != null && second != null) {
            int temp = first.val;
            first.val = second.val;
            second.val = temp;
        }
    }

    private static void inorder(TreeNode curr) {
        if (curr == null) return;
        inorder(curr.left);
        
        if (prev != null && prev.val > curr.val) {
            if (first == null) {
                first = prev;
            }
            second = curr;
        }
        prev = curr;
        
        inorder(curr.right);
    }
}`
  },
  "LC-112": {
    logic: {
      summary: "Check if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.",
      approach: "DFS with sum subtraction. Subtract current node's value from targetSum. If current node is a leaf, check if targetSum equals 0.",
      intuition: "Subtracting path elements as we traverse down simplifies tracking (reduces state parameter to a single sum).",
      pseudocode: "hasPathSum(node, sum):\n  if node is null return false\n  sum -= node.val\n  if node.left is null and node.right is null: return sum == 0\n  return hasPathSum(node.left, sum) or hasPathSum(node.right, sum)",
      dryRun: "Tree=[1,2], sum=3\nnode=1: sum=3-1=2. Calls hasPathSum(2, 2).\nnode=2: sum=2-2=0. Leaf node -> returns 0==0 (true). Returns true.",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "What constitutes a leaf node? (No left and no right child).",
        "Can targetSum be negative? Yes.",
        "Iterative DFS/BFS alternative."
      ]
    },
    java: `public class PathSum {
    public static boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) {
            return targetSum == root.val;
        }
        return hasPathSum(root.left, targetSum - root.val)
            || hasPathSum(root.right, targetSum - root.val);
    }
}`
  },
  "LC-113": {
    logic: {
      summary: "Return all root-to-leaf paths where the sum of node values equals targetSum.",
      approach: "Backtracking / DFS. Traverse the tree, appending current node to path list and subtracting its value from targetSum. If leaf is reached with targetSum == 0, add copy of current path to result list.",
      intuition: "We use a single list for backtracking (add node, recurse, remove node) to optimize memory.",
      pseudocode: "res = []\nbacktrack(node, sum, currentPath):\n  if node is null return\n  currentPath.add(node.val)\n  if node.left is null and node.right is null and sum == node.val:\n    res.add(copy(currentPath))\n  else:\n    backtrack(node.left, sum - node.val, currentPath)\n    backtrack(node.right, sum - node.val, currentPath)\n  currentPath.removeLast()",
      dryRun: "Tree=[1,2,3], sum=3\nnode=1: path=[1]. Recurse left node 2 -> path=[1,2], leaf, sum=3-1-2=0 (valid) -> add [1,2]. pop 2.\nRecurse right node 3 -> path=[1,3], leaf, sum=3-1-3=-1 (invalid). pop 3. Returns [[1,2]].",
      time: "O(n) average (O(n^2) worst case if copy overhead dominates in linear tree with many results)",
      space: "O(h) recursion stack space",
      interviewPoints: [
        "Why is copying current path list necessary? (because the list is mutated during backtracking; returning a reference would result in empty lists).",
        "How is backtracking different from brute force traversal? (uses a single path list shared between calls).",
        "Discuss space complexity."
      ]
    },
    java: `import java.util.*;

public class PathSumII {
    public static List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(root, targetSum, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(TreeNode node, int sum, List<Integer> current, List<List<Integer>> result) {
        if (node == null) return;
        current.add(node.val);
        if (node.left == null && node.right == null && sum == node.val) {
            result.add(new ArrayList<>(current));
        } else {
            backtrack(node.left, sum - node.val, current, result);
            backtrack(node.right, sum - node.val, current, result);
        }
        current.remove(current.size() - 1);
    }
}`
  },
  "LC-129": {
    logic: {
      summary: "Return the total sum of all root-to-leaf numbers represented by digit paths.",
      approach: "Recursive DFS. Pass current accumulated number down. For a node, update: `current = current * 10 + node.val`. Return sum of children if not leaf, else return current number.",
      intuition: "Traversing down a tree path simulates shifting digits of a number base 10.",
      pseudocode: "sum(node, curr):\n  if node is null return 0\n  curr = curr * 10 + node.val\n  if node.left is null and node.right is null return curr\n  return sum(node.left, curr) + sum(node.right, curr)\nsum(root, 0)",
      dryRun: "Tree=[1,2,3]\nnode=1: curr=1. Calls left(2) and right(3).\nnode=2: curr=12. Leaf -> returns 12.\nnode=3: curr=13. Leaf -> returns 13. Root sum = 12 + 13 = 25. Returns 25.",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "How does `curr * 10 + node.val` simulate base 10 shifting?",
        "Compare DFS vs BFS solutions.",
        "Verify potential integer overflow bounds."
      ]
    },
    java: `public class SumRootToLeaf {
    public static int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }

    private static int dfs(TreeNode node, int curr) {
        if (node == null) return 0;
        curr = curr * 10 + node.val;
        if (node.left == null && node.right == null) {
            return curr;
        }
        return dfs(node.left, curr) + dfs(node.right, curr);
    }
}`
  },
  "LC-106": {
    logic: {
      summary: "Construct a binary tree from inorder and postorder traversals.",
      approach: "Recursive divide and conquer. Use a HashMap to index inorder values. The last element of postorder is the root. Locate its index in inorder array to split into left and right subtrees. Build right subtree first since postorder reads backward.",
      intuition: "Postorder visits nodes in left-right-root order, meaning we resolve root first when scanning postorder from right to left.",
      pseudocode: "inMap = HashMap(inorderIndices)\nbuild(inStart, inEnd):\n  if inStart > inEnd return null\n  rootVal = postorder[postIdx--]\n  root = Node(rootVal)\n  idx = inMap[rootVal]\n  root.right = build(idx + 1, inEnd)\n  root.left = build(inStart, idx - 1)\n  return root\nbuild(0, inorder.length - 1)",
      dryRun: "inorder=[9,3,15,20], postorder=[9,15,20,3]\nbuild(0, 3): root=3, postIdx decrements. idx=1.\n  root.right = build(2, 3) -> root=20, idx=3. Calls right(4,3)->null, left(2,2)->15 -> returns 20(15,null).\n  root.left = build(0, 0) -> root=9. Returns 3(9, 20(15,null)).",
      time: "O(n)",
      space: "O(n) for HashMap and recursion stack",
      interviewPoints: [
        "Why must we build the right subtree first in postorder construction? (Because postorder traverses left-right-root, so scanning from the end gives root then right child).",
        "Compare with preorder construction (where we build left subtree first).",
        "Explain tree boundaries."
      ]
    },
    java: `import java.util.*;

public class ConstructTreeInPost {
    private static int postIdx;
    private static Map<Integer, Integer> inMap;

    public static TreeNode buildTree(int[] inorder, int[] postorder) {
        postIdx = postorder.length - 1;
        inMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return build(inorder, 0, inorder.length - 1, postorder);
    }

    private static TreeNode build(int[] inorder, int inStart, int inEnd, int[] postorder) {
        if (inStart > inEnd) return null;
        
        int rootVal = postorder[postIdx--];
        TreeNode root = new TreeNode(rootVal);
        int idx = inMap.get(rootVal);
        
        root.right = build(inorder, idx + 1, inEnd, postorder);
        root.left = build(inorder, inStart, idx - 1, postorder);
        return root;
    }
}`
  },
  "LC-108": {
    logic: {
      summary: "Convert a sorted array to a height-balanced BST.",
      approach: "Divide and conquer. Choose the middle element of the array segment as the root (ensures balanced heights). Recursively construct the left subtree from the left half, and the right subtree from the right half.",
      intuition: "Selecting the middle element as root guarantees that the number of nodes in the left and right subtrees differs by at most 1, matching BST height-balance constraints.",
      pseudocode: "build(left, right):\n  if left > right return null\n  mid = (left + right) / 2\n  root = Node(num[mid])\n  root.left = build(left, mid - 1)\n  root.right = build(mid + 1, right)\n  return root\nbuild(0, num.length - 1)",
      dryRun: "nums=[-10,-3,0,5,9]\nbuild(0, 4): mid=2, root=0.\n  left = build(0, 1) -> mid=0, root=-10. left.right = build(1,1) -> root=-3.\n  right = build(3, 4) -> mid=3, root=5. right.right = build(4,4) -> root=9.\nReturns tree 0(-10(null,-3), 5(null,9)). Balanced.",
      time: "O(n)",
      space: "O(log n) recursion depth",
      interviewPoints: [
        "Prove why selecting the middle element guarantees height-balanced BST.",
        "What is the maximum height of the constructed tree? (log2(n) + 1).",
        "Can we choose `(left + right + 1) / 2` as middle instead? Yes (yields a different but equally valid balanced tree)."
      ]
    },
    java: `public class SortedArrayToBST {
    public static TreeNode sortedArrayToBST(int[] nums) {
        return build(nums, 0, nums.length - 1);
    }

    private static TreeNode build(int[] nums, int left, int right) {
        if (left > right) return null;
        int mid = left + (right - left) / 2;
        TreeNode root = new TreeNode(nums[mid]);
        root.left = build(nums, left, mid - 1);
        root.right = build(nums, mid + 1, right);
        return root;
    }
}`
  },
  "LC-199": {
    logic: {
      summary: "Return the values of the nodes you can see ordered from top to bottom on the right side of the tree.",
      approach: "Recursive DFS (Root-Right-Left). Pass the current depth. If the current depth equals the size of the result list, it means this is the first node we visit at this level, so add its value to result.",
      intuition: "Visiting right child before left child ensures that the first node visited at each depth level is the rightmost node.",
      pseudocode: "res = []\ndfs(node, depth):\n  if node is null return\n  if depth == res.size: res.add(node.val)\n  dfs(node.right, depth + 1)\n  dfs(node.left, depth + 1)\ndfs(root, 0)",
      dryRun: "Tree=[1,2,3,null,5,null,4]\ndfs(1, 0) -> res=[1].\ndfs(3, 1) -> res=[1,3].\ndfs(4, 2) -> res=[1,3,4].\ndfs(2, 1) -> depth 1 != res.size (3) -> ignore. Returns [1,3,4].",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Explain BFS alternative using queue (returns last element of each level).",
        "Compare DFS vs BFS space complexities on skewed vs complete trees.",
        "How to handle left side view? (Change traversal order to Root-Left-Right)."
      ]
    },
    java: `import java.util.*;

public class RightSideView {
    public static List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        dfs(root, 0, result);
        return result;
    }
    
    private static void dfs(TreeNode node, int depth, List<Integer> result) {
        if (node == null) return;
        if (depth == result.size()) {
            result.add(node.val);
        }
        dfs(node.right, depth + 1, result);
        dfs(node.left, depth + 1, result);
    }
}`
  },
  "LC-211": {
    logic: {
      summary: "Design a data structure that supports adding new words and searching for words containing wildcards.",
      approach: "Trie (Prefix Tree) with backtracking. For standard characters, traverse Trie children. For '.' wildcard, recursively search all non-null child nodes in the current Trie node.",
      intuition: "Trie allows character-by-character validation. Wildcard acts as a multi-path branch during search.",
      pseudocode: "insert(word):\n  node = root\n  for char c in word:\n    if not node.children[c]: node.children[c] = TrieNode()\n    node = node.children[c]\n  node.isEnd = true\n\nsearch(word, idx, node):\n  if not node return false\n  if idx == word.len return node.isEnd\n  if word[idx] == '.':\n    for child in node.children:\n      if search(word, idx+1, child) return true\n    return false\n  return search(word, idx+1, node.children[word[idx]])",
      dryRun: "addWord('bad') -> Trie path b->a->d(isEnd=true).\nsearch('b.d') -> root.children[b] -> child.children[.]: checks all children -> child.children[a].children[d] -> returns true.",
      time: "O(M) for insert, O(26^M) worst case for search wildcard",
      space: "O(total characters inserted) for Trie node structure",
      interviewPoints: [
        "Why is Trie preferred over HashSet for wildcard search? (HashSet cannot match partial/wildcard queries without iterating the entire set).",
        "Discuss space optimizations (like Compressed Trie/Radix Tree).",
        "TrieNode child indexing."
      ]
    },
    java: `public class WordDictionary {
    static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }
    
    private TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }
    
    public void addWord(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }
    
    public boolean search(String word) {
        return searchHelper(word, 0, root);
    }
    
    private boolean searchHelper(String word, int idx, TrieNode node) {
        if (node == null) return false;
        if (idx == word.length()) return node.isEnd;
        
        char c = word.charAt(idx);
        if (c == '.') {
            for (TrieNode child : node.children) {
                if (child != null && searchHelper(word, idx + 1, child)) {
                    return true;
                }
            }
            return false;
        } else {
            return searchHelper(word, idx + 1, node.children[c - 'a']);
        }
    }
}`
  },
  "LC-212": {
    logic: {
      summary: "Search for multiple words from a dictionary in a 2D board.",
      approach: "Trie + Backtracking DFS. Build a Trie containing all dictionary words. Start DFS from every cell on the board. If the current board cell prefix matches a Trie path, continue DFS. If we reach a leaf representing a word, add it to result list, and prune the word from Trie to prevent duplicate matches.",
      intuition: "Combining Trie and Backtracking allows us to search multiple words simultaneously instead of searching each word individually.",
      pseudocode: "Trie = buildTrie(words)\nfor r, c in board:\n  dfs(r, c, Trie.root)\n\ndfs(r, c, node):\n  char = board[r][c]\n  if not node.children[char] return\n  next = node.children[char]\n  if next.word: result.add(next.word), next.word = null // prevent duplicates\n  board[r][c] = '#'\n  for nr, nc in neighbors(r, c):\n    dfs(nr, nc, next)\n  board[r][c] = char",
      dryRun: "board=[['o','a'],['e','t']], words=['oath']\nTrie: o->a->t->h(oath). start at (0,0)'o'. matches Trie path.\n(0,1)'a' matches Trie path -> (1,1)'t' matches -> (1,0)'e' (no path)...\nReturns ['oath'].",
      time: "O(M * N * 4^L) where L is the maximum length of a word",
      space: "O(total characters in words) for Trie storage",
      interviewPoints: [
        "Explain Trie pruning optimization (deleting nodes that have no more children reduces search space significantly).",
        "Why is clearing `next.word = null` better than using a visited set? (Saves lookup overhead).",
        "Compare with running Word Search I multiple times."
      ]
    },
    java: `import java.util.*;

public class WordSearchII {
    static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null;
    }
    
    private static void insert(TrieNode root, String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.word = word;
    }

    public static List<String> findWords(char[][] board, String[] words) {
        List<String> result = new ArrayList<>();
        TrieNode root = new TrieNode();
        for (String w : words) insert(root, w);
        
        int m = board.length;
        int n = board[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dfs(board, i, j, root, result);
            }
        }
        return result;
    }
    
    private static void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
        char ch = board[r][c];
        if (ch == '#' || node.children[ch - 'a'] == null) return;
        
        TrieNode nextNode = node.children[ch - 'a'];
        if (nextNode.word != null) {
            result.add(nextNode.word);
            nextNode.word = null; // prevent duplicates
        }
        
        board[r][c] = '#'; // visited mark
        dfs(board, r + 1, c, nextNode, result);
        dfs(board, r - 1, c, nextNode, result);
        dfs(board, r, c + 1, nextNode, result);
        dfs(board, r, c - 1, nextNode, result);
        board[r][c] = ch; // backtrack
    }
}`
  },
  "LC-297": {
    logic: {
      summary: "Serialize and deserialize a binary tree.",
      approach: "DFS Preorder Traversal. Serialization: traverse tree in preorder. If node is null, append 'N,' to string; else append 'val,' and recurse. Deserialization: split string by commas, load into a Queue, and recursively reconstruct the tree.",
      intuition: "Preorder traversal preserves the structure uniquely if null nodes are included in the output stream.",
      pseudocode: "serialize(root):\n  if not root return 'N,'\n  return root.val + ',' + serialize(root.left) + serialize(root.right)\n\ndeserialize(data):\n  Q = Queue(data.split(','))\n  build():\n    val = Q.pop()\n    if val == 'N' return null\n    node = Node(parseInt(val))\n    node.left = build()\n    node.right = build()\n    return node",
      dryRun: "Tree=[1,2,3] -> serializes to '1,2,N,N,3,N,N,'. Q=['1','2','N','N','3','N','N'].\npop '1' -> root=1. build left: pop '2' -> left=2. build left: pop 'N' -> null. build right: pop 'N' -> null.\nbuild right: pop '3' -> right=3. Returns reconstructed tree.",
      time: "O(n)",
      space: "O(n) for string builder and deserialization queue",
      interviewPoints: [
        "Can we serialize using BFS Level Order? Yes, but it requires trailing null pointers management.",
        "Why is preorder DFS cleaner for recursion?",
        "Compare memory footprints of different serialization formats."
      ]
    },
    java: `import java.util.*;

public class Codec {
    public static String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        buildString(root, sb);
        return sb.toString();
    }
    
    private static void buildString(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append("N,");
        } else {
            sb.append(node.val).append(",");
            buildString(node.left, sb);
            buildString(node.right, sb);
        }
    }

    public static TreeNode deserialize(String data) {
        Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(",")));
        return buildTree(queue);
    }
    
    private static TreeNode buildTree(Queue<String> queue) {
        String val = queue.poll();
        if (val.equals("N")) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = buildTree(queue);
        node.right = buildTree(queue);
        return node;
    }
}`
  },
  "LC-1448": {
    logic: {
      summary: "Count the number of good nodes in a binary tree (value is >= all values from root to current node).",
      approach: "DFS. Traverse the tree. Pass the maximum value seen so far along the path. If current node's value is greater than or equal to the maximum, increment count and update maximum. Recurse.",
      intuition: "Good nodes are peaks in their respective paths. Tracking path-maximum dynamically resolves this in single pass.",
      pseudocode: "countGood(node, maxVal):\n  if node is null return 0\n  count = 0\n  if node.val >= maxVal: count = 1, maxVal = node.val\n  return count + countGood(node.left, maxVal) + countGood(node.right, maxVal)",
      dryRun: "Tree=[3,1,4,3,null,1,5]\nroot=3: count=1, maxVal=3.\nleft 1: 1 < 3 -> count=0, maxVal=3. left 3: 3 >= 3 -> count=1.\nright 4: 4 >= 3 -> count=1, maxVal=4. right 5: 5 >= 4 -> count=1.\nTotal good = 1 + 1 + 1 + 1 = 4. Returns 4.",
      time: "O(n)",
      space: "O(h) recursion depth",
      interviewPoints: [
        "Explain why this can be solved in a single DFS pass.",
        "Compare with BFS solutions (needs storing active path maximums in queue elements).",
        "Verify edge cases with negative values (initialize maxVal to Integer.MIN_VALUE)."
      ]
    },
    java: `public class GoodNodes {
    public static int goodNodes(TreeNode root) {
        return dfs(root, Integer.MIN_VALUE);
    }
    
    private static int dfs(TreeNode node, int maxVal) {
        if (node == null) return 0;
        int count = 0;
        if (node.val >= maxVal) {
            count = 1;
            maxVal = node.val;
        }
        count += dfs(node.left, maxVal);
        count += dfs(node.right, maxVal);
        return count;
    }
}`
  }
};


