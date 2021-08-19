//Linking Canvas
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//Already existed
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {}
};


//Creating Game
const game = {
  frames: 0,
  obstacles: [],
  start: () => {
    interval = setInterval(() => {
        updateCanvas();
    }, 10);
  },
  clear: () => {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  },
  stop: () => {
    clearInterval(interval)
  },
  score: () => {
    const points = Math.floor(game.frames / 5);
    context.font = "18px Arial";
    context.fillStyle = "white";
    context.fillText(`Score: ${points}`, 80, 50);
},
};

//Creating Car
class Car { 
  constructor(x, y){
    this.x = x;
    this.y = y;

    const carImg = new Image();
    carImg.src = "./images/car.png";
    carImg.onload = () => {
      this.image = carImg;
      this.draw();
    };

  }

  draw() {
    context.drawImage(this.image, this.x, this.y, 40, 90);
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + 40;
  }

  top() {
    return this.y;
  }

  crashedWith(obstacle) {
    return !( 
    this.top() > obstacle.bottom() || 
    this.right() < obstacle.left() || 
    this.left() > obstacle.right()
    );
  }
}

//Creating Player
const player = new Car(230, 566); //

//Car Movements
//event listener
document.addEventListener("keydown", (event) => {
  console.log(event);
  switch(event.key) {
       case "ArrowLeft":
        //  if(player.x === 0){
        //    return;
        //  }
          player.x -= 12;
          break;
      case "ArrowRight":
        // if(player.x === 460){
        //   return;
        // }
          player.x += 12;
          break;
  }
})

//Creating Obstacles
class Obstacle {
  constructor(x, y, width, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 30;
    this.color = color;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  bottom() {
    return this.y + this.height;
  }
}

//Drawing Obstacles
function drawObstacles() {
  game.obstacles.forEach((obstacle) => {
    obstacle.draw();
    obstacle.y += 1;
  });

  game.frames++;
  
  if(game.frames % 300 === 0){
    //Random Start
    const minX = 50;
    const maxX = 430;
    const randomStart = Math.floor(
      Math.random() * (maxX - minX +1) + minX);

    //Random Width
    const minWidth = 50;
    const maxWidth = 420;
    const randomWidth = Math.floor(
      Math.random() * (maxWidth - minWidth +1) + minWidth
    );

    const obstacleTop = new Obstacle(randomStart, 0, randomWidth, "#870007");
    game.obstacles.push(obstacleTop);
  }   
}

//Game Over

//Game def
function updateCanvas () {
  game.clear();
  player.draw();
  drawObstacles();
  checkGameOver();
  game.score();
}

function checkGameOver () {
  const crashed = game.obstacles.some((obstacle) => {
    return player.crashedWith(obstacle) === true;
  });
    if (crashed) {
      game.stop();
    }
}

//start game
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", game.start);

