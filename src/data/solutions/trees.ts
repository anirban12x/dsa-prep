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
  }
};
