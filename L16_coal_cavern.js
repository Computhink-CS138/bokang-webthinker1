const TILE_SIZE = 48;
let GRID_COLUMNS = 18;
let GRID_ROWS = 12;
const GRID_LEFT = 48;
const GRID_TOP = 112;
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 720;
const INTERACTION_RANGE = 42;
const PLAYER_SPEED = 3;
const BASE_MONSTER_SPEED = 1.7;
const MONSTER_SPEED_STEP = 0.22;
const MONSTER_REPATH_INTERVAL = 300;
const MAX_STAGES = 5;
const WARMTH_LOSS_PER_SECOND = 0.34;

let player;
let monster;
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
let monsterPath = [];
let monsterPathIndex = 0;
let monsterGoalKey = "";
let lastMonsterPathAt = 0;
let lossReason = "cold";
let stage = 1;
let monsterSpeed = BASE_MONSTER_SPEED;

function setup() {
  new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  document.getElementById("game").appendChild(document.querySelector("canvas"));
  pixelDensity(1);
  noSmooth();
  textFont("monospace");
  textAlign(LEFT, CENTER);
  world.gravity.y = 0;

  player = new Sprite(tileCenterX(2), tileCenterY(2), 24, 28);
  player.color = "#e9b65e";
  player.stroke = "#fff0bd";
  player.rotationLock = true;
  player.friction = 0;
  player.bounciness = 0;

  monster = new Sprite(tileCenterX(15), tileCenterY(9), 30, 30);
  monster.color = "#a2484d";
  monster.stroke = "#ed9b73";
  monster.rotationLock = true;
  monster.friction = 0;
  monster.bounciness = 0;
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

  let partitionIndex = 0;
  for (let x = 6; x < GRID_COLUMNS - 4; x += 5, partitionIndex++) {
    const firstOpening = 3 + (partitionIndex * 2) % (GRID_ROWS - 7);
    const secondOpening = GRID_ROWS - 3;
    for (let y = 1; y < GRID_ROWS - 1; y++) {
      if (y !== firstOpening && y !== secondOpening) wallSprites.push({ x, y });
    }
  }
  for (let x = 1; x <= 5; x++) {
    if (x !== 3) wallSprites.push({ x, y: 6 });
  }
  for (let x = 12; x <= Math.min(16, GRID_COLUMNS - 2); x++) {
    if (x !== 14) wallSprites.push({ x, y: 6 });
  }
}

function resetRun() {
  stage = 1;
  configureStage(stage);
  gameMode = "title";
}

function configureStage(nextStage) {
  if (walls) {
    walls.forEach((wall) => {
      wall.visible = false;
      wall.collider = "none";
    });
  }

  stage = nextStage;
  GRID_COLUMNS = 18 + (stage - 1) * 2;
  GRID_ROWS = 12 + (stage - 1) * 2;
  monsterSpeed = BASE_MONSTER_SPEED + (stage - 1) * MONSTER_SPEED_STEP;

  walls = new Group();
  walls.collider = "static";
  walls.w = TILE_SIZE;
  walls.h = TILE_SIZE;
  walls.color = "#3b4540";
  walls.stroke = "#758071";
  createDungeonWalls();
  for (const cell of wallSprites) {
    new walls.Sprite(tileCenterX(cell.x), tileCenterY(cell.y));
  }

  coalPiles = [
    { x: 3, y: 3, available: true },
    { x: 4, y: GRID_ROWS - 3, available: true },
    { x: 8, y: 2, available: true },
    { x: 10, y: 8, available: true },
    { x: GRID_COLUMNS - 4, y: 4, available: true },
    { x: 8, y: GRID_ROWS - 3, available: true },
    { x: GRID_COLUMNS - 3, y: GRID_ROWS - 4, available: true }
  ];
  machines = [
    { x: 4, y: 8, active: false, name: "WEST FURNACE" },
    { x: 9, y: 3, active: false, name: "CENTRAL PUMP" },
    { x: GRID_COLUMNS - 4, y: GRID_ROWS - 4, active: false, name: "EAST LIFT" }
  ];
  exitPoint = { x: GRID_COLUMNS - 2, y: 2 };
  warmth = 100;
  carryingCoal = false;
  lossReason = "cold";
  statusMessage = "";
  statusMessageUntil = 0;
  lastActionAt = 0;
  player.x = tileCenterX(2);
  player.y = tileCenterY(2);
  player.vel.x = 0;
  player.vel.y = 0;
  monster.x = tileCenterX(GRID_COLUMNS - 3);
  monster.y = tileCenterY(GRID_ROWS - 3);
  monster.vel.x = 0;
  monster.vel.y = 0;
  monsterPath = [];
  monsterPathIndex = 0;
  monsterGoalKey = "";
  lastMonsterPathAt = 0;
  setDungeonVisible(false);
}

