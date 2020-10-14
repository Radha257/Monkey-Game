var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var ground
var banana, bananaImage, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var survivalTime = 0;
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png",
    "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}


function setup() {
  createCanvas(600, 300);

  monkey = createSprite(80, 235, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(300, 284, 600, 10);

  bananaG = new Group();
  obstacleG = new Group();

}

function draw() {
  background("#ADD8E6");

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  stroke ("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 100,50);
  

    if (keyDown("space") && monkey.y >= 232) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.5
    monkey.collide(ground);

    if (monkey.isTouching(bananaG)) {

      score = score + 1;
      bananaG.destroyEach();
    
  }

  obstacles();
  bananas();
  drawSprites();
}

function obstacles() {
  if (frameCount % 300 === 0) {

    var obstacle = createSprite(500, 265, 10, 40)
    obstacle.addImage("obstacles", obstacleImage);
    obstacle.scale = 0.12
    obstacle.velocityX = -5;
    obstacle.lifeTime = 120;
    obstacleG.add (obstacle);
  }
}

function bananas() {

  if (frameCount % 120 === 0) {
    banana = createSprite(600, 200, 20, 20);
    banana.addImage("bananas", bananaImage);
    banana.scale = 0.12;
    banana.velocityX = -5;
    banana.y = Math.round(random(80, 150));
    banana.lifeTime = 120;

    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaG.add (banana);
  }
}