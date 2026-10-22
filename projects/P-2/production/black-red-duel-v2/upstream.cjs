// Reused from stick-motion SHA6315c09c4e5051267806988defa28279b965fe29; MIT; see THIRD_PARTY_LICENSE.txt.
const D2R=Math.PI/180,R2D=180/Math.PI,GROUND_Y=610;
function downVec(angleDeg, len, facing){
  const a = angleDeg*D2R;
  return { dx: facing*len*Math.sin(a), dy: len*Math.cos(a) };
}
function upVec(angleDeg, len, facing){
  const a = angleDeg*D2R;
  return { dx: facing*len*Math.sin(a), dy: -len*Math.cos(a) };
}

/* 2-bone analytic IK. Give it a root (hip) and a target (foot); it
   returns the absolute thigh angle and the relative knee bend that
   place the ankle exactly on the target. kneeSign fixes which way the
   knee bows (keep it constant — real knees only bend one way). */
function solveLegIK(hipX, hipY, footX, footY, L1, L2, facing, kneeSign=1){
  const dx = (footX-hipX)*facing, dy = footY-hipY;
  let d = Math.hypot(dx,dy);
  const maxD = L1+L2-0.01, minD = Math.abs(L1-L2)+0.5;
  d = Math.min(Math.max(d,minD),maxD);
  const angleToFoot = Math.atan2(dx,dy); // down-reference angle, radians
  const cosB = (L1*L1 + d*d - L2*L2)/(2*L1*d);
  const B = Math.acos(Math.min(1,Math.max(-1,cosB)));
  const cosC = (L1*L1 + L2*L2 - d*d)/(2*L1*L2);
  const C = Math.acos(Math.min(1,Math.max(-1,cosC)));
  // B is the angle-at-hip between the hip->target line and the thigh;
  // it must be SUBTRACTED (not added) so the knee folds toward the
  // target side instead of away from it (verified numerically against
  // a target the IK must reach exactly).
  const thighAngle = (angleToFoot - kneeSign*B)*R2D;
  const kneeBend = kneeSign*(Math.PI-C)*R2D;
  return { thighAngle, kneeBend };
}

/* Forward-kinematics chain for one leg, from a solved (or authored)
   thigh angle + knee bend + foot bend, returning every joint in WORLD
   coordinates. Also used for arms (upper/fore) with the down-reference
   convention. */
function chain2(rootX, rootY, angle1, len1, bend2, len2, facing, ref='down'){
  const v = ref==='down' ? downVec : upVec;
  const p1 = v(angle1, len1, facing);
  const joint = { x: rootX+p1.dx, y: rootY+p1.dy };
  const angle2 = angle1 + bend2;
  const p2 = v(angle2, len2, facing);
  const end = { x: joint.x+p2.dx, y: joint.y+p2.dy };
  return { joint, end, angle2 };
}

/* ================= WALK CYCLE — deterministic foot-lock =================
   See references/rig-architecture.md for the full derivation. Summary:
   the hip (root) is driven forward at a constant `speed` by ONE GSAP
   tween (the single source of truth for how far the body has walked).
   gaitFoot() only returns a BOUNDED offset relative to the hip — never
   an accumulated absolute position — so it can never drift out of sync
   with however the hip is actually being moved. During stance the
   offset sweeps by exactly `speed*T*duty`, which is precisely the
   distance the hip travels in one stance phase, so foot WORLD X stays
   fixed (no sliding) while the body moves over it; swing eases the
   offset back to the front contact point on an arc. Pure function of
   time — scrub anywhere, it is always correct. */
function gaitFoot(t, T, duty, speed, stepHeight, phaseOffset){
  const phi = (((t/T)+phaseOffset)%1+1)%1;
  const relAmp = speed*T*duty;          // hip travel during one stance phase
  let relX, y;
  if(phi < duty){
    const u = phi/duty;                 // 0..1 across stance
    relX = relAmp/2 - relAmp*u;
    y = GROUND_Y;
  } else {
    const u = (phi-duty)/(1-duty);      // 0..1 across swing
    const eased = u<0.5 ? 2*u*u : 1-Math.pow(-2*u+2,2)/2; // easeInOutQuad
    relX = -relAmp/2 + relAmp*eased;
    y = GROUND_Y - stepHeight*Math.sin(Math.PI*u);
  }
  return { relX, y, phi };
}

const POSES = {
  STAND: { torso:0, neck:0, shoulderL:-10, elbowBendL:12, shoulderR:10, elbowBendR:12,
            footLdx:-30, footLdy:0, footRdx:30, footRdy:0, footBendL:90, footBendR:90, hipDrop:0 },
  WAVE_UP:  { torso:2, neck:-4, shoulderL:-10, elbowBendL:12, shoulderR:-155, elbowBendR:60,
            footLdx:-30, footLdy:0, footRdx:30, footRdy:0, footBendL:90, footBendR:90, hipDrop:0 },
  WAVE_DOWN:{ torso:2, neck:-4, shoulderL:-10, elbowBendL:12, shoulderR:-120, elbowBendR:60,
            footLdx:-30, footLdy:0, footRdx:30, footRdy:0, footBendL:90, footBendR:90, hipDrop:0 },
  POINT:  { torso:4, neck:2, shoulderL:-10, elbowBendL:12, shoulderR:-88, elbowBendR:-4,
            footLdx:-30, footLdy:0, footRdx:30, footRdy:0, footBendL:90, footBendR:90, hipDrop:0 },
  CHEER:  { torso:0, neck:0, shoulderL:-170, elbowBendL:-10, shoulderR:170, elbowBendR:10,
            footLdx:-40, footLdy:0, footRdx:40, footRdy:0, footBendL:90, footBendR:90, hipDrop:0 },
  CROUCH: { torso:8, neck:6, shoulderL:35, elbowBendL:70, shoulderR:-35, elbowBendR:-70,
            footLdx:-32, footLdy:0, footRdx:32, footRdy:0, footBendL:90, footBendR:90, hipDrop:56 },
  JUMP_PEAK:{ torso:-4, neck:-2, shoulderL:-150, elbowBendL:20, shoulderR:150, elbowBendR:-20,
            footLdx:-16, footLdy:-70, footRdx:16, footRdy:-70, footBendL:60, footBendR:60, hipDrop:-70 },
};


module.exports={downVec,upVec,solveLegIK,chain2,gaitFoot,POSES};
