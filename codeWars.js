'use strict';

function arrayDiff(a, b) {
  if (a.length === 0 || b.length === 0) return a;

  let finalArr = [...a];
  for (let i = 0; i < b.length; i++) {
    finalArr = finalArr.filter(v => v !== b[i]);
  }
  return finalArr;
}

function likes(names) {
  return names.length === 0 ? `no one likes this` : names.length === 1 ? `${names[0]} likes this` : names.length === 2 ? `${names[0]} and ${names[1]} like this` : names.length === 3 ? `${names[0]}, ${names[1]} and ${names[2]} like this` : `${names[0]}, ${names[1]} and ${names.length - 2} others like this`;
}

/*//////////////////////////////////////////////////////////////////////////////

Description:
Given an array of integers, find the one that appears an odd number of times.
There will always be only one integer that appears an odd number of times.

*/

function findOdd(A) {
  let checkArr = new Set(A);
  checkArr = [...checkArr];
  let target = checkArr.reduce((arr, cur) => {
    let countFind = 0;
    A.forEach(v => {
      if (v === cur) {
        countFind++;
      }
    });

    if (countFind % 2 === 1) return cur;

    return arr;
  }, 0);

  return target;
}
////////////////////////////////////////////////////////////////////////////////

function printerError(s) {
  let color = /[a-m]/;
  let error = s.split('').reduce(function (acc, cur) {
    if (!color.test(cur)) return acc + 1;
    return acc;
  }, 0);
  return `${error}/${s.length}`;
}

function accum(s) {
  return s
    .split('')
    .map(function (v, i) {
      return `${v.toUpperCase()}${v.toLowerCase().repeat(i)}`;
    })
    .join('-');
}

function duplicateCount(text) {
  return [...new Set(text)].reduce((acc, cur) => {
    let count = 0;
    text
      .toLowerCase()
      .split('')
      .forEach(v => {
        if (cur === v) {
          count++;
        }
      });

    if (count > 1) return acc + 1;
    return acc;
  }, 0);
}

function persistence(num) {
  let count = 0;
  let numArr = [...String(num)];
  while (numArr.length > 1) {
    numArr = numArr.reduce((acc, cur) => acc * cur, 1);
    numArr = [...String(numArr)];
    count++;
  }
  return count;
}

/*//////////////////////////////////////////////////////////////////////////////

Description:
You will be given an array of numbers. You have to sort the odd numbers in ascending order while leaving the even numbers at their original positions.

[7, 1]  =>  [1, 7]
[5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]

*/
function sortArray(array) {
  let evenArr = [];
  let oddArr = array.filter((v, i) => {
    if (v % 2 === 0) {
      evenArr.push({ value: v, index: i });
    }
    return v % 2 !== 0;
  });
  oddArr.sort((a, b) => a - b);
  evenArr.forEach(v => oddArr.splice(v.index, 0, v.value));
  return oddArr;
}

//DRY:

function sortArray(array) {
  const odd = array.filter(x => x % 2).sort((a, b) => a - b);
  return array.map(x => (x % 2 ? odd.shift() : x));
}

/////////////////////////////////////////////////////////////////
/*
var rotate = function (nums, k) {
  let rotateTimes = 1;

  while (rotateTimes <= k) {
    let [kickNum] = nums.splice(-1, 1);
    nums.splice(0, 0, kickNum);
    rotateTimes += 1;
  }
};
*/
var rotate = function (nums, k) {
  let startIndex = -(k % nums.length);
  nums.splice(0, 0, ...nums.splice(startIndex, -startIndex));
};

//let nums = [1, 2, 3, 4, 5, 6, 7];

///////////////////////////////////////////////////////////////////

var intersect = function (nums1, nums2) {
  let ans = [];
  if (nums1.length > nums2.length) {
    nums2.forEach(v => {
      let duplicateIndex = nums1.findIndex(x => x === v);
      if (duplicateIndex >= 0) {
        ans.push(nums1.splice(duplicateIndex, 1)[0]);
      }
    });
    return ans;
  }

  nums1.forEach(v => {
    let duplicateIndex = nums2.findIndex(x => x === v);
    if (duplicateIndex >= 0) {
      ans.push(nums2.splice(duplicateIndex, 1)[0]);
    }
  });
  return ans;
};

