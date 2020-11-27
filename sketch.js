var PLAY = 0;
var END = 1;
gameState = PLAY;

var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground;
var score = 0;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);

  monkey = createSprite(100, 480, 20, 20);
  monkey.addAnimation("runnig", monkey_running);
  monkey.scale = 0.2;

  ground = createSprite(300, 530, 600, 10);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  //create Obstacle and Banana Groups
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  background("lightblue");
  
  stroke("black");
  fill("black");
  textSize(20);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time : " + survivalTime,50,50);
  text("Score : " + score,450,50);

  if (gameState === PLAY) {
    if (ground.x < 300) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -12;
    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;

    spawnBananas();
    spawnObstacles();
    
    if(foodGroup.isTouching(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  else if (gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  }

  // stop monkey from falling down
  monkey.collide(ground);
  
  drawSprites();
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(100, 300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 250;

    //add each cloud to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 500, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}