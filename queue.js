//Queue 隊列

//js 模擬 circular queue

//*1. 普通使用js內array功能解
/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.length = k;
  this.queue = [];
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.queue.length < this.length) {
    this.queue.push(value);
    return true;
  }

  return false;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.queue.length > 0) {
    this.queue.shift();
    return true;
  }

  return false;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.queue.length === 0) {
    return -1;
  }

  return this.queue[0];
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.queue.length === 0) {
    return -1;
  }

  return this.queue[this.queue.length - 1];
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  if (this.queue.length === 0) {
    return true;
  }
  return false;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  if (this.queue.length === this.length) {
    return true;
  }
  return false;
};

//*2.two pointer
/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.length = k;
  this.queue = new Array(k);
  this.head = -1;
  this.rear = -1;
};

/**
null null null null null
head ===-1 => queue isEmpty
enQueue :
head === -1 => head = 0 , rear = 0;
                queue[head]=value;
rear === length-1 || rear+1 === head => full
*/

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.head === -1) {
    this.head = 0;
    this.rear = 0;
    this.queue[this.rear] = value;
    return true;
  }

  if (this.rear === this.length - 1 || this.rear + 1 === this.head) {
    return false;
  }

  this.rear += 1;
  this.queue[this.rear] = value;

  return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.queue.length === 0) {
    return -1;
  }

  return this.queue[0];
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.queue.length === 0) {
    return -1;
  }

  return this.queue[this.queue.length - 1];
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  if (this.queue.length === 0) {
    return true;
  }
  return false;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  if (this.queue.length === this.length) {
    return true;
  }
  return false;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
