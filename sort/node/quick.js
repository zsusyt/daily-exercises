import insert from "./insert"

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
    fromRight(i, j, pivot) {
        while(j>i){
            if(data[j] > data[pivot]){
                j--
            } else {
                return j
            }
        }
    }

    fromLeft() {

    }
}