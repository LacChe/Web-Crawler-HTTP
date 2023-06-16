// fibonacci *******************************************************

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

// merge sort *******************************************************

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

// linked lists *******************************************************

var LinkedList = function LinkedListFactory() {

    let headNode;

    let set = function set(val) {
        headNode = LLNode.CreateNode(val, null);
    }

    let append = function append(val) {
        let tailNode = tail();
        tailNode.next = LLNode.CreateNode(val, null);
    }

    let preppend = function append(val) {
        let newNode = LLNode.CreateNode(val, headNode);
        headNode = newNode;
    }

    let size = function size() {
        if(headNode === undefined) return 0;
        let count = 1;
        let tempNode = headNode;
        while(tempNode.next !== null) {
            tempNode = tempNode.next;
            count++;
        }
        return count;
    }

    let head = function head() {
        return headNode;
    }

    let tail = function tail() {
        let tempNode = headNode;
        while(tempNode.next !== null) {
            tempNode = tempNode.next;
        }
        return tempNode;
    }

    let at = function at(index) {
        let count = 0;
        let tempNode = headNode;
        while(tempNode.next !== null) {
            if(index === count) return tempNode;
            tempNode = tempNode.next;
            count++;
        }
    }

    let pop = function pop() {
        let tempNode = headNode;
        while(tempNode.next !== null) {
            if(tempNode.next.next === null) {
                let nextval = tempNode.next.value
                tempNode.next = null;
                return nextval;
            }
            tempNode = tempNode.next;
        }
    }

    let contains = function contains(value) {
        let tempNode = headNode;
        while(tempNode !== null) {
            if(tempNode.value === value) return true;
            tempNode = tempNode.next;
        }
        return false;
    }

    let find = function find(value) {
        let index = 0;
        let tempNode = headNode;
        while(tempNode !== null) {
            if(tempNode.value === value) return index;
            tempNode = tempNode.next;
            index++;
        }
        return null;
    }

    let toString = function toString(node = headNode) {
        if(headNode === undefined) return '';
        return `(${node.value}) -> ${node.next === null ? null : toString(node.next)}`;
    }

    let insert = function insert(index, value) {
        if(index === 0) {
            preppend(value);
            return true;
        }

        let tempNode = headNode;
        
        for(let i = 0; i < index - 1; i++) {
            tempNode = tempNode.next
            if(tempNode === null) return false;
        }

        let newNode = LLNode.CreateNode(value, tempNode.next);
        tempNode.next = newNode;
        return true;
    }

    let remove = function remove(index, value) {
        let returnVal = null;
        if(index === 0) {
            returnVal = headNode.value;
            headNode = headNode.next;
            return returnVal;
        }

        let tempNode = headNode;
        
        for(let i = 0; i < index - 1; i++) {
            tempNode = tempNode.next
            if(tempNode.next === null) return false;
        }

        returnVal = tempNode.next.value;
        tempNode.next = tempNode.next.next;
        return returnVal;
    }

    return {
        set,
        append,
        preppend,
        size,
        head,
        tail,
        at,
        pop,
        contains,
        find,
        toString,
        insert,
        remove,
    }
}

var LLNode = {
    CreateNode: function CreateNode(value, next) {
        return {
            value,
            next
        }
    }
}

function genList() {
    let list = LinkedList();
    list.set(1);
    list.append(4);
    list.append(9);
    list.append(15);
    return list;
}

function printLLTests() {
    let listOne = genList();
    
    console.log('size: ' + listOne.size() + ', ' + listOne.toString());
    console.log('head: ' + JSON.stringify(listOne.head()));
    console.log('tail: ' + JSON.stringify(listOne.tail()));
    listOne.append(21);
    console.log('append: 21, ' + listOne.size() + ', ' + listOne.toString());
    listOne.preppend(-7);
    console.log('preppend: -7, ' + listOne.size() + ', ' + listOne.toString());
    console.log('pop: ' + listOne.pop() + ', ' + listOne.toString());
    console.log('at 3: ' + JSON.stringify(listOne.at(3)) + ', ' + listOne.toString());
    console.log('find 4: ' + listOne.find(4) + ', ' + listOne.toString());
    console.log('find 5: ' + listOne.find(5) + ', ' + listOne.toString());
    console.log('contains 4: ' + listOne.contains(4) + ', ' + listOne.toString());
    console.log('contains 5: ' + listOne.contains(5) + ', ' + listOne.toString());
    listOne.insert(2, 100);
    console.log('insert 2 100: ' + listOne.toString());
    listOne.remove(3);
    console.log('remove 3: ' + listOne.toString());
}

printLLTests();

// binary search tree *******************************************************