module.exports = function merge (a/* target array*/, b/* merge element*/) {
  let target = JSON.parse(JSON.stringify(a))
  let useCase = JSON.parse(JSON.stringify(b));

  let startTime = useCase.startTime;
  let endTime = useCase.endTime;

  function noOp(){}

  target.push(useCase)

  if(target.length === 1) {

    return target

  } else {

    target.sort(function (a, b) {
      return b.startTime <= a.startTime ? 1 : -1
    })

    let caseIndex = target.indexOf(useCase);

    if(caseIndex === 0) {
      while(endTime >= target[caseIndex + 1].startTime) {
        if(endTime <= target[caseIndex + 1].endTime) {
          useCase.endTime = target[caseIndex + 1].endTime;
          target.splice(caseIndex+1, 1)
          break;
        } else {
          target.splice(caseIndex+1, 1)
          if( caseIndex >= target.length - 1) break;
        }
      }
    } else if (caseIndex === target.length - 1) {
      if(startTime <= target[caseIndex - 1].endTime) {
        target.pop();
        target[target.length - 1].endTime = useCase.endTime;
      } else {
        noOp()
      }
    } else {

      while(endTime >= target[caseIndex + 1].startTime) {
        if(endTime <= target[caseIndex + 1].endTime) {
          useCase.endTime = target[caseIndex + 1].endTime;
          target.splice(caseIndex+1, 1)
          break;
        } else {
          target.splice(caseIndex+1, 1)
          if( caseIndex >= target.length - 1) break;
        }
      }

      if(startTime <= target[caseIndex - 1].endTime) {
        useCase.startTime = target[caseIndex - 1].startTime
        target.splice(caseIndex - 1, 1)
      } else {
        noOp()
      }
    }
  }
  return target
}