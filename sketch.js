const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var tarzan, tarzanIdleImg, tarzanWalkImg, tarzanSwingImg
var platforms
var ropes = []
var rope1, rope2, rope3, rope4, rope5, rope6
var platform1, platform2, platform3, platform4, platform5, platform6, platform7, platform8, platform9
var platform1Img,platform2Img,platform3Img,platform4Img,platform5Img,platform6Img
var bgImage
var bucket1, bucket2, bucket3, bucket4, bucket5, bucket6, bucket7, bucket8, bucket9
var bucketImg
var tarzanCon1, tarzanCon2, tarzanCon3, tarzanCon4, tarzanCon5, tarzanCon6, tarzanCon7 , tarzanCon8
var life = 3
var fire, fire2, fire3
var fireImg, fireChain



function preload()
{
bgImage = loadImage("./assets/background.png")
tarzanIdleImg = loadImage("./assets/tarzanIdle.png")
tarzanWalkImg = loadImage("./assets/tarzanWalk.gif")
tarzanSwingImg = loadImage("./assets/tarzanSwing.png")
platform1Img = loadImage("./assets/platform.png")
platform2Img = loadImage("./assets/platform2.png")
platform3Img = loadImage("./assets/platform3.png")
platform4Img = loadImage("./assets/platform4.png")
platform5Img = loadImage("./assets/platform5.png")
platform6Img = loadImage("./assets/platform6.png")
bucketImg = loadImage("./assets/bucket.png")
fireChain = loadImage("./assets/fireChain.png")

}

function setup() 
{
  createCanvas(windowWidth*2,windowHeight);
  frameRate(80);
  
  engine = Engine.create();
  world = engine.world;
 var options = {
  isStatic:false
 }
  tarzan = Bodies.rectangle(windowWidth - 1700, windowHeight - 1000,160,160,options)
  World.add(world,tarzan)
  console.log("In setup"+tarzan.position.x)
  // fire = createSprite(windowWidth, windowHeight - 100, windowWidth, 300)
  // fire.addImage("fire",fireImg)
  fire = createSprite(windowWidth,windowHeight - 100, windowWidth,300)
  fire.addImage("fire",fireChain)
  fire2 = createSprite(600,windowHeight - 100, windowWidth,300)
  fire2.addImage("fire2",fireChain)
  fire3 = createSprite(windowWidth + 1400,windowHeight - 100, windowWidth,300)
  fire3.addImage("fire3",fireChain)
 


  platform1 = new Platform(windowWidth - 1800, windowHeight - 650, 300,200, "./assets/platform.png")
  platform2 = new Platform(windowWidth - 1350, windowHeight - 400, 350,200, "./assets/platform2.png") 
  platform3 = new Platform(windowWidth - 900, windowHeight - 350, 250,200, "./assets/platform3.png")
  platform4 = new Platform(windowWidth - 500, windowHeight - 550, 300,200, "./assets/platform4.png")
  platform5 = new Platform(windowWidth - 0, windowHeight - 350, 300,200, "./assets/platform5.png")
  platform6 = new Platform(windowWidth + 350, windowHeight - 450, 300,200, "./assets/platform6.png")
  platform7 = new Platform(windowWidth + 700, windowHeight - 250, 300,200, "./assets/platform.png")
  platform8 = new Platform(windowWidth + 1350, windowHeight - 450, 300,200, "./assets/platform.png")
  platform9 = new Platform(windowWidth + 1750, windowHeight - 550, 350,200, "./assets/platform.png")

  platforms = [platform1,platform2,platform3,platform4,platform5,platform6,platform7,platform8,platform9]

  bucket1 = new Bucket(windowWidth - 1800, windowHeight - 728,50,50, "./assets/bucket.png")
  bucket2 = new Bucket(windowWidth - 1350, windowHeight - 485,50,50, "./assets/bucket.png")
  bucket3 = new Bucket(windowWidth - 900, windowHeight - 440,50,50, "./assets/bucket.png")
  bucket4 = new Bucket(windowWidth - 500, windowHeight - 645,50,50, "./assets/bucket.png")
  bucket5 = new Bucket(windowWidth - 0, windowHeight - 435,50,50, "./assets/bucket.png")
  bucket6 = new Bucket(windowWidth + 350, windowHeight - 530,50,50, "./assets/bucket.png")
  bucket7 = new Bucket(windowWidth + 700, windowHeight - 329,50,50, "./assets/bucket.png")
  bucket8 = new Bucket(windowWidth + 1350, windowHeight - 525,50,50, "./assets/bucket.png")
  bucket9 = new Bucket(windowWidth + 1750, windowHeight - 625,50,50, "./assets/bucket.png")
 
  
  rope1 = new Rope(5,{x: windowWidth - 1600, y: 0})
  rope2 = new Rope(5,{x: windowWidth - 1200, y: 0})
  rope3 = new Rope(5,{x: windowWidth - 800, y: 0})
  rope4 = new Rope(5,{x: windowWidth - 370, y: 0})
  rope5 = new Rope(5,{x: windowWidth + 100, y: 0})
  rope6 = new Rope(5,{x: windowWidth + 430, y: 0})
  rope7 = new Rope(5,{x: windowWidth + 950, y: 0})
  rope8 = new Rope(5,{x: windowWidth + 1500, y: 0})

  ropes = [rope1,rope2,rope3,rope4,rope5,rope6,rope7,rope8]

}

