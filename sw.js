const V='cc-v2',SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname==='bible.helloao.org'){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(y=>y.put(r,c))}return x})));return}
 if(u.origin===location.origin){e.respondWith(fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(y=>y.put(r,c))}return x}).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))))}});
