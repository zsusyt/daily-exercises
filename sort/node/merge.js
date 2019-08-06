function merge(data, left, right) {
    if((right - left) > 0) {
        let tmpArray = [];

        let mid = Math.floor((left + right) / 2);
        merge(data, left, mid, tmpArray);
        merge(data, mid + 1, right, tmpArray);
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

        data.splice(left, (right - left + 1), ...tmpArray)
    }
}

let a = [5, 4, 3, 1, 20, 35]

merge(a, 0, a.length-1);
console.log(a)