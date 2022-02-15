/*
 迭代：使用迴圈實作。
 遞迴：函式推疊呼叫。
*/

class ListNode {
  constructor(val, next) {
    this.val = val || 0;
    this.next = next || null;
  }
}

//* E - 206. Reverse Linked List
// https://leetcode.com/problems/reverse-linked-list/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 法1: 遍歷每個節點
const reverseListMe = function (head) {
  const valArray = [];
  let currentNode = head;
  while (currentNode !== null) {
    valArray.push(currentNode.val);
    currentNode = currentNode.next;
  }

  let reverseValArray = valArray.reverse();
  let i = 0;
  let ans = head;
  while (head) {
    head.val = reverseValArray[i];
    i += 1;
    head = head.next;
  }

  return ans;
};

// 法2 : 迭代
// null -> 1 -> 2 -> 3 -> 4 -> null
const reverseList = function (head) {
  let pre = null;
  let curr = head;

  while (curr) {
    let tempNext = curr.next;
    curr.next = pre;
    pre = curr;
    curr = tempNext;
  }

  return pre;
};

/////////////////////////////////////////////////////////////////////////////////////////

//* E - 21. Merge Two Sorted Lists
// https://leetcode.com/problems/merge-two-sorted-lists/

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

//迭代
const mergeTwoListsMe = function (list1, list2) {
  let startList;
  let cloneList;

  // 判定兩空
  if (list1 === null && list2 === null) {
    return list1;
  }
  // 判定某一為空
  if (list1 === null || list2 === null) {
    return list1 || list2;
  }
  // 決定從值小的那個ListNode開始
  if (list1.val > list2.val) {
    startList = list2;
    cloneList = list1;
  } else {
    startList = list1;
    cloneList = list2;
  }

  let ans = startList;

  while (startList) {
    //clone 複製完畢
    if (cloneList === null) {
      break;
    }

    //clone的List還有剩餘
    if (startList.next === null && cloneList) {
      startList.next = cloneList;
      break;
    }

    //判定 clone 是否 insert
    if (startList.val <= cloneList.val && cloneList.val < startList.next.val) {
      let tempNext = startList.next;
      let tempCloneNext = cloneList.next;
      cloneList.next = tempNext;
      startList.next = cloneList;

      //clone 前進下一項
      cloneList = tempCloneNext;
    }
    startList = startList.next;
  }
  return ans;
};

// 遞迴(recursive)
const mergeTwoLists = function (l1, l2) {
  let node = new ListNode(-1);
  if (!l1 && !l2) {
    return null;
  } else if (!l1 || !l2) {
    return l1 || l2;
  }

  if (l1.val <= l2.val) {
    node.val = l1.val;
    l1 = l1.next;
  } else {
    node.val = l2.val;
    l2 = l2.next;
  }
  node.next = mergeTwoLists(l1, l2);
  return node;
};

/////////////////////////////////////////////////////////////////////////////////////////

//* E- 234. Palindrome Linked List
//https://leetcode.com/problems/palindrome-linked-list/

/**
 * @param {ListNode} head
 * @return {boolean}
 */

var isPalindrome = function (head) {
  // 複製時必須有指向記憶體位置的cloneList，和做迭代時反覆變動的cloneNode
  let cloneList = new ListNode(0);
  let cloneNode = new ListNode(0);
  cloneList.next = cloneNode;

  let pre = null;
  let curr = head;

  while (curr) {
    cloneNode.val = curr.val;
    cloneNode.next = curr.next === null ? null : new ListNode(0);
    cloneNode = cloneNode.next;

    const tempNext = curr.next;
    curr.next = pre;
    pre = curr;
    curr = tempNext;
  }

  let ans = true;
  cloneList = cloneList.next;

  while (cloneList && pre) {
    if (cloneList.val !== pre.val) {
      ans = false;
      break;
    }

    cloneList = cloneList.next;
    pre = pre.next;
  }

  return ans;
};
