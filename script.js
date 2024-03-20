"use strict";

window.addEventListener("load", start);

//      *************** Controller  ***************
function start(){
    console.log("JS is working")
    runSettings();
    createModel();
    createView();
    randomizeModel();
}

const GRID_WIDTH = 60;
const GRID_HEIGHT = 40;
let runGame = null;

function changeCell(row, col){
    if (model[row][col] === 1){
        model[row][col] = 0;
    } else {
        model[row][col] = 1;
    }
    showBoard();
}

function startGame(){
    console.log("Starting game")
    while(!runGame){
        runGame = setInterval(calculateNextGen, 200);
    }
}

function stopGame(){
    console.log("Stopping game")
    clearInterval(runGame);
    runGame = null;
}

//      **************  VIEW  ***************

function showBoard(){
    const board = document.querySelector("#board");

    for(let row = 0; row < model.length; row++){
        for(let col = 0; col < model[row].length; col++){
            const cell = board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            
            if (model[row][col] === 1){
                cell.classList.add("alive");
            } else {
                cell.classList.remove("alive");
            }
        }
    }
}

function getCell(row, col){
    const board = document.querySelector("#board");
    return board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}

function createView(){
    const board = document.querySelector("#board");
    board.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
    let isDragging = false;

    for(let row = 0; row < GRID_HEIGHT; row++){
        for(let col = 0; col < GRID_WIDTH; col++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("mousedown", function(e) {
                isDragging = true;
                toggleCellState(this);
                e.preventDefault();
            });
            cell.addEventListener("mouseenter", function() {
                if (isDragging) {
                    toggleCellState(this);
                }
            });
            board.appendChild(cell);
        }
    }
    board.addEventListener("mouseup", function() {
        isDragging = false;
    });

    board.addEventListener("mouseleave", function() {
        isDragging = false;
    });

    board.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
}

function toggleCellState(cell) {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    changeCell(row, col);
}

function runSettings() {
    document.querySelector("#start").addEventListener("click", startGame);
    document.querySelector("#stop").addEventListener("click", stopGame);
    document.querySelector("#next").addEventListener("click", calculateNextGen);
    document.querySelector("#random").addEventListener("click", randomizeModel);
    document.querySelector("#clear").addEventListener("click", clearModel);
}

//          **************  MODEL  ***************
let model = [];

function writeToCell(row, col, value){
    model[row][col] = value;
}

function readFromCell(row, col){
    return model[row][col];
}

function countNeighbours(row, col){
    getCell(row, col).classList.add("alive");
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if(j != 0 || i != 0){

                if (row + i >= GRID_HEIGHT && col + j >= GRID_WIDTH){
                    count += readFromCell(0, 0);

                } else if (row + i < 0 && col + j < 0){
                    count += readFromCell(GRID_HEIGHT - 1, GRID_WIDTH - 1);

                } else if(col + j >= GRID_WIDTH && row + i < 0){
                    count += readFromCell(GRID_HEIGHT - 1, 0);

                } else if (row + i >= GRID_HEIGHT && col + j < 0){
                    count += readFromCell(0, GRID_WIDTH - 1);

                } else if(col + j >= GRID_WIDTH){
                    count += readFromCell(row + i, 0);

                } else if(col + j < 0){
                    count += readFromCell(row + i, GRID_WIDTH - 1);

                } else if (row + i >= GRID_HEIGHT){
                    count += readFromCell(0, col + j);

                }else if(row + i < 0 ){
                    count += readFromCell(GRID_HEIGHT - 1, col + j);

                }else {
                count += readFromCell(row + i, col + j);
                }   
            }            
        }
        
    }
    return count;
}

function clearModel(){
    createModel();
    showBoard();
}

function createModel(){
    for(let row = 0; row < GRID_HEIGHT; row++){
        const newRow = [];
        for(let col = 0; col < GRID_WIDTH; col++){
            newRow[col] = 0;
        }
        model[row] = newRow;
    }
}

function randomizeModel(){
    for(let row = 0; row < model.length; row++){
        for(let col = 0; col < model[row].length; col++){
            if (Math.random() < 0.15){
                writeToCell(row, col, 1);
            } else {
                writeToCell(row, col, 0);
            }
        }
    }
    showBoard();
}


function calculateNextGen(){
    console.log("Calculating next generation");
    const newModel = [];
    for(let row = 0; row < model.length; row++){
        const newRow = [];
        for(let col = 0; col < model[row].length; col++){
            const neighbours = countNeighbours(row, col);
            if (neighbours < 2 || neighbours > 3){
                newRow[col] = 0;
            } else if (neighbours === 3){
                newRow[col] = 1;
            } else {
                newRow[col] = model[row][col];
            }
        }
        newModel[row] = newRow;
    }

    model = newModel;
    showBoard();
}