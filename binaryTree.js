/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// DFS深度優先遍歷(left) -- 遞迴解
let treeArray = [];

//pre-order
function NLR(curr) {
  if (curr === null) return treeArray;

  treeArray.push(curr.val);
  NLR(curr.left);
  NLR(curr.right);

  return treeArray;
}

//in-order
function LNR(curr) {
  if (curr === null) return treeArray;

  LNR(curr.left);
  treeArray.push(curr.val);
  LNR(curr.right);

  return treeArray;
}

//last-order
function LRN(curr) {
  if (curr === null) return treeArray;

  LRN(curr.left);
  LRN(curr.right);
  treeArray.push(curr.val);

  return treeArray;
}

///////////////////////////////////////////////////////////////////////

//* E- 104. Maximum Depth of Binary Tree
// https://leetcode.com/problems/maximum-depth-of-binary-tree/

// 遞迴實做
var maxDepth = function (root) {
  let ansdeep = 1;
  let curr = root;

  if (!curr) {
    return 0;
  }

  function checkNext(curr, deep) {
    let pre = curr;
    let currDeep = deep;

    // 先判定左邊是否為空
    if (curr.left !== null) {
      if (currDeep >= ansdeep) {
        ansdeep += 1;
      }
      curr = curr.left;
      currDeep += 1;

      //閉包，代入下一節點和當前深度
      checkNext(curr, currDeep);
    }

    //回到上一節點
    curr = pre;

    //判定右邊
    //當左邊存在時，深度已經加過 1，因此深度不變動
    if (curr.right !== null && curr.left !== null) {
      curr = curr.right;
      checkNext(curr, currDeep);
    }
    //若左邊不存在，深度加 1，移動到下一節點
    else if (curr.right !== null && curr.left === null) {
      //判斷當前節點深度是否超過整顆二元樹深度
      if (currDeep >= ansdeep) {
        ansdeep += 1;
      }
      curr = curr.right;
      currDeep += 1;
      checkNext(curr, currDeep);
    }
    //抵達最下層節點
    else {
      return;
    }
  }

  checkNext(curr, ansdeep);

  return ansdeep;
};

// DRY:
var maxDepth = function (root) {
  let ansdeep = 0;

  function checkNext(curr, currDeep) {
    if (curr) {
      if (currDeep >= ansdeep) {
        ansdeep += 1;
      }
      checkNext(curr.left, currDeep + 1);
      checkNext(curr.right, currDeep + 1);
    }
  }

  checkNext(root, ansdeep);

  return ansdeep;
};

//迭代實做
var maxDepth = function (root) {
  let maxdeep = 0;
  let stack = [[root, 1]];

  if (root === null) {
    return maxdeep;
  }

  while (stack.length > 0) {
    1;

    //! 儲存當前深度進 stack
    let [curr, currdeep] = stack.pop();

    //! 先進後出，所以先傳右分支
    if (curr.right) {
      stack.push([curr.right, currdeep + 1]);
    }
    if (curr.left) {
      stack.push([curr.left, currdeep + 1]);
    }
    if (curr.left === null && curr.right === null) {
      if (currdeep > maxdeep) {
        maxdeep = currdeep;
      }
    }
  }

  return maxdeep;
};

///////////////////////////////////////////////////////////////////////

//* M - 102. Binary Tree Level Order Traversal
//https://leetcode.com/problems/binary-tree-level-order-traversal/

var levelOrder = function (root) {
  let leftQueue = [];
  let rightQueue = [];
  let leftans = {};
  let rightans = {};

  if (root === null) {
    return [];
  }

  leftQueue.push([root.left, 2]);
  rightQueue.push([root.right, 2]);

  while (leftQueue.length !== 0 || rightQueue.length !== 0) {
    //右邊沒被拿出queue即被PUSH

    let [currLeft, deepL] = leftQueue.shift() || [null, null];
    let [currRight, deepR] = rightQueue.shift() || [null, null];

    if (currLeft !== null) {
      if (!leftans[deepL]) {
        leftans[deepL] = [];
      }

      leftans[deepL].push(currLeft.val);

      if (currLeft.left !== null) {
        leftQueue.push([currLeft.left, deepL + 1]);
      }

      if (currLeft.right !== null) {
        leftQueue.push([currLeft.right, deepL + 1]);
      }
    }

    if (currRight !== null) {
      if (!rightans[deepR]) {
        rightans[deepR] = [];
      }

      rightans[deepR].push(currRight.val);

      if (currRight.left !== null) {
        rightQueue.push([currRight.left, deepR + 1]);
      }

      if (currRight.right !== null) {
        rightQueue.push([currRight.right, deepR + 1]);
      }
    }
  }

  let n = 2;
  let ans = [[root.val]];
  while (leftans[n] || rightans[n]) {
    ans.push([...(leftans[n] || []), ...(rightans[n] || [])]);
    n++;
  }

  return ans;
};

//DRY:
var levelOrder = function (root) {
  let queue = [];
  let indexObj = {};

  //判定根節點是否存在
  if (!root) {
    return [];
  }

  //儲存各節點 currentNode , deep
  queue.push([root, 1]);

  while (queue.length !== 0) {
    let [curr, deep] = queue.shift();

    if (!curr || curr.val === null) {
      break;
    }

    // 將各層的值存入物件中
    if (!indexObj[deep]) {
      indexObj[deep] = [];
    }
    indexObj[deep].push(curr.val);

    if (curr.left !== null) {
      queue.push([curr.left, deep + 1]);
    }

    if (curr.right !== null) {
      queue.push([curr.right, deep + 1]);
    }
  }

  return Object.values(indexObj);
};
