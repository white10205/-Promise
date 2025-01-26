# -Promise
手撸一个Promise及其API的实现


### 第一步
- 实现Promise类，定义Promise的三个状态，并定义reject与resolve的方法，改变Promise状态和数据，并且状态一旦改变不可再修该。
- 绑定resolve与reject函数的this指向，让其始终指向当前Promise对象
- 任务执行器函数中抛出错误的话，就直接调用reject方法

### 第二步
实现微任务队列函数，将传入的函数放入微任务队列，为then方法做准备
1. node环境使用process.nextTick
2. 浏览器环境使用MutationObserver，或者高版本浏览器可以使用Window下的queueMicrotask API，这个方法会有兼容性问题

### 第三步
实现Promise then函数，将then函数内的函数放入微任务队列，等到执行resolve方法时，才将then函数如里的方法执行
- then函数可以链式调用，所以then函数必须得返回一个新的Promise

### 第四步
在状态改变后，执行微任务队列中的函数，执行完毕一个函数之后就删除一个函数，注意写法上的问题，不能使用for...of...

### 第五步
1. 手写判断是否是Promise方法，无需根据instanceof判断原型链，为了保持函数始终返回Boolean类型，使用双感叹号保持。
2. 完成_runOneHandler核心方法的编写，并且能够与内置Promise互相操作，能够使用async和await方法，剩下Promise的静态方法未编写
