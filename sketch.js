
  var gamestate = "serve";
  var water, waterImage;
  var coin, coinImage, coinGroup;
  var climber, climberImage, climberGroup;
  var frog, frogImage;
var sound;
  var score = 0;

  function preload() {

    waterImage = loadImage("water.jpg");
    coinImage = loadImage("coin.png");
    climberImage = loadImage("seaweed.png");
  frogImage = loadImage ("frog.png");
  sound= loadSound("sound.mp3")
  }


  function setup() {
    
  
    createCanvas (600,600);
    
  coinGroup = createGroup();
    climberGroup = createGroup();
    
    water = createSprite(300, 300, 10, 10);
    water.addImage(waterImage);
    water.velocityY = 1;
    water.scale= 1.4;
    
  frog = createSprite (200, 200, 50, 50);
    frog.scale = 0.1;
    frog.addImage("frog",frogImage);
    
  score = 0;
   
  }

  function draw() {
    background("WHITE");
  

    stroke("black");
    fill("black");
      textSize(20);
  text("SCORE : " + score, 180, 30);
    
  
    if(gamestate === "serve") {
    
    stroke("black");
      fill("black");
        textSize(20);
    
    text("click on 's' to start the game", 160, 250);
    fill("GREEN");
      text("TIP: Press space, right, left to jump and move the frog", 60,280);
      
      if(keyDown("s")) {
        gamestate = "play";
        sound.play();
      }
    }

  if(gamestate === "play") {
   
    if(water.y > 400 ) {
      water.y = 300;
    }
    
    
    if(keyDown("left_arrow")) {
      frog.x = frog.x -3;
    }
    if(keyDown("right_arrow")) {
    frog.x = frog.x +3; 
    }
    if(keyDown("space")) {
      frog.velocityY  = -7;
    
    }
    frog.velocityY = frog.velocityY +0.5;
    
    if(frog.isTouching(coinGroup)){
      coinGroup.destroyEach();
      //climberGroup.destroyEach();
      score = score + 1;
      }
    
    if(climberGroup.isTouching (frog)) {
      frog.velocityY = 0;
    }
    
    
    if( frog.y > 570 || frog.y < 50 || frog.x > 580 || frog.x < 30) {
    frog.destroy();
      gamestate = "end";
      sound.stop();
    }
    
    coins();

    drawSprites();
   
    stroke("black");
    fill("black");
      textSize(20);
  text("SCORE : " + score, 180, 30);
  }

    if(gamestate === "end") {
      stroke("yellow");
      fill("yellow");
      textSize(60);
      text("GAMEOVER", 150, 250);
      
    }
  }


  function coins() {

    if(frameCount % 240 === 0 ) {
      coin = createSprite(200, 10, 10, 10);
      coin.x = random(100,500);
      coin.velocityY = 1;
      coin.addImage(coinImage);
      coin.lifetime = 800;
      coin.scale= 0.1
      
    
      climber = createSprite (200, 70, 10, 10);
    climber.addImage(climberImage);
      climber.x = coin.x;
      climber.velocityY = 1;
      climber.lifetime = 800;
      climber.scale= 0.3
      
     //frog.depth = coin.depth;
     // frog.depth = frog.depth +1;
    
      coinGroup.add(coin);
      climberGroup.add(climber);
      
    }
  }
