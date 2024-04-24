// X = Wall
const wall = "X";
// O = Space
const space = "O";
// To assign the debug value of point distributation
const pointDist = "D";
// To assign the debug value of path builder
const pathBuild = "P";
// To assign the debug value of wall builder
const wallBuild = "W";

// Variables are to set subDebug value for path builder for what direction it goes.
const upDir = "U";
const rightDir = "R";
const downDir = "D";
const leftDir = "L";

const imgClassName = "img";
const spanClassName = "space";

// This is the starting map to generate the backrooms.
var map = [
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
  ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"]
]

// Generates the size of the map array
function generateArrayGrid(row, column){
  let newArray = new Array(row);
  // Loops through the selected row amount
  for (let i = 0; i < row; i++){
    // Creates a new column
    columnArray = [];

    // Loops through the selected column amount
    for (let i = 0; i < column; i++){
      // Assigns a space key to each iteration of column array.
      columnArray[i] = space;
    }

    // copies and pastes every column iteration to every row.
    newArray[i] = columnArray;
  }
  return newArray;
}

// The output element to place the visuals at.
var output = document.getElementById("OUTPUT");

var widthInput = document.querySelector("input[name=width]");
var heightInput = document.querySelector("input[name=height]");

// Resets the map array and converts all walls to spaces
function resetMap(){
  // Loops through the row.
  for (let a = 0; a < map.length; a++){
    // Loops through the column
    for (let b = 0; b < map[a].length; b++){
      // Sets the position to space
      map[a][b] = space;
    }
  }
}

// This will add a wall around the map
function addOuterWall(){
  let wallWithDebug = wall + wallBuild;
  // Adds a northern wall
  for (let i = 0; i < map[0].length; i++){
    map[0][i] = wallWithDebug;
  }

  // Adds a western and eastern wall
  for (let i = 1; i < map.length - 1; i++){
    map[i][0] = wallWithDebug;
    map[i][map[i].length - 1] = wallWithDebug;
  }

  // Adds a southern wall
  for (let i = 0; i < map[map.length - 1].length; i++){
    map[map.length - 1][i] = wallWithDebug;
  }
}

function isSinglePathBlockedByWall(x,y){
  if (!checkIfOutOfBounds(x,y)){
    //console.log("Row: " + x + " Column: " + y + " | Map: " + map[x][y][0]);
    if (map[x][y][0] == wall){
      return true;
    }
    return false;
  }
}

function checkIfOutOfBounds(row, column){
  if (row < 0 || row >= map.length){
    return true;
  } else if (column < 0 || map[row] === undefined){
    return true;
  } else if (column >= map[row].length){
    return true;
  }
}

// Generates a wall path.
// Row = The row of the map array.
// Column = The column of the map array.
function pathBuilder(row, column){
  // For debugging purposes
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let rgb = `[${red},${blue},${green}]`

  // Assigns the row to row index as well with the column.
  let rowIndex = row, columnIndex = column;
  let iteration = 0;
  // This will loops forever unless a break keyword is used.
  while (true) {
    let outputWall = wall + pathBuild;
    // The total amount of points to get the randomization process from for the path building direction.
    const totalPoints = 100;
    // The distribution of points for the direction of the path. Any remainding points is used to end the path.
    const up = 30, right = 10, down = 30, left = 10;
    // Get a random number between 0 and the total points.
    let random = Math.floor(Math.random() * totalPoints)

    // The path builder conditions used to generate a path.
    // Is the random number less then up. aka check to see if the up is in the selection
    if (random <= up){
      // Sets the row index upwards.
      rowIndex -= 1;
      outputWall += upDir;
      if (checkIfOutOfBounds(rowIndex, columnIndex)) break;
      if (isSinglePathBlockedByWall(row+1, column)) break;
      if (isSinglePathBlockedByWall(row+1, column+1)) break;
      if (isSinglePathBlockedByWall(row+1, column-1)) break;
    // Check to see if the right path is selected.
    } else if (random <= up + right){
      // Sets the column index to go right.
      columnIndex += 1;
      outputWall += rightDir;
      if (checkIfOutOfBounds(rowIndex, columnIndex)) break;
      if (isSinglePathBlockedByWall(row, column+1)) break;
      if (isSinglePathBlockedByWall(row+1, column+1)) break;
      if (isSinglePathBlockedByWall(row-1, column+1)) break;
    // Check to see if the down path is selected.
    } else if (random <= up + right + down){
      // Sets the row index to go downwards.
      rowIndex += 1;
      outputWall += downDir;
      if (checkIfOutOfBounds(rowIndex, columnIndex)) break;
      if (isSinglePathBlockedByWall(row-1, column)) break;
      if (isSinglePathBlockedByWall(row-1, column+1)) break;
      if (isSinglePathBlockedByWall(row-1, column-1)) break;
    // Check to see if the left path is selected
    } else if (random <= up + right + down + left){
      // Sets the column index to go left.
      columnIndex -= 1;
      outputWall += leftDir;
      if (checkIfOutOfBounds(rowIndex, columnIndex)) break;
      if (isSinglePathBlockedByWall(row-1, column+1)) break;
      if (isSinglePathBlockedByWall(row+1, column-1)) break;
      if (isSinglePathBlockedByWall(row, column-1)) break;
      // Check to see if the end path is selected. This is for any points not within range.
    } else {
      // Breaks the loop, stopping the path builder.
      break;
    }
    iteration += 1;
    // Sets the map's row and column to wall.
    map[rowIndex][columnIndex] = outputWall + rgb + "[" + iteration + "][" + row + "][" + column + "]";
  }
}

