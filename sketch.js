const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruta;
var rope, rope2;
var coelho;
var bgImg, frutaImg, coelhoImg;
var botao, botao2;
var link,link2;
var comendoImg, tristeImg, piscandoImg;
var backSound, cutSound, sadSound, eatSound, airSound;
var mute, muteImg;
var botaoBalao;
var canW, canH;

function preload()
{
  bgImg = loadImage("background.png");
  frutaImg = loadImage("melon.png");
  coelhoImg = loadImage("Rabbit-01.png");
  comendoImg = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  tristeImg = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  piscandoImg = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  muteImg = loadImage("mute.png");
  backSound = loadSound("sound1.mp3");
  cutSound = loadSound("rope_cut.mp3");
  sadSound = loadSound("sad.wav");
  eatSound = loadSound("eating_sound.mp3");
  airSound = loadSound("air.wav");

  comendoImg.playing = true;
  comendoImg.looping = false;
  tristeImg.playing = true;
  tristeImg.looping = false;
  piscandoImg.playing = true;
  piscandoImg.looping = true;

}

function setup() 
{

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth-50;
    canH = displayHeight-50;
    createCanvas(canW,canH);
  }
  else{
    canW = windowWidth-50;
    canH = windowHeight-50;
    createCanvas(canW,canH);
  }
  
  frameRate(80);

  backSound.play();
  backSound.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH-60,600,20);
  rope = new Rope(4,{x: 240, y: 50});
  rope2 = new Rope(5,{x: 140, y: 30});

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)

  fruta = Bodies.circle(200,200,10);
  Composite.add(rope.body,fruta);

  botao = createImg('cut_btn.png');
  botao.position(220,30);
  botao.size(50,50);
  botao.mouseClicked(cair);

  botao2 = createImg('cut_btn.png');
  botao2.position(120,15);
  botao2.size(50,50);
  botao2.mouseClicked(cair2);

  mute = createImg('mute.png');
  mute.position(70,80);
  mute.size(25,25);
  mute.mouseClicked(fmute);

  botaoBalao = createImg('balloon.png');
  botaoBalao.position(50,260);
  botaoBalao.size(70,70);
  botaoBalao.mouseClicked(soprar);

  link = new Link(rope, fruta);
  link2 = new Link(rope2, fruta);

  comendoImg.frameDelay = 20;
  tristeImg.frameDelay = 40;
  piscandoImg.frameDelay = 10;

  coelho = createSprite(170,canH-80,10,10);
  coelho.addAnimation('comendo', comendoImg);
  coelho.scale = 0.2
  coelho.addAnimation('triste', tristeImg);
  coelho.addAnimation('piscando', piscandoImg);
  coelho.changeAnimation('piscando');


}

function draw() 
{
  background(51);
  ground.show();

  image(bgImg, canW/2, canH/2, canW, canH);
  
  Engine.update(engine);

  if(fruta != null)
  {
    image(frutaImg, fruta.position.x, fruta.position.y, 60,60);
  }

  rope.show();
  rope2.show();

  if(colidir(fruta, coelho) == true)
  {
    coelho.changeAnimation('comendo');
    backSound.stop();
    eatSound.play();
    
  }

  if(fruta != null && fruta.position.y >= 650)
  {
    coelho.changeAnimation('triste');
    backSound.stop();
    sadSound.play();
    fruta = null;
  }
  
  drawSprites();
   
}


function cair() 
{
  link.cortar();
  rope.break();
  link = null;

  cutSound.play();
  cutSound.setVolume(0.5);
}

function cair2() 
{
  link2.cortar();
  rope2.break();
  link2 = null;

  cutSound.play();
  cutSound.setVolume(0.5);
}



function colidir(melancia, coelho)
{
  if(melancia != null)
  {
    var d = dist(melancia.position.x, melancia.position.y, coelho.position.x, coelho.position.y);
    if(d <= 80) 
    {
      World.remove(engine.world, fruta);
      fruta = null;
      return true;
    }

    else
    {
      return false;
    }
  }
}



function fmute() 
{
  if(backSound.isPlaying())
  {
    backSound.stop();
  }

  else
    backSound.play();
  
}



function soprar() 
{
  Matter.Body.applyForce(fruta,{x: 0, y: 0},{x: 0.02, y: 0});
  airSound.play();
}