function startNextStage() {
  configureStage(stage + 1);
  gameMode = "playing";
  setDungeonVisible(true);
  showMessage(`Stage ${stage}: the keeper is faster.`);
}

function setDungeonVisible(visible) {
  player.visible = visible;
  monster.visible = visible;
  walls.forEach((wall) => {
    wall.visible = visible;
  });
}

function draw() {
  background("#171d1b");

  if (gameMode === "playing") {
    updateGame();
    updateCamera();
    camera.on();
    drawDungeonFloor();
    drawCoalPiles();
    drawMachines();
    drawExit();
    drawCarriedCoal();
    drawMonsterFace();
    camera.off();
    drawHud();
    drawStatusMessage();
    camera.on();
  } else {
    camera.off();
    drawTitleOrEndScreen();
    camera.on();
  }
}

function updateCamera() {
  const mapWidth = GRID_COLUMNS * TILE_SIZE;
  const mapHeight = GRID_ROWS * TILE_SIZE;
  const minCameraX = GRID_LEFT + CANVAS_WIDTH / 2;
  const maxCameraX = GRID_LEFT + mapWidth - CANVAS_WIDTH / 2;
  const minCameraY = GRID_TOP + CANVAS_HEIGHT / 2;
  const maxCameraY = GRID_TOP + mapHeight - CANVAS_HEIGHT / 2;
  const targetX = minCameraX > maxCameraX
    ? GRID_LEFT + mapWidth / 2
    : constrain(player.x, minCameraX, maxCameraX);
  const targetY = minCameraY > maxCameraY
    ? GRID_TOP + mapHeight / 2
    : constrain(player.y, minCameraY, maxCameraY);

  camera.x = lerp(camera.x, targetX, 0.12);
  camera.y = lerp(camera.y, targetY, 0.12);
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
  updateMonster();

  const touchingMonster =
    Math.abs(player.x - monster.x) <= (player.w + monster.w) / 2 &&
    Math.abs(player.y - monster.y) <= (player.h + monster.h) / 2;
  if (touchingMonster) {
    lossReason = "monster";
    gameMode = "lost";
    setDungeonVisible(false);
    return;
  }

  if (warmth <= 0) {
    lossReason = "cold";
    gameMode = "lost";
    setDungeonVisible(false);
    return;
  }

  if (machines.every((machine) => machine.active) && distanceTo(exitPoint) < INTERACTION_RANGE) {
    gameMode = stage === MAX_STAGES ? "won" : "stageComplete";
    setDungeonVisible(false);
  }
}

function updateMonster() {
  const playerCell = worldToCell(player.x, player.y);
  const goalKey = `${playerCell.x},${playerCell.y}`;
  const currentTime = millis();

  if (
    currentTime - lastMonsterPathAt >= MONSTER_REPATH_INTERVAL ||
    goalKey !== monsterGoalKey ||
    monsterPath.length === 0
  ) {
    const monsterCell = worldToCell(monster.x, monster.y);
    monsterPath = findDungeonPath(monsterCell, playerCell);
    monsterPathIndex = monsterPath.length > 1 ? 1 : 0;
    monsterGoalKey = goalKey;
    lastMonsterPathAt = currentTime;
  }

  while (monsterPathIndex < monsterPath.length) {
    const nextCell = monsterPath[monsterPathIndex];
    const targetX = tileCenterX(nextCell.x);
    const targetY = tileCenterY(nextCell.y);
    if (dist(monster.x, monster.y, targetX, targetY) > 7) break;
    monsterPathIndex++;
  }

  if (monsterPathIndex >= monsterPath.length) {
    monster.vel.x = 0;
    monster.vel.y = 0;
    return;
  }

  const nextCell = monsterPath[monsterPathIndex];
  const deltaX = tileCenterX(nextCell.x) - monster.x;
  const deltaY = tileCenterY(nextCell.y) - monster.y;
  const distance = Math.hypot(deltaX, deltaY);
  monster.vel.x = distance === 0 ? 0 : deltaX / distance * monsterSpeed;
  monster.vel.y = distance === 0 ? 0 : deltaY / distance * monsterSpeed;
  monster.collides(walls);
}

