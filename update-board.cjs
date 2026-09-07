const fs=require('fs');const dir='games/timhortons-tour/';let js=fs.readFileSync(dir+'app.js','utf8');
const begin=js.indexOf('const track=');const end=js.indexOf('function randomInt',begin);
js=js.slice(0,begin)+`// Outer rectangle, circular hub and four diagonal approaches share one movement graph.
const track=[];
for(let i=0;i<14;i++)track.push({x:590,y:760-i*46});
for(let i=0;i<6;i++)track.push({x:590-i*60,y:116});
for(let i=0;i<14;i++)track.push({x:230,y:116+i*46});
for(let i=0;i<6;i++)track.push({x:230+i*60,y:760});
const ringStart=track.length;
for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180;track.push({x:410+125*Math.cos(a),y:438+125*Math.sin(a)});}
const arms=[];
[[0,44],[14,42],[20,48],[34,46]].forEach(([corner,ring])=>{const nodes=[];for(let i=1;i<=3;i++){nodes.push(track.length);track.push({x:track[corner].x+(track[ring].x-track[corner].x)*i/4,y:track[corner].y+(track[ring].y-track[corner].y)*i/4});}arms.push({corner,ring,nodes});});
const shopSlots=[21,24,9,12,15,16,14,13,27,28,22,23,34,36,38,40,50,42,59,61,44,53,54,56,57,46,48,51,1,5,3,7];
function branchAt(pos){return arms.find(a=>a.corner===pos||a.ring===pos);}
function moveOne(first){const a=branchAt(state.position);if(first&&state.route==='diagonal'&&a){state.travel=state.position===a.corner?'in':'out';state.position=state.travel==='in'?a.nodes[0]:a.nodes[2];return;}if(state.position<40){state.position=(state.position+1)%40;return;}if(state.position<50){state.position=40+(state.position-40+1)%10;return;}const arm=arms.find(a=>a.nodes.includes(state.position));const i=arm.nodes.indexOf(state.position);state.position=state.travel==='out'?(i===0?arm.corner:arm.nodes[i-1]):(i===2?arm.ring:arm.nodes[i+1]);}
`+js.slice(end);
js=js.replace("phase:'ready',log:","phase:'ready',route:'outer',travel:'in',log:");
const b=js.indexOf('function board()');const e=js.indexOf('function start()',b);
js=js.slice(0,b)+`function board(){let s='<svg viewBox="0 0 820 850" role="img" aria-label="매장명이 표시된 직사각형, 대각선과 중앙 순환선 윷놀이판"><path d="M590 760V116H230V760Z" fill="none" stroke="#8c5b42" stroke-width="3"/><circle cx="410" cy="438" r="125" fill="#ecf6ff" fill-opacity=".55" stroke="#0567bd" stroke-width="2" stroke-dasharray="6 5"/><text x="410" y="69" text-anchor="middle" fill="#c20d16" font-size="22" font-style="italic" font-family="Georgia">Tim Hortons Coffee Journey</text>';
arms.forEach(a=>{s+='<path d="M'+track[a.corner].x+' '+track[a.corner].y+'L'+track[a.ring].x+' '+track[a.ring].y+'" stroke="#c20d16" stroke-width="2" stroke-dasharray="6 5"/>';});
track.forEach((p,i)=>{const id=shopSlots.indexOf(i),visited=state.visited.has(id),corner=arms.some(a=>a.corner===i);s+='<circle cx="'+p.x+'" cy="'+p.y+'" r="'+(corner?19:id>=0?12:4)+'" fill="'+(visited?'#19a966':id>=0?(i>=40&&i<50?'#0567bd':'#c20d16'):'#b0b3ba')+'" stroke="#fffaec" stroke-width="2"/>';if(id>=0){s+='<text x="'+p.x+'" y="'+(p.y+4)+'" text-anchor="middle" fill="white" font-size="10">'+(id+1)+'</text>';let x=p.x,y=p.y+5,anchor='middle';if(i<14){x+=25;anchor='start';}else if(i<20){y-=25;}else if(i<34){x-=25;anchor='end';}else if(i<40){y+=29;}else if(i<50){if(i===40){y-=23;}else{x+=p.x>410?21:-21;anchor=p.x>410?'start':'end';}}else{const arm=arms.find(a=>a.nodes.includes(i));x+=arm.corner===0||arm.corner===14?-20:20;anchor=arm.corner===0||arm.corner===14?'end':'start';y-=9;}
const marker=state.bonus.has(id)?' ↻':state.point.has(id)?' Ⓟ':'';s+='<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" fill="#392821" font-size="12" font-weight="600" paint-order="stroke" stroke="#fffaec" stroke-width="4" stroke-linejoin="round">'+STORES[id]+marker+'</text>';}});
const p=track[state.position];s+='<circle cx="'+p.x+'" cy="'+p.y+'" r="23" fill="none" stroke="#1190ff" stroke-width="3"/><text x="'+p.x+'" y="'+(p.y-27)+'" text-anchor="middle" font-size="23">☕</text><text x="620" y="793" fill="#886d60" font-size="13">출발 · 위로 이동 ↑</text></svg>';$('board').innerHTML=s;$('turns').textContent=state.turns;$('visits').textContent=state.visited.size;$('points').textContent=state.points+' P';$('history').textContent=state.log.slice().reverse().join(' / ');
const junction=branchAt(state.position);$('routeBtn').classList.toggle('hidden',!junction);$('routeBtn').disabled=state.phase!=='ready';$('routeBtn').textContent=state.route==='diagonal'?(state.position<40?'선택: 대각선 → 가운데 원 ↗':'선택: 대각선 → 바깥길 ↗'):(state.position<40?'선택: 직사각형 바깥길 ↑':'선택: 가운데 원 순환 ↻');}
`+js.slice(e);
js=js.replace("$('sticks').classList.remove('air');$('throwBtn').disabled=false;","$('sticks').classList.remove('air','casting','landed');$('throwBtn').disabled=false;");
js=js.replace("function arm(){state.phase='air';","function arm(){state.phase='air';$('routeBtn').disabled=true;$('sticks').classList.remove('casting','landed');");
js=js.replace("$('sticks').classList.remove('air');const bits", "$('sticks').classList.remove('air');$('sticks').classList.add('casting');const bits");
js=js.replace("$('notice').textContent='다음 커피 정류장으로 이동 중…';for", "$('notice').textContent='윷이 떨어지면 이동해요!';await sleep(950);$('sticks').classList.remove('casting');$('sticks').classList.add('landed');$('notice').textContent='다음 커피 정류장으로 이동 중…';for");
js=js.replace('state.position=(state.position+1)%48;board();','moveOne(i===0);board();');
js=js.replace("function after(){board();","function after(){state.route='outer';board();");
js=js.replace("$('mapBtn').onclick", "$('routeBtn').onclick=()=>{if(state.phase!=='ready')return;state.route=state.route==='diagonal'?'outer':'diagonal';board();};\n$('mapBtn').onclick");
fs.writeFileSync(dir+'app.js',js);
let html=fs.readFileSync(dir+'index.html','utf8');
const sticks='<div class="sticks" id="sticks"><div class="stick">×</div><div class="stick">×</div><div class="stick">×</div><div class="stick">×</div></div>';
html=html.replace(sticks,'');html=html.replace('<div class="board" id="board"></div>','<div class="board-stage"><div class="board" id="board"></div>'+sticks+'</div>');
html=html.replace('<span>· 이동 칸</span>','<span>· 이동 칸</span><span>파란 원: 가운데 순환길</span>');
html=html.replace('<button class="primary" id="throwBtn"','<button class="secondary hidden" id="routeBtn" style="width:100%;margin-bottom:8px"></button><button class="primary" id="throwBtn"');
html=html.replace('윷·모는 4·5칸 이동만 합니다.','꼭짓점과 가운데 원의 연결점에서는 경로 버튼으로 대각선을 선택할 수 있어요. 선택한 경로는 다음 던지기에 적용됩니다. 윷·모는 4·5칸 이동만 합니다.');
html=html.replace('</style>',`/* Transparent sticks float directly above the board, without an image panel. */
.game-layout{grid-template-columns:minmax(0,1fr) 270px;align-items:start}.board-stage{position:relative;isolation:isolate}.board{padding:0}.board-stage .sticks{position:absolute;left:50%;top:49%;width:190px;height:145px;transform:translate(-50%,-50%);pointer-events:none;z-index:2;gap:14px;perspective:700px;filter:drop-shadow(0 12px 8px #39282133)}.board-stage .stick{flex-shrink:0;width:24px;height:106px;border:1px solid #bd8c05;border-radius:40% 40% 30% 30% / 12% 12% 8% 8%;background:repeating-linear-gradient(91deg,transparent 0 4px,#8a660411 5px 6px),linear-gradient(90deg,#bd8c05,#ffde84 35%,#fff4d6 52%,#ffde84 70%,#bd8c05);box-shadow:inset -3px 0 3px #8a660433,2px 4px 1px #4d390222;transform:rotate(var(--rot));font-size:23px;color:#900a11;text-shadow:0 1px #fff4d6;--rot:-16deg;--dx:-26px;--dy:12px;--delay:0s}.board-stage .stick:nth-child(2){--rot:12deg;--dx:-8px;--dy:-22px;--delay:-.25s}.board-stage .stick:nth-child(3){--rot:-9deg;--dx:14px;--dy:17px;--delay:-.5s}.board-stage .stick:nth-child(4){--rot:24deg;--dx:27px;--dy:-6px;--delay:-.7s}.board-stage .air .stick{animation:boardFloat 1.1s ease-in-out infinite alternate;animation-delay:var(--delay)}.board-stage .casting .stick{animation:boardCast .95s cubic-bezier(.25,.6,.35,1) both}.board-stage .landed .stick{transform:translate(var(--dx),var(--dy)) rotate(var(--rot));transition:transform .2s}.board-stage .landed{opacity:.45;transition:opacity 1s}.throw-panel{position:sticky;top:20px}.throw-panel .pill{margin:12px 0 28px}
@keyframes boardFloat{0%{transform:translateY(-8px) rotate(var(--rot)) rotateY(-20deg)}100%{transform:translateY(-44px) rotate(calc(var(--rot) + 20deg)) rotateY(45deg)}}
@keyframes boardCast{0%{transform:translateY(-30px) rotate(var(--rot)) rotateY(0)}40%{transform:translate(var(--dx),-125px) rotate(165deg) rotateY(360deg) scale(1.2)}78%{transform:translate(var(--dx),var(--dy)) rotate(calc(var(--rot) + 360deg)) rotateY(720deg)}89%{transform:translate(var(--dx),calc(var(--dy) - 15px)) rotate(calc(var(--rot) + 355deg))}100%{transform:translate(var(--dx),var(--dy)) rotate(calc(var(--rot) + 360deg))}}
@media(max-width:800px){.game-layout{grid-template-columns:1fr}.board{max-width:none}.board-stage .sticks{width:150px;height:110px;gap:10px}.board-stage .stick{width:19px;height:82px}.throw-panel{position:static}.throw-panel .pill{margin:0 0 16px}}
@media(max-width:450px){#game{margin:0 -12px}.board-stage .sticks{gap:7px;width:108px}.board-stage .stick{width:14px;height:62px;font-size:16px}.board-stage .stick{--dx:-12px}.board-stage .stick:nth-child(4){--dx:12px}.game-layout{gap:12px}.stats{margin-bottom:12px}.throw-panel{padding:16px}}
@media(prefers-reduced-motion:reduce){.board-stage .air .stick,.board-stage .casting .stick{animation:none}.board-stage .landed .stick{transition:none}}
</style>`);fs.writeFileSync(dir+'index.html',html);
