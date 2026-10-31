const TILE_SIZE = 48;
const GRID_COLUMNS = 18;
const GRID_ROWS = 12;
const GRID_LEFT = 48;
const GRID_TOP = 112;
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 720;
const INTERACTION_RANGE = 42;
const PLAYER_SPEED = 3;
const WARMTH_LOSS_PER_SECOND = 0.34;

let player;
let walls;
let wallSprites = [];
let coalPiles = [];
let machines = [];
let exitPoint;
let gameMode = "title";
let warmth = 100;
let carryingCoal = false;
let statusMessage = "";
let statusMessageUntil = 0;
let lastActionAt = 0;

function setup() {
  const gameCanvas = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  gameCanvas.parent("game");
  pixelDensity(1);
  noSmooth();
  textFont("monospace");
  textAlign(LEFT, CENTER);
  world.gravity.y = 0;

  createDungeonWalls();
  walls = new Group();
  walls.collider = "static";
  walls.w = TILE_SIZE;
  walls.h = TILE_SIZE;
  walls.color = "#3b4540";
  walls.stroke = "#758071";

  for (const cell of wallSprites) {
    new walls.Sprite(tileCenterX(cell.x), tileCenterY(cell.y));
  }

  player = new Sprite(tileCenterX(2), tileCenterY(2), 24, 28);
  player.color = "#e9b65e";
  player.stroke = "#fff0bd";
  player.rotationLock = true;
  player.friction = 0;
  player.bounciness = 0;
  resetRun();
}

function createDungeonWalls() {
  wallSprites = [];
  for (let x = 0; x < GRID_COLUMNS; x++) {
    wallSprites.push({ x, y: 0 }, { x, y: GRID_ROWS - 1 });
  }
  for (let y = 1; y < GRID_ROWS - 1; y++) {
    wallSprites.push({ x: 0, y }, { x: GRID_COLUMNS - 1, y });
  }

  for (let y = 1; y < GRID_ROWS - 1; y++) {
    if (y !== 3 && y !== 8) wallSprites.push({ x: 6, y });
    if (y !== 5 && y !== 9) wallSprites.push({ x: 11, y });
  }
  for (let x = 1; x <= 5; x++) {
    if (x !== 3) wallSprites.push({ x, y: 6 });
  }
  for (let x = 12; x <= 16; x++) {
    if (x !== 14) wallSprites.push({ x, y: 6 });
  }
}

function resetRun() {
  coalPiles = [
    { x: 3, y: 3, available: true },
    { x: 4, y: 9, available: true },
    { x: 8, y: 2, available: true },
    { x: 10, y: 8, available: true },
    { x: 14, y: 4, available: true },
    { x: 8, y: 9, available: true },
    { x: 15, y: 8, available: true }
  ];
  machines = [
    { x: 4, y: 8, active: false, name: "WEST FURNACE" },
    { x: 9, y: 3, active: false, name: "CENTRAL PUMP" },
    { x: 14, y: 8, active: false, name: "EAST LIFT" }
  ];
  exitPoint = { x: 16, y: 2 };
  warmth = 100;
  carryingCoal = false;
  gameMode = "title";
  statusMessage = "";
  statusMessageUntil = 0;
  player.x = tileCenterX(2);
  player.y = tileCenterY(2);
  player.vel.x = 0;
  player.vel.y = 0;
  setDungeonVisible(false);
}

function setDungeonVisible(visible) {
  player.visible = visible;
  walls.forEach((wall) => {
    wall.visible = visible;
  });
}

function draw() {
  background("#171d1b");

  if (gameMode === "playing") {
    updateGame();
    drawDungeonFloor();
    drawCoalPiles();
    drawMachines();
    drawExit();
    drawCarriedCoal();
    drawHud();
    drawStatusMessage();
  } else {
    drawTitleOrEndScreen();
  }
}

function updateGame() {
  const deltaSeconds = Math.min(deltaTime, 100) / 1000;
  warmth = Math.max(0, warmth - WARMTH_LOSS_PER_SECOND * deltaSeconds);

  let moveX = 0;
  let moveY = 0;
  if (keyIsDown(65)) moveX -= 1;
  if (keyIsDown(68)) moveX += 1;
  if (keyIsDown(87)) moveY -= 1;
  if (keyIsDown(83)) moveY += 1;

  if (moveX !== 0 && moveY !== 0) {
    moveX *= Math.SQRT1_2;
    moveY *= Math.SQRT1_2;
  }
  player.vel.x = moveX * PLAYER_SPEED;
  player.vel.y = moveY * PLAYER_SPEED;
  player.collides(walls);

  if (warmth <= 0) {
    gameMode = "lost";
    setDungeonVisible(false);
    return;
  }

  if (machines.every((machine) => machine.active) && distanceTo(exitPoint) < INTERACTION_RANGE) {
    gameMode = "won";
    setDungeonVisible(false);
  }
}

