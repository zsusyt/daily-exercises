function merge(data) {
    let length = data.length;
    if(length <= 1) {
        return data
    }

    let mid = Math.floor(length / 2);
    let firstHalf = data.slice(0, mid);
    let sortedFirstHalf = merge(firstHalf);
    let secondHalf = data.slice(mid, length);
    let sortedSecondHalf = merge(secondHalf);
    
    let result = [];
    while(firstHalf.length > 0 && secondHalf.length > 0) {
        if(firstHalf[0] < secondHalf[0]) {
            result.push(firstHalf.shift())
            if(firstHalf.length === 0) {
                result = result.concat(secondHalf)
                break;
            }
        } else {
            result.push(secondHalf.shift())
            if(secondHalf.length === 0) {
                result = result.concat(firstHalf)
                break;
            }
        }
    }
    return result;
}

let a = [5, 4, 3]

let result = merge(a);
console.log(result)