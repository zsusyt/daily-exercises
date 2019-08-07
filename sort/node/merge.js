function merge(data, left, right, tmpArray) {
    if((right - left) > 0) {
        let mid = Math.floor((left + right) / 2);
        merge(data, left, mid, tmpArray);
        merge(data, mid + 1, right, tmpArray);

        mergeArray(data, left, mid, right, tmpArray)
        
    }
}

function mergeArray(data, left, mid, right, tmpArray) {
    let i = 0; 
    let iL = left;
    let iR = mid + 1;
    while(iL <= mid && iR <= right) {
        if(data[iL] < data[iR]) {
            tmpArray[i] = data[iL];
            iL++
        } else {
            tmpArray[i] = data[iR];
            iR++
        }
        i++;
    };
    
    while(iL<=mid){
        tmpArray[i] = data[iL];
        iL++;
        i++
    }

    while(iR<=right){
        tmpArray[i] = data[iR];
        iR++;
        i++
    }
    data.splice(left, (right - left + 1), ...tmpArray.slice(0, right - left + 1))
}
let tmpArray = [];
let a = [5, 4, 3, 1, 20, 35, 2, 8, 9, 2]

merge(a, 0, a.length-1, tmpArray);
console.log(a)