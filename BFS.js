/**
BFS 常用在 找最短路姓解 -> 以tree為例，每遍歷1層，就與原點多1步驟(不會有Loop問題)
BFS 的實作常常用 Queue 實現
利用 Queue FIFO 的特性 
在遍歷過程中時常會需考慮不能碰到已訪問過的節點，可能會讓效能大減 or 無限輪迴(Loop Graph)
*/

//* M - 279. Perfect Squares
// dp , BFS
// https://leetcode.com/problems/perfect-squares/

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  let dp = {};

  for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
    dp[i * i] = 1;
  }

  function BFS(number) {
    let step = 0;
    let queue = [number];

    while (queue.length > 0) {
      //要先儲存 size，否則之後 push 會因 queue 長度改變造成錯誤
      let size = queue.length;

      //每輪for結束代表已將number減去一輪平方數，並將所有餘值推入queue
      for (let i = 0; i < size; i++) {
        let curr = queue.shift();

        //原值即為完全平方數
        if (dp[curr]) {
          //return 可直接跳出迴圈和函式，直接回傳結果
          //若還需繼續遍歷，需使用 continue / break
          return 1;
        }

        for (let i = Math.floor(Math.sqrt(curr)); i >= 1; i--) {
          let next = curr - i * i;

          //如果next存在，代表其為完全平方數，只需再做一步即完成
          if (dp[next]) {
            return dp[next] + step + 1;
          } else {
            queue.push(next);
          }
        }
      }
      //減去一次後，+1步
      step += 1;
    }
  }

  return BFS(n);
};

//////////////////////////////////////////////////////

//* M - 200. Number of Islands
// array , DFS , BFS
// https://leetcode.com/problems/number-of-islands/

//? 找到"1"時，將四周與其相連的"1"全改為"0"，陸地數+1，並繼續遍歷矩陣直到矩陣尾端

/**
 * @param {character[][]} grid
 * @return {number}
 */

var numIslands = function (grid) {
  let H = grid.length;
  let L = H ? grid[0].length : 0;
  let islands = 0;

  if (!H || !L) {
    return 0;
  }

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < L; j++) {
      if (grid[i][j] === "0") {
        continue;
      } else if (grid[i][j] === "1") {
        BFS(i, j);
        islands++;
      }
    }
  }

  function BFS(h, l) {
    let queue = [];
    queue.push([h, l]);

    while (queue.length > 0) {
      let size = queue.length;
      for (let step = 0; step < size; step++) {
        let [i, j] = queue.shift();
        if (i < 0 || j < 0 || i > H - 1 || j > L - 1) break;
        if (grid[i][j] === "0") break;

        grid[i][j] = "0";
        queue.push([i + 1, j]);
        queue.push([i - 1, j]);
        queue.push([i, j + 1]);
        queue.push([i, j - 1]);
      }
    }
  }

  return islands;
};

//////////////////////////////////////////////////////

//* M - 752. Open the Lock
//Array , hash-table , BFS
//https://leetcode.com/problems/open-the-lock/

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  //雜湊表比陣列檢索效率更好
  let visited = {};

  let queue = ["0000"];
  let step = 0;

  if (target === "0000") {
    return 0;
  }

  while (queue.length > 0) {
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let curr = queue.shift();
      let currArray = curr.split("").map((v) => +v);

      if (curr === target) {
        return step;
      }

      if (deadends.includes(curr)) {
        continue;
      }

      for (let j = 0; j < 4; j++) {
        let currClone = [...currArray];
        currClone[j] = currClone[j] + 1 > 9 ? 0 : currClone[j] + 1;
        let stringify = currClone.join("");
        if (!visited[stringify]) {
          queue.push(currClone.join(""));
          visited[stringify] = stringify;
        }
      }

      for (let j = 0; j < 4; j++) {
        let currClone = [...currArray];
        currClone[j] = currClone[j] - 1 < 0 ? 9 : currClone[j] - 1;
        let stringify = currClone.join("");
        if (!visited[stringify]) {
          queue.push(currClone.join(""));
          visited[stringify] = stringify;
        }
      }
    }
    step++;
  }

  return -1;
};