function draw() 
{
  background(bgImage);
 
  if(keyDown("d")){
    console.log("D key pressed")
    tarzan.x += 5
    console.log(tarzan.x)
    imageMode(CENTER)
    image(tarzanWalkImg,tarzan.x,tarzan.y,50,80)
    
  }

  if(keyDown("a")){
    console.log("A key pressed")
    tarzan.x -= 5
    imageMode(CENTER)
    image(tarzanWalkImg,tarzan.x,tarzan.y,50,80)
   
  }

  if(keyDown("space")){
    tarzan.velocityY += -10
    tarzanCon1.dettach()
  }

 

  if(tarzan.y > windowHeight - 100){
    life -= 1
    tarzan.x = windowWidth - 1700
    tarzan.y = windowHeight = 600
  }


  for (var rope_index =0 ;rope_index<ropes.length;rope_index++){
    for( var rope_block_index = 0; rope_block_index < ropes[rope_index].body.bodies.length ; rope_block_index++){
      var collision = Matter.SAT.collides(tarzan, ropes[rope_index].body.bodies[rope_block_index])
      if(collision.collided){
          tarzanCon1 = new Link(rope1, tarzan.body)
          imageMode(CENTER)
          image(tarzanSwingImg,tarzan.x,tarzan.y,50,80)
        }
    }
  }



  for (var platform_index= 0 ; platform_index < platforms.length ; platform_index ++){
 var collision9 = Matter.SAT.collides(tarzan, platforms[platform_index].body)
 console.log("Platform Collision ",platform_index," status ",collision9.collided)
  if(collision9.collided){
    Matter.Body.setStatic(tarzan,true)
    break
  }
  else{
    Matter.Body.setStatic(tarzan,false)
  }
  }
 


  rope1.show()
  rope2.show()
  rope3.show()
  rope4.show()
  rope5.show()
  rope6.show()
  rope7.show()
  rope8.show()

  bucket1.show()
  bucket2.show()
  bucket3.show()
  bucket4.show()
  bucket5.show()
  bucket6.show()
  bucket7.show()
  bucket8.show()
  bucket9.show()

  platform1.show()
  platform2.show()
  platform3.show()
  platform4.show()
  platform5.show()
  platform6.show()
  platform7.show()
  platform8.show()
  platform9.show()

  imageMode (CENTER)
  console.log("tarzan.position.x "+tarzan.position.x+"y "+tarzan.position.y)
  image(tarzanIdleImg,tarzan.position.x,tarzan.position.y,50,80)
 
  Engine.update(engine);
  

  drawSprites();


}
