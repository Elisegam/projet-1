function setup() {
  createCanvas(600, 600); //tableau 6x6
  grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]; // Array représentant le tableau
  addNumber();
  addNumber();
}

function addNumber() {
  // ajoute un 2 ou un 4 aléatoirement dans des cases
  let options = []; //listes des cases possible à remplir
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (this.grid[i][j] === 0) {
        // valid spot option => case ne comprend pas de chiffre
        options.push({ x: i, y: j });
      }
    }
  }
  if (options.length > 0); // si il y a des spot de diponible
  let spot = random(options);
  let r = random(1); // random() vient de la librairy p5, elle permet de choisir au hasard une valeur d'un array
  this.grid[spot.x][spot.y] = r > 0.5 ? 2 : 4; // j'ai mis 0,8 pour qu'il y est plus de 2 que de 4
}

function compare(a, b) {
  // evaluation de la similarité des cases voisines
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (a[i][j] != b[i][j]) {
        return true;
      }
    }
  }
  return false;
}
function copyG(grid) {
  let extra = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      extra[i][j] = grid[i][j];
    }
  }
  return extra;
}

function flipGrid() {
  for (let i = 0; i < 6; i++) {
    grid[i].reverse();
  }
  return grid;
}
function rotateGrid(grid) {
  let newGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      newGrid[i][j] = grid[j][i];
    }
  }
  return newGrid;
}

function keyPressed() {
  let flipped = false;
  let rotated = false;
  let played = true;
  if (keyCode === DOWN_ARROW) {
    // Do nothing
    played = true;
  } else if (keyCode === UP_ARROW) {
    grid = flipGrid(grid);
    flipped = true;
  } else if (keyCode === RIGHT_ARROW) {
    grid = rotateGrid(grid);
    rotated = true;
    played = true;
  } else if (keyCode === LEFT_ARROW) {
    grid = rotateGrid(grid);
    grid = flipGrid(grid);
    rotated = true;
    flipped = true;
  } else {
    played = false;
  }
  if (played) {
    let past = copyG(grid);
    for (let i = 0; i < 6; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);

    if (flipped) {
      flipGrid(grid);
    }
    if (rotated) {
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
    }
    if (changed) {
      addNumber();
    }
  }
}

function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);

  return row;
}

function draw() {
  background(255);
  drawGrid();
}
function slide(row) {
  // permet de tout ramener dans un sens en supppriment les 0 au milieu
  //move everything if it's not equal 0
  //crée une nouvelle array
  let arr = row.filter(val => val);
  let missing = 6 - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
}
function combine(row) {
  // permet d'additionner les 2 et 4 d'une même ligne ou colonne dans l'array
  for (let i = 5; i >= 1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a == b) {
      row[i] = a + b;
      row[i - 1] = 0;
      break;
    }
  }
  return row;
}

function setBgColor(num) {
  const color2 = { r: 255, g: 246, b: 160 };
  const color4 = { r: 208, g: 255, b: 186 };
  const color8 = { r: 124, g: 204, b: 204 };
  const color16 = { r: 113, g: 78, b: 145 };
  const color32 = { r: 255, g: 172, b: 228 };
  const color64 = { r: 140, g: 66, b: 116 };
  const color128plus = { r: 239, g: 178, b: 44 };
  const color2048 = { r: 242, g: 136, b: 62 };

  const color = { r: 255, g: 255, b: 255 };

  return num === 2
    ? color2
    : num === 4
    ? color4
    : num === 8
    ? color8
    : num === 16
    ? color16
    : num === 32
    ? color32
    : num === 64
    ? color64
    : num === 128
    ? color128plus
    : num === 256
    ? color128plus
    : num === 512
    ? color128plus
    : num === 1024
    ? color128plus
    : num === 2048
    ? color2048
    : color;
}
function setTextColor(num) {
  const colorX = "#FFFFF";
  const colorY = "#462F3F";

  return num === 2
    ? colorY
    : num === 4
    ? colorY
    : num === 8
    ? colorX
    : num === 16
    ? colorX
    : num === 32
    ? colorX
    : num === 64
    ? colorX
    : num === 128
    ? colorX
    : num === 256
    ? colorX
    : num === 512
    ? colorX
    : num === 1024
    ? colorX
    : num === 2048
    ? colorX
    : colorX;
}
function drawGrid() {
  // dessine la grille
  let w = 100;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let val = grid[i][j];
      noFill();
      strokeWeight(2);
      stroke(0);
      const bg = setBgColor(val);
      fill(color(bg.r, bg.g, bg.b));
      rect(i * w, j * w, w, w, 20);

      if (grid[i][j] !== 0) {
        textAlign(CENTER, CENTER);
        textSize(60);
        fill(0);
        noStroke();
        const textcol = setTextColor(val);
        fill(textcol);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}
