//objects
var trex, trex_running, edges;
var G_cacti;
var G_nubes;
var gameOverTextObj;
var restartButton;
var piso;

//sprites
var groundImage;
var imagendenube;
var gameOverText;
var restartButtonImage;
var cactus_1;
var cactus_2;
var cactus_3;
var cactus_4;
var cactus_5;
var cactus_6;

//sounds
var checkpoint;
var die;
var jump;

//control
var frames = 0;
var state = "start";
var score = 0;


//preload

function preload(){
  
  //animations
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_idle = loadAnimation("trex1.png");
  
  //sprites
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  cactus_1 = loadImage("obstacle1.png");
  cactus_2 = loadImage("obstacle2.png");
  cactus_3 = loadImage("obstacle3.png");
  cactus_4 = loadImage("obstacle4.png");
  cactus_5 = loadImage("obstacle5.png");
  cactus_6 = loadImage("obstacle6.png");
  gameOverText = loadImage("gameOver.png");
  restartButtonImage = loadImage("restart.png");
  
  //sounds
  checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
}

//Set up/
function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //nextcactusframes = 15+Math.round(random(-3,3));
  gameOverTextObj = createSprite(windowWidth/2, windowHeight/8);
  restartButton = createSprite(windowWidth/2, windowHeight/5);
  gameOverTextObj.addImage(gameOverText);
  restartButton.addImage(restartButtonImage);
  gameOverTextObj.scale = 0.5;
  restartButton.scale = 0.4;
  restartButton.visible = false;
  gameOverTextObj.visible = false;
  G_cacti = new Group();
  G_nubes = new Group();
  //crea el Trex
  trex = createSprite(50,windowHeight/2-30,10,10);
  trex.setCollider("Rectangle", 0, 0, 100, 100);
  trex.addAnimation("idle", trex_idle);
  trex.addAnimation("running", trex_running);
  piso = createSprite(300, windowHeight/2+10);
  piso.addImage(groundImage);
  
  edges = createEdgeSprites();
  
  trex.scale = 0.5;
  trex.x = 50
}

//draw

function draw(){
  background("white");
  if (state == "playing") {
  frames++;
    trex.velocityY = trex.velocityY + 0.5;
  nubes();
  cactusGen();
  if (frames%5==0) {
  score+=1;
    if (score%100==0) {
      checkpoint.play();
    }
  }
    
    //floor logic
  if (piso.x <= 0) {
       piso.x = piso.x+piso.width/2;
      }

    //jump
  if((touches.length > 0 || keyDown("space")) && trex.y >= windowHeight/2-25){
    touches = [];
    trex.velocityY = -10;
    jump.play();
  }
  
  //reset
    
  if (G_cacti.isTouching(trex)) {
    die.play();
      piso.x = 300;
      score = 0;
      trex.y = 160;
    trex.changeAnimation("idle");
      piso.velocityX = 0;
      trex.velocityY = 0;
      G_cacti.destroyEach();
      G_nubes.destroyEach();
      frames = 0;
     state = "restart";
      }
  
  
  }
  
  //start || restart
  
  else if (state == "start" || state == "restart") {
    if (state == "restart") {
      gameOverTextObj.visible = true;
    restartButton.visible = true;
    }
    else if (state == "start") {
    text("Presiona R para iniciar, o reiniciar", windowWidth*0.375, windowHeight/4);
  }
    if (keyDown("r") || mousePressedOver(restartButton)){
      state = "playing";
      trex.changeAnimation("running");
      piso.velocityX = -10;
       gameOverTextObj.visible = false;
    restartButton.visible = false;
    }
  }
  
  //evita que el Trex caiga
  
  text("score : "+score, windowWidth*0.75, windowHeight/8);
  trex.collide(piso);
  drawSprites();
}

function nubes()
{
  if (frames%60==0)
  {
    var rnd = Math.round(random(-5, 5));
    
    var nube = createSprite(windowWidth+rnd, (windowHeight/2)+rnd*2, 75, 50);
    G_nubes.add(nube);
    nube.addImage(cloudImage);
    nube.scale = 1+random(-0.1, 0.1);
    nube.lifetime = 60;
    nube.velocityX -= 10;
    nube.depth = 0;
    
  }
}

//end

function cactusGen()
{
  if (frames%45==0)
  {
    //nextcactusframes=15+Math.round(random(-3,3));
    var cx = (windowWidth)+Math.round(random(-5, 5));
    var cscale = 0.6+random(-0.01, 0.01);
     var cactus = createSprite(cx, windowHeight/2-10, 15, 50);
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1 :
        cactus.addImage(cactus_1);
        break
      case 2 :
        cactus.addImage(cactus_2);
        break
      case 3 :
        cactus.addImage(cactus_3);
        break
      case 4 :
        cactus.addImage(cactus_4);
        break
      case 5 :
        cactus.addImage(cactus_5);
        break
      case 6 :
        cactus.addImage(cactus_6);
        break
  }
    //cactus.addImage(cactusImages[Math.round(random(1, 6))]);
    cactus.lifetime = piso.velocityX/windowWidth;
    cactus.scale = cscale;
    cactus.velocityX -= 10;
    cactus.depth = 0;
    
    G_cacti.add(cactus);
    
  }
}