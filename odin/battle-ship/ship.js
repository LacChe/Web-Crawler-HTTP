export default function Ship(lengthParam, posParam, orientationParam) {

    if(orientationParam !== 'horizontal' && orientationParam !== 'vertical') {
        return null;
    }

    let length = lengthParam;
    let hits = 0;
    let hitPos = [];
    let pos = posParam;
    let orientation = orientationParam;

    let hit = function hit(arr) {

        let alreadyHit = false;
        hitPos.forEach(prevPos => {
            if(prevPos[0] === arr[0] && prevPos[1] === arr[1]) {
                alreadyHit = true;
            }
        });
        if(alreadyHit) {
            return false;
        }

        hitPos.push(arr);

        if(contains(arr)) {
            hits++;
            return true;
        } else {
            return false;
        }
    }

    let contains = function contains(arr) {
        if(orientation === 'horizontal') {
            if(arr[1] === pos[1] && arr[0] >= pos[0] && arr[0] < pos[0] + length) {
                return true;
            }
        } else if(orientation === 'vertical') {
            if(arr[0] === pos[0] && arr[1] >= pos[1] && arr[1] < pos[1] + length) {
                return true;
            }
        }
        return false;
    }

    let isSunk = function isSunk() {
        return length === hits;
    }

    return {
        length,
        pos,
        orientation,
        contains,
        hit,
        isSunk,
    };
}