var gridWidth = 640;
var boxCount = 4;

const container = document.querySelector('.container');
container.style.width = `${gridWidth}px`

createGrid(container, boxCount);

const buttons = document.querySelector('.buttons');
const boxAmountButton = document.createElement('button');
boxAmountButton.textContent = "Set box amount";
boxAmountButton.addEventListener('click', function setBoxAmount(){
    boxCount = prompt('Enter number of boxes for each row');
    createGrid(container, boxCount);
})
buttons.appendChild(boxAmountButton);

const clearButton = document.createElement('button');
clearButton.textContent = "Clear";
clearButton.addEventListener('click', function clear(){
    createGrid(container, boxCount);
})
buttons.appendChild(clearButton);

function createGrid(element, size){
    element.innerHTML = '';

    for(let j = 0; j < size; j++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for(let i = 0; i < size; i++) {
            let box = document.createElement('div');
            box.classList.add('box')
            box.style.width = `${gridWidth/size}px`
            box.style.height = `${gridWidth/size}px`
            box.style.backgroundColor = generateRandomColor();
            box.style.opacity = 0;
            box.addEventListener('mouseover', function addOpacity(){
                if(box.style.opacity < 1) {
                    let opacity = Number(box.style.opacity);
                    opacity += 0.1;
                    box.style.opacity = opacity;
                }
            })
            row.append(box);
        }
        element.appendChild(row)
    }
}

function generateRandomColor(){
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}