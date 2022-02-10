"use strict";

/**
 *製作亂數ARRAY:
 * @param {number} nums  傳入一個正整數，代表欲創造的 ARRAY 長度。
 * @returns {number[]}  一個隨機 ARRAY，每一項介於 -10000 到 10000之間。
 */

function build(nums) {
  let arr = [];
  while (arr.length < nums) {
    if (Math.random() > 0.5) {
      arr.push(Math.floor(Math.random() * 10000));
    } else {
      arr.push(Math.floor(Math.random() * -10000));
    }
  }
  return arr;
}

function check(input, origin) {
  let text = [...input];
  let right = [...origin].sort((a, b) => a - b);
  console.log(`O:`, [...origin]);
  console.log(`R:`, right);
  console.log(`T:`, text);
  console.log(
    `Result :`,
    text.every((v, i) => v === right[i])
  );
}

// let ques = [5729, 2327, 8812, -6723, 4307];
// let ques = build(100);
//////////////////////////////////////////////////////////////////////
//* 選擇排序法
/*
最大複雜度為O(n^2)
跑兩次迴圈，以第i項為分界，i項 "右側" 為未排序ARRAY，每次選未排序部分的 "最小值和未排序的第一項交換" 。
檢查方法為:紀錄未排序部分的第一項數值，再與未排序ARRAY每一項值比較，紀錄遇到的最小值和其 INDEX。
*/

function mySelection(array) {
  let arr = [...array];
  let checkedTimes = 0;
  while (checkedTimes < arr.length) {
    let unsortedMinNum = arr[checkedTimes];
    let unsortedMinIndex = checkedTimes;
    for (let i = checkedTimes; i < arr.length; i++) {
      if (unsortedMinNum > arr[i]) {
        //? 核心概念為:先找到未排序ARRAY中的最小值，再進行交換，因此要把找最小值的過程儲存起來。
        unsortedMinNum = arr[i];
        unsortedMinIndex = i;
        // console.log(arr);
      }
    }
    [arr[checkedTimes], arr[unsortedMinIndex]] = [
      arr[unsortedMinIndex],
      arr[checkedTimes],
    ];
    checkedTimes++;
  }
  // console.log(arr);
  return arr;
}

//////////////////////////////////////////////////////////////////////
//* 冒泡排序法
/*
最大複雜度為O(n^2)
跑兩次迴圈，以倒數第i+1項為分界，i+1項 "左側" 為未排序ARRAY，每次讓 "未排序部分的最大值上浮到未排序ARRAY最右側"。
檢查方式為:第 i項與第i+1項比大小，若第i項較大，則兩者交換。
*/

function myBubble(array) {
  let arr = [...array];
  //? 已檢查過次數，起始為0
  let checkedTimes = 0;

  while (checkedTimes < arr.length) {
    //? 每次迴圈的右半邊(index > unsortedLastIndex)為已排序過的ARRAY
    let unsortedLastIndex = arr.length - checkedTimes - 1;

    for (let i = 0; i < unsortedLastIndex; i++) {
      console.log(`第${i}次:`, arr[i], arr[i + 1]);
      if (arr[i + 1] < arr[i]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        // console.log(arr);
      }
    }
    checkedTimes++;
  }
  return arr;
}

//////////////////////////////////////////////////////////////////////
//* 插入排序法
/*
最大複雜度為O(n^2)
跑兩次迴圈，以第i項為分界，i項 "右側" 為未排序ARRAY，每次將第i項 "插入已排序部分的正確位置"。
*/

