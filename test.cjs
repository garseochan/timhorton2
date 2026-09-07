const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements=new Map();const element=()=>({classList:{toggle(){},add(){},remove(){}},showModal(){this.open=true},close(){this.open=false},focus(){},addEventListener(){},style:{},textContent:'',innerHTML:'',disabled:false});const doc={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id)},querySelectorAll(){return Array.from({length:4},element)}};
const ctx=vm.createContext({document:doc,crypto:require('crypto').webcrypto,performance:{now:()=>0},setTimeout(fn){fn();return 1},clearTimeout(){},setInterval(){return 1},clearInterval(){},console});
vm.runInContext(fs.readFileSync(__dirname+'/stores.js','utf8')+fs.readFileSync(__dirname+'/app.js','utf8'),ctx);
(async()=>{await vm.runInContext(`(async()=>{
if(track.length!==33||new Set(shopSlots).size!==32||shopSlots.includes(0)||storeNumbers[28]!==1||storeNumbers[30]!==2||storeNumbers[29]!==3)throw Error('board/numbering');
start();if(state.phase!=='ready'||state.turns!==4)throw Error('start');
randomInt=()=>1;state.point=new Set([shopSlots.indexOf(4)]);state.bonus.clear();state.turns=1;arm();await roll();if(state.points!==2||state.phase!=='point'||document.getElementById('pointAmount').textContent!=='2P 적립!'||document.getElementById('continueDialog').open)throw Error('point first');
closePoint();if(state.phase!=='exhausted'||!document.getElementById('continueDialog').open)throw Error('exhausted after points');
const pos=state.position;openMission();if(state.turns!==0)throw Error('no early reward');completeMission(0);if(state.turns!==2||state.missions!==1||state.position!==pos||state.points!==2||state.visited.size!==1)throw Error('continuation');completeMission(1);if(state.turns!==2||state.missions!==1)throw Error('duplicate');
state.position=0;arm();await roll();if(state.points!==2||state.phase==='point')throw Error('duplicate points');
for(let i=1;i<3;i++){state.turns=0;after();openMission();completeMission(1);}if(state.missions!==3)throw Error('three missions');state.turns=0;after();openMission();if(state.phase!=='exhausted'||state.turns!==0)throw Error('mission cap');stopContinue();if(state.phase!=='done')throw Error('end');
start();state.turns=0;after();openMission();stopContinue();if(state.turns!==0||state.missions!==0)throw Error('cancel grants nothing');
start();state.position=arms[1].corner;state.pendingPoint={amount:1,store:'테스트'};after(true);if(state.phase!=='point')throw Error('point before route');closePoint();if(state.phase!=='choosing')throw Error('route after point');chooseRoute('diagonal');moveOne(true);if(state.position!==arms[1].nodes[0])throw Error('diagonal');
start();state.turns=1;arm();timeout();if(state.phase!=='exhausted')throw Error('timeout offer');
start();const seen=new Set([0]),pending=[0];while(pending.length){const pos=pending.pop();for(const route of ['outer','diagonal'])for(const travel of ['in','out']){state.position=pos;state.route=route;state.travel=travel;moveOne(true);if(!seen.has(state.position)){seen.add(state.position);pending.push(state.position);}}}if(seen.size!==33)throw Error('unreachable stop');
})()`,ctx);console.log('PASS: board, numbering, point popup sequencing, mission continuation and cap, duplicate prevention, cancellation, corner choice and timeout');})().catch(e=>{console.error(e);process.exitCode=1});
