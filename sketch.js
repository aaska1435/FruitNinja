var PLAY=1;
var END=0;
var gameState=PLAY;

var sword, fruit, monster, fruitGroup, enemyGroup, score,r, randomFruit;
var swordImage, fruit1, fruit2, fruit3, fruit4,  monsterImage, gameOverImage;
var enemy;
var gameOverSound;
var knifeSwoosh;

function preload(){
  swordImage= loadImage("sword.png");
  monsterImage=loadAnimation("alien1.png","alien2.png")
  fruit1= loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3 =loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  gameOverImage= loadImage("gameover.png")
  
  gameOverSound=loadSound("gameover.mp3")
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3")
}

function setup() {
  createCanvas(600,600)
  
  
  
  sword= createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  sword.setCollider("rectangle",0,0,40,40);
  
  
  score=0
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  
  
}

function draw() {
  background("lightblue");
  text("score "+score,200,10)
  if(gameState==PLAY){
    fruits();
    spawnenemy();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+1
  }
    if(enemyGroup.isTouching(sword)){
      gameState=  END
      gameOverSound.play();
    }
  }
   
        else if(gameState==END){
         // gameState=END;
          
          fruitGroup.destroyEach();
          enemyGroup.destroyEach();
          fruitGroup.setVelocityXEach(0);
          enemyGroup.setVelocityXEach(0);
          
          sword.addImage(gameOverImage);
          sword.x=200;
          sword.y=200;
          
           
      }
        drawSprites();


}
function fruits(){
  
  if(World.frameCount%80==0){
    var position= Math.round(random(1,2));
    
    fruit=createSprite(400,200,20,20);
    console.log(position)
   
    
    if(position==1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
      
    }
    else
      {
        if(position==2){
          fruit.x=0;
          fruit.velocityX=(7+(score/4));
          
        }
      }
     fruit.scale=0.1;
    
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    } 
    else if (r==2){
     fruit.addImage(fruit2);
     
  }
    else if(r==3){
        fruit.addImage(fruit3);
        
      }
    else if  (r==4){
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    fruit.velocityX= 7
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }

}
function spawnenemy(){
  if(World.frameCount%80==0){
enemy=createSprite(400,200,20,20);
enemy.scale=1
    enemy.velocityX=-(8+score/10)
    enemy.y=Math.round(random(100,300));
    enemy.setLifetime=50
    
 
enemy .addAnimation("monster",monsterImage)
  enemyGroup.add(enemy); 
  
  
}

}

