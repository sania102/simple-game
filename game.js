const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let car = {
    x: 100,
    y: canvas.height / 2,
    width: 50,
    height: 90,
    speed: 5,
    color: "blue"
};

let obstacles = [];
let score = 0;
let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Draw car
function drawCar() {
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Draw obstacles
function drawObstacles() {
    ctx.fillStyle = "red";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.x -= obstacle.speed;
    });
}

// Create new obstacle
function createObstacle() {
    let obstacle = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
        speed: 3
    };
    obstacles.push(obstacle);
}

// Check for collisions
function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (
            car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.y + car.height > obstacle.y
        ) {
            alert("Game Over!");
            resetGame();
        }
    });
}

// Update score
function updateScore() {
    score++;
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

// Reset game
function resetGame() {
    car.x = 100;
    car.y = canvas.height / 2;
    obstacles = [];
    score = 0;
}

// Update game logic
function updateGame() {
    if (keys.up && car.y > 0) car.y -= car.speed;
    if (keys.down && car.y < canvas.height - car.height) car.y += car.speed;
    if (keys.left && car.x > 0) car.x -= car.speed;
    if (keys.right && car.x < canvas.width - car.width) car.x += car.speed;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    drawObstacles();
    checkCollisions();
    updateScore();

    if (Math.random() < 0.02) createObstacle(); // Randomly create obstacles
    requestAnimationFrame(updateGame);
}

// Event listeners for controls
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") keys.up = true;
    if (e.key === "ArrowDown") keys.down = true;
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") keys.up = false;
    if (e.key === "ArrowDown") keys.down = false;
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
});

// Start game
updateGame();
