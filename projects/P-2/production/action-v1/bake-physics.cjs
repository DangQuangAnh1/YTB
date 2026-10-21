const fs=require('fs'),path=require('path'),M=require('../action-toolkit/node_modules/matter-js');
const engine=M.Engine.create({gravity:{x:0,y:1,scale:.001}});engine.enableSleeping=false;
const floor=M.Bodies.rectangle(270,760,1100,24,{isStatic:true,friction:.2,restitution:.2});
const cone=M.Bodies.trapezoid(405,726,28,43,.7,{friction:.13,restitution:.38,density:.002});M.Composite.add(engine.world,[floor,cone]);
const track=[];for(let f=0;f<720;f++){if(f===209){M.Body.setVelocity(cone,{x:2.2,y:-5.8});M.Body.setAngularVelocity(cone,.17);}M.Engine.update(engine,1000/60);M.Engine.update(engine,1000/60);track.push({x:cone.position.x,y:cone.position.y,angle:cone.angle});}
fs.writeFileSync(path.join(__dirname,'cone-track.json'),JSON.stringify({engine:'matter-js',version:M.version,stepMs:1000/60,seed:'no random',impulseFrame:209,frames:track},null,2));console.log('Baked720 Matter physics frames');

