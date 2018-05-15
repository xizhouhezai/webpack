// 定义下观察者
function Observer() {
  this.update = function () {}
}

// 定一个下目标
function Subscribe() {}

// 添加观察者
Subscribe.prototype.addObserver = function (observer) {}

// 目标通知变更
Subscribe.prototype.notify = function () {}



export default function ob() {
  console.log('----------------------------------------------------')

  // 定义一个佩奇猪的观察者
  var peikizhuObs = new Observer();
  peikizhuObs.update = function (what) {
    console.log("12 o'clock! 佩奇猪想要" + what);
  }
  var sub = new Subscribe()
  sub.addObserver(peikizhuObs);

  // 定义一个皮卡丘的观察者
  var pikachuObs = new Observer();
  pikachuObs.update = function (what) {
    console.log("皮卡丘还可以做一点自己比较个性的事情，但是12点我也是要去吃饭的！");
    console.log("12 o'clock! 皮卡丘想要" + what);
  }
  sub.addObserver(pikachuObs);

  // 假装12点到了
  sub.notify('去吃饭啦～'); // 它们都去吃饭了

  // or
  sub.notify('继续玩耍～'); // 它们还在一起玩耍

  console.log('----------------------------------------------------')
}