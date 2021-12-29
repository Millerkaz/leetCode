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

var countAndSay = function (n) {
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
const countAndSay = (n) => {
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
