const config = {
    "row": 20,
    "col": 20,
    "blocks": [
        {
            "x": 5,
            "y": 4
        },
        {
            "x": 6,
            "y": 4
        },
        {
            "x": 7,
            "y": 4
        },
        {
            "x": 8,
            "y": 4
        },
        {
            "x": 9,
            "y": 4
        },
        {
            "x": 10,
            "y": 4
        },
        {
            "x": 12,
            "y": 3
        },
        {
            "x": 13,
            "y": 3
        },
        {
            "x": 14,
            "y": 3
        },
        {
            "x": 15,
            "y": 3
        },
        {
            "x": 2,
            "y": 17
        },
        {
            "x": 3,
            "y": 17
        },
        {
            "x": 4,
            "y": 17
        },
        {
            "x": 5,
            "y": 17
        },
        {
            "x": 6,
            "y": 17
        },
        {
            "x": 7,
            "y": 17
        },
        {
            "x": 8,
            "y": 17
        },
        {
            "x": 8,
            "y": 14
        },
        {
            "x": 9,
            "y": 14
        },
        {
            "x": 10,
            "y": 14
        },
        {
            "x": 11,
            "y": 14
        },
        {
            "x": 12,
            "y": 14
        },
        {
            "x": 11,
            "y": 10
        },
        {
            "x": 12,
            "y": 10
        },
        {
            "x": 13,
            "y": 10
        },
        {
            "x": 14,
            "y": 10
        },

        {
            "x": 11,
            "y": 7
        },
        {
            "x": 12,
            "y": 7
        },
        {
            "x": 13,
            "y": 7
        },
        {
            "x": 14,
            "y": 7
        },
        {
            "x": 15,
            "y": 7
        }
    ],
    "snake": [
        {
            "x": 5,
            "y": 3
        },
        {
            "x": 6,
            "y": 3
        },
        {
            "x": 7,
            "y": 3
        }
    ],
    "apples": [
        {
            "x": 12,
            "y": 6
        },
        {
            "x": 12,
            "y": 9
        }
    ],
    "poisons": [
        {
            "x": 3,
            "y": 9
        },
        {
            "x": 13,
            "y": 8
        }
    ],
    "portals": [
        {
            "x": 0,
            "y": 4
        }
    ]
}

const gameView = document.getElementById("game");

const row = config.row;
const col = config.col;

var fall = false;
var alive = true;
var win = false;
var movedBlocked = false;

var game = emptyGame(row, col);
var blocks = config.blocks.map((b) => (b.x + ":" + b.y));
var snake = config.snake.map((b) => (b.x + ":" + b.y));
var apples = config.apples.map((b) => (b.x + ":" + b.y));
var poisons = config.poisons.map((b) => (b.x + ":" + b.y));
var portals = config.portals.map((b) => (b.x + ":" + b.y));
var lastSnake = []
renderGame();

function renderGame() {


    gameView.innerHTML = "";
    game = emptyGame(row, col);
    renderBlocks(blocks)


    while (true) {
        let x = gravity()
        if (!x) {
            break;
        }
    }

    if (fall) {
        snake = lastSnake
    }
    renderSnake();


    renderApples();
    renderPoisons();
    renderPortals()

    if (!alive) {
        if (fall) {
            gameView.innerHTML += "You fell down";

        } else {

            gameView.innerHTML += "You are dead";
        }
    } else {
        if (win) {
            gameView.innerHTML += "You won";

        } else {
            gameView.innerHTML += "You are still alive";
        }
    }

    for (let y = 0; y < game.length; y++) {
        const cellRow = document.createElement("div");
        cellRow.className = "cellRow";
        cellRow.id = "row-" + y;

        for (let x = 0; x < game[y].length; x++) {
            const cell = document.createElement("div");
            cell.id = "cell-" + x + "-" + y;
            cell.className = "cell";
            if (game[y][x] === "A") {
                cell.className += " apple";
            }
            if (game[y][x] === "B") {
                cell.className += " block";
            }
            if (game[y][x] === "S") {
                cell.className += " snake";
            }
            if (game[y][x] === "SS") {
                cell.innerText = ":)";
                cell.className += " snakeHead";
            }
            if (game[y][x] === "P") {
                cell.className += " poison";
            }
            if (game[y][x] === "E") {
                cell.className += " portal";
            }
            cellRow.appendChild(cell);
        }

        gameView.appendChild(cellRow);
    }
}

function emptyGame(x, y) {
    const game = []
    for (let col = 0; col < y; col++) {
        game[col] = [];
        for (let row = 0; row < x; row++) {
            game[col][row] = "";
        }
    }
    return game
}

function renderBlocks() {
    for (let b = 0; b < blocks.length; b++) {
        const x = blocks[b].split(":")[0];
        const y = blocks[b].split(":")[1];

        game[y][x] = "B";
    }

}

function renderPoisons() {
    for (let b = 0; b < poisons.length; b++) {
        const x = poisons[b].split(":")[0];
        const y = poisons[b].split(":")[1];

        game[y][x] = "P";
    }

}

function renderSnake() {
    for (let b = 0; b < snake.length; b++) {
        let x = snake[b].split(":")[0];
        let y = snake[b].split(":")[1];

        if (y > row) {
            y = row - 1
        }

        if (b === snake.length - 1) {
            game[y][x] = "SS";
        } else {
            game[y][x] = "S";
        }
    }


}

