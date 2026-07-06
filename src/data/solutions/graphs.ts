import type { QuestionLogic } from "../types";

export const GRAPH_SOLUTIONS: Record<string, { logic: QuestionLogic; java: string }> = {
  "LC-200": {
    logic: {
      summary: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands.",
      approach: "Iterate through each cell. When a '1' is encountered, increment island count and perform DFS/BFS to sink the entire island (turn all connected '1's to '0's).",
      intuition: "Each connected component of '1's represents a single island. Flooding/sinking via DFS ensures we count each island exactly once.",
      pseudocode: "count = 0\nfor r from 0 to rows-1:\n  for c from 0 to cols-1:\n    if grid[r][c] == '1':\n      count++\n      dfs(grid, r, c)\nreturn count\n\ndfs(grid, r, c):\n  if outOfBounds or grid[r][c] == '0' return\n  grid[r][c] = '0'\n  dfs(left, right, up, down)",
      dryRun: "grid = [['1','1','0'],['1','1','0'],['0','0','1']]\nr=0, c=0: is land. count=1. DFS turns (0,0), (0,1), (1,0), (1,1) to '0'.\nr=2, c=2: is land. count=2. DFS turns (2,2) to '0'. Returns 2.",
      time: "O(R * C) where R is rows and C is columns",
      space: "O(R * C) worst-case recursion stack space",
      interviewPoints: ["Compare DFS vs BFS solutions.", "How to avoid modifying the input grid (using a visited boolean array, though it uses O(R*C) extra space)."]
    },
    java: `import java.util.*;

public class NumberOfIslands {
    public static int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }

    private static void dfs(char[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == '0') {
            return;
        }
        grid[r][c] = '0';
        dfs(grid, r - 1, c);
        dfs(grid, r + 1, c);
        dfs(grid, r, c - 1);
        dfs(grid, r, c + 1);
    }

    public static void main(String[] args) {
        char[][] grid = {
            {'1', '1', '0', '0', '0'},
            {'1', '1', '0', '0', '0'},
            {'0', '0', '1', '0', '0'},
            {'0', '0', '0', '1', '1'}
        };
        System.out.println("Number of islands: " + numIslands(grid));
    }
}`
  },
  "LC-133": {
    logic: {
      summary: "Clone an undirected connected graph.",
      approach: "DFS traversal using a HashMap to store the mapping from original nodes to their corresponding cloned nodes.",
      intuition: "To avoid cycles and infinite loops, we need a map of cloned nodes. When visiting a node, if it's already cloned, return the clone. Otherwise, instantiate the clone, add it to map, and recursively clone all its neighbors.",
      pseudocode: "map = HashMap()\nclone(node):\n  if node == null return null\n  if node in map: return map[node]\n  cloned = Node(node.val)\n  map[node] = cloned\n  for n in node.neighbors:\n    cloned.neighbors.add(clone(n))\n  return cloned",
      dryRun: "Start at node 1. Clone 1, put in map. Neighbor is 2. Recursively clone 2, put in map. Neighbor of 2 is 1 (already in map -> returns clone 1). Finishes cloning structure.",
      time: "O(V + E) where V is vertices and E is edges",
      space: "O(V) for the map and recursion stack",
      interviewPoints: ["Why a visited map is essential (handles cycles).", "BFS equivalent using Queue."]
    },
    java: `import java.util.*;

class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}

public class CloneGraph {
    private static Map<Node, Node> map = new HashMap<>();

    public static Node cloneGraph(Node node) {
        if (node == null) return null;
        if (map.containsKey(node)) return map.get(node);
        Node clone = new Node(node.val);
        map.put(node, clone);
        for (Node neighbor : node.neighbors) {
            clone.neighbors.add(cloneGraph(neighbor));
        }
        return clone;
    }

    public static void main(String[] args) {
        Node n1 = new Node(1);
        Node n2 = new Node(2);
        n1.neighbors.add(n2);
        n2.neighbors.add(n1);
        Node cloned = cloneGraph(n1);
        System.out.println("Cloned root node: " + cloned.val);
        System.out.println("Cloned node neighbor: " + cloned.neighbors.get(0).val);
    }
}`
  },
  "LC-207": {
    logic: {
      summary: "Given total num of courses and list of prerequisite pairs, check if it's possible to finish all courses.",
      approach: "Detect cycle in directed graph. Represent prerequisites as adjacency list. Run DFS on each node, tracking nodes in current recursion path (`visiting`). If a node is re-visited, cycle exists.",
      intuition: "Course dependency is a Directed Acyclic Graph (DAG). If there is a cycle (e.g. A depends on B, B depends on A), we can never finish the courses.",
      pseudocode: "build adj list\nvisited = array, visiting = array\nfor i from 0 to numCourses-1:\n  if hasCycle(i): return false\nreturn true\n\nhasCycle(i):\n  if visiting[i] return true\n  if visited[i] return false\n  visiting[i] = true\n  for next in adj[i]:\n    if hasCycle(next) return true\n  visiting[i] = false\n  visited[i] = true\n  return false",
      dryRun: "numCourses=2, prereq=[[1,0]]. 0 -> 1. No cycle. Returns true. prereq=[[1,0],[0,1]]. 0 -> 1 -> 0. Cycle detected at 0. Returns false.",
      time: "O(V + E)",
      space: "O(V + E) for recursion stack and adj list",
      interviewPoints: ["Compare DFS with BFS (Kahn's Topological Sort using indegrees).", "Explain graph modeling choice (vertices and directed edges)."]
    },
    java: `import java.util.*;

public class CourseSchedule {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
        }
        
        int[] visited = new int[numCourses]; // 0: unvisited, 1: visiting, 2: visited
        for (int i = 0; i < numCourses; i++) {
            if (hasCycle(adj, visited, i)) return false;
        }
        return true;
    }

    private static boolean hasCycle(List<List<Integer>> adj, int[] visited, int curr) {
        if (visited[curr] == 1) return true;
        if (visited[curr] == 2) return false;
        visited[curr] = 1;
        for (int next : adj.get(curr)) {
            if (hasCycle(adj, visited, next)) return true;
        }
        visited[curr] = 2;
        return false;
    }

    public static void main(String[] args) {
        int[][] pre = {{1, 0}, {0, 1}};
        System.out.println("Can finish? " + canFinish(2, pre)); // false
    }
}`
  }
};