// This generates a map to attach to the map array.
function generateMapArray(){
  // How often the wall will spawn in a space. The higher the number, the rarer the chance of a wall placing.
  let wallChance = 2;
  // Loops through rows.
  for (let a = 0; a < map.length; a++){
    // Gets a random number between 0 and the designated wall chance.
    let randomWallFirst = Math.floor(Math.random() * wallChance);
    // Loops through columns.
    for (let b = 0; b < map[a].length; b++){
      // Gets another random value between 0 and the designated wall chance.
      let randomWallSecond = Math.floor(Math.random() * wallChance);
      // Checks to see if both random values matches.
      if (randomWallFirst == randomWallSecond){
        if (
          !(isSinglePathBlockedByWall(a-1, b) ||
          isSinglePathBlockedByWall(a, b-1) ||
          isSinglePathBlockedByWall(a-1, b-1) ||
          isSinglePathBlockedByWall(a-1, b+1))
        ){;
          // Places a wall.
          map[a][b] = wall + pointDist;
          // Creates a wall path.
          pathBuilder(a, b)
        }
      }
    }
  }
  addOuterWall();
  if (isScreenWidthReady()){
    hideControlBar();
  }
}

// The DOM json to generate DOM elements
const DOMMapGeneration = {
  // Contains the type of DOMs that you can create.
  create : {
    // The table category to create a table elements.
    table : {
      // Creates a table row.
      row : function(){
        let tableRow = document.createElement("tr");
        output.appendChild(tableRow);
        return tableRow;
      },
      // Creates a table data.
      data : function(tableRow){
        let tableData = document.createElement("th");
        tableRow.appendChild(tableData);
        return tableData;
      }
    },
    // Contains subcategories of visual generations.
    generation : {
      // Creates a span element that acts as a space.
      space : function(tableData){
        let imgTag = document.createElement("span");
        imgTag.setAttribute("class",spanClassName);
        tableData.appendChild(imgTag);
        return imgTag;
      },
      // Creates an img element for the map.
      image : function(tableData, src, classList){
        let imgTag = document.createElement("img");
        imgTag.setAttribute("src",src);
        imgTag.setAttribute("class",imgClassName + " " + classList);
        tableData.appendChild(imgTag);
        return imgTag;
      }
    }
  },
  // Includes a list of images to use for the map.
  imageSrc : {
    // The basic backroom level 0 wallpaper.
    wallpaper : "imgs/level_0_wallpaper_512.png",
    up_arrow : "imgs/arrow-up.png",
    right_arrow : "imgs/arrow-right.png",
    down_arrow : "imgs/arrow-down.png",
    left_arrow : "imgs/arrow-left.png",
    wall : "imgs/Wall-label.png",
    border : "imgs/Border-label.png"
  },
  // Removes the generated image.
  remove : function(){
    output.innerHTML = "";
  }
}

