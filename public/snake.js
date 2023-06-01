class Snake {
	constructor(x, y, size) {
			this.x = x;
			this.y = y;
			this.size = size;
			this.tail = [{x:this.x, y:this.y,}];
			this.rotateX = 0
			this.rotateY = 1
		}
		move() {
			var newRect;
			if(this.rotateX == 1){
				newRect = {
					x: this.tail[this.tail.length-1].x + this.size,
					y: this.tail[this.tail.length-1].y,
				}
			} else if(this.rotateX == -1){
				newRect = {
					x: this.tail[this.tail.length-1].x - this.size,
					y: this.tail[this.tail.length-1].y,
				}
			} else if(this.rotateY == 1){
				newRect = {
					x: this.tail[this.tail.length-1].x,
					y: this.tail[this.tail.length-1].y+ this.size,
				}
			} else if(this.rotateY == -1){
				newRect = {
					x: this.tail[this.tail.length-1].x ,
					y: this.tail[this.tail.length-1].y - this.size,
				}
			}
			this.tail.shift();
			this.tail.push(newRect)
		}
}

class Apple {
	constructor() {
			console.log("apple")
			console.log(snake.size)
			var isTouching;
			while(true){
				isTouching = false;
				this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size;
				this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size;
				for (var i = 0; i < snake.tail.length; i++) {
					if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                        isTouching = true;
                    }
                }
				console.log(this.x, this.y)
				this.color = "pink";
				this.size = snake.size;
				if(!isTouching){
					break;
				}
			}
		}
}





var canvas = document.getElementById('canvas')

var snake = new Snake(20, 20, 20);

var apple = new Apple();

var isGameOver = false;

var canvasContext = canvas.getContext('2d');

window.onload = () => {
	gameLoop();
}

function gameLoop() {
	setInterval(show, 1000/17)
}

function show() {
	update();
	if (isGameOver) {
		return;
	}
	draw();
}

function update() {
	if (isGameOver) {
		return;
	}
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	snake.move()
	checkGameOver();
	if (isGameOver) {
		gameOver();
    }
	eatApple();
	checkHitWall();
}

function checkGameOver() {
    var head = snake.tail[snake.tail.length - 1];
    for (var i = 0; i < snake.tail.length - 1; i++) {
        if (head.x === snake.tail[i].x && head.y === snake.tail[i].y) {
			if (!(head.x === apple.x && head.y === apple.y)) {
				isGameOver = true;
            	break; // Le jeu continue si la tête touche la pomme
			}
        }
    }
}

function gameOver() {
		snake.rotateX = 0;
		snake.rotateY = 0;

		canvasContext.clearRect(0, 0, canvas.width, canvas.height);

		canvasContext.font = "40px Arial";
		canvasContext.fillStyle = "red";
		canvasContext.textAlign = "center";
		canvasContext.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20);
		canvasContext.fillText("Score: " + (snake.tail.length - 1), canvas.width / 2, canvas.height / 2 + 20);
		canvasContext.fillText("Press `R` to retry !", canvas.width / 2, canvas.height / 2 + 60);

	}

function resetGame() {
	snake = new Snake(20, 20, 20);
	apple = new Apple();
	isGameOver = false;
}

function checkHitWall() {
	var headTail = snake.tail[snake.tail.length-1];
	if (headTail.x ==  - snake.size) {
		headTail.x = canvas.width - snake.size;
	} else if (headTail.x == canvas.width) {
		headTail.x = 0;
	} else if (headTail.y ==  - snake.size) {
		headTail.y = canvas.height - snake.size;
	} else if (headTail.y == canvas.height) {
		headTail.y = 0;
	}
}

function eatApple() {
	if (snake.tail[snake.tail.length-1].x == apple.x &&
		snake.tail[snake.tail.length-1].y == apple.y){
			snake.tail[snake.tail.length] = {x:apple.x, y:apple.y,}
			apple = new Apple();
		}
}

function draw() {
	createRect(0,0,canvas.width,canvas.height,"black")
	createRect(0,0,canvas.width,canvas.height)
	for (var i = 0; i < snake.tail.length; i++) {
		createRect(snake.tail[i].x + 2.5,snake.tail[i].y + 2.5,snake.size - 5,snake.size - 5,'white')
		}

	canvasContext.font = "20px Arial"
	canvasContext.fillStyle = "#00FF42"
	canvasContext.fillText("Score: " + (snake.tail.length - 1),canvas.width - 120, 18);
	createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
}

function createRect(x,y,width,height,color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}

window.addEventListener("keydown", (event) => {
	setTimeout(() => {
		if (event.key === "ArrowLeft" && snake.rotateX != 1) {
			snake.rotateX = -1;
			snake.rotateY = 0;
		} else if (event.key === "ArrowUp" && snake.rotateY!= 1) {
			snake.rotateX = 0;
			snake.rotateY = -1;
		} else if (event.key === "ArrowRight" && snake.rotateX!= -1) {
			snake.rotateX = 1;
            snake.rotateY = 0;
        } else if (event.key === "ArrowDown" && snake.rotateY!= -1) {
			snake.rotateX = 0;
            snake.rotateY = 1;
        }
	}, 1)
})

window.addEventListener("keydown", (event) => {
    if (event.key === "r" || event.key === "R") {
        if (isGameOver) {
            resetGame();
        }
    }
});




