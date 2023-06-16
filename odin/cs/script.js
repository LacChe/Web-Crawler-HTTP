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