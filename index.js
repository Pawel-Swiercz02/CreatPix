const grid = document.querySelector('.grid-div');
const gridSqrs = [];
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
            console.log(square);
        }
    });
    /*This code fixes the two problems I indicated above.*/
    square.addEventListener('mousedown', () => {
        square.classList.add('painted');
    });
};

function createGrid() {
    for (let i = 0; i < numberOfSquares; i++) {
        const gridSquare = document.createElement('div');
        grid.appendChild(gridSquare);
        gridSquare.setAttribute('id', i + 1)
        gridSquare.classList.add('grid-square');
        gridSqrs.push(gridSquare);

        enablePainting(gridSquare);
    };
};
createGrid();


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
giveSquaresBackground();