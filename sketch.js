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

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(8,{x: 200, y: 170});

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  fruta = Bodies.circle(200,200,10);
  Composite.add(rope.body,fruta);

}

function draw() 
{
  background(51);
  ground.show();
  
  Engine.update(engine);

  ellipse(fruta.position.x, fruta.position.y, 10);

  rope.show();

  

 
   
}
