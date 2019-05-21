var merge = require('./merge.js')
// var merge = require('./merge2.js')

let time1 = {
  startTime: "10:01",
  endTime: "10:50"
}
let time2 = {
  startTime: "11:10",
  endTime: "11:43"
}
let time3 = {
  startTime: "12:05",
  endTime: "14:38"
}
let time4 = {
  startTime: "16:13",
  endTime: "17:05"
}

let target = [time1, time2, time3, time4];

// 起止都在范围之左
let case1 = {
  startTime: "09:01",
  endTime: "09:50"
}
let result1 = [case1].concat(target)
// console.log(JSON.stringify(merge(target, case1)))
// console.log(JSON.stringify(result1))
console.log(JSON.stringify(merge(target, case1)) === JSON.stringify(result1))

// 起止都在范围之右
let case2 = {
  startTime: "17:06",
  endTime: "17:07"
}
let result2 = target.concat(case2)
console.log(JSON.stringify(merge(target, case2)) === JSON.stringify(result2))

// 起止包含整个目标
let case3 = {
  startTime: "09:02",
  endTime: "17:06"
}
let result3 = [case3]
console.log(JSON.stringify(merge(target, case3)) === JSON.stringify(result3))

// 起在范围之左，止在中间空隙
let case4 = {
  startTime: "09:10",
  endTime: "14:40"
}
let result4 = [case4, time4]
console.log(JSON.stringify(merge(target, case4)) === JSON.stringify(result4))

// 起在范围之左，止在范围某个段内
let case5 = {
  startTime: "09:10",
  endTime: "14:30"
}
let result5 = [{
  startTime: "09:10",
  endTime: "14:38"
}, time4]
console.log(JSON.stringify(merge(target, case5)) === JSON.stringify(result5))

// 起在中间空隙，止在中间空隙
let case6 = {
  startTime: "11:01",
  endTime: "14:40"
}
let result6 = [time1, case6, time4]
// console.log(JSON.stringify(merge(target, case6)))
// console.log(JSON.stringify(result6))
console.log(JSON.stringify(merge(target, case6)) === JSON.stringify(result6))

// 起在中间空隙，止在范围某个段内
let case7 = {
  startTime: "11:01",
  endTime: "14:30"
}
let result7 = [time1, {
  startTime: "11:01",
  endTime: "14:38"
}, time4]
console.log(JSON.stringify(merge(target, case7)) === JSON.stringify(result7))

// // 起在中间某个段内，止在中间某个段内
let case8 = {
  startTime: "10:30",
  endTime: "14:30"
}
let result8 = [{
  startTime: "10:01",
  endTime: "14:38"
}, time4]
console.log(JSON.stringify(merge(target, case8)) === JSON.stringify(result8))

// 起在中间某个段内，止在中间空隙
let case9 = {
  startTime: "10:30",
  endTime: "14:40"
}
let result9 = [{
  startTime: "10:01",
  endTime: "14:40"
}, time4]
console.log(JSON.stringify(merge(target, case9)) === JSON.stringify(result9))

// 起止包含为空
let case10 = {
  startTime: "11:44",
  endTime: "12:04"
}
let result10 = [time1, time2, case10,time3, time4]
console.log(JSON.stringify(merge(target, case10)) === JSON.stringify(result10))

// 空数组
let case11 = {
  startTime: "11:44",
  endTime: "12:04"
}
let result11 = [case11]
console.log(JSON.stringify(merge([], case11)) === JSON.stringify(result11))