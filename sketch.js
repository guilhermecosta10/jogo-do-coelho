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
var rope;
var coelho;
var bgImg, frutaImg, coelhoImg;
var botao;
var link;
var comendoImg, tristeImg, piscandoImg;

function preload()
{
  bgImg = loadImage("background.png");
  frutaImg = loadImage("melon.png");
  coelhoImg = loadImage("Rabbit-01.png");
  comendoImg = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  tristeImg = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  piscandoImg = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");

  comendoImg.playing = true;
  comendoImg.looping = false;
  tristeImg.playing = true;
  tristeImg.looping = false;
  piscandoImg.playing = true;
  piscandoImg.looping = true;

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(8,{x: 240, y: 60});

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

  link = new Link(rope, fruta);

  comendoImg.frameDelay = 20;
  tristeImg.frameDelay = 40;
  piscandoImg.frameDelay = 10;

  coelho = createSprite(100,600,10,10);
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

  image(bgImg, width/2, height/2, 500, 700);
  
  Engine.update(engine);

  if(fruta != null)
  {
    image(frutaImg, fruta.position.x, fruta.position.y, 60,60);
  }

  rope.show();

  if(colidir(fruta, coelho) == true)
  {
    coelho.changeAnimation('comendo');
  }

  if(colidir(fruta, ground.body) == true)
  {
    coelho.changeAnimation('triste');
  }
  
  drawSprites();
   
}



function cair() 
{
  link.cortar();
  rope.break();
  link = null;
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