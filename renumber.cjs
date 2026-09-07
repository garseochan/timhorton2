const fs=require('fs');const d='games/timhortons-tour/';let s=fs.readFileSync(d+'app.js','utf8');const at=s.indexOf('function branchAt');s=s.slice(0,at)+`// Display numbering follows the outer perimeter, each diagonal arm, then the hub.
const numberedSlots=[...Array.from({length:outerCount-1},(_,i)=>i+1),...arms.flatMap(a=>a.nodes),...Array.from({length:ringCount},(_,i)=>ringStart+i)];
const numberedStoreIds=numberedSlots.map(slot=>shopSlots.indexOf(slot));
const storeNumbers=STORES.map((_,id)=>numberedStoreIds.indexOf(id)+1);
`+s.slice(at);s=s.replace('${id+1}. ${STORES[id]}','${storeNumbers[id]}. ${STORES[id]}').replace("STORES.map((n,i)=>`<span>${String(i+1).padStart(2,'0')} ${n}</span>`)","numberedStoreIds.map(id=>`<span>${String(storeNumbers[id]).padStart(2,'0')} ${STORES[id]}</span>`)").replace("'+(id+1)+'</text>'","'+storeNumbers[id]+'</text>'");fs.writeFileSync(d+'app.js',s);
let t=fs.readFileSync(d+'test.cjs','utf8');t=t.replace("start();if(state.turns",`if(storeNumbers[28]!==1||storeNumbers[30]!==2||storeNumbers[29]!==3)throw Error('first three numbers');
if(new Set(storeNumbers).size!==32||Math.min(...storeNumbers)!==1||Math.max(...storeNumbers)!==32)throw Error('unique consecutive numbers');
if(numberedSlots.slice(0,19).some((slot,i)=>slot!==i+1)||numberedSlots.slice(19,27).some((slot,i)=>slot!==arms.flatMap(a=>a.nodes)[i])||numberedSlots.slice(27).some((slot,i)=>slot!==ringStart+i))throw Error('numbering order');
start();if(state.turns`);fs.writeFileSync(d+'test.cjs',t);
let r=fs.readFileSync(d+'README.md','utf8');r+='\n## 매장 번호\n1 미금역 → 2 분당서현 → 3 야탑역부터 외곽 직사각형 진행 순서로 1~19번. 대각선은 출발 쪽 → 오른쪽 위 → 왼쪽 위 → 왼쪽 아래 순서로 각 바깥에서 안쪽으로 20~27번. 가운데 원은 위쪽부터 시계 방향으로 28~32번. 지도 목록에도 동일한 번호를 표시합니다.\n';fs.writeFileSync(d+'README.md',r);