// This converts the map array into a more eye friendly DOM.
function outputMap(){
  // Loops through every row.
  for (let a = 0; a < map.length; a++){
    // Creates a table row element.
    let tableRow = DOMMapGeneration.create.table.row();
    // Loops throughe every column.
    for (let b = 0; b < map[a].length; b++){
      // Creates a table data to store the img data.
      let tableData = DOMMapGeneration.create.table.data(tableRow);
      tableData.setAttribute("row",a);
      tableData.setAttribute("column",b);
      // Checks to see if the precise row and column is a wall type.
      loc = map[a][b];
      if (loc[0] == wall){
        tableData.setAttribute("type","wall");
        // The debug attribute name
        const debugAttr = "debug-type";
        // The path builder direction name. Used to see what direction the path builder is going.
        const pathBuildDir = "path-builder-direction";
        // If a wall then it will store an img tag element with the backrooms wallpaper as the source.
        let wall = DOMMapGeneration.create.generation.image(tableData, DOMMapGeneration.imageSrc.wallpaper);
        // Checks to see if the debug type is of point distribution
        if (loc[1] == pointDist){
          // Sets the debug attr to point-distribution
          wall.setAttribute(debugAttr,"point-distribution");
          tableData.setAttribute("class","image-containment-overlay");
          tableData.setAttribute("subtype","Point Distribution");
          let w = DOMMapGeneration.create.generation.image(tableData,DOMMapGeneration.imageSrc.wall,"image-overlay debug-path-dist");
          w.style.display = "none";
        // Checks to see if the debug type is of path builder.
        } else if (loc[1] == pathBuild){
          // Sets the debug attr to the path-builder
          wall.setAttribute(debugAttr,"path-builder")
          tableData.setAttribute("class","image-containment-overlay")
          tableData.setAttribute("subtype","Path");
          // Sets the specific direction of path builder for debugger.
          if (loc[2] == upDir){
              // This will set the path build debug variable to what direction is needed.
              wall.setAttribute(pathBuildDir,"up");
              // Creates an up arrow image to apply over wall image.
              // This will also apply the neccessary classes for it.
              // img = Includes the basic of width and height, the display, etc.
              // image-overlay = Makes the image hover above the wall image.
              // debug-arrow = Helps the debugger find the element.
              let upArr = DOMMapGeneration.create.generation.image(tableData, DOMMapGeneration.imageSrc.up_arrow,"image-overlay debug-arrow");
              // Sets the display to none.
              upArr.style.display = "none";
            // Same method exists for the rest of the conditions
          } else if (loc[2] == rightDir){
              wall.setAttribute(pathBuildDir,"right");
              let rightArr = DOMMapGeneration.create.generation.image(tableData, DOMMapGeneration.imageSrc.right_arrow,"image-overlay debug-arrow");
              rightArr.style.display = "none";
          } else if (loc[2] == downDir){
              wall.setAttribute(pathBuildDir,"down");
              let downArr = DOMMapGeneration.create.generation.image(tableData, DOMMapGeneration.imageSrc.down_arrow,"image-overlay debug-arrow");
              downArr.style.display = "none";
          } else if (loc[2] == leftDir){
              wall.setAttribute(pathBuildDir,"left");
              let leftArr = DOMMapGeneration.create.generation.image(tableData, DOMMapGeneration.imageSrc.left_arrow,"image-overlay debug-arrow");
              leftArr.style.display = "none";
          }

          const regEx = /\[(.*?)\]/g;
          let match = loc.match(regEx);
          let colorCode = match[0];
          let pathIteration = match[1];
          let rowOrigin = match[2];
          let colOrigin = match[3];

          // Checks to see if the 3rd element uses a bracket. Which indicates the start of the rgb
          if (colorCode){
            // Replace the first bracket with something readable for css.
            colorCode = colorCode.replace("[","rgb(");
            // Replaces last bracket with the ending.
            colorCode = colorCode.replace("]",")");
            //wall.setAttribute("style","outline: 3px solid " + colorCode);
            // Applies the colorCode for use in debugging.
            wall.setAttribute("path-builder-color",colorCode)
          }

          if (pathIteration){
            pathIteration = pathIteration.replace("[","");
            pathIteration = pathIteration.replace("]","");
            wall.setAttribute("path-builder-iteration",pathIteration);
          }

          if (rowOrigin){
            rowOrigin = rowOrigin.replace("[","");
            rowOrigin = rowOrigin.replace("]","");
            wall.setAttribute("row-origin",rowOrigin);
          }

          if (colOrigin){
            colOrigin = colOrigin.replace("[","");
            colOrigin = colOrigin.replace("]","");
            wall.setAttribute("col-origin",colOrigin);
          }
        // Checks to see if the debug type is of wall builder.
        } else if (loc[1] == wallBuild){
          // Sets the debug attr to the wall-builder
          wall.setAttribute(debugAttr,"wall-builder")
          tableData.setAttribute("class","image-containment-overlay");
          tableData.setAttribute("subtype","Border Wall")
          let b = DOMMapGeneration.create.generation.image(tableData,DOMMapGeneration.imageSrc.border,"image-overlay debug-wall");
          b.style.display = "none";
        }
      // Checks to see if the precise row and column is a space type.
      } else if (loc[0] == space){
        tableData.setAttribute("type","space");
        tableData.setAttribute("subtype","space");
        // If a space then it will store a span empty in the selected table data.
        DOMMapGeneration.create.generation.space(tableData);
      }
    }
  }
}