function drawDungeonFloor() {
  noStroke();
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLUMNS; x++) {
      const shade = (x + y) % 2 === 0 ? "#252d29" : "#202824";
      fill(shade);
      rect(GRID_LEFT + x * TILE_SIZE, GRID_TOP + y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      stroke("#303a34");
      noFill();
      rect(GRID_LEFT + x * TILE_SIZE, GRID_TOP + y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      noStroke();
    }
  }
}

function drawCoalPiles() {
  for (const coal of coalPiles) {
    if (!coal.available) continue;
    const x = tileCenterX(coal.x);
    const y = tileCenterY(coal.y);
    noStroke();
    fill("#111513");
    rect(x - 10, y - 6, 20, 15);
    fill("#4d5148");
    rect(x - 9, y - 10, 8, 11);
    rect(x - 1, y - 13, 9, 14);
    rect(x + 6, y - 7, 5, 8);
    fill("#e9a94f");
    rect(x - 2, y + 3, 5, 3);
  }
}

function drawMachines() {
  for (const machine of machines) {
    const x = tileCenterX(machine.x);
    const y = tileCenterY(machine.y);
    noStroke();
    fill(machine.active ? "#536c50" : "#59615a");
    rect(x - 17, y - 17, 34, 34);
    fill("#202522");
    rect(x - 11, y - 10, 22, 20);
    fill(machine.active ? "#98d17b" : "#c16d53");
    rect(x - 5, y - 5, 10, 10);
    fill("#879083");
    rect(x - 13, y + 13, 26, 4);
  }
}

function drawExit() {
  const x = tileCenterX(exitPoint.x);
  const y = tileCenterY(exitPoint.y);
  const unlocked = machines.every((machine) => machine.active);
  noStroke();
  fill(unlocked ? "#4d815d" : "#454c47");
  rect(x - 18, y - 22, 36, 44);
  fill(unlocked ? "#a5e08f" : "#a47a4e");
  rect(x - 11, y - 16, 22, 32);
  fill("#1b211e");
  rect(x + 5, y - 1, 3, 3);
}

function drawCarriedCoal() {
  if (!carryingCoal) return;
  noStroke();
  fill("#30322d");
  rect(player.x - 5, player.y - 22, 10, 8);
  fill("#55584d");
  rect(player.x - 4, player.y - 24, 4, 4);
  rect(player.x, player.y - 22, 4, 6);
}

function drawHud() {
  noStroke();
  fill("#111715");
  rect(0, 0, CANVAS_WIDTH, 96);

  fill("#eee5c9");
  textSize(15);
  text("WARMTH", 24, 24);
  fill("#333b36");
  rect(24, 39, 260, 18);
  fill(warmth > 30 ? "#e1a650" : "#d85c49");
  rect(27, 42, 254 * warmth / 100, 12);
  fill("#eee5c9");
  text(`${Math.ceil(warmth)}%`, 294, 49);

  const activeCount = machines.filter((machine) => machine.active).length;
  text(`MACHINES ${activeCount}/${machines.length}`, 390, 26);
  text(`COAL ${carryingCoal ? "CARRIED" : "EMPTY-HANDED"}`, 390, 57);
  textAlign(RIGHT, CENTER);
  text("WASD MOVE   E INTERACT   Q BURN COAL", CANVAS_WIDTH - 24, 26);
  text("Find the exit after all machines are active", CANVAS_WIDTH - 24, 57);
  textAlign(LEFT, CENTER);
}

function drawStatusMessage() {
  if (millis() > statusMessageUntil || statusMessage === "") return;
  textAlign(CENTER, CENTER);
  textSize(16);
  fill("#101513");
  rect(CANVAS_WIDTH / 2 - 220, 100, 440, 34);
  fill("#f0d69b");
  text(statusMessage, CANVAS_WIDTH / 2, 117);
  textAlign(LEFT, CENTER);
}