var plusOne = function (digits) {
  return `${BigInt(digits.join('')) + 1n}`.split('').map(v => Number(v));
};

var moveZeroes = function (nums) {
  let zeroCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) continue;
    nums.splice(i, 1)[0];
    i -= 1;
    zeroCount++;
  }
  for (let j = 0; j < zeroCount; j++) {
    nums.push(0);
  }
};

var moveZeroes = function (nums) {
  let zeroCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) continue;
    nums.splice(i, 1)[0];
    i -= 1;
    zeroCount++;
  }
  for (let j = 0; j < zeroCount; j++) {
    nums.push(0);
  }
};

//! Two Sum (Hash Table 技巧)
var twoSum = function (nums, target) {
  let compare = {};
  let ans;
  nums.forEach((v, i) => {
    if (isFinite(compare[v]) && compare[v] !== i) {
      ans = [compare[v], i];
    }

    if (!compare[v]) {
      compare[target - v] = i;
    }
  });
  return ans;
};

//////////////////////////////////////////////////

var isValidSudoku = function (board) {
  let status = true;

  // console.log('start row check');
  //row check
  for (let i = 0; i < board.length; i++) {
    let newRow = board[i].filter(v => {
      return isFinite(v);
    });
    let setRow = new Set(newRow);
    if (newRow.length !== [...setRow].length) {
      status = false;
      return status;
    }
  }

  // console.log('start column check');
  //column check
  for (let i = 0; i < board.length; i++) {
    let newRow = [];
    for (let j = 0; j < board.length; j++) {
      newRow.push(board[j][i]);
    }
    newRow = newRow.filter(v => {
      return isFinite(v);
    });
    let setRow = new Set(newRow);
    if (newRow.length !== [...setRow].length) {
      status = false;
      return status;
    }
  }

  //3*3 check
  // console.log('start 3*3 check');
  status = create3x3(board, 1, 3);
  if (!status) return status;

  status = create3x3(board, 4, 6);
  if (!status) return status;

  status = create3x3(board, 7, 9);
  if (!status) return status;
  return status;
};

function create3x3(board, colStart, colEnd) {
  let count = 0;
  let newRow = [];
  let status = true;
  for (let i = 0; i < board.length; i++) {
    if (!newRow[count]) {
      newRow[count] = [];
    }

    newRow[count].push([board[i].slice(colStart - 1, colEnd)]);
    if (i !== 0 && i % 3 === 2) {
      count++;
    }
  }
  newRow = newRow.map(row => {
    return row.flat(2).filter(v => {
      return isFinite(v);
    });
  });

  newRow.forEach(row => {
    let setRow = new Set(row);

    if (row.length !== [...setRow].length) {
      status = false;
    }
    // console.log(row, row.length, setRow, [...setRow].length, status);
  });

  return status;
}

let board = [
  ['.', '4', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '4', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '1', '.', '.', '7', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '3', '.', '.', '.', '6', '.'],
  ['.', '.', '.', '.', '.', '6', '.', '9', '.'],
  ['.', '.', '.', '.', '1', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '2', '.', '.'],
  ['.', '.', '.', '8', '.', '.', '.', '1', '.'],
];

//COOL SOLUTION
var isValidSudoku = function (board) {
  let seen = new Set();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let cell = board[i][j];
      if (cell != '.') {
        let colCell = `cell: ${j} ${cell}`;
        let rowCell = `row: ${i} ${cell}`;
        let subBoxCell = `subBox: ${parseInt(i / 3)}-${parseInt(j / 3)} ${cell}`;

        if (!seen.has(colCell) && !seen.has(rowCell) && !seen.has(subBoxCell)) {
          seen.add(colCell);
          seen.add(rowCell);
          seen.add(subBoxCell);
        } else return false;
      }
    }
  }
  return true;
};
/////////////////////////////////////////////////////////////////
