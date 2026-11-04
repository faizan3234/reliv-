/** Scroll renderer — edit CSS for space/speed; edit content.js for pictures and copy. */
'use strict';
// Switch the default route to 'kits' if desired.
let route='health', routeRendered=false, paths=[], anchors=[], currentSegment=-1, rafId=null, rectCache=null, observer=null;
  const $=id=>document.getElementById(id);
  const story=$('story'), stopsRoot=$('stops'),svg=$('flow-svg'),traveler=$('traveler'),travImg=$('traveler-image'),travLabel=$('traveler-label');
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function renderRoute(next){
    if(next===route&&routeRendered)return;
    story.classList.add('is-switching');
    route=next;routeRendered=true; const config=FLOW[route];
    $('headline-accent').textContent=config.headline;$('intro-copy').textContent=config.intro;$('footer-heading').textContent=config.footer;
    stopsRoot.replaceChildren();$('rail').replaceChildren();svg.replaceChildren();traveler.style.opacity='0'; currentSegment=-1;
    for(let i=0;i<config.stops.length;i++){
      let v=config.stops[i],section=document.createElement('section');section.className='stop';section.dataset.index=i;section.id='stop-'+i;
      const imageClass=v.object?'visual object-scene':'visual';
      const campusOptions=v.art==='campus'?`<div class="campus-options" role="group" aria-label="Choose a journey"><button class="campus-option" data-route="health" type="button" aria-pressed="${route==='health'}">Health Checkup</button><button class="campus-option" data-route="kits" type="button" aria-pressed="${route==='kits'}">Health Kits</button></div>`:'';
      section.innerHTML=`<div class="stop-inner"><div class="copy"><div class="step-label"><span class="num">${String(i+1).padStart(2,'0')}</span><span>${esc(v.step)} · STEP ${i+1}/${config.stops.length}</span></div><h2>${esc(v.title)}</h2><p>${esc(v.sub)}</p><div class="tiny-line"></div><div class="handoff"><span>↓</span>${esc(v.handoff)}</div></div><figure class="${imageClass}" role="group" aria-label="${esc(v.label)} illustration"><img class="art" src="${IMAGES[v.art]}" alt="${esc(v.label)}" loading="${i<2?'eager':'lazy'}" decoding="async"/>${campusOptions}<span class="edge-tag">${esc(v.label)}</span><span class="station-anchor" aria-hidden="true"></span></figure></div>`;
      const healthOption=section.querySelector('[data-route="health"]');
      const kitsOption=section.querySelector('[data-route="kits"]');
      if(healthOption)healthOption.addEventListener('click',()=>renderRoute('health'));
      if(kitsOption)kitsOption.addEventListener('click',()=>renderRoute('kits'));
      stopsRoot.append(section);
      const dot=document.createElement('button');dot.type='button';dot.className='rail-dot';dot.setAttribute('aria-label',`Scroll to ${v.label}`);dot.title=v.label;dot.addEventListener('click',()=>section.scrollIntoView({behavior:'smooth',block:'center'}));$('rail').appendChild(dot);
      if(i<config.stops.length-1){let runway=document.createElement('div');runway.className='runway';runway.innerHTML='<div class="runway-label">FOLLOW THE FLOW ↓</div>';stopsRoot.append(runway)}
    }
    if(observer) observer.disconnect();
    observer=new IntersectionObserver(entries=>{for(let e of entries)e.target.classList.toggle('visible',e.isIntersecting)},{rootMargin:'0px 0px -12% 0px',threshold:0.12});document.querySelectorAll('.stop').forEach(n=>observer.observe(n));
    const imgs=[...stopsRoot.querySelectorAll('img')];for(const img of imgs){if(!img.complete)img.addEventListener('load',()=>{scheduleRecalc()},{once:true})}
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    requestAnimationFrame(()=>requestAnimationFrame(()=>story.classList.remove('is-switching')));
    setTimeout(recalculate,50);setTimeout(recalculate,450);
  }
  function getAnchorPosition(el){const outer=story.getBoundingClientRect(),rect=el.getBoundingClientRect();return{x:rect.left-outer.left+rect.width/2,y:rect.top-outer.top+rect.height/2}}
  function recalculate(){
    const all=[...document.querySelectorAll('.station-anchor')];
    anchors=all.map(getAnchorPosition);
    if(anchors.length<2)return;
    const w=story.clientWidth,h=story.scrollHeight;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.style.height=h+'px';svg.style.width=w+'px';svg.replaceChildren();paths=[];
    const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');svg.appendChild(defs);
    for(let i=0;i<anchors.length-1;i++){
      let a=anchors[i],b=anchors[i+1];
      // DOTTED PATH SHAPE: adjust .27 and 160 to change curve/depth.
      let yy=Math.max(160,(b.y-a.y)*.27);
      let d=`M ${a.x.toFixed(1)} ${a.y.toFixed(1)} C ${a.x.toFixed(1)} ${(a.y+yy).toFixed(1)}, ${b.x.toFixed(1)} ${(b.y-yy).toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
      let p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',d);p.setAttribute('class','flow-path');svg.appendChild(p);
      let hi=document.createElementNS('http://www.w3.org/2000/svg','path');hi.setAttribute('d',d);hi.setAttribute('class','flow-path highlight');svg.appendChild(hi);
      let len=p.getTotalLength();
      const clip=document.createElementNS('http://www.w3.org/2000/svg','clipPath');clip.setAttribute('id','reliv-route-clip-'+i);clip.setAttribute('clipPathUnits','userSpaceOnUse');
      const clipRect=document.createElementNS('http://www.w3.org/2000/svg','rect');clipRect.setAttribute('x','0');clipRect.setAttribute('y',String(a.y));clipRect.setAttribute('width',String(w));clipRect.setAttribute('height','0');clip.appendChild(clipRect);defs.appendChild(clip);
      hi.setAttribute('clip-path',`url(#reliv-route-clip-${i})`);
      paths.push({path:p,hi,len,a,b,clipRect});
    }
    rectCache={top:story.getBoundingClientRect().top+window.scrollY,height:story.scrollHeight};scheduleScroll();
  }
  function bezierAtY(path,targetY){let lo=0,hi=path.len;for(let j=0;j<24;j++){let m=(lo+hi)/2,pt=path.path.getPointAtLength(m);if(pt.y<targetY)lo=m;else hi=m}return path.path.getPointAtLength((lo+hi)/2)}
  function scrollUpdate(){rafId=null;if(!rectCache||!paths.length)return;
    const focus=(window.scrollY+window.innerHeight*.50-rectCache.top);
    const total=paths.length;const last=anchors[anchors.length-1];
    let seg=-1;
    for(let i=0;i<paths.length;i++){if(focus>=paths[i].a.y&&focus<paths[i].b.y){seg=i;break}}
    let dotIndex=0;for(let j=0;j<anchors.length;j++)if(focus>anchors[j].y)dotIndex=j;
    [...$('rail').children].forEach((dot,i)=>dot.classList.toggle('active',i===dotIndex));
    const entire=clamp((focus-anchors[0].y)/(last.y-anchors[0].y),0,1);$('top-progress').style.width=(entire*100).toFixed(2)+'%';
    for(let i=0;i<paths.length;i++){
      const q=paths[i];let p=clamp((focus-q.a.y)/(q.b.y-q.a.y),0,1);let progressPoint=q.path.getPointAtLength(q.len*p);
      q.clipRect.setAttribute('height',String(Math.max(0,progressPoint.y-q.a.y)));
    }
    if(seg<0){traveler.style.opacity='0';currentSegment=-1;$('status').textContent=focus<anchors[0].y?'Scroll down to begin':(route==='health'?'Your Reliv App journey continues':'Your Health Kits journey is complete');return}
    let pth=paths[seg],pr=clamp((focus-pth.a.y)/(pth.b.y-pth.a.y),0,1),point=bezierAtY(pth,clamp(focus,pth.a.y,pth.b.y));
    const asset=FLOW[route].transfers[seg];
    if(currentSegment!==seg){travImg.src=IMAGES[asset.img];travLabel.textContent=asset.name;currentSegment=seg;}
    const vw=window.innerWidth;const size=vw<=690?Math.max(105,Math.min(asset.size*.65,160)):asset.size;
    traveler.style.setProperty('--float-size',size+'px');
    // Grow after release, hold through the long dotted runway, shrink as it ENTERS the next scene.
    let scale=pr<.11?.62+.38*(pr/.11):pr>.85?1-.63*((pr-.85)/.15):1;
    let visibility=pr<.055?pr/.055:pr>.935?(1-pr)/.065:1;
    let rotation=(Math.sin(pr*Math.PI*2)*3.2).toFixed(2);
    traveler.style.opacity=String(clamp(visibility,0,1));
    traveler.style.transform=`translate3d(${point.x.toFixed(1)}px,${point.y.toFixed(1)}px,0) translate(-50%,-50%) scale(${scale.toFixed(3)}) rotate(${rotation}deg)`;
    const startName=FLOW[route].stops[seg].label,endName=FLOW[route].stops[seg+1].label;
    $('status').textContent=`${asset.name}  ·  ${startName} → ${endName}`;
  }
  function scheduleScroll(){if(rafId===null)rafId=requestAnimationFrame(scrollUpdate)}
  let recalcTimer;function scheduleRecalc(){clearTimeout(recalcTimer);recalcTimer=setTimeout(recalculate,90)}
  window.addEventListener('scroll',scheduleScroll,{passive:true});window.addEventListener('resize',scheduleRecalc,{passive:true});
  if('ResizeObserver' in window){const ro=new ResizeObserver(()=>scheduleRecalc());ro.observe(story)}
  renderRoute('health');
