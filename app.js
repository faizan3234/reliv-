'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const metrics={measurements:[
['Systolic BP','124','mmHg','The pressure in your arteries when your heart squeezes to pump blood.','This is the first number in the sample blood-pressure pair: 124/81. mmHg is the unit used for blood pressure.'],
['Diastolic BP','81','mmHg','The pressure in your arteries between heartbeats.','This is the second number in the sample blood-pressure pair: 124/81. The two numbers are read together.'],
['Heart rate','78','bpm','How many times the heart beats in one minute.','bpm means beats per minute. Activity and measurement conditions can affect a reading.'],
['Blood oxygen','97','%','SpO₂ is an estimate of the proportion of haemoglobin carrying oxygen.','The sample shows 97 percent. This is a device reading, not a diagnosis.'],
['Body temperature','98.4','°F','The temperature reading recorded in this sample session.','°F means degrees Fahrenheit. Measurement site and device method matter when interpreting temperature.'],
['Weight','68','kg','Body weight recorded by the measuring device.','kg means kilograms. Compare readings taken under similar conditions.'],
['Height','183','cm','The height recorded for this sample user.','cm means centimetres. 183 centimetres is 1.83 metres.'],
['Left eye','6/6','','The visual-acuity notation included for the left eye.','6/6 refers to seeing at 6 metres what a reference observer can see at 6 metres. It is not a complete eye examination.'],
['Right eye','6/6','','The visual-acuity notation included for the right eye.','This is recorded separately from the left eye. The sample does not describe the testing method.']
],composition:[
['Body fat','18.9','%','An estimate of the share of body weight made up of fat.','This is a body-composition estimate. Its interpretation depends on the device, method and person.'],
['Muscle mass','51.5','kg','The amount labelled as muscle mass in the sample report.','This is an estimated mass, not a direct test of muscle strength. Definitions can differ between devices.'],
['Bone mass','2.9','kg','The device’s estimated bone-mass value shown in the sample.','This is not a bone-density scan and cannot be used to diagnose bone disease.'],
['Body water','57.1','%','The estimated proportion of body weight represented by water.','This estimate depends on measurement conditions and is not a stand-alone hydration diagnosis.'],
['Skeletal muscle','44.2','%','The proportion labelled as skeletal muscle in the sample report.','Skeletal muscles help move the body. This percentage is different from the muscle-mass value in kilograms.'],
['FFMI','16.8','','Fat-free mass index relates estimated fat-free mass to height.','It is a calculated index. The source report does not provide the calculation or inputs, so this sample value has not been independently verified.'],
['BMR','1650','kcal/day','An estimate of the energy the body uses for basic functions at rest.','kcal/day means kilocalories per day. This is not a personalised daily food or calorie target.'],
['Metabolic age','23','years','A device-derived comparison labelled as metabolic age.','This is an estimate based on the device’s method, not a measurement of your actual biological age.'],
['Impedance','487','ohm','The electrical opposition recorded by a body-composition device.','Ohms are the unit. Devices can use impedance with other information to estimate body composition.']
]};
let category='measurements', selected=0, voice=false, step=0, chosen=0;
function speak(text){window.relivSpeak?.(text, 'en-IN')}
function renderReport(){ if(!$('#reportValues')) return; $('#reportValues').innerHTML=metrics[category].map((m,i)=>`<button class="reading ${i===selected?'selected':''}" data-metric="${i}" aria-pressed="${i===selected}"><span>${m[0]}</span><b>${m[1]}</b> <small>${m[2]}</small></button>`).join(''); const m=metrics[category][selected];$('#metricIndex').textContent=String(selected+1).padStart(2,'0');$('#metricTitle').textContent=m[0];$('#metricValue').innerHTML=`${m[1]} <small>${m[2]}</small>`;$('#metricMeaning').textContent=m[3];$('#metricDetail').textContent=m[4];$$('[data-metric]').forEach(b=>b.onclick=()=>{selected=+b.dataset.metric;renderReport()}); }
$$('[data-category]').forEach((b,i,all)=>{b.onclick=()=>{category=b.dataset.category;selected=0;all.forEach(x=>x.setAttribute('aria-selected',String(x===b)));renderReport()};b.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const n=all[(i+1)%all.length];n.click();n.focus()}}});$('#readMetric').onclick=()=>{const m=metrics[category][selected];speak(`${m[0]}. ${m[1]} ${m[2]}. ${m[3]} ${m[4]}`)};renderReport();
const video=$('#demoVideo'); if(video) { video.muted=true;function playAt(time){if('speechSynthesis'in window)speechSynthesis.cancel();video.currentTime=time;video.play().catch(()=>{});video.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}$('#playDemo').onclick=()=>playAt(video.currentTime);$$('[data-time]').forEach(b=>b.onclick=()=>playAt(+b.dataset.time));video.addEventListener('play',()=>{if('speechSynthesis'in window)speechSynthesis.cancel()});document.addEventListener('visibilitychange',()=>{if(document.hidden){video.pause();if('speechSynthesis'in window)speechSynthesis.cancel()}});
// A bounded image cache keeps decoded frames from accumulating on phones.
const canvas=$('#sequence'); let ctx, track, stage; let reduced=matchMedia('(prefers-reduced-motion: reduce)'); if(canvas) { ctx=canvas.getContext('2d'); track=$('#film'); stage=$('.film-stage'); } let frameCount=289,target=0,drawn=-1,active=false,running=0;const cache=new Map(),pending=new Set(),blobs=new Map(),failed=new Set();let warmed=false;const chapters=[['Meet your health kiosk.','Scroll to explore the checks, one at a time.'],['Everyday health numbers.','Blood pressure and oxygen saturation.'],['A moment for your temperature.','Follow the guidance at the kiosk.'],['Your body, in perspective.','Height, weight and calculated metrics.'],['Your readings, together.','Explore the available measurements and estimates.'],['A clearer picture of you.','Continue below to try a sample checkup.']];
function draw(i){const img=cache.get(i);if(!img||!ctx)return;const box=canvas.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,1.5);if(!box.width||!box.height)return;const w=Math.round(box.width*ratio),h=Math.round(box.height*ratio);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}ctx.clearRect(0,0,w,h);const scale=Math.min(w/img.width,h/img.height);ctx.drawImage(img,(w-img.width*scale)/2,(h-img.height*scale)/2,img.width*scale,img.height*scale);drawn=i;$('#filmFallback').style.visibility='hidden'}
function loadFrame(i){if(i<0||i>=frameCount||cache.has(i)||pending.has(i)||failed.has(i))return;pending.add(i);running++;const im=new Image();im.onload=()=>{pending.delete(i);running--;cache.set(i,im);if(i===target||drawn<0)draw(i);trim();pump()};im.onerror=()=>{pending.delete(i);running--;failed.add(i);pump()};im.src=blobs.get(i)||`assets/frames/${String(i+1).padStart(4,'0')}.webp`}
function trim(){if(cache.size>42){const keys=[...cache.keys()].sort((a,b)=>Math.abs(b-target)-Math.abs(a-target));while(cache.size>36)cache.delete(keys.shift())}}
async function warm(){if(warmed||reduced.matches)return;warmed=true;let cursor=0;async function worker(){while(cursor<frameCount){const i=cursor++;try{const r=await fetch(`assets/frames/${String(i+1).padStart(4,'0')}.webp`,{cache:'force-cache'});if(r.ok)blobs.set(i,URL.createObjectURL(await r.blob()))}catch{}}}await Promise.all(Array.from({length:4},worker))}function pump(){if(!active||reduced.matches)return;const wanted=[target];for(let d=1;d<=16;d++){wanted.push(target+d,target-d)}for(const i of wanted){if(running>=5)break;if(i>=0&&i<frameCount&&!cache.has(i)&&!pending.has(i))loadFrame(i)}}
function update(){if(reduced.matches){target=0;draw(0);return}const rect=track.getBoundingClientRect(),offset=parseFloat(getComputedStyle(stage).top)||0;const progress=Math.max(0,Math.min(1,(offset-rect.top)/(track.offsetHeight-stage.offsetHeight)));target=Math.round(progress*(frameCount-1));$('#filmProgress').style.width=`${progress*100}%`;const ch=Math.min(5,Math.floor(progress*6));$('#chapterNumber').textContent=`0${ch+1} / 06`;$('#chapterTitle').textContent=chapters[ch][0];$('#chapterDescription').textContent=chapters[ch][1];if(cache.has(target))draw(target);else if(cache.size){const nearest=[...cache.keys()].sort((a,b)=>Math.abs(a-target)-Math.abs(b-target))[0];draw(nearest)}pump()}
let scheduled=false;function requestUpdate(){if(!track)return;if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;update()})}if(track) { new IntersectionObserver(entries=>{active=entries[0].isIntersecting;if(active){warm();loadFrame(target);requestUpdate()}},{rootMargin:'600px'}).observe(track); }window.addEventListener('scroll',requestUpdate,{passive:true});window.addEventListener('resize',requestUpdate);reduced.addEventListener('change',requestUpdate);if(canvas) loadFrame(0);

