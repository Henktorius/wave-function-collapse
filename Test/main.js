let size = 10;
let thickness = 3;
let cells = [];
let possibleCells = [];
let untouchedCells = [];
let currentIteration = 0;
const conexionsR = [2, 5, 7, 8, 9, 10, 12, 13];
const conexionsL = [2, 4, 6, 8, 10, 11, 12, 15];
const conexionsT = [3, 5, 6, 8, 9, 11, 12, 16];
const conexionsB = [3, 4, 7, 9, 10, 11, 12, 14];
const emptyR = [1, 3, 4, 6, 11, 14, 15, 16];
const emptyL = [1, 3, 5, 7, 9, 13, 14, 16];
const emptyT = [1, 2, 4, 7, 10, 13, 14, 15];
const emptyB = [1, 2, 5, 6, 8, 13, 15, 16];

// Define Cell
class Cell{
  constructor(x, y, options, shape, index){
    this.x = x;
    this.y = y;
    this.options = options;
    this.shape = shape;
    this.index = index;
  }
}

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
  background(255);
  fill(0);
  // Create all the cells  
  for(let j = 0; j<size; j++)
  {
    for(let i = 0; i<size; i++)
    {
      let newCell = new Cell(i, j, {T:"O", B:"O", L:"O", R:"O"}, -1, i+j*size);
      cells.push(newCell);
      console.log("New cell created with index: "+ newCell.index);
    } 
  }

  while(currentIteration<(cells.length))
  {
    untouchedCells = [];
    possibleCells = [];
    // Iterate through all cells to find the lowest entropy
    // If a cell hasn't been assigned a shape yet (shape = -1) it's added to a special array to only loop through new cells
    let entropy = 4;
    cells.forEach(cell => {
      let cellOptions = 4;
      if(cell.shape == -1)
      {
        untouchedCells.push(cell); // Array with only new cells
        Object.values(cell.options).forEach(v => {if(v != "O")cellOptions--}); // Overly-complicated way of checking the amount of "O" values in the cell options 
        if(cellOptions < entropy)
        {
          entropy = cellOptions; // If we find a lower entropy we replace it
        }
      }
    });
    // Iterate through all the new cells and extract the ones with the lowest entropy
    untouchedCells.forEach(cell => {
      let cellOptions = 4;
      Object.values(cell.options).forEach(v => {if(v != "O")cellOptions--});
      if(cellOptions == entropy)
      {
        possibleCells.push(cell); // Array with cells with the lowest entropy
      }
    });
    // We choose a random cell from the ones with the lowest entropy and assign it a random shape depending on it's neighbours
    // 1: Choose cell
    // 2: Get neighbouring cells
    // 3: Make an array with all the possible shapes
    // 4: Choose one randomly
    let chosenCell = possibleCells[Math.floor(Math.random()*(possibleCells.length-1))];
    var pS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; // Possible shapes
    
    if (chosenCell.options.T == "C") {
      pS = pS.filter(e => conexionsT.includes(e));
    }
    else if (chosenCell.options.T == "E") {
      pS = pS.filter(e => emptyT.includes(e));
    }
    if (chosenCell.options.B == "C") {
      pS = pS.filter(e => conexionsB.includes(e));
    }
    else if (chosenCell.options.B == "E") {
      pS = pS.filter(e => emptyB.includes(e));
    }
    if (chosenCell.options.L == "C") {
      pS = pS.filter(e => conexionsL.includes(e));
    }
    else if (chosenCell.options.L == "E") {
      pS = pS.filter(e => emptyL.includes(e));
    }
    if (chosenCell.options.R == "C") {
      pS = pS.filter(e => conexionsR.includes(e));
    }
    else if (chosenCell.options.R == "E") {
      pS = pS.filter(e => emptyR.includes(e));
    }

    collapseCell(chosenCell.x, chosenCell.y, pS, chosenCell.index, entropy);
    currentIteration++;
  }
}

function draw() {
  
}

