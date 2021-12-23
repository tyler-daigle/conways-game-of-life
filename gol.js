
const Colors = {
  background: "#000",
  liveCell: "#0F0",
  deadCell: "#F00",
};

const canvas = document.getElementById("main-canvas");
const canvasHeight = 400;
const canvasWidth = 400;

const cellHeight = 10;
const cellWidth = 10;

const cellsPerRow = canvasWidth / cellWidth;
const cellsPerColumn = canvasHeight / cellHeight;

let livingCells = 0;
let lifeCycles = 0;
let deaths = 0;
let births = 0;

function drawRect(context, x, y, width, height, color = "#0F0") {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function fillScreen(context, color) {
  context.fillStyle = color;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
}

function initCells(numCells, maxX, maxY) {
  const cells = [];
  
  for(let y = 0; y < maxY; y++) {
    cells.push(Array(maxX).fill(0));    
  }

  for(let i = 0; i < numCells; i++) {
    let placed = false;
    let pos = {x:0,y:0};
    while(!placed) {
      pos.x = Math.floor(Math.random() * maxX);
      pos.y = Math.floor(Math.random() * maxY);
      if(cells[pos.y][pos.x] === 0) {
        cells[pos.y][pos.x] = 1;
        placed = true;
      }
    }
  }
  livingCells += numCells;
  return cells;
}

function updateStatus() {
  document.getElementById("life-cycles").innerText = `Cycles: ${lifeCycles}`;
  document.getElementById("living-cells").innerText = `Living Cells: ${livingCells}`;
  document.getElementById("deaths").innerText = `Deaths: ${deaths}`;
  document.getElementById("births").innerText = `Births: ${births}`;
}

function draw(cells) {
  const context = canvas.getContext("2d");
  fillScreen(context, Colors.background);

  for(let y = 0; y < cells.length; y++) {
    for(let x = 0; x < cells[y].length; x++) {
      if(cells[y][x] === 1) {
        drawRect(context, x * cellWidth, y * cellHeight, cellWidth, cellHeight,  Colors.liveCell);
      } 
    }
  }  
}

function update(cells) {
  for(let y = 0; y < cells.length; y++) {
    for(let x = 0; x < cells[y].length;x ++) {
      let numNeighbors = 0;
      // up
      if(y > 0) {
        if(cells[y - 1][x] === 1) {
          numNeighbors += 1;
        }
        // up left
        if(x > 0) {
          if(cells[y - 1][x - 1] === 1) {
            numNeighbors += 1;
          }
        }
        // up right
        if(x < cellsPerRow - 1) {
          if(cells[y - 1][x+1] === 1) {
            numNeighbors += 1;
          }
        }
      }

      // down
      if(y < cellsPerColumn - 1) {
        if(cells[y + 1][x] === 1) {
          numNeighbors += 1;
        }
        // down left
        if(x > 0) {
          if(cells[y + 1][x - 1] === 1) {
            numNeighbors += 1;
          }
        }
        // down right
        if(x < cellsPerRow - 1) {
          if(cells[y + 1][x + 1] === 1) {
            numNeighbors += 1;
          }
        }
      }

      // left
      if(x > 0) {
        if(cells[y][x - 1] === 1) {
          numNeighbors += 1;
        }
      }

      // right
      if(x < cellsPerRow - 1) {
        if(cells[y][x + 1] === 1) {
          numNeighbors += 1;
        }
      }

      // check if this is a dead cell already and has 3 neighbors
      if(cells[y][x] === 0) {
        if(numNeighbors === 3) {
          cells[y][x] = 1;
          livingCells += 1;
        } 
        continue;
      } 
      
      if(numNeighbors < 2 || numNeighbors > 3) {
        // less than two neighbors dies
        // more than 3 neighbors dies
        cells[y][x] = 0;
        livingCells -= 1;
      } 
      
    }
  }
}

function Game() {  
  const cells = initCells(200, cellsPerRow, cellsPerColumn);
  console.log(cells);    

  setInterval(() => {
    update(cells);
    draw(cells);
    updateStatus();
    lifeCycles += 1;
  }, 100);
}
Game();
