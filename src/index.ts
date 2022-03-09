import { Actor, CollisionType, Color, DisplayMode, Engine, Input, Physics, vec, Vector } from "../../Excalibur/build/esm/excalibur.js";

const game = new Engine({
    width: 1280,
    height: 720,
    canvasElementId: "game",
    displayMode: DisplayMode.FitScreen,
    backgroundColor: Color.Blue,
  });
  

const paddle = new Actor({ 
  x: 1280/2,
  y: 720  - 10,
  width: 1280,
  height: 20,
  color: Color.Green,
});

const paddle2 = new Actor({
  x: 1280/2,
  y:  10,
  width: 1280,
  height: 20,
  color: Color.White,
});
const paddle3 = new Actor({
  x: 1280 - 10,
  y: 720/2,
  width: 20,
  height: 720,
  color: Color.White,
});   
const paddle4 = new Actor({
  x: 10,
  y: 720/2,
  width: 20,
  height: 720,
  color: Color.White,
});
const center = new Actor({
  x: 1280/2,
  y: 720/2,
  width: 0,
  height: 0,
  color: Color.Green,
});

const player = new Actor({
  x: 1280/2,
  y: 720/2,
  width: 50,
  height: 50,
  color: Color.White
});
const speed = 500;
player.update = (engine, delta)=>{
  if ( engine.input.keyboard.isHeld(Input.Keys.D) ) {
    player.vel = vec(speed, player.vel.y)
  } else if ( engine.input.keyboard.isHeld(Input.Keys.A) ) {
    player.vel = vec(-speed, player.vel.y)
  } else {
    player.vel = vec(0, player.vel.y)
  }
  if(engine.input.keyboard.isHeld(Input.Keys.W) && player.vel.y < 2 && player.vel.y > -2) {
    player.vel = vec(player.vel.x, -500)
  }
  position();
}


const leftHover = new Actor({
  width: 50,
  height: 50,
  color: new Color(255, 0, 0, 50),
  z: 100
});
const rightHover = new Actor({
    width: 50,
    height: 50,
    z: 100,
    color: new Color(255, 0, 0, 50)
});
const bottomHover = new Actor({
    width: 50,
    height: 50,
    z: 100,
    color: new Color(255, 0, 0, 50)
});
const topHover = new Actor({
    width: 50,
    height: 50,
    z: 100,
    color: new Color(255, 0, 0, 50)
});

function deviceToScreen(pos: any): any{
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  return vec(pos.x * vw / game.drawWidth, pos.y * vh / game.drawHeight)
}
function deviceToScreen2(posX: number, posY: number): any{
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  return vec(posX * game.drawWidth / vw, posY * game.drawHeight / vh)
}

function position() {
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

  leftHover.pos = game.screenToWorldCoordinates(deviceToScreen2(Number(getComputedStyle(document.documentElement).getPropertyValue("--sal").replace("px", "")), vh/2));
  leftHover.pos.x += 25;
  rightHover.pos = game.screenToWorldCoordinates(deviceToScreen2(vw - Number(getComputedStyle(document.documentElement).getPropertyValue("--sar").replace("px", "")), vh / 2));
  rightHover.pos.x -= 25;
  topHover.pos = game.screenToWorldCoordinates(deviceToScreen2(vw / 2, Number(getComputedStyle(document.documentElement).getPropertyValue("--sat").replace("px", ""))));
  topHover.pos.y += 25;
  bottomHover.pos = game.screenToWorldCoordinates(deviceToScreen2(vw / 2,vh - Number(getComputedStyle(document.documentElement).getPropertyValue("--sat").replace("px", ""))));
  bottomHover.pos.y -= 25;
}
var vecFunc = vec;
vecFunc(0,0);
position();
Physics.acc = vec(0, 500);
Physics.checkForFastBodies = true
paddle.body.collisionType = CollisionType.Fixed;
paddle2.body.collisionType = CollisionType.Fixed;
paddle3.body.collisionType = CollisionType.Fixed;
paddle4.body.collisionType = CollisionType.Fixed;
player.body.collisionType = CollisionType.Active;
game.add(paddle); 
game.add(paddle2);
game.add(leftHover);
game.add(rightHover);
game.add(topHover);
game.add(bottomHover);
game.add(paddle3);
game.add(paddle4); 
game.add(center);  
game.add(player);   
game.start().then(()=>{
})

game.currentScene.camera.move(vec(1280/2, 720/2), 0);

document.onload = ()=>{position()}
console.log(game.screen.resolution);
console.log(game.screen.viewport);
 
