const PEDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 运行一个微任务队列，把传递的函数放入微任务队列
 * @param {Function} callBack
 */
function runMicroTask(callBack) {
  if (process && process.nextTick) {
    // node环境
    process.nextTick(callBack);
  } else {
    // 浏览器环境并且支持MutationObserver API
    // 模拟微任务队列，这是第一种方式

    /* const p = document.createElement("p");
    const observer = new MutationObserver(callBack);
    observer.observe(p, {
      childList: true,
    });
    p.innerHTML = "1"; */

    // 第二种方式，利用window的queueMicrotask API ，有兼容性问题
    queueMicrotask(callBack);
  }
}

class MyPromise {
  /**
   * 创建一个Promise
   * @param {Function} executor 任务执行器，立即执行
   */
  constructor(executor) {
    this._state = PEDING;
    this._value = undefined;
    this._handlers = []; // 处理函数形成的队列
    try {
      // 绑定this指向，让其始终指向当前Promise对象
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }

  /**
   * 向处理函数中添加一个函数
   * @param {Function} executor 添加的函数
   * @param {String} state 该函数什么状态下执行
   * @param {Function} resolve 让then函数返回的Promise成功
   * @param {Function} reject 让then函数返回的Promise失败
   */
  _pushHandler(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject,
    });
  }

  /**
   * 根据实际情况，执行队列
   */
  _runHandlers() {
    if (this._state === PEDING) {
      // 目前任务仍在挂起
      return;
    }

    // 错误写法，容易导致意想不到的结果
    /* for (let handler of this._handlers) {
      this._runOneHandler(handler);
      this._handlers.shift();
    } */

    // 正确写法，运行完毕一个之后删除一个
    while (this._handlers[0]) {
      const handler = this._handlers[0];
      this._runOneHandler(handler);
      this._handlers.shift();
    }
  }

  /**
   * 处理一个handler
   * @param {Object} handler
   */
  _runOneHandler(handler) {

  }

  /**
   * @param {Function} onFulfilled
   * @param {Function} onRejected
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandler(onRejected, REJECTED, resolve, reject);
      this._runHandlers(); // 执行队列
    });
  }

  /**
   * 改变任务状态
   * @param {String} state 新状态
   * @param {any} value 新数据
   */
  _changeState(state, value) {
    if (this._state !== PEDING) {
      // 状态已经更改了，就不再进行更改
      return;
    }
    this._state = state;
    this._value = value;
    this._runHandlers(); // 状态变化，执行微任务队列函数
  }

  /**
   * 标记当前任务完成
   * @param {any} data 数据
   */
  _resolve(data) {
    // 改变状态
    this._changeState(FULFILLED, data);
  }

  /**
   * 标记当前任务失败
   * @param {any} reason 错误或错误数据
   */
  _reject(reason) {
    this._changeState(REJECTED, reason);
  }
}

const pro = new MyPromise((resolve, reject) => {
  resolve(1);
});

pro.then(function A1() {
  console.log(1111);
});

console.log(pro);
