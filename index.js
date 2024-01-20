const grid = document.querySelector('.grid-div');
const generateButton = document.querySelector('.generate-button');
const sizeValDisplay = document.querySelector('.size-values');
let gridSqrs = [];
let mouseDown = false;
let touchDown = false;


let width = 16;
let height = 16;
let numberOfSquares = 256;



function isMouseDown() {
    grid.addEventListener('mousedown', () => {
        mouseDown = true;
    });
    grid.addEventListener('mouseup', () => {
        mouseDown = false;
    });
};
isMouseDown();


function enablePainting(square) {
    /*Paints the square if the mouse is down. For some reason, this doesn't work in two cases:
    -if i click on a single square and release mouse
    -if i hold down mouse, all squares get painted except the first one (the one I clicked on)
    Code below the NEXT COMMENT fixes this.*/
    square.addEventListener('mouseover', () => {
        if (mouseDown === true) {
            square.classList.add('painted');
        }
    });
    /*This code fixes the two problems I indicated above.*/
    square.addEventListener('mousedown', () => {
        square.classList.add('painted');
    });
};

function createGrid() {
    grid.style.setProperty('max-width', width * 18 + 'px');
    for (let i = 0; i < numberOfSquares; i++) {
        const gridSquare = document.createElement('div');
        grid.appendChild(gridSquare);
        gridSquare.setAttribute('id', i + 1)
        gridSquare.classList.add('grid-square');
        gridSqrs.push(gridSquare);
        enablePainting(gridSquare);
    };
    giveSquaresBackground();
    sizeValDisplay.innerHTML = width + "x" + height;
};
createGrid();

function removeGrid() {
    gridSqrs = [];
    for (let i = 0; i < numberOfSquares; i++) {
        document.getElementById(i + 1).remove();
    };
};



function giveSquaresBackground() {
/*Give squares different backgrounds to seperate them (I'm pretty much making a chess board pattern here)*/
    for (let i = 0; i < gridSqrs.length; i++) {
        if (i % (width * 2) === 0) {
            gridSqrs[i].classList.add('square-bg-1');
            for (let j = i; j < i + (width - 1); j++) {
                if (gridSqrs[j].classList.contains('square-bg-1')) {
                    gridSqrs[j + 1].classList.add('square-bg-2');
                } else if (gridSqrs[j].classList.contains('square-bg-2')) {
                    gridSqrs[j + 1].classList.add('square-bg-1');
                };
            };
        } else if (i % width === 0 && i % (width * 2) !== 0) {
            gridSqrs[i].classList.add('square-bg-2');
            for (let j = i; j < i + (width - 1); j++) {
                if (gridSqrs[j].classList.contains('square-bg-2')) {
                    gridSqrs[j + 1].classList.add('square-bg-1');
                } else if (gridSqrs[j].classList.contains('square-bg-1')) {
                    gridSqrs[j + 1].classList.add('square-bg-2');
                };
            };
        };
    };
};



/* GENERATE CANVAS BUTTON */
generateButton.addEventListener('click', createCustomGrid)


function createCustomGrid() {
    width = document.getElementById('width-val').value;
    height = document.getElementById('height-val').value;
    
    /* First check if user gave correct width and height values, then generate canvas */
    if (!width || !height) {
        alert('You need to enter both width and height values in order to generate the canvas!');
    }else if (width < 1 || height < 1){
        alert('Both width and height values must be positive numbers!');
    }else if (width > 64 || height > 64) {
        alert ('Maximum width and height is 64!');
    }else {
        /* Removing the current canvas and then generating the custom canvas */
        removeGrid();
        numberOfSquares = width * height;
        createGrid();
    };
};