function collapseCell(x, y, possibleShapes, index, entropy) {

  let chosenOpt = possibleShapes[Math.floor(Math.random()*(possibleShapes.length-1))]; // Get a random shape from all possible ones
  // Shape index:
  // -1: None (default)
  // 1: Empty
  // 2: L-R
  // 3: T-B
  // 4: L-B
  // 5: T-R
  // 6: T-L
  // 7: R-B
  // 8: T-L-B
  // 9: T-R-B
  // 10: L-R-B
  // 11: T-L-B
  // 12: T-L-R-B
  // 13: R
  // 14: B
  // 15: L
  // 16: T

  cells[index].shape = chosenOpt; // We assign the random shape to the cell
  // Collapsing:
  // 1: Check if the cell is surrounded by all four sides (not edge cell)
  // 2: If it is an edge cell. Calculate which side is missing.
  // 3: Modify options of surrounding cells
  // 4: Draw shape

  // Neighbouring cells:
  // [cell_index - size] = cell on top
  // [cell_index + size] = cell beneath
  // [cell_index - 1] = cell to the left
  // [cell_index + 1] = cell to the right

  let cellBeneath = cells[index+size];
  let cellAbove = cells[index-size];
  let cellRight = cells[index+1];
  let cellLeft = cells[index-1];

  if(x == 0) // Cell is located on the left edge (no cell to the left)
  {
    if(y == 0) // Cell is located on the left-top corner (no cells on top or to the left)
    {
      if(conexionsB.includes(chosenOpt))
      {
        cellBeneath.options.T = "C";
      }
      else if(emptyB.includes(chosenOpt))
      {
        cellBeneath.options.T = "E";
      }
      if(conexionsR.includes(chosenOpt))
      {
        cellRight.options.L = "C";
      }
      else if(emptyR.includes(chosenOpt))
      {
        cellRight.options.L = "E";
      }
    }
    else if(y == 9) // Cell is located on the left-bottom corner (no cells beneath it or to the left)
    {
      if(conexionsT.includes(chosenOpt))
      {
        cellAbove.options.B = "C";
      }
      else if(emptyT.includes(chosenOpt))
      {
        cellAbove.options.B = "E";
      }
      if(conexionsR.includes(chosenOpt))
      {
        cellRight.options.L = "C";
      }
      else if(emptyR.includes(chosenOpt))
      {
        cellRight.options.L = "E";
      }
    }
    else
    {
      if(conexionsB.includes(chosenOpt))
      {
        cellBeneath.options.T = "C";
      }
      else if(emptyB.includes(chosenOpt))
      {
        cellBeneath.options.T = "E";
      }
      if(conexionsR.includes(chosenOpt))
      {
        cellRight.options.L = "C";
      }
      else if(emptyR.includes(chosenOpt))
      {
        cellRight.options.L = "E";
      }
      if(conexionsT.includes(chosenOpt))
      {
        cellAbove.options.B = "C";
      }
      else if(emptyT.includes(chosenOpt))
      {
        cellAbove.options.B = "E";
      }
    }
  }

  else if(x == 9) // Cell is located on the right edge (no cell to the right)
  {
    if(y == 0) // Cell is located on the right-top corner (no cells above it or to the right)
    {
      if(conexionsB.includes(chosenOpt))
      {
        cellBeneath.options.T = "C";
      }
      else if(emptyB.includes(chosenOpt))
      {
        cellBeneath.options.T = "E";
      }
      if(conexionsL.includes(chosenOpt))
      {
        cellLeft.options.R = "C";
      }
      else if(emptyL.includes(chosenOpt))
      {
        cellLeft.options.R = "E";
      }
    }
    else if(y == 9) // Cell is located on the right-bottom corner (no cells beneath it or to the right)
    {
      if(conexionsT.includes(chosenOpt))
      {
        cellAbove.options.B = "C";
      }
      else if(emptyT.includes(chosenOpt))
      {
        cellAbove.options.B = "E";
      }
      if(conexionsL.includes(chosenOpt))
      {
        cellLeft.options.R = "C";
      }
      else if(emptyL.includes(chosenOpt))
      {
        cellLeft.options.R = "E";
      }
    }
    else
    {
      if(conexionsB.includes(chosenOpt))
      {
        cellBeneath.options.T = "C";
      }
      else if(emptyB.includes(chosenOpt))
      {
        cellBeneath.options.T = "E";
      }
      if(conexionsL.includes(chosenOpt))
      {
        cellLeft.options.R = "C";
      }
      else if(emptyL.includes(chosenOpt))
      {
        cellLeft.options.R = "E";
      }
      if(conexionsT.includes(chosenOpt))
      {
        cellAbove.options.B = "C";
      }
      else if(emptyT.includes(chosenOpt))
      {
        cellAbove.options.B = "E";
      }
    }
  }

  else if(y == 0) // Cell is located on the top edge (no cell on top)
  {
    if(conexionsB.includes(chosenOpt))
    {
      cellBeneath.options.T = "C";
    }
    else if(emptyB.includes(chosenOpt))
    {
      cellBeneath.options.T = "E";
    }
    if(conexionsL.includes(chosenOpt))
    {
      cellLeft.options.R = "C";
    }
    else if(emptyL.includes(chosenOpt))
    {
      cellLeft.options.R = "E";
    }
    if(conexionsR.includes(chosenOpt))
    {
      cellRight.options.L = "C";
    }
    else if(conexionsR.includes(chosenOpt))
    {
      cellRight.options.L = "E";
    }
  }

  else if(y == 9) // Cell is located on the bottom edge (no cell beneath)
  {
    if(conexionsT.includes(chosenOpt))
    {
      cellAbove.options.B = "C";
    }
    else if(emptyT.includes(chosenOpt))
    {
      cellAbove.options.B = "E";
    }
    if(conexionsL.includes(chosenOpt))
    {
      cellLeft.options.R = "C";
    }
    else if(emptyL.includes(chosenOpt))
    {
      cellLeft.options.R = "E";
    }
    if(conexionsR.includes(chosenOpt))
    {
      cellRight.options.L = "C";
    }
    else if(conexionsR.includes(chosenOpt))
    {
      cellRight.options.L = "E";
    }
  }

  else
  {
    if (conexionsT.includes(chosenOpt)) 
    {
      cellAbove.options.B = "C";
    }
    else if (emptyT.includes(chosenOpt)) 
    {
      cellAbove.options.B = "E";
    }
    if (conexionsL.includes(chosenOpt)) 
    {
      cellLeft.options.R = "C";
    }
    else if (emptyL.includes(chosenOpt)) 
    {
      cellLeft.options.R = "E";
    }
    if (conexionsR.includes(chosenOpt)) 
    {
      cellRight.options.L = "C";
    }
    else if (emptyR.includes(chosenOpt)) 
    {
      cellRight.options.L = "E";
    }
    if (conexionsB.includes(chosenOpt)) 
    {
      cellBeneath.options.T = "C";
    }
    else if (emptyB.includes(chosenOpt)) 
    {
      cellBeneath.options.T = "E";
    }
  }
  
  // Draw the corresponding shape
  switch(chosenOpt)
  {
    case 2:
      rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size, thickness); // Shape 2
      break;
    case 3:
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size); // Shape 3
      break;
    case 4:
      rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 4
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, thickness, height/size/2+thickness);
      break;
    case 5:
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 5
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size/2+thickness);
      break;
    case 6:
      rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 6
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size/2+thickness);
      break;
    case 7:
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 7
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, thickness, height/size/2+thickness);
      break;
    case 8:
      rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size, thickness); // Shape 8
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size/2+thickness);
      break;
    case 9:
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 9
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size);
      break;
    case 10:
      rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size, thickness); // Shape 10
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, thickness, height/size/2+thickness);
      break;
    case 11:
      rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 11
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size);
      break;
    case 12:
      rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size, thickness); // Shape 12
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size);
      break;
    case 13:
      rect((width/size)*x+(width/size)/2, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 13
      circle((width/size)*x+(width/size)/2, (height/size)*y+(height/size)/2, thickness*4);
      break;
    case 14:
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y+(height/size)/2-thickness/2, thickness, height/size/2+thickness); // Shape 14
      circle((width/size)*x+(width/size)/2, (height/size)*y+(height/size)/2, thickness*4);
      break;
    case 15:
      rect((width/size)*x, (height/size)*y+(height/size)/2-thickness/2, width/size/2, thickness); // Shape 15
      circle((width/size)*x+(width/size)/2, (height/size)*y+(height/size)/2, thickness*4);
      break;
    case 16:
      rect((width/size)*x+(width/size)/2-thickness/2, (height/size)*y, thickness, height/size/2+thickness); // Shape 16
      circle((width/size)*x+(width/size)/2, (height/size)*y+(height/size)/2, thickness*4);
      break;
                                    
  }

  console.log(`[Iteration: ${currentIteration}] [Untouched cells array: ${untouchedCells.length}] [Possible cells array: ${possibleCells.length}] [Chosen cell: ${index}] [Shape given: ${chosenOpt}] [Minimum entropy: ${entropy}]`);
}