function myInsertion(array) {
  let arr = [...array];

  //? 先排序原始數據前兩項，並從arr[1]右側開始為未排序ARRAY
  if (arr[0] > arr[1]) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }

  //? i 代表未排序 ARRAY 的 Index
  for (let i = 2; i < arr.length; i++) {
    // console.log(`round ${i}`);

    //? j 代表已排序 ARRAY 的 Index，最多會檢索 i次
    for (let j = 0; j < i; j++) {
      //? 插入右邊 (被插入項若為已排序ARRAY中的最大值，則位置不變，不須多寫判斷式))
      if (arr[j] <= arr[i] && arr[i] <= arr[j + 1]) {
        // console.log(`未:`, arr[i], ` 已:`, arr[j], `插右`);
        arr.splice(j + 1, 0, arr.splice(i, 1)[0]);
        // console.log(arr);
        break;
      }

      //? 插入左邊 (須注意頭的插入判斷)
      if (
        (arr[j - 1] <= arr[i] && arr[i] <= arr[j]) ||
        (j === 0 && arr[i] <= arr[j])
      ) {
        // console.log(`未:`, arr[i], ` 已:`, arr[j], `插左`);
        arr.splice(j, 0, arr.splice(i, 1)[0]);
        // console.log(arr);
        break;
      }

      // console.log(`不變`, arr);
    }
  }

  return arr;
}

//////////////////////////////////////////////////////////////////////

// check(myInsertion(ques), ques);
//////////////////////////////////////////////////////////////////////

/*
122. Best Time to Buy and Sell Stock II

You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Example 2:

Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
Example 3:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e., max profit = 0.
 

Constraints:

1 <= prices.length <= 3 * 104
0 <= prices[i] <= 104

*/
//////////////////////////////////////////////////////
//DRY: 在 input 長度極大時會塞爆 Heap memory

function firstCheck(target) {
  let arr = [];
  for (let a = 0; a < target.length; a++) {
    for (let b = a + 1; b < target.length; b++) {
      if (target[b] > target[a]) {
        let each = [target[b] - target[a], [...target].splice(b + 1)];
        arr.push(JSON.stringify(each));
      }
    }
  }
  target.splice(0, target.length, ...arr);
}

function reCheck(target) {
  let arr = [];
  for (let a = 0; a < target.length; a++) {
    for (let b = a + 1; b < target.length; b++) {
      if (target[b] > target[a]) {
        let each = [target[b] - target[a], [...target].splice(b + 1)];
        arr.push(each);
      }
    }
  }

  return arr;
}

function compare(arr) {
  while (!arr.every((v) => typeof v === "number")) {
    arr.forEach((v, i) => {
      if (typeof v === "string") {
        v = JSON.parse(v);
      }

      if (typeof v === "number") {
        return;
      }
      if (v.length === 1) {
        arr.splice(i, 1, v[0]);
        return;
      }
      if (v[1].length === 0 || v[1].length === 1) {
        arr.splice(i, 1, v[0]);
        return;
      }
      if (v[1].length === 2) {
        if (v[1][1] - v[1][0] < 0) {
          arr.splice(i, 1, v[0]);
          return;
        }
        arr.splice(i, 1, v[0] + v[1][1] - v[1][0]);
        return;
      }

      if (v[1].length >= 3) {
        let newArr = [];
        let reCheckArr = reCheck(v[1]);
        if (reCheckArr.length === 0) {
          // newArr.push([v[0]]);
          arr.splice(i, 1, v[0]);
          return;
        }
        if (!reCheckArr.length !== 0) {
          reCheckArr.forEach((r) => {
            newArr.push(JSON.stringify([v[0] + r[0], r[1]]));
          });
        }
        arr.splice(i, 1, ...newArr);
      }
    });
  }

  return arr
    .map((v) => {
      return JSON.parse(v);
    })
    .reduce((acc, cur) => {
      if (acc < cur) return cur;
      return acc;
    }, 0);
}

var maxProfit = function (prices) {
  firstCheck(prices);
  console.log(compare(prices));
};

//////////////////////////////////////////////////////
//! 動態規劃、貪婪演算法

var maxProfit = function (prices) {
  let low = null;
  let highest = null;
  let isBuy = true;
  prices.push(0);

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < prices[i + 1] && isBuy) {
      low = prices[i];
      buyState = false;
    } else if (prices[i] > prices[i + 1] && !isBuy) {
      highest += prices[i] - low;
      buyState = true;
    }
  }

  return highest;
};

//////////////////////////////////////////////////////


