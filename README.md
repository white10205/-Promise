# -Promise
手撸一个Promise及其API的实现


### 第一步
- 实现Promise类，定义Promise的三个状态，并定义reject与resolve的方法，改变Promise状态和数据，并且状态一旦改变不可再修该。
- 绑定resolve与reject函数的this指向，让其始终指向当前Promise对象
- 任务执行器函数中抛出错误的话，就直接调用reject方法