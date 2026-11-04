/**
 * RELIV CONTENT CONFIG — YOUR PRIMARY EDIT FILE
 * 1) Change image paths in IMAGES (keep filenames or change paths).
 * 2) Change section headings / descriptions / order in FLOW.
 * 3) 'transfers' controls which image travels between each stop.
 * WARNING: transfers must have one fewer entry than stops.
 */
const IMAGES = {
  "campus": "assets/images/campus.webp",
  "kiosk_done": "assets/images/kiosk_done.webp",
  "kiosk_code": "assets/images/kiosk_code.webp",
  "person_report": "assets/images/person_report.webp",
  "person_phone": "assets/images/person_phone.webp",
  "data": "assets/images/data.webp",
  "payment_code": "assets/images/payment_code.webp",
  "report": "assets/images/report.webp",
  "phone": "assets/images/phone.webp",
  "kits": "assets/images/kits.webp",
  "receipt": "assets/images/receipt.webp",
  "payment_scene": "assets/images/payment_scene.webp"
};

const FLOW = {
   health:{
    headline:'Connected care.',intro:'Follow your data as it moves between entirely different illustrated scenes: Campus → Measurements → Enter Code → Health Report → Reliv App.',footer:'From one checkup to everyday care.',
    stops:[
      {title:'It starts at Reliv Campus.',sub:'Complete a kiosk checkup; your health data starts its journey.',label:'THE CAMPUS',step:'START',art:'campus',handoff:'Health data travels to the completed scan'},
      {title:'Your measurements are ready.',sub:'Your measurements are saved, then a code opens the payment step.',label:'ALL MEASUREMENTS DONE',step:'MEASURE',art:'kiosk_done',handoff:'Payment code travels to the next kiosk screen'},
      {title:'Enter the access code.',sub:'Enter the code to unlock your digital health report.',label:'ENTER CODE',step:'UNLOCK',art:'kiosk_code',handoff:'Health report travels to the person reading it'},
      {title:'Read your health report.',sub:'Review your measurements and summary before opening the Reliv app.',label:'YOUR REPORT',step:'REPORT',art:'person_report',handoff:'Reliv App travels toward your phone'},
      {title:'Your health journey continues.',sub:'Use the app to review your history and track changes over time.',label:'RELIV APP',step:'CONTINUE',art:'person_phone',handoff:'The story continues on your phone'}
    ],
    transfers:[{img:'data',name:'HEALTH DATA',size:270},{img:'payment_code',name:'PAYMENT CODE',size:182},{img:'report',name:'HEALTH REPORT',size:185},{img:'phone',name:'RELIV APP',size:150}]
   },
   kits:{
    headline:'Everyday essentials.',intro:'Follow the separate Health Kits route as one object moves from its scene to the next: Kits → Payment → Code → Receipt → App.',footer:'Health essentials, in one connected journey.',
    stops:[
      {title:'Choose your health essentials.',sub:'Choose a health kit at campus to begin the collection journey.',label:'HEALTH KITS',step:'CHOOSE',art:'campus',handoff:'The kit travels to payment'},
      {title:'Continue to payment.',sub:'Continue to payment, then receive the code for kiosk collection.',label:'PAYMENT',step:'PAY',art:'payment_scene',handoff:'Access code travels to the kiosk'},
      {title:'Enter your kiosk code.',sub:'Enter the code to confirm your kit collection.',label:'ENTER CODE',step:'UNLOCK',art:'kiosk_code',handoff:'Purchase receipt travels to the collection stage'},
      {title:'Collect your items and receipt.',sub:'Collect your items and keep the receipt as a purchase record.',label:'COLLECT & RECEIPT',step:'COLLECT',art:'receipt',object:true,handoff:'Your app dashboard moves into the final scene'},
      {title:'Reliv stays with you.',sub:'Open the companion app to continue your health journey.',label:'RELIV APP',step:'CONTINUE',art:'person_phone',handoff:'The journey ends on your phone'}
    ],
    transfers:[{img:'kits',name:'HEALTH KIT',size:245},{img:'payment_code',name:'ACCESS CODE',size:182},{img:'receipt',name:'RECEIPT',size:195},{img:'phone',name:'RELIV APP',size:150}]
   }
  };
