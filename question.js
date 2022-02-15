// M , Array
// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/770/
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

var rotate = function (matrix) {
  const answer = matrix.map((row, i) => {
    let newRow = [];
    let n = matrix.length;
    while (n > 0) {
      newRow.push(matrix[n - 1][i]);
      n--;
    }

    return newRow;
  });

  matrix.splice(0);
  matrix.push(...answer);
};

//

var myAtoi = function (s) {
  let isNag = false;
  let ans = "";

  let sArray = s.trim().split("");

  if (sArray[0] === "-") {
    isNag = true;
    sArray.splice(0, 1);
  } else if (sArray[0] === "+") {
    sArray.splice(0, 1);
  }

  for (let i = 0; i < sArray.length; i++) {
    if (isNaN(sArray[i]) || sArray[i] === " ") {
      ans = 0;
      break;
    }

    ans = ans + sArray[i];
  }

  if (isNag) {
    ans = Number("-" + ans);
  } else {
    ans = Number(ans);
  }

  if (ans > 2 ** 31 - 1) {
    ans = 2 ** 31 - 1;
  }

  if (ans < -(2 ** 31)) {
    ans = -(2 ** 31);
  }

  return ans;
};

//

var strStr = function (haystack, needle) {
  let ans;
  let firstLetterIndexArray = haystack.split("").map((v, i) => {
    if (v === needle.slice(0, 1)) {
      return i;
    }
    return null;
  });

  firstLetterIndexArray = [...new Set(firstLetterIndexArray)];

  firstLetterIndexArray.forEach((index) => {
    if (
      haystack.slice(index, index + needle.length) === needle &&
      needle.trim().length !== 0
    ) {
      ans = index;
    }
  });

  if (needle.trim().length === 0) {
    ans = 0;
  }

  return ans;
};

//M , String
// https://leetcode.com/problems/count-and-say/
/**
 * @param {number} n
 * @return {string}
 */
//* 第一次寫到函式遞迴的解法

var countAndSay1 = function (n) {
  if (n === 1) {
    return "1";
  }
  let ans = [];

  countAndSay(n - 1)
    .split("")
    .forEach((v, i, arr) => {
      let count = 1;
      while (v === arr[i + count]) {
        count += 1;
      }

      if (v !== arr[i - 1] || i === 0) {
        ans.push(`${count}`);
        ans.push(v);
      }
    });
  // console.log(ans);

  return ans.join("");
};

//* LeetCode上迭代的解法
const countAndSay2 = (n) => {
  let str = "1";
  while (n > 1) {
    let newStr = "",
      count = 0,
      say = str[0];
    for (let i = 0; i < str.length; i += 1) {
      if (str[i] === say) {
        count += 1;
      } else {
        newStr += count + say;
        count = 1;
        say = str[i];
      }
    }
    str = newStr + count + say;
    n -= 1;
  }
  return str;
};

var numSquares = function (n) {
  let step = 0;

  function BFS() {
    let queue = [n];
    while (queue.length > 0) {
      for (let i = 0; i < queue.length; i++) {
        let curr = queue[0];
        if (curr === 0) {
          queue = [];
          break;
        }
        for (let i = 1; i <= Math.floor(Math.sqrt(curr)); i++) {
          queue.push(curr - i ** 2);
        }
        queue.shift();
      }
      step += 1;
    }
    return step;
  }

  return BFS();
};

/**
 * @param {number} n
 * @return {number}
 */
var numSquares2 = function (n) {
  let dp = {};

  for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
    dp[i * i] = 1;
  }

  function BFS(number) {
    let step = 0;
    let queue = [number];
    let min = Infinity;

    a: while (queue.length > 0) {
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        let curr = queue.shift();
        for (let i = Math.floor(Math.sqrt(curr)); i >= 1; i--) {
          let next = curr - i * i;
          if (next === 0) {
            step++;
            break a;
          }

          if (dp[next]) {
            if (dp[next] + step + 1 <= min) {
              min = dp[next] + step + 1;
            }
          } else {
            queue.push(next);
          }
        }
      }
      if (step >= min) {
        step = min;
        break a;
      }
      step += 1;
    }
    return step;
  }

  return BFS(n);
};

console.log(numSquares2());
