const fs=require('fs');
const source=fs.readFileSync('C:/Users/skplanet/Downloads/timhortons-32store-board.html','utf8');
const names=[...source.matchAll(/<tr><td>\d+<\/td><td>(.*?)<\/td>/g)].map(m=>m[1]);
fs.writeFileSync('games/timhortons-tour/stores.js','const STORES = '+JSON.stringify(names)+';');
