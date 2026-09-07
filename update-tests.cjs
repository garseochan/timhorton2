const fs=require('fs');const p='games/timhortons-tour/test.cjs';let t=fs.readFileSync(p,'utf8');t=t.slice(0,t.indexOf('(async()=>{await'))+`(async()=>{await vm.runInContext(\`(async()=>{
if(STORES.length!==32||new Set(shopSlots).size!==32||track.length!==33||outerCount!==20||ringCount!==5)throw Error('inventory');
if(track.some((p,i)=>i!==0&&!shopSlots.includes(i))||shopSlots.includes(0))throw Error('only start may be empty');
start();if(state.turns!==4||state.bonus.size!==6||state.point.size!==8)throw Error('initial state');
randomInt=()=>1;state.bonus=new Set([shopSlots.indexOf(4)]);state.point.clear();arm();await roll();if(state.position!==4||state.visited.size!==1||state.turns!==4)throw Error('four visible stops / bonus');
state.position=0;arm();await roll();if(state.visited.size!==1||state.turns!==3)throw Error('repeat bonus');
start();state.route='diagonal';state.bonus.clear();state.point.clear();randomInt=()=>0;arm();await roll();const expected=ringStart+(arms[0].ring-ringStart+2)%ringCount;if(state.position!==expected||state.visited.size!==1)throw Error('diagonal five actual stops');
start();state.route='diagonal';moveOne(true);if(state.position!==arms[0].nodes[0])throw Error('first diagonal store');moveOne(false);if(state.position!==arms[0].nodes[1])throw Error('second diagonal store');moveOne(false);if(state.position!==arms[0].ring)throw Error('ring arrival');state.route='diagonal';moveOne(true);moveOne(false);moveOne(false);if(state.position!==0)throw Error('return to start');
start();state.position=outerCount-5;randomInt=()=>0;arm();await roll();if(state.position!==0||state.visited.size!==0||state.points!==0)throw Error('start is not store');
start();state.position=outerCount-3;arm();await roll();if(state.position!==2||state.visited.size!==1||!state.visited.has(shopSlots.indexOf(2)))throw Error('passed stores not counted');
state.turns=1;arm();timeout();if(state.turns!==0||state.phase!=='done')throw Error('timeout');finish();
start();const seen=new Set([0]),pending=[0];while(pending.length){const pos=pending.pop();for(const route of ['outer','diagonal'])for(const travel of ['in','out']){state.position=pos;state.route=route;state.travel=travel;moveOne(true);if(!seen.has(state.position)){seen.add(state.position);pending.push(state.position);}}}if(seen.size!==33)throw Error('unreachable stop');
if(STORES.some(name=>!document.getElementById('board').innerHTML.includes(name)))throw Error('missing name');
})()\`,ctx);console.log('PASS: 33 visible stops, only start empty, 32 labels, exact step counts, diagonal entry/exit, no reward on start, no pass-through visits, repeat bonus prevention, timeout, all stores reachable');})().catch(e=>{console.error(e);process.exitCode=1});\n`;fs.writeFileSync(p,t);
