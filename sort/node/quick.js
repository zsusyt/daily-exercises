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
        while(data[j] >= data[pivot] && j > i + 1) {
            j--
        }
        while(data[i] <= data[pivot] && j > i + 1) {
            i++
        }
        if(data[j] < data[pivot] && data[i] > data[pivot]) {
            swap(data, j, i);
        }
    }
    if(data[j] < data[pivot]) {
        swap(data, pivot, j);
        return j
    } else {
        swap(data, pivot, i);
        return i
    }
}

let a = [20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

quick(a, 0, a.length - 1)

console.log(a)