function findDungeonPath(start, goal) {
  const blockedCells = new Set(wallSprites.map((cell) => `${cell.x},${cell.y}`));
  const startKey = `${start.x},${start.y}`;
  const goalKey = `${goal.x},${goal.y}`;
  const previous = new Map([[startKey, null]]);
  const queue = [start];

  for (let index = 0; index < queue.length; index++) {
    const cell = queue[index];
    const cellKey = `${cell.x},${cell.y}`;
    if (cellKey === goalKey) break;

    for (const [stepX, stepY] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nextCell = { x: cell.x + stepX, y: cell.y + stepY };
      const nextKey = `${nextCell.x},${nextCell.y}`;
      if (
        nextCell.x < 0 || nextCell.x >= GRID_COLUMNS ||
        nextCell.y < 0 || nextCell.y >= GRID_ROWS ||
        blockedCells.has(nextKey) || previous.has(nextKey)
      ) continue;
      previous.set(nextKey, cellKey);
      queue.push(nextCell);
    }
  }

  if (!previous.has(goalKey)) return [];

  const path = [];
  let currentKey = goalKey;
  while (currentKey !== null) {
    const [x, y] = currentKey.split(",").map(Number);
    path.push({ x, y });
    currentKey = previous.get(currentKey);
  }
  return path.reverse();
}

function worldToCell(x, y) {
  return {
    x: constrain(Math.round((x - GRID_LEFT - TILE_SIZE / 2) / TILE_SIZE), 0, GRID_COLUMNS - 1),
    y: constrain(Math.round((y - GRID_TOP - TILE_SIZE / 2) / TILE_SIZE), 0, GRID_ROWS - 1)
  };
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

function drawMonsterFace() {
  noStroke();
  fill("#fff0cf");
  rect(monster.x - 8, monster.y - 5, 5, 6);
  rect(monster.x + 3, monster.y - 5, 5, 6);
  fill("#261a1b");
  rect(monster.x - 6, monster.y - 3, 2, 3);
  rect(monster.x + 5, monster.y - 3, 2, 3);
  fill("#5e282d");
  rect(monster.x - 5, monster.y + 6, 10, 4);
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
  text(`STAGE ${stage}/${MAX_STAGES}  MACHINES ${activeCount}/${machines.length}`, 390, 26);
  text(`COAL ${carryingCoal ? "CARRIED" : "EMPTY-HANDED"}`, 390, 57);
  textAlign(RIGHT, CENTER);
  text("WASD MOVE   E INTERACT   Q BURN COAL", CANVAS_WIDTH - 24, 26);
  text(`KEEPER SPEED ${monsterSpeed.toFixed(1)}`, CANVAS_WIDTH - 24, 57);
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
    text("Clear five dungeons to escape the cold.", CANVAS_WIDTH / 2, 278);
    text("Each stage is larger, and the keeper gets faster.", CANVAS_WIDTH / 2, 316);
    text("Carry coal to the three machines, then reach the east exit.", CANVAS_WIDTH / 2, 350);
    text("Avoid the keeper. It will chase you.", CANVAS_WIDTH / 2, 378);
    fill("#a8b5a8");
    textSize(15);
    text("WASD move     E pick up / fuel a machine     Q burn coal for warmth", CANVAS_WIDTH / 2, 414);
    fill("#f0bf68");
    textSize(20);
    text("PRESS ENTER TO DESCEND", CANVAS_WIDTH / 2, 478);
  } else if (gameMode === "stageComplete") {
    fill("#9bd583");
    textSize(36);
    text(`STAGE ${stage} CLEARED`, CANVAS_WIDTH / 2, 280);
    fill("#eee5c9");
    textSize(18);
    text(`Stage ${stage + 1} has a larger map and a faster keeper.`, CANVAS_WIDTH / 2, 340);
    fill("#f0bf68");
    text("PRESS ENTER TO CONTINUE", CANVAS_WIDTH / 2, 408);
  } else if (gameMode === "won") {
    fill("#9bd583");
    textSize(36);
    text("THE LIFT IS RUNNING", CANVAS_WIDTH / 2, 280);
    fill("#eee5c9");
    textSize(18);
    text("You escaped all five frozen dungeons.", CANVAS_WIDTH / 2, 340);
    text("Press R to play again", CANVAS_WIDTH / 2, 408);
  } else if (lossReason === "monster") {
    fill("#df7359");
    textSize(36);
    text("THE KEEPER CAUGHT YOU", CANVAS_WIDTH / 2, 280);
    fill("#eee5c9");
    textSize(18);
    text("Keep moving and use the dungeon passages to escape.", CANVAS_WIDTH / 2, 340);
    text("Press R to try again", CANVAS_WIDTH / 2, 408);
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

  if (gameMode === "stageComplete" && (keyCode === ENTER || keyCode === RETURN || key === " ")) {
    startNextStage();
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