// --- Find Nearest Reliv Kiosk Logic ---
(() => {
  const KIOSK_LAT = 22.5742463;
  const KIOSK_LNG = 88.4344851;
  const KIOSK_MAPS_URL = 'https://maps.app.goo.gl/eKcd1SF2pF4FPa2W6';
  const WHATSAPP_URL = 'https://wa.me/919163606455?text=Hello%20Reliv%2C%20I%20checked%20my%20location%20and%20a%20kiosk%20is%20too%20far.%20When%20are%20you%20coming%20to%20my%20city%3F';

  // Haversine formula for exact distance in km
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const btn = document.querySelector('#detectLocationBtn');
  const result = document.querySelector('#finderResult');

  if (btn && result) {
    btn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        result.style.display = 'block';
        result.className = 'finder-result error';
        result.innerHTML = `
          <h4>⚠️ Geolocation Not Supported</h4>
          <p>Your browser does not support automatic location detection. You can view our live kiosk directly on <a href="${KIOSK_MAPS_URL}" target="_blank" rel="noopener" style="font-weight:700;text-decoration:underline;">Google Maps</a>.</p>
        `;
        return;
      }

      btn.textContent = '⏳ Locating your position…';
      btn.disabled = true;

      navigator.geolocation.getCurrentPosition(
        position => {
          btn.textContent = '📍 Detect My Current Location';
          btn.disabled = false;
          result.style.display = 'block';

          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const dist = calculateDistance(userLat, userLng, KIOSK_LAT, KIOSK_LNG);
          const distFormatted = dist < 1 ? `${Math.round(dist * 1000)} meters` : `${dist.toFixed(1)} km`;

          if (dist <= 5.0) {
            // Within 5km - Great news!
            result.className = 'finder-result success';
            result.innerHTML = `
              <h4>🎉 Great news! You're only ${distFormatted} away!</h4>
              <p>A Reliv Health ATM is right near you at <strong>Sector V / IEM Gurukul Campus, Kolkata</strong>. Walk or drive over today for a quick 3-minute full vital checkup!</p>
              <div style="margin-top:14px;">
                <a href="${KIOSK_MAPS_URL}" target="_blank" rel="noopener" class="button orange" style="padding:10px 18px;font-size:14px;">Open Navigation on Google Maps ↗</a>
              </div>
            `;
          } else {
            // Farther than 5km - Friendly notice with state expansion call
            result.className = 'finder-result far';
            result.innerHTML = `
              <h4>📍 Oops! Our live kiosk is approximately ${distFormatted} from you.</h4>
              <p>Reliv is currently operating flagship kiosks in <strong>Kolkata</strong>, so this kiosk may be too far for an immediate visit today. <strong>Don't worry — we are coming to your state very soon!</strong></p>
              <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
                <a href="${WHATSAPP_URL}" target="_blank" rel="noopener" class="button green-whatsapp" style="padding:10px 18px;font-size:14px;">Notify Me When Reliv Arrives 💬</a>
                <a href="${KIOSK_MAPS_URL}" target="_blank" rel="noopener" class="button white-outline" style="padding:10px 18px;font-size:14px;">View Kolkata Location on Maps ↗</a>
              </div>
            `;
          }
        },
        error => {
          btn.textContent = '📍 Detect My Current Location';
          btn.disabled = false;
          result.style.display = 'block';
          result.className = 'finder-result error';
          result.innerHTML = `
            <h4>⚠️ Could Not Access Location</h4>
            <p>Please enable GPS or location permissions in your browser. Meanwhile, you can <a href="${KIOSK_MAPS_URL}" target="_blank" rel="noopener" style="font-weight:700;text-decoration:underline;">view our Reliv location on Google Maps</a> or connect with us on WhatsApp!</p>
          `;
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }
})();

}