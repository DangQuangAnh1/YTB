import {makeScene2D,Circle,Line,Txt} from '@motion-canvas/2d';
import {all,waitFor} from '@motion-canvas/core';
export default makeScene2D(function* (view){
 view.fill('#F5F1E8');
 const ball=new Circle({size:80,fill:'#CA4149',position:[-200,0]});
 view.add(new Line({points:[[-400,100],[400,100]],stroke:'#203C47',lineWidth:8}));
 view.add(ball);
 view.add(new Txt({text:'P-2 • Motion Canvas',fontSize:42,fill:'#203C47',position:[0,-180]}));
 yield* all(ball.position.x(200,1),ball.rotation(180,1));
 yield* waitFor(.25);
});
