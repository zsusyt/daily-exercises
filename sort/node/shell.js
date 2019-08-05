function shell(data) {
    let length = data.length;
    let mid = Math.floor(length / 2);
    if(mid === 0) {
        return data;
    };

    while(mid > 0) {
        for(let i = mid; i < length; i+=mid){
            help(data, i, mid)
        }
        mid = Math.floor(mid / 2)
    }
    
    return data;
}

function help(data, index, mid) {
    if(index - mid>= 0) {
        if(data[index] < data[index- mid]) {
            swap(data, index-mid, index)
            help(data, index - mid, mid)
        }
    }
}

function swap(data, dstIndex, srcIndex) {
    let tmp = data[dstIndex];
    data[dstIndex] = data[srcIndex];
    data[srcIndex] = tmp
}

let a = [4, 3, 2, 1, 5, 10, 8, 11, 20,1000]

let result = shell(a);
console.log(result)