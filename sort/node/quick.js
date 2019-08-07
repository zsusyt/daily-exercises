function insert(data) {
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

function quick(data, left, right) {
    if(right - left < 7) {
        insert(data)
    } else {
        let pivot = partition(data, left, right);
        quick(data, left, pivot - 1);
        quick(data, pivot + 1, right);
    }
}

function swap(data, dstIndex, srcIndex) {
    let tmp = data[dstIndex];
    data[dstIndex] = data[srcIndex];
    data[srcIndex] = tmp
}

function partition(data, left, right) {
    let i = left;
    let j = right;
    let pivot = left;
    while(j-i>1) {
        while(data[j] >= data[pivot] && j > i) {
            j--
        }
        while(data[i] <= data[pivot] && i < j) {
            i++
        }
        if(data[j] < data[pivot] && data[i] > data[pivot]) {
            swap(data, j, i);
        }
    }
    swap(data, pivot, i);
    return i;
}

let a = [10, 1, 4, 6, 8, 3, 9, 11, 100, 1000, 234, 452, 12, 81, 90, 101, 100]

quick(a, 0, a.length - 1)

console.log(a)