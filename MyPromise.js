const PEDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  /**
   * 创建一个Promise
   * @param {Function} executor 任务执行器，立即执行
   */
  constructor(executor) {
    this._state = PEDING;
    this._value = undefined;
    try{
      // 绑定this指向，让其始终指向当前Promise对象
      executor(this._resolve.bind(this), this._reject.bind(this));
    }catch(err){
      this._reject(err)
    }
  }

  /**
   * 改变任务状态
   * @param {String} state 新状态
   * @param {any} value 新数据
   */
  _changeState(state, value) {
    if(this._state !== PEDING){
      // 状态已经更改了，就不再进行更改
      return
    }
    this._state = state;
    this._value = value;
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

const res = new MyPromise((resolve, reject) => {
  throw new Error(1332)
});

console.log(res);