// This will reset the entire map including the array and DOM generation.
function clearMap(){
  // Removes the previous DOM map
  DOMMapGeneration.remove();
  // Resets the array map
  resetMap();
}

function overlayImageDebug(elmnt, debugTypeVar, overlayImageClass){
  const debugType = document.querySelectorAll(`[debug-type=${debugTypeVar}]`);
  const className = document.getElementsByClassName(overlayImageClass);

  if (elmnt.checked){
    debugType.forEach((value, i) => {
      var colorAttr = value.getAttribute("path-builder-color");
      if (colorAttr){
        value.style.border = "3px solid " + colorAttr;
      } else {
        value.style.border = "3px solid black";
      }
      className[i].style.display = "block";
      className[i].style.border = "3px solid transparent";
    });
  } else {
    debugType.forEach((value, i) => {
      value.style.border = "";
      className[i].style.display = "none";
      className[i].style.border = "3px solid transparent";
    });
  }
}

function attachTableDataEvents(){
  const tableDataList = document.getElementsByTagName("th");
  let currentSelected = -1;
  for (let i = 0; i < tableDataList.length; i++){
    let data = tableDataList[i];
    data.addEventListener("click",() => {
      if (currentSelected > 0){
        tableDataList[currentSelected].removeAttribute("selected");
      }
      currentSelected = i;
      tableDataList[i].setAttribute("selected","selected");
      showDebugDetails(tableDataList[i]);
    })
  }
}

function showDebugDetails(data){
  let general = document.getElementById("GENERAL");
  let pathBuilder = document.getElementById("PATH_BUILDER");

  let typeP = document.getElementById("TYPE");
  let subtypeP = document.getElementById("SUBTYPE");
  let rowP = document.getElementById("ROW");
  let colP = document.getElementById("COLUMN");

  let origin = document.getElementById("ORIGIN");
  let direction = document.getElementById("DIRECTION");
  let iteration = document.getElementById("ITERATION");

  general.style.display = "block";
  typeP.innerHTML = "Type: " + data.getAttribute("type");
  subtypeP.innerHTML = "Subtype: " + data.getAttribute("subtype");
  rowP.innerHTML = "Row: " + data.getAttribute("row");
  colP.innerHTML = "Column: " + data.getAttribute("column");

  if (data.getAttribute("subtype") == "Path"){
    let pathData = data.getElementsByTagName("img")[0];
    pathBuilder.style.display = "block";
    origin.innerHTML = `Origin [R,C]: [${pathData.getAttribute("row-origin")},${pathData.getAttribute("col-origin")}]`;
    direction.innerHTML = "Direction: " + pathData.getAttribute("path-builder-direction");
    iteration.innerHTML = "Iteration: " + pathData.getAttribute("path-builder-iteration");
  } else {
    pathBuilder.style.display = "none";
  }
}

// Generates a map.
function generateMap(){
  // Generates the map array size
  map = generateArrayGrid(widthInput.value, heightInput.value);
  // This will reset the entire map
  clearMap();
  // Generates map structure
  generateMapArray();
  // Generates and output DOM map
  outputMap();
  attachTableDataEvents();
}
