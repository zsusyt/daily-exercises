function factor(n) {
  if(n===0){
    return 1
  } else {
    return n * factor(n-1)
  }
}

function factorBig(n, maxLength) {
  let result = Array(maxLength);
  let length = maxLength;

  let jw = 0;

  //初始化数组
  for(let i=0; i<length; i++) {
    result[i] = 0
  }
  result[0] = 1;

  if(n > 1) {
    for(let i=2; i<=n; i++) {
      for(let j=0; j<length; j++) {
        let mid = result[j] * i + jw;
        let realMid = mid % 10;
        jw = parseInt(mid/10, 10);
        result[j] = realMid;

        if( (j === length -1) && (jw > 0)) {
          console.log("overflow");
          return 0
        }
      }
    }
  }

  return result.reverse().join('')
}

let args = process.argv;
let number = args[2];
let maxlength = args[3];

console.log(factorBig(number, maxlength))
console.log(factor(number))