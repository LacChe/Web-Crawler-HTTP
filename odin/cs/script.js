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
    
    console.log('Linked Lists');
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
    console.log('*******************************************************');
}

printLLTests();

// binary search tree *******************************************************

class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    root;
    constructor(arr, sorted = false) {
        let sortedArr = sorted ? arr : mergeSort(arr);
        let uniqueArr = this.removeDuplicates(sortedArr);

        this.root = this.buildTree(uniqueArr, this.root);
    }

    removeDuplicates(sortedArr) {
        if(sortedArr.length < 1) return null;

        let newArr = [sortedArr[0]];
        for(let i = 1; i < sortedArr.length; i++) {
            if(sortedArr[i] !== sortedArr[i-1]) {
                newArr.push(sortedArr[i]);
            }
        }
        return newArr;
    }

    buildTree(arr, parent) {
        if(arr.length < 1) return null;

        if(arr.length === 1) {
            parent = new Node(arr[0]);
        } else if(arr.length === 2) {
            parent = new Node(arr[1]);
            parent.left = new Node(arr[0]);
        } else if(arr.length === 3) {
            parent = new Node(arr[1]);
            parent.left = new Node(arr[0]);
            parent.right = new Node(arr[2]);
        } else if(arr.length > 2) {
            parent = new Node(arr[Math.trunc(arr.length / 2)]);
            let leftArr = arr.slice(0, Math.trunc(arr.length / 2));
            let rightArr = arr.slice(Math.trunc(arr.length / 2 + 1));
            parent.left = this.buildTree(leftArr, parent.left);
            parent.right = this.buildTree(rightArr, parent.right);
        }
        
        return parent;
    }
    
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(val, node = this.root) {
        if (node === null) return new Node(val);
       
        if (val < node.val) {
          node.left = this.insert(val, node.left);
        } else {
          node.right = this.insert(val, node.right);
        }

        return node;
    }

    remove(val) {
        let parent = this.findParent(val);
        let target = this.find(val);

        // both null
        if(target.left === null && target.right === null) {
            if(parent.left !== null && parent.left.val === val) {
                parent.left = null;
                return target;
            } else if(parent.right !== null && parent.right.val === val) {
                parent.right = null;
                return target;
            }
        }

        // left null
        if(target.left === null) {
            if(parent.left !== null && parent.left.val === val) {
                parent.left = target.right;
                return target;
            } else if(parent.right !== null && parent.right.val === val) {
                parent.right = target.right;
                return target;
            }
        }

        // right null
        if(target.right === null) {
            if(parent.left !== null && parent.left.val === val) {
                parent.left = target.left;
                return target;
            } else if(parent.right !== null && parent.right.val === val) {
                parent.right = target.left;
                return target;
            }
        }

        // neither null
        let nextBiggest = target.right;
        while(nextBiggest.left !== null) {
            nextBiggest = nextBiggest.left;
        }
        let nextBiggestParent = this.findParent(nextBiggest.val);

        if(nextBiggestParent.left !== null && nextBiggestParent.left.val === nextBiggest.val) {
            nextBiggestParent.left = nextBiggest.right;
        } else if(nextBiggestParent.right !== null && nextBiggestParent.right.val === nextBiggest.val) {
            nextBiggestParent.right = nextBiggest.right;
        }

        nextBiggest.left = target.left;
        nextBiggest.right = target.right;

        if(parent.left !== null && parent.left.val === val) {
            parent.left = nextBiggest;
            return target;
        } else if(parent.right !== null && parent.right.val === val) {
            parent.right = nextBiggest;
            return target;
        }
    }

    find(val, node = this.root) {
        if(node.val === val) return node;

        let retNode;

        if(node.left !== null) {
            retNode = this.find(val, node.left);
            if(retNode !== null) return retNode;
        } 
        if(node.right !== null) {
            retNode = this.find(val, node.right);
            if(retNode !== null) return retNode;
        }

        return null;
    }

    findParent(val, node = this.root) {
        if(node.left !== null && node.left.val === val) return node;
        if(node.right !== null && node.right.val === val) return node;

        let retNode;

        if(node.left !== null) {
            retNode = this.findParent(val, node.left);
            if(retNode !== null) return retNode;
        } 
        if(node.right !== null) {
            retNode = this.findParent(val, node.right);
            if(retNode !== null) return retNode;
        }

        return null;
    }

}

function printBSTTest() {
    let testTree = new Tree(genNumArray(7, 100));
    testTree.prettyPrint();
    testTree.insert(80);
    testTree.prettyPrint();
    testTree.remove(testTree.root.left.val);
    testTree.prettyPrint();
    console.log('*******************************************************');
}

printBSTTest();

// *******************************************************