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
  },
  "LC-74": {
    logic: {
      summary: "Search for a target value in an m x n 2D matrix where each row is sorted, and the first integer of each row is greater than the last integer of the previous row.",
      approach: "Binary Search. Treat the 2D matrix as a virtual 1D array of size m * n. For a index mid, convert to 2D indices: `r = mid / n`, `c = mid % n`.",
      intuition: "The sorted structure allows search space reduction in logarithmic time. Mapping formula simulates a contiguous 1D array.",
      pseudocode: "l = 0, r = m * n - 1\nwhile l <= r:\n  mid = (l + r) / 2\n  val = matrix[mid / n][mid % n]\n  if val == target return true\n  else if val < target l = mid + 1\n  else r = mid - 1\nreturn false",
      dryRun: "matrix=[[1,3,5]], target=3. m=1, n=3. size=3.\nl=0, r=2. mid=1. val=matrix[0][1]=3 == 3. Returns true.",
      time: "O(log(m * n))",
      space: "O(1)",
      interviewPoints: [
        "Explain index translation formulas `mid / cols` and `mid % cols`.",
        "Compare with Search a 2D Matrix II (row-by-row corner pointers).",
        "Discuss overflow mitigation during `(l + r) / 2` calculation."
      ]
    },
    java: `public class Search2DMatrix {
    public static boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;
        int m = matrix.length;
        int n = matrix[0].length;
        int left = 0, right = m * n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            else if (val < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
}`
  },
  "LC-240": {
    logic: {
      summary: "Search for a target value in an m x n matrix where rows and columns are sorted individually.",
      approach: "Step-wise search starting at top-right corner. If current value equals target, return true. If current value is greater than target, move left. If smaller, move down.",
      intuition: "At the top-right corner, all elements in its column are larger, and all elements in its row are smaller. This provides binary directions.",
      pseudocode: "r = 0, c = n - 1\nwhile r < m and c >= 0:\n  if matrix[r][c] == target return true\n  else if matrix[r][c] > target c--\n  else r++\nreturn false",
      dryRun: "matrix=[[1,4],[2,5]], target=2\nStart (0,1)=4 > 2 -> c=0. Next (0,0)=1 < 2 -> r=1. Next (1,0)=2 == 2. Returns true.",
      time: "O(m + n)",
      space: "O(1)",
      interviewPoints: [
        "Why does starting at top-left corner not work? (both down and right directions increase values).",
        "Could we start at bottom-left corner? Yes (col increases, row decreases).",
        "Discuss binary search row-by-row (O(m log n)) as an alternative."
      ]
    },
    java: `public class SearchMatrixII {
    public static boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;
        int m = matrix.length;
        int n = matrix[0].length;
        int r = 0, c = n - 1;
        while (r < m && c >= 0) {
            if (matrix[r][c] == target) {
                return true;
            } else if (matrix[r][c] > target) {
                c--;
            } else {
                r++;
            }
        }
        return false;
    }
}`
  },
  "LC-378": {
    logic: {
      summary: "Find the kth smallest element in an n x n sorted matrix.",
      approach: "Binary Search on value range [matrix[0][0], matrix[n-1][n-1]]. For a guess `mid`, count elements <= mid. If count < k, search right half; else search left half.",
      intuition: "Instead of sorting elements, we search the value range. Counting elements smaller than `mid` in a sorted matrix takes O(n) time.",
      pseudocode: "low = matrix[0][0], high = matrix[n-1][n-1]\nwhile low < high:\n  mid = low + (high-low)/2\n  count = countLessEqual(matrix, mid)\n  if count < k: low = mid + 1\n  else: high = mid\nreturn low",
      dryRun: "matrix=[[1,5],[3,9]], k=2\nlow=1, high=9. mid=5. countLess(5) = 1(1) + 2(3,5) = 3 >= 2 -> high=5\nlow=1, high=5. mid=3. countLess(3) = 1(1) + 1(3) = 2 >= 2 -> high=3\nlow=1, high=3. mid=2. countLess(2) = 1(1) + 0() = 1 < 2 -> low=3. Loop ends. Returns 3.",
      time: "O(n * log(max - min))",
      space: "O(1)",
      interviewPoints: [
        "Explain how `countLessEqual` runs in O(n) using pointer walking starting at bottom-left corner.",
        "Compare with MinHeap solution (k-way merge) taking O(k log n) time and O(n) space.",
        "Why does binary search converge to an actual matrix element? (Because we shrink bounds to include the smallest element with >= k smaller/equal elements)."
      ]
    },
    java: `import java.util.*;

public class KthSmallestSortedMatrix {
    public static int kthSmallest(int[][] matrix, int k) {
        int n = matrix.length;
        int low = matrix[0][0];
        int high = matrix[n - 1][n - 1];
        while (low < high) {
            int mid = low + (high - low) / 2;
            int count = countLessEqual(matrix, mid);
            if (count < k) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
    
    private static int countLessEqual(int[][] matrix, int target) {
        int n = matrix.length;
        int count = 0;
        int r = n - 1, c = 0;
        while (r >= 0 && c < n) {
            if (matrix[r][c] <= target) {
                count += (r + 1);
                c++;
            } else {
                r--;
            }
        }
        return count;
    }
}`
  },
  "LC-130": {
    logic: {
      summary: "Capture all board regions surrounded by 'X'.",
      approach: "Boundary DFS. Start DFS/BFS from all boundary 'O' nodes and mark them and their connected neighbors as safe ('S'). Then traverse the entire board, flipping remaining 'O's to 'X's, and all 'S's back to 'O's.",
      intuition: "Any 'O' region that doesn't reach the boundary is captured. Starting search at boundaries isolates the uncapturable ones.",
      pseudocode: "for cells on boundary:\n  if grid[r][c] == 'O': dfs(r, c) -> mark 'S'\nfor r, c in grid:\n  if grid[r][c] == 'O': grid[r][c] = 'X'\n  if grid[r][c] == 'S': grid[r][c] = 'O'",
      dryRun: "grid=[['X','O'],['X','O']]\nboundary 'O' at (0,1) DFS marks (0,1) and (1,1) to 'S'.\nRebuild: (0,1) becomes 'O', (1,1) becomes 'O'. Output same.",
      time: "O(R * C)",
      space: "O(R * C) recursion stack",
      interviewPoints: [
        "Why is it sufficient to scan only the boundary nodes?",
        "Compare DFS vs BFS for flood fill.",
        "Edge cases: boards smaller than 3x3 (can any region be captured?)."
      ]
    },
    java: `public class CapturedRegions {
    public static void solve(char[][] board) {
        if (board == null || board.length <= 2 || board[0].length <= 2) return;
        int r = board.length;
        int c = board[0].length;
        
        for (int i = 0; i < r; i++) {
            if (board[i][0] == 'O') dfs(board, i, 0);
            if (board[i][c - 1] == 'O') dfs(board, i, c - 1);
        }
        for (int j = 0; j < c; j++) {
            if (board[0][j] == 'O') dfs(board, 0, j);
            if (board[r - 1][j] == 'O') dfs(board, r - 1, j);
        }
        
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (board[i][j] == 'O') board[i][j] = 'X';
                else if (board[i][j] == 'S') board[i][j] = 'O';
            }
        }
    }
    
    private static void dfs(char[][] board, int i, int j) {
        if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || board[i][j] != 'O') return;
        board[i][j] = 'S';
        dfs(board, i + 1, j);
        dfs(board, i - 1, j);
        dfs(board, i, j + 1);
        dfs(board, i, j - 1);
    }
}`
  },
  "LC-994": {
    logic: {
      summary: "Find the minimum number of minutes that must elapse until no cell has a fresh orange.",
      approach: "Multi-source Breadth First Search (BFS). Queue all initial rotten oranges. Maintain count of fresh oranges. Perform level-by-level traversal, incrementing minutes. Return minutes if fresh count becomes 0, else -1.",
      intuition: "Rotting spreads like a wave (BFS). Levels represent time steps.",
      pseudocode: "Q = rottenOranges, fresh = countFresh()\nminutes = 0\nwhile Q and fresh > 0:\n  minutes++\n  for i in Q.size:\n    curr = Q.pop()\n    for neighbor in neighbors(curr):\n      if neighbor is fresh: rot neighbor, fresh--, Q.push(neighbor)\nreturn fresh == 0 ? minutes : -1",
      dryRun: "grid=[[2,1],[1,0]]\nQ=[(0,0)], fresh=2\nmin=1: rot (0,1), (1,0) -> Q=[(0,1), (1,0)], fresh=0. Loop terminates. Returns 1.",
      time: "O(R * C)",
      space: "O(R * C) queue space",
      interviewPoints: [
        "Explain why DFS cannot be easily used here (spreading is simultaneous, requiring BFS level locksteps).",
        "How to handle grids with no fresh oranges (should return 0).",
        "Analyze queue memory boundaries."
      ]
    },
    java: `import java.util.*;

public class RottingOranges {
    public static int orangesRotting(int[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int rows = grid.length, cols = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        int fresh = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) queue.add(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        if (fresh == 0) return 0;
        
        int minutes = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!queue.isEmpty() && fresh > 0) {
            int size = queue.size();
            minutes++;
            for (int i = 0; i < size; i++) {
                int[] curr = queue.poll();
                for (int[] d : dirs) {
                    int nr = curr[0] + d[0];
                    int nc = curr[1] + d[1];
                    if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.add(new int[]{nr, nc});
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
}`
  },
  "LC-743": {
    logic: {
      summary: "Find the time it takes for all nodes to receive a signal from k.",
      approach: "Dijkstra's Algorithm. Maintain a distance array initialized to infinity. Use a PriorityQueue to store `(node, distance)` and greedily update min path costs to neighbors.",
      intuition: "Shortest path algorithm on weighted graph. The time for all nodes to receive the signal is the maximum of the shortest path distances from source k.",
      pseudocode: "dist = array[V] of infinity, dist[k] = 0\nheap = MinHeap((k, 0))\nwhile heap:\n  u, d = heap.pop()\n  if d > dist[u] continue\n  for v, w in adj[u]:\n    if dist[u] + w < dist[v]:\n      dist[v] = dist[u] + w\n      heap.push((v, dist[v]))\nreturn max(dist) == infinity ? -1 : max(dist)",
      dryRun: "times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2\ndist=[inf, inf, 0, inf]\nheap=[(2,0)] -> pop 2. Neighbors: 1(w1), 3(w1). dist=[inf, 1, 0, 1]. heap=[(1,1), (3,1)]\npop 1. No neighbors. pop 3. Neighbors: 4(w1). dist=[inf, 1, 0, 1, 2]. heap=[(4,2)]\npop 4. No neighbors. max(dist[1..4]) = 2. Returns 2.",
      time: "O(E log V) where E is edges and V is vertices",
      space: "O(V + E) for adjacency list and heap storage",
      interviewPoints: [
        "Why is PriorityQueue needed? (guarantees visiting closest nodes first, preventing redundant updates).",
        "What if there are negative weights? (Dijkstra fails; Bellman-Ford must be used).",
        "Confirm if node IDs are 1-based or 0-based."
      ]
    },
    java: `import java.util.*;

public class NetworkDelay {
    public static int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> adj = new HashMap<>();
        for (int[] t : times) {
            adj.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});
        }
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;
        pq.add(new int[]{k, 0});
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0], d = curr[1];
            if (d > dist[u]) continue;
            if (!adj.containsKey(u)) continue;
            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.add(new int[]{v, dist[v]});
                }
            }
        }
        int maxDelay = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == Integer.MAX_VALUE) return -1;
            maxDelay = Math.max(maxDelay, dist[i]);
        }
        return maxDelay;
    }
}`
  },
  "LC-547": {
    logic: {
      summary: "Find the total number of connected components (provinces) in a graph.",
      approach: "DFS on adjacency matrix. Keep track of visited nodes. Loop through all nodes. If node is unvisited, increment count and trigger DFS to mark all nodes in the same component.",
      intuition: "provinces represent isolated graphs. Finding the number of provinces is identical to counting DFS entry triggers.",
      pseudocode: "visited = boolean[n], count = 0\nfor i from 0 to n-1:\n  if not visited[i]:\n    count++\n    dfs(i)\ndfs(i):\n  visited[i] = true\n  for j in neighbors(i):\n    if not visited[j]: dfs(j)",
      dryRun: "matrix=[[1,1,0],[1,1,0],[0,0,1]]\ni=0: unvisited -> count=1. DFS(0) visits 0, 1.\ni=1: visited. i=2: unvisited -> count=2. DFS(2) visits 2. Returns 2.",
      time: "O(n^2) since we inspect every element in adjacency matrix",
      space: "O(n) for visited array and recursion stack",
      interviewPoints: [
        "Explain Union-Find solution as an alternative.",
        "Compare DFS vs BFS in terms of stack/queue space.",
        "What is the maximum number of provinces possible? (n)."
      ]
    },
    java: `import java.util.*;

public class ConnectedProvinces {
    public static int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                count++;
                dfs(isConnected, visited, i);
            }
        }
        return count;
    }
    
    private static void dfs(int[][] isConnected, boolean[] visited, int u) {
        visited[u] = true;
        for (int v = 0; v < isConnected.length; v++) {
            if (isConnected[u][v] == 1 && !visited[v]) {
                dfs(isConnected, visited, v);
            }
        }
    }
}`
  },
  "P-153": {
    logic: {
      summary: "Return a list containing the DFS traversal of the graph.",
      approach: "DFS recursion on adjacency list. Maintain a visited array. Start DFS from node 0. Add current node to traversal list, mark as visited, and recursively visit all its unvisited neighbors.",
      intuition: "DFS explores as deep as possible before backtracking. Visited set prevents cycles.",
      pseudocode: "visited = boolean[V], res = []\ndfs(u):\n  visited[u] = true, res.add(u)\n  for v in adj[u]:\n    if not visited[v] dfs(v)\ndfs(0)\nreturn res",
      dryRun: "adj=[[1,2],[0],[0]], V=3. DFS(0) -> visited={0}, res=[0]. Visits neighbor 1. DFS(1) -> visited={0,1}, res=[0,1]. Backtracks. Visits 2. DFS(2) -> visited={0,1,2}, res=[0,1,2]. Returns [0, 1, 2].",
      time: "O(V + E)",
      space: "O(V)",
      interviewPoints: [
        "Discuss space complexity in case of star vs linear graphs.",
        "How to handle disconnected components? (Loop DFS trigger for all unvisited nodes).",
        "Compare recursive DFS vs iterative DFS (using Stack)."
      ]
    },
    java: `import java.util.*;

public class DfsGraphTraversal {
    public static List<Integer> dfsOfGraph(int V, List<List<Integer>> adj) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        dfs(0, adj, visited, result);
        return result;
    }

    private static void dfs(int u, List<List<Integer>> adj, boolean[] visited, List<Integer> result) {
        visited[u] = true;
        result.add(u);
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                dfs(v, adj, visited, result);
            }
        }
    }
}`
  },
  "P-154": {
    logic: {
      summary: "Return a list containing the BFS traversal of the graph.",
      approach: "Queue-based BFS. Maintain a visited array. Add node 0 to Queue. While Queue is not empty, dequeue current node, add it to result list, and enqueue all its unvisited neighbors.",
      intuition: "BFS explores level-by-level. Queue naturally processes vertices in order of distance from source.",
      pseudocode: "visited = boolean[V], Q = [0], res = []\nvisited[0] = true\nwhile Q:\n  u = Q.pop()\n  res.add(u)\n  for v in adj[u]:\n    if not visited[v]: visited[v] = true, Q.push(v)\nreturn res",
      dryRun: "adj=[[1,2],[0],[0]], V=3. Q=[0], visited={0}\npop 0, res=[0]. Enqueue 1, 2. Q=[1,2], visited={0,1,2}\npop 1, res=[0,1]. pop 2, res=[0,1,2]. Returns [0,1,2].",
      time: "O(V + E)",
      space: "O(V)",
      interviewPoints: [
        "Why do we mark nodes visited during enqueuing rather than dequeuing? (prevents duplicate node insertions in queue).",
        "Compare DFS vs BFS space complexities.",
        "Handle disconnected graph BFS traversal."
      ]
    },
    java: `import java.util.*;

public class BfsGraphTraversal {
    public static List<Integer> bfsOfGraph(int V, List<List<Integer>> adj) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[0] = true;
        queue.add(0);
        
        while (!queue.isEmpty()) {
            int u = queue.poll();
            result.add(u);
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    queue.add(v);
                }
            }
        }
        return result;
    }
}`
  },
  "P-158": {
    logic: {
      summary: "Detect if there is a cycle in an undirected graph.",
      approach: "DFS/BFS with parent tracking. Loop through nodes. For each unvisited node, trigger DFS. Maintain parent index. If neighbor is visited and not equal to parent, cycle exists.",
      intuition: "An back-edge to an already visited vertex that is not the direct predecessor implies a path loop (cycle).",
      pseudocode: "visited = boolean[V]\ndfs(u, parent):\n  visited[u] = true\n  for v in adj[u]:\n    if not visited[v]:\n      if dfs(v, u) return true\n    else if v != parent: return true\n  return false",
      dryRun: "V=3, adj=[[1,2],[0,2],[0,1]] (triangle cycle)\ndfs(0,-1) -> visits 1. dfs(1,0) -> neighbor 2 unvisited -> dfs(2,1).\ndfs(2,1) -> neighbor 0 visited and 0!=parent(1) -> returns true! Cycle detected.",
      time: "O(V + E)",
      space: "O(V)",
      interviewPoints: [
        "Why is `v != parent` check required? (In undirected graph, we can always walk back to parent, which is not a cycle).",
        "Can BFS be used? (Yes, store parent in queue along with node).",
        "Disjoint-set (Union-Find) alternative for cycle detection."
      ]
    },
    java: `import java.util.*;

public class UndirectedCycle {
    public static boolean isCycle(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (dfs(i, -1, adj, visited)) return true;
            }
        }
        return false;
    }
    
    private static boolean dfs(int u, int parent, List<List<Integer>> adj, boolean[] visited) {
        visited[u] = true;
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                if (dfs(v, u, adj, visited)) return true;
            } else if (v != parent) {
                return true;
            }
        }
        return false;
    }
}`
  },
  "P-159": {
    logic: {
      summary: "Detect if there is a cycle in a directed graph.",
      approach: "DFS with recursion stack tracking. Maintain `visited` array and `inStack` array. If neighbor is in current recursion stack, a cycle exists.",
      intuition: "A cycle in a directed graph is represented by a 'back edge' pointing to an ancestor currently in the DFS path stack.",
      pseudocode: "visited = boolean[V], inStack = boolean[V]\ndfs(u):\n  visited[u] = true, inStack[u] = true\n  for v in adj[u]:\n    if not visited[v]:\n      if dfs(v) return true\n    else if inStack[v]: return true\n  inStack[u] = false\n  return false",
      dryRun: "0 -> 1 -> 2 -> 0. dfs(0) -> inStack={0}. dfs(1) -> inStack={0,1}. dfs(2) -> inStack={0,1,2}. neighbor 0 is inStack -> return true. Cycle detected.",
      time: "O(V + E)",
      space: "O(V)",
      interviewPoints: [
        "Why does parent check `v != parent` not work for directed cycles? (paths are unidirectional; we only check if a node is currently in the active DFS path).",
        "Explain Kahn's topological sort method for cycle detection (if topological sort list size < V, a cycle exists).",
        "Explain meaning of back edge."
      ]
    },
    java: `import java.util.*;

public class DirectedCycle {
    public static boolean isCyclic(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        boolean[] inStack = new boolean[V];
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (dfs(i, adj, visited, inStack)) return true;
            }
        }
        return false;
    }

    private static boolean dfs(int u, List<List<Integer>> adj, boolean[] visited, boolean[] inStack) {
        visited[u] = true;
        inStack[u] = true;
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                if (dfs(v, adj, visited, inStack)) return true;
            } else if (inStack[v]) {
                return true;
            }
        }
        inStack[u] = false;
        return false;
    }
}`
  },
  "P-160": {
    logic: {
      summary: "Return a topological sorting of the DAG.",
      approach: "Kahn's Algorithm (BFS). Compute in-degrees. Enqueue nodes with in-degree 0. Dequeue nodes, append to result, decrement neighbor in-degrees, and enqueue neighbors if in-degree becomes 0.",
      intuition: "Dependencies ordering. Vertices with 0 in-degree have no prerequisites and can be resolved immediately.",
      pseudocode: "inDegree = calculateInDegrees(), Q = [nodes with inDegree 0]\nres = []\nwhile Q:\n  u = Q.pop()\n  res.add(u)\n  for v in adj[u]:\n    inDegree[v]--\n    if inDegree[v] == 0: Q.push(v)\nreturn res",
      dryRun: "0->1, 0->2. inDegree={0:0, 1:1, 2:1}. Q=[0]\npop 0, res=[0]. dec 1, 2 -> inDegree={1:0, 2:0}. Q=[1,2]\npop 1, res=[0,1]. pop 2, res=[0,1,2]. Returns [0,1,2].",
      time: "O(V + E)",
      space: "O(V)",
      interviewPoints: [
        "Explain DFS alternative with Stack (push node to stack after visiting all its neighbors).",
        "Does topological sort exist for cyclic graphs? (No, only for DAGs).",
        "How to detect cycles using Kahn's algorithm."
      ]
    },
    java: `import java.util.*;

public class TopologicalSort {
    public static int[] topoSort(int V, List<List<Integer>> adj) {
        int[] inDegree = new int[V];
        for (int u = 0; u < V; u++) {
            for (int v : adj.get(u)) {
                inDegree[v]++;
            }
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) queue.add(i);
        }
        
        int[] result = new int[V];
        int idx = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            result[idx++] = u;
            for (int v : adj.get(u)) {
                inDegree[v]--;
                if (inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        return result;
    }
}`
  },
  "P-164": {
    logic: {
      summary: "Find the shortest path from source to all vertices in a weighted graph.",
      approach: "Dijkstra's Algorithm. Maintain distance array initialized to infinity. Use a PriorityQueue of `(node, distance)`. Greedily update neighbor distances if a shorter path is found.",
      intuition: "Greedy relaxation. Always expand the closest unvisited node first.",
      pseudocode: "Same as Network Delay Time.",
      dryRun: "V=3, adj=[[(1, w2), (2, w6)], [(2, w3)], []], src=0\ndist=[0, inf, inf]. PQ=[(0,0)]\npop 0. dist[1]=2, dist[2]=6. PQ=[(1,2), (2,6)]\npop 1. dist[2] = min(6, 2+3) = 5. PQ=[(2,5), (2,6)]. pop 2(dist 5). Returns [0, 2, 5].",
      time: "O(E log V)",
      space: "O(V + E)",
      interviewPoints: [
        "Explain why Dijkstra fails with negative weights.",
        "How to reconstruct shortest paths (maintain a parent array).",
        "Compare with Bellman-Ford O(V*E) complexity."
      ]
    },
    java: `import java.util.*;

public class DijkstraAlgorithm {
    public static int[] dijkstra(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int S) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[S] = 0;
        
        // PriorityQueue holds array of {vertex, distance}
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
        pq.add(new int[]{S, 0});
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0];
            int d = curr[1];
            if (d > dist[u]) continue;
            
            for (ArrayList<Integer> edge : adj.get(u)) {
                int v = edge.get(0);
                int w = edge.get(1);
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.add(new int[]{v, dist[v]});
                }
            }
        }
        return dist;
    }
}`
  },
  "LC-785": {
    logic: {
      summary: "Determine if a graph is bipartite (2-colorable).",
      approach: "Graph coloring using BFS/DFS. Initialize colors of all nodes to 0 (uncolored). Attempt to 2-color the graph with 1 and -1. If adjacent nodes ever share the same color, graph is not bipartite.",
      intuition: "Bipartite graph means we can partition vertices into two independent sets. No edges can connect vertices in the same set.",
      pseudocode: "colors = array[V] of 0\nfor i in V:\n  if colors[i] == 0:\n    colors[i] = 1, Q = [i]\n    while Q:\n      u = Q.pop()\n      for v in adj[u]:\n        if colors[v] == colors[u] return false\n        if colors[v] == 0: colors[v] = -colors[u], Q.push(v)\nreturn true",
      dryRun: "graph=[[1,3],[0,2],[1,3],[0,2]] (square)\nstart 0: col=1. Q=[0]\npop 0, neighbors 1, 3 color to -1. Q=[1, 3], col[1]=-1, col[3]=-1\npop 1, neighbor 2 color to 1. Q=[3, 2], col[2]=1\npop 3, neighbors 0, 2 (already colored 1 != -1) -> valid. Returns true.",
      time: "O(V + E)",
      space: "O(V) for colors and queue/recursion stack",
      interviewPoints: [
        "A graph is bipartite if and only if it contains no odd-length cycles. Explain why.",
        "How do you handle disconnected components?",
        "Compare BFS vs DFS implementation for 2-coloring."
      ]
    },
    java: `import java.util.*;

public class BipartiteGraph {
    public static boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] colors = new int[n]; // 0: uncolored, 1: red, -1: blue
        for (int i = 0; i < n; i++) {
            if (colors[i] == 0) {
                Queue<Integer> queue = new LinkedList<>();
                colors[i] = 1;
                queue.add(i);
                while (!queue.isEmpty()) {
                    int u = queue.poll();
                    for (int v : graph[u]) {
                        if (colors[v] == colors[u]) {
                            return false;
                        }
                        if (colors[v] == 0) {
                            colors[v] = -colors[u];
                            queue.add(v);
                        }
                    }
                }
            }
        }
        return true;
    }
}`
  },
  "LC-787": {
    logic: {
      summary: "Find the cheapest price from src to dst with at most k stops.",
      approach: "Bellman-Ford variant. Run relaxation on edges k + 1 times. Keep a copy of previous prices array to avoid using updated prices from the same iteration.",
      intuition: "Dynamic Programming. `dp[i][v]` represents min cost to reach v in at most i steps.",
      pseudocode: "prices = array[n] of infinity, prices[src] = 0\nfor i from 0 to k:\n  temp = copy(prices)\n  for u, v, w in flights:\n    if prices[u] + w < temp[v]:\n      temp[v] = prices[u] + w\n  prices = temp\nreturn prices[dst] == infinity ? -1 : prices[dst]",
      dryRun: "flights=[[0,1,100],[1,2,100],[0,2,500]], k=1. src=0, dst=2\nInit: prices=[0, inf, inf]\ni=0: temp=[0, 100, 500]. prices=[0, 100, 500]\ni=1: temp=[0, 100, min(500, 100+100=200)]. prices=[0, 100, 200]. Returns 200.",
      time: "O(K * E) where E is flights.length",
      space: "O(V) to store prices",
      interviewPoints: [
        "Why is it necessary to copy the prices array before each step? (prevents using information from the current iteration, which would simulate > 1 stop in a single step).",
        "Compare with Dijkstra's algorithm.",
        "What happens if there is a cycle?"
      ]
    },
    java: `import java.util.*;

public class CheapestFlights {
    public static int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] prices = new int[n];
        Arrays.fill(prices, Integer.MAX_VALUE);
        prices[src] = 0;
        
        for (int i = 0; i <= k; i++) {
            int[] temp = Arrays.copyOf(prices, n);
            for (int[] flight : flights) {
                int u = flight[0], v = flight[1], w = flight[2];
                if (prices[u] != Integer.MAX_VALUE && prices[u] + w < temp[v]) {
                    temp[v] = prices[u] + w;
                }
            }
            prices = temp;
        }
        return prices[dst] == Integer.MAX_VALUE ? -1 : prices[dst];
    }
}`
  },
  "LC-62": {
    logic: {
      summary: "Find the number of unique paths from top-left to bottom-right of an m x n grid.",
      approach: "Dynamic Programming. Maintain a 1D DP array of size n (columns). At each cell, `dp[j] = dp[j] + dp[j-1]`.",
      intuition: "To reach cell (i, j), we can only come from top cell (i-1, j) or left cell (i, j-1). Space can be compressed to O(n) by updating values in-place.",
      pseudocode: "dp = array[n] of 1\nfor i from 1 to m-1:\n  for j from 1 to n-1:\n    dp[j] += dp[j-1]\nreturn dp[n-1]",
      dryRun: "m=3, n=2\nInit: dp=[1, 1]\ni=1: dp[1] = dp[1]+dp[0] = 1+1 = 2. dp=[1, 2]\ni=2: dp[1] = dp[1]+dp[0] = 2+1 = 3. dp=[1, 3]. Returns 3.",
      time: "O(m * n)",
      space: "O(n) space complexity",
      interviewPoints: [
        "Explain mathematical formula: `(m + n - 2) choose (m - 1)` (combinatorics solution takes O(m) time and O(1) space).",
        "Compare top-down recursion with memoization vs bottom-up tabulation.",
        "How would you handle obstacle grid? (LC-63)."
      ]
    },
    java: `import java.util.*;

public class UniquePaths {
    public static int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}`
  },
  "LC-778": {
    logic: {
      summary: "Find the least time to swim from top-left to bottom-right of a grid where cell values represent water elevations.",
      approach: "Modified Dijkstra's Algorithm on a grid. PriorityQueue stores `(r, c, max_elevation)`. Maintain a 2D visited array to ensure we only process the minimum path elevation wave.",
      intuition: "We want to find a path that minimizes the maximum elevation along that path. Dijkstra's greedy choice naturally finds the path with the minimum peak first.",
      pseudocode: "pq = MinHeap((0, 0, grid[0][0])), visited = 2D boolean array\nwhile pq:\n  r, c, time = pq.pop()\n  if r == n-1 and c == n-1 return time\n  for nr, nc in neighbors(r, c):\n    if nr, nc not visited:\n      visited[nr][nc] = true\n      pq.push((nr, nc, max(time, grid[nr][nc])))",
      dryRun: "grid=[[0,2],[1,3]]\npq=[(0,0,0)]. pop (0,0,0). Neighbors: (0,1,2), (1,0,1). visited={(0,1), (1,0)}\npq=[(1,0,1), (0,1,2)]. pop (1,0,1). Neighbors: (1,1,max(1,3)=3). visited={(0,1), (1,0), (1,1)}\npq=[(0,1,2), (1,1,3)]. pop (0,1,2). Neighbors: (1,1) already visited.\npop (1,1,3). Reach end, returns 3.",
      time: "O(N^2 log N) where N is grid width",
      space: "O(N^2) for visited array and PriorityQueue",
      interviewPoints: [
        "Why is Dijkstra applicable here? (Because edge weights are non-negative elevations, and greedy choice works).",
        "Compare with Binary Search on answer + BFS/DFS check (O(N^2 log(max_val))).",
        "Verify grid size limits."
      ]
    },
    java: `import java.util.*;

public class SwimRisingWater {
    public static int swimInWater(int[][] grid) {
        int n = grid.length;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[2], b[2]));
        boolean[][] visited = new boolean[n][n];
        
        pq.add(new int[]{0, 0, grid[0][0]});
        visited[0][0] = true;
        
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int r = curr[0], c = curr[1], t = curr[2];
            if (r == n - 1 && c == n - 1) return t;
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < n && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    pq.add(new int[]{nr, nc, Math.max(t, grid[nr][nc])});
                }
            }
        }
        return -1;
    }
}`
  },
  "LC-668": {
    logic: {
      summary: "Find the kth smallest number in an m x n multiplication table.",
      approach: "Binary Search on values range [1, m * n]. For a guess `mid`, count numbers <= `mid` in each row of multiplication table: `count = sum(min(mid / i, n))` for i from 1 to m. Adjust search bounds based on k.",
      intuition: "The multiplication table is implicitly sorted row-by-row. Counting elements smaller than a target takes O(m) time, allowing binary search on value range.",
      pseudocode: "low = 1, high = m * n\nwhile low < high:\n  mid = low + (high-low)/2\n  count = 0\n  for i from 1 to m: count += min(mid / i, n)\n  if count < k: low = mid + 1\n  else: high = mid\nreturn low",
      dryRun: "m=3, n=3, k=5. low=1, high=9.\nmid=5. counts: i=1: min(5/1,3)=3; i=2: min(5/2,3)=2; i=3: min(5/3,3)=1. sum=6 >= 5 -> high=5.\nmid=3. counts: i=1: 3; i=2: 1; i=3: 1. sum=5 >= 5 -> high=3.\nmid=2. counts: i=1: 2; i=2: 1; i=3: 0. sum=3 < 5 -> low=3. Loop ends. Returns 3.",
      time: "O(m * log(m * n))",
      space: "O(1)",
      interviewPoints: [
        "Explain count calculation formula `min(mid / i, n)`.",
        "Compare with Kth Smallest Element in Sorted Matrix.",
        "Discuss multiplication table size overflow boundary (use long if m, n are up to 50000)."
      ]
    },
    java: `public class KthSmallestMultiplicationTable {
    public static int findKthNumber(int m, int n, int k) {
        int low = 1, high = m * n;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (countLessEqual(mid, m, n) < k) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
    
    private static int countLessEqual(int target, int m, int n) {
        int count = 0;
        for (int i = 1; i <= m; i++) {
            count += Math.min(target / i, n);
        }
        return count;
    }
}`
  },
  "LC-1337": {
    logic: {
      summary: "Find the indices of the k weakest rows in a binary matrix of soldiers (1s) and civilians (0s).",
      approach: "Calculate soldiers count in each row using Binary Search. Push `(soldiersCount, rowIndex)` to list or heap. Sort list by soldiers count, breaking ties with row indices, and return the first k.",
      intuition: "Each row has 1s followed by 0s. Binary search finds the transition boundary in O(log n) time per row.",
      pseudocode: "rows = []\nfor r in matrix:\n  soldiers = binarySearchSoldiers(r)\n  rows.add((soldiers, r.index))\nsort(rows)\nreturn first k indices of rows",
      dryRun: "mat=[[1,1,0],[1,0,0]], k=1\nrow 0 soldiers: 2. row 1: 1.\nsorted: [(1, idx 1), (2, idx 0)] -> return first 1 index -> [1].",
      time: "O(m log n + m log m) where matrix is m x n",
      space: "O(m) to store row strengths",
      interviewPoints: [
        "How binary search is used to count 1s (find first index of 0).",
        "Explain heap vs sorting for selecting top k weakest rows.",
        "Discuss space complexity."
      ]
    },
    java: `import java.util.*;

public class WeakestRows {
    public static int[] kWeakestRows(int[][] mat, int k) {
        int m = mat.length;
        int n = mat[0].length;
        int[][] strengths = new int[m][2];
        
        for (int i = 0; i < m; i++) {
            strengths[i][0] = countSoldiers(mat[i]);
            strengths[i][1] = i;
        }
        
        Arrays.sort(strengths, (a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            return Integer.compare(a[1], b[1]);
        });
        
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = strengths[i][1];
        }
        return result;
    }
    
    private static int countSoldiers(int[] row) {
        int low = 0, high = row.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (row[mid] == 1) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}`
  },
  "P-152": {
    logic: {
      summary: "Print/Construct the adjacency list for a given undirected graph.",
      approach: "Loop through all vertices. For each node, collect its neighbors and output them in a formatted list.",
      intuition: "Adjacency list maps each node to a list of its connected vertices, representing graph topology.",
      pseudocode: "adjList = Map()\nfor edge in edges:\n  adjList[edge.u].add(edge.v)\n  adjList[edge.v].add(edge.u)\nreturn adjList",
      dryRun: "V=3, edges=[[0,1],[1,2]]\n0 -> [1], 1 -> [0, 2], 2 -> [1]. Returns adj representation.",
      time: "O(V + E)",
      space: "O(V + E)",
      interviewPoints: [
        "Compare adjacency list vs adjacency matrix space and time tradeoffs.",
        "How does weight representation differ in adjacency lists?",
        "Discuss memory layout."
      ]
    },
    java: `import java.util.*;

public class AdjacencyList {
    public static List<List<Integer>> printGraph(int V, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }
        return adj;
    }
}`
  },
  "P-163": {
    logic: {
      summary: "Find the shortest path in an undirected unweighted graph from source to destination.",
      approach: "Breadth First Search (BFS). Since graph is unweighted, BFS guarantees finding the minimum edge-count path. Maintain a parent array to reconstruct the path.",
      intuition: "BFS expands outwards uniformly. The first time destination is reached, the path taken has the minimal possible number of edges.",
      pseudocode: "Q = [src], visited = boolean[V], parent = array of -1\nwhile Q:\n  u = Q.pop()\n  if u == dst break\n  for v in adj[u]:\n    if not visited[v]:\n      visited[v] = true, parent[v] = u, Q.push(v)\nreconstruct path using parent array",
      dryRun: "src=0, dst=2, adj=[[1],[0,2],[1]]\nQ=[0], visited={0}. pop 0 -> Q=[1], parent[1]=0, visited={0,1}\npop 1 -> Q=[2], parent[2]=1, visited={0,1,2}\npop 2 -> reached dst. Path: 2 <- 1 <- 0 -> returns [0, 1, 2].",
      time: "O(V + E)",
      space: "O(V) for visited, queue, and parent pointers",
      interviewPoints: [
        "Why does BFS guarantee shortest path in unweighted graphs? (Uniform edge weights mean level order equals shortest distance).",
        "How to reconstruct path from parent array.",
        "Compare with DFS (which does NOT guarantee shortest path)."
      ]
    },
    java: `import java.util.*;

public class ShortestPathUnweighted {
    public static List<Integer> shortestPath(List<List<Integer>> adj, int V, int src, int dst) {
        int[] parent = new int[V];
        Arrays.fill(parent, -1);
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[src] = true;
        queue.add(src);
        
        boolean found = false;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            if (u == dst) {
                found = true;
                break;
            }
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    queue.add(v);
                }
            }
        }
        
        List<Integer> path = new ArrayList<>();
        if (!found) return path;
        int curr = dst;
        while (curr != -1) {
            path.add(curr);
            curr = parent[curr];
        }
        Collections.reverse(path);
        return path;
    }
}`
  },
  "LC-1631": {
    logic: {
      summary: "Find a path from top-left to bottom-right of a grid that minimizes the maximum absolute difference between consecutive cells.",
      approach: "Modified Dijkstra's Algorithm. Maintain a 2D effort tracker initialized to infinity. Use a PriorityQueue to store `(r, c, effort)`. Update neighbors with `max(current_effort, abs(height_diff))`.",
      intuition: "We seek a bottleneck-minimized path. Dijkstra's algorithm allows greedy relaxation of path efforts.",
      pseudocode: "pq = MinHeap((0, 0, 0)), effort = 2D array of infinity, effort[0][0] = 0\nwhile pq:\n  r, c, e = pq.pop()\n  if r == rows-1 and c == cols-1 return e\n  for nr, nc in neighbors(r, c):\n    newEffort = max(e, abs(grid[r][c] - grid[nr][nc]))\n    if newEffort < effort[nr][nc]:\n      effort[nr][nc] = newEffort\n      pq.push((nr, nc, newEffort))",
      dryRun: "grid=[[1,2],[3,8]]\npq=[(0,0,0)]. pop (0,0,0). Neighbors: (0,1,max(0,|1-2|)=1), (1,0,max(0,|1-3|)=2).\npq=[(0,1,1), (1,0,2)]. pop (0,1,1). Neighbors: (1,1,max(1,|2-8|)=6).\npq=[(1,0,2), (1,1,6)]. pop (1,0,2). Neighbors: (1,1,max(2,|3-8|)=5).\npq=[(1,1,5), (1,1,6)]. pop (1,1,5) -> reached end. Returns 5.",
      time: "O(R * C log(R * C))",
      space: "O(R * C)",
      interviewPoints: [
        "Explain how the bottleneck property (minimax) modifies Dijkstra's transition equation.",
        "Compare with Union-Find (DSU) or Binary Search + BFS solutions.",
        "Discuss complexity differences."
      ]
    },
    java: `import java.util.*;

public class PathMinEffort {
    public static int minimumEffortPath(int[][] heights) {
        int rows = heights.length, cols = heights[0].length;
        int[][] effort = new int[rows][cols];
        for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[2], b[2]));
        pq.add(new int[]{0, 0, 0});
        effort[0][0] = 0;
        
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int r = curr[0], c = curr[1], e = curr[2];
            if (r == rows - 1 && c == cols - 1) return e;
            if (e > effort[r][c]) continue;
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < rows && nc < cols) {
                    int newEffort = Math.max(e, Math.abs(heights[r][c] - heights[nr][nc]));
                    if (newEffort < effort[nr][nc]) {
                        effort[nr][nc] = newEffort;
                        pq.add(new int[]{nr, nc, newEffort});
                    }
                }
            }
        }
        return 0;
    }
}`
  },
  "P-168": {
    logic: {
      summary: "Find shortest paths from source in a weighted graph using Bellman-Ford, detecting negative weight cycles.",
      approach: "Relax all edges V-1 times. To detect negative cycles, relax one more time; if any distance decreases, a negative cycle exists.",
      intuition: "In a graph without negative cycles, the shortest path can contain at most V-1 edges. The V-th iteration only improves distances if a negative cycle is present.",
      pseudocode: "dist = array[V] of infinity, dist[src] = 0\nfor i from 1 to V-1:\n  for u, v, w in edges:\n    if dist[u] + w < dist[v]: dist[v] = dist[u] + w\nfor u, v, w in edges:\n  if dist[u] + w < dist[v] return 'Negative Cycle'\nreturn dist",
      dryRun: "V=3, edges=[[0,1,2],[1,2,-5],[2,0,1]], src=0\ni=1: dist=[0, 2, -3]\ni=2: dist=[0, 2, -3] (no change). Next cycle check: 2->0: dist[2]+1 = -2 < dist[0](0) -> decreases! Returns negative cycle flag.",
      time: "O(V * E)",
      space: "O(V) for distances",
      interviewPoints: [
        "Why does Bellman-Ford run V-1 times? (a simple path has at most V-1 edges).",
        "Prove how the V-th check detects negative cycles.",
        "Compare with Dijkstra (Dijkstra fails on negative edges because it assumes visits are final)."
      ]
    },
    java: `import java.util.*;

public class BellmanFord {
    public static int[] bellmanFord(int V, List<int[]> edges, int S) {
        int[] dist = new int[V];
        Arrays.fill(dist, 100000000); // represents infinity
        dist[S] = 0;
        
        for (int i = 0; i < V - 1; i++) {
            for (int[] edge : edges) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != 100000000 && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }
        
        // Negative cycle check
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != 100000000 && dist[u] + w < dist[v]) {
                return new int[]{-1}; // denotes negative cycle detected
            }
        }
        return dist;
    }
}`
  },
  "P-170": {
    logic: {
      summary: "Find the sum of weights of edges in the Minimum Spanning Tree (MST).",
      approach: "Kruskal's Algorithm using Disjoint Set Union (DSU). Sort edges by weight. Iterate through sorted edges, adding an edge to the MST if its endpoints are in different component sets (prevents cycles).",
      intuition: "Greedy edge collection. Sorting guarantees we inspect the cheapest paths first. DSU tracks connected components efficiently.",
      pseudocode: "sort(edges by weight)\ndsu = DSU(V), mstWeight = 0\nfor u, v, w in edges:\n  if dsu.union(u, v):\n    mstWeight += w\nreturn mstWeight",
      dryRun: "edges=[[0,1,1],[1,2,3],[0,2,2]], V=3\nsorted: [0,1,w1], [0,2,w2], [1,2,w3]\nadd (0,1): weight=1, components={0,1}\nadd (0,2): weight=1+2=3, components={0,1,2}\nadd (1,2): already connected -> skip. Returns MST sum 3.",
      time: "O(E log E) where E is edge count",
      space: "O(V) for DSU parent arrays",
      interviewPoints: [
        "Explain Union-Find optimizations (Path Compression and Union by Rank).",
        "Compare Kruskal's vs Prim's algorithm (Prim's is better for dense graphs, Kruskal's for sparse).",
        "Prove why Kruskal's greedy choice yields the MST."
      ]
    },
    java: `import java.util.*;

public class MinimumSpanningTree {
    static class DSU {
        int[] parent, rank;
        DSU(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }
        int find(int i) {
            if (parent[i] == i) return i;
            return parent[i] = find(parent[i]); // path compression
        }
        boolean union(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                if (rank[rootI] < rank[rootJ]) {
                    parent[rootI] = rootJ;
                } else if (rank[rootI] > rank[rootJ]) {
                    parent[rootJ] = rootI;
                } else {
                    parent[rootJ] = rootI;
                    rank[rootI]++;
                }
                return true;
            }
            return false;
        }
    }
    
    public static int spanningTree(int V, int E, int[][] edges) {
        Arrays.sort(edges, (a, b) -> Integer.compare(a[2], b[2]));
        DSU dsu = new DSU(V);
        int mstWeight = 0;
        int count = 0;
        for (int[] edge : edges) {
            if (dsu.union(edge[0], edge[1])) {
                mstWeight += edge[2];
                count++;
                if (count == V - 1) break;
            }
        }
        return mstWeight;
    }
}`
  },
  "LC-79": {
    logic: {
      summary: "Search for a word in a 2D board of characters using backtracking.",
      approach: "DFS + Backtracking. For each cell matching `word[0]`, initiate DFS in 4 directions. Keep track of visited cells by swapping with '#' temporarily during traversal, and restoring it on backtrack.",
      intuition: "Traverse path sequentially. Marking visited cells in-place avoids extra memory allocations.",
      pseudocode: "dfs(r, c, idx):\n  if idx == word.length return true\n  if bounds check fail or board[r][c] != word[idx] return false\n  temp = board[r][c], board[r][c] = '#'\n  found = dfs(r+1,c) or dfs(r-1,c) or dfs(r,c+1) or dfs(r,c-1)\n  board[r][c] = temp\n  return found",
      dryRun: "board=[['A','B'],['C','D']], word='ABD'\nstart at (0,0)'A'. matches word[0]. board[0][0]='#'\ndfs(0,1)'B': matches word[1]. board[0][1]='#'\ndfs(1,1)'D': matches word[2]. board[1][1]='#' -> idx=3 == word.length -> return true. word found.",
      time: "O(M * N * 4^L) where L is the length of the word",
      space: "O(L) recursion stack depth",
      interviewPoints: [
        "Why is in-place replacement '#' better than using a boolean visited matrix? (Saves O(M*N) space).",
        "Explain backtracking recursion termination criteria.",
        "Discuss search space pruning."
      ]
    },
    java: `public class WordSearch {
    public static boolean exist(char[][] board, String word) {
        int m = board.length;
        int n = board[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == word.charAt(0) && dfs(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private static boolean dfs(char[][] board, String word, int r, int c, int idx) {
        if (idx == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(idx)) {
            return false;
        }
        
        char temp = board[r][c];
        board[r][c] = '#'; // mark visited
        
        boolean found = dfs(board, word, r + 1, c, idx + 1)
                     || dfs(board, word, r - 1, c, idx + 1)
                     || dfs(board, word, r, c + 1, idx + 1)
                     || dfs(board, word, r, c - 1, idx + 1);
                     
        board[r][c] = temp; // backtrack
        return found;
    }
}`
  },
  "LC-210": {
    logic: {
      summary: "Find a valid ordering of courses to take given pre-requisite pairings.",
      approach: "Topological Sort (Kahn's BFS). Calculate indegrees of all nodes. Enqueue nodes with indegree 0. Repeatedly pop, add to order list, and decrement neighbor indegrees. Enqueue neighbors whose indegree becomes 0.",
      intuition: "A course can only be taken when all its prerequisites (indegree) are resolved. BFS schedules courses as they become available.",
      pseudocode: "indegree = array of size V, adj = Map()\nfor u, v in edges: adj[v].add(u), indegree[u]++\nQ = [nodes with indegree 0], order = []\nwhile Q:\n  curr = Q.pop()\n  order.add(curr)\n  for nbr in adj[curr]:\n    indegree[nbr]--\n    if indegree[nbr] == 0: Q.push(nbr)\nreturn order.size == V ? order : []",
      dryRun: "V=2, edges=[[1,0]]. indegree: [0:0, 1:1]. Q=[0].\npop 0 -> order=[0]. nbr 1 indegree -> 0 -> Q=[1].\npop 1 -> order=[0, 1]. Returns [0, 1].",
      time: "O(V + E)",
      space: "O(V + E) for adjacency list and queue",
      interviewPoints: [
        "How is a cycle detected in Kahn's algorithm? (If order list size is less than total vertices, a cycle exists).",
        "Compare Kahn's (BFS) with DFS-based topological sort (using visited states 0, 1, 2).",
        "Explain indegree concept."
      ]
    },
    java: `import java.util.*;

public class CourseScheduleII {
    public static int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[numCourses];
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            indegree[p[0]]++;
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) queue.add(i);
        }
        
        int[] order = new int[numCourses];
        int idx = 0;
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            order[idx++] = curr;
            for (int nbr : adj.get(curr)) {
                indegree[nbr]--;
                if (indegree[nbr] == 0) {
                    queue.add(nbr);
                }
            }
        }
        return idx == numCourses ? order : new int[0];
    }
}`
  },
  "LC-261": {
    logic: {
      summary: "Determine if an undirected graph is a valid tree.",
      approach: "Union Find / DSU. Verify that total edges equals `n - 1`. For each edge, perform union. If union fails, a cycle is detected, so return false.",
      intuition: "A tree is a connected graph with no cycles. Under undirected constraints, having exactly n-1 edges and no cycles guarantees a tree structure.",
      pseudocode: "if edges.length != n-1 return false\nInitialize DSU of size n\nfor u, v in edges:\n  if not union(u, v) return false\nreturn true",
      dryRun: "n=4, edges=[[0,1],[1,2],[2,3]]\nunion(0,1) -> OK. union(1,2) -> OK. union(2,3) -> OK. Loop ends. Returns true.",
      time: "O(N * alpha(N))",
      space: "O(N) for parent array",
      interviewPoints: [
        "Why is checking `edges.length == n - 1` a critical pre-condition?",
        "Explain Union Find path compression optimization.",
        "Can this be solved using DFS? Yes, start DFS at 0, check if we visit all nodes and find no cycles."
      ]
    },
    java: `public class GraphValidTree {
    static class DSU {
        int[] parent;
        DSU(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }
        int find(int i) {
            if (parent[i] == i) return i;
            return parent[i] = find(parent[i]);
        }
        boolean union(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                parent[rootI] = rootJ;
                return true;
            }
            return false;
        }
    }

    public static boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) return false;
        DSU dsu = new DSU(n);
        for (int[] edge : edges) {
            if (!dsu.union(edge[0], edge[1])) {
                return false; // cycle detected
            }
        }
        return true;
    }
}`
  },
  "LC-269": {
    logic: {
      summary: "Reconstruct the alphabetical order of letters in an alien language given a sorted dictionary of words.",
      approach: "Topological Sort. Match adjacent words character-by-character. The first mismatching character pair `c1 -> c2` defines a directed edge. Perform Kahn's/DFS topological sort to obtain the character order. Detect cycles.",
      intuition: "Sorted dictionary implies prefix relationships. Transitive comparison provides relative priority edges.",
      pseudocode: "Build graph with nodes of unique characters\nfor i from 0 to words.length-2:\n  find first mismatch: w1[j] != w2[j] -> add edge w1[j]->w2[j]\n  handle prefix edge case\nRun topological sort. If cycle exists return \"\"",
      dryRun: "words=['wrt','wrf','er']\ncompare wrt, wrf -> t->f. compare wrf, er -> w->e.\nGraph: t->f, w->e. indegrees: w:0, e:1, r:0, t:0, f:1.\nTopological order: w -> t -> r -> e -> f. Returns 'wtref'.",
      time: "O(C) where C is the total number of characters in all words",
      space: "O(V + E) where V <= 26 and E <= 26",
      interviewPoints: [
        "Explain the prefix edge case: if `w1` is a prefix of `w2` and `w1.length > w2.length` (e.g. ['abc', 'ab']), it is invalid -> return \"\".",
        "Why is vertex count bounded by 26? (Only lowercase English letters are used).",
        "Cycle detection verification."
      ]
    },
    java: `import java.util.*;

public class AlienDictionary {
    public static String alienOrder(String[] words) {
        Map<Character, Set<Character>> adj = new HashMap<>();
        Map<Character, Integer> indegree = new HashMap<>();
        for (String w : words) {
            for (char c : w.toCharArray()) {
                adj.putIfAbsent(c, new HashSet<>());
                indegree.putIfAbsent(c, 0);
            }
        }
        
        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i];
            String w2 = words[i+1];
            if (w1.length() > w2.length() && w1.startsWith(w2)) {
                return ""; // invalid prefix order
            }
            int len = Math.min(w1.length(), w2.length());
            for (int j = 0; j < len; j++) {
                char c1 = w1.charAt(j);
                char c2 = w2.charAt(j);
                if (c1 != c2) {
                    if (!adj.get(c1).contains(c2)) {
                        adj.get(c1).add(c2);
                        indegree.put(c2, indegree.get(c2) + 1);
                    }
                    break;
                }
            }
        }
        
        Queue<Character> queue = new LinkedList<>();
        for (char c : indegree.keySet()) {
            if (indegree.get(c) == 0) queue.add(c);
        }
        
        StringBuilder sb = new StringBuilder();
        while (!queue.isEmpty()) {
            char curr = queue.poll();
            sb.append(curr);
            for (char nbr : adj.get(curr)) {
                indegree.put(nbr, indegree.get(nbr) - 1);
                if (indegree.get(nbr) == 0) queue.add(nbr);
            }
        }
        return sb.length() == indegree.size() ? sb.toString() : "";
    }
}`
  },
  "LC-286": {
    logic: {
      summary: "Fill each empty room with the distance to its nearest gate.",
      approach: "Multi-Source BFS. Start BFS simultaneously from all gates (value 0). For each empty room (value 2147483647) visited, update its value to distance and enqueue.",
      intuition: "BFS from gates guarantees that the first time we visit a room, we do so via the shortest path from *any* gate.",
      pseudocode: "Q = Queue()\nEnqueue all cells with value 0\nwhile Q:\n  r, c = Q.pop()\n  for nr, nc in neighbors(r, c):\n    if board[nr][nc] == INF:\n      board[nr][nc] = board[r][c] + 1\n      Q.push(nr, nc)",
      dryRun: "board=[[INF, -1, 0, INF]]\nEnqueue (0,2). Q=[(0,2)].\npop (0,2): check nbrs. (0,1) is wall (-1). (0,3) is INF -> board[0][3] = 0+1 = 1, Q=[(0,3)].\npop (0,3): end. board=[[INF, -1, 0, 1]].",
      time: "O(M * N)",
      space: "O(M * N) queue capacity",
      interviewPoints: [
        "Why is multi-source BFS better than running individual BFS from each gate? (Individual BFS would take O(G * M * N) which is slower).",
        "Identify base cases and out-of-bound checks.",
        "Compare space complexity with recursive DFS."
      ]
    },
    java: `import java.util.*;

public class WallsAndGates {
    public static void wallsAndGates(int[][] rooms) {
        if (rooms == null || rooms.length == 0) return;
        int m = rooms.length;
        int n = rooms[0].length;
        Queue<int[]> queue = new LinkedList<>();
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (rooms[i][j] == 0) {
                    queue.add(new int[]{i, j});
                }
            }
        }
        
        int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int r = curr[0];
            int c = curr[1];
            for (int[] d : dirs) {
                int nr = r + d[0];
                int nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] == Integer.MAX_VALUE) {
                    rooms[nr][nc] = rooms[r][c] + 1;
                    queue.add(new int[]{nr, nc});
                }
            }
        }
    }
}`
  },
  "LC-323": {
    logic: {
      summary: "Find the number of connected components in an undirected graph.",
      approach: "Union Find / DSU. Initialize components count to n. For each edge, perform union. If union succeeds (roots were different), decrement components count.",
      intuition: "Every successful union merges two disconnected components, decreasing total count by 1.",
      pseudocode: "Initialize DSU of size n, count = n\nfor u, v in edges:\n  if union(u, v): count--\nreturn count",
      dryRun: "n=4, edges=[[0,1],[2,3]]\nInitially count=4.\nunion(0,1) -> merged -> count=3.\nunion(2,3) -> merged -> count=2. Returns 2.",
      time: "O(V + E * alpha(V))",
      space: "O(V) for DSU parent tracking",
      interviewPoints: [
        "Explain Union Find optimization techniques: Path Compression and Union by Rank.",
        "Compare with DFS/BFS component counting (also linear time, but uses visited sets).",
        "Amortized complexity benefits."
      ]
    },
    java: `public class ConnectedComponentsCount {
    static class DSU {
        int[] parent;
        int count;
        DSU(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
            count = n;
        }
        int find(int i) {
            if (parent[i] == i) return i;
            return parent[i] = find(parent[i]);
        }
        boolean union(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                parent[rootI] = rootJ;
                count--;
                return true;
            }
            return false;
        }
    }

    public static int countComponents(int n, int[][] edges) {
        DSU dsu = new DSU(n);
        for (int[] edge : edges) {
            dsu.union(edge[0], edge[1]);
        }
        return dsu.count;
    }
}`
  },
  "LC-329": {
    logic: {
      summary: "Find the length of the longest increasing path in a matrix.",
      approach: "DFS + Memoization. For each cell, run DFS to find the longest increasing path. Store results in a memoization grid `memo[r][c]`. If a cell is visited again, return its memoized result.",
      intuition: "Matrix represents a Directed Acyclic Graph (DAG) when transitions are strictly increasing. Memoized DFS calculates DAG longest paths in linear time.",
      pseudocode: "memo = 2D array of 0\ndfs(r, c):\n  if memo[r][c] != 0 return memo[r][c]\n  maxVal = 1\n  for nr, nc in neighbors(r, c):\n    if matrix[nr][nc] > matrix[r][c]:\n      maxVal = max(maxVal, 1 + dfs(nr, nc))\n  memo[r][c] = maxVal\n  return maxVal",
      dryRun: "matrix=[[9,9],[3,4]], memo=[[0,0],[0,0]]\ndfs(1,0)'3': nbrs 9, 4. dfs(1,1)'4' -> maxVal=1+dfs(0,1)='9'. dfs(0,1) -> 1. dfs(1,1) -> 2. dfs(1,0) -> 3. Returns 3.",
      time: "O(M * N)",
      space: "O(M * N) for memo table and recursion",
      interviewPoints: [
        "Why is backtracking visited set not needed? (Because paths must be strictly increasing, making cycles impossible).",
        "Compare with Topological Sort on matrix cells.",
        "Analyze call stack overhead."
      ]
    },
    java: `public class LongestIncreasingPath {
    public static int longestIncreasingPath(int[][] matrix) {
        if (matrix == null || matrix.length == 0) return 0;
        int m = matrix.length;
        int n = matrix[0].length;
        int[][] memo = new int[m][n];
        int maxLen = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                maxLen = Math.max(maxLen, dfs(matrix, i, j, memo));
            }
        }
        return maxLen;
    }
    
    private static int dfs(int[][] matrix, int r, int c, int[][] memo) {
        if (memo[r][c] != 0) return memo[r][c];
        int max = 1;
        int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0];
            int nc = c + d[1];
            if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length && matrix[nr][nc] > matrix[r][c]) {
                max = Math.max(max, 1 + dfs(matrix, nr, nc, memo));
            }
        }
        memo[r][c] = max;
        return max;
    }
}`
  },
  "LC-332": {
    logic: {
      summary: "Reconstruct a flight itinerary in lexical order starting from JFK.",
      approach: "Hierholzer's Algorithm (Eulerian Path). Build adjacency list using MinHeaps (PriorityQueues) to ensure alphabetical selection. Run DFS, recursively visiting neighbors. After exploring all outgoing edges of a node, add node to front of itinerary list.",
      intuition: "Hierholzer's algorithm traces an Eulerian path. Adding nodes on backtracking ensures that dead-ends are written to the end of the path correctly.",
      pseudocode: "adj = Map(source -> MinHeap(destinations))\nitinerary = LinkedList()\ndfs(curr):\n  while adj[curr] has elements:\n    dfs(adj[curr].poll())\n  itinerary.addFirst(curr)\ndfs('JFK')",
      dryRun: "flights=[JFK->SFO, SFO->JFK]\ndfs(JFK) -> visits SFO.\ndfs(SFO) -> visits JFK.\ndfs(JFK) (no flights left) -> addFirst(JFK).\nbacktrack SFO -> addFirst(SFO). backtrack JFK -> addFirst(JFK). Result: JFK->SFO->JFK.",
      time: "O(E log E) due to PriorityQueue sorting",
      space: "O(V + E)",
      interviewPoints: [
        "Why is Eulerian Path Hierholzer's algorithm suited for this? (Because we must use every flight ticket exactly once).",
        "Why does adding elements on backtracking solve dead-end loops? (Ensures cycles are processed and returned correctly without getting stuck).",
        "Compare with backtracking DFS."
      ]
    },
    java: `import java.util.*;

public class ReconstructItinerary {
    public static List<String> findItinerary(List<List<String>> tickets) {
        Map<String, PriorityQueue<String>> adj = new HashMap<>();
        for (List<String> t : tickets) {
            adj.putIfAbsent(t.get(0), new PriorityQueue<>());
            adj.get(t.get(0)).add(t.get(1));
        }
        
        LinkedList<String> itinerary = new LinkedList<>();
        dfs("JFK", adj, itinerary);
        return itinerary;
    }
    
    private static void dfs(String curr, Map<String, PriorityQueue<String>> adj, LinkedList<String> itinerary) {
        PriorityQueue<String> pq = adj.get(curr);
        while (pq != null && !pq.isEmpty()) {
            dfs(pq.poll(), adj, itinerary);
        }
        itinerary.addFirst(curr);
    }
}`
  },
  "LC-417": {
    logic: {
      summary: "Find grid cells from which water can flow to both Pacific and Atlantic oceans.",
      approach: "DFS from ocean boundaries. Run DFS from Pacific borders (top, left) and mark reachable. Run DFS from Atlantic borders (bottom, right) and mark reachable. Cells visited by both DFS passes form the result.",
      intuition: "Flowing inward (from low ocean levels to high land levels) is easier than checking all cells outwards.",
      pseudocode: "pacific = 2D boolean array, atlantic = 2D boolean array\nfor i in rows:\n  dfs(i, 0, pacific), dfs(i, cols-1, atlantic)\nfor j in cols:\n  dfs(0, j, pacific), dfs(rows-1, j, atlantic)\nres = intersection of pacific and atlantic",
      dryRun: "1x2 grid heights=[[1, 2]]. Pacific reachable: (0,0),(0,1). Atlantic reachable: (0,1). Intersection = (0,1). Returns [[0,1]].",
      time: "O(M * N)",
      space: "O(M * N) visited state storage",
      interviewPoints: [
        "Why flow water backwards (ocean to land)? (Saves redundant paths search compared to flow from land to ocean).",
        "Define grid transition checks (height must be >= parent height).",
        "Discuss DFS stack safety."
      ]
    },
    java: `import java.util.*;

public class PacificAtlanticWater {
    public static List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> result = new ArrayList<>();
        if (heights == null || heights.length == 0) return result;
        int m = heights.length;
        int n = heights[0].length;
        boolean[][] pac = new boolean[m][n];
        boolean[][] atl = new boolean[m][n];
        
        for (int i = 0; i < m; i++) {
            dfs(heights, i, 0, Integer.MIN_VALUE, pac);
            dfs(heights, i, n - 1, Integer.MIN_VALUE, atl);
        }
        for (int j = 0; j < n; j++) {
            dfs(heights, 0, j, Integer.MIN_VALUE, pac);
            dfs(heights, m - 1, j, Integer.MIN_VALUE, atl);
        }
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (pac[i][j] && atl[i][j]) {
                    result.add(Arrays.asList(i, j));
                }
            }
        }
        return result;
    }
    
    private static void dfs(int[][] heights, int r, int c, int prevVal, boolean[][] ocean) {
        if (r < 0 || r >= heights.length || c < 0 || c >= heights[0].length || ocean[r][c] || heights[r][c] < prevVal) {
            return;
        }
        ocean[r][c] = true;
        dfs(heights, r + 1, c, heights[r][c], ocean);
        dfs(heights, r - 1, c, heights[r][c], ocean);
        dfs(heights, r, c + 1, heights[r][c], ocean);
        dfs(heights, r, c - 1, heights[r][c], ocean);
    }
}`
  },
  "LC-684": {
    logic: {
      summary: "Find the redundant edge in a graph that forms a cycle.",
      approach: "Union Find / DSU. For each edge `(u, v)`, check if they belong to same set (have same root). If yes, this edge completes a cycle and is redundant. Otherwise, union the sets.",
      intuition: "Adding an edge between two already connected vertices must form a cycle.",
      pseudocode: "Initialize DSU of size n\nfor u, v in edges:\n  if not union(u, v): return [u, v]\nreturn []",
      dryRun: "edges=[[1,2],[2,3],[3,1]]\nunion(1,2) -> roots differ -> union.\nunion(2,3) -> roots differ -> union.\nunion(3,1) -> roots match! (both root to 1) -> return [3,1]. Cycle edge found.",
      time: "O(N * alpha(N))",
      space: "O(N)",
      interviewPoints: [
        "Why is DSU best suited for dynamic connectivity / cycle detection?",
        "Compare with DFS cycle check (requires rebuilding graph and searching, DSU does it online).",
        "Amortized runtime properties."
      ]
    },
    java: `public class RedundantConnection {
    static class DSU {
        int[] parent;
        DSU(int n) {
            parent = new int[n + 1];
            for (int i = 0; i <= n; i++) parent[i] = i;
        }
        int find(int i) {
            if (parent[i] == i) return i;
            return parent[i] = find(parent[i]);
        }
        boolean union(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                parent[rootI] = rootJ;
                return true;
            }
            return false;
        }
    }

    public static int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        DSU dsu = new DSU(n);
        for (int[] edge : edges) {
            if (!dsu.union(edge[0], edge[1])) {
                return edge;
            }
        }
        return new int[0];
    }
}`
  },
  "LC-695": {
    logic: {
      summary: "Find the maximum area of an island in a 2D grid.",
      approach: "DFS traversal. Scan grid. For each land cell '1', trigger DFS to calculate area (size of island), marking visited cells to '0' to avoid duplicates. Maintain max.",
      intuition: "DFS explores contiguous cells. Clearing visited land to 0 avoids allocating a visited tracking table.",
      pseudocode: "dfs(r, c):\n  if bounds fail or grid[r][c] == 0 return 0\n  grid[r][c] = 0 // mark visited\n  return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1)\nmaxArea = max(dfs(r, c) for all r, c)",
      dryRun: "grid=[[1,1],[0,0]]. dfs(0,0) -> grid[0][0]=0. visits (0,1) -> grid[0][1]=0. returns 1+1=2. maxArea = 2.",
      time: "O(M * N)",
      space: "O(M * N) recursion stack in worst case (entire grid is land)",
      interviewPoints: [
        "Explain why marking land to '0' is safe and optimal.",
        "Compare with BFS using Queue.",
        "Handle edge cases of empty grid."
      ]
    },
    java: `public class MaxAreaIsland {
    public static int maxAreaOfIsland(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int maxArea = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    maxArea = Math.max(maxArea, dfs(grid, i, j));
                }
            }
        }
        return maxArea;
    }
    
    private static int dfs(int[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == 0) {
            return 0;
        }
        grid[r][c] = 0; // mark visited
        return 1 + dfs(grid, r + 1, c)
                 + dfs(grid, r - 1, c)
                 + dfs(grid, r, c + 1)
                 + dfs(grid, r, c - 1);
    }
}`
  },
  "LC-1584": {
    logic: {
      summary: "Find the minimum cost to connect all points (Minimum Spanning Tree).",
      approach: "Prim's Algorithm. Start with point 0. Maintain an array `minDist` of distances to other points. Repeatedly pick the closest point not in MST, add its distance to cost, and update neighbor distances using Manhattan distance.",
      intuition: "Dense graph has V^2 edges. Prim's O(V^2) is faster than Kruskal's O(E log V) because there is no edge sorting needed.",
      pseudocode: "cost = 0, count = 0, inMST = boolean array, minDist = array of INF, minDist[0] = 0\nwhile count < N:\n  curr = findMinPoint(minDist, inMST)\n  cost += minDist[curr], inMST[curr] = true, count++\n  for next in points:\n    if not inMST[next]:\n      minDist[next] = min(minDist[next], manhattanDistance(curr, next))\nreturn cost",
      dryRun: "points=[[0,0],[2,2],[3,10]]\nInitialize minDist=[0, INF, INF].\ncurr=0: cost=0. minDist=[0, 4, 13].\ncurr=1: cost=4. minDist=[0, 4, 9] (dist 1->2 is |2-3|+|2-10|=1+8=9).\ncurr=2: cost=4+9=13. Returns 13.",
      time: "O(N^2) where N is number of points",
      space: "O(N) to store MST status and distances",
      interviewPoints: [
        "Why is Prim's O(n^2) preferred over Kruskal's for dense/complete graphs? (Complete graphs have E = N^2. Kruskal's takes O(N^2 log N) to sort edges, while Prim's runs in O(N^2) without heap).",
        "Define Manhattan distance formula: `|x1 - x2| + |y1 - y2|`.",
        "Check index alignments."
      ]
    },
    java: `import java.util.*;

public class MinCostConnectPoints {
    public static int minCostConnectPoints(int[][] points) {
        int n = points.length;
        int cost = 0;
        int count = 0;
        boolean[] inMST = new boolean[n];
        int[] minDist = new int[n];
        Arrays.fill(minDist, Integer.MAX_VALUE);
        minDist[0] = 0;
        
        while (count < n) {
            int curr = -1;
            for (int i = 0; i < n; i++) {
                if (!inMST[i] && (curr == -1 || minDist[i] < minDist[curr])) {
                    curr = i;
                }
            }
            
            inMST[curr] = true;
            cost += minDist[curr];
            count++;
            
            for (int next = 0; next < n; next++) {
                if (!inMST[next]) {
                    int dist = Math.abs(points[curr][0] - points[next][0])
                             + Math.abs(points[curr][1] - points[next][1]);
                    if (dist < minDist[next]) {
                        minDist[next] = dist;
                    }
                }
            }
        }
        return cost;
    }
}`
  }
};