function drawTitleOrEndScreen() {
  noStroke();
  fill("#111715");
  rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  textAlign(CENTER, CENTER);

  if (gameMode === "title") {
    fill("#eab963");
    textSize(38);
    text("EMBERKEEP", CANVAS_WIDTH / 2, 220);
    fill("#eee5c9");
    textSize(18);
    text("The dungeon is going cold.", CANVAS_WIDTH / 2, 278);
    text("Carry coal to the three machines, then reach the east exit.", CANVAS_WIDTH / 2, 316);
    fill("#a8b5a8");
    textSize(15);
    text("WASD move     E pick up / fuel a machine     Q burn coal for warmth", CANVAS_WIDTH / 2, 380);
    fill("#f0bf68");
    textSize(20);
    text("PRESS ENTER TO DESCEND", CANVAS_WIDTH / 2, 462);
  } else if (gameMode === "won") {
    fill("#9bd583");
    textSize(36);
    text("THE LIFT IS RUNNING", CANVAS_WIDTH / 2, 280);
    fill("#eee5c9");
    textSize(18);
    text("You escaped the frozen dungeon.", CANVAS_WIDTH / 2, 340);
    text("Press R to play again", CANVAS_WIDTH / 2, 408);
  } else {
    fill("#df7359");
    textSize(38);
    text("FROZEN", CANVAS_WIDTH / 2, 280);
    fill("#eee5c9");
    textSize(18);
    text("The last warmth has left the dungeon.", CANVAS_WIDTH / 2, 340);
    text("Press R to try again", CANVAS_WIDTH / 2, 408);
  }

  textAlign(LEFT, CENTER);
}

function keyPressed() {
  if (gameMode === "title" && (keyCode === ENTER || keyCode === RETURN || key === " ")) {
    startRun();
    return false;
  }

  if ((gameMode === "won" || gameMode === "lost") && key.toLowerCase() === "r") {
    resetRun();
    startRun();
    return false;
  }

  if (gameMode !== "playing" || millis() - lastActionAt < 160) return;

  const pressedKey = key.toLowerCase();
  if (pressedKey === "e") interact();
  if (pressedKey === "q") burnCoal();
  lastActionAt = millis();
  return false;
}

function startRun() {
  gameMode = "playing";
  setDungeonVisible(true);
  showMessage("Find coal. The machines need fuel.");
}

function interact() {
  const nearbyMachine = nearestAvailable(machines, (machine) => !machine.active);
  if (nearbyMachine && distanceTo(nearbyMachine) <= INTERACTION_RANGE) {
    if (!carryingCoal) {
      showMessage("This machine needs coal. Find a pile first.");
      return;
    }
    nearbyMachine.active = true;
    carryingCoal = false;
    showMessage(`${nearbyMachine.name} is running.`);
    if (machines.every((machine) => machine.active)) {
      showMessage("All machines are running. The east exit is open!");
    }
    return;
  }

  if (carryingCoal) {
    showMessage("You are carrying coal. Press Q to burn it for warmth.");
    return;
  }

  const nearbyCoal = nearestAvailable(coalPiles, (coal) => coal.available);
  if (nearbyCoal && distanceTo(nearbyCoal) <= INTERACTION_RANGE) {
    nearbyCoal.available = false;
    carryingCoal = true;
    showMessage("Coal picked up. Use E at a machine or Q to warm up.");
    return;
  }

  showMessage("Nothing close enough to interact with.");
}

function burnCoal() {
  if (!carryingCoal) {
    showMessage("You need to pick up coal before you can burn it.");
    return;
  }
  if (warmth >= 100) {
    showMessage("You are already warm. Save the coal for later.");
    return;
  }
  carryingCoal = false;
  warmth = Math.min(100, warmth + 38);
  showMessage("Coal burned. Warmth restored.");
}

function nearestAvailable(items, isAvailable) {
  let nearest = null;
  let shortestDistance = Infinity;
  for (const item of items) {
    if (!isAvailable(item)) continue;
    const itemDistance = distanceTo(item);
    if (itemDistance < shortestDistance) {
      nearest = item;
      shortestDistance = itemDistance;
    }
  }
  return nearest;
}

function distanceTo(item) {
  return dist(player.x, player.y, tileCenterX(item.x), tileCenterY(item.y));
}

function showMessage(message) {
  statusMessage = message;
  statusMessageUntil = millis() + 2400;
}

function tileCenterX(column) {
  return GRID_LEFT + column * TILE_SIZE + TILE_SIZE / 2;
}

function tileCenterY(row) {
  return GRID_TOP + row * TILE_SIZE + TILE_SIZE / 2;
}