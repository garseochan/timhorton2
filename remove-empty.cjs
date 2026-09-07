const fs=require('fs');const dir='games/timhortons-tour/';let s=fs.readFileSync(dir+'app.js','utf8');s=s.replace('const track=[];','let track=[];').replace('const ringStart=track.length;','').replace('const shopSlots=[','let shopSlots=[');
const at=s.indexOf('function branchAt');s=s.slice(0,at)+`// Keep only the start and actual stores; each edge now advances one visible stop.
const retained=[0,...shopSlots].sort((a,b)=>a-b);
const remap=new Map(retained.map((old,index)=>[old,index]));
track=retained.map(old=>({...track[old],zone:old<40?'outer':old<50?'ring':'diagonal',side:old<14?'right':old<20?'top':old<34?'left':'bottom',ringTop:old===40}));
const outerCount=track.filter(p=>p.zone==='outer').length;
const ringStart=outerCount;
const ringCount=track.filter(p=>p.zone==='ring').length;
shopSlots=shopSlots.map(old=>remap.get(old));
arms.forEach(a=>{a.corner=remap.get(a.corner);a.ring=remap.get(a.ring);a.nodes=a.nodes.filter(n=>remap.has(n)).map(n=>remap.get(n));});
`+s.slice(at);
const b=s.indexOf('function moveOne('),e=s.indexOf('function randomInt',b);
s=s.slice(0,b)+`function moveOne(first){const a=branchAt(state.position);if(first&&state.route==='diagonal'&&a){state.travel=state.position===a.corner?'in':'out';state.position=state.travel==='in'?a.nodes[0]:a.nodes[a.nodes.length-1];return;}if(state.position<outerCount){state.position=(state.position+1)%outerCount;return;}if(state.position<ringStart+ringCount){state.position=ringStart+(state.position-ringStart+1)%ringCount;return;}const arm=arms.find(a=>a.nodes.includes(state.position));const i=arm.nodes.indexOf(state.position);state.position=state.travel==='out'?(i===0?arm.corner:arm.nodes[i-1]):(i===arm.nodes.length-1?arm.ring:arm.nodes[i+1]);}
`+s.slice(e);
s=s.replace("(i>=40&&i<50?'#0567bd':'#c20d16')","(p.zone==='ring'?'#0567bd':'#c20d16')");
s=s.replace("if(i<14){","if(p.zone==='outer'&&p.side==='right'){").replace("else if(i<20){","else if(p.zone==='outer'&&p.side==='top'){").replace("else if(i<34){","else if(p.zone==='outer'&&p.side==='left'){").replace("else if(i<40){","else if(p.zone==='outer'&&p.side==='bottom'){").replace("else if(i<50){if(i===40){","else if(p.zone==='ring'){if(p.ringTop){");
s=s.replaceAll('arm.corner===0||arm.corner===14',"track[arm.corner].x>410").replaceAll('state.position<40','state.position<outerCount');
s=s.replace("else message+='잠깐 쉬어가는 길. 다음 매장을 노려보세요!';","else message+='출발점에 돌아왔어요! 출발점은 방문 매장에 포함되지 않아요.';");
s=s.replace("stroke-width=\"2\"/>';if(id>=0)","stroke-width=\"2\"/>';if(i===0)s+='<text x=\"'+p.x+'\" y=\"'+(p.y+4)+'\" text-anchor=\"middle\" fill=\"white\" font-size=\"10\">출발</text>';if(id>=0)");
fs.writeFileSync(dir+'app.js',s);
let h=fs.readFileSync(dir+'index.html','utf8').replace('<span>· 이동 칸</span>','<span>🚩 출발점만 매장 없음</span>').replace('매장에 딱 멈추면 방문 성공! 작은 화면에서는','출발 1칸 + 매장 32칸 · 도착한 매장만 방문 성공! 작은 화면에서는');fs.writeFileSync(dir+'index.html',h);
let r=fs.readFileSync(dir+'README.md','utf8').replace('62칸 연결 경로: 직사각형 외곽 40칸, 가운데 원 10칸, 대각선 12칸.','33칸 연결 경로: 직사각형 외곽 20칸(출발 1칸 포함), 가운데 원 5칸, 대각선 8칸. 출발점 외에는 빈 칸이 없으며 한 칸 이동은 다음 매장(또는 출발점)까지 이동합니다.');fs.writeFileSync(dir+'README.md',r);
