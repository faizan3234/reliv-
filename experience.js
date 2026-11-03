(() => {
  'use strict';
  const $ = s => document.querySelector(s), reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const keys = ['hello','health','intro','explore','film','picture','you','body','vitals','insights','water','age','care','tour','sample'];
  const locales = {
    en: ['English','Hello,','healthier you.','Step in. Check in with yourself. Discover your vitals, body composition and wellness insights in one connected experience.','Explore your health ↗','Watch the film ↗','A fuller picture.','All about you.','Body composition','Vital signs','Wellness insights','Body water','Metabolic age','Care that fits into life.','Take a closer look ↗','Explore a sample report ↗'],
    hi: ['हिन्दी','नमस्ते,','बेहतर सेहत।','आइए, अपनी सेहत को जानिए। एक ही अनुभव में शारीरिक माप, शरीर की संरचना और स्वास्थ्य संबंधी जानकारी पाएँ।','अपनी सेहत जानें ↗','फ़िल्म देखें ↗','एक पूरी तस्वीर।','आपके बारे में।','शरीर की संरचना','महत्वपूर्ण शारीरिक माप','स्वास्थ्य की जानकारी','शरीर में पानी','मेटाबॉलिक आयु','जीवन के साथ चलती देखभाल।','करीब से देखें ↗','नमूना रिपोर्ट देखें ↗'],
    bn: ['বাংলা','স্বাগতম,','সুস্থতার পথে।','নিজের স্বাস্থ্যের খোঁজ নিন। এক অভিজ্ঞতায় শারীরিক মাপ, শরীরের গঠন এবং সুস্থতা সম্পর্কে জানুন।','স্বাস্থ্য সম্পর্কে জানুন ↗','ফিল্ম দেখুন ↗','আরও সম্পূর্ণ ছবি।','আপনাকে ঘিরে।','শরীরের গঠন','গুরুত্বপূর্ণ শারীরিক মাপ','সুস্থতার তথ্য','শরীরে জল','বিপাকীয় বয়স','জীবনের সঙ্গে মানানসই যত্ন।','কাছ থেকে দেখুন ↗','নমুনা রিপোর্ট দেখুন ↗'],
    ta: ['தமிழ்','வணக்கம்,','நலமான நீங்கள்.','உங்கள் ஆரோக்கியத்தை அறியுங்கள். உடல் அளவுகள், உடல் அமைப்பு மற்றும் நலத் தகவல்களை ஒரே அனுபவத்தில் பெறுங்கள்.','ஆரோக்கியத்தை அறியுங்கள் ↗','காணொளியைப் பாருங்கள் ↗','முழுமையான பார்வை.','உங்களைப் பற்றி.','உடல் அமைப்பு','முக்கிய உடல் அளவுகள்','நலத் தகவல்கள்','உடல் நீர்','வளர்சிதை மாற்ற வயது','வாழ்க்கைக்கு ஏற்ற பராமரிப்பு.','அருகில் பாருங்கள் ↗','மாதிரி அறிக்கை ↗'],
    te: ['తెలుగు','నమస్కారం,','ఆరోగ్యమైన మీరు.','మీ ఆరోగ్యాన్ని తెలుసుకోండి. శరీర కొలతలు, శరీర నిర్మాణం మరియు ఆరోగ్య సమాచారాన్ని ఒకే అనుభవంలో పొందండి.','ఆరోగ్యాన్ని తెలుసుకోండి ↗','వీడియో చూడండి ↗','సమగ్ర దృశ్యం.','మీ గురించి.','శరీర నిర్మాణం','ముఖ్యమైన శరీర కొలతలు','ఆరోగ్య సమాచారం','శరీర నీరు','జీవక్రియ వయస్సు','జీవితానికి సరిపోయే సంరక్షణ.','దగ్గరగా చూడండి ↗','నమూనా నివేదిక ↗'],
    mr: ['मराठी','नमस्कार,','निरोगी तुम्ही.','स्वतःच्या आरोग्याची माहिती घ्या. शरीराची मोजमापे, शरीररचना आणि आरोग्यविषयक माहिती एकाच अनुभवात जाणून घ्या.','आरोग्य जाणून घ्या ↗','चित्रफीत पाहा ↗','अधिक संपूर्ण चित्र.','तुमच्याबद्दल.','शरीररचना','महत्त्वाची शारीरिक मोजमापे','आरोग्यविषयक माहिती','शरीरातील पाणी','चयापचय वय','जीवनात सहज बसणारी काळजी.','जवळून पाहा ↗','नमुना अहवाल पाहा ↗'],
    gu: ['ગુજરાતી','નમસ્તે,','સ્વસ્થ તમે.','તમારા સ્વાસ્થ્યને જાણો. શારીરિક માપ, શરીરની રચના અને સ્વાસ્થ્યની માહિતી એક જ અનુભવમાં મેળવો.','સ્વાસ્થ્ય જાણો ↗','ફિલ્મ જુઓ ↗','વધુ સંપૂર્ણ ચિત્ર.','તમારા વિશે.','શરીરની રચના','મહત્વના શારીરિક માપ','સ્વાસ્થ્યની માહિતી','શરીરમાં પાણી','ચયાપચયની ઉંમર','જીવનને અનુરૂપ સંભાળ.','નજીકથી જુઓ ↗','નમૂના રિપોર્ટ જુઓ ↗'],
    kn: ['ಕನ್ನಡ','ನಮಸ್ಕಾರ,','ಆರೋಗ್ಯವಂತ ನೀವು.','ನಿಮ್ಮ ಆರೋಗ್ಯವನ್ನು ತಿಳಿಯಿರಿ. ದೇಹದ ಅಳತೆಗಳು, ದೇಹ ಸಂಯೋಜನೆ ಮತ್ತು ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಒಂದೇ ಅನುಭವದಲ್ಲಿ ಪಡೆಯಿರಿ.','ಆರೋಗ್ಯವನ್ನು ಅನ್ವೇಷಿಸಿ ↗','ವೀಡಿಯೊ ವೀಕ್ಷಿಸಿ ↗','ಸಂಪೂರ್ಣ ಚಿತ್ರಣ.','ನಿಮ್ಮ ಬಗ್ಗೆ.','ದೇಹ ಸಂಯೋಜನೆ','ಪ್ರಮುಖ ದೈಹಿಕ ಅಳತೆಗಳು','ಆರೋಗ್ಯ ಮಾಹಿತಿ','ದೇಹದ ನೀರು','ಚಯಾಪಚಯ ವಯಸ್ಸು','ಬದುಕಿಗೆ ಹೊಂದುವ ಆರೈಕೆ.','ಹತ್ತಿರದಿಂದ ನೋಡಿ ↗','ಮಾದರಿ ವರದಿ ನೋಡಿ ↗'],
    ml: ['മലയാളം','നമസ്കാരം,','ആരോഗ്യമുള്ള നിങ്ങൾ.','നിങ്ങളുടെ ആരോഗ്യം അറിയൂ. ശരീര അളവുകൾ, ശരീരഘടന, ആരോഗ്യ വിവരങ്ങൾ എന്നിവ ഒരേ അനുഭവത്തിൽ കണ്ടെത്തൂ.','ആരോഗ്യം അറിയൂ ↗','വീഡിയോ കാണൂ ↗','കൂടുതൽ സമഗ്രമായ ചിത്രം.','നിങ്ങളെക്കുറിച്ച്.','ശരീരഘടന','പ്രധാന ശാരീരിക അളവുകൾ','ആരോഗ്യ വിവരങ്ങൾ','ശരീരത്തിലെ ജലം','ഉപാപചയ പ്രായം','ജീവിതത്തിന് അനുയോജ്യമായ പരിചരണം.','അടുത്തു കാണൂ ↗','മാതൃകാ റിപ്പോർട്ട് ↗'],
    pa: ['ਪੰਜਾਬੀ','ਸਤ ਸ੍ਰੀ ਅਕਾਲ,','ਸਿਹਤਮੰਦ ਤੁਸੀਂ।','ਆਪਣੀ ਸਿਹਤ ਬਾਰੇ ਜਾਣੋ। ਸਰੀਰਕ ਮਾਪ, ਸਰੀਰ ਦੀ ਬਣਤਰ ਅਤੇ ਸਿਹਤ ਦੀ ਜਾਣਕਾਰੀ ਇੱਕੋ ਅਨੁਭਵ ਵਿੱਚ ਪਾਓ।','ਸਿਹਤ ਬਾਰੇ ਜਾਣੋ ↗','ਫ਼ਿਲਮ ਵੇਖੋ ↗','ਇੱਕ ਪੂਰੀ ਤਸਵੀਰ।','ਤੁਹਾਡੇ ਬਾਰੇ।','ਸਰੀਰ ਦੀ ਬਣਤਰ','ਮੁੱਖ ਸਰੀਰਕ ਮਾਪ','ਸਿਹਤ ਦੀ ਜਾਣਕਾਰੀ','ਸਰੀਰ ਦਾ ਪਾਣੀ','ਮੈਟਾਬੋਲਿਕ ਉਮਰ','ਜ਼ਿੰਦਗੀ ਨਾਲ ਜੁੜੀ ਦੇਖਭਾਲ।','ਨੇੜਿਓਂ ਵੇਖੋ ↗','ਨਮੂਨਾ ਰਿਪੋਰਟ ਵੇਖੋ ↗'],
    or: ['ଓଡ଼ିଆ','ନମସ୍କାର,','ସୁସ୍ଥ ଆପଣ।','ନିଜ ସ୍ୱାସ୍ଥ୍ୟ ବିଷୟରେ ଜାଣନ୍ତୁ। ଶାରୀରିକ ମାପ, ଶରୀର ଗଠନ ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ଏକାଠି ପାଆନ୍ତୁ।','ସ୍ୱାସ୍ଥ୍ୟ ଜାଣନ୍ତୁ ↗','ଭିଡିଓ ଦେଖନ୍ତୁ ↗','ଏକ ସମ୍ପୂର୍ଣ୍ଣ ଚିତ୍ର।','ଆପଣଙ୍କ ବିଷୟରେ।','ଶରୀର ଗଠନ','ମୁଖ୍ୟ ଶାରୀରିକ ମାପ','ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା','ଶରୀରର ଜଳ','ଚୟାପଚୟ ବୟସ','ଜୀବନ ସହ ମେଳ ଖାଉଥିବା ଯତ୍ନ।','ପାଖରୁ ଦେଖନ୍ତୁ ↗','ନମୁନା ରିପୋର୍ଟ ↗'],
    as: ['অসমীয়া','নমস্কাৰ,','সুস্থ আপুনি।','নিজৰ স্বাস্থ্যৰ খবৰ লওক। শৰীৰৰ জোখ, শৰীৰৰ গঠন আৰু স্বাস্থ্যৰ তথ্য একেটা অভিজ্ঞতাত জানক।','স্বাস্থ্যৰ বিষয়ে জানক ↗','ভিডিঅ’ চাওক ↗','অধিক সম্পূৰ্ণ ছবি।','আপোনাৰ বিষয়ে।','শৰীৰৰ গঠন','গুৰুত্বপূৰ্ণ শাৰীৰিক জোখ','স্বাস্থ্যৰ তথ্য','শৰীৰৰ পানী','বিপাকীয় বয়স','জীৱনৰ সৈতে খাপ খোৱা যত্ন।','ওচৰৰ পৰা চাওক ↗','নমুনা প্ৰতিবেদন ↗']
  };

  const selector = $('#siteLanguage');
  if (selector) {
    let locale = 'en';
    const t = k => locales[locale][keys.indexOf(k) + 1];
    Object.entries(locales).forEach(([code, row]) => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = row[0];
      selector.append(option);
    });

    const heroBottom = $('.r-hero-bottom');
    if (heroBottom) {
      const note = document.createElement('p');
      note.className = 'r-language-note';
      note.textContent = '12 languages for this introduction and its navigation. Detailed product information, reports and linked pages are currently in English.';
      heroBottom.append(note);
    }

    function language(code) {
      locale = Object.hasOwn(locales, code) ? code : 'en';
      selector.value = locale;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        if (keys.includes(el.dataset.i18n)) {
          el.textContent = t(el.dataset.i18n);
          el.lang = locale;
        }
      });
      try {
        localStorage.setItem('reliv-language', locale);
      } catch (e) {}
      render();
    }

    const data = {
      body: [
        ['FFMI', 'Calculated index', 'Fat-free mass index relates estimated fat-free mass to height, adding context beyond body weight alone.'],
        ['Body water', 'Body-composition estimate', 'An estimate of the proportion of body weight represented by water. Measurement conditions affect this value.'],
        ['Water volume', 'Derived body-water estimate', 'Total body water can be expressed as an estimated volume. Availability and units depend on the installed device.'],
        ['Body fat', 'Body-composition estimate', 'The estimated proportion of body weight made up of fat, presented alongside other composition indicators.'],
        ['Muscle mass', 'Body-composition estimate', 'Estimated muscle mass adds context to weight. It is not a direct measurement of strength.']
      ],
      vitals: [
        ['Heart rate', 'Sensor measurement', 'The number of heartbeats per minute recorded during your screening session.'],
        ['Blood pressure', 'Sensor measurement', 'Systolic and diastolic readings are displayed together, with units and a guided cuff measurement.'],
        ['SpO₂', 'Sensor estimate', 'Pulse oximetry estimates blood oxygen saturation using a finger sensor.'],
        ['Temperature', 'Sensor measurement', 'A contactless temperature reading recorded as part of the guided screening.'],
        ['Height & BMI', 'Measurement + calculation', 'Measured height and weight provide the inputs for body mass index.']
      ],
      insights: [
        ['Metabolic age', 'Device-derived estimate', 'A comparison based on a device’s metabolic model. It is not a measurement of actual biological age.'],
        ['BMR', 'Calculated estimate', 'An estimate of energy used for basic body functions at rest, expressed in kilocalories per day.'],
        ['Digital wellness report', 'Connected experience', 'Bring measurements and calculated indicators together in a digital summary, with QR-based access on your phone.'],
        ['102+ parameters & insights', 'Platform scope', 'Measurements, body-composition estimates and derived insights. Available outputs vary by kiosk configuration; ask the team for the parameter list for your deployment.']
      ]
    };

    let group = 'body', selected = 0;
    function label(name) {
      return name === 'Body water' ? t('water') : name === 'Metabolic age' ? t('age') : name;
    }

    function render() {
      const root = $('#metricChoices');
      if (!root) return;
      root.replaceChildren();
      data[group].forEach((m, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-pressed', String(i === selected));
        b.textContent = label(m[0]) + ' ↗';
        b.lang = label(m[0]) === m[0] ? 'en' : locale;
        b.onclick = () => {
          selected = i;
          render();
          if (root.children[i]) root.children[i].focus({ preventScroll: true });
        };
        root.append(b);
      });
      const m = data[group][selected];
      const kindEl = $('#metricKind');
      const nameEl = $('#metricName');
      const descEl = $('#metricDescription');
      if (kindEl) kindEl.textContent = m[1];
      if (nameEl) nameEl.textContent = label(m[0]);
      if (descEl) descEl.textContent = m[2];
    }

    document.querySelectorAll('[data-group]').forEach(b => {
      b.onclick = () => {
        group = b.dataset.group;
        selected = 0;
        document.querySelectorAll('[data-group]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        render();
      };
    });

    selector.onchange = () => language(selector.value);
    let saved = 'en';
    try {
      saved = localStorage.getItem('reliv-language') || 'en';
    } catch (e) {}
    language(saved);
  }

  // Cinematic Kiosk Film Controls
  const film = $('#introFilm'), toggle = $('#introFilmToggle'), motion = $('.r-motion');
  if (film) {
    let paused = reduced.matches, loaded = false, visible = false, stopped = false;
    function sync() {
      document.body.classList.toggle('r-paused', paused);
      if (motion) {
        motion.setAttribute('aria-pressed', String(paused));
        motion.textContent = paused ? 'Resume motion' : 'Pause motion';
      }
    }
    async function start() {
      if (!loaded) {
        const source = film.querySelector('source');
        if (source && source.dataset.src) {
          source.src = source.dataset.src;
          film.load();
          loaded = true;
        }
      }
      try {
        await film.play();
      } catch (e) {
        if (toggle) toggle.textContent = 'Play film';
      }
    }

    if (motion) {
      motion.onclick = () => {
        paused = !paused;
        sync();
        if (paused) film.pause();
        else if (visible && !stopped && !reduced.matches) start();
      };
    }

    if (toggle) {
      toggle.onclick = () => {
        if (film.paused) {
          stopped = false;
          start();
        } else {
          stopped = true;
          film.pause();
        }
      };
    }

    film.addEventListener('play', () => { if (toggle) toggle.textContent = 'Pause film'; });
    film.addEventListener('pause', () => { if (toggle) toggle.textContent = 'Play film'; });
    film.addEventListener('error', () => { if (toggle) toggle.textContent = 'Retry film'; });

    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (!visible) film.pause();
      else if (!paused && !reduced.matches && !navigator.connection?.saveData && !stopped) start();
    }, { threshold: 0.25 }).observe(film);

    document.addEventListener('visibilitychange', () => { if (document.hidden) film.pause(); });
    document.addEventListener('play', e => {
      if (e.target !== film && e.target.tagName === 'VIDEO') film.pause();
    }, true);

    reduced.addEventListener('change', () => {
      paused = reduced.matches;
      sync();
      if (paused) film.pause();
    });
    sync();
  }
})();
