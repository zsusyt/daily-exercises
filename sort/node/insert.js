export default function insert(data) {
    let length = data.length;
    if(length <= 1) {
        return data
    }

    for(let i = 1; i < length; i++){
        help(data, i)
    }

    return data;
}

function help(data, index) {
    if(index > 0) {
        if(data[index] < data[index-1]) {
            swap(data, index-1, index)
            help(data, index - 1)
        }
    }
}

function swap(data, dstIndex, srcIndex) {
    let tmp = data[dstIndex];
    data[dstIndex] = data[srcIndex];
    data[srcIndex] = tmp
}

let a = [5,2,4,3]

let result = insert(a);
console.log(a)