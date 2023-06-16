function hangleFibNumberChange() {
    let input = document.querySelector('#fib-num');
    let result = document.querySelector('#fib-num-result');
    result.textContent = JSON.stringify(getFibNum(Number(input.value)));
}

function getFibNum(index) {
    if(index < 0) return;
    if(index === 0) return [0];
    if(index === 1) return getFibNum(index-1).concat(1);

    let ret = getFibNum(index-1);
    return getFibNum(index-1).concat(ret[index - 1] + ret[index - 2]);
}

function handleMergeSort() {
    let input = document.querySelector('#merge-sort-num');
    let numArray = genNumArray(Number(input.value), 100);
    let result = document.querySelector('#merge-sort-result');
    result.textContent = JSON.stringify(mergeSort(numArray));
}

function genNumArray(length, max) {
    let arr = [];
    for(let i = 0; i < length; i++) {
        arr.push(Math.trunc(Math.random() * max));
    }
    return arr;
}

function mergeSort(unsorted) {
    let left = unsorted.slice(0, unsorted.length / 2);
    let right = unsorted.slice(unsorted.length / 2);

    if(left.length > 1) left = mergeSort(left);
    if(right.length > 1) right = mergeSort(right);

    let combined = [];
    while(left.length > 0 || right.length > 0) {
        if(left.length > 0 && right.length > 0) {
            if(left[0] < right[0]) {
                combined.push(left.shift());
            } else {
                combined.push(right.shift());
            }
        } else if(left.length === 0 && right.length > 0) {
            combined.push(right.shift());
        } else if(left.length > 0 && right.length === 0) {
            combined.push(left.shift());
        }
    }

    return combined;
}