function renderApples() {
    for (let b = 0; b < apples.length; b++) {
        const x = apples[b].split(":")[0];
        const y = apples[b].split(":")[1];

        game[y][x] = "A";

    }

}

function renderPortals() {
    for (let b = 0; b < portals.length; b++) {
        const x = portals[b].split(":")[0];
        const y = portals[b].split(":")[1];

        game[y][x] = "E";

    }

}

function move(direction) {
    if (!alive) {
        return
    }
    movedBlocked = false;
    let xm = 0;
    let ym = 0;
    switch (direction) {
        case "left":
            xm = -1;
            break;
        case "right":
            xm = 1;
            break;
        case "up":
            ym = -1;
            break;
        case "down":
            ym = 1;
            break;
    }
    let x = snake[snake.length - 1].split(":")[0];
    let y = snake[snake.length - 1].split(":")[1];
    x = parseInt(x) + xm
    y = parseInt(y) + ym
    // check poison
    if (poisons.includes(x + ":" + y)) {
        alive = false;
        return snake
    }
    // check limits
    // board limits
    if (x >= row || x < 0) {
        movedBlocked = true;
        return snake
    }
    if (y >= col || y < 0) {
        movedBlocked = true;
        return snake
    }
    // object limits
    if (snake.includes(x + ":" + y)) {
        movedBlocked = true;
        return snake
    }
    if (blocks.includes(x + ":" + y)) {
        movedBlocked = true;
        return snake
    }
    if (portals.includes(x + ":" + y)) {
        win = true;
        return snake
    }
    // apples
    if (apples.includes(x + ":" + y)) {
        apples.splice(apples.indexOf(x + ":" + y), 1);
    } else {
        snake.shift()
    }

    snake[snake.length] = x + ":" + y;
    lastSnake = [...snake];

}


function gravity() {
    if (!alive) {
        return
    }
    for (let s = 0; s < snake.length; s++) {
        const x = parseInt(snake[s].split(":")[0]);
        const y = parseInt(snake[s].split(":")[1]);
        if (blocks.includes(x + ":" + (y + 1)) || apples.includes(x + ":" + (y + 1)) || portals.includes(x + ":" + (y + 1))) {
            return false;
        }


    }

    // drop level
    let flag = false;
    for (let s = 0; s < snake.length; s++) {
        const x = parseInt(snake[s].split(":")[0]);
        const y = parseInt(snake[s].split(":")[1]);
        if (poisons.includes(x + ":" + (y + 1))) {
            flag = true;
        }


        snake[s] = x + ":" + (y + 1);
    }

    let maxY = 0;
    for (let s = 0; s < snake.length; s++) {
        const x = parseInt(snake[s].split(":")[0]);
        const y = parseInt(snake[s].split(":")[1]);
        if (maxY < y) {
            maxY = y;
        }
    }
    if (maxY > row + 20) {
        fall = true;
        alive = false;
        return false
    }

    if (flag) {
        alive = false
    }
    return true


}

const steps = new Map();
let calls = 0;

const dirs = ["right", "left", "down", "up"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


async function solver() {
    calls = 0;
    return await DFS(0, 50000, 10);

}

async function DFS(depth = 100, maxCalls = 50000, maxDepth = 200) {
    if (win) return true;
    if (calls++ >= maxCalls) return false;
    if (depth >= maxDepth) return false;

    const base = snapshot();

    for (let dirNo = 0; dirNo < dirs.length; dirNo++) {
        restore(base);

        step(dirs[dirNo]);
        await sleep(20);

        if (!(alive && !movedBlocked)) {
            continue;
        }

        if (win) return true;


        if (await DFS(depth + 1, maxCalls, maxDepth)) {
            return true;
        }
    }

    restore(base);
    return false;
}


function snapshot() {
    return {
        fall: JSON.stringify(fall),
        alive: JSON.stringify(alive),
        win: JSON.stringify(win),
        movedBlocked: JSON.stringify(movedBlocked),
        game: JSON.stringify(game),
        blocks: JSON.stringify(blocks),
        snake: JSON.stringify(snake),
        apples: JSON.stringify(apples),
        poisons: JSON.stringify(poisons),
        portals: JSON.stringify(portals),
        lastSnake: JSON.stringify(lastSnake),
    };
}


function restore(steps) {
    fall = JSON.parse(steps["fall"])
    alive = JSON.parse(steps["alive"])
    win = JSON.parse(steps["win"])
    movedBlocked = JSON.parse(steps["movedBlocked"])
    game = JSON.parse(steps["game"])
    blocks = JSON.parse(steps["blocks"])
    snake = JSON.parse(steps["snake"])
    apples = JSON.parse(steps["apples"])
    poisons = JSON.parse(steps["poisons"])
    portals = JSON.parse(steps["portals"])
    lastSnake = JSON.parse(steps["lastSnake"])
}

function step(dir) {
    move(dir);
    renderGame();

}


document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 37:
            step("left");
            break;
        case 38:
            step("up");
            break;
        case 39:
            step("right");
            break;
        case 40:
            step("down");
            break;
        case 66:
            solver();
            break;
        default:
            console.log(e.keyCode);
    }


});

function copy(arr) {
    return [...arr];
}


function eq(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
}

