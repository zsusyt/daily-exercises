module.exports = function merge (a/* target array*/, b/* merge element*/) {
  let target = JSON.parse(JSON.stringify(a))
  let useCase = JSON.parse(JSON.stringify(b));
     //要删除的原数组元素个数
  let length = 0;
  let startIndex = 0;
  let endIndex = 0;
  
  let startTime = useCase.startTime;
  let endTime = useCase.endTime;
  
  let startTimeInfo = {
    leftNode: "",
    leftIndex: -1,
    rightNode: "",
    rightIndex: -1
  }
  let endTimeInfo = {
    leftNode: "",
    leftIndex: -1,
    rightNode: "",
    rightIndex: -1
  }
  for(let index = 0; index < target.length; index++) {
    if(startTime < target[index].startTime) {
      startTimeInfo.rightNode = "start";
      startTimeInfo.rightIndex = index;
      break;
    } else {
      if(startTime <= target[index].endTime) {
        startTimeInfo.rightNode = "end";
        startTimeInfo.rightIndex = index;
        startTimeInfo.leftNode = "start"
        startTimeInfo.leftIndex = index;
        break;
      } else {
        startTimeInfo.leftNode = "end";
        startTimeInfo.leftIndex = index;
      }
    }
  }
  
  for(let index = 0; index < target.length; index++) {
    if(endTime < target[index].startTime) {
      endTimeInfo.rightNode = "start";
      endTimeInfo.rightIndex = index;
      break;
    } else {
      if(endTime <= target[index].endTime) {
        endTimeInfo.rightNode = "end";
        endTimeInfo.rightIndex = index;
        endTimeInfo.leftNode = "start"
        endTimeInfo.leftIndex = index;
        break;
      } else {
        endTimeInfo.leftNode = "end";
        endTimeInfo.leftIndex = index;
      }
    }
  }
  
  
  if(startTimeInfo.leftNode === "") {
    if(endTimeInfo.leftNode === "") {
      target.unshift(useCase)
    } else if(endTimeInfo.leftNode === "start" ){
      length = endTimeInfo.leftIndex + 1;
      useCase.endTime = target[endTimeInfo.leftIndex].endTime;
      target.splice(0, length, useCase)
    } else {
      length = endTimeInfo.leftIndex + 1;
      target.splice(0, length, useCase)
    }
  } else if(startTimeInfo.leftNode === "end") {
    if(startTimeInfo.rightNode === "") {
      target.push(useCase)
    } else {
      startIndex = startTimeInfo.rightIndex;
      length = endTimeInfo.leftIndex - startIndex + 1;
      if(endTimeInfo.leftNode === "start" ){
        useCase.endTime = target[endTimeInfo.leftIndex].endTime;
      }
      target.splice(startIndex, length, useCase)
    }
  } else {
    startIndex = startTimeInfo.leftIndex;
    length = endTimeInfo.leftIndex - startIndex + 1;
    useCase.startTime = target[startIndex].startTime;
    if(endTimeInfo.leftNode === "start" ){
      useCase.endTime = target[endTimeInfo.leftIndex].endTime;
    }
    target.splice(startIndex, length, useCase)
  }
  
  // console.log(startTimeInfo)
  // console.log(endTimeInfo)
  return